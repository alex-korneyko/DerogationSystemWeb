import { Material } from "./Material";

export class WorkOrder {
    constructor(
        public workOrderId?: number,
        public orderNo?: string,
        public orderDate?: Date,
        public skdPartNo?: string,
        public material?: Material,
        public target?: number
    ) {
    }
}