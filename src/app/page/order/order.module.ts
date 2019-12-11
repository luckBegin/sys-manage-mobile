import { NgModule } from '@angular/core' ;
import { RouterModule, Routes } from '@angular/router' ;
import {SharedModule} from '../../shared/shared.module' ;
import {OrderMakeComponent} from "./make/make.component";
import {OrderedComponent} from './ordered/ordered.component';
const routes: Routes = [
	{ path: 'make', component: OrderMakeComponent , data: {title: '点单'}} ,
	{ path: 'ordered', component: OrderedComponent , data: {title: '下单'}} ,
];

const component = [
	OrderMakeComponent,
	OrderedComponent
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
