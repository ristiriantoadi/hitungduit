import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PengaturanNeracaComponent } from './pengaturan-neraca.component';

describe('PengaturanNeracaComponent', () => {
  let component: PengaturanNeracaComponent;
  let fixture: ComponentFixture<PengaturanNeracaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PengaturanNeracaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PengaturanNeracaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
