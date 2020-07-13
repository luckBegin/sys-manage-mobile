import { NgModule } from '@angular/core' ;
import { RouterModule, Router, Routes } from '@angular/router' ;
import {SharedModule} from '../../shared/shared.module' ;
import {PromotionBookComponent} from './book/book.component';
const routes: Routes = [
	{ path: 'book' , component: PromotionBookComponent , data: { title: '预定'}},
];

const component = [
	PromotionBookComponent,
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
export class PromotionModule {
}
