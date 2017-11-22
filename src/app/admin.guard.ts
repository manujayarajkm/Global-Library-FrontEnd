import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AdminService} from './admin.service';
import{CookieService} from 'ngx-cookie';
import{Router} from '@angular/router';

@Injectable()
export class AdminGuard implements CanActivate {

  isLogged:boolean;
  constructor(private login:AdminService,private cookiService:CookieService,private router:Router){}  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      this.isLogged=(this.login.getAdminLoggedIn()=="true");
    return this.isLogged;
  }
}
