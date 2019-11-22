import {Component, OnInit} from "@angular/core";
import {SessionStorageService} from "../../../service/storage";
import {StaffService, SystemDepartService} from "../../../service/system";
import {MsgService} from "../../../service/msg/msg.service";
import {ActivatedRoute} from "@angular/router";
import {BasicService} from "../../../service/basic/basic.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ENUM, RESPONSE} from "../../../models";
import {AdaptorUtils} from "../../../shared/utils";
import {SysRoleService} from "../../../service/system/role.service";

@Component({
	selector: 'system-staff',
	templateUrl: './staff.component.html',
	styleUrls: ['./staff.component.less']
})
export class SystemStaffComponent implements OnInit{

	constructor(
		private readonly sgo: SessionStorageService ,
		private readonly staff: StaffService,
		private readonly msg: MsgService ,
		private readonly activeRoute: ActivatedRoute,
		private readonly basicSer: BasicService,
		private readonly fb: FormBuilder,
		private readonly roleSer: SysRoleService ,
		private readonly departSer: SystemDepartService
	){};

	ngOnInit(): void {
		this.activeRoute.queryParams.subscribe( res => {
			this.oid = res.oid ;
			this.form.patchValue({
				openId: res.oid 
			})
		});
		const shopInfo = this.sgo.get('staffInfo').shopInfo ;
		this.shopENUM = AdaptorUtils.reflect(shopInfo ,{id: 'value' , name: 'label'} ) ;
		this.getRole();
		this.getDeparts() ;
	}

	private oid: string  ;
	public shopENUM: ENUM[] = [] ;
	public roleENUM: ENUM[] = [] ;
	public departENUM: ENUM[] = [] ;
	public back(): void {
		this.basicSer.historyBack() ;
	}

	public form: FormGroup = this.fb.group({
		'username': [null, [Validators.required]],
		'name': [null, [Validators.required]],
		'remark': [ null ],
		'phoneNumber': [null],
		'password': ['123123'],
		'roleIds': [null, [Validators.required]],
		'shopId' : [null , [Validators.required ]] ,
		'departIds': [ null , [Validators.required]],
		'openId': [ null ]
	})

	private selectedShop: number[] = [] ;
	private selectedRole: ENUM[] = [] ;
	private selectDepart: ENUM[] = [] ;
	public selectChange($event: any , type: string ): void{
		let data = null ;
		if( type === 'shop')
			data = this.selectedShop ;

		if( type === 'role')
			data = this.selectedRole ;

		if( type === 'depart')
			data = this.selectDepart ;

		const idx = data.indexOf( $event.value )
		if( idx > -1 ) {
			data.splice(idx , 1);
		} else {
			data.push($event.value);
		}
	}

	private getRole(): void {
		this.roleSer.getAll()
			.subscribe( (res: RESPONSE) => {
				this.roleENUM = AdaptorUtils.reflect(res.data , { name: 'label' , id: 'value'})
			})
	}

	private getDeparts(): void {
		this.departSer.getAll()
			.subscribe( ( res: RESPONSE ) => {
				let stack = res.data ;
				const enums = [] ;
				while (stack.length) {
					const item = stack.shift() ;
					enums.push({
						value: item.id ,
						label: item.name
					});

					if( item.children && item.children.length ) {
						stack = stack.concat( item.children ) ;
					}
				}
				this.departENUM = enums ;
			})
	}
	private add(): void{
		this.form.patchValue({
			roleIds: this.selectedRole.join(','),
			shopId: this.selectedShop.join(','),
			departIds: this.selectDepart.join(',')
		});

		if( !this.form.valid ) {
			this.msg.error('请检查每项填写的信息')
			return ;
		}
		this.staff.post( this.form.value )
			.subscribe( ( res: RESPONSE ) => {
				if( this.oid ) {
					this.basicSer.historyBack() ;
				} else {
					this.form.reset();
					this.form.patchValue({ password: '123123'})
				}
			});
	}
}
