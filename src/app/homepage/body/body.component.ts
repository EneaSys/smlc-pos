import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'body',
	templateUrl: './body.component.html',
	styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

	constructor() { }

	//public settings = new ScanSettings({ enabledSymbologies: [Barcode.Symbology.CODE128] });

	ngOnInit(): void { }

	scanning = false;
	activateScanner() {
		this.scanning = true;
	}
	
	cf: string = "";
	scanComplete(event: any) {
		this.scanning = false;
		this.cf = event.detail.barcodes[0].data;
	}
	
}