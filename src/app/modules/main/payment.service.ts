import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class PaymentService {

	transactionApiEndpoint = "https://api-gest.eneasys.net/wallet/api/";

	constructor(
		private http: HttpClient,
	) { }

	createTransaction(accessToken: string, postBody: any) {
		let httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'X-Tenant-Code': 'stage-1',
				Authorization: "Bearer " + accessToken
			})
		};
		return this.http.post(this.transactionApiEndpoint + "transaction", postBody, httpOptions);
	}
}