import { Material } from "../domain/Material";

export class MaterialRequestModel {
    constructor(
        public material = new Material(),
        public quantity?: number
    ) {}
}