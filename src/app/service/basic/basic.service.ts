import {Injectable} from "@angular/core";
import {ToastService} from "ng-zorro-antd-mobile";
import {Observable, timer} from "rxjs";
import {Location} from "@angular/common";

@Injectable({providedIn: 'root'})
export class BasicService {
	constructor(
		private readonly toast: ToastService ,
		private readonly location: Location
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
		this.location.back() ;
	}
}
