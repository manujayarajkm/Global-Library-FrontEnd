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
  seat6:String="vaccant.png";
  seat7:String="vaccant.png";
  seat8:String="vaccant.png";
  seat9:String="vaccant.png";
  seat10:String="vaccant.png";  
  expr1:boolean;
  seatvar:String;
  seat:string[]=[];
  layout:string[]=['seat1','seat2','seat3','seat4','seat5'];
  constructor() { }

  toggleimage(id){
    
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
  this.seat5='vaccant.png';
  //this.seat.pop();
  this.splicearray('seat5');
  console.log('after removal '+this.seat);
}
}
else if(id=='seat6')
{
if(this.seat6=='vaccant.png'){
this.seat6="selected.jpeg";
var length=this.seat.push('seat6');
console.log('after insertion '+this.seat);
}
else if(this.seat6=='selected.jpeg'){
  this.seat6='vaccant.png';
  //this.seat.pop();
  this.splicearray('seat6');
  console.log('after removal '+this.seat);
}
}
else if(id=='seat7')
{
if(this.seat7=='vaccant.png'){
this.seat7="selected.jpeg";
var length=this.seat.push('seat7');
console.log('after insertion '+this.seat);
}
else if(this.seat7=='selected.jpeg'){
  this.seat7='vaccant.png';
  //this.seat.pop();
  this.splicearray('seat7');
  console.log('after removal '+this.seat);
}
}
else if(id=='seat8')
{
if(this.seat8=='vaccant.png'){
this.seat8="selected.jpeg";
var length=this.seat.push('seat8');
console.log('after insertion '+this.seat);
}
else if(this.seat8=='selected.jpeg'){
  this.seat8='vaccant.png';
  //this.seat.pop();
  this.splicearray('seat8');
  console.log('after removal '+this.seat);
}
}
else if(id=='seat9')
{
if(this.seat9=='vaccant.png'){
this.seat9="selected.jpeg";
var length=this.seat.push('seat9');
console.log('after insertion '+this.seat);
}
else if(this.seat9=='selected.jpeg'){
  this.seat9='vaccant.png';
  //this.seat.pop();
  this.splicearray('seat9');
  console.log('after removal '+this.seat);
}
}
else if(id=='seat10')
{
if(this.seat10=='vaccant.png'){
this.seat10="selected.jpeg";
var length=this.seat.push('seat10');
console.log('after insertion '+this.seat);
}
else if(this.seat10=='selected.jpeg'){
  this.seat10='vaccant.png';
  //this.seat.pop();
  this.splicearray('seat10');
  console.log('after removal '+this.seat);
}
}
if(this.seat.length>2){
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
  else if(this.seat[0]=='seat6'){
    this.seat6="vaccant.png";
  }
  else if(this.seat[0]=='seat7'){
    this.seat7="vaccant.png";
  }
  else if(this.seat[0]=='seat8'){
    this.seat8="vaccant.png";
  }
  else if(this.seat[0]=='seat9'){
    this.seat9="vaccant.png";
  }
  else if(this.seat[0]=='seat10'){
    this.seat10="vaccant.png";
  }
  
  this.splicearray(this.seat[0]);
  console.log('no exceeded '+this.seat);

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
