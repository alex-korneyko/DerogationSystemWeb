import { DerogationHeader} from  "./DerogationHeader";
import { Department } from "./Department";
import { User } from "./User";

export class DerogationDepartment {
    constructor(
        derogationId?: number,
        derogationHeader?: DerogationHeader,
        factoryDepartment?: Department,
        mailStep?: number,
        training?: string,
        approved?: string,
        comment?: string,
        rejected?: string,
        cancellationRequest?: string,
        cancellationReason?: string,
        user?: User,
        operationDate?: Date,
        checked?: string
    ) { }
}