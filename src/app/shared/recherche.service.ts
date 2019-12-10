import { Injectable } from '@angular/core';
import {Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import 'rxjs/add/operator/catch';
import { environment } from 'src/environments/environment.prod';
import { RechercheAudit } from '../model/recherche-audit.model';
import { Recherche } from '../model/recherche';
import {UserService} from "./user.service";
import {UtilService} from "./util.service";


@Injectable({
  providedIn: 'root'
})
export class RechercheService {

  constructor(private formBuider: FormBuilder,
              private datepipe: DatePipe,
              private authService: UserService,
              private httpClient: HttpClient) { }

  recherches: Recherche[] = [];
  recherchesSubject = new Subject<Recherche[]>();

  baseUrl = environment.appUrl + '/SuiviRecherches/rest/';

  form = this.formBuider.group(this.initForm());

  emitRecherches() {
    console.log('Emit Recherches ' +  this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS'));
    this.recherches.sort((a, b) => {
            if (a.dateContact < b.dateContact) {
              return 1;
            }
            if (a.dateContact > b.dateContact) {
              return -1;
            }
            return 0; });
    console.log(this.recherches);
    this.recherchesSubject.next(this.recherches);
  }

  logout(){
    this.recherches = [];
  }

  getAllRecherches() {
    console.log('--- getAllRecherches ' + this.baseUrl);
    if (this.recherches.length !== 0) {
      console.log(this.recherches);
      return this.recherches;
    }
    return this.httpClient.get<Recherche[]>(this.baseUrl + 'recherches/' + this.authService.user.email).subscribe((res: any[]) => {
        console.log('getAllRecherche....' + this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS'));
        console.log(res);

        this.recherches = res;
        this.emitRecherches();
      },
      error => UtilService.handleError(error));
  }

  insertRecherche(recherche) {
    this.httpClient.post<Recherche>(this.baseUrl + 'recherche', this.toBoot(recherche), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe(
      (res) => {
        console.log('insert recherche');
        console.log(res);
        this.recherches.push(res);
        this.emitRecherches();
      },
      error => UtilService.handleError(error));
  }

  updateRecherche(recherche) {
    this.httpClient.put<Recherche>(this.baseUrl + 'recherche', this.toBoot(recherche), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe(
      (res) => {
        const rech = this.fromBoot(res);
        const rechercheIndexToRemove = this.getRechercheIndexToRemove(rech.id);
        this.recherches.splice(rechercheIndexToRemove, 1);
        this.recherches.push(rech);
        this.emitRecherches();
      },
      error => UtilService.handleError(error));
  }

  deleteRecherche(id) {
    console.log('tryin to delete this recherche ' + id);

    this.httpClient.delete<Recherche>(this.baseUrl + 'delRecherche/' + id).subscribe(
      () => {
        console.log('Recherche with id' + id + 'deleted !!');
        const rechercheIndexToRemove = this.getRechercheIndexToRemove(id);
        this.recherches.splice(rechercheIndexToRemove, 1);
        this.emitRecherches();
      },
      (error) => UtilService.handleError(error));
  }

  getAuditRecherche(id) {
    return this.httpClient.get<RechercheAudit[]>(this.baseUrl + 'audit/recherche/' + id);
  }

  getAuditPersonne(id) {
    return this.httpClient.get(this.baseUrl + 'audit/personne/' + id);
  }

  getAuditEntreprise(id) {
    return this.httpClient.get(this.baseUrl + 'audit/entreprise/' + id);
  }

  getRechercheIndexToRemove(id) {
    return this.recherches.findIndex(
            (rechercheEl) => {
              if (rechercheEl.id === id) {
                    return true;
              }});
  }

  populateForm(recherche) {
    this.form.setValue(recherche);
  }

  resetForm() {
    this.form.reset();
    this.form = this.formBuider.group(this.initForm());
  }

  formKeyIdIsNull() {
    return this.form.get('id').value === null;
  }

  initForm() {
    return {
      id: [null],
      dateContact: [this.datepipe.transform(new Date(), 'yyyy-MM-dd'), Validators.required],
      poste: ['', Validators.required],
      statut: ['En Cours', Validators.required],

      assignationORP: ['Non', Validators.required],
      tauxActivite: ['100', Validators.required],
      approcheMedia: ['Ecrit', Validators.required],

      entrepriseS: ['', Validators.required],
      entrepriseTelS: [''],
      contactNomS: [''],
      contactPrenomS: [''],
      contactEmailS: ['', Validators.email],
      contactTelephoneS: ['', Validators.minLength(8)],

      entrepriseF: ['', ],
      entrepriseTelF: [''],
      contactNomF: [''],
      contactPrenomF: [''],
      contactEmailF: ['', Validators.email],
      contactTelephoneF: ['', Validators.minLength(8)],
      userEmail: ['']
    };
  }

  toBoot(recherche): Recherche {
    return {
        id: recherche.id,
        dateContact: this.datepipe.transform(new Date(recherche.dateContact), 'yyyy-MM-dd'),
        poste: recherche.poste,
        statut: recherche.statut,

        assignationORP: recherche.assignationORP,
        tauxActivite: recherche.tauxActivite,
        approcheMedia: recherche.approcheMedia,

        entrepriseS: recherche.entrepriseS,
        entrepriseTelS: recherche.entrepriseTelS,
        contactNomS: recherche.contactNomS,
        contactPrenomS: recherche.contactPrenomS,
        contactEmailS: recherche.contactEmailS,
        contactTelephoneS: recherche.contactTelephoneS,

        entrepriseF: recherche.entrepriseF,
        entrepriseTelF: recherche.entrepriseTelF,
        contactNomF: recherche.contactNomF,
        contactPrenomF: recherche.contactPrenomF,
        contactEmailF: recherche.contactEmailF,
        contactTelephoneF: recherche.contactTelephoneF,
        userEmail: this.authService.user.email
    };
  }

    fromBoot(recherche): Recherche {
      return {
        id: recherche.id,
        dateContact: recherche.dateContact,
        poste: recherche.poste,
        statut: recherche.statut,

        assignationORP: recherche.assignationORP,
        tauxActivite: recherche.tauxActivite,
        approcheMedia: recherche.approcheMedia,

        entrepriseS: recherche.entrepriseS,
        entrepriseTelS: recherche.entrepriseTelS,
        contactNomS: recherche.contactNomS,
        contactPrenomS: recherche.contactPrenomS,
        contactEmailS: recherche.contactEmailS,
        contactTelephoneS: recherche.contactTelephoneS,

        entrepriseF: recherche.entrepriseF,
        entrepriseTelF: recherche.entrepriseTelF,
        contactNomF: recherche.contactNomF,
        contactPrenomF: recherche.contactPrenomF,
        contactEmailF: recherche.contactEmailF,
        contactTelephoneF: recherche.contactTelephoneF,
        userEmail: this.authService.user.email
    };
  }

  toFirebase(recherche) {
    return {
      dateContact: this.datepipe.transform(new Date(recherche.dateContact), 'yyyy-MM-dd'),
      poste: recherche.poste,
      statut: recherche.statut,

      assignationORP: recherche.assignationORP,
      tauxActivite: recherche.tauxActivite,
      approcheMedia: recherche.approcheMedia,

      client: recherche.client,
      entreprise: recherche.entreprise,

      contactNom: recherche.contactNom,
      contactPrenom: recherche.contactPrenom,

      contactEmail: recherche.contactEmail,
      contactTelephone: recherche.contactTelephone
    };
  }
}

