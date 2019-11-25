import { Component } from '@angular/core' ;
import {MsgService} from "../../../service/msg/msg.service";
import {StaffService} from "../../../service/system";
import * as md5 from 'md5' ;
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BasicService} from "../../../service/basic/basic.service";
import {RESPONSE} from "../../../models";

@Component({
	selector: '' ,
	templateUrl: './change-pass.component.html'
})
export class SystemChangePassComponent {
	constructor(
		private readonly msg: MsgService ,
		private readonly service: StaffService ,
		private readonly fb: FormBuilder ,
		private readonly basicService: BasicService
	){} ;


	public form: FormGroup = this.fb.group({
		newPwd: [ null , [Validators.required ]] ,
		newPwd2: [ null , [ Validators.required ]] ,
		oldPwd: [ null , [ Validators.required ]]
	})

	public back(): void {
		this.basicService.historyBack() ;
	}

	public change(): void {
		if( !this.form.valid ) {
			this.msg.warn('请填写每项信息');
			return
		}

		const val = this.form.value ;

		if( val.newPwd !== val.newPwd2 ) {
			this.msg.warn('两次输入的新密码不一致') ;
			return ;
		}

		if( val.newPwd === val.oldPwd ){
			this.msg.warn('新旧密码不能一样')
			return ;
		}

		this.basicService.showLoad('操作中...')
		this.service.changePass({
			oldPwd: md5(val.oldPwd) ,
			newPwd: md5(val.newPwd)
		})
			.subscribe(( res: RESPONSE ) => {
				this.basicService.hideLoad() ;
				this.msg.success('修改成功') ;
				this.form.reset() ;
			})
	}
}
