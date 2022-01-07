import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	loginApiEndpoint = "/api/?";

	constructor(
		private http: HttpClient,
	) {}

	userLoaded: boolean = false;
	user: any;

	private async loadUser() {
		try {
			let response = await this.http.get(this.loginApiEndpoint + "a=user_info").toPromise();
			this.user = response;
			this.userLoaded = true;
		} catch (e: any) {
			console.log(e.error);
			if(e.error.code == 401) {
				window.location.href = "https://bs.stepo.biz/";
			}
		}
	}
	
	async getUser() {
		if(!this.userLoaded) {
			await this.loadUser();
		}
		return this.user;
	}
}