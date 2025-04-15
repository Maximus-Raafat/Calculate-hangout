import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Expense } from '../models/expenss.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class EspenseServicesService {
  // this for following the state of expenses 
  private expensesSubject = new BehaviorSubject<Expense[]>([]);
  expenses$ = this.expensesSubject.asObservable();
  // this for folloing the state of users! like who in this conclusion
  private usersSubject = new BehaviorSubject<User[]>([])
  users$ = this.usersSubject.asObservable();

  constructor() { const initialUsers: User[] = [
    new User('u1', 'أحمد', 'ahmed@example.com'),
    new User('u2', 'منى', 'mona@example.com'),
    new User('u3', 'كريم', 'karim@example.com')
  ];
  this.usersSubject.next(initialUsers);

}

  addExpose(expense:Expense):void {
    const currentExponses = this.expensesSubject.value;
    this.expensesSubject.next([expense]);

  }

  private updateUserBalances(expense:Expense) :void{
    const currentUsers = this.usersSubject.value.map(user =>({... user}));
    const sharedPerUser = expense.amount / expense.sharedWithUserIds.length;
    
    currentUsers.forEach(user => {
      if (user.id === expense.paidByUserId) {
        user.balance += expense.amount - sharedPerUser;
      } else if(expense.sharedWithUserIds.includes(user.id)){
        user.balance
      } else {}
    })
  }

}
