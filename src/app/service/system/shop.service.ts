import { Injectable } from '@angular/core' ;
import {Observable} from "rxjs";
import {RESPONSE} from "../../models";
import {GET} from "../../decorators";
import {API} from "../API";
import {HttpClient} from "@angular/common/http";
import {MsgService} from "../msg/msg.service";

@Injectable({providedIn: "root"})
export class SysShopService {
	constructor(
		private readonly http: HttpClient ,
		private readonly msg: MsgService
	){} ;

	@GET(API.system.shop + '/all')
	getAll( para?: any): any | Observable< RESPONSE > {} ;
}
