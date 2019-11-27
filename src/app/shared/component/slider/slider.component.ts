import {Component, EventEmitter, Input, Output} from "@angular/core" ;

@Component({
	selector: 'common-slider',
	templateUrl: './slider.component.html',
	styleUrls: ['./slider.component.less']
})
export class SliderComponent {
	constructor() {
	};

	@Input() public show: boolean = false;

	@Output() public showChange: EventEmitter<boolean> = new EventEmitter<boolean>() ;

	@Input() public title: string = '' ;

	@Input() public zIndex: number = 1 ;

    public hide(): void {
    	this.show = false ;
    	this.showChange.emit(this.show);
    }
}
