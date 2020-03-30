import { Storage } from './basic' ;
import { Injectable } from '@angular/core';

@Injectable({
  providedIn : 'root',
})
export class SessionStorageService extends Storage{
    constructor(){
        super(window.sessionStorage) ;
    }
}
