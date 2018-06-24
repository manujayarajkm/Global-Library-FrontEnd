import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {

  
  

  constructor() { 


  }

  beep(){
    console.log('got the call inside function');
  }


  ngOnInit() {

    
  }


}
