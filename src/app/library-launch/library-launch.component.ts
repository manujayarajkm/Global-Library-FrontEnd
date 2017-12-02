import { Component, OnInit } from '@angular/core';
import {Http,Response}from '@angular/http';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie';


@Component({
  selector: 'app-library-launch',
  templateUrl: './library-launch.component.html',
  styleUrls: ['./library-launch.component.css']
})
export class LibraryLaunchComponent implements OnInit {

  name:String;
  email:String;
  phone:number;
  username:String;
  password:String;
  userId:number;
  books:Book[];
  adminId:number;
  dropdown:String;
  review:Review[];
  display:String[];

  constructor(private router:Router,private http:Http,private cookieService:CookieService) {

this.dropdown=this.cookieService.get('dropdown');
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

  login(username,password){
  let loginOnj={

      "userName":this.username,
      "password":this.password
    }
    this.http.post('http://localhost:8080/librarycontroller/memberLogin',loginOnj

  )
    .subscribe(

      (res:Response)=>{
          const re=res.json();
          console.log(re);
          if(re.userId>0){
            if(re.active=="y"){
              console.log('account active');
              this.cookieService.put('userId',re.userId);
              this.cookieService.put('adminId',"90");
              console.log(this.cookieService.get('userId'));
              alert(this.cookieService.get('userId'));
              this.router.navigate(['userhome']);
              location.reload();
              }
              else{
                console.log('account blocked');
                alert('account blocked');
              }
          }
          else{
            console.log('user not exixt');
            alert('user not exist');
          }
      }
    )

  }

  getNewBooks(){
    this.http.get('http://localhost:8080/librarycontroller/viewNewBooks')
    .subscribe(

      (res:Response)=>{
      this.books=res.json();
      if(this.books.length==0){
        alert('sorry no books available');

      }
      console.log(this.books);
        
        //for(let i of this.books){
         // this.getReviews(i.bookId);
        //}
        

      }
    )

  }
  getReviews(bookId){
    console.log('id after function call'+bookId);
    this.http.get('http://localhost:8080/librarycontroller/getReviews'+'/'+bookId)
    .subscribe(

      (res:Response)=>{
      this.review=res.json();
      if(this.review.length==0){
      }
      console.log(this.review);
      for(let rev of this.review){
        console.log(rev.body);
        this.display.push(rev.body);
      }
      for(let di of this.display ){
        console.log('array element '+di);
      }
      
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
      }
    )

  }


ngOnInit() {
  this.getNewBooks();
  this.cookieService.put('dropdown',"Actions");
  this.cookieService.put('adminId',"200");
  this.cookieService.put('loginId',"80");
  this.cookieService.put('items',String(0));
  //location.reload();
}
}
interface Book{

  title:String,
  author:String,
  genre:String,
  cover:String,
  avilableNo:number,
  bookId:number

}
interface Review{

  name:String;
  body:String;

}
