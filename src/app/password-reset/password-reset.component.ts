import { Component, OnInit } from '@angular/core';
import{CookieService} from 'ngx-cookie';
import{Http,Response} from '@angular/http';
import{Router} from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  email:String;
  userId:number;
  uname:String;

  constructor(private http:Http,private cookiservice:CookieService,private router:Router) { }

  getUid(email,uname){

    console.log(uname);
    console.log(email);
    this.http.get('http://localhost:8080/librarycontroller/getUid/'+uname)
    .subscribe(

      (res:Response)=>{
        const message=res.text();
        console.log(message);
        if(+message==0){
          console.log("username is incorrect");
          alert("incorrect username");
        }
        
        else{
          this.cookiservice.put('userId',message);
        this.sendMail(email,message);
      }
      }
    )

  }
  sendMail(email,userId){

    console.log('userid inside sendMail'+userId);
    console.log(email);
    let emailObj={
      "userId":userId,
      "email":email
    }
    console.log('email object'+emailObj);
    this.http.post('http://localhost:8080/librarycontroller/sendMail',emailObj)
    .subscribe(

      (res:Response)=>{
        const message=res.text();
        console.log(message);
        alert(message);
        if(message=="Mail Sent Successfully"){
        this.router.navigate(['changepassword']);
      }
        
      }
    )

  }

  ngOnInit() {
  }

}
