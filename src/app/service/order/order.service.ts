import { Injectable } from '@angular/core' ;
import {HttpClient} from '@angular/common/http';
import {MsgService} from '../msg/msg.service';
import {GET, POST} from '../../decorators';
import {API} from '../API';
import {Observable} from 'rxjs';
import {RESPONSE} from '../../models';

@Injectable({providedIn: 'root'})
export class OrderRoomService {
    constructor(
        private readonly http: HttpClient ,
        private readonly msg: MsgService,
    ){}

    @POST(API.room.order + '/make')
    create(para?: any): any | Observable< RESPONSE > {}
}
