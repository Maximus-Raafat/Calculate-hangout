export class Expense {
    constructor(
        public id:string,
        public description:string,
        public amount:number,
        public paidByUserId:string,
        public sharedWithUserIds:string[],
    ) {
         
    }
}