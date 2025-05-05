import { Expense } from "./expenss.model";

export class User {
    constructor(
        public id:string,
        public name:string,
        public email:string,
        public balance:number = 0,
        public expenses:Expense[]=[],
    ) {
         
    }
}