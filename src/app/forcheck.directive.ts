import { Directive ,ElementRef,HostListener} from '@angular/core';

@Directive({
  selector: '[appForcheck]'
})
export class ForcheckDirective {

  constructor(private element:ElementRef) {

element.nativeElement.style.color="blue";

   }

@HostListener('mouseenter') checkMouse(){

this.element.nativeElement.style.color="green";

  console.log('mouse entered');
}
@HostListener('mouseleave') checkMouseLeave(){

this.element.nativeElement.style.color="blue";

  console.log('mouse left');
}
@HostListener('click',['$event']) clickEvent(elem){

alert('clicked');
}


}
