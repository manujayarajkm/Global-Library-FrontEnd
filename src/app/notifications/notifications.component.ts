import { Component, OnInit } from '@angular/core';
import {Http,Response} from '@angular/http';
import {CookieService} from 'ngx-cookie';
import {Router} from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

userId:number;
notifications:Notifications[];
count:number;
notificationId:number;
empty:String;
  constructor(private http:Http,private cookieService:CookieService,private router:Router) { }

  getNotifications(){
    this.userId=+this.cookieService.get('userId');
    console.log(this.userId);
    this.http.get('http://localhost:8080/librarycontroller/getMyNotifications/'+''+this.userId)
    .subscribe(

      (res:Response)=>{
        this.notifications=res.json();
        console.log(this.notifications);
        this.count=this.notifications.length;
        if(this.count==0){
          this.empty="You dont have any new notifications";
        }
        console.log('notification count'+this.count);
      }
    )

  }
  acknowledge(notificationId){
    console.log(notificationId);
    this.http.get('http://localhost:8080/librarycontroller/removeNotifications/'+''+notificationId)
    .subscribe(

      (res:Response)=>{
        const message=res.text();
        console.log(message);
        this.getNotifications();
        location.reload();
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
}
