import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiresComponent } from './hires.component';

describe('HiresComponent', () => {
  let component: HiresComponent;
  let fixture: ComponentFixture<HiresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HiresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
