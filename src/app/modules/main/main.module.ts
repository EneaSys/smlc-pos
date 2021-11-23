import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { PaymentService } from './payment.service';

@NgModule({
	imports: [ 
		CommonModule,
		HttpClientModule,
		
	],
	providers: [
		AuthService,
		PaymentService,

	],
	declarations: [

	],
	exports: [

	],
})
export class MainModule {}