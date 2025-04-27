import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, forkJoin, of } from 'rxjs';
import { Expense } from '../models/expenss.model';
import { User } from '../models/user.model';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EspenseServicesService {
  private urlApi = 'http://localhost:3000';
  // this for following the state of expenses 
  private expensesSubject = new BehaviorSubject<Expense[]>([]);
  expenses$ = this.expensesSubject.asObservable();

  // this for folloing the state of users! like who in this conclusion
  private usersSubject = new BehaviorSubject<User[]>([])
  users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) { 
  this.loadInitialData()
}

private loadInitialData() : void {
  forkJoin({
    users:this.http.get<User[]>(`${this.urlApi}/users`).pipe(
      catchError(error=> {
        console.log("Error loading Users:", error);
        return of([]);
      })
    ),
    expenses: this.http.get<Expense[]>(`${this.urlApi}/expenses`).pipe(
      catchError(error=> {
        console.log("Error loading Expense:", error);
        return of([]);
      })
    )
  }).subscribe(({users,expenses})=>{
  this.usersSubject.next(users);
  this.expensesSubject.next(expenses);
  
})
}

  addUser(user: User) {
    const users = this.usersSubject.value;
    this.usersSubject.next([...users, user]);
  }

  addExpose(description:string, placeLocation:string,amount: number,paidByUserId: string,sharedWithUserIds: string[]):void {
    const newExponse = new Expense(uuidv4(),description,placeLocation,amount,paidByUserId,sharedWithUserIds)
    
    const expense = this.expensesSubject.value;
    
    this.expensesSubject.next([...expense,newExponse]);
    this.updateUserBalances(newExponse);
    console.log(this.expensesSubject.value)

  }

  private updateUserBalances(expense:Expense) :void{
    const currentUsers = this.usersSubject.value.map(user =>({... user}));
    const sharePerUser = expense.amount / expense.sharedWithUserIds.length;
    
    currentUsers.forEach(user => {
      if (user.id === expense.paidByUserId) {
        user.balance += expense.amount - sharePerUser;
      } else if(expense.sharedWithUserIds.includes(user.id)){
        user.balance -= sharePerUser
      } else {}
    });
    console.log("Test Add Expose",currentUsers)

    this.usersSubject.next(currentUsers)
  }
  getUsers(): User[] {
    return this.usersSubject.value;
  }

  getExpenses(): Expense[] {
    return this.expensesSubject.value;
  }
}
