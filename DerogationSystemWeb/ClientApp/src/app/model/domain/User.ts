export class User {
    constructor(
        public id: number,
        public derogationUser: string,
        public userMailBase: string,
        public admin?: string,
        public canCreate?: string,
        public canApprove?: string,
        public inMail?: string) {
    }
}