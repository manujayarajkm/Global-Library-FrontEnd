import { Component, OnInit } from '@angular/core';
import{Http,Response} from '@angular/http';
import{CookieService} from 'ngx-cookie';
import{Router} from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  userId:number;
  cart:Cart[];
  total:number=0;

  constructor(private http:Http,private cookiservice:CookieService,private router:Router) { }


  cartReview(){

    this.cookiservice.remove('items');
    this.userId=+this.cookiservice.get('userId');
    console.log(this.userId);
    this.http.get('http://localhost:8080/librarycontroller/cartReview'+'/'+this.userId)
    .subscribe(

      (res:Response)=>{
      this.cart=res.json();
      console.log(this.cart);
      for(let car of this.cart){
        this.total=this.total+car.subTotal;
      }
      console.log('total '+this.total);
      this.cookiservice.put('total',String(this.total));
      //alert(message);
      //location.reload();
        //const message=res.text();
        //console.log(message);
        //alert(message);
        //location.reload();

      }
    )
  }
  abort(){
    console.log('abort');
    console.log(this.userId);
    this.http.get('http://localhost:8080/librarycontroller/clearPurchase'+'/'+this.userId)
    .subscribe(

      (res:Response)=>{
      const message=res.text();
      console.log(message);
      this.router.navigate(['store']);
      location.reload();
      //alert(message);
      //location.reload();
        //const message=res.text();
        //console.log(message);
        //alert(message);
        //location.reload();

      }
    )
  }
  gotostore(){
    this.router.navigate(['store']);
    location.reload();
  }
  ngOnInit() {

    this.cartReview();
  }

}
interface Cart{

  cartId: number,
  userId:number,
  title:String,
  author:String,
  count: number,
  price:number,
  bookId:number,
  subTotal:number;
}
