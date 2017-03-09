import { Injectable } from '@angular/core';
import { Message } from "./message";
import { MOCKMESSAGES } from "./MOCKMESSAGES";

@Injectable()
export class MessagesService {
  messages: Message[] = [];

  constructor() {
    this.messages = MOCKMESSAGES;
  }

  getMessages() {
    return this.messages;
  }

  getMessage(idx: number) {
    return this.messages[idx];
  }

  addMessage(message: Message) {
    this.messages.push(message);
  }

}
