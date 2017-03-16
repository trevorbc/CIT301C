import { Component, OnInit } from '@angular/core';
import {Document} from "../document";
import {DocumentsService} from "../documents.service";

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = [];

  constructor(private documentService: DocumentsService) { }

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
    this.documentService.getDocumentsEventEmitter.subscribe(
      (documents: Document[]) => this.documents = documents
    );
  }

}
