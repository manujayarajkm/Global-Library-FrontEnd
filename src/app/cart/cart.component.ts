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
  cartitems=[];
  constructor(private http:Http,private router:Router,private cookiservice:CookieService) { }

  cartReview(){

    this.userId=+this.cookiservice.get('userId');
    console.log(this.userId);
    this.http.get('http://localhost:8081/librarycontroller/cartReview'+'/'+this.userId)
    .subscribe(

      (res:Response)=>{
      this.cart=res.json();
      console.log(this.cart);
      this.cartlength=this.cart.length;
      this.cookiservice.put('cartlength',String(this.cart.length));
      console.log('cart length is'+this.cookiservice.get('cartlength'));
      if(this.cart.length==0){
        this.empty="No items in the cart";
        this.cartlength=0;
      }
      if(this.cartlength>0){
        console.log('array'+this.cartitems.length);
        for(let s of this.cart){
          this.cartitems.push(s.cartId);
          console.log(s.cartId);
        }
        console.log('cartitems'+this.cartitems);
      }
      

      }
    )
  }
  removeitem(cartId,bookId,count){
    console.log(cartId,bookId,count);
    this.http.get('http://localhost:8081/librarycontroller/removeFromCart'+'/'+cartId+'/'+count+'/'+bookId)
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
  this.http.get('http://localhost:8081/librarycontroller/incrementItem'+'/'+cartId+'/'+bookId)
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
  this.http.get('http://localhost:8081/librarycontroller/decrementItem'+'/'+cartId+'/'+bookId)
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

timeexceed(){
  console.log('inside time limit');
  this.abort();
}

abort(){
  console.log('abort');
  console.log(this.userId);
  this.http.get('http://localhost:8081/librarycontroller/clearPurchase'+'/'+this.userId)
  .subscribe(

    (res:Response)=>{
    const message=res.text();
    console.log(message);
    this.router.navigate(['userhome']);
    //location.reload();
    

    }
  )
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
