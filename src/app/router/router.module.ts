import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "../default/login/login.component";

const routes: Routes = [
	{ path: 'login' , component: LoginComponent },
	{
		path: ' ' ,
		loadChildren : '../page/promotion/promotion.module#PromotionModule'
	},
	{ path: '**', pathMatch: 'full', redirectTo: 'login', },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class RouteRoutingModule {
}
