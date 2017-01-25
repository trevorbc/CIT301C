import {Component, OnInit, Output, EventEmitter } from '@angular/core';

import {Contact} from "../contact";


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html'
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  @Output() contactSelected = new EventEmitter<Contact>();
  contact = new Contact('','President Gilbert', 'gilbertc@byui.edu', '(208) 496-1111', 'http://library.byui.edu/exhibits/presidents/gilbertportw2.jpg','');
  constructor() { }

  ngOnInit() {
  }

  onSelected(contact: Contact) {
    this.contactSelected.emit(contact);
  }

}
