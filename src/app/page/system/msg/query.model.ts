import { Page } from '../../../models'
export class QueryModel extends Page {
	constructor(){
		super() ;
	}
}

export class MsgQueryModel extends Page{
	constructor(){
		super()
	}

	public openId: string ;
}
