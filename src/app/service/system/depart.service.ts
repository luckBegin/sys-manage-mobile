import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MsgService} from '../msg/msg.service';
import {API} from '../API';
import {GET} from '../../decorators';
import {Observable} from 'rxjs';
import {RESPONSE} from '../../models';

@Injectable({providedIn: 'root'})
export class SystemDepartService {
	constructor(
		private readonly http: HttpClient ,
		private readonly msg: MsgService,
	) {
	}

	@GET(API.system.depart + '/tree')
	getAll(): any | Observable < RESPONSE > {} 
}
