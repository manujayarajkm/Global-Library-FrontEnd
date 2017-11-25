import { Component, OnInit } from '@angular/core';
import{Http,Response} from '@angular/http';
import{Router} from '@angular/router';
import{CookieService} from 'ngx-cookie';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit {

userId:number;
purchase:Purchase[];
empty:String;

  constructor(private http:Http,private cookiservice:CookieService,private router:Router) { }

  myPurchases(){

    this.userId=+this.cookiservice.get('userId');
    console.log(this.userId);

    this.http.get('http://localhost:8080/librarycontroller/purchaseHistory'+'/'+this.userId)
    .subscribe(

      (res:Response)=>{
      this.purchase=res.json();
      console.log(this.purchase);
      if(this.purchase.length==0){
        this.empty="You dont have any purchase history";
      }

      

      }
    )

  }
  viewDetails(purchaseId,bookId,purchaseDate,billId){
    alert('got it');
    console.log(purchaseId,bookId,purchaseDate,billId);
  }

  ngOnInit() {
    this.myPurchases();
  }

}
interface Purchase{

  purchaseId: number,
  userId: number,
  title:String,
  author:String,
  count: number,
  price: number,
  bookId: number,
  subTotal:number,
  purchaseDate:Date,
  billId: number
}
