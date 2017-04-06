import {Injectable, EventEmitter} from '@angular/core';
import { Document} from "./document";
import {Http, Response, Headers} from "@angular/http";
import 'rxjs/RX';
import {Observable} from "rxjs";

@Injectable()
export class DocumentsService {
  currentDocumentId: string;
  private documents: Document[]= [];
  getDocumentsEventEmitter = new EventEmitter<Document[]>();

  constructor(private http: Http) {
    this.currentDocumentId = '1';
  }

  getDocuments() {
    return this.http.get('http://localhost:3000/documents')
      .map((response: Response) => {
        const documents = response.json().obj;
        let transformedDocuments: Document[] = [];
        for (let document of documents) {
          transformedDocuments.push(new Document(document.id, document.name, document.description, document.url, document.children));
        }
        this.documents = transformedDocuments;
        return transformedDocuments;
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }
  getDocument(idx:number) {
    return this.documents[idx];
  }
  addDocument(document: Document) {
    const body = JSON.stringify(document);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/documents', body, {headers: headers})
      .map((response: Response) => {
        const result = response.json();
        const document = new Document(result.id, result.name, result.description, result.url, result.children);
        this.documents.push(document);
        return document;
      })
      .catch((error: Response) => Observable.throw(error.json()));

  }
  updateDocument(oldDoc: Document, newDoc: Document) {
    const body = JSON.stringify(newDoc);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.patch('http://localhost:3000/documents/' + newDoc.id, body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }
  deleteDocument(document: Document) {
    this.documents.splice(this.documents.indexOf(document), 1);
    return this.http.delete('http://localhost:3000/documents/' + document.id)
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

}
