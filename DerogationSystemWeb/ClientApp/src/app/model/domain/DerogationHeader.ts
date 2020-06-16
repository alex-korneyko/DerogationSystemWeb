import { Department } from "./Department";
import { User } from "./User";
import { DerogationDepartment } from "./DerogationDepartment";
import { DerogationItem } from "./DerogationItem";
import { DerogationOperator } from "./DerogationOperator";
import { DerogationDoc } from "./DerogationDoc";

export class DerogationHeader {
    constructor(
        public derogationId = 0,
        public createdDate?: Date,
        public department?: string,
        public factoryDepartment?: Department,
        public owner?: string,
        public author?: User,
        public ltime?: number,
        public slt?: number,
        public dcostP?: number,
        public dcostF?: number,
        public cancelled = "0",
        public approved = "0",
        public offline = "0",
        public cancellationReason?: string,
        public derogationDepartments = new Array<DerogationDepartment>(),
        public derogationItems = new Array<DerogationItem>(),
        public operators = new Array<DerogationOperator>(),
        public derogationDocs = new Array<DerogationDoc>()
    ) { }
}