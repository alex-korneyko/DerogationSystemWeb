import { DerogationHeader} from  "./DerogationHeader";
import { Department } from "./Department";
import { User } from "./User";

export class DerogationDepartment {
//    derogationId?: number;
//    derogationHeader?: DerogationHeader;
//    department?: string;
//    factoryDepartment?: Department;
//    mailStep?: number;
//    training?: string;
//    approved?: string;
//    comment?: string;
//    rejected?: string;
//    cancellationRequest?: string;
//    cancellationReason?: string;
//    derogationUser?: string;
//    user?: User;
//    operationDate?: Date;
//    checked?: string;

    constructor(
        public derogationId?: number,
        public derogationHeader?: DerogationHeader,
        public department?: string,
        public factoryDepartment?: Department,
        public mailStep?: number,
        public training?: string,
        public approved?: string,
        public comment?: string,
        public rejected?: string,
        public cancellationRequest?: string,
        public cancellationReason?: string,
        public derogationUser?: string,
        public user?: User,
        public operationDate?: Date,
        public checked?: string
    ) { }
}