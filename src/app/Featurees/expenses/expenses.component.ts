import { Component } from '@angular/core';
import { EspenseServicesService } from '../../Core/services/espense-services.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'expenses',
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent {
  espense$ = this.expenseService.expenses$
  users$ = this.expenseService.users$
  constructor(public expenseService: EspenseServicesService) { }

  getUserName(id: string): Observable<string> {
    return this.users$.pipe(
      map(users=> {
        console.log("test=> ", users)
        const user = users.find(u => u.id === id);
        return user ? user.name : "Unknown"
      })
    )
  }

  getSharedUserNames(ids: string[]): Observable<string>{
    return this.users$.pipe(
      map(users =>
        ids.map(id => {
          const user = users.find(u => u.id === id);
          return user ? user.name : 'Unknown';
        }).join(', ')
      )
    );
  }
}
