export class UserModel{
    constructor(
        public email: string,
        public role: string,
        public password?: string,
        public username?: string,
        public id?: number
    ){}
}