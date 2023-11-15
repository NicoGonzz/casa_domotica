import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlEstadisticasComponent } from './control-estadisticas.component';

describe('ControlEstadisticasComponent', () => {
  let component: ControlEstadisticasComponent;
  let fixture: ComponentFixture<ControlEstadisticasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlEstadisticasComponent]
    });
    fixture = TestBed.createComponent(ControlEstadisticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
