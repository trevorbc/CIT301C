import {Component, OnInit, Input} from '@angular/core';
import {Contact} from "../contact";

@Component({
  selector: 'app-contacts-detail',
  templateUrl: './contacts-detail.component.html'
})
export class ContactsDetailComponent implements OnInit {
  @Input() selectedContact: Contact;

  constructor() { }

  ngOnInit() {
  }

}
