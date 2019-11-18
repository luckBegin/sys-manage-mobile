import {Component, OnInit} from '@angular/core' ;
import {StaffService} from "../../../service/system";
import {MsgService} from "../../../service/msg/msg.service";
import {RESPONSE} from "../../../models";
import { QueryModel } from './query.model';
import {ActivatedRoute, Router} from "@angular/router";
import {SessionStorageService} from "../../../service/storage";
import {ModalService} from "ng-zorro-antd-mobile";
import { Location } from '@angular/common'
@Component({
	selector: 'system-bindWx' ,
	styleUrls: ['./bindWx.component.less'],
	templateUrl: './bindWx.component.html'
})
export class BindWxComponent implements OnInit{
	constructor(
		private readonly service: StaffService ,
		private readonly msg: MsgService,
		private readonly activeRoute: ActivatedRoute,
		private readonly sgo: SessionStorageService,
		private readonly modal: ModalService,
		private readonly location: Location
	){}


	ngOnInit(): void {
		const shopInfo = this.sgo.get('staffInfo').shopInfo
		if( shopInfo ) {
			const shopIds = shopInfo.map( item => item.id );
			this.shopId = shopIds.join(',');
		}
		this.activeRoute.queryParams.subscribe( res => {
			this.oid = res.oid ;
		})
		this.getList() ;
	}

	private queryModel: QueryModel = new QueryModel ;
	private shopId: string  ;
	public height: number = document.documentElement.clientHeight;
	private dataComplete: boolean = false ;
	private oid: string = '' ;
	private getList(): void {
		this.queryModel.shopId = this.shopId ;
		this.service.get(this.queryModel)
			.subscribe( (res: RESPONSE) => {
				if(res.data && res.data.length > 0) {
					const arr = res.data.map( item => {
						item.shopName = item.shopOutputVOS.map( subItem => subItem.name ).join(',') ;
						return item ;
					})
					this.staffList = this.staffList.concat( arr ) ;
				} else {
					this.dataComplete = true ;
				}
			})
	}

	public refreshState: any = { currentState: 'deactivate', drag: false };

	public refresh($event: any): void{
		if( this.dataComplete ) {
			return
		} else {
			this.queryModel.currentPage += 1;
			this.refreshState.currentState = 'release';
			this.getList();
		}
	}

	private staffList: any[] = [] ;
	public search($event: string): void{
		this.queryModel = new QueryModel;
		this.queryModel.name = $event ;
		this.queryModel.shopId = this.shopId ;
		this.getList() ;
	}

	public bindWx( item: any ): void{
		this.modal.alert('绑定', `确定将该微信绑定到 ${item.name}`, [
			{ text: '取消'},
			{ text: '确定', onPress: () => {
				this.service.put({ id: item.id , openId: this.oid })
					.subscribe( res => {
						this.staffList = [] ;
						this.msg.success('绑定成功') ;
						this.getList() ;
					})
			}},
		]);
	}
	public back(): void{
		this.location.back() ;
	}
}
