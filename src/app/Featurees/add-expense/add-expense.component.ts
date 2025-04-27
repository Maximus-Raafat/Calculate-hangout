import { Component } from '@angular/core';
import { EspenseServicesService } from '../../Core/services/espense-services.service';

@Component({
  selector: 'add-expense',
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.css'
})
export class AddExpenseComponent {
  description='';
  placeLocation='';
  amount=0;
  paidByUserId='';
  sharedWithUserIds:string[]=[];
  constructor(public expenseService:EspenseServicesService){}

  addExpense(){
    this.expenseService.addExpose(this.description,this.placeLocation,this.amount,this.paidByUserId,this.sharedWithUserIds)
    this.description = "";
    this.placeLocation = ""
    this.amount = 0;
    this.paidByUserId = ""

  }

  toggleUser(userId: string) {
    const index = this.sharedWithUserIds.indexOf(userId);
    if (index === -1) {
      this.sharedWithUserIds.push(userId); 
    } else {
      this.sharedWithUserIds.splice(index, 1); 
    }
  }
  
}
