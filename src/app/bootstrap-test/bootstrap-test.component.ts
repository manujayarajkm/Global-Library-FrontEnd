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
  seat:string[]=[];
  constructor() { }

  toggleimage(id){
    console.log(id);
    
      if(id=='s1')
      {
      if(this.seat1=='vaccant.png'){
      this.seat1="selected.jpeg";
      var length=this.seat.push('s1');
      console.log('after insertion '+this.seat);
      }
      else if(this.seat1=='selected.jpeg'){
        this.seat1='vaccant.png';
      //this.seat.pop();
      // var index = this.seat.indexOf('s1', 0);
      // if (index > -1) {
      //    this.seat.splice(index, 1);
      // }
      this.splicearray('s1');
        console.log('after removal '+this.seat);
      }
    }
      
      else if(id=='s2')
      {
      if(this.seat2=='vaccant.png'){
      this.seat2="selected.jpeg";
      var length=this.seat.push('s2');
      console.log('after insertion '+this.seat);
      }
      else if(this.seat2=='selected.jpeg'){
        this.seat2='vaccant.png';
        //this.seat.pop();
        this.splicearray('s2');
        console.log('after removal '+this.seat);
      }
    }
    else if(id=='s3')
    {
    if(this.seat3=='vaccant.png'){
    this.seat3="selected.jpeg";
    var length=this.seat.push('s3');
    console.log('after insertion '+this.seat);
    }
    else if(this.seat3=='selected.jpeg'){
      this.seat3='vaccant.png';
      //this.seat.pop();
      this.splicearray('s3');
      console.log('after removal '+this.seat);
    }
  }
  else if(id=='s4')
  {
  if(this.seat4=='vaccant.png'){
  this.seat4="selected.jpeg";
  var length=this.seat.push('s4');
  console.log('after insertion '+this.seat);
  }
  else if(this.seat4=='selected.jpeg'){
    this.seat4='vaccant.png';
    //this.seat.pop();
    this.splicearray('s4');
    console.log('after removal '+this.seat);
  }
}
else if(id=='s5')
{
if(this.seat5=='vaccant.png'){
this.seat5="selected.jpeg";
var length=this.seat.push('s5');
console.log('after insertion '+this.seat);
}
else if(this.seat5=='selected.jpeg'){
  this.seat2='vaccant.png';
  //this.seat.pop();
  this.splicearray('s5');
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
