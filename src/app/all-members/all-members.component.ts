import { Component, OnInit ,TemplateRef} from '@angular/core';
import {Http,Response} from '@angular/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import{CookieService} from 'ngx-cookie';

@Component({
  selector: 'app-all-members',
  templateUrl: './all-members.component.html',
  styleUrls: ['./all-members.component.css']
})
export class AllMembersComponent implements OnInit {


  memQue:String;
  member:Member[];
  edited:boolean;
  remove:String;
  block:String;
  unBlock:String;
  modalRef: BsModalRef;
  message: string;
  template: TemplateRef<any>;
  userId:number;
  constructor(private http:Http,private modalService: BsModalService,private cookiService:CookieService) { }


  allMembers(){


    this.http.get('http://localhost:8081/adminController/viewAllMembers')
    .subscribe(

      (res:Response)=>{
      this.member=res.json();
      console.log(this.member);
      if(res.json().length==0){
        this.memQue="No Members"
        this.edited=true;

        setTimeout(function() {
            this.edited = false;
            console.log(this.edited);
        }.bind(this), 3000);

      }
      else{
    }

      }
    )

  }
  blockMember(userId){

    console.log(userId);
    this.http.get('http://localhost:8081/adminController/blockMember'+'/'+userId)
    .subscribe(

      (res:Response)=>{
        const message=res.text();
        console.log(message);
        this.block=message;
        this.unBlock="";
        this.remove="";
        this.edited=true;

        setTimeout(function() {
            this.edited = false;
            console.log(this.edited);
        }.bind(this), 1000);
        this.allMembers();

      }
    )

  }
  unBlockMember(userId){

    console.log(userId);
    this.http.get('http://localhost:8081/adminController/unblockMember'+'/'+userId)
    .subscribe(

      (res:Response)=>{
        const message=res.text();
        console.log(message);
        this.unBlock=message;
        this.block="";
        this.remove="";
        this.edited=true;

        setTimeout(function() {
            this.edited = false;
            console.log(this.edited);
        }.bind(this), 1000);
        this.allMembers();
      }
    )

  }
  removeMember(userId,template){

    console.log('UserId inside first function '+userId);    
    this.cookiService.put('userId',userId);
    this.openModal(template);
    

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
  
  confirm(): void {
    console.log('You are confirmed');
    this.message = 'Confirmed!';
    this.userId=+this.cookiService.get('userId');
    console.log('UserId inside remove '+this.userId);
    this.modalRef.hide();
    this.http.get('http://localhost:8081/adminController/removeMember'+'/'+this.userId)
    .subscribe(

      (res:Response)=>{
        const message=res.text();
        console.log(message);
        this.remove=message;
        this.unBlock="";
        this.block="";
        this.edited=true;
        this.cookiService.remove('userid');
        setTimeout(function() {
            this.edited = false;
            console.log(this.edited);
        }.bind(this), 1000);
        this.allMembers();
      }
    )
  }
  
  decline(): void {
    this.message = 'Declined!';
    console.log('You are declined');
    
    this.modalRef.hide();
  }

  ngOnInit() {

    this.allMembers();

  }

}
interface Member{
  userId:number,
  name:String,
  email:String,
  phone:number,
  remarks:String,
  active:String
}
