import { Pipe, PipeTransform } from '@angular/core';
import {Contact} from "./contact";

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], [term]): any {
    let filteredArray: Contact[] = [];

    for (let i=0; i<contacts.length; i++) {
      let contact = contacts[i];
      if (contact.name.toLowerCase().includes(term)) {
        filteredArray.push(contact);
      }
    }
    if (filteredArray.length < 1) {
      return contacts;
    }
    return filteredArray;
  }

}
