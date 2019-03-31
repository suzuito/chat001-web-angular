import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogImgUploadConfirmerComponent } from './dialog-img-upload-confirmer.component';

describe('DialogImgUploadConfirmerComponent', () => {
  let component: DialogImgUploadConfirmerComponent;
  let fixture: ComponentFixture<DialogImgUploadConfirmerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogImgUploadConfirmerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogImgUploadConfirmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
