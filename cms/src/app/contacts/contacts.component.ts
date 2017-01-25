import { Component, OnInit } from '@angular/core';
import {Contact} from "./contact";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html'
})
export class ContactsComponent implements OnInit {
  selectedContact: Contact;

  constructor() { }

  ngOnInit() {
  }

}
