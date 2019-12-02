import { Injectable } from '@angular/core' ;
import {HttpClient} from '@angular/common/http';
import {MsgService} from '../msg/msg.service';
import {GET} from '../../decorators';
import {API} from '../API';
import {Observable} from 'rxjs';
import {RESPONSE} from '../../models';

@Injectable({providedIn: 'root'})
export class GoodsService {
    constructor(
        private readonly http: HttpClient ,
        private readonly msg: MsgService
    ){}

    @GET(API.goods.subClassify + '/all')
    subClassify(para?: any): any | Observable< RESPONSE > {}

    @GET(API.goods.childClassify)
    childClassify( para?: any):  any | Observable< RESPONSE > {}
}
