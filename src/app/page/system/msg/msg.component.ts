import {Component, OnInit} from '@angular/core' ;
import {MsgService} from "../../../service/msg/msg.service";

@Component({
	selector: 'system-msg' ,
	templateUrl: './msg.component.html',
	styleUrls: ['./msg.component.less']
})
export class MsgComponent implements OnInit{
	constructor(
		private readonly msg: MsgService
	) {}

	ngOnInit(): void {
	}
}
