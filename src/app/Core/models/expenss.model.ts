export class Expense {
    constructor(
        public id: string,
        public placeLocation:string,
        public description: string, 
        public amount: number,
        public paidByUserId: string,
        public contributor: string,
        public WhoShareAmount: number,
        public sharedWithUserIds: string[]
    ) {
         
    }
}