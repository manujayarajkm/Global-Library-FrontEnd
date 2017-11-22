import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForTestingComponent } from './for-testing.component';

describe('ForTestingComponent', () => {
  let component: ForTestingComponent;
  let fixture: ComponentFixture<ForTestingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForTestingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
