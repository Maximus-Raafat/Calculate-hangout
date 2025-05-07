import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddExpenseComponent } from './Featurees/add-expense/add-expense.component';
import { AddUserComponent } from './Featurees/add-user/add-user.component';
import { ExpensesComponent } from './Featurees/expenses/expenses.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashBord', pathMatch: 'full' },
  { path: 'dashBord', component: ExpensesComponent },
  { path: 'addExpose', component: AddExpenseComponent },
  { path: 'addUser', component: AddUserComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
