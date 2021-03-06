import { Component, OnInit } from '@angular/core';
import{Http,Response} from '@angular/http';
import{CookieService} from 'ngx-cookie';
import{Router} from '@angular/router';

@Component({
  selector: 'app-borrowal',
  templateUrl: './borrowal.component.html',
  styleUrls: ['./borrowal.component.css']
})
export class BorrowalComponent implements OnInit {

bookId:number;
books:Book[];
review:Review[];
length:number;
countReview:number;
countRating:number;
  constructor(private http:Http,private cookiservice:CookieService,private router:Router) { 
    this.bookId=+this.cookiservice.get('bookId');

  }

  borrowBook(bookId){
    console.log(bookId);
    this.cookiservice.put('bookId',bookId);
    console.log(this.cookiservice.get('userId'));
    this.http.get('http://localhost:8081/librarycontroller/addNewHire'+'/'+bookId+'/'+this.cookiservice.get('userId'))
    .subscribe(

      (res:Response)=>{
      const message=res.text();
      console.log(message);
      alert(message);
      this.router.navigate(['allBooks'])
      location.reload();
        
      }
    )

  }

  getSingleBook(){
    this.bookId=+this.cookiservice.get('bookId');
    console.log('inside get book '+this.bookId);
    this.http.get('http://localhost:8081/librarycontroller/getSingleBook'+'/'+this.bookId)
    .subscribe(

      (res:Response)=>{
      this.books=res.json();
      if(this.books.length==0){
        alert('sorry no books available');
      }
      console.log(this.books);
        
        this.getReview(this.bookId);


      }
    )

  }
  getReview(bookId){

    console.log('inside Review'+bookId);
    this.http.get('http://localhost:8081/librarycontroller/getReviews'+'/'+bookId)
    .subscribe(

      (res:Response)=>{
      this.review=res.json();
      if(this.review.length==0){
        this.length=0;
        this.countReview=this.review.length;

      }
      console.log(this.review);
       


      }
    )

  }




  ngOnInit() {
this.bookId=+this.cookiservice.get('bookId');
console.log('bookId '+this.bookId);
this.getSingleBook();

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
  countRating:number;
  countReview:number;

}
interface Review{
  body:String;
  name:String;
}
