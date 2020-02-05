import { NgModule } from '@angular/core' ;
import { RouterModule, Router, Routes } from '@angular/router' ;
import {SharedModule} from '../../shared/shared.module' ;
import {MsgComponent} from './msg/msg.component';
import {BindWxComponent} from './bindWx/bindWx.component';
import {SystemRoleComponent} from './role/role.component';
import {BindRoleComponent} from './bindRole/bindRole.component';
import {SystemStaffComponent} from './staff/staff.component';
import {SystemChangePassComponent} from './changePass/change-pass.component';
const routes: Routes = [
	{ path: 'msg', component: MsgComponent , data: {title: '微信消息'}} ,
	{ path: 'bindWx' , component: BindWxComponent , data: {title: '绑定微信'}},
	{ path: 'role' , component: SystemRoleComponent , data: {title: '角色'}},
	{ path: 'bindRole' , component: BindRoleComponent , data: {title: '绑定角色'}},
	{ path: 'staff' , component: SystemStaffComponent , data: {title: '添加管理员'}},
	{ path: 'changePass' , component: SystemChangePassComponent , data: {title: '修改密码'}},
];
const component = [
	MsgComponent ,
	BindWxComponent ,
	SystemRoleComponent,
	BindRoleComponent,
	SystemStaffComponent,
	SystemChangePassComponent,
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
