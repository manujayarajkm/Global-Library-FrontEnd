import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie';
import {Router} from '@angular/router';
import {Http,Response} from '@angular/http';
import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import{LoginService} from '../login.service'


@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  userId:number;
  dropdown:String;
  notifications:Notifications[];
  count:number;
    today:number;
  sysDate:string;
  dueDate2:string;
  hireId:number;
  hire:number;
  matter:String;
  duedate:Date;
  hires:Hire[];
  constructor(private cookiservice:CookieService,private router:Router,private http:Http,private datePipe:DatePipe,private login:LoginService) {
  }

  logout(){

    this.cookiservice.removeAll();
    alert("You have successfully logged out")
    this.router.navigate(['']);
    location.reload();
  }
  getNotifications(){
    this.userId=+this.cookiservice.get('userId');
    console.log(this.userId);
    this.http.get('http://localhost:8080/librarycontroller/getMyNotifications/'+''+this.userId)
    .subscribe(

      (res:Response)=>{
        this.notifications=res.json();
        console.log(this.notifications);
        this.count=this.notifications.length;
        console.log('notification count'+this.count);
        this.cookiservice.put('count',String(this.count));
      }
    )

  }

  checkdue(){
  this.sysDate=this.datePipe.transform(Date.now(),'yyyy-MM-dd');
  
    console.log(this.sysDate);
    for (let entry of this.hires) {
      this.dueDate2=this.datePipe.transform(entry.dueDate,'yyyy-MM-dd');
      console.log("After convert to string"+this.dueDate2);
      var d1 = Date.parse(this.sysDate);
       var d2 = Date.parse(this.dueDate2);
  if (d1 > d2) {

    this.checkDuplicate(entry.title,entry.bookId,entry.dueDate);

  }
      
  }
  }
  checkDuplicate(title,bookId,dueDate){
    console.log("title from call"+title);
    console.log("bookid from call"+bookId);
    console.log("dueDate from call"+dueDate);

    this.matter=title+" is due on "+dueDate;
    console.log("Matter "+this.matter);
    this.userId=+this.cookiservice.get('userId');
    this.http.get('http://localhost:8080/librarycontroller/checkDuplicate'+'/'+bookId+'/'+this.matter+'/'+this.userId)
    .subscribe(

      (res:Response)=>{
      const message=res.text();
      

      }
    )

  }
  myHires(){

    console.log(this.cookiservice.get('userId'));
    this.http.get('http://localhost:8080/librarycontroller/myHires'+'/'+this.cookiservice.get('userId'))
    .subscribe(

      (res:Response)=>{
      this.hires=res.json();
      console.log(this.hires);

      console.log()
      if(res.json().length==0){
      }
      else{
      this.checkdue();

    }
      
      }
    )

  }

  ngOnInit() {
    this.myHires();
this.dropdown=this.cookiservice.get('username');
this.getNotifications();
console.log(this.dropdown);
  }

}
interface Notifications{
  notificationId:number;
  notificationDate:Date;
  matter:String;
  userId:number;
}
interface Hire{

  hireId:number,
  bookId:number,
  title:String,
  tookDate:Date,
  dueDate:Date


}
