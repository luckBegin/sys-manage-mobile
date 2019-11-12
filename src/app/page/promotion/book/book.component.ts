import { Component , OnInit } from '@angular/core' ;
import {RoomService} from "../../../service/room";
import {SysShopService} from "../../../service/system";
import {ENUM, RESPONSE} from "../../../models";
import {AdaptorUtils, DateUtils} from "../../../shared/utils";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SessionStorageService} from "../../../service/storage";
import {MsgService} from "../../../service/msg/msg.service";
import {ToastService} from "ng-zorro-antd-mobile";
import {BookListQueryModel} from "./query.model";
import {nodeDebugInfo} from "@angular/compiler-cli/src/ngtsc/util/src/typescript";

@Component({
	selector: 'promotion-book' ,
	styleUrls: ['./book.component.less'] ,
	templateUrl: './book.component.html'
})
export class PromotionBookComponent implements OnInit{
	constructor(
		private readonly service: RoomService ,
		private readonly shopSer: SysShopService ,
		private readonly fb: FormBuilder ,
		private readonly sgo: SessionStorageService ,
		private readonly msg: MsgService,
		private readonly toast: ToastService
	){} ;

	ngOnInit(): void {
		this.getTypeEnum() ;
		const shopInfo = this.sgo.get('staffInfo').shopInfo ;
		this.shopENUM = AdaptorUtils.reflect(shopInfo ,{id: 'value' , name: 'label'} ) ;
	}

	public shopENUM: ENUM[] = [] ;
	public typeENUM: ENUM[] = [] ;

	public selectShop: string = '请选择' ;
	public selectArea: string = '请选择' ;
	public currentTime: Date = null ;
	public minTime: Date = new Date() ;

	public height: number = document.documentElement.clientHeight;
	public bookListShow: boolean = false ;
	public bookDataLoading: boolean = false ;
	public bookList: any[] = [];
	public refreshState: any = { currentState: 'deactivate', drag: false };
	private bookListQueryModel: BookListQueryModel ;
	private dataComplate: boolean = false ;

	public form: FormGroup = this.fb.group({
		name: [ null, [ Validators.required ] ],
		typeId: [ null, [ Validators.required ] ],
		tel: [ null, [ Validators.required ] ],
		reserveDate: [ null, [ Validators.required ] ],
		num: [ null ] ,
		shopId: [ null, [ Validators.required ] ],
		id: [null],
		status: [ null ] ,
		remark: [ null ]
	});

	private getTypeEnum(): void {
		this.service.typeGet()
			.subscribe( ( res:RESPONSE) => {
				this.typeENUM = AdaptorUtils.reflect(res.data , {id: 'value' , name: 'label'});
			});
	}

	public selectChange( $event:any[] , type: 'shop' | 'type'): void {
		if( type === 'shop' ) {
			this.selectShop = $event[0].label;
			this.form.patchValue({shopId: $event[0].value}) ;
		}

		if( type === 'type' ) {
			this.selectArea = $event[0].label ;
			this.form.patchValue({ typeId: $event[0].value }) ;
		}
	}

	public timeChange($event: Date): void {
		this.currentTime = $event ;
		this.form.patchValue({
			reserveDate: DateUtils.format($event.getTime(), 'y-m-d h:i')
		})
	}

	public format( date: Date): string{
		return date ? DateUtils.format(date.getTime() , 'm-d h:i')
			: '请选择到店时间'
	}

	public post(): void{
		if(!this.form.valid) {
			this.msg.warn('请填写每项信息后在提交') ;
			return ;
		}
		this.toast.loading('提交中。。。')
		this.service.bookPost(this.form.value)
			.subscribe((res: RESPONSE) => {
				this.form.reset();
				this.msg.success('预订成功') ;
				this.toast.hide()
			} , err => {
				this.toast.hide();
			})
	}

	public showList(): void{
		this.bookListShow = true ;
		this.bookDataLoading = true ;
		this.bookListQueryModel = new BookListQueryModel ;
		this.getList() ;
	}

	public hideList(): void{
		this.bookListShow = false ;
		this.bookDataLoading = false ;
	}

	public refresh($event: any): void {
		if( this.dataComplate ) {
			return
		} else {
			this.bookListQueryModel.currentPage += 1;
			this.refreshState.currentState = 'release';
			this.getList();
		}
	}

	private getList(): void{
		this.service.getStaffBookList(this.bookListQueryModel)
			.subscribe( (res: RESPONSE) => {
				if( res.data && res.data.length ) {
					res.data.forEach( item => {
						const type = this.typeENUM.find( subItem => subItem.value === item.typeId );
						const shop = this.shopENUM.find( subItem => subItem.value === item.shopId );
						item.typeName = (type || {label: ''} ).label ;
						item.shopName = (shop || {label: ''} ).label ;
						item.statusName = RoomService.BookStatsEnums.find( subItem => subItem.value === item.status ).key

						if( item.status === 0 )
							item.style = { background:'rgb(255, 91, 5)'}
						if( item.status === 1 )
							item.style = { background:'rgb(241, 151, 54)'}
						if( item.status === 2 )
							item.style = { background: 'rgb(33, 182, 138)' }
					});
					this.bookList = this.bookList.concat(res.data) ;
				}
				if( res.page.totalNumber && res.page.totalNumber <= this.bookList.length ) {
					this.dataComplate = true ;
					this.refreshState.currentState = 'noMore'
				} else {
					this.refreshState.currentState = 'finish';
				}
			})
	}
}
