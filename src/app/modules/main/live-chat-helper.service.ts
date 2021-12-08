import { Injectable } from '@angular/core';


@Injectable({
	providedIn: 'root'
})
export class LCHService {


	lauch(url: string, user: any) {
		let LHCChatOptions: any = {};
		LHCChatOptions.opt = {widget_height:340,widget_width:300,popup_height:520,popup_width:500,domain:'smlc.eneasys.com/app/'};
		LHCChatOptions.attr_prefill = [];
		LHCChatOptions.attr_prefill.push({'name':'username','value':user.username}); 
		
		(<any>window).LHCChatOptions = LHCChatOptions;
		{
			var po = document.createElement('script');
			po.type = 'text/javascript';
			po.async = true;
			var referrer = (document.referrer) ? encodeURIComponent(document.referrer.substr(document.referrer.indexOf('://')+1)) : '';
			var location = (document.location) ? encodeURIComponent(window.location.href.substring(window.location.protocol.length)) : '';
			po.src = url+'?r='+referrer+'&l='+location;
			var s: any = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(po, s);
		}
	}


}