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
import { AddUserComponent } from './Featurees/add-user/add-user.component';
import { FeatureesComponent } from './Featurees/featurees.component';

import {MatDialogModule} from '@angular/material/dialog';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { LoginComponent } from './Featurees/auth/login/login.component';
import { RegisterComponent } from './Featurees/auth/register/register.component';
import { AcreptUserComponent } from './Featurees/acrept-user/acrept-user.component';


@NgModule({
  declarations: [
    AppComponent,
    AddExpenseComponent,
    ExpensesComponent,
    UsersComponent,
    AddUserComponent,
    FeatureesComponent,
    LoginComponent,
    RegisterComponent,
    AcreptUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,

  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
