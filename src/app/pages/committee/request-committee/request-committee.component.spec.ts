import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestCommitteeComponent } from './request-committee.component';

describe('RequestCommitteeComponent', () => {
  let component: RequestCommitteeComponent;
  let fixture: ComponentFixture<RequestCommitteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestCommitteeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestCommitteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
