import {Injectable} from "@angular/core";
import {ModalService, ToastService} from "ng-zorro-antd-mobile";
import {Observable, timer} from "rxjs";
import {Location} from "@angular/common";
import {Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class BasicService {
	constructor(
		private readonly toast: ToastService ,
		private readonly location: Location ,
		private readonly router: Router,
	){} ;

	private _currentHide: boolean = true ;
	public showLoad(tip: string = '加载中...'): void{
		timer(0)
			.subscribe( val => {
				if( this._currentHide ) {
					this.toast.loading(tip , 0 , null , true )
					this._currentHide = false ;
				}
			})
	}

	public hideLoad(): void{
		this._currentHide = true ;
		this.toast.hide()
	}

	public historyBack(): void{
		const len: number = History.length ;
		console.log( 'history.length=' + len ) ;
		if(len) {
			this.location.back()
 		} else {
			this.navigateToMenu();
		}
	}

	public navigateToMenu(): void {
		this.router.navigate(['/menu'])
	}
}
