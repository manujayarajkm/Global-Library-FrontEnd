import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie';
import {Router} from '@angular/router';
import {Http,Response} from '@angular/http';
import {NgsRevealModule} from 'ng-scrollreveal';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  title:String;
  author:String;
  genre:String;
  price:number;
  cover:String;
  adminId:number;
  loginId:number;
  userId:number;
  dropdown:String;
  dash:number=110;

  constructor(private cookiservice:CookieService,private router:Router,private http:Http) {

    this.dropdown=this.cookiservice.get('dropdown');
  }



  addNewBook(title,author,genretest,price,cover){
    console.log(genretest);
    this.http.get('http://localhost:8080/librarycontroller/addNewBook/'+this.title+'/'+author+'/'+genretest+'/'+price+'/'+this.cookiservice.get('filename'))
    .subscribe(

      (res:Response)=>{
        const message=res.text();
        console.log(message);
        alert(message);
        location.reload();
      }
    )

  }

  logout(){

    this.cookiservice.removeAll();
    alert("You have successfully logged out")
    this.router.navigate(['']);
    location.reload();
  }

  upload(event){
    alert('inside upload');
    let elem=event.target;
    console.log(elem);
    if(elem.files.length>0){
      console.log(elem.files[0]);
      console.log(elem.files[0].name);
      this.cookiservice.put('filename',elem.files[0].name.slice(0,elem.files[0].name.indexOf('.')));
      console.log(this.cookiservice.get('filename'));
      let formData=new FormData();
      formData.append('name',elem.files[0].name.slice(0,elem.files[0].name.indexOf('.')));
      formData.append('file',elem.files[0]);
      this.http.post('http://localhost:8080/adminController/upload',formData)
      .subscribe((res:Response)=>{
        const message=res.text();
        console.log(message);
        //location.reload();
        this.cover=elem.files[0].name;
      })
    }
  }

  ngOnInit() {

    this.cookiservice.put('dropdown',"Admin");
    console.log(this.cookiservice.get('dash'));

  }

}
