import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})
export class PaymentService {

	transactionApiEndpoint = "https://api-gest.stage.eneasys.net/wallet/";

	constructor(
		private http: HttpClient,
		private authService: AuthService,
	) { }

	async createTransaction(postBody: any) {
		let esercente = await this.authService.getUser();

		let httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'X-Tenant-Code': esercente.context,
				Authorization: "Bearer " + esercente.aigJwt
			})
		};
		return this.http.post(this.transactionApiEndpoint + "api/transaction", postBody, httpOptions).toPromise();
	}
}