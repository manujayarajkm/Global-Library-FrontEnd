import { Injectable ,HostListener} from '@angular/core';
import{CookieService} from 'ngx-cookie';
import{Router} from '@angular/router';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class SessionService {

  sessionVar:String;
  constructor(private cookiservice:CookieService,private router:Router) {

    window.addEventListener('keydown', (event) => {
      console.dir(event);
    });
  
   }

  session(){
    setTimeout(function() {
      console.log('inside settimeout '+this.sessionVar);
      //this.sessionVar=this.cookiservice.get('session');
            if(this.sessionVar=='false'){
              alert('your session is going to expire in 10 seconds');
              this.checkTimeout();
            }
            else{
              console.log('calling setfalse');          
              this.setFalse();
            }
        }.bind(this), 7000);
       }
    
       checkTimeout(){
        setTimeout(function() {
          //this.sessionvar=this.cookiservice.get('session');
          console.log('session var near logout '+this.sessionVar);
                if(this.sessionVar=='false'){
                  
                  this.logout();
                }
                else{
                  this.session();
                }
            }.bind(this), 5000);
          }
          setFalse(){
            setTimeout(function() {
              console.log('setting to false');          
                    this.cookiservice.put('session','false');
                    this.sessionVar="false";
                    
                    console.log('sessionvar '+this.cookiservice.get('session'));  
                    this.session();              
                }.bind(this), 6000);
              }
    
          logout(){
            
                
            
                this.cookiservice.removeAll();
                alert("You have successfully logged out");
                this.router.navigate(['']);
                location.reload();
              }
    
      @HostListener('document:mouseenter', ['$event']) checkMouse(){

        window.addEventListener('mouseenter', ($event) => {
          console.log($event);
        });
      
        
        this.cookiservice.put('session','true');
        this.sessionVar="true";
        
        console.log('sessionvar '+this.cookiservice.get('session'));                
      }
        @HostListener('document:mouseleave', ['$event']) checkMouseLeave(){
        
          this.cookiservice.put('session','true');
          this.sessionVar="true";
          
          console.log('sessionvar '+this.cookiservice.get('session'));                
        }
        @HostListener('click',['$event']) clickEvent(elem){
        
          this.cookiservice.put('session','true');
          this.sessionVar="true";      
          console.log('sessionvar '+this.cookiservice.get('session'));                
        }
    
    
        @HostListener('document:keydown', ['$event'])

        

        keypress(e: KeyboardEvent) {
          this.cookiservice.put('session','true');
          this.sessionVar="true";
          console.log('sessionvar '+this.cookiservice.get('session'));                
        }

      

}
