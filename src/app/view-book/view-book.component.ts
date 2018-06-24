import { Component, OnInit ,TemplateRef} from '@angular/core';
import {Http,Response} from '@angular/http';
import{CookieService} from 'ngx-cookie';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css']
})
export class ViewBookComponent implements OnInit {

  books:Book[];
  modalRef: BsModalRef;
  message: string;
  template: TemplateRef<any>;
  bookId:number;

  constructor(private http:Http,private cookieService:CookieService,private modalService: BsModalService) { }

  viewAllBooks(){
    this.http.get('http://localhost:8081/librarycontroller/viewAllBooks')
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
  removeBook(bookId,template){
    console.log(bookId);
    this.cookieService.put('bookid',bookId);
    this.openModal(template);
    

  }



  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
  
  confirm(): void {
    console.log('You are confirmed');
    this.message = 'Confirmed!';
    this.bookId=+this.cookieService.get('bookid')
    console.log('UserId inside remove '+this.bookId);
    this.modalRef.hide();
    this.http.get('http://localhost:8081/librarycontroller/removeBook'+'/'+this.bookId)
    .subscribe(

      (res:Response)=>{
        const message=res.text();
        console.log(message);
        alert(message);
        this.viewAllBooks();
      }
    )
  }
  
  decline(): void {
    this.message = 'Declined!';
    console.log('You are declined');
    
    this.modalRef.hide();
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
