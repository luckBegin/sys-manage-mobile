import { Injectable } from '@angular/core' ;
import {HttpClient} from "@angular/common/http";
import {MsgService} from "../msg/msg.service";
import {API} from "../API";
import {GET} from "../../decorators";
import {Observable} from "rxjs";
import {RESPONSE} from "../../models";
import {SessionStorageService} from "../storage";
import {disableDebugTools} from "@angular/platform-browser";

@Injectable({providedIn:"root"})
export class StaffService {
	constructor(
		private readonly http: HttpClient ,
		private readonly msg: MsgService ,
		private readonly sgo: SessionStorageService
	){}

	@GET(API.staff.info)
	staff( para: any ): any | Observable< RESPONSE > {}

	private permissionCache: { [key:string]: boolean} = {} ;
 	public hasPermission(path: string): boolean{
		if( this.permissionCache.hasOwnProperty(path)){
			return this.permissionCache[path]
		} else {
			const menuInfo: any[] = (this.sgo.get('staffInfo').menuInfo[2] || {}).children;
			if( menuInfo.length > 0 && path) {
				const menuArr: any[] = menuInfo  ;
				let permission = false ;
				while (menuArr.length > 0) {
					const item = menuArr.shift() ;
					if( item.path === path ){
						permission = true ;
						break ;
					} else {
						( !!item.children ) && ( menuArr.push( item.children ) ) ;
					}
				}
				return permission ;
			} else {
				return false ;
			}
		}
	}
}
