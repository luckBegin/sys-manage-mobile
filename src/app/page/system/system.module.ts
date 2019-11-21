import { NgModule } from '@angular/core' ;
import { RouterModule, Router, Routes } from '@angular/router' ;
import {SharedModule} from '../../shared/shared.module' ;
import {MsgComponent} from "./msg/msg.component";
import {BindWxComponent} from "./bindWx/bindWx.component";
const routes: Routes = [
	{ path: 'msg', component: MsgComponent , data: {title: '微信消息'}} ,
	{ path: 'bindWx' , component: BindWxComponent , data: {title: '绑定微信'}},
];
const component = [
	MsgComponent ,
	BindWxComponent
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
export class SystemModule {
}
