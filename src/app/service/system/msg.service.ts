import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {API} from "../API";
import {GET} from "../../decorators";
import {Observable} from "rxjs";
import {RESPONSE} from "../../models";

@Injectable({providedIn: "root"})
export class MsgService {
	constructor(
		private readonly http: HttpClient ,
		private readonly msg: MsgService
	){}

	@GET(API.wx.msg)
	get( para?: any): any | Observable< RESPONSE > {} ;
}
