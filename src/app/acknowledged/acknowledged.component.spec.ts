import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcknowledgedComponent } from './acknowledged.component';

describe('AcknowledgedComponent', () => {
  let component: AcknowledgedComponent;
  let fixture: ComponentFixture<AcknowledgedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcknowledgedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcknowledgedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
