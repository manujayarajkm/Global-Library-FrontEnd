import { Component, OnInit } from '@angular/core';
import {Http,Response} from '@angular/http';
import {CookieService} from 'ngx-cookie';

@Component({
  selector: 'app-hires',
  templateUrl: './hires.component.html',
  styleUrls: ['./hires.component.css']
})
export class HiresComponent implements OnInit {

hires:Hire[];
queue:String;
edited:boolean;
matter:String;
  constructor(private http:Http,private cookiservice:CookieService) { }


  userHires(){

    console.log(this.cookiservice.get('userId'));
    this.http.get('http://localhost:8080/adminController/viewAllHires')
    .subscribe(

      (res:Response)=>{
      this.hires=res.json();
      console.log(this.hires);
      if(res.json().length==0){
        //alert('queue is empty');
        this.queue="Currently there are no Hires";
        this.edited=true;

        setTimeout(function() {
            this.edited = false;
            console.log(this.edited);
        }.bind(this), 3000);
      }
      else{
      //alert(this.hires);
    }
      //location.reload();
        //const message=res.text();
        //console.log(message);
        //alert(message);
        //location.reload();
      }
    )

  }
  notifyUser(name,title,dueDate,userId,bookId){

    console.log(name,title,dueDate,userId,bookId);
    this.matter="Message from Admin:"+title+" is due on"+dueDate+" please return immediately";
    this.http.get('http://localhost:8080/librarycontroller/checkDuplicate'+'/'+bookId+'/'+this.matter+'/'+userId)
    .subscribe(

      (res:Response)=>{
      const message=res.text();
      //console.log(message);
      //console.log(length);
      //alert(message);

      //alert(length);
      //location.reload();

      }
    )


  }

  ngOnInit() {

    this.userHires();
  }

}
interface Hire{

  hireId:number,
  bookId:number,
  userId:number,
  name:String,
  title:String,
  tookDate:Date,
  dueDate:Date


}
