import {Component, OnInit} from '@angular/core';
import {SysShopService} from "./service/system";

@Component({
	selector: 'app-root',
	template: '<router-outlet (activate)="activate($event)"></router-outlet>'
})
export class AppComponent implements OnInit{
	constructor(
		private readonly shopSer: SysShopService
	){}

	private currentComponent: any ;
	ngOnInit(): void {
		this.shopSer.shopChanged$
			.subscribe( data => {
				this.currentComponent.ngOnInit()  ;
			});
	}

	activate($event: any): void {
		this.currentComponent = $event ;
	}
}
