import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCripperComponent } from './image-cripper.component';

describe('ImageCripperComponent', () => {
  let component: ImageCripperComponent;
  let fixture: ComponentFixture<ImageCripperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageCripperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageCripperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
