import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './homepage/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from "@angular/flex-layout";
import { BodyComponent } from './homepage/body/body.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ScanditSdkModule } from "scandit-sdk-angular";
import { FormsModule } from '@angular/forms';

const licenseKey = "Ae8AfGVWRMq5Lvn7EUEKWzVFZTuJBRkzPEdj6H5XOlRnVLPcLGV1G7sS4RmtaWifEUIMA2BzIL4FVpGIuANe18ARAB03VzAMWSbQoZ5D+PB/ZVJVqEj7Y4B5e03TaqD3FX5FGlBc2N2xDF7UmwYGYW0zTSmmGrYQWQs4CJcEt5tZntz4shGo2EKvZwPp6L1k6OE0a8yqOUoUCdtmf7TOiHVoWqqANd6aEtKi9G3Bz7qqR9vu4BHqiKxNR1nWuu8x+yAuiqqSrfltK343OQVxdoZzHTcd8bQLuyZIdtnngeVlscxrVBbSlzfwKNQhY+TuBgFP+dDwI83aHFHBjGHjPLpxoKbl6grg8Uuo5zg6swfLeQaDflaZldLeh9c1muantDfwb+mchICx9pdDqrMfPfTEzS37OPNEAG3GQBHpLn4TUQR2+lQ7BiZVpEzbWXaQDMtlbRRhOT4tnx3vpj0NTHkVmRVFLRgJHi4MTAQwWUT4wQ5ookv8DYbaBuRbeKzTTg/k2Qpu7LaaZpRB63rcmCqAOUM0C5h+yPi78F4Y/iUbr84U/pGwsuLfbKkukWG5iBYnnY/xsJB+7OQblNPuY2eEH/xbI90ng7tJUKtxlpISM34VDc7U0gAyXvOqBUGH3aupEYVingb8FcugVB7dyvDW8ZywdToGQEyNnGPNhfel4rmWdNCNAZrLAhNerLHfCmbWaAbyBe6ZLz/hst9aOeRyxEPaBDlZC904i1DX3ebG9PDbK9sZ2nJa0pJIhfZAD2j1nwsNgmXYSY/3CGWx+Don+Ey4m5nJfxlkah0FwVcjdwVDHswLAnyXYl5q4W59z2w8z3+Z7evHg61Fd+Q=";
const engineLocation = "https://cdn.jsdelivr.net/npm/scandit-sdk@5.x/build/";

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		BodyComponent,

	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatCardModule,
		FlexLayoutModule,
		FormsModule, 
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		ZXingScannerModule,
		ScanditSdkModule.forRoot(licenseKey, { engineLocation })

	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
