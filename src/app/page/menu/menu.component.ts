import {Component, OnInit} from '@angular/core';
import {MsgService} from "../../service/msg/msg.service";
import {SessionStorageService} from "../../service/storage";
import {Route, Router} from "@angular/router";

@Component({
	selector: 'app-menu' ,
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit{
	constructor(
		private readonly msg: MsgService ,
		private readonly sgo: SessionStorageService,
		private readonly router: Router
	){}

	public menu: any[] = [] ;

	ngOnInit(): void {
		const menu: any[] = this.sgo.get('staffInfo').menuInfo[2].children ;
		if( menu.length === 0 ) {
			this.router.navigate(['/error/403'])
		} else {
			this.menu = menu;
		}
	}

	public toMenu(item: any): void {
		console.log( item.path ) ;
		if( item.path )
			this.router.navigate([item.path]) ;
	}
}
