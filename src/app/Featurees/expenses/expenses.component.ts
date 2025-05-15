import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import { EspenseServicesService } from '../../Core/services/espense-services.service';
import { map, Observable,combineLatest } from 'rxjs';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Expense } from '../../Core/models/expenss.model';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { User } from '../../Core/models/user.model';

@Component({
  selector: 'expenses',
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent implements OnInit{
  isContributor: boolean = false;
  users: User[] = [];
  readonly dialog = inject(MatDialog);  
  dialogRef!: MatDialogRef<any>;
  
  formExpense!:FormGroup;
  
  constructor(public expenseService: EspenseServicesService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getUser()
  }

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
  intallForm(currentExpense:Expense):void{ 
    this.formExpense = this.fb.group({
      description: [currentExpense.description,Validators.required],
      placeLocation: [currentExpense.placeLocation,Validators.required],
      amount: [currentExpense.amount,Validators.required],
      paidByUserId:[currentExpense.paidByUserId],
      sharedWithUserIds:this.fb.array(currentExpense.sharedWithUserIds.map(id => this.fb.control(id))),
      contributor: [currentExpense.contributor,Validators.required],
      id:[currentExpense.id],
    });
  }
    toggleUser(userId: string, event: Event) {
      const isChecked = (event.target as HTMLInputElement).checked;
      const sharedUserIds = this.formExpense.get('sharedUserIds') as FormArray;
      if (isChecked) {
        sharedUserIds.push(this.fb.control(userId));
      } else {
        const index = sharedUserIds.controls.findIndex((x: { value: string; }) => x.value === userId);
        if (index !== -1) {
          sharedUserIds.removeAt(index);
        }
      }
    }
  
  openDialog(templateRef: TemplateRef<any>) {
    this.dialogRef =  this.dialog.open(templateRef, {
      width: '650px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '300ms'
    });
  }
  closeDialog() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
  getUser(): void{
    this.expenseService.users$.subscribe({
      next:(users)=> {
        console.log(users)
        this.users = users
      },
      error:(err)=>{
        console.log('Failed to add user',err)
      }
    });
  }

  openDilog(updateExpense:Expense,templateRef: TemplateRef<any>) :void {
    this.intallForm(updateExpense);
    this.openDialog(templateRef);
  }

  submitUpdateUser() {
  throw new Error('Method not implemented.');
  }
  
}
