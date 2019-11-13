import { NgModule } from '@angular/core' ;
import { RouterModule, Router, Routes } from '@angular/router' ;
import {SharedModule} from '../../shared/shared.module' ;
import {MsgComponent} from "./msg/msg.component";
const routes: Routes = [
	{ path: 'msg', component: MsgComponent , data: {title: '微信消息'}}
];
const component = [
	MsgComponent
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
