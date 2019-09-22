import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Subject, throwError } from 'rxjs';
import { Event } from '../model/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private formBuider: FormBuilder,
              private datepipe: DatePipe,
              private httpClient: HttpClient) { }

  events: Event[] = [];
  eventsSubject = new Subject<Event[]>();

  baseUrl = environment.appUrl + '/SuiviRecherches/rest/';

  form = this.formBuider.group(this.initForm());
  auditedEvent: Event;

  getEventsByRechercheId(id) {
    console.log('--- getEventsByRechercheId ' + this.baseUrl);
    if (this.events.length !== 0) {
      console.log(this.events);
      return this.events;
    }
    return this.httpClient.get<Event[]>(this.baseUrl + 'event/byRechercheId/' + id).subscribe((res) => {
          console.log('getEventsByRechercheId....' + this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS'));
          console.log(res);
          this.events = res;
          this.emitEvents();
        },
        error => console.error(error));
  }

  emitEvents() {
    console.log('Emit Events ' +  this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS'));
    this.events.sort((a, b) => {
            if (a.id < b.id) {
              return -1;
            }
            if (a.id > b.id) {
              return 1;
            }
            return 0; });
    console.log(this.events);
    this.eventsSubject.next(this.events);
  }

  initForm() {
    return {
      id: [null],
      eventDate: [this.datepipe.transform(new Date(), 'yyyy-MM-dd'), Validators.required],
      titre: [''],
      texte: [''],
      rechercheId: ['']
    };
  }

  resetForm() {
    console.log('eventService.resetForm()');
    this.form.reset();
    this.form.patchValue(new Event());
    // this.form.patchValue(new Event()) = this.formBuider.group(this.initForm());
  }

  populateForm(event: Event) {
    console.log('eventService.populateForm()' + JSON.stringify(event));
    this.form.setValue(event);
    console.log('eventService.populateForm()' + JSON.stringify(this.form.value));
  }

  idIsNull() {
    return this.form.get('id').value === null;
  }

  insertEvent(event: Event) {
    this.httpClient.post<Event>(this.baseUrl + 'event', event, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe(
      (res: Event) => {
        console.log('insert event' + res);
        this.events.push(res);
        this.emitEvents();
      },
      error => this.handleError(error));
  }

  updateEvent(event: Event) {
    this.httpClient.put<Event>(this.baseUrl + 'event', event, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe(
      (res: Event) => {
        console.log('update event' + res);
        this.events.splice(this.getEventIndexToRemove(res.id), 1);
        this.events.push(res);
        this.emitEvents();
      },
      error => this.handleError(error));
  }

  deleteEvent(event: Event) {
    this.httpClient.delete<Event>(this.baseUrl + 'event/' + event.id).subscribe(
      () => {
        console.log('Event with id' + event.id + 'deleted !!');
        this.events.splice(this.events.indexOf(event), 1);
        this.emitEvents();
      },
      (error) => this.handleError(error));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side error : ' + errorResponse.error.message);
    } else {
      console.error('Server Side error : ' + errorResponse);
    }
    return throwError('There is a problem with the sevice ');
  }

  getEventIndexToRemove(id) {
    return this.events.findIndex(
            (eventEl) => {
              if (eventEl.id === id) {
                    return true;
              }});

  }

  getAuditEvent(event: Event) {
    this.auditedEvent = event;
    console.log('eventService getAuditEvent : ' + this.auditedEvent);
    return this.httpClient.get(this.baseUrl + 'audit/evenement/' + this.auditedEvent.id);
  }
}
