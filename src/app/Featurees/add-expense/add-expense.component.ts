import { Component, OnInit } from '@angular/core';
import { EspenseServicesService } from '../../Core/services/espense-services.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { User } from '../../Core/models/user.model';

@Component({
  selector: 'add-expense',
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.css'
})
export class AddExpenseComponent implements OnInit{
  expenseForm!: FormGroup;
  users: User[] = [];
  isContributor: boolean = false;

  constructor(private fb: FormBuilder,public expenseService:EspenseServicesService){}
  ngOnInit(): void {
    this.intallForm();
    this.getUser();
    
  }
  addExpense(){
    const { description, placeLocation, amount, paidByUserId, contributor,WhoShareAmount,sharedUserIds, } = this.expenseForm.value;
    this.expenseService.addExpose(description, placeLocation, amount, paidByUserId,contributor ,WhoShareAmount,sharedUserIds );
    this.expenseForm.reset();
  }
  intallForm():void{ 
    this.expenseForm = this.fb.group({
      description: ['',Validators.required],
      placeLocation: ['',Validators.required],
      amount: ['',Validators.required],
      paidByUserId: ['',Validators.required],
      contributor:[''],
      WhoShareAmount:[''],
      sharedUserIds: this.fb.array([])
    });
  }
  toggleUser(userId: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    const sharedUserIds = this.expenseForm.get('sharedUserIds') as FormArray;
  
    if (isChecked) {
      sharedUserIds.push(this.fb.control(userId));
    } else {
      const index = sharedUserIds.controls.findIndex((x: { value: string; }) => x.value === userId);
      if (index !== -1) {
        sharedUserIds.removeAt(index);
      }
    }
  }
  getUser(): void{
    this.expenseService.users$.subscribe({
      next:(users)=> {
        this.users = users
      },
      error:(err)=>{
        console.log('Failed to add user',err)
      }
    });
  }
  
}
