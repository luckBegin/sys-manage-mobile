import {Injectable, OnInit} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Router} from '@angular/router';
import {SessionStorageService} from '../../service/storage' ;

@Injectable({providedIn: 'root'})
export class LoginGuard implements CanActivate, OnInit {

	constructor(
		private router: Router,
		private sgo: SessionStorageService,
	) {
	}

	ngOnInit() {
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		const staffInfo = this.sgo.get('staffInfo');
		if ( staffInfo ) {
			return true;
		} else {
			window.location.href = 'http://api.jpgqs.cn/wechat/menu?path=' + state.url ;
			return true;
		}
	}
}
