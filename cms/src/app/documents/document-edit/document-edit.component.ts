import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {Document} from "../document";
import {DocumentsService} from "../documents.service";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  subscription: Subscription;
  oldDocument: Document;
  editMode: boolean = false;

  constructor(private documentservice: DocumentsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        if (params.hasOwnProperty('idx')) {
          this.oldDocument = this.documentservice.getDocument(params['idx']);
          this.editMode = true;
        } else {
          this.editMode = false;
          this.oldDocument = null;
        }
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
}
  onSubmit(value) {
    let newDocument = new Document( null,
                                    value.name,
                                    value.description,
                                    value.documentUrl, null);
    if (this.editMode) {
      newDocument.id = this.oldDocument.id;
      this.documentservice.updateDocument(this.oldDocument, newDocument);
    }
    else {
      this.documentservice.addDocument(newDocument);
    }
    this.router.navigate(['documents']);
}

  onCancel() {
    this.router.navigate(['documents']);
  }


}
