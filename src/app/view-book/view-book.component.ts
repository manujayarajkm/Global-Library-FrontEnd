import { Component, OnInit } from '@angular/core';
import {Http,Response} from '@angular/http';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css']
})
export class ViewBookComponent implements OnInit {

  books:Book[];

  constructor(private http:Http) { }

  viewAllBooks(){
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
  removeBook(bookId){
    console.log(bookId);
    this.http.get('http://localhost:8080/librarycontroller/removeBook'+'/'+bookId)
    .subscribe(

      (res:Response)=>{
        const message=res.text();
        console.log(message);
        alert(message);
        this.viewAllBooks();
      }
    )

  }

  ngOnInit() {

    this.viewAllBooks();
  }

}
interface Book{

  title:String,
  author:String,
  genre:String,
  cover:String,
  avilableNo:number,
  bookId:number

}
