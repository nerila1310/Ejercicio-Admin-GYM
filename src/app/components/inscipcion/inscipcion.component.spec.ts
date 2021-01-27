import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscipcionComponent } from './inscipcion.component';

describe('InscipcionComponent', () => {
  let component: InscipcionComponent;
  let fixture: ComponentFixture<InscipcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscipcionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscipcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
