import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API} from '../API';
import {GET} from '../../decorators';
import {Observable} from 'rxjs';
import {RESPONSE} from '../../models';
import {MsgService} from '../msg/msg.service';

@Injectable({providedIn: 'root'})
export class WxMsgService {
	constructor(
		private readonly http: HttpClient ,
		private readonly msg: MsgService,
	){}

	@GET(API.wx.msg)
	get( para?: any): any | Observable< RESPONSE > {}

	@GET(API.wx.msgByUser)
	getMsgByUser( para?: any): any | Observable< RESPONSE > {}

}
