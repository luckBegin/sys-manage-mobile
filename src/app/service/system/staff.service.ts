import { Injectable } from '@angular/core' ;
import {HttpClient} from "@angular/common/http";
import {MsgService} from "../msg/msg.service";
import {API} from "../API";
import {GET, POST, PUT} from "../../decorators";
import {Observable} from "rxjs";
import {RESPONSE} from "../../models";
import {SessionStorageService} from "../storage";

@Injectable({providedIn:"root"})
export class StaffService {
	constructor(
		private readonly http: HttpClient ,
		private readonly msg: MsgService ,
		private readonly sgo: SessionStorageService
	){}

	@GET(API.staff.list + '/byUid')
	staff( para: any ): any | Observable< RESPONSE > {}

	@GET(API.staff.list)
	get( para?: any): any | Observable< RESPONSE> { } ;

	@POST(API.staff.list)
	post( para?: any): any | Observable< RESPONSE> { } ;

	@PUT(API.staff.list)
	put( data?: any): any | Observable< RESPONSE > {} ;

	private permissionCache: { [key:string]: boolean} = {} ;
 	public hasPermission(path: string): boolean{
		if( this.permissionCache.hasOwnProperty(path)){
			return this.permissionCache[path]
		} else {
			let menuInfo: any[] = (this.sgo.get('staffInfo').menuInfo[2] || {}).children;
			if( menuInfo.length > 0 && path) {
				let menuArr: any[] = menuInfo  ;
				let permission = false ;
				while (menuArr.length > 0) {
					const item = menuArr.shift() ;
					if( item.path === path ){
						permission = true ;
						break ;
					} else {
						( !!item.children ) && ( menuArr = menuArr.concat( item.children ) ) ;
					}
				}
				return permission ;
			} else {
				return false ;
			}
		}
	}

	@PUT(API.staff.list + '/changePass')
	changePass( data?: any): any | Observable< RESPONSE > {} ;
}
