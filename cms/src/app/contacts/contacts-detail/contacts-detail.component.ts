import {Component, OnInit, Input} from '@angular/core';
import {Contact} from "../contact";
import {Subscription} from "rxjs";
import {ContactsService} from "../contacts.service";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-contacts-detail',
  templateUrl: './contacts-detail.component.html'
})
export class ContactsDetailComponent implements OnInit {
  @Input() selectedContact: Contact;
  private subscription: Subscription;
  private contactIdx: number;
  contact: Contact;
  contactGroup: Contact[];

  constructor(private contactsService: ContactsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.contactIdx = params['idx'];
        this.contact = this.contactsService.getContact(this.contactIdx);
        this.contactGroup = this.contact.group;
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
