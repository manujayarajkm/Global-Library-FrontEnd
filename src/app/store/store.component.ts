import { Component, OnInit } from '@angular/core';
import{Http,Response} from '@angular/http';
import{CookieService} from 'ngx-cookie';
import{Router} from  '@angular/router';
import {UtilService} from '../util.service';
import{SortByPipe} from '../sort-by.pipe';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  books:Book[];
  items:number=0;
  userId:number;
  check:number;
  sortField:Array<string>=["title","genre","price"];
  sortDirection:string='asc';

  constructor(private http:Http,private cookiservice:CookieService,private router:Router,private utilService:UtilService,sortBy:SortByPipe) { }


  browseAllBooks(){
    
    this.http.get('http://localhost:8080/librarycontroller/viewAllBooks')
    .subscribe(

      (res:Response)=>{
      this.books=res.json();
      if(this.books.length==0){
        alert('sorry no books available');
      }
      console.log(this.books);
        

      }
    )

  }

  buy(bookId,price,title,author){

console.log('bookid '+bookId);


    console.log(price,title,author);
    this.userId=+this.cookiservice.get('userId');

  this.http.get('http://localhost:8080/librarycontroller/addToCart'+'/'+bookId+'/'+this.userId+'/'+title+'/'+author+'/'+price)
  .subscribe(

    (res:Response)=>{
    const message=res.text();
    console.log(message);
    alert(message);
    this.items=+this.cookiservice.get('items');
    this.items++;
    this.cookiservice.put('items',String(this.items));
    this.browseAllBooks();
    //location.reload();
      

    }
  )

  }

  ngOnInit() {
    this.browseAllBooks();
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
