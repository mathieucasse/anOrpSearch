import { Injectable } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import 'rxjs/add/operator/catch';
import { environment } from 'src/environments/environment.prod';
import { RechercheAudit } from '../model/recherche-audit.model';
import {UserService} from "./user.service";


@Injectable({
  providedIn: 'root'
})
export class RechercheService {

  constructor(private formBuider: FormBuilder,
              private datepipe: DatePipe,
              private authService: UserService,
              private httpClient: HttpClient) { }

  recherches: any[] = [];
  recherchesSubject = new Subject<any[]>();

  baseUrl = environment.appUrl + '/SuiviRecherches/rest/';

  allStatutsRecherche: any[] = [];
  allAssignationORP: any[] = [ ];
  allTauxActivite: any[] = [];
  allApprocheMedia: any[] = [];

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

  // getAllRecherches() {
  //   console.log('--- getAllRecherches ' + this.baseUrl);
  //   if (this.recherches.length !== 0) {
  //     console.log(this.recherches);
  //     return this.recherches;
  //   }
  //   return this.httpClient.get(this.baseUrl + 'recherches').subscribe((res: any[]) => {
  //         console.log('getAllRecherche....' + this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS'));
  //         console.log(res);
  //         this.recherches = res.map(this.fromBoot);
  //         this.emitRecherches();
  //       },
  //       error => console.error(error));
  // }

  getAllRecherches() {
    console.log('--- getAllRecherches ' + this.baseUrl);
    if (this.recherches.length !== 0) {
      console.log(this.recherches);
      return this.recherches;
    }
    return this.httpClient.get(this.baseUrl + 'recherches/' + this.authService.user.email).subscribe((res: any[]) => {
        console.log('getAllRecherche....' + this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS'));
        console.log(res);
        this.recherches = res.map(this.fromBoot);
        this.emitRecherches();
      },
      error => console.error(error));
  }

  insertRecherche(recherche) {
    this.httpClient.post<any[]>(this.baseUrl + 'recherche', this.toBoot(recherche), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe(
      (res: any[]) => {
        console.log('insert recherche');
        console.log(res);
        this.recherches.push(this.fromBoot(res));
        this.emitRecherches();
      },
      error => RechercheService.handleError(error));
  }

  updateRecherche(recherche) {
    this.httpClient.put<any[]>(this.baseUrl + 'recherche', this.toBoot(recherche), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe(
      (res: any[]) => {
        const rech = this.fromBoot(res);
        const rechercheIndexToRemove = this.getRechercheIndexToRemove(rech.$key);
        this.recherches.splice(rechercheIndexToRemove, 1);
        this.recherches.push(rech);
        this.emitRecherches();
      },
      error => RechercheService.handleError(error));
  }

  deleteRecherche($key) {
    console.log('tryin to delete this recherche ' + $key);

    this.httpClient.delete<any[]>(this.baseUrl + 'delRecherche/' + $key).subscribe(
      () => {
        console.log('Recherche with id' + $key + 'deleted !!');
        const rechercheIndexToRemove = this.getRechercheIndexToRemove($key);
        this.recherches.splice(rechercheIndexToRemove, 1);
        this.emitRecherches();
      },
      (error) => RechercheService.handleError(error));
  }

  getAuditRecherche($key) {
    return this.httpClient.get<RechercheAudit[]>(this.baseUrl + 'audit/recherche/' + $key);
  }

  getAuditPersonne($key) {
    return this.httpClient.get(this.baseUrl + 'audit/personne/' + $key);
  }

  getAuditEntreprise($key) {
    return this.httpClient.get(this.baseUrl + 'audit/entreprise/' + $key);
  }

  getRechercheIndexToRemove($key) {
    return this.recherches.findIndex(
            (rechercheEl) => {
              if (rechercheEl.$key === $key) {
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

  keyIdIsNull() {
    return this.form.get('$key').value === null;
  }

  private static handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side error : ' + errorResponse.error.message);
    } else {
      console.error('Server Side error : ' + errorResponse);
    }
    return throwError('There is a problem with the sevice ');
  }

  initStaticLists() {
    this.getAllApprocheMedia();
    this.getAllAssignationOrp();
    this.getAllStatutsRecherche();
    this.getAllTauxActivite();
  }
  getAllStatutsRecherche() {
    if (this.allStatutsRecherche.length < 1) {
     this.httpClient.get(this.baseUrl + 'rechercheStatut').subscribe((res: any[]) => {
        console.log(res);
        this.allStatutsRecherche = res;
        },
        error => RechercheService.handleError(error));
    }
    return this.allStatutsRecherche;
  }

  getAllAssignationOrp() {
    if (this.allAssignationORP.length < 1) {
      this.httpClient.get(this.baseUrl + 'assignationOrp').subscribe((res: any[]) => {
        console.log(res);
        this.allAssignationORP = res;
        },
        error => RechercheService.handleError(error));
    }
    return this.allAssignationORP;
  }

  getAllTauxActivite() {
    if (this.allTauxActivite.length < 1) {
      this.httpClient.get(this.baseUrl + 'tauxActivite').subscribe((res: any[]) => {
        console.log(res);
        this.allTauxActivite = res;
        },
        error => RechercheService.handleError(error));
    }
    return this.allTauxActivite;
  }

  getAllApprocheMedia() {
    if (this.allApprocheMedia.length < 1) {
      this.httpClient.get(this.baseUrl + 'approcheMedia').subscribe((res: any[]) => {
          console.log(res);
          this.allApprocheMedia = res;
        },
        error => RechercheService.handleError(error));
    }
    return this.allApprocheMedia;
  }
  initForm() {
    return {
      $key: [null],
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
      contactTelephoneF: ['', Validators.minLength(8)]
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

  toBoot(recherche) {
    return {
        id: recherche.$key,
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


    };
  }

    fromBoot(recherche) {
      return {
        $key: recherche.id,
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
    };
  }
}

