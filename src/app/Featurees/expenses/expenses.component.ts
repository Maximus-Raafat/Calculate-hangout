import { Component } from '@angular/core';
import { EspenseServicesService } from '../../Core/services/espense-services.service';
import { map, Observable,combineLatest } from 'rxjs';

@Component({
  selector: 'expenses',
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent {
  expensesWithUsers$ = combineLatest([
    this.expenseService.expenses$,
    this.expenseService.users$
  ]).pipe(
    map(([expenses, users]) => {
      return expenses.map(expense => ({
        ...expense,
        paidByUserName: users.find(u => u.id === expense.paidByUserId)?.name || 'Unknown',
        sharedWithUserNames: expense.sharedWithUserIds
          .map(id => users.find(u => u.id === id)?.name || 'Unknown')
          .join(', ')
      }));
    })
  );
  
  constructor(public expenseService: EspenseServicesService) { }

}
