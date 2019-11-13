import { Injectable } from '@angular/core' ;
import {API} from "../API";
import {GET, POST, PUT} from "../../decorators";
import {Observable} from "rxjs";
import {ENUM, RESPONSE} from "../../models";
import {HttpClient} from "@angular/common/http";
import {MsgService} from "../msg/msg.service";

@Injectable({providedIn: "root"})
export class RoomService {
	constructor(
		private readonly http: HttpClient ,
		private readonly msg: MsgService
	){};

	@POST(API.room.book)
	bookPost( data?: any ): any | Observable< RESPONSE > {} ;

	@PUT(API.room.book)
	bookPut( data?: any ): any | Observable< RESPONSE > {} ;

	@GET(API.room.book +'/staff')
	getStaffBookList( query?: any ): any | Observable< RESPONSE > {} ;

	@GET(API.room.type)
	typeGet( data?: any ): any | Observable< RESPONSE > {} ;

	static BookStatsEnums: ENUM[] = [
		{ key: '提交' , value: 0} ,
		{ key: '取消', value: 1} ,
		{ key: '安排' , value: 2} ,
	]
}
