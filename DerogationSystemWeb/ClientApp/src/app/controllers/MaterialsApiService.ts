﻿import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Material } from "../model/domain/Material";
import { MaterialRequestModel } from "../model/requestModel/MaterialRequestModel";

@Injectable()
export class MaterialsApiService {

    materials: Material[];
    materialsIsLoaded = false;
    selectedMaterial: MaterialRequestModel;
    selectedAltMaterial: MaterialRequestModel;

    private apiUrl = "/api/materials";

    constructor(private http: HttpClient) {
        this.selectedMaterial = new MaterialRequestModel();
        this.selectedAltMaterial = new MaterialRequestModel();
    }

    async getMaterials() {
        this.materialsIsLoaded = false;
        await this.http.get(this.apiUrl).subscribe((data: Material[]) => {
            this.materials = data;
            this.materialsIsLoaded = true;
        });
    }
}