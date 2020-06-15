export class DerogationDoc {
    constructor(
        public id?: number,
        public derogationId?: number,
        public derogationUser?: string,
        public department?: string,
        public  docName?: string,
        public insertedDate?: Date
    ) { }
}