import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {UtilService} from "./util.service";

@Injectable({
  providedIn: 'root'
})
export class StaticlistsService {

  baseUrl = environment.appUrl + '/SuiviRecherches/rest/';

  allStatutsRecherche: any[] = [];
  allAssignationORP: any[] = [ ];
  allTauxActivite: any[] = [];
  allApprocheMedia: any[] = [];
  allRoles: any[] = [];

  constructor(private httpClient: HttpClient) { }

  initStaticLists() {
    this.getAllApprocheMedia();
    this.getAllAssignationOrp();
    this.getAllStatutsRecherche();
    this.getAllTauxActivite();
    this.getAllRoles();
  }

  getAllStatutsRecherche() {
    if (this.allStatutsRecherche.length < 1) {
      this.httpClient.get(this.baseUrl + 'rechercheStatut').subscribe((res: any[]) => {
          console.log(res);
          this.allStatutsRecherche = res;
        },
        error => UtilService.handleError(error));
    }
    return this.allStatutsRecherche;
  }

  getAllAssignationOrp() {
    if (this.allAssignationORP.length < 1) {
      this.httpClient.get(this.baseUrl + 'assignationOrp').subscribe((res: any[]) => {
          console.log(res);
          this.allAssignationORP = res;
        },
        error => UtilService.handleError(error));
    }
    return this.allAssignationORP;
  }

  getAllTauxActivite() {
    if (this.allTauxActivite.length < 1) {
      this.httpClient.get(this.baseUrl + 'tauxActivite').subscribe((res: any[]) => {
          console.log(res);
          this.allTauxActivite = res;
        },
        error => UtilService.handleError(error));
    }
    return this.allTauxActivite;
  }

  getAllApprocheMedia() {
    if (this.allApprocheMedia.length < 1) {
      this.httpClient.get(this.baseUrl + 'approcheMedia').subscribe((res: any[]) => {
          console.log(res);
          this.allApprocheMedia = res;
        },
        error => UtilService.handleError(error));
    }
    return this.allApprocheMedia;
  }

  getAllRoles() {
    if (this.allRoles.length < 1) {
      this.httpClient.get(this.baseUrl + 'roles').subscribe((res: any[]) => {
          console.log(res);
          this.allRoles = res;
        },
        error => UtilService.handleError(error));
    }
    return this.allRoles;
  }

}
