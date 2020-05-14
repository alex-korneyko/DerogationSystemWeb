export class User {
    constructor(
        public id?: number,
        public derogationUser?: string,
        public department?: string,
        public userMailBase?: string,
        public admin: string = "0",
        public canCreate: string = "0",
        public canApprove: string = "0",
        public inMail: string = "0") {
    }
}