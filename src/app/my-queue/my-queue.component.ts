import { Component, OnInit } from '@angular/core';
import {Http,Response}from '@angular/http';
import {CookieService} from 'ngx-cookie';
import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import{Router} from '@angular/router';



@Component({
  selector: 'app-my-queue',
  templateUrl: './my-queue.component.html',
  styleUrls: ['./my-queue.component.css']
})
export class MyQueueComponent implements OnInit {

  hires:Hire[];
  today:number;
  sysDate:string;
  dueDate2:string;
  Due:number[]=[];
  hireId:number;
  hire:number;
  matter:String;
  duedate:Date;
  userId:number;
  empty:String;

  constructor(private http:Http,private cookiservice:CookieService,private datePipe:DatePipe,private router:Router) {
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
          this.empty="Your Queue is Empty";
        }
        else{
        

      }
        
        }
      )

    }
    returnBook(hireId,bookId){
      console.log(hireId);
      console.log(bookId);
      this.cookiservice.put('bookId',bookId);
      this.cookiservice.put('hireid',hireId);
      // this.http.get('http://localhost:8080/librarycontroller/bookReturn'+'/'+hireId)
      // .subscribe(

      //   (res:Response)=>{
      //   const message=res.text();
      //   this.router.navigate(['review']);

        

      //   }
      // )

             this.router.navigate(['review']);


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

  ngOnInit() {


    this.myHires();

  }

}

interface Hire{

  hireId:number,
  bookId:number,
  title:String,
  tookDate:Date,
  dueDate:Date


}
