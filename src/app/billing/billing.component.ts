import { Component, OnInit } from '@angular/core';
import{Http,Response} from '@angular/http';
import{CookieService} from 'ngx-cookie';
import{Router} from '@angular/router';
import { DatePipe } from '@angular/common';
declare var jsPDF: any;

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  userId:number;
  cart:Cart[];
  total:number=0;
  user:String;
  sysDate:string;
  billId:number;
  items:number;
  empty:String;
  name:String;
  address1:String;
  address2:String;
  phone:number;
  cartlength:number;

  constructor(private http:Http,private cookiservice:CookieService,private router:Router,private datePipe:DatePipe) { }

  billing(name,address1,address2,phone){
    console.log(name,address1,address2,phone);
    this.user=this.cookiservice.get('dropdown');
    console.log(this.user);
    alert('acknowledged');
    this.sysDate=this.datePipe.transform(Date.now(),'yyyy-MM-dd');

    this.http.get('http://localhost:8081/librarycontroller/getMaxBillId')
    .subscribe(

      (res:Response)=>{
      this.billId=+res.text();
      console.log(this.billId);
      this.billId++;
      this.confirmPurchase(this.sysDate,this.billId,name,address1,address2,phone);

      

      }
    )

    console.log('Bill id '+this.billId);
    

  }
  confirmPurchase(billDate,billId,name,address1,address2,phone){

    console.log(billDate,billId);
    this.userId=+this.cookiservice.get('userId');
console.log(this.userId);
    this.http.get('http://localhost:8081/librarycontroller/updatePurchase'+'/'+this.userId+'/'+billId)
    .subscribe(

      (res:Response)=>{
      const message=res.text();
      console.log(message);
      this.cookiservice.remove('total');

      alert('Thank you for choosing us. Meet Again!!!!');
      this.router.navigate(['userhome']);
      location.reload();
      

      }
    )
    console.log('Bill id from function '+billId);
    var doc = new jsPDF("landscape","mm","a4");
    doc.text(150,5,"Global Library");
    doc.text(150,10,"Items Details");
    doc.text(5,80,"Bill id: "+this.billId);
    doc.text(150,80,"Date: "+this.sysDate);
    doc.text(5,90,"Customer Name : "+name);
    doc.text(5,100,"Address: "+address1+","+address2);
    doc.text(5,110,"Contact No: "+phone);
    doc.text(200,140,"Total Amount: "+this.cookiservice.get('total'));
    doc.text(90,150,"Thank You For Shopping With Us");
    
    var elem = document.getElementById("cart");
    var res=doc.autoTableHtmlToJson(elem);
    doc.autoTable(res.columns,res.rows);
    doc.text(5,200,"Maintained by Manu");

    doc.save('Bill_'+this.user);

  }

  cartReview(){

    this.userId=+this.cookiservice.get('userId');
    console.log(this.userId);
    this.http.get('http://localhost:8081/librarycontroller/cartReview'+'/'+this.userId)
    .subscribe(

      (res:Response)=>{
      this.cart=res.json();
      this.cartlength=this.cart.length;
      console.log(this.cart);
      for(let car of this.cart){
        this.total=this.total+car.subTotal;
      }
      console.log('total '+this.total);
      this.cookiservice.put('total',String(this.total));
      

      }
    )
  }

  abort(){
console.log('abort');
console.log(this.userId);
this.http.get('http://localhost:8081/librarycontroller/clearPurchase'+'/'+this.userId)
.subscribe(

  (res:Response)=>{
  const message=res.text();
  console.log(message);
  this.router.navigate(['store']);

  location.reload();
  

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
