import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileListEachComponent } from './profile-list-each.component';

describe('ProfileListEachComponent', () => {
  let component: ProfileListEachComponent;
  let fixture: ComponentFixture<ProfileListEachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileListEachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileListEachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
