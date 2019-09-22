import { Component, OnInit } from '@angular/core';
import { RechercheService } from '../shared/recherche.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RechercheAudit } from '../model/recherche-audit.model';

@Component({
  selector: 'app-recherche-hist',
  templateUrl: './recherche-hist.component.html',
  styleUrls: ['./recherche-hist.component.css']
})
export class RechercheHistComponent {

  auditRecherche: RechercheAudit[] ;
  auditPersonneS: any[] ;
  auditEntrepriseS: any[] ;
  auditPersonneF: any[] ;
  auditEntrepriseF: any[] ;
  rechercheForm = this.rechercheService.form;
  id: string;


  constructor(private rechercheService: RechercheService,
              private activatedRoute: ActivatedRoute) {


        //TODO pass as an object in order to get
        // the good personne_id & entreprise_id
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
      this.rechercheService.getAuditRecherche(this.id).subscribe((res: RechercheAudit[]) => {
          console.log('getAuditRecherche ....');
          console.log(res);
          this.auditRecherche = res;

          this.rechercheService.getAuditPersonne(this.auditRecherche[0].personneS_id).subscribe((res: any[]) => {
                console.log('getAuditPersonne S....');
                console.log(res);
                this.auditPersonneS = res;
                },
                error => console.error(error));

          this.rechercheService.getAuditEntreprise(this.auditRecherche[0].entrepriseS_id).subscribe((res: any[]) => {
                console.log('getAuditEntreprise S....');
                console.log(res);
                this.auditEntrepriseS = res;
                },
                error => console.error(error));

          this.rechercheService.getAuditPersonne(this.auditRecherche[0].personneF_id).subscribe((res: any[]) => {
                console.log('getAuditPersonne F....');
                console.log(res);
                this.auditPersonneF = res;
                },
                error => console.error(error));

          this.rechercheService.getAuditEntreprise(this.auditRecherche[0].entrepriseF_id).subscribe((res: any[]) => {
                console.log('getAuditEntreprise F....');
                console.log(res);
                this.auditEntrepriseF = res;
                },
                error => console.error(error));

      },

      error => console.error(error));
      console.log('this.auditEntreprise');
      console.log(this.auditEntrepriseS);

 }

}
