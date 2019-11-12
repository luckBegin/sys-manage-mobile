import { Injectable } from '@angular/core';
import {ToastService} from "ng-zorro-antd-mobile";
import {Observable} from "rxjs";

@Injectable({providedIn: "root"})
export class MsgService {
	constructor(
		private readonly toast: ToastService
	){} ;


	private duration: number = 2000 ;

	private position: string = 'middle' ;

	public success( tip: string, fn: () => void = null ): void {
		this.toast.success(tip ,this.duration , fn , true , this.position)
	}

	public error( tip: string,  fn: () => void = null ): void {
		this.toast.fail(tip ,this.duration , fn , true , this.position)
	}

	public warn( tip: string, fn: () => void = null ): void {
		this.toast.offline(tip ,this.duration , fn , true , this.position)
	}
}
