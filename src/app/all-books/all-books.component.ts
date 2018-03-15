import { Component, OnInit } from '@angular/core';
import {Http,Response}from '@angular/http';
import {CookieService} from 'ngx-cookie';
import{Router} from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';




@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css'],
  
})
export class AllBooksComponent implements OnInit {

  books:Book[];
  userId:number;
  bookId:number;
  adminId:number;
  loginId:number;
  mess:String;
  edited:boolean;
  loadervar:boolean;
  searchvar:boolean;
  searchres:boolean;
  resultvar:String;
  public x: number;
  empty:String;



  constructor(private http:Http,private cookiservice:CookieService,private router:Router) {
    this.userId=+this.cookiservice.get('userId');
    this.adminId=+this.cookiservice.get('adminId');
    this.loginId=+this.cookiservice.get('loginId');

  }

  browseAllBooks(){
    this.http.get('http://localhost:8080/librarycontroller/viewAllBooks')
    .subscribe(

      (res:Response)=>{
      this.books=res.json();
      

    
      if(this.books.length==0){
        this.empty="Sorry Book Shelf is Empty";
      }
      console.log(this.books);
        


      }
    )

  }

  borrowBook(bookId){
    console.log(bookId);
    this.cookiservice.put('bookId',bookId);
   console.log(this.cookiservice.get('userId'));
    this.router.navigate(['borrowal']);
    

  }

  loader(){
    this.loadervar=true;
  setTimeout(function() {
      this.loadervar = false;
      console.log(this.loadervar);
      this.browseAllBooks();
  }.bind(this), 2000);
}
searchloader(){
  this.searchvar=true;
setTimeout(function() {
    this.searchvar = false;
    console.log(this.searchvar);
}.bind(this), 200);
}

searchBooks(search){

console.log(search);
this.searchloader();
this.http.get('http://localhost:8080/librarycontroller/searchBooks'+'/'+search)
.subscribe(

  (res:Response)=>{
    this.books=res.json();
    
    if(this.books.length>0){
    console.log(this.books);
    
  }
  else{
    this.resultvar="No books Available";
    this.searchres=true;
    setTimeout(function() {
      console.log(this.searchres);
        this.searchres = false;
        console.log(this.searchres);        
    }.bind(this), 5000);
  }
  }
)

}



  ngOnInit() {

    

    this.loader();
    
    

    


  }

  

}
interface Book{

  title:String,
  author:String,
  genre:String,
  cover:String,
  avilableNo:number,
  bookId:number
  rating:number;

}
