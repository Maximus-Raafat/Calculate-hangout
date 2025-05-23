import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddExpenseComponent } from './Featurees/add-expense/add-expense.component';
import { AddUserComponent } from './Featurees/add-user/add-user.component';
import { ExpensesComponent } from './Featurees/expenses/expenses.component';
import { LoginComponent } from './Featurees/auth/login/login.component';
import { AuthGuard } from './Core/services/authGaurd/auth-guard.service';
import { RegisterComponent } from './Featurees/auth/register/register.component';
import { AcreptUserComponent } from './Featurees/acrept-user/acrept-user.component';

const routes: Routes = [  
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  {
    path: 'dashBord', component: ExpensesComponent ,
    canActivate: [AuthGuard],
    data: { roles: ['user', 'admin']}
  },
  {
     path: 'addExpose',
     component: AddExpenseComponent,
     canActivate: [AuthGuard],
     data: { roles: ['user', 'admin']}
    },
  { path: 'addUser', component: AddUserComponent ,canActivate: [AuthGuard],data: { role: ['admin']}},
  { path: 'aceptUser', component: AcreptUserComponent ,canActivate: [AuthGuard],data: { role: ['admin']}},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
