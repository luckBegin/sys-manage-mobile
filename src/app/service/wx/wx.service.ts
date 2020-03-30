import {Injectable} from '@angular/core' ;
import {HttpClient} from '@angular/common/http';
import {MsgService} from '../msg/msg.service';
import {API} from '../API';
import {GET} from '../../decorators';
import {Observable} from 'rxjs';
import {RESPONSE} from '../../models';

@Injectable({providedIn: 'root'})
export class WxService{
	constructor(
		private readonly http: HttpClient,
		private readonly msg: MsgService,
	) {}

	@GET(API.wx.getConfigByCode)
	getConfigByCode(para?: any): any | Observable< RESPONSE > {}
}
