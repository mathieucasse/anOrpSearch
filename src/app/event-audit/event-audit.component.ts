import { Component, OnInit } from '@angular/core';
import { EventAudit } from '../model/event-audit';
import { EventService } from '../shared/event.service';
import { Router } from '@angular/router';
import { Event } from '../model/event';

@Component({
  selector: 'app-event-audit',
  templateUrl: './event-audit.component.html',
  styleUrls: ['./event-audit.component.css']
})
export class EventAuditComponent implements OnInit {
  
  eventAudit: EventAudit[] ;
  event: Event;

  constructor(private eventService: EventService,
              private router: Router) { }

  ngOnInit() {
    this.event = this.eventService.auditedEvent;
    console.log('EventAuditComponent event : ' + JSON.stringify(this.event));
    this.eventService.auditedEvent = undefined;
    this.eventService.getAuditEvent(this.event).subscribe((res: EventAudit[]) => {
              console.log('getAuditEvent ....');
              console.log(res);
              this.eventAudit = res; },
          error => console.error(error));

    console.log('this.auditEntreprise');
    console.log(JSON.stringify(this.eventAudit));
  }
  
  onBack() {
    this.router.navigate(['/recherche/events/' + this.event.id ]);
  }
}
