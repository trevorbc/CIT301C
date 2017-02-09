import { Component } from '@angular/core';
import {ContactsService} from "./contacts/contacts.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ContactsService]
})
export class AppComponent {
  title = 'app works!';
}
