import { Department } from "./Department";
import { User } from "./User";
import { DerogationDepartment } from "./DerogationDepartment";
import { DerogationItem } from "./DerogationItem";
import { DerogationOperator } from "./DerogationOperator";

export class DerogationHeader {
    constructor(
        public derogationId?: number,
        public createdDate?: Date,
        public department?: string,
        public factoryDepartment?: Department,
        public owner?: string,
        public author?: User,
        public ltime?: number,
        public slt?: number,
        public dcostP?: number,
        public dcostF?: number,
        public cancelled?: string,
        public approved?: string,
        public offline?: string,
        public cancellationReason?: string,
        public derogationDepartments = new Array<DerogationDepartment>(),
        public derogationItems = new Array<DerogationItem>(),
        public operators = new Array<DerogationOperator>()
    ) { }
}