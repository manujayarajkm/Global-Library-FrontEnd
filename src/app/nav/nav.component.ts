import { Component, OnInit ,TemplateRef,Inject} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie';
import {Http,Response} from '@angular/http';
import{LoginService} from '../login.service';
import{AdminService} from '../admin.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';



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
  uname:String;
  pword:String;
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
  data:String[];
  username2:String;
  password2:String;
  password1:String;
  username1:String;
  checkbox:boolean;
  passwordconfirm:String;



  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,private router:Router,private cookiservice:CookieService,private http:Http,private logins:LoginService,private adminService:AdminService,private modalService: BsModalService
  ) {

this.dropdown=this.cookiservice.get('dropdown');
this.userId=+this.cookiservice.get('userId');
this.adminId=+this.cookiservice.get('adminId');
this.loginId=+this.cookiservice.get('loginId');
this.dash=+this.cookiservice.get('dash');
this.count=+this.cookiservice.get('count');

  }


  login(username,password,checkbox){

    console.log(username,password,checkbox);
    if(checkbox){

      this.cookiservice.put('uname',username);
      this.cookiservice.put('pword',password);
    }

  let loginOnj={

      "userName":username,
      "password":password
    }
    console.log(loginOnj);
    this.http.post('http://localhost:8081/librarycontroller/memberLogin',loginOnj

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

          }
      }
      ,
      err => {
        alert("Server Error..! Please try Again")
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
    else{
      alert('Check Username/Password');
    }
  }

  registerUser(name,email,phone,username,password){
    this.http.get('http://localhost:8081/librarycontroller/addNewMember/'+this.name+'/'+email+'/'+username+'/'+password+'/'+phone)
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
    this.http.get('http://localhost:8081/librarycontroller/checkUsername'+'/'+username)
    .subscribe(

      (res:Response)=>{
        const message=res.text();
        console.log(message);
        alert(message);
      }
    )

  }

  



  logout(template){

    this.openModal(template);

    
  }

  getNotifications(){
    this.userId=+this.cookiservice.get('userId');
    this.items=+this.cookiservice.get('items');
    console.log(this.userId);
    this.http.get('http://localhost:8081/librarycontroller/getMyNotifications/'+''+this.userId)
    .subscribe(

      (res:Response)=>{
        this.notifications=res.json();
        console.log(this.notifications);
        this.count=this.notifications.length;
        console.log('notification count'+this.count);
        this.cookiservice.put('count',String(this.count));
        console.log('value after string'+String(this.count));
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
    this.cookiservice.remove('count');
    this.cookiservice.remove('username');
    this.cookiservice.remove('dropdown');
    this.cookiservice.remove('userId');
    this.cookiservice.remove('adminId');
    this.cookiservice.remove('loginId');
    this.cookiservice.remove('dash');
   // this.cookiservice.removeAll();
    this.router.navigate(['']);
    location.reload();
  }
  
  decline(): void {
    this.message = 'Declined!';
    console.log('You are declined');
    
    this.modalRef.hide();
  }


  storedatalocal(username,password){

    console.log('got the call '+username+password);
    this.storage.set('usernames',username);
    this.data['usernames']= this.storage.get('usernames');
    console.log(this.data);
  }

  ngOnInit() {

//this.getNotifications();
this.count=+this.cookiservice.get('count');
this.username=this.cookiservice.get('username');
this.password2=this.cookiservice.get('pword');
this.username2=this.cookiservice.get('uname');
this.dropdown=this.cookiservice.get('dropdown');

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
