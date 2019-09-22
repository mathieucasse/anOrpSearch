import { Event } from './event';

export class EventAudit extends Event {
    rev: string;
    revtype: string;
    revtstmp: string;

}
