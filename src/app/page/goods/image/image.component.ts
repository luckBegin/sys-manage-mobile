import {Component, OnInit} from '@angular/core' ;
import {BasicService} from '../../../service/basic/basic.service';
import {ChildClassifyQuery} from '../../order/make/query.module';
import {RESPONSE} from '../../../models';
import {GoodsService} from '../../../service/goods/goods.service';

@Component({
    selector: 'goods-image' ,
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.less'],
})
export class GoodsImageComponent implements OnInit{
    constructor(
        private readonly basicSer: BasicService,
        private readonly goodsSer: GoodsService,
    ){}

    ngOnInit(): void {
        this.getSubClassify();
        this.getChildClassify(true);
    }

    public back(): void {
        this.basicSer.historyBack() ;
    }

    public selectSubClassify: number = null ;

    public subSelect(type: number): void {
        this.selectSubClassify = type ;
        this.childClassifyQuery = new ChildClassifyQuery();
        this.childClassifyQuery.subClassifyId = type ;
        this.getChildClassify(true);
    }
    public subClassifyList: any[] = [] ;
    private getSubClassify(): void{
        this.goodsSer.subClassify()
            .subscribe( (res: RESPONSE) => {
                this.subClassifyList = res.data ;
            });
    }

    public childClassifyQuery: ChildClassifyQuery = new ChildClassifyQuery() ;

    public loading: boolean = false ;

    public childClassifyList: any[] = [] ;

    public refreshState: any = { currentState: 'deactivate', drag: false };

    private dataComplete: boolean = false ;

    public totalNumber: number = 0 ;

    public height: number = document.documentElement.clientHeight;

    public refresh($event: any): void{
        if ( this.dataComplete ) {
            return;
        } else {
            this.childClassifyQuery.currentPage += 1;
            this.refreshState.currentState = 'release';
            this.getChildClassify();
        }
    }

    private getChildClassify( refresh: boolean = false ): void {
        if (refresh)
            this.loading = true;
        this.goodsSer.childClassify(this.childClassifyQuery)
            .subscribe((res: RESPONSE) => {
                setTimeout(() => {
                    if (refresh)
                        this.childClassifyList = [];
                    this.childClassifyList = this.childClassifyList.concat( res.data ) ;
                    if (res.page && res.page.totalNumber <= this.childClassifyList.length) {
                        this.dataComplete = true;
                        this.refreshState.currentState = 'noMore';
                    } else {
                        this.refreshState.currentState = 'finish';
                    }
                    this.totalNumber = res.page ? res.page.totalNumber : 0;
                    this.loading = false;
                }, 200);
            });
    }

    public uploadShow: boolean = false ;

    public itemPick($event: any): void {
        this.uploadShow = true ;
    }

    public imageChangedEvent: Event ;

    public imgUpload($event: Event): void{
        this.imageChangedEvent = $event ;
    }
}
