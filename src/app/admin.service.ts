import { Injectable } from '@angular/core';
import{CookieService} from 'ngx-cookie';

@Injectable()
export class AdminService {

  private isAdminLoggedIn;
  constructor(private cookieService:CookieService) { 
    this.isAdminLoggedIn=false;
  }


  setAdminLoggedIn(){
    this.cookieService.put('isAdminLoggedIn','true');
    //this.isUserLoggedIn=true;
  }

  getAdminLoggedIn(){

    return this.cookieService.get('isAdminLoggedIn');
  }
}
