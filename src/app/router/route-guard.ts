import {Injectable, OnInit} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Router} from '@angular/router';
import {SessionStorageService} from '../service/storage' ;

@Injectable({providedIn: 'root'})
export class RouteGuardService implements CanActivate, OnInit {

	constructor(
		private router: Router,
		private sgo: SessionStorageService,
	) {
	}

	ngOnInit() {
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		const userInfo = this.sgo.get('loginInfo');

		if ( userInfo ) {
			return true;
		} else {
			this.router.navigate(['/login']) ;
			return true;
		}
	}
}
