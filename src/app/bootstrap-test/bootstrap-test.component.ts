import { Component, OnInit } from '@angular/core';
import {NgsRevealModule} from 'ng-scrollreveal';
import{Router} from '@angular/router';
import{CookieService} from 'ngx-cookie';
import {Ng4FilesStatus,Ng4FilesSelected} from 'angular4-files-upload';
import{Http,Response} from '@angular/http';

@Component({
  selector: 'app-bootstrap-test',
  templateUrl: './bootstrap-test.component.html',
  styleUrls: ['./bootstrap-test.component.css']
})
export class BootstrapTestComponent implements OnInit {

  seat1:String="vaccant.png";
  seat2:String="vaccant.png";
  seat3:String="vaccant.png";
  seat4:String="vaccant.png";
  seat5:String="vaccant.png";
  seat6:String="vaccant.png";
  seat7:String="vaccant.png";
  seat8:String="vaccant.png";
  seat9:String="vaccant.png";
  seat10:String="vaccant.png";  
  expr1:boolean;
  seatvar:String;
  seat:string[]=[];
  layout:string[]=['seat1','seat2','seat3','seat4','seat5'];
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  name:String;
  Name:string; 
myFile:File;

  constructor(private router:Router,private cookieService:CookieService,private http:Http) { 


    
  }
  

  

logout(){
  this.router.navigate(['']);
    location.reload();
}
upload(event){
  alert('inside upload');
  this.myFile=event.nativeElement;
  console.log('myfile '+this.myFile);
  let elem=event.target;
  console.log(elem);
  if(elem.files.length>0){
    console.log(elem.files[0]);
    console.log(elem.files[0].name);
    this.cookieService.put('filename',elem.files[0].name);
    console.log(this.cookieService.get('filename'));
    //this.uname=this.cookiservice.get('username');
    //this.uname="jaison";
   // console.log(this.uname);
    let formData=new FormData();
    formData.append('name','test');
    formData.append('file',elem.files[0]);
    this.http.post('http://localhost:8080/librarycontroller/upload',formData)
    .subscribe((res:Response)=>{
       const message=res.text();
       console.log(message);
       //location.reload();
     })
    //this.filesave(event);
  }
}



updateprofile(name,email,phone){

  console.log(name,email,phone,this.cookieService.get('filename'));
  
  
  
}



  ngOnInit() {

    //this.bookedseats();
  }

}
