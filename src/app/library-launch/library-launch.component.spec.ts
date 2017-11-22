import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryLaunchComponent } from './library-launch.component';

describe('LibraryLaunchComponent', () => {
  let component: LibraryLaunchComponent;
  let fixture: ComponentFixture<LibraryLaunchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibraryLaunchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryLaunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
