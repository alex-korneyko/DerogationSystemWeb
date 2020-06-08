import { Department } from  "../domain/Department";

export class DerogationInvolvedRequestModel {
    constructor(
        public department?: Department,
        public chosen = "0") { }
}