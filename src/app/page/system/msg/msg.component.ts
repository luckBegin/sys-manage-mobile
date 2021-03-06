import {Component, OnInit} from '@angular/core' ;
import {MsgService} from "../../../service/msg/msg.service";
import { QueryModel , MsgQueryModel} from './query.model' ;
import {WxMsgService} from "../../../service/system";
import {RESPONSE} from "../../../models";
import {SessionStorageService} from "../../../service/storage";
import {Router} from "@angular/router";
@Component({
	selector: 'system-msg' ,
	templateUrl: './msg.component.html',
	styleUrls: ['./msg.component.less']
})
export class MsgComponent implements OnInit{
	constructor(
		private readonly msg: MsgService,
		private readonly wxMsgSer: WxMsgService,
		private readonly sgo: SessionStorageService ,
		private readonly router: Router
	) {}


	ngOnInit(): void {
		this.getList() ;
		const staffInfo = this.sgo.get('staffInfo') ;
		this.usrInfo = staffInfo.userInfo ;
		this.wxUserInfo = staffInfo.wxUserInfo ;
	}

	private queryModel: QueryModel = new QueryModel() ;

	public usrInfo: any ;
	public wxUserInfo: any ;

	public height: number = document.documentElement.clientHeight;
	public dataComplete: boolean = false ;
	public refreshState: any = { currentState: 'deactivate', drag: false };
	public msgList: any[] = [] ;
	public userMsg: any = {} ;
	public msgListUser: any[] = [] ;
	private getList(): void{
		this.wxMsgSer.get( this.queryModel )
			.subscribe( (res: RESPONSE) => {
				if( res.data && res.data.length > 0 ) {
					this.msgList = this.msgList.concat( res.data ) ;
				} else {
					this.dataComplete = true ;
				}
			})
	}

	public refresh($event: any): void{
		if( this.dataComplete ) {
			return
		} else {
			this.queryModel.currentPage += 1;
			this.refreshState.currentState = 'release';
			this.getList();
		}
	}

	public msgRecordShow: boolean = false ;

	private msgListQuery: MsgQueryModel = new MsgQueryModel() ;

	public showMsg( item ): void{
		this.msgListQuery.openId = item.openId ;
		this.wxMsgSer.getMsgByUser(this.msgListQuery)
			.subscribe( ( res: RESPONSE) => {
				this.msgRecordShow = true ;
				this.userMsg.info = item ;
				this.msgListUser = res.data ;
			})
	}

	public hideList(): void {
		this.msgRecordShow = false ;
	}

	public bind(type: 'wx' | 'staff'): void {
		if( this.userMsg.info.openId ) {
			const url = type === 'wx' ? '/system/bindWx' : '/system/staff';
 			this.router.navigate([url] , {
				queryParams: {
					oid:this.userMsg.info.openId
				}
			})
		} else {
			this.msg.warn('未检测到用户微信ID')
		}
	}
}
