import { NgModule } from '@angular/core' ;
import { RouterModule, Router, Routes } from '@angular/router' ;
import {SharedModule} from '../../shared/shared.module' ;
import {OrderMakeComponent} from "./make/make.component";
const routes: Routes = [
	{ path: 'make', component: OrderMakeComponent , data: {title: '点单'}} ,
];

const component = [
	OrderMakeComponent
];
@NgModule({
	declarations: [
		...component,
	],
	imports: [
		RouterModule.forChild(routes),
		SharedModule,
	],
	providers: [],
	bootstrap: [],
})
export class OrderModule {
}
