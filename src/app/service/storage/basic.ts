export class Storage{
    constructor( storageObj: any ){
        this.storage = storageObj ;
    }

    storage: any  ;

    private typeCheck = ( type: string , obj: any ): boolean => {
        return Object.prototype.toString.call(obj) === '[object ' + type + ']';
    }

    set( key: string , value: Array< any > | object | number | string | boolean ): Storage {
        if ( this.typeCheck('String', value) ){
			this.storage[key] = value;
		}else{
			this.storage[key] = JSON.stringify(value);
		}
        return this ;
    }

    get( key: string ): any {
		const value = this.storage[key];
		try{
			return JSON.parse(value);
		}catch (e){
			return value;
		}
    }

    clear(): Storage {
        this.storage.clear() ;
        return this ;
    }

    remove( list: Array< string > ): Storage {
		Object.keys( list ).forEach( key => {
			this.storage.removeItem(list[key]) ;
		});
		return this;
    }
}