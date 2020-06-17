import {Component, Inject, Input, OnDestroy} from "@angular/core";
import {DerogationApiService} from "../../../../controllers/DerogationApiService";
import {HttpClient, HttpEventType} from '@angular/common/http';
import {Router} from "@angular/router";
import {DOCUMENT} from "@angular/common";

import {fromEvent, Subject} from "rxjs";
import {finalize, first, mergeMap, takeUntil} from 'rxjs/operators';
import {DerogationHeader} from "../../../../model/domain/DerogationHeader";
import {FileApiService} from "../../../../controllers/FileApiService";
import {DerogationDoc} from "../../../../model/domain/DerogationDoc";

@Component({
    templateUrl: "DerogationDocsListComponent.html",
    styleUrls: ["../../../../StyleSheet.css"],
    selector: "derogation-docs-list"
})
export class DerogationDocsListComponent implements OnDestroy {

    private destroy$ = new Subject<void>();

    @Input()
    derogation: DerogationHeader;

    constructor(
        public derogationApiService: DerogationApiService,
        private fileApiService: FileApiService,
        private http: HttpClient,
        private router: Router,
        @Inject(DOCUMENT) private document: Document
    ) {
        if (this.router.url === "/derogations/new") {
            this.derogation = this.derogationApiService.newDerogation;
        }
    }

    uploadClick() {
        let fileInput = this.document.createElement("input");
        fileInput.type = "file";
        fromEvent(fileInput, "change").pipe(
            first(),
            mergeMap((event) => {
                const target = event.target as HTMLInputElement;
                const selectedFile = target.files[0];
                console.log("File type: " + selectedFile.type)
                const uploadData = new FormData();
                uploadData.append("uploadFile", selectedFile, selectedFile.name);
                return this.fileApiService.uploadFile(uploadData, this.derogation.derogationId);
            }),
            finalize(() => {
                fileInput = null;
            }),
            takeUntil(this.destroy$)
        ).subscribe(event => {
                switch (event.type) {
                case HttpEventType.Sent:
                    console.log('Request sent!');
                    break;
                case HttpEventType.ResponseHeader:
                    console.log('Response header received!');
                    break;
                case HttpEventType.UploadProgress:
                    const kbLoaded = Math.round(event.loaded);
                    const percent = Math.round((event.loaded * 100) / event.total);
                    console.log(
                        `Upload in progress! ${kbLoaded}b loaded (${percent}%)`
                    );
                    break;
                case HttpEventType.Response:
                    console.log('Done!', event.body);
                    this.addOrReplaceDergDocs(...(event.body as DerogationHeader).derogationDocs);
                    console.log(this.derogation);
                }
            },
            () => console.log('Upload error'),
            () => {
                console.log('Upload complete');
            }
        );
        fileInput.click();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
    
    private addOrReplaceDergDocs(...derogationDocs: DerogationDoc[]): void {
        derogationDocs.forEach(dergDoc => {
            let index = this.derogation.derogationDocs.findIndex(curDergDoc => curDergDoc.id === dergDoc.id);
            if (index === -1) {
                this.derogation.derogationDocs.push(dergDoc);
            } else {
                this.derogation.derogationDocs.splice(index, 1, dergDoc);
            }
        })
    }
}