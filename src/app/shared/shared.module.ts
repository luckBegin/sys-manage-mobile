import {NgModule} from '@angular/core' ;
import {CommonModule} from '@angular/common' ;
import {TimePipe, CusCurrencyPipe, DatePipe, FilterSymbolPipe, DiscountPipe} from './pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {HttpIntercept} from './interceptor.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {NullPipe} from './pipe/null.pipe';
import {NgZorroAntdMobileModule} from "ng-zorro-antd-mobile";
import {LoginComponent} from "../default/login/login.component";
import {ErrorComponent} from "../default/error/error.component";
import {MenuComponent} from "../page/menu/menu.component";
import {CommonShopSelectComponent} from "./component/shop-select/shop-select.component";
import {CommonEmptyComponent} from "./component/empty-data/empty.component";
import {SliderComponent} from "./component/slider/slider.component";

const modules = [CommonModule, FormsModule, NgZorroAntdMobileModule];

const components = [
	LoginComponent,
	ErrorComponent,
	MenuComponent,
	CommonShopSelectComponent,
	CommonEmptyComponent,
	SliderComponent
];
const pipes = [TimePipe, CusCurrencyPipe, DatePipe, FilterSymbolPipe, DiscountPipe , NullPipe ];

@NgModule({
	declarations: [
		...components,
		...pipes
	],
	imports: [
		...modules,
		ReactiveFormsModule,
	],
	exports: [...modules, ...components, ...pipes , ReactiveFormsModule],
	providers: [
		{provide: HTTP_INTERCEPTORS, useClass: HttpIntercept, multi: true}
	],
	bootstrap: [],
})
export class SharedModule {
}
