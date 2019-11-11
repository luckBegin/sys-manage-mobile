import {Injectable, OnInit} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Router} from '@angular/router';
import {SessionStorageService} from '../../service/storage' ;
import {StaffService} from "../../service/system";

@Injectable({providedIn: 'root'})
export class PermissionGuard implements CanActivate {

	constructor(
		private router: Router,
		private sgo: SessionStorageService,
		private staffSer: StaffService
	) {
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		if ( this.staffSer.hasPermission(state.url) ) {
			return true;
		} else {
			this.router.navigate(['/error/403']) ;
			return true;
		}
	}
}
