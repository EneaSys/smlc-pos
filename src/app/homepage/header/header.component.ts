import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/main/auth.service';

@Component({
	selector: 'header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	
	constructor(
		private authService: AuthService,
		private route: Router
		
	) { }


	ngOnInit(): void {
		this.loadUser();
	}

	user: any;
	async loadUser() {
		try {
			this.user = await this.authService.getUser()
		} catch(e: any) {
			console.log(e.error);
			if(e.error.code == 401) {
				//window.location.href = "https://smlc.eneasys.com/";
			}
		}
	}

}
