import { Component , OnInit } from '@angular/core' ;
import {RoomService} from "../../../service/room";
import {SysShopService} from "../../../service/system";
import {ENUM, RESPONSE} from "../../../models";
import {AdaptorUtils, DateUtils} from "../../../shared/utils";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SessionStorageService} from "../../../service/storage";
import {MsgService} from "../../../service/msg/msg.service";
import {ModalService, ToastService} from "ng-zorro-antd-mobile";
import {BookListQueryModel} from "./query.model";

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
		private readonly toast: ToastService,
		private readonly modal: ModalService
	){};

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
	private dataComplete: boolean = false ;
	private editMark: boolean = false ;

	public form: FormGroup = this.fb.group({
		name: [ null, [ Validators.required ] ],
		typeId: [ null, [ Validators.required ] ],
		tel: [ null, [ Validators.required ] ],
		reserveDate: [ null, [ Validators.required ] ],
		num: [ null ] ,
		shopId: [ null, [ Validators.required ] ],
		id: [null],
		status: [ 0 ] ,
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
		this.toast.loading('提交中。。。',0);
		this.form.patchValue({ status: 0}) ;

		const service = this.editMark ? this.service.bookPut.bind(this.service) : this.service.bookPost.bind(this.service) ;
		service(this.form.value)
			.subscribe((res: RESPONSE) => {
				this.form.reset();
				this.msg.success('操作成功') ;
				this.toast.hide();
				this.editMark = false ;

				this.selectShop = '请选择' ;
				this.selectArea = '请选择' ;
				this.currentTime = null ;
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
		if( this.dataComplete ) {
			return
		} else {
			this.bookListQueryModel.currentPage += 1;
			this.refreshState.currentState = 'release';
			this.getList();
		}
	}

	private getList(refresh: boolean = false): void{
		this.service.getStaffBookList(this.bookListQueryModel)
			.subscribe( (res: RESPONSE) => {
				this.toast.hide();
				if( res.data && res.data.length ) {
					const now = DateUtils.getNow(false , 'y-m-d');
					res.data.forEach( item => {
						const type = this.typeENUM.find( subItem => subItem.value === item.typeId );
						const shop = this.shopENUM.find( subItem => subItem.value === item.shopId );
						item.typeName = (type || {label: ''} ).label ;
						item.shopName = (shop || {label: ''} ).label ;
						item.statusName = RoomService.BookStatsEnums.find( subItem => subItem.value === item.status ).key
						item.isNow = now === DateUtils.format(item.reserveDate , 'y-m-d') ;
						if( item.status === 0 )
							item.style = { background:'rgb(255, 91, 5)'}
						if( item.status === 1 )
							item.style = { background:'rgb(241, 151, 54)'}
						if( item.status === 2 )
							item.style = { background: 'rgb(33, 182, 138)' }
					});
					if(!refresh)
						this.bookList = this.bookList.concat(res.data) ;
					else
						this.bookList = this.bookList = res.data ;
				}
				if( res.page.totalNumber && res.page.totalNumber <= this.bookList.length ) {
					this.dataComplete = true ;
					this.refreshState.currentState = 'noMore'
				} else {
					this.refreshState.currentState = 'finish';
				}
			})
	}

	public cancelItem( item: any): void {
		this.modal.alert('取消', '确认取消该预定?', [
			{ text: '取消'},
			{ text: '确定', onPress: () => {
				this.bookCancel(item) ;
			}}
		]);
	}

	private bookCancel( item: any ): void {
		this.toast.loading('处理中...',0) ;
		this.service.bookPut({ id: item.id , status: 1 })
			.subscribe( ( res:RESPONSE ) => {
				this.msg.success('预定已取消') ;
				this.bookListQueryModel = new BookListQueryModel ;
				this.getList(true) ;
			})
	}

	public editChanel( item: any ): void {
		this.modal.alert('修改', '确认修改该预定信息?', [
			{ text: '取消'},
			{ text: '确定', onPress: () => {
				item.reserveDate = DateUtils.format( item.reserveDate ) ;
				this.form.patchValue(item) ;
				this.bookListShow = false ;
				this.bookListQueryModel = new BookListQueryModel ;
				this.bookList = [] ;
				this.selectShop = (this.shopENUM.find(subItem => subItem.value === item.shopId)).label as string ;
				this.selectArea = (this.typeENUM.find(subItem => subItem.value === item.typeId)).label as string ;
				this.currentTime = new Date( item.reserveDate ) ;
				this.editMark = true ;
			}}
		]);
	}
}
