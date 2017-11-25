import { Component, OnInit } from '@angular/core';
import{Http,Response} from '@angular/http';
import{CookieService} from 'ngx-cookie';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {

  userId:number;
  username:String;
  uname:USVString;

  constructor(private http:Http,private cookiservice:CookieService,private router:Router) { }

  updateprofile(name,email,phone){
    console.log(name,email,phone);
    this.userId=+this.cookiservice.get('userId');
    console.log(this.userId);
    this.http.get('http://localhost:8080/librarycontroller/updateProfile'+'/'+this.userId+'/'+name+'/'+email+'/'+phone)
    .subscribe(

      (res:Response)=>{
      const message=res.text();
      console.log(message);
      alert(message);
      if(message=="Profile updated successfully"){
      this.router.navigate(['userhome']);
      location.reload();
    }
        
      }
    )
  }

  upload(event){
    alert('inside upload');
    let elem=event.target;
    console.log(elem);
    if(elem.files.length>0){
      console.log(elem.files[0]);
      console.log(elem.files[0].name);
      this.uname=this.cookiservice.get('username');
      console.log(this.uname);
      let formData=new FormData();
      formData.append('name',this.uname);
      formData.append('file',elem.files[0]);
      this.http.post('http://localhost:8080/librarycontroller/upload',formData)
      .subscribe((res:Response)=>{
        const message=res.text();
        console.log(message);
        location.reload();
      })
    }
  }

  ngOnInit() {

    this.username=this.cookiservice.get('username');
    console.log(this.username);

  }

}
