import { User } from  "./User";

export class DerogationOperator {
    constructor(
        public id?: number,
        public derogationId?: number,
        public stationName?: string,
        public hc = 1,
        public derogationUser?: string,
        public insertedDate?: Date,
        public isNew = false
    ) {}
}