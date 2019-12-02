import { NgModule } from '@angular/core' ;
import { RouterModule, Router, Routes } from '@angular/router' ;
import {SharedModule} from '../../shared/shared.module' ;
import {GoodsImageComponent} from './image/image.component';
const routes: Routes = [
	{ path: 'image', component: GoodsImageComponent , data: {title: '图片上传'}} ,
];

const component = [
	GoodsImageComponent
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
export class GoodsModule {
}
