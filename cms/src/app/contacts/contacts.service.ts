import {Injectable, EventEmitter} from '@angular/core';
import {Contact} from "./contact";
import {Http, Response, Headers} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs";

@Injectable()
export class ContactsService {
  currentContact: Contact;
  contacts: Contact[] = [];
  getContactsEmitter = new EventEmitter<Contact[]>();

  constructor(private http: Http) {
    this.currentContact = new Contact("18", "President Gilbert", "gilbertc@byui.edu", "(208) 496-1111", "../../images/gilberc.jpg", null);
  }

  getContactById(id: string): Contact {
    return this.contacts.find((contact: Contact) => contact.id === id);
  }
  getContacts() {
    return this.http.get('http://localhost:3000/contacts')
      .map((response: Response) => {
        const contacts = response.json().obj;
        let transformedContacts: Contact[] = [];
        for (let contact of contacts) {
          transformedContacts.push(new Contact(contact.id, contact.name, contact.email,contact.phone, contact.imageUrl, contact.group));
        }
        this.contacts = transformedContacts;
        return transformedContacts;
      })
      .catch((error: Response) => Observable.throw(error.json()));
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
    const body = JSON.stringify(contact);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/contacts', body, {headers: headers})
      .map((response: Response) => {
        const result = response.json();
        const contact = new Contact(result.id, result.name, result.email, result.phone, result.imageUrl, result.group);
        return contact;
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

  updateContact(oldContact: Contact, newContact: Contact) {
    const body = JSON.stringify(newContact);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.patch('http://localhost:3000/contacts/' + newContact.id, body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  deleteContact(contact: Contact) {
    this.contacts.splice(this.contacts.indexOf(contact), 1);
    return this.http.delete('http://localhost:3000/contacts/' + contact.id)
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

}
