import { Injectable } from '@angular/core';
import { Document} from "./document";
import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS"

@Injectable()
export class DocumentsService {
  documents: Document[]= [];

  constructor() { }

  getDocuments() {
    this.documents = MOCKDOCUMENTS;
  }
  getDocument(idx:number) {
    return this.documents[idx];
  }
}
