import { Injectable, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class RechercheService {

  constructor(private firebase: AngularFireDatabase,
              private formBuider: FormBuilder,
              private datepipe: DatePipe,
              private httpClient: HttpClient) { }

  recherches: any[] = [];
  recherchesSubject = new Subject<any[]>();
  
  emitRecherches() {
    console.log('Emit Recherches ');
    console.log(this.recherches);
		this.recherchesSubject.next(this.recherches);
	}

  baseUrl = 'http://localhost:8080/SuiviRecherches/rest/';

  allStatutsRecherche: any[] = [];
  allAssignationORP: any[] = [ ];
  allTauxActivite: any[] = [];
  allApprocheMedia: any[] = [];

  form = this.formBuider.group(this.initForm());

  getAllRecherches() {
    return this.httpClient.get(this.baseUrl + 'recherches').subscribe((res: any[]) => {
          console.log('getAllRecherche....');
          console.log(res);
          this.recherches = res.map(this.fromBoot);
          this.emitRecherches();
        },
        error => this.handleError(error));
  }

  insertRecherche(recherche) {
    this.httpClient.post<any[]>(this.baseUrl + 'addRecherche', this.toBoot(recherche), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe(
      (res: any[]) => {
        console.log(res);
        this.recherches.push(this.fromBoot(res));
        this.emitRecherches();
      },
      error => this.handleError(error));
  }

  updateRecherche(recherche) {
    this.httpClient.post<any[]>(this.baseUrl + 'updateRecherche', this.toBoot(recherche), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe(
      (res: any[]) => {
        console.log(res);
        this.recherches.push(this.fromBoot(res));
        this.emitRecherches();
      },
      error => this.handleError(error));
  }

  deleteRecherche($key) {
    console.log('tryin to delete this recherche ' + $key);
    
    this.httpClient.delete<any[]>(this.baseUrl + 'delRecherche/' + $key).subscribe(
      () => {
        console.log('Recherche with id' + $key + 'deleted !!');
        const rechercheIndexToRemove = this.recherches.findIndex(
            (rechercheEl) => {
              if (rechercheEl.$key === $key) {
                    return true;
              }});

        this.recherches.splice(rechercheIndexToRemove, 1);
        this.emitRecherches();
      },
      (error) => this.handleError(error));
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

  private handleError(errorResponse: HttpErrorResponse) {
    if(errorResponse.error instanceof ErrorEvent) {
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
        error => this.handleError(error));
    }
    return this.allStatutsRecherche;
  }

  getAllAssignationOrp() {
    if (this.allAssignationORP.length < 1) {
      this.httpClient.get(this.baseUrl + 'assignationOrp').subscribe((res: any[]) => {
        console.log(res);
        this.allAssignationORP = res;
        },
        error => this.handleError(error));
    }
    return this.allAssignationORP;
  }

  getAllTauxActivite() {
    if (this.allTauxActivite.length < 1) {
      this.httpClient.get(this.baseUrl + 'tauxActivite').subscribe((res: any[]) => {
        console.log(res);
        this.allTauxActivite = res;
        },
        error => this.handleError(error));
    }
    return this.allTauxActivite;
  }

  getAllApprocheMedia() {
    if (this.allApprocheMedia.length < 1) {
      this.httpClient.get(this.baseUrl + 'approcheMedia').subscribe((res: any[]) => {
          console.log(res);
          this.allApprocheMedia = res;
        },
        error => this.handleError(error));
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

      client: [''],
      entreprise: ['', Validators.required],

      contactNom: ['', Validators.required],
      contactPrenom: [''],

      contactEmail: [''],
      contactTelephone: ['', Validators.minLength(8)]
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

  toBoot(recherche){
    return {
        id: recherche.$key,
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

    fromBoot(recherche) {
      return {
        $key: recherche.id,
        dateContact: recherche.dateContact,
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

