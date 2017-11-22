import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowalComponent } from './borrowal.component';

describe('BorrowalComponent', () => {
  let component: BorrowalComponent;
  let fixture: ComponentFixture<BorrowalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrowalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
