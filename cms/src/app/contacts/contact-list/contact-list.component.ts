import {Component, OnInit, Output, EventEmitter } from '@angular/core';

import {Contact} from "../contact";
import {ContactsService} from "../contacts.service";


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  @Output() contactSelected = new EventEmitter<Contact>();
  contact: Contact = null;
  contacts: Contact[] = [];

  // contact = new Contact('', 'President Gilbert', 'gilbertc@byui.edu', '(208) 496-1111', 'http://library.byui.edu/exhibits/presidents/gilbertportw2.jpg', '');

  constructor(private contactsService: ContactsService) {
  }

  ngOnInit() {
    this.contacts = this.contactsService.getContacts();
  }

  onSelected(contact: Contact) {
    this.contactSelected.emit(contact);
  }

}



