import { Component, OnInit } from '@angular/core';
import {Http,Response} from '@angular/http';
import{CookieService} from 'ngx-cookie';
import{Router} from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  userId:number;

  constructor(private http:Http,private cookiservice:CookieService,private router:Router) { }

  updatepassword(passswordold,passwordnew){

    console.log(passswordold,passwordnew);
    this.userId=+this.cookiservice.get('userId');
    console.log(this.userId);
    this.http.get('http://localhost:8080/librarycontroller/updatePassword/'+this.userId+'/'+passswordold+'/'+passwordnew)
    .subscribe(

      (res:Response)=>{
        const message=res.text();
        console.log(message);
        alert(message);
        //location.reload();

      }
    )

  }

  ngOnInit() {
  }

}
