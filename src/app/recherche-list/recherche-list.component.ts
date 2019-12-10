import { Component, OnInit, OnDestroy } from '@angular/core';
import { RechercheService } from '../shared/recherche.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import {StaticlistsService} from "../shared/staticlists.service";


@Component({
  selector: 'app-recherche-list',
  templateUrl: './recherche-list.component.html',
  styleUrls: ['./recherche-list.component.css']
})
export class RechercheListComponent implements OnInit, OnDestroy {

  // rechercheArray = [];
  showDeleteMessage: boolean;

  recherches: any[];
  recherchesSubscription: Subscription;

  constructor(private rechercheService: RechercheService,
              private staticlistsService : StaticlistsService,
              private router: Router) { }

  ngOnInit() {
    console.log('>>>>RechercheListComponent.ngOnInit');

    this.recherchesSubscription = this.rechercheService.recherchesSubject.subscribe(recherches => {
         this.recherches = recherches;
    });
    this.rechercheService.getAllRecherches();
    this.rechercheService.emitRecherches()

    this.staticlistsService.initStaticLists();
  }

  onDelete(id) {
    if (confirm('Are you sure ???')) {
      this.rechercheService.deleteRecherche(id);
      this.showDeleteMessage = true;
      setTimeout( () => this.showDeleteMessage = false, 5000);
    }
  }

  onEvent(recherche) {
    // this.event.populateForm(recherche);
    this.router.navigate(['/recherche', 'events', recherche.id]);
  }

  onEdit(recherche) {
    this.rechercheService.populateForm(recherche);
    this.router.navigate(['/recherches', 'edit', recherche.id]);
  }

  onAudit(recherche) {
    this.router.navigate(['/recherches', 'audit', recherche.id]);
  }

  ngOnDestroy(): void {
    this.recherchesSubscription.unsubscribe();
  }

}
