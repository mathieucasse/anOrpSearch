import { Injectable, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RechercheService {

  constructor(private firebase: AngularFireDatabase,
              private formBuider: FormBuilder,
              private datepipe: DatePipe) { }

  rechercheList: AngularFireList<any>;

  listeStatutsRecherche: string[] = [
        'EN COURS', 'ENTRETIEN', 'KO', 'CANDIDATURE' ];
  assignationORP = [ 'Non', 'Oui'];
  tauxActivite = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  approcheMedia = ['Ecrit', 'Visite', 'Telephone'];

  form = this.formBuider.group(this.initForm());

  getAllRecherches() {
    this.rechercheList = this.firebase.list('/recherches');
    return this.rechercheList.snapshotChanges();
  }

  insertRecherche(recherche) {
    this.rechercheList = this.firebase.list('/recherches');
    this.rechercheList.push(this.toFirebase(recherche));
  }

  updateRecherche(recherche) {
    this.rechercheList.update(recherche.$key, this.toFirebase(recherche));
  }

  deleteRecherche($key) {
    this.rechercheList.remove($key);
  }

  populateForm(recherche) {
    this.form.setValue(recherche);
  }

  resetForm() {
    this.form.reset();
    this.form = this.formBuider.group(this.initForm());
  }

  keyIdIsNull(){
    return this.form.get('$key').value === null;
  }

  initForm() {
    return {
      $key: [null],
      dateContact: [this.datepipe.transform(new Date(), 'yyyy-MM-dd'), Validators.required],
      poste: ['', Validators.required],
      statut: ['EN COURS', Validators.required],

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

  toFirebase(recherche){
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
