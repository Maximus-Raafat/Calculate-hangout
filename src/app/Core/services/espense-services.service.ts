import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, forkJoin, Observable, of, tap, throwError } from 'rxjs';
import { Expense } from '../models/expenss.model';
import { User } from '../models/user.model';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient } from '@angular/common/http';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class EspenseServicesService {
  private urlApi = 'http://localhost:3000';
  // this for following the state of expenses 
  private expensesSubject = new BehaviorSubject<Expense[]>([]);
  expenses$ = this.expensesSubject.asObservable();

  // this for fllowing the state of users! like who in this conclusion
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

addUser(name:string, email:string,balance:number): Observable<User> {
  const newUser = new User(uuidv4(),name,email,balance)
  return this.http.post<User>(`${this.urlApi}/users`,newUser).pipe(
    tap(addedUser=>{
       const currentUsers = this.usersSubject.getValue();
       this.usersSubject.next([...currentUsers,addedUser])
    }),
    catchError((error)=>{
      console.log('Failed to add user:',error);
      return throwError(()=> error);
    })
  )
 }

  addExpose(description:string, placeLocation:string,amount: number,paidByUserId: string,contributor:string,WhoShareAmount:number,sharedWithUserIds: string[]):void {
    const newExponse = new Expense(uuidv4(),description,placeLocation,amount,paidByUserId,contributor,WhoShareAmount,sharedWithUserIds)
    this.updateUserBalances(newExponse);
    this.http.post<Expense>(`${this.urlApi}/expenses`,newExponse).pipe
    (tap(addexpose=>{
      const currentExpenses  = this.expensesSubject.value;
      this.expensesSubject.next([...currentExpenses,addexpose]);
  
    }),
      catchError((error:any) =>{
        console.error('Failed to add Expense:', error);
        this.rollbackLastExpense(newExponse.id);
        return of(null);
      })
    ).subscribe();

  }

  rollbackLastExpense(id: any) {
    const current = this.expensesSubject.value;
    const updated = current.filter(expense => expense.id !== id);
    this.expensesSubject.next(updated);
  }

// to update the balances!
  private updateUserBalances(expense:Expense) :void {
    
    const currentUsers = this.usersSubject.value.map(user => ({ ...user }));

    const sharePerUser = expense.amount / expense.sharedWithUserIds.length;
    const partialContributionAmount = expense.WhoShareAmount;
    const partialPayerId = expense.contributor;
  
    currentUsers.forEach(user => {

      const isPayer = user.id === expense.paidByUserId;
      const isSharedUser = expense.sharedWithUserIds.includes(user.id);
      const isPartialPayer = user.id === partialPayerId;

      if(isPayer){
        user.balance += expense.amount - sharePerUser

        if (partialContributionAmount > 0) {
          user.balance -= partialContributionAmount;
        }
      }
      if (isSharedUser && !isPayer) {
        user.balance -= sharePerUser;
      }
      if (isPartialPayer) {
        user.balance += partialContributionAmount;
      }
    });
    this.usersSubject.next(currentUsers);

  }
  updateUser(updateUser:User):Observable<User>{
    return this.http.put<User>(`${this.urlApi}/users/${updateUser.id}`, updateUser).pipe(
      tap((responseUser) => {
        console.log("responseUser ==== > ", responseUser);
        const currentUsers = this.usersSubject.value;
        const updatedList = currentUsers.map(user =>
          user.id === responseUser.id ? responseUser : user
        );
        this.usersSubject.next(updatedList);
      }),
      catchError((error) => {
        console.error('Failed to update user:', error);
        return throwError(() => error);
      })
    );
  }

  getUsers(): User[] {
    return this.usersSubject.value;
  }

  getExpenses(): Expense[] {
    return this.expensesSubject.value;
  }
}
