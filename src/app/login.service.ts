import { Injectable } from '@angular/core';
import{CookieService} from 'ngx-cookie';

@Injectable()
export class LoginService {


private isUserLoggedIn;
  constructor(private cookiService:CookieService) {
    this.isUserLoggedIn=false;

  }

  setUserLoggedIn(){
    this.cookiService.put('isUserLoggedIn','true');
    //this.isUserLoggedIn=true;
  }

  getUserLoggedIn(){

    return this.cookiService.get('isUserLoggedIn');
  }

}
