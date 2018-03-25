import { Component, OnInit } from '@angular/core';
import {Http,Response} from '@angular/http';
import {CookieService} from 'ngx-cookie';
import { NgProgress } from 'ngx-progressbar';
declare var jsPDF: any;



@Component({
  selector: 'app-my-history',
  templateUrl: './my-history.component.html',
  styleUrls: ['./my-history.component.css']
})
export class MyHistoryComponent implements OnInit {

  history:History[];

  constructor(private http:Http,private cookiservice:CookieService,public ngProgress: NgProgress) { }

  myHistory(){

    this.ngProgress.start();
    console.log(this.cookiservice.get('userId'));
    this.http.get('http://localhost:8080/librarycontroller/getMyHistory'+'/'+this.cookiservice.get('userId'))
    .subscribe(

      (res:Response)=>{
        setTimeout(()=>{
          this.ngProgress.done();
          this.history=res.json();
          console.log(this.history);
          if(res.json().length==0){
            alert('queue is empty');
          }

        },4000)
      
      
      
      }
    )

  }
  savepdf(){
    //alert('acknowledged');
    this.ngProgress.start();
var doc = new jsPDF("landscape","mm","a4");
var elem = document.getElementById("history");
var res=doc.autoTableHtmlToJson(elem);
doc.autoTable(res.columns,res.rows);
doc.text(5,200,"Maintained by Manu");
setTimeout(()=>{
  this.ngProgress.done();
  doc.save(this.cookiservice.get('username')+'_History');
},2000)


  }


  ngOnInit() {

    this.myHistory();
  }

}

interface History{

  historyId:number,
  userId:number,
  title:String,
  tookDate:Date,
  dueDate:Date
  returnDate:Date;


}
