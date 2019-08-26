import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'anOrpSearch';

  constructor() {
    // Initialize Firebase
    firebase.initializeApp(environment.firebaseConfig);
  }
}
