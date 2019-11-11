import {Component, OnInit} from "@angular/core" ;
import {SessionStorageService} from "../../service/storage";
import {ActivatedRoute, Router} from "@angular/router";
import {WxService} from "../../service/wx/wx.service";
import {RESPONSE} from "../../models";
import {StaffService} from "../../service/system";

@Component({
	selector: 'login' ,
	template: `` ,
})
export class LoginComponent implements OnInit{
	constructor(
		private readonly sgo: SessionStorageService ,
		private readonly activeRoute: ActivatedRoute ,
		private readonly service: WxService,
		private readonly staffSer: StaffService,
		private readonly router: Router
	){}

	private code: string ;
	private redirect: string ;
	ngOnInit(): void {
		this.activeRoute.queryParams.subscribe(para => {
			this.code = para.code ;
			this.redirect = para.state ;
		});
		const uid = this.sgo.get('uid') ;
		if( uid ) {
			this.getUsrInfo(uid);
		} else {
			this.getConfig() ;
		}
	}

	private getConfig(): void {
		this.service.getConfigByCode({code: this.code})
			.subscribe( (res: RESPONSE) => {
				this.sgo.set('jsApiConfig' , res.data.jsApiConfig) ;
				this.sgo.set('oid' , res.data.oid );
				this.sgo.set('uid' , res.data.uid);

				this.getUsrInfo(res.data.uid);
 			})
	}

	private getUsrInfo(uid: number): void{
		if( this.sgo.get('staffInfo')) {
			this.setRedirect();
		} else {
			this.staffSer.staff({uid})
				.subscribe((res:RESPONSE) => {
					this.sgo.set('staffInfo',res.data) ;
					this.setRedirect();
				})
		}
	}

	private setRedirect(): void {
		this.router.navigate([this.redirect])
	}
}
