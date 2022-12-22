import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosPrincipalComponent } from './gastos-principal.component';

describe('GastosPrincipalComponent', () => {
  let component: GastosPrincipalComponent;
  let fixture: ComponentFixture<GastosPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GastosPrincipalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GastosPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
