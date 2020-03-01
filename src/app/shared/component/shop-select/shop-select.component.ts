import {Component, OnInit} from '@angular/core';
import {SysShopService} from '../../../service/system';
import {SessionStorageService} from '../../../service/storage';
import {ENUM} from '../../../models';
import {AdaptorUtils} from '../../utils';

@Component({
	selector: 'common-shop-select' ,
	templateUrl: './shop-select.component.html' ,
	styleUrls: ['./shop-select.component.less'],
})
export class CommonShopSelectComponent implements OnInit{
	constructor(
		private readonly shopSer: SysShopService ,
		private readonly sgo: SessionStorageService ,
	){}

	private shops: ENUM[] ;
	public shop: ENUM[];

	ngOnInit(): void {
		this.shops = AdaptorUtils.reflect(this.sgo.get('staffInfo').shopInfo , {
			name: 'label',
			id: 'value',
		});
		const selectShopId = this.sgo.get('selectShopId');
		if ( selectShopId ) {
			this.shop = [ this.shops.filter(item => item.value === selectShopId )[0] ] ;
		} else {
			this.sgo.set('selectShopId' , this.shops[0].value ) ;
			this.shop = [ this.shops[0] ];
		}
	}

	public select($event: ENUM[] ): void {
		this.shop = [$event[0]];
		this.sgo.set('selectShopId' , $event[0].value ) ;
		this.shopSer.shopChanged$.next($event[0]) ;
	}
}
