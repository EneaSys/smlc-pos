import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TransactionDTO, TransactionResourceService, WalletResourceService } from 'aig-wallet';
import { AuthService } from 'src/app/modules/main/auth.service';
// @ts-ignore
import jsPDF from 'jspdf';
import 'jspdf-autotable'


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

	async summary(id: number) {
		let filters: any = {};

		if (id == 1) {
			filters.transactionCreationDateTimeGreaterThanOrEqual = new Date("2021-12-10T00:00:00Z");
			filters.transactionCreationDateTimeLessThanOrEqual = new Date("2022-01-10T23:59:59Z");
		}

		if (id == 2) {
			filters.transactionCreationDateTimeGreaterThanOrEqual = new Date("2022-01-11T00:00:00Z");
			filters.transactionCreationDateTimeLessThanOrEqual = new Date("2022-02-28T23:59:59Z");
		}

		if (id == 3) {
			filters.transactionCreationDateTimeGreaterThanOrEqual = new Date("2022-03-01T00:00:00Z");
			filters.transactionCreationDateTimeLessThanOrEqual = new Date("2022-03-31T23:59:59Z");
		}

		if (id == 4) {
			filters.transactionCreationDateTimeGreaterThanOrEqual = new Date("2022-04-01T00:00:00Z");
			filters.transactionCreationDateTimeLessThanOrEqual = new Date("2022-09-30T23:59:59Z");
		}

		try {
			filters.walletIDEquals = this.esercente.walletId;
			filters.size = 1000;

			let reportTransactions: TransactionDTO[] = await this.transactionResourceService.getAllTransactionsUsingGET(filters).toPromise();
			
			let rows = [];
			let total: number = 0;
			for (let transaction of reportTransactions) {
				if(transaction.giveHaves === undefined || transaction.giveHaves[0].amount === undefined) {
					continue;
				}
				let amount: number = transaction.giveHaves[0].amount;
				total += amount;
				rows.push([transaction.creationDateTime, amount])
			}

			const doc = new jsPDF();

			doc.setProperties({
				title: 'Rendicontazione',
				//				subject: 'This is the subject',
				author: 'Comune SMLC',
				//				keywords: 'generated, javascript, web 2.0, ajax',
				//				creator: 'MEEE'
			});

			doc.setFont("helvetica");
			doc.setFontSize(12);

			doc.text(20, 30, 'Oggetto: RENDICONTAZIONE BUONI SPESA DIGITALI');

			doc.setFontSize(10);

			doc.text('Il/La sottoscritto/a __________________________________________ nato/a a _______________________________ il _____________ residente in _______________________________________________ alla via _____________________________________ n. _______',
				10, 40, { maxWidth: 185, align: "justify" });

			doc.text(10, 55, 'in qualità di titolare/legale rappresentante dell’esercizio commerciale');

			doc.text('ragione sociale ____________________________________________________ p. iva _____________________ con sede in via _____________________________________________ n __________ tel ________________________',
				10, 60, { maxWidth: 185, align: "justify" });

			doc.text('consapevole di quanto prescritto dagli articoli 75 e 76 del D.P.R. 445/2000 sulla responsabilità penale cui può andare incontro in caso di dichiarazioni mendaci, nonché sulla decadenza dei benefici eventualmente conseguenti al provvedimento emanato sulla base delle dichiarazioni non veritiere, ai sensi e per gli effetti di cui agli artt. 46 e 47 del medesimo D.P.R. 445/2000',
				10, 70, { maxWidth: 185, align: "justify" });

			doc.text(10, 90, 'TRASMETTE sotto la propria personale responsabilità');

			doc.text('la seguente rendicontazione predisposta secondo l’Avviso Pubblico, già sottoscritto ai fini dell’ammissione all’elenco permanente delle attività commerciali:',
				10, 95, { maxWidth: 185, align: "justify" });

			(doc as any).autoTable({
				styles: {
					fontSize: 10
				},
				startY: 105,
				head: [['Data e ora', 'importo']],
				body: rows,
			})
			doc.addPage();
			let finalY = 10;

			doc.text(10, finalY+10, 'per un totale di € '+total+' di buoni spesa digitali');

			doc.text(10, finalY+25, 'DICHIARA sotto la propria personale responsabilità');

			doc.text('che il conto corrente della propria attività commerciale dedicato a commesse pubbliche, per gli adempimenti relativi alla tracciabilità dei flussi finanziari ex legge n. 136/2010 s.m.i. è il seguente:',
				10, finalY+30, { maxWidth: 185, align: "justify" });

			doc.text('Codice Iban ____________________________ istituto	bancario _________________________________ filiale di ___________________________________ sul quale dovranno essere effettuati i pagamenti tramite bonifico bancario/postale, così come previsto dalla L. 136/2010.',
				10, finalY+40, { maxWidth: 185, align: "justify" });
				
			doc.text(10, finalY+55, 'Eventuali successive variazioni saranno comunicate alla S.V. con le stesse modalità.');

			doc.text(10, finalY+65, 'DICHIARA altresì ai sensi del d.p.r. 445/2000');

			doc.text('- Che i buoni spesa digitali sono stati  presentati e spesi presso il proprio esercizio commerciale dal possessore nel rispetto e per le finalità perseguite dall’Avviso Pubblico, nonché la spesa inerente il buono spesa è stata volta esclusivamente all’acquisto di generi di prima necessità, esclusi dunque gli acquisti di alcolici, superalcolici, e tutti gli altri beni non ritenuti di prima necessità;',
				10, finalY+70, { maxWidth: 185, align: "justify" });
			
			doc.text('- Per ogni singola transazione mi sono accertato dell’identità del beneficiario mediante esibizione di un valido documento di riconoscimento;',
				10, finalY+88, { maxWidth: 185, align: "justify" });

			doc.text('- Che i buoni spesa digitali  non sono stati convertiti in denaro contante né totalmente né in parte dell’importo indicato;',
				10, finalY+100, { maxWidth: 180, align: "justify" });

			doc.text('- Che sarà conservato ogni copia dello scontrino relativo ad ogni singola transazione secondo la vigente normativa rendendomi disponibile alla consegna di copia degli stessi nel caso di richiesta da parte degli uffici dell’Ente;',
				10, finalY+110, { maxWidth: 185, align: "justify" });

			doc.text('- Che ogni singolo scontrino fiscale è corrispondente ai buoni spesa digitali presentati riconducibili all’intestatario del buono spesa digitale stesso e non a persona diversa;',
				10, finalY+120, { maxWidth: 185, align: "justify" });

			doc.text('- Che la rendicontazione presentata è stata predisposta secondo l’Avviso Pubblico, già sottoscritto ai fini dell’ammissione all’elenco delle attività commerciali aderenti alla progettualità.',
				10, finalY+130, { maxWidth: 185, align: "justify" });

			doc.text(10, finalY+145, 'Santa Maria la Carità, ____________________');
			


			doc.save('rendicotazione.pdf')
		} catch (e) {
			console.log(e, filters);
		}
	}

	private async loadBalance() {
		try {
			this.balance = await this.walletResourceService.getWalletBalanceUsingGET(this.esercente.walletId).toPromise();
		} catch (e) {

		}
	}

	private async loadTransactions() {
		try {
			this.lastTransactions = await this.transactionResourceService.getAllTransactionsUsingGET({
				walletIDEquals: this.esercente.walletId,
				sort: ['id,desc'],
				size: 100
			}).toPromise();
		} catch (e) {

		}
	}

}
