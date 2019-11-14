interface IPage {
	currentPage: number ;
	pageNumber: number
}
export class Page implements IPage{
	public currentPage: number ;
	public pageNumber: number
	constructor( size: number = 10,  page: number = 1 ) {
		this.currentPage = page ;
		this.pageNumber = size ;
	}
}
