import { Component, OnInit } from '@angular/core';
import{Http,Response} from '@angular/http';
import{CookieService} from 'ngx-cookie';
import{Router} from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  userId:number;
  cart:Cart[];
  empty:String;
  items:number;
  cartlength:number;
  constructor(private http:Http,private router:Router,private cookiservice:CookieService) { }

  cartReview(){

    this.userId=+this.cookiservice.get('userId');
    console.log(this.userId);
    this.http.get('http://localhost:8080/librarycontroller/cartReview'+'/'+this.userId)
    .subscribe(

      (res:Response)=>{
      this.cart=res.json();
      console.log(this.cart);
      this.cartlength=this.cart.length;
      if(this.cart.length==0){
        this.empty="No items in the cart";
        this.cartlength=0;
      }
      

      }
    )
  }
  removeitem(cartId,bookId,count){
    console.log(cartId,bookId,count);
    this.http.get('http://localhost:8080/librarycontroller/removeFromCart'+'/'+cartId+'/'+count+'/'+bookId)
    .subscribe(

      (res:Response)=>{
      const message=res.text();
      console.log(message);
      alert(message);
      this.items=+this.cookiservice.get('items');
      this.items=this.items-count;
      this.cookiservice.put('items',String(this.items));
      this.cartReview();
      //location.reload();
        

      }
    )
  }

addone(cartId,bookId){

  console.log(cartId,bookId);
  this.http.get('http://localhost:8080/librarycontroller/incrementItem'+'/'+cartId+'/'+bookId)
  .subscribe(

    (res:Response)=>{
    const message=res.text();
    console.log(message);
    alert(message);
    this.items=+this.cookiservice.get('items');
    this.items++;
    this.cookiservice.put('items',String(this.items));
    this.cartReview();
    //location.reload();
      

    }
  )


}
removeone(cartId,bookId){
  console.log(cartId,bookId);
  this.http.get('http://localhost:8080/librarycontroller/decrementItem'+'/'+cartId+'/'+bookId)
  .subscribe(

    (res:Response)=>{
    const message=res.text();
    console.log(message);
    alert(message);
    this.items=+this.cookiservice.get('items');
    this.items--;
    this.cookiservice.put('items',String(this.items));
    this.cartReview();
    //location.reload();
      

    }
  )

}
gotostore(){
  this.router.navigate(['store']);
  //location.reload();
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
  bookId:number
}
