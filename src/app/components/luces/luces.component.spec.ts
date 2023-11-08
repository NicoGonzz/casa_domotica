import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LucesComponent } from './luces.component';

describe('LucesComponent', () => {
  let component: LucesComponent;
  let fixture: ComponentFixture<LucesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LucesComponent]
    });
    fixture = TestBed.createComponent(LucesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
