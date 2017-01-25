import {Component, OnInit, Input} from '@angular/core';
import {Contact} from "../contact";

@Component({
  selector: 'app-contacts-group',
  templateUrl: './contacts-group.component.html',
  styleUrls: ['./contacts-group.component.css']
})
export class ContactsGroupComponent implements OnInit {
  @Input() selectedContact: Contact;

  constructor() { }

  ngOnInit() {
  }

}
