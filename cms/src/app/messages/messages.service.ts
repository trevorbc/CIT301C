import {Injectable, EventEmitter} from '@angular/core';
import { Message } from "./message";
import {Response, Http, Headers} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs";


@Injectable()
export class MessagesService {
  currentMessageId: string;
  private messages: Message[] = [];
  getMessagesEventEmitter = new EventEmitter<Message[]>();

  constructor(private http: Http) {
    this.currentMessageId = '1';
  }

  getMessages() {
    return this.http.get('http://localhost:3000/messages')
      .map((response: Response) => {
        const messages = response.json().obj;
        let transformedMessages: Message[] = [];
        for (let message of messages) {
          transformedMessages.push(new Message(message.idx, message.sender, message.subject, message.text));
        }
        this.messages = transformedMessages;
        return transformedMessages;
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

  getMessage(idx: number) {
    return this.messages[idx];
  }

  addMessage(message: Message) {
    const body = JSON.stringify(message);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/messages', body, {headers: headers})
      .map((response: Response) => {
        const result = response.json();
        const message = new Message(result.idx, result.sender, result.subject, result.text);
        this.messages.push(message);
        return message;
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }


}
