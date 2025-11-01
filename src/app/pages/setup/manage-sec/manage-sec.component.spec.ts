import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSecComponent } from './manage-sec.component';

describe('ManageSecComponent', () => {
  let component: ManageSecComponent;
  let fixture: ComponentFixture<ManageSecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageSecComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
