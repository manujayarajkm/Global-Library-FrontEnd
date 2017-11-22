import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BootstrapTestComponent } from './bootstrap-test.component';

describe('BootstrapTestComponent', () => {
  let component: BootstrapTestComponent;
  let fixture: ComponentFixture<BootstrapTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BootstrapTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BootstrapTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
