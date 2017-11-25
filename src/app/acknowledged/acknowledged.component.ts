import { Component, OnInit } from '@angular/core';
import {Http,Response} from '@angular/http';
import {CookieService} from 'ngx-cookie';
import {Router} from '@angular/router';

@Component({
  selector: 'app-acknowledged',
  templateUrl: './acknowledged.component.html',
  styleUrls: ['./acknowledged.component.css']
})
export class AcknowledgedComponent implements OnInit {

userId:number;
notifications:Notification[];
count:number;
empty:String;
  constructor(private http:Http,private cookieService:CookieService,private router:Router) { }

  getNotifications(){
    this.userId=+this.cookieService.get('userId');
    console.log(this.userId);
    this.http.get('http://localhost:8080/librarycontroller/getAckNotifications/'+''+this.userId)
    .subscribe(

      (res:Response)=>{
        this.notifications=res.json();
        console.log(this.notifications);
        this.count=this.notifications.length;
        if(this.count==0){
          this.empty="Sorry List is Empty";
        }
        console.log('notification count'+this.count);
      }
    )

  }

  ngOnInit() {
    this.getNotifications();
  }

}

interface Notifications{
  notificationId:number;
  notificationDate:Date;
  matter:String;
  userId:number;
  ackdate:Date;
}
