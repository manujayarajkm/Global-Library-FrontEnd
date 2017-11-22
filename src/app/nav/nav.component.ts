import { Component, OnInit ,TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie';
import {Http,Response} from '@angular/http';
import{LoginService} from '../login.service';
import{AdminService} from '../admin.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  userId:number;
  adminId:number=200;
  loginId:number=80;
  name:String;
  email:String;
  phone:number;
  username:String;
  password:String;
  dropdown:String;
  blocked:String;
  nAu:String;
  edited:boolean;
  search:String;
  books:Book[];
  notifications:Notifications[];
  count:number;
  items:number;
  template: TemplateRef<any>;
  modalRef:BsModalRef;
  message:String;
  dash:number;

  constructor(private router:Router,private cookiservice:CookieService,private http:Http,private logins:LoginService,private adminService:AdminService,private modalService: BsModalService) {

//this.count=+this.cookiservice.get('count');
this.dropdown=this.cookiservice.get('dropdown');
//this.dropdown=this.cookiservice.get('username');
this.userId=+this.cookiservice.get('userId');
this.adminId=+this.cookiservice.get('adminId');
this.loginId=+this.cookiservice.get('loginId');
this.dash=+this.cookiservice.get('dash');
  }


  login(username,password){

    console.log(username,password);
  let loginOnj={

      "userName":username,
      "password":password
    }
    console.log(loginOnj);
    this.http.post('http://localhost:8080/librarycontroller/memberLogin',loginOnj

  )
    .subscribe(

      (res:Response)=>{
          const re=res.json();
          console.log(re);
          if(re.userId>0){
            if(re.active=="y"){
              this.getNotifications();
              console.log('account active');
              this.cookiservice.put('userId',re.userId);
              this.cookiservice.put('adminId',"90");
              this.cookiservice.put('loginId',"200");
              this.cookiservice.put('dropdown',re.name);
              this.cookiservice.put('username',re.userName);
              console.log(this.cookiservice.get('userId'));
              //alert(this.cookiservice.get('userId'));
              this.logins.setUserLoggedIn();
              console.log(this.logins.getUserLoggedIn());
              this.router.navigate(['userhome']);
              location.reload();
              }
              else{
                console.log('account blocked');
                 this.blocked="Your account has been blocked please check with Admin";
                 this.edited = true;
                 //wait 3 Seconds and hide
                 setTimeout(function() {
                     this.edited = false;
                     console.log(this.edited);
                 }.bind(this), 3000);
                //alert('account blocked');

              }
          }
          else{
            console.log('user not exixt');
            this.nAu="Please check your credentials and try again";
            this.edited = true;
            //wait 3 Seconds and hide
            setTimeout(function() {
                this.edited = false;
                console.log(this.edited);
            }.bind(this), 3000);
            //alert('user not exist');

          }
        //location
      }
    )

  }


  adminLogin(username,password){
    console.log(username,password);

    if(username=="admin"&& password=="admin"){
      this.adminService.setAdminLoggedIn();
      console.log(this.adminService.getAdminLoggedIn());
      this.cookiservice.put('adminId',"90");
      this.cookiservice.put('dash',"100");
      console.log(this.cookiservice.get('dash'));
      this.cookiservice.put('loginId',"200");
      console.log("admin");
      this.router.navigate(['adminhome']);
      location.reload();

    }
  }

  registerUser(name,email,phone,username,password){
    this.http.get('http://localhost:8080/librarycontroller/addNewMember/'+this.name+'/'+email+'/'+username+'/'+password+'/'+phone)
    .subscribe(

      (res:Response)=>{
        const message=res.text();
        console.log(message);
        alert(message);
        location.reload();
      }
    )

  }


  checkUsername(username){
    console.log(username);
    this.http.get('http://localhost:8080/librarycontroller/checkUsername'+'/'+username)
    .subscribe(

      (res:Response)=>{
        const message=res.text();
        console.log(message);
        alert(message);
        //location.reload();
      }
    )

  }

  // saveTodos(): void {
  //    //show box msg
  //    this.edited = true;
  //    //wait 3 Seconds and hide
  //    setTimeout(function() {
  //        this.edited = false;
  //        console.log(this.edited);
  //    }.bind(this), 3000);
  //   }



  logout(template){

    this.openModal(template);

    // this.cookiservice.removeAll();
    // alert("You have successfully logged out");
    // this.router.navigate(['']);
    // location.reload();
  }

  getNotifications(){
    this.userId=+this.cookiservice.get('userId');
    this.items=+this.cookiservice.get('items');
    console.log(this.userId);
    this.http.get('http://localhost:8080/librarycontroller/getMyNotifications/'+''+this.userId)
    .subscribe(

      (res:Response)=>{
        this.notifications=res.json();
        console.log(this.notifications);
        //alert(this.notifications);
        this.count=this.notifications.length;
        console.log('notification count'+this.count);
        this.cookiservice.put('count',String(this.count));
        console.log('value after string'+String(this.count));
        //location.reload();
      }
    )

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
  
  confirm(): void {
    console.log('You are confirmed');
    this.message = 'Confirmed!';
    this.modalRef.hide();
    this.cookiservice.removeAll();
    //alert("You have successfully logged out");
    this.router.navigate(['']);
    location.reload();
  }
  
  decline(): void {
    this.message = 'Declined!';
    console.log('You are declined');
    
    this.modalRef.hide();
  }

  ngOnInit() {

this.getNotifications();
this.username=this.cookiservice.get('username');
    //this.cookiservice.put('count','0');
    //this.cookiservice.put('dropdown',"Actions");
    //this.dropdown="Actions";

  //  this.cookiservice.put('adminId',"200");
    //this.cookiservice.put('loginId',"80");
    //alert(this.cookiservice.get('userId'));

  }

}
interface Book{
  bookId: number,
  title: String,
  author: String,
  genre: String,
  price: number,
  avilableNo:number,
  cover:String
}
interface Notifications{
  notificationId:number;
  notificationDate:Date;
  matter:String;
  userId:number;
}
