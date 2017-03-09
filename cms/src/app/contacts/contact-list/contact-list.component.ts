import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

import {Contact} from "../contact";
import {ContactsService} from "../contacts.service";


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  @Output() contactSelected = new EventEmitter<Contact>();
  @Input() contact: Contact = null;
  contacts: Contact[] = [];

  constructor(private contactsService: ContactsService) {
  }

  ngOnInit() {
    this.contacts = this.contactsService.getContacts();
  }

  onSelected(contact: Contact) {
    this.contactSelected.emit(contact);
  }

}



