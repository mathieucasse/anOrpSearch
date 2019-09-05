import { Component, OnInit, OnDestroy } from '@angular/core';
import { RechercheService } from '../shared/recherche.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';


@Component({
  selector: 'app-recherche-list',
  templateUrl: './recherche-list.component.html',
  styleUrls: ['./recherche-list.component.css']
})
export class RechercheListComponent implements OnInit, OnDestroy {

  // rechercheArray = [];
  showDeleteMessage: boolean;

  recherches: any;
  recherchesSubscription: Subscription;

  constructor(private rechercheService: RechercheService,
              private router: Router) { }

  ngOnInit() {
    console.log('>>>>RechercheListComponent.ngOnInit');

    this.recherchesSubscription = this.rechercheService.recherchesSubject.subscribe(recherches => {
         this.recherches = recherches;
    });
    this.rechercheService.getAllRecherches();
    // this.rechercheService.emitRecherches()

    this.rechercheService.initStaticLists();
  }

  onDelete($key) {
    if (confirm('Are you sure ???')) {
      this.rechercheService.deleteRecherche($key);
      this.showDeleteMessage = true;
      setTimeout( () => this.showDeleteMessage = false, 5000);
    }
  }

  onEdit(recherche) {
    this.rechercheService.populateForm(recherche);
    this.router.navigate(['/recherches', 'edit', recherche.$key]);
  }

  onAudit(recherche) {
    this.router.navigate(['/recherches', 'audit', recherche.$key]);
  }

  ngOnDestroy(): void {
    // this.recherchesSubscription.unsubscribe();
  }
  
}
