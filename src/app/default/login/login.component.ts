import {Component, OnInit} from "@angular/core" ;
import {SessionStorageService} from "../../service/storage";
import {ActivatedRoute} from "@angular/router";
import {WxService} from "../../service/wx/wx.service";
import {RESPONSE} from "../../models";
import {MsgService} from "../../service/msg/msg.service";

@Component({
	selector: 'login' ,
	template: `` ,
})
export class LoginComponent implements OnInit{
	constructor(
		private readonly sgo: SessionStorageService ,
		private readonly activeRoute: ActivatedRoute ,
		private readonly service: WxService
	){}

	private code: string ;
	private redirect: string ;
	ngOnInit(): void {
		this.activeRoute.queryParams.subscribe(para => {
			this.code = para.code ;
			this.redirect = para.state ;
		});
		this.getConfig() ;
	}

	private getConfig(): void {
		this.service.getConfigByCode({code: this.code})
			.subscribe( (res: RESPONSE) => {
				console.log(res);
			})
	}
}
