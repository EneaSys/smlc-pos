import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/modules/main/auth.service';
import { LCHService } from 'src/app/modules/main/live-chat-helper.service';
import { PaymentService } from 'src/app/modules/main/payment.service';

@Component({
	selector: 'body',
	templateUrl: './body.component.html',
	styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

	constructor(
		private authService: AuthService,
		private paymentService: PaymentService,
		private LCHService: LCHService,
	) { }

	//public settings = new ScanSettings({ enabledSymbologies: [Barcode.Symbology.CODE128] });

	ngOnInit(): void {
		this.loadLivechat();
	}

	async loadLivechat() {
		let esercente: any = await this.authService.getUser();

		switch (esercente.context) {
			case "smlc":
					this.LCHService.lauch("//supp.eneasys.com/smlc/index.php/ita/chat/getstatus/(click)/internal/(position)/bottom_right/(ma)/br/(top)/350/(units)/pixels/(leaveamessage)/true/(department)/2", esercente);
				break;
			default:
				console.log("NO LIVECHAT");
				break;
		}
		
	}

	scanning = false;
	activateScanner() {
		this.scanning = true;
	}

	@ViewChild("amountInput") amountInput: ElementRef;

	cf: string = "";

	scanComplete(event: any) {
		this.scanning = false;
		this.cf = event.detail.barcodes[0].data;
		//this.amountInput.nativeElement.focus();
	}

	amount: number | undefined;
	pin: number | undefined;

	isReady() {
		let ready: boolean = true;

		if(this.cf == "" || this.cf.length < 16) {
			ready = false;
		}

		if(this.amount === undefined || this.amount === null || this.amount == 0) {
			ready = false;
		}

		if(this.validation) {
			ready = false;
		}

		return ready;
	}

	@ViewChild("pinInput") pinInput: ElementRef;
	validation: boolean = false;
	proceedToValidation() {
		this.validation = true;
		setTimeout(() => {
			this.pinInput.nativeElement.focus();
		}, 1);
		
	}

	paymentInProgress: boolean = false;
	res: any;
	paymentOk: boolean = false;
	paymentKo: boolean = false;
	errore: string;
	async proceedToPayment() {
		this.paymentInProgress = true;
		try {
			let esercente = await this.authService.getUser();
			let paymentRequest: any = {
				cardCode: this.cf,
				cardPin: this.pin,
				amount: this.amount,
				walletReceiver: esercente.walletId,
			}
			this.pin = undefined;

			this.res = await this.paymentService.createTransaction(paymentRequest);

			this.paymentOk = true;
		} catch(e: any) {
			if(e.error.detail.includes("A CreditCard With Code: ")) {
				this.errore = "Richiedente non beneficiario";
			}
			if(e.error.detail == "Not enough amount for this transaction.") {
				this.errore = "Credito insufficiente";
			}
			if(e.error.detail.includes("The Pin Of CreditCard With Code:")) {
				this.errore = "PIN errato";
			}
			
			this.res = e.error;
			this.paymentKo = true;
		}
	}

	reload() {
		window.location.href = "/";
	}

}