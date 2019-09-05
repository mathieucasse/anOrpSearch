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

  constructor(private rechercheService: RechercheService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {


        //TODO pass as an object in order to get
        // the good personne_id & entreprise_id
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
      this.rechercheService.getAuditRecherche(this.id).subscribe((res: RechercheAudit[]) => {
          console.log('getAuditRecherche ....');
          console.log(res);
          this.auditRecherche = res;

          this.rechercheService.getAuditPersonne(this.auditRecherche[0].personne_id).subscribe((res: any[]) => {
                console.log('getAuditPersonne ....');
                console.log(res);
                this.auditPersonne = res;
                },
                error => console.error(error));

          this.rechercheService.getAuditEntreprise(this.auditRecherche[0].entreprise_id).subscribe((res: any[]) => {
                console.log('getAuditEntreprise ....');
                console.log(res);
                this.auditEntreprise = res;
                },
                error => console.error(error));

          },
          error => console.error(error));
      
      

      

      console.log('this.auditEntreprise');
      console.log(this.auditEntreprise);

      }

  auditRecherche: RechercheAudit[] ;
  auditPersonne: any[] ;
  auditEntreprise: any[] ;

  rechercheForm = this.rechercheService.form;
  id: string;



}
