import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheHistComponent } from './recherche-hist.component';

describe('RechercheHistComponent', () => {
  let component: RechercheHistComponent;
  let fixture: ComponentFixture<RechercheHistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechercheHistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechercheHistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
