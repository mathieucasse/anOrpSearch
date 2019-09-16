import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheEventComponent } from './recherche-event.component';

describe('RechercheEventComponent', () => {
  let component: RechercheEventComponent;
  let fixture: ComponentFixture<RechercheEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechercheEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechercheEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
