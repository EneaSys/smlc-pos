import { Component, OnInit } from '@angular/core';
import { TransactionDTO, TransactionResourceService, WalletResourceService } from 'aig-wallet';
import { AuthService } from 'src/app/modules/main/auth.service';

@Component({
	selector: 'balance',
	templateUrl: './balance.component.html',
	styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {
	constructor(
		private authService: AuthService,
		private walletResourceService: WalletResourceService,
		private transactionResourceService: TransactionResourceService,
	) { }

	esercente: any;
	balance: number;
	lastTransactions: TransactionDTO[];

	async ngOnInit() {
		this.esercente = await this.authService.getUser();
		this.loadBalance();
		this.loadTransactions();
	}

	reload() {
		this.loadBalance();
		this.loadTransactions();
	}

	private async loadBalance() {
		try {
			this.balance = await this.walletResourceService.getWalletBalanceUsingGET(this.esercente.walletId).toPromise();
		} catch(e) {

		}
	}

	private async loadTransactions() {
		try {
			this.lastTransactions = await this.transactionResourceService.getAllTransactionsUsingGET({
				walletIDEquals: this.esercente.walletId,
				sort: ['id,desc'],
				size:100
			}).toPromise();
		} catch(e) {

		}
	}
}
