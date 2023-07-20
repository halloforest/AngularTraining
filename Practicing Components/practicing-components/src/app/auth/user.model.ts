export class User {
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Date
    ) {}
  
    get token(): string | null {
        // Check if the token expiration date set and it is not expired
        return (this._tokenExpirationDate && this._tokenExpirationDate >= new Date()) ? this._token : null;
    }
}

// export class User {
//     public email: string;
//     public id: string;
//     private _token: string;
//     private _tokenExpirationDate: Date;

//     constructor(email: string, id: string, token: string, tokenExpirationDate: Date) {  
//         this.email = email; 
//         this.id = id; 
//         this._token = token;
//         this._tokenExpirationDate = tokenExpirationDate;
//     }   

//     get token() {
//         if (!this._tokenExpirationDate || this._tokenExpirationDate < new Date()) {
//             return null;
//         }            
//         return this._token;
//     }  
// }