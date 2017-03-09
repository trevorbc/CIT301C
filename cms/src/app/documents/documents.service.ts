import { Injectable } from '@angular/core';
import { Document} from "./document";
import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS"

@Injectable()
export class DocumentsService {
  documents: Document[]= [];

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments() {
    return this.documents;
  }
  getDocument(idx:number) {
    return this.documents[idx];
  }
  addDocument(document: Document) {
    return this.documents.push(document);
  }
  updateDocument(oldDoc: Document, newDoc: Document) {
    this.documents[this.documents.indexOf(oldDoc)] = newDoc;
  }
  deleteDocument(document: Document) {
    this.documents.splice(this.documents.indexOf(document), 1)
  }
}
