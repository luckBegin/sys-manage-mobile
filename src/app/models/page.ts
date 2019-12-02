interface IPage {
	currentPage: number ;
	pageSize: number
}
export class Page implements IPage{
	public currentPage: number ;
	public pageSize: number
	constructor( size: number = 10,  page: number = 1 ) {
		this.currentPage = page ;
		this.pageSize = size ;
	}
}
