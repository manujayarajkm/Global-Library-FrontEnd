import { Component, OnInit,HostListener,TemplateRef,SecurityContext,OnDestroy} from '@angular/core';
import {CookieService} from 'ngx-cookie';
import {Router} from '@angular/router';
import {Http,Response} from '@angular/http';
import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import{LoginService} from '../login.service';
import {SessionService} from '../session.service';
import { Observable } from 'rxjs/Observable';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit,OnDestroy {

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
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  sessionVar:String;
  modalRef: BsModalRef;
  warn:String;
  dismissible = true;
  
  



  constructor(private cookiservice:CookieService,private router:Router,private http:Http,private datePipe:DatePipe,private login:LoginService,private modalService: BsModalService
    ,sanitizer: DomSanitizer) {
    this.count=+this.cookiservice.get('count');
    this.sessionVar="true";
    this.session();
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



//session*********

session(){
  setTimeout(function() {
    console.log('inside settimeout '+this.sessionVar);
    //this.sessionVar=this.cookiservice.get('session');
          if(this.sessionVar=='false'){
            //alert('your session is going to expire in 10 seconds');
        this.warn='Your session is going to expire in 5 seconds';
            this.checkTimeout();
          }
          else{
            console.log('calling setfalse');          
            this.setFalse();
          }
      }.bind(this), 10000);
     }
  
     checkTimeout(){
      setTimeout(function() {
        //this.sessionvar=this.cookiservice.get('session');
        console.log('session var near logout '+this.sessionVar);
              if(this.sessionVar=='false'){
                
                this.logout();
              }
              else{
                this.warn='';
                this.session();
              }
          }.bind(this), 10000);
        }
        setFalse(){
          setTimeout(function() {
            console.log('setting to false');          
                  //this.cookiservice.put('session','false');
                  if(typeof this.sessionVar!="undefined")
                  this.sessionVar="false";
                  
                  console.log('sessionvar '+this.cookiservice.get('session'));  
                  this.warn='';
                  this.session();              
              }.bind(this), 10000);
            }
  
        logout(){
          
          this.cookiservice.remove('count');
          this.cookiservice.remove('username');
          this.cookiservice.remove('dropdown');
          this.cookiservice.remove('userId');
          this.cookiservice.remove('adminId');
          this.cookiservice.remove('loginId');
          this.cookiservice.remove('dash');
          
             // this.cookiservice.removeAll();
              alert("You have successfully logged out");
              this.router.navigate(['']);
              location.reload();
            }
  
    @HostListener('document:mouseenter', ['$event']) checkMouse(){

      
    
      
      //this.cookiservice.put('session','true');
      if(typeof this.sessionVar!="undefined")
      this.sessionVar="true";
      
      console.log('sessionvar '+this.cookiservice.get('session'));                
    }
      @HostListener('document:mouseleave', ['$event']) checkMouseLeave(){
      
        //this.cookiservice.put('session','true');
        if(typeof this.sessionVar!="undefined")
        this.sessionVar="true";
        
        console.log('sessionvar '+this.cookiservice.get('session'));                
      }
      @HostListener('click',['$event']) clickEvent(elem){
      
        //this.cookiservice.put('session','true');
        if(typeof this.sessionVar!="undefined")
        this.sessionVar="true";      
        console.log('sessionvar '+this.cookiservice.get('session'));                
      }
  
  
      @HostListener('document:keydown', ['$event'])

      

      keypress(e: KeyboardEvent) {
        //this.cookiservice.put('session','true');
        if(typeof this.sessionVar!="undefined")
        this.sessionVar="true";
        console.log('sessionvar '+this.cookiservice.get('session'));                
      }

//***********

onClosed(dismissedAlert: any): void {
}

  ngOnInit() {
    this.myHires();
this.dropdown=this.cookiservice.get('username');
this.getNotifications();
console.log(this.dropdown);

this.session();
  }

  public ngOnDestroy() : void {

    this.sessionVar=undefined;

}
  destroy(){
    console.log('got call');
    this.ngOnDestroy();

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
