import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {Contact} from "../contact";
import {ContactsService} from "../contacts.service";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private editMode: boolean = false;
  private hasGroup: boolean = false;
  private contactIdx: number;
  private contact: Contact;
  private groupContacts: Contact[]= [];
  private invalidGroupContact: boolean = true;

  constructor(private contactsService: ContactsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  this.editMode = false;
  this.hasGroup = false;
  this.invalidGroupContact = false;

    this.subscription = this.route.params.subscribe(
      (params: any) => {
        if (params.hasOwnProperty('idx')) {
          this.contact = this.contactsService.getContact(params['idx']);
          this.editMode = true;
        }
        if ((this.contact.group != null) && (this.contact.group.length > 0)){
          this.hasGroup = true;
          this.groupContacts = this.contact.group;
        }
      }
    );
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) { // newContact has no value?
      return true;
    }
    if (newContact.id === this.contact.id) {
      return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }
    return false;
  }

  addToGroup($event: any) {
    let selectedContact: Contact = $event.dragData;
    this.invalidGroupContact = this.isInvalidContact(selectedContact);
    if (this.invalidGroupContact) {
      return;
    }
    this.groupContacts.push(selectedContact);
    this.invalidGroupContact = false;
  }

  onRemoveItem(idx: number) {
    // If contact is outside the bounds of the array
    if (idx < 0 || idx >= this.groupContacts.length)
      return;

    this.groupContacts.splice(idx, 1);
    this.invalidGroupContact = false;
  }
  onCancel() {
    this.router.navigate(['contacts']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(value) {
      let newContact = new Contact( null,
                                    value.contactName,
                                    value.email,
                                    value.phone,
                                    value.imageUrl,
                                    this.groupContacts);
      if (this.editMode) {
        newContact.id = this.contact.id;
        this.contactsService.updateContact(this.contact, newContact);
      }
      else {
        this.contactsService.addContact(newContact);
      }
      this.router.navigate(['contacts']);
  }
  // getContactById(id: string): Contact {
  //   return this.contact.find((contact: Contact) => contact.id === id);
  // }

  // addContact(contact: Contact) {
  //   if (!contact)
  //     return;
  //   this.contacts.push(contact);
  //   this.contacts = this.contacts.sort(this.compareNames);
  //   this.storeContacts();
  // }
  //
  // updateContact(oldContact: Contact, newContact: Contact) {
  //   if (!oldContact || !newContact) {
  //     return;
  //   }
  //   this.contacts[this.contacts.indexOf(oldContact)] = newContact;
  //   this.contacts = this.contacts.sort(this.compareNames);
  //   this.storeContacts();
  // }
  // onCancel() {
  //   this.router.navigate(['contacts']);
  // }
  //
  // deleteContact(contact: Contact) {
  //   if (!contact) {
  //     return;
  //   }
  //
  //   const pos = this.contacts.indexOf(contact);
  //   if (pos < 0) {
  //     return;
  //   }
  //
  //   this.contacts.splice(pos, 1);
  //   this.contacts = this.contacts.sort(this.compareNames);
  //   this.storeContacts();
  // }
}
