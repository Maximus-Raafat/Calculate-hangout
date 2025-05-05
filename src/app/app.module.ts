import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatButtonModule} from '@angular/material/button';
import { AddExpenseComponent } from './Featurees/add-expense/add-expense.component';
import { ExpensesComponent } from './Featurees/expenses/expenses.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from  '@angular/common/http';
import { UsersComponent } from './Featurees/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    AddExpenseComponent,
    ExpensesComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
