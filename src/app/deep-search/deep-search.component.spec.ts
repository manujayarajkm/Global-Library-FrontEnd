import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeepSearchComponent } from './deep-search.component';

describe('DeepSearchComponent', () => {
  let component: DeepSearchComponent;
  let fixture: ComponentFixture<DeepSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeepSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeepSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
