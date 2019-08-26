import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheListComponent } from './recherche-list.component';

describe('RechercheListComponent', () => {
  let component: RechercheListComponent;
  let fixture: ComponentFixture<RechercheListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechercheListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechercheListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
