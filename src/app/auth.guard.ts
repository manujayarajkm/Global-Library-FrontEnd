import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {LoginService} from './login.service';
import{CookieService} from 'ngx-cookie';
import{Router} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  isLogged:boolean;
constructor(private login:LoginService,private cookiService:CookieService,private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      this.isLogged=(this.login.getUserLoggedIn()=="true");
    return this.isLogged;
    //return this.cookiService.get('')
  }
}
