import { Component, OnInit } from '@angular/core';
import{Http,Response} from '@angular/http';
import{CookieService} from 'ngx-cookie';
import{Router} from '@angular/router';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  userId:number;

  constructor(private http:Http,private cookiservice:CookieService,private router:Router) { }

  passwordReset(code,password){

    this.userId=+this.cookiservice.get('userId');
    console.log(this.userId);
    console.log(code);
    console.log(password);
    this.http.get('http://localhost:8080/librarycontroller/resetPassword/'+this.userId+'/'+code+'/'+password)
    .subscribe(

      (res:Response)=>{
        const message=res.text();
        console.log(message);
        alert(message);
        if(message=="Password changed sucesssfully"){
          alert("Please login with new credentials")
        this.router.navigate(['']);
        location.reload();
      }
        
      }
    )

  }

  ngOnInit() {
  }

}
