import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeracaBaruComponent } from './neraca-baru.component';

describe('NeracaBaruComponent', () => {
  let component: NeracaBaruComponent;
  let fixture: ComponentFixture<NeracaBaruComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeracaBaruComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NeracaBaruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
