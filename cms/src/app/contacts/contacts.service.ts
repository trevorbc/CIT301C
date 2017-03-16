import {Injectable, EventEmitter} from '@angular/core';
import {Contact} from "./contact";
import {Http, Response, Headers} from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class ContactsService {
  currentContact: Contact;
  contacts: Contact[] = [];
  getContactsEmitter = new EventEmitter<Contact[]>();

  constructor(private http: Http) {
    this.initContacts();
    this.currentContact = new Contact("18", "President Gilbert", "gilbertc@byui.edu", "(208) 496-1111", "../../images/gilberc.jpg", null);
  }

  getContactById(id: string): Contact {
    return this.contacts.find((contact: Contact) => contact.id === id);
  }
  getContacts() {
    return this.contacts;
  }
  getCurrentContact() {
    return this.currentContact;
  }
  getContact(id: number){
    return this.contacts[id];
  }

  compareNames(contactA: Contact, contactB: Contact) {

    if (contactA.name < contactB.name)
      return -1;
    if (contactA.name > contactB.name)
      return 1;
    return 0;

  }

  addContact(contact: Contact) {
    if (!contact)
      return;
    this.contacts.push(contact);
    this.contacts = this.contacts.sort(this.compareNames);
    this.storeContacts();
  }

  updateContact(oldContact: Contact, newContact: Contact) {
    if (!oldContact || !newContact) {
      return;
    }
    this.contacts[this.contacts.indexOf(oldContact)] = newContact;
    this.contacts = this.contacts.sort(this.compareNames);
    this.storeContacts();
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.contacts = this.contacts.sort(this.compareNames);
    this.storeContacts();
  }
  initContacts() {
    return this.http.get('https://trevorcms-29656.firebaseio.com/contacts.json')
      .map((response: Response) => response.json())
      .subscribe(
        (data: Contact[]) => {
          this.contacts = data;
          this.currentContact = this.getContactById("7");
          this.contacts = this.contacts.sort(this.compareNames);
          this.getContactsEmitter.emit(this.contacts);
        }
      );
  }
  storeContacts(){
    const body = JSON.stringify(this.contacts);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.put('https://trevorcms-29656.firebaseio.com/contacts.json', body, {headers: headers}).toPromise();
  }
}
