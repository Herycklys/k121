import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDataFriendComponent } from './modal-data-friend.component';

describe('ModalDataFriendComponent', () => {
  let component: ModalDataFriendComponent;
  let fixture: ComponentFixture<ModalDataFriendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDataFriendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDataFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
