export class Department {
    constructor(
        public department?: string,
        public mAilStep: number = 1,
        public mandatory: string = "0",
        public ltimeAccess: string = "0",
        public dCostAccess: string = "0",
        public addDept: string = "0",
        public toBeAdded: string = "0",
        public onlyMail: string = "0") {
    }
}