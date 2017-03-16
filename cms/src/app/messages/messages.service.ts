import {Injectable, EventEmitter} from '@angular/core';
import { Message } from "./message";
import {Response, Http, Headers} from "@angular/http";
import 'rxjs/Rx';


@Injectable()
export class MessagesService {
  currentMessageId: string;
  private messages: Message[] = [];
  getMessagesEventEmitter = new EventEmitter<Message[]>();

  constructor(private http: Http) {
    this.initMessages();
    this.currentMessageId = '1';
  }

  getMessages() {
    return this.messages;
  }

  getMessage(idx: number) {
    return this.messages[idx];
  }

  addMessage(message: Message) {
    if (message == null)
      return;
    this.messages.push(message);
    this.storeMessages();
  }

  initMessages() {
    return this.http.get('https://trevorcms-29656.firebaseio.com/messages.json')
      .map((response: Response) => response.json())
      .subscribe(
        (data: Message[]) => {
          this.messages = data;
          this.getMessagesEventEmitter.emit(this.messages);
        }
      );
  }
 storeMessages() {
  const body = JSON.stringify(this.messages);
  const headers = new Headers({
    'Content-Type': 'application/json'
  });
  return this.http.put('https://trevorcms-29656.firebaseio.com/messages.json', body, {headers: headers}).toPromise();
}
}
