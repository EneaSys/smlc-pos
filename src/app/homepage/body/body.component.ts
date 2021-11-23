import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/modules/main/auth.service';
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
	) { }

	//public settings = new ScanSettings({ enabledSymbologies: [Barcode.Symbology.CODE128] });

	ngOnInit(): void { }

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
	async proceedToPayment() {
		this.paymentInProgress = true;
		try {
			let esercente = await this.authService.getUser();
			let paymentRequest: any = {
				code: this.cf,
				pin: this.pin,
				amount: this.amount,
				wallet_id: esercente.walletId,
			}
			this.pin = undefined;

			this.res = await this.paymentService.createTransaction(esercente.aigJwt, paymentRequest).toPromise();

			this.paymentOk = true;
		} catch(e) {
			console.log(e);
			this.res = e;
			this.paymentKo = true;
		}
	}

	reload() {
		window.location.href = "/";
	}
}