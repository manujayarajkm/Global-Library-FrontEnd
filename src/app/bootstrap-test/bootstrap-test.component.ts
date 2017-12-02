import { Component, OnInit } from '@angular/core';
import {NgsRevealModule} from 'ng-scrollreveal';

@Component({
  selector: 'app-bootstrap-test',
  templateUrl: './bootstrap-test.component.html',
  styleUrls: ['./bootstrap-test.component.css']
})
export class BootstrapTestComponent implements OnInit {

  seat1:String="vaccant.png";
  seat2:String="vaccant.png";
  seat3:String="vaccant.png";
  seat4:String="vaccant.png";
  seat5:String="vaccant.png";
  expr1:boolean;
  seatvar:String;
  seat:string[]=[];
  constructor() { }

  toggleimage(id){
    if(this.seat.length>=2){
      console.log('first element of the array '+this.seat[0]);
      if(this.seat[0]=='seat2'){
        this.seat2="vaccant.png";
      }else if(this.seat[0]=='seat1'){
        this.seat1="vaccant.png";
      }
      else if(this.seat[0]=='seat3'){
        this.seat3="vaccant.png";
      }
      else if(this.seat[0]=='seat4'){
        this.seat4="vaccant.png";
      }
      else if(this.seat[0]=='seat5'){
        this.seat5="vaccant.png";
      }
      console.log('seatvar '+this.seatvar);
      this.splicearray(this.seat[0]);
      console.log('no exceeded '+this.seat);
    }
    
    console.log(id);
    
      if(id=='seat1')
      {
      if(this.seat1=='vaccant.png'){
      this.seat1="selected.jpeg";
      var length=this.seat.push('seat1');
      console.log('after insertion '+this.seat);
      }
      else if(this.seat1=='selected.jpeg'){
        this.seat1='vaccant.png';
      //this.seat.pop();
      // var index = this.seat.indexOf('s1', 0);
      // if (index > -1) {
      //    this.seat.splice(index, 1);
      // }
      this.splicearray('seat1');
        console.log('after removal '+this.seat);
      }
    }
      
      else if(id=='seat2')
      {
      if(this.seat2=='vaccant.png'){
      this.seat2="selected.jpeg";
      var length=this.seat.push('seat2');
      console.log('after insertion '+this.seat);
      }
      else if(this.seat2=='selected.jpeg'){
        this.seat2='vaccant.png';
        //this.seat.pop();
        this.splicearray('seat2');
        console.log('after removal '+this.seat);
      }
    }
    else if(id=='seat3')
    {
    if(this.seat3=='vaccant.png'){
    this.seat3="selected.jpeg";
    var length=this.seat.push('seat3');
    console.log('after insertion '+this.seat);
    }
    else if(this.seat3=='selected.jpeg'){
      this.seat3='vaccant.png';
      //this.seat.pop();
      this.splicearray('seat3');
      console.log('after removal '+this.seat);
    }
  }
  else if(id=='seat4')
  {
  if(this.seat4=='vaccant.png'){
  this.seat4="selected.jpeg";
  var length=this.seat.push('seat4');
  console.log('after insertion '+this.seat);
  }
  else if(this.seat4=='selected.jpeg'){
    this.seat4='vaccant.png';
    //this.seat.pop();
    this.splicearray('seat4');
    console.log('after removal '+this.seat);
  }
}
else if(id=='seat5')
{
if(this.seat5=='vaccant.png'){
this.seat5="selected.jpeg";
var length=this.seat.push('seat5');
console.log('after insertion '+this.seat);
}
else if(this.seat5=='selected.jpeg'){
  this.seat2='vaccant.png';
  //this.seat.pop();
  this.splicearray('seat5');
  console.log('after removal '+this.seat);
}
}
    
    
  }
submit(){

  alert('selected seats are '+this.seat);
}

splicearray(key){
  var index = this.seat.indexOf(key, 0);
  if (index > -1) {
     this.seat.splice(index, 1);
  }
}

bookedseats(){

  this.seat1='booked.png';
  this.expr1=true;
}
  ngOnInit() {

    this.bookedseats();
  }

}
