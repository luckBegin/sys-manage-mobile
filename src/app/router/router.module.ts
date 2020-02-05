import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from '../default/login/login.component';
import {ErrorComponent} from '../default/error/error.component';
import {LoginGuard} from './guard/login.guard';
import {PermissionGuard} from './guard/permission.guard';
import {MenuComponent} from '../page/menu/menu.component';

const routes: Routes = [
	{ path: 'login' , component: LoginComponent },
	{
		path: 'promotion' ,
		loadChildren : '../page/promotion/promotion.module#PromotionModule',
		canActivate: [ LoginGuard, PermissionGuard],
	},
	{
		path: 'system' ,
		loadChildren : '../page/system/system.module#SystemModule',
		canActivate: [ LoginGuard, PermissionGuard],
	},	{
		path: 'order' ,
		loadChildren : '../page/order/order.module#OrderModule',
		canActivate: [ LoginGuard, PermissionGuard],
	}, {
		path: 'goods' ,
		loadChildren : '../page/goods/goods.module#GoodsModule',
		canActivate: [ LoginGuard, PermissionGuard],
	}, {
		path: 'menu' , component: MenuComponent , data: { title: '系统菜单'} ,
		canActivate: [ LoginGuard ],
	},
	{ path: 'error/:code' , component: ErrorComponent , data: {title: '异常提醒'}} ,
	{ path: '**' , redirectTo: 'error/404'},
];
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class RouteRoutingModule {
}
