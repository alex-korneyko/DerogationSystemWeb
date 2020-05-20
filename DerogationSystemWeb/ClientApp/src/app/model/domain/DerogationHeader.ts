import { Department } from "./Department";
import { User } from "./User";
import { DerogationDepartment } from "./DerogationDepartment";

export class DerogationHeader {
    constructor(
        derogationId?: number,
        createdDate?: Date,
        factoryDepartment?: Department,
        author?: User,
        lTime?: number,
        SLT?: number,
        dCostP?: number,
        dCostF?: number,
        cancelled?: string,
        approved?: string,
        offline?: string,
        cancellationReason?: string,
        derogationDepartments = new Array<DerogationDepartment>()
    ) {}
}