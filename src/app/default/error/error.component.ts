import {Component, OnInit} from '@angular/core' ;
import {ActivatedRoute} from "@angular/router";

@Component({
	selector: 'error-403' ,
	template: `<div class="c-full-container bg-container">
		<div class = 'wrapper'>
			<div *ngIf="errorCode === '403'">
				<div class="title">403</div>
				<div class="subTitle">该账号暂无权限访问,请联系管理员</div>
			</div>
		</div>
	</div>` ,
	styles: [`
		.bg-container{
			background: url("../../../assets/img/error.png") round;
		}
		.wrapper{
			position: relative;
			top:60%;
		}
		.title{
			color:rgb(75, 73, 70);
			font-size: 29px;
			text-align: center;
			font-weight: bold;
		}
		.subTitle{
			text-align: center;
            color:rgb(75, 73, 70);
			font-size:19px;
		}
	`]
})
export class ErrorComponent implements OnInit{
	constructor(
		private readonly activeRoute: ActivatedRoute
	){};

	private errorCode: string ;
	ngOnInit(): void {
		this.activeRoute.params.subscribe( query => {
			this.errorCode = query.code ;
		});
	}
}
