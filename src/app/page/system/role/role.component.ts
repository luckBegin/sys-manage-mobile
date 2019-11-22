import {Component, OnInit} from "@angular/core";
import {SysRoleService} from "../../../service/system/role.service";
import {ENUM, RESPONSE} from '../../../models'
import {BasicService} from "../../../service/basic/basic.service";
import {QueryModel} from "./query.model";
import {StaffService} from "../../../service/system";
import {AdaptorUtils} from "../../../shared/utils";
import {ModalService} from "ng-zorro-antd-mobile";
import {MsgService} from "../../../service/msg/msg.service";
import {Router} from "@angular/router";
@Component({
	selector: 'system-role' ,
	templateUrl: './role.component.html' ,
	styleUrls: ['./role.component.less']
})
export class SystemRoleComponent implements OnInit{
	constructor(
		private readonly service: SysRoleService ,
		private readonly basicSer: BasicService ,
		private readonly staffSer: StaffService ,
		private readonly modal: ModalService ,
		private readonly msg: MsgService,
		private readonly router: Router
	){} ;

	ngOnInit(): void {
		this.getRole() ;
	}

	public role: ENUM[] = [] ;
	public emptyData: boolean = false ;
	private getRole(): void {
		this.basicSer.showLoad() ;
		this.service.getAll()
			.subscribe(( res: RESPONSE ) => {
				if( res.data.length ) {
					this.role = AdaptorUtils.reflect(res.data, { name: 'key' , id: 'label'}) ;
					this.listQueryModel.roleId = this.role[0].label ;
					this.getList() ;
					this.emptyData = false ;
				} else {
					this.emptyData = true ;
				}
				this.basicSer.hideLoad();
			});
	}

	private listQueryModel: QueryModel = new QueryModel ;
	public height: number = document.documentElement.clientHeight;
	public staffList: any[] = [] ;
	private dataComplete: boolean = false ;
	public loading: boolean = false ;
	public totalNumber: number = 0;
	private getList( refresh: boolean = false ): void {
		if(refresh)
			this.loading = true ;
		this.staffSer.get( this.listQueryModel )
			.subscribe( (res: RESPONSE) => {
				setTimeout( () => {
					if(refresh)
						this.staffList = [] ;
					const arr = res.data.map( item => {
						item.shopName = item.shopOutputVOS.map( subItem => subItem.name ).join(',') ;
						return item ;
					})
					this.staffList = this.staffList.concat( arr ) ;
					if( res.page && res.page.totalNumber <= this.staffList.length ) {

						this.dataComplete = true ;
						this.refreshState.currentState = 'noMore'
					} else {
						this.refreshState.currentState = 'finish';
					}
					this.totalNumber = res.page ? res.page.totalNumber : 0 ;
					this.loading = false ;
				}, 200)
			})
	}

	public roleChange( $event: any = null): void {
		if( this.listQueryModel.roleId === $event) return ;
		this.listQueryModel.roleId = $event ;
		this.dataComplete = false ;
		this.getList(true) ;
	}

	public refreshState: any = { currentState: 'deactivate', drag: false };
	public refresh($event: any): void{
		if( this.dataComplete ) {
			return
		} else {
			this.listQueryModel.currentPage += 1;
			this.refreshState.currentState = 'release';
			this.getList();
		}
	}

	public remove( item: any): void {
		const roleIds = item.roleIds ? item.roleIds.split(",") : [] ;
		const resetIds = roleIds.filter( item => item / 1 !== this.listQueryModel.roleId ) ;
		this.modal.alert('移除', `确定将${item.name}从该角色移除`, [
			{ text: '取消'},
			{ text: '确定', onPress: () => {
				this.staffSer.put({
					id: item.id ,
					roleIds: resetIds
				})
					.subscribe( (res: RESPONSE) => {
						this.msg.success('操作成功');
						this.getList(true) ;
					})
			}},
		]);
	}

	public add(): void {
		this.router.navigate(['/system/bindRole'] , {
			queryParams: {
				id:this.listQueryModel.roleId
			}
		})
	}
}
