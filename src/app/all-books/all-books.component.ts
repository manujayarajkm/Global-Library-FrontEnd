import { Component, OnInit } from '@angular/core';
import {Http,Response}from '@angular/http';
import {CookieService} from 'ngx-cookie';
import{Router} from '@angular/router';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css']
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
        alert('sorry no books available');
      }
      console.log(this.books);
        //const message=res.text();
        //console.log(message);
        //alert(message);
        //location.reload();


      }
    )

  }

  borrowBook(bookId){
    console.log(bookId);
    this.cookiservice.put('bookId',bookId);
   console.log(this.cookiservice.get('userId'));
    this.router.navigate(['borrowal']);
    // this.http.get('http://localhost:8080/librarycontroller/addNewHire'+'/'+bookId+'/'+this.cookiservice.get('userId'))
    // .subscribe(
    //
    //   (res:Response)=>{
    //   const message=res.text();
    //   console.log(message);
    //   //alert(message);
    //   this.mess=message;
    //   this.edited=true;
    //
    //   setTimeout(function() {
    //       this.edited = false;
    //       console.log(this.edited);
    //   }.bind(this), 2000);
    //   location.reload();
    //     //const message=res.text();
    //     //console.log(message);
    //     //alert(message);
    //     //location.reload();
    //   }
    // )

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
    //this.browseAllBooks();
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
    //alert(this.books);
  }
  else{
    //alert('no books available');
    this.resultvar="No books Available";
    this.searchres=true;
    setTimeout(function() {
      console.log(this.searchres);
        this.searchres = false;
        console.log(this.searchres);        //this.browseAllBooks();
    }.bind(this), 5000);
  }
    //location.reload();
  }
)
// getReviews(bookId){
//   console.log('id after function call'+bookId);
//   this.http.get('http://localhost:8080/librarycontroller/getReviews'+'/'+bookId)
//   .subscribe(
//
//     (res:Response)=>{
//     this.review=res.json();
//     if(this.review.length==0){
//       //alert('sorry no books available');
//     }
//     console.log(this.review);
//     for(let rev of this.review){
//       console.log(rev.body);
//       this.display.push(rev.body);
//     }
//     for(let di of this.display ){
//       console.log('array element '+di);
//     }
//     //this.display.push();
//       //const message=res.text();
//       //console.log(message);
//       //alert(message);
//       //location.reload();
//     }
//   )
//
// }
//
}



  ngOnInit() {

    this.loader();
    //this.browseAllBooks();
    //alert(this.cookiservice.get('loginId'));


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
