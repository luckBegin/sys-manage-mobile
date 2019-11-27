import {Component, OnInit} from '@angular/core' ;
import {BasicService} from '../../../service/basic/basic.service';
import {Router} from '@angular/router';
import {RoomService} from '../../../service/room';
import {RESPONSE} from '../../../models';

@Component({
	selector: 'order-make',
	templateUrl: './make.component.html' ,
	styleUrls: ['./make.component.less']
})
export class OrderMakeComponent implements OnInit{
	constructor(
		private readonly basicSer: BasicService,
		private readonly router: Router,
		private readonly roomSer: RoomService
	){}

	ngOnInit(): void {

	}

	public orderShow: boolean = false ;
	public roomList: any = { type: [] , area: [] } ;
    public back(): void {
    	this.basicSer.historyBack() ;
    }

    public toOrder(): void{
    	this.orderShow = true ;
    	this.getRoomList();
    }

    private getRoomList(): void {
    	this.roomSer.listAll({
		    status: 1
	    })
		    .subscribe( (res: RESPONSE) => {
		    	const typeMap = {} ;
		    	const areaMap = {} ;
		    	res.data.forEach( item => {
		    		const typeId = item.typeInfo.id
		    		const areaId = item.areaInfo.id ;

		    		if( typeMap.hasOwnProperty(typeId)){
		    			typeMap[typeId].data.push( item );
				    } else {
		    			typeMap[typeId] = {
		    				name: item.typeInfo.name ,
						    data: [ item ]
					    }
				    }

                    if( areaMap.hasOwnProperty(areaId)){
                        areaMap[areaId].data.push( item );
                    } else {
                        areaMap[areaId] = {
                            name: item.areaInfo.name ,
                            data: [ item ]
                        }
                    }
			    });
		    	const area = [] ;
		    	const type = [] ;

		    	Object.keys(areaMap).forEach(key => {
		    		area.push(areaMap[key])
			    })

                Object.keys(typeMap).forEach(key => {
                    type.push(typeMap[key])
                })

			    this.roomList = { type , area };
		    })
    }
}
