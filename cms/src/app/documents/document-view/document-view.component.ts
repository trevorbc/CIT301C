import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from "rxjs";
import {DocumentsService} from "../documents.service";
import {Router, ActivatedRoute} from "@angular/router";
import {Document} from "../document";
import {WindRefService} from "../../wind-ref.service";

@Component({
  selector: 'app-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.css']
})
export class DocumentViewComponent implements OnInit {
  private subscription: Subscription;
  private documentIdx: number;
  document: Document;
  nativeWindow: any;

  constructor(private documentsService: DocumentsService,
              private route: ActivatedRoute,
              private router: Router,
              private windRef: WindRefService,
   ) {
    this.nativeWindow = windRef. getNativeWindow();
   }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
        (params: any) => {
          this.documentIdx = params['idx'];
          this.document = this.documentsService.getDocument(this.documentIdx);
        }
);
  }
  onView() {
    if (!this.document) {
      return;
    }
    let currentUrl = this.document.url;
    this.nativeWindow.open(currentUrl);
  }
  onDelete() {
    this.documentsService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}

