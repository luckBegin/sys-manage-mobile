import {Component, OnInit} from '@angular/core' ;
import {BasicService} from '../../../service/basic/basic.service';
import {Router} from '@angular/router';
import {RoomService} from '../../../service/room';
import {RESPONSE} from '../../../models';
import {GoodsService} from '../../../service/goods/goods.service';
import { ChildClassifyQuery} from './query.module';
import {MsgService} from '../../../service/msg/msg.service';
import {SessionStorageService} from '../../../service/storage';
import {OrderRoomService} from '../../../service/order/order.service';

@Component({
	selector: 'order-make',
	templateUrl: './make.component.html' ,
	styleUrls: ['./make.component.less'],
})
export class OrderMakeComponent implements OnInit{
	constructor(
		private readonly basicSer: BasicService,
		private readonly router: Router,
		private readonly roomSer: RoomService,
		private readonly goodsSer: GoodsService,
		private readonly msg: MsgService ,
		private readonly sgo: SessionStorageService,
		// TODO delete this service
		private readonly orderSer: OrderRoomService,
	){}

	ngOnInit(): void {
	}

	public orderShow: boolean = false ;

	public orderItemShow: boolean = false ;

	public roomList: any = { type: [] , area: [] } ;

	public selectRoom: any = {};

	public height: number = document.documentElement.clientHeight;

	public loading: boolean = false ;

    public back(): void {
    	this.basicSer.historyBack() ;
    }

    public toOrder(): void{
    	this.orderShow = true ;
    	this.getRoomList();
    }

    private getRoomList(): void {
    	this.roomSer.consume()
		    .subscribe( (res: RESPONSE) => {
				const typeMap = {} ;
				const areaMap = {} ;

				if ( res.data.length <= 0 )
					this.msg.warn('暂未有房台处于消费状态,请先开台') ;

				res.data.forEach( item => {
					const typeId = item.typeInfo.id;
					const areaId = item.areaInfo.id ;

					if ( typeMap.hasOwnProperty(typeId)){
						typeMap[typeId].data.push( item );
					} else {
						typeMap[typeId] = {
							name: item.typeInfo.name ,
							data: [ item ],
						};
					}

					if ( areaMap.hasOwnProperty(areaId)){
						areaMap[areaId].data.push( item );
					} else {
						areaMap[areaId] = {
							name: item.areaInfo.name ,
							data: [ item ],
						};
					}
				});
				const area = [] ;
				const type = [] ;

				Object.keys(areaMap).forEach(key => {
					area.push(areaMap[key]);
				});

				Object.keys(typeMap).forEach(key => {
					type.push(typeMap[key]);
				});

				this.roomList = { type , area };
		    });
    }

    public selected(item: any): void{
    	this.selectRoom = item ;
    	this.orderItemShow = true ;
    	this.getSubClassify() ;
    	this.getChildClassify(true);
    }

    public subClassifyList: any[] = [] ;
    private getSubClassify(): void{
    	this.goodsSer.subClassify()
		    .subscribe( (res: RESPONSE) => {
		    	this.subClassifyList = res.data ;
		    });
    }

    public selectSubClassify: number = null ;

    private childClassifyList: any[] = [] ;

    public totalNumber: number = 0 ;

    public childClassifyQuery: ChildClassifyQuery = new ChildClassifyQuery ;

    public selectedGoods: any = {} ;

    private getChildClassify( refresh: boolean = false ): void {
	    if (refresh)
		    this.loading = true;
	    this.goodsSer.childClassify(this.childClassifyQuery)
		    .subscribe((res: RESPONSE) => {
			    setTimeout(() => {
				    if (refresh)
					    this.childClassifyList = [];
				    this.childClassifyList = this.childClassifyList.concat( res.data ) ;
				    if (res.page && res.page.totalNumber <= this.childClassifyList.length) {
					    this.dataComplete = true;
					    this.refreshState.currentState = 'noMore';
				    } else {
					    this.refreshState.currentState = 'finish';
				    }
				    this.totalNumber = res.page ? res.page.totalNumber : 0;
				    this.loading = false;
			    }, 200);
		    });
    }

    public subSelect(type: number): void {
    	this.selectSubClassify = type ;
    	this.childClassifyQuery = new ChildClassifyQuery();
	    this.childClassifyQuery.subClassifyId = type ;
    	this.getChildClassify(true);
    }

	public refreshState: any = { currentState: 'deactivate', drag: false };

    private dataComplete: boolean = false ;

	public refresh($event: any): void{
		if ( this.dataComplete ) {
			return;
		} else {
			this.childClassifyQuery.currentPage += 1;
			this.refreshState.currentState = 'release';
			this.getChildClassify();
		}
	}

	public goodsSelect($event: any , item: any): void {
		if ( !this.selectedGoods.hasOwnProperty(item.subClassifyId) ) {
			this.selectedGoods[item.subClassifyId] = { [item.id] : { count: $event , item} } ;
		} else {
			this.selectedGoods[item.subClassifyId][item.id] = { count: $event , item} ;
		}
	}

	public getSelectNum(parentId: number , id: number): number{
		return this.selectedGoods[parentId] ?
			this.selectedGoods[parentId][id] ? this.selectedGoods[parentId][id].count : 0
			: 0 ;
	}

	public getClassifySum(id): number{
		if ( !this.selectedGoods.hasOwnProperty(id) ) return 0;
		const item = this.selectedGoods[id] ;
		let count = 0 ;
		Object.keys(item).forEach( key => {
			count += item[key].count / 1 ;
		});
		return count ;
	}

	public next(): void {
		const data = { money: 0 , data: [] , room: this.selectRoom } ;
		Object.keys(this.selectedGoods).forEach( parentKey => {
			const item = this.selectedGoods[parentKey] ;
			if ( item ) {
				Object.keys(item).forEach(subKey => {
					const subItem = item[subKey].item ;
					if ( item[subKey].count > 0 )
						data.money += Math.ceil(subItem.price * item[subKey].count ) ;

					data.data.push({
						count: item[subKey].count,
						item: subItem,
					});
				});
			}
		});

		if ( data.data.length === 0  || data.money === 0 ) {
			this.msg.warn('请选择商品在进行下单');
			return;
		}
		this.sgo.set('orderInfo' , data );
		this.orderSer.create(data)
			.subscribe( res => {
				console.log( res ) ;
			});
		// this.router.navigate(['/order/ordered'])
	}
}
