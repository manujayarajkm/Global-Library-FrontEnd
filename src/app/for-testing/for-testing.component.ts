import { Component, OnInit,ViewChild,TemplateRef,ElementRef,HostListener} from '@angular/core';
import{Http,ConnectionBackend, Request, RequestOptions, RequestOptionsArgs, Response} from '@angular/http';
import{CookieService} from 'ngx-cookie';
import {Subject} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {UtilService} from '../util.service';
import{SortByPipe} from '../sort-by.pipe';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import{Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import { NgProgress } from 'ngx-progressbar';



declare const $;
import 'jspdf-autotable';
import { CustomhttpService } from '../customhttp.service';
declare var jsPDF: any;



@Component({
  selector: 'app-for-testing',
  templateUrl: './for-testing.component.html',
  styleUrls: ['./for-testing.component.css']
})
export class ForTestingComponent implements OnInit {

books:Book[]=[];
dtOptions: DataTables.Settings = {};
UserImageFile:File;
uname:USVString;
forcheck:boolean=true;
 sortField:Array<string>=["title","genre"];
 sortDirection:string='asc';
 modalRef: BsModalRef;
 message: string;
 template: TemplateRef<any>;
 sessionVar:String;
 imageurl:String='test1.jpg';
 loadervar:boolean;
 testing:String;
 check:String[];


  constructor(private http:Http,private cookiservice:CookieService,private utilService:UtilService,sortBy:SortByPipe,private modalService: BsModalService,private element:ElementRef,private router:Router,private custhttp:CustomhttpService,
    public ngProgress: NgProgress
  
  ) {

    
  }


  savepdf(template){
    alert('acknowledged');
    this.openModal(template);
// var doc = new jsPDF("landscape","mm","a4");
// var elem = document.getElementById("example");
// var res=doc.autoTableHtmlToJson(elem);
// doc.autoTable(res.columns,res.rows);
// doc.text('haiii',10,19);

// doc.save('save');

  }


  browseAllBooks(){
    this.ngProgress.start();

    this.custhttp.get('http://localhost:8080/librarycontroller/viewAllBooks')
    
    .subscribe(

      (res:Response)=>{
      
      setTimeout(()=>{
        this.ngProgress.done();
        this.books=res.json();
        console.log(this.books);
        if(this.books.length==0){
          alert('sorry no books available');
        }

      },3000)
      
      
      

        //const message=res.text();
        //console.log(message);
        //alert(message);
        //location.reload();
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
    //this.uname="jaison";
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

forchecking(){
  this.forcheck=!this.forcheck;
}

openModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
}

confirm(): void {
  console.log('You are confirmed');
  this.browseAllBooks();
  this.message = 'Confirmed!';
  this.modalRef.hide();
}

decline(): void {
  this.message = 'Declined!';
  console.log('You are declined');
  
  this.modalRef.hide();
}

session(){
setTimeout(function() {
  console.log('inside settimeout '+this.sessionVar);
  //this.sessionVar=this.cookiservice.get('session');
        if(this.sessionVar=='false'){
          alert('your session is going to expire in 10 seconds');
          this.checkTimeout();
        }
        else{
          console.log('calling setfalse');          
          this.setFalse();
        }
    }.bind(this), 7000);
   }

   checkTimeout(){
    setTimeout(function() {
      //this.sessionvar=this.cookiservice.get('session');
      console.log('session var near logout '+this.sessionVar);
            if(this.sessionVar=='false'){
              
              this.logout();
            }
            else{
              this.session();
            }
        }.bind(this), 5000);
      }
      setFalse(){
        setTimeout(function() {
          console.log('setting to false');          
                this.cookiservice.put('session','false');
                this.sessionVar="false";
                
                console.log('sessionvar '+this.cookiservice.get('session'));  
                this.session();              
            }.bind(this), 6000);
          }

      logout(){
        
            
        
            this.cookiservice.removeAll();
            alert("You have successfully logged out");
            this.router.navigate(['']);
            location.reload();
          }

  @HostListener('document:mouseenter', ['$event']) checkMouse(){
    
    this.cookiservice.put('session','true');
    this.sessionVar="true";
    
    console.log('sessionvar '+this.cookiservice.get('session'));                
  }
    @HostListener('document:mouseleave', ['$event']) checkMouseLeave(){
    
      this.cookiservice.put('session','true');
      this.sessionVar="true";
      
      console.log('sessionvar '+this.cookiservice.get('session'));                
    }
    @HostListener('click',['$event']) clickEvent(elem){
    
      this.cookiservice.put('session','true');
      this.sessionVar="true";      
      console.log('sessionvar '+this.cookiservice.get('session'));                
    }


    @HostListener('document:keydown', ['$event'])
    keypress(e: KeyboardEvent) {
      this.cookiservice.put('session','true');
      this.sessionVar="true";
      console.log('sessionvar '+this.cookiservice.get('session'));                
    }


    toggleimage(){

      console.log('inside toggleimage');
      if(this.imageurl=='test1.jpg'){
        console.log('image is test1');        
        this.imageurl='test2.jpg';
      }
      else if (this.imageurl=='test2.jpg'){
        console.log('image is test2');                
        this.imageurl='test1.jpg';

      }
    }
    submit(val){
console.log(val);
console.log()
    }


encrypt(message){

//this.check=message.split();
//console.log(this.check);

for (let entry of message.length) {

  
  this.check.fill(entry.split());
}


console.log(this.check);
console.log(message.valueOf());

}

books2(){

  this.browseAllBooks();
}

  ngOnInit(){

//this.browseAllBooks();
this.uname=this.cookiservice.get('username');
//this.browseAllBooks();
this.sessionVar="true";
console.log('inside oninit '+this.sessionVar);
this.cookiservice.put('session','true');
//this.session();
//this.setFalse();


this.encrypt('testing');




  }


    // Handle error statuses here


}

interface Book{

  title:String,
  author:String,
  genre:String,
  cover:String,
  avilableNo:number,
  bookId:number

}
