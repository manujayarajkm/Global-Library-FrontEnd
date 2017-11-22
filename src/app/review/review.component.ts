import { Component, OnInit } from '@angular/core';
import{Http,Response} from '@angular/http';
import{Router} from '@angular/router';
import{CookieService} from 'ngx-cookie';


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

bookId:number;
review:String;
userId:number;
public rating: number = 0;

  constructor(private http:Http,private cookiservice:CookieService,private router:Router) { }

  addReview(review,rating){

    console.log(review);
    console.log('rating value '+rating);
    this.bookId=+this.cookiservice.get('bookId');
    console.log(this.bookId);
//console.log(this.bookId);
this.userId=+this.cookiservice.get('userId');
  console.log(this.userId);
  let reviewObj={
    "body":review,
    "userId":this.userId,
    "bookId":this.bookId,
    "rating":rating
  }
  console.log(reviewObj);
  this.http.post('http://localhost:8080/librarycontroller/addReview',reviewObj)
  .subscribe(

    (res:Response)=>{
    const message=res.text();
    console.log(message);
    //console.log(length);
    alert('Thank You '+message);
    this.router.navigate(['userhome']);

    //alert(length);
    //location.reload();

    }
  )



  }
  cancel(){

    this.router.navigate(['myQueue']);
    //location.reload();
  }

  ngOnInit() {
    //this.addReview(this.review);
  }

}
