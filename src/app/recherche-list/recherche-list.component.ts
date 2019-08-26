import { Component, OnInit } from '@angular/core';
import { RechercheService } from '../shared/recherche.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recherche-list',
  templateUrl: './recherche-list.component.html',
  styleUrls: ['./recherche-list.component.css']
})
export class RechercheListComponent implements OnInit {

  rechercheArray = [];
  showDeleteMessage: boolean;

  constructor(private rechercheService: RechercheService,
                private router: Router) { }

  ngOnInit() {
    this.rechercheService.getAllRecherches().subscribe(list => {
      this.rechercheArray = list.map(item => {
        return {
          $key: item.key, ...item.payload.val()
        };
      });
    });
  }

  onDelete($key) {
    if (confirm('Are you sure ???')) {
      this.rechercheService.deleteRecherche($key);
      this.showDeleteMessage = true;
      setTimeout( () => this.showDeleteMessage = false, 5000);
    }
  }

  onEdit(recherche){
    this.rechercheService.populateForm(recherche);
    this.router.navigate(['/recherches', 'edit', recherche.$key]);
  }
}
