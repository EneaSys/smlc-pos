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

const licenseKey = "AWvAvgFWICbOHM7G6AAjOZo2+u5sIIwqzxYg49lSraD+U3qVfFLV3t9+xQ+6Q8ueJUABm91oQ1UhZyqSuFjYlwh9FiJvSlosClW3Qc10EiR0eaHhZ3d5OVdOFxvXYZTM+U9EElhJNwq1U/ChME5+JnYnZg8kBAS4OgR7nYoyqsRr7FygfDif2Okfu1xxx5Y4oV1kq7gB5VjZENMBBYLxuv1PSYU+MTwBxbgqsfpcqBipjtFj/4Z3vmzTVyuySkqdnvpFsDGU1rWLwKAcRd3AiIPpI7+1qjQDHbHC7UtpHmYQ2IDFWaL0GXFctu8Qq0M/UWvN0yOPJWhemEG5Xwj308sFq8L3QRCrpV6ssKPLV8ZFj9jhmg3S//0AynhQC5SeWfj0RW/zyygh1p9/1SqakEUKYarwYPN44yCFjogotM/j+feOJ35FS7mEEq3e1hhrthvCpcPSgirVnEv3hsoMwRUA30iU6uX5qWv4c7ODHpMuGcaGOCv6zd9Xr+M9asMOUGRMpM+bcoTrdGOY98JvMrmyA+Vrc+6DSmssJQVdxammHDwyHnWNxyHj81I4hXGud/TJoFz2lg5KiReCPXl9YKctM0PJu06OfbQQAyHPDvNthCZOIC8kF/besif+654y6PqJ0pifsuWdfKlI99SbZpjmIDhMp1w845QDVkK2S/JTjiLvQE1pKqHiRtrzLf3DR0/c2GtMvkZximVkYNE0sS+gl04XYz+xCI5tv7lkV6XmBL1GMDAOEdKqsVx9P8SR6zZ3oTH65+gCyEWfmHRyzBwiYUurDdXgz64bN2AWB4Sd4ARlx4SWs6y95d4adNHROtvT8rbR/oQrP9kiXMiC9Q==";
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
