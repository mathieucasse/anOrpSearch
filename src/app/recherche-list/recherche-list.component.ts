import { Component, OnInit, OnDestroy } from '@angular/core';
import { RechercheService } from '../shared/recherche.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';


@Component({
  selector: 'app-recherche-list',
  templateUrl: './recherche-list.component.html',
  styleUrls: ['./recherche-list.component.css']
})
export class RechercheListComponent implements OnInit {

  rechercheArray = [];
  showDeleteMessage: boolean;

  recherches = [];
  recherchesSubscription: Subscription;

  constructor(private rechercheService: RechercheService,
              private router: Router) { }

  ngOnInit() {
    console.log('>>>>RechercheListComponent.ngOnInit');
    
    this.recherchesSubscription = this.rechercheService.recherchesSubject.subscribe(recherches => {
         this.recherches = recherches.map(item => {
            return this.rechercheService.fromBoot(item);
          });
    });
            
    console.log('calling this.rechercheService.getAllRecherches();');
	  this.rechercheService.getAllRecherches();
	  this.rechercheService.emitRecherches();
    // this.rechercheService.getAllRecherches().subscribe(list => {
    //   this.rechercheArray = list.map(item => {
    //     return this.rechercheService.fromBoot(item);
    //   });
    // });
    // console.log('======' + this.rechercheArray);
    // console.log(this.rechercheService.getAllRecherches());
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

  ngOnDestroy(): void {
		this.recherchesSubscription.unsubscribe();
	}
}
