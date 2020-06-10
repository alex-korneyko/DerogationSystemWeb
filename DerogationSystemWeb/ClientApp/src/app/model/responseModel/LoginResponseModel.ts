import { User } from  "../domain/User";

export  class LoginResponseModel {
    constructor(
        public user?: User,
        public token?: string
    ) {}
}