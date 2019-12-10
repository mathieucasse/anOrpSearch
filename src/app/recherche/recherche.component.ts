import {Component, OnDestroy, OnInit} from '@angular/core';
import { RechercheService } from '../shared/recherche.service';
import { Router } from '@angular/router';
import {StaticlistsService} from "../shared/staticlists.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent implements OnInit, OnDestroy {

  submitted: boolean;
  showSuccessMessage: boolean;

  rechercheForm: FormGroup;
  formControls:  any;
  allStatutsRecherche: any[];
  allAssignationORP: any[];
  allTauxActivite: any[];
  allApprocheMedia: any[];

  constructor(private rechercheService: RechercheService,
              private staticListService: StaticlistsService,
              private router: Router) { }

  ngOnInit(): void {
    this.rechercheForm = this.rechercheService.form;
    this.formControls = this.rechercheForm.controls;
    this.allStatutsRecherche = this.staticListService.allStatutsRecherche;
    this.allAssignationORP = this.staticListService.allAssignationORP;
    this.allTauxActivite = this.staticListService.allTauxActivite;
    this.allApprocheMedia = this.staticListService.allApprocheMedia;
  }

  ngOnDestroy(): void {
  }

  onBack() {
    this.rechercheService.resetForm();
    this.router.navigate(['/recherches']);
  }

  resetForm() {
    this.rechercheService.resetForm();
  }

  keyIdIsNull() {
    return this.rechercheService.formKeyIdIsNull();
  }

  onSubmit() {
    this.submitted = true;
    // this.logSubmit();
    if (this.rechercheService.form.valid) {
      if (this.rechercheService.form.get('id').value == null) {
        this.rechercheService.insertRecherche(this.rechercheService.form.value);
      } else {
        this.rechercheService.updateRecherche(this.rechercheService.form.value);
      }
      this.showSuccessMessage = true;
      setTimeout(() => this.showSuccessMessage = false, 7000);
    }
    this.submitted = false;
    this.rechercheService.resetForm();
    this.router.navigate(['/recherches']);
  }

  logSubmit() {
    console.log(this.formControls.value);
    console.log(this.rechercheService.form.controls.dateContact);
    console.log(this.rechercheService.form.controls.poste);
    console.log(this.rechercheService.form.controls.statut);
    console.log(this.rechercheService.form.controls.contactNom);
    console.log(this.submitted);
    console.log('+++++++ ' + this.formControls.poste.valid);
    console.log('----f--- invalid ? ' + (this.submitted && this.formControls.dateContact.invalid));
    console.log('----e--- invalid ?' + (this.submitted && this.formControls.poste.invalid));
    console.log('----m--- invalid ?' + (this.submitted && this.formControls.statut.invalid));
    console.log('----l--- invalid ?' + (this.submitted && this.formControls.contactNom.invalid));
    console.log('Form Valid = ' + this.rechercheService.form.valid);
    console.log('Form Value = ' );
    console.log(this.rechercheService.form.value);
  }
}
