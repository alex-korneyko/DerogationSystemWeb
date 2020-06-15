import { Component, Inject, OnDestroy, Input } from "@angular/core";
import { DerogationApiService } from "../../../../controllers/DerogationApiService";
import { HttpClient, HttpEventType } from '@angular/common/http';
import { DOCUMENT } from "@angular/common";

import { fromEvent, Subject } from "rxjs";
import { mergeMap, finalize, takeUntil, first } from 'rxjs/operators';
import { DerogationHeader } from "../../../../model/domain/DerogationHeader";
import { DerogationDoc } from "../../../../model/domain/DerogationDoc";

@Component({
    templateUrl: "DerogationDocsListComponent.html",
    styleUrls: ["../../../../StyleSheet.css"],
    selector: "derogation-docs-list"
})
export class DerogationDocsListComponent implements OnDestroy {

    private destroy$ = new Subject<void>();

    @Input()
    derogationDocs = new Array<DerogationDoc>();

    constructor(
        public derogationApiService: DerogationApiService,
        private http: HttpClient,
        @Inject(DOCUMENT) private document: Document
    ) { }

    uploadClick() {
        let fileInput = this.document.createElement("input");
        fileInput.type = "file";
        fromEvent(fileInput, "change").pipe(
            first(),
            mergeMap((event) => {
                const target = event.target as HTMLInputElement;
                const selectedFile = target.files[0];
                const uploadData = new FormData();
                uploadData.append("uploadFile", selectedFile, selectedFile.name);
                console.log(selectedFile);
                console.log(uploadData);
                return this.http.post(
                    `/api/files/upload/${this.derogationApiService.currentDerogation.derogationId}`,
                    uploadData,
                    {
                        reportProgress: true,
                        observe: "events"
                    });
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
                        this.derogationApiService.currentDerogation = event.body as DerogationHeader;
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
}