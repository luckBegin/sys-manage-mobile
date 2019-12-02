import {Component, OnInit} from '@angular/core' ;
import {MsgService} from '../../../service/msg/msg.service';
import {SessionStorageService} from '../../../service/storage';
import {BasicService} from '../../../service/basic/basic.service';

@Component({
    selector: 'order-ordered',
    templateUrl: './ordered.component.html',
    styleUrls: ['./ordered.component.less']
})
export class OrderedComponent implements OnInit{
    constructor(
        private readonly msg: MsgService,
        private readonly sgo: SessionStorageService,
        private readonly basicSer: BasicService
    ){};
    ngOnInit(): void {
        const orderInfo = this.sgo.get('orderInfo') ;
    }

    public back(): void {
        this.basicSer.historyBack();
    }
}
