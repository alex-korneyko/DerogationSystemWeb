import { DerogationHeader} from  "./DerogationHeader";
import { Department } from "./Department";
import { User } from "./User";

export class DerogationDepartment {

    constructor(
        public derogationId?: number,
        public derogationHeader?: DerogationHeader,
        public department?: string,
        public factoryDepartment?: Department,
        public mailStep?: number,
        public training = "0",
        public approved = "0",
        public comment = "",
        public rejected = "0",
        public cancellationRequest = "0",
        public cancellationReason = "",
        public derogationUser?: string,
        public user?: User,
        public operationDate?: Date,
        public checked = "1"
    ) { }
}