import {Component, OnInit} from '@angular/core' ;
import {StaffService} from '../../../service/system';
import {MsgService} from '../../../service/msg/msg.service';
import {RESPONSE} from '../../../models';
import { QueryModel } from './query.model';
import {ActivatedRoute, Router} from '@angular/router';
import {SessionStorageService} from '../../../service/storage';
import {ModalService} from 'ng-zorro-antd-mobile';
import { Location } from '@angular/common';
import {BasicService} from '../../../service/basic/basic.service';
@Component({
	selector: 'system-bindRole' ,
	styleUrls: ['./bindRole.component.less'],
	templateUrl: './bindRole.component.html',
})
export class BindRoleComponent implements OnInit{
	constructor(
		private readonly service: StaffService ,
		private readonly msg: MsgService,
		private readonly activeRoute: ActivatedRoute,
		private readonly sgo: SessionStorageService,
		private readonly modal: ModalService,
		private readonly location: Location,
		private readonly basicSer: BasicService,
	){}

	ngOnInit(): void {
		const shopInfo = this.sgo.get('staffInfo').shopInfo;
		if ( shopInfo ) {
			const shopIds = shopInfo.map( item => item.id );
			this.shopId = shopIds.join(',');
		}
		this.activeRoute.queryParams.subscribe( res => {
			this.roleId = res.id.toString();
		});
		this.getList() ;
	}

	private queryModel: QueryModel = new QueryModel ;

	private shopId: string  ;

	public height: number = document.documentElement.clientHeight;

	private dataComplete: boolean = false ;

	private roleId: string = '' ;

	private getList(): void {
		this.queryModel.shopId = this.shopId ;
		this.service.get(this.queryModel)
			.subscribe( (res: RESPONSE) => {
				if (res.data && res.data.length > 0) {
					const arr = res.data.map( item => {
						item.shopName = item.shopOutputVOS.map( subItem => subItem.name ).join(',') ;
						return item ;
					});
					this.staffList = this.staffList.concat( arr ) ;
				} else {
					this.dataComplete = true ;
				}
			});
	}

	public refreshState: any = { currentState: 'deactivate', drag: false };

	public refresh($event: any): void{
		if ( this.dataComplete ) {
			return;
		} else {
			this.queryModel.currentPage += 1;
			this.refreshState.currentState = 'release';
			this.getList();
		}
	}

	public staffList: any[] = [] ;
	public search($event: string): void{
		this.queryModel = new QueryModel;
		this.queryModel.name = $event ;
		this.queryModel.shopId = this.shopId ;
		this.staffList = [] ;
		this.getList() ;
	}

	public back(): void{
		this.basicSer.historyBack();
	}

	public selected: any[] = [];
	public select($event: number): void {
		const idx = this.selected.indexOf($event) ;

		if ( idx <= -1 ) {
			this.selected.push($event);
		} else {
			this.selected.splice(idx , 1) ;
		}
	}

	public add(): void {
		const data = [];
		this.selected.forEach(item => {
			const roleIds = item.roleIds ? item.roleIds.split(',') : [];
			if ( !roleIds.includes(this.roleId) ) {
				roleIds.push(this.roleId);
				data.push({
					id: item.id ,
					roleIds: roleIds.join(','),
				});
			}
		});

		this.basicSer.showLoad('处理中...');
		this.service.put(data)
			.subscribe( res => {
				this.basicSer.hideLoad();
				this.msg.success('操作成功' , () => {
					this.basicSer.historyBack();
				});
			});
	}
}
