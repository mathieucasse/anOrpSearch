import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { EventService } from '../shared/event.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Event } from '../model/event';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recherche-event',
  templateUrl: './recherche-event.component.html',
  styleUrls: ['./recherche-event.component.css']
})
export class RechercheEventComponent implements OnInit, OnDestroy {

  events: Event[];
  eventsSubscription: Subscription;
  submitted: boolean;
  showSuccessMessage: boolean;
  showDeleteMessage: boolean;
  eventForm: FormGroup;
  rechercheId: number;

  private event: Event = new Event();

  constructor(private eventService: EventService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('>>>>RechercheEventComponent.ngOnInit');

    this.eventsSubscription = this.eventService.eventsSubject.subscribe(events => {
         this.events = events;
    });
    this.rechercheId = this.route.snapshot.params.id;
    this.eventService.getEventsByRechercheId(this.rechercheId);
    this.eventService.emitEvents();
    this.eventForm = this.eventService.form;
  }

  ngOnDestroy(): void {
    this.eventsSubscription.unsubscribe();
  }

  onDelete(event: Event) {
    if (confirm('Are you sure ???')) {
      this.eventService.deleteEvent(event);
      this.eventService.resetForm();
      this.showDeleteMessage = true;
      setTimeout( () => this.showDeleteMessage = false, 5000);
    }
  } 


  onEdit(event: Event) {
    console.log('onEdit event : ' + JSON.stringify(event));
    event.rechercheId = this.rechercheId;
    this.eventService.populateForm(event);
  }

  onReset(){
    this.eventService.resetForm();
  }
  onAudit(event: Event) {
    console.log('onAudit event : ' + JSON.stringify(event));
    event.rechercheId = this.rechercheId;
    this.eventService.auditedEvent = event;
    this.router.navigate(['/event', 'audit']);
  }

  onBack() {
    this.eventService.resetForm();
    this.router.navigate(['/recherches']);
  }

  onSubmit() {
    this.submitted = true;
    // this.logSubmit();
    if (this.eventService.form.valid) {
      this.event = this.eventService.form.value as Event;
      this.event.rechercheId = this.rechercheId;

      if (this.eventService.form.get('id').value == null) {
        this.eventService.insertEvent(this.eventService.form.value);
      } else {
        this.eventService.updateEvent(this.eventService.form.value);
      }
      this.showSuccessMessage = true;
      setTimeout(() => this.showSuccessMessage = false, 7000);
    }
    this.submitted = false;
    this.eventService.resetForm();
    // this.router.navigate(['/recherches']);
  }
}
