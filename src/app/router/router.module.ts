import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "../default/login/login.component";
import {ErrorComponent} from "../default/error/error.component";
import {LoginGuard} from "./guard/login.guard";
import {PermissionGuard} from "./guard/permission.guard";

const routes: Routes = [
	{ path: 'login' , component: LoginComponent },
	{
		path: 'promotion' ,
		loadChildren : '../page/promotion/promotion.module#PromotionModule',
		canActivate: [ LoginGuard, PermissionGuard]
	},
	{ path: 'error/:code' , component: ErrorComponent , data: {title: '异常提醒'}}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class RouteRoutingModule {
}
