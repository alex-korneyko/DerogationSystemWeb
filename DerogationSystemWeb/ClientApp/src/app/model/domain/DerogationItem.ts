export class DerogationItem {
    constructor(
        public id?: number,
        public derogationId?: number,
        public workOrder?: string,
        public modelName?: string,
        public productCode?: string,
        public partNo?: string,
        public partNoDesc?: string,
        public aPartNo?: string,
        public aPartNoDesc?: string,
        public quantity?: number,
        public aQuantity?: number,
        public reason = "",
        public action = "",
        public supplier = ""
    ) { }
}