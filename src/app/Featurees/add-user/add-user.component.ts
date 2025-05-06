import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EspenseServicesService } from '../../Core/services/espense-services.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit{
  FormUser!: FormGroup;
  constructor(private fb: FormBuilder,private expenseService:EspenseServicesService) {
    
  }
  ngOnInit(): void {
  this.intallForm();
  }

  intallForm():void{ 
    this.FormUser = this.fb.group({
      name: ['',Validators.required],
      email: ['',Validators.required],
      amount: [0,Validators.required],
    });
  }
  
  addUser() :void{
    const {name,email,amount} = this.FormUser.value;
    this.expenseService.addUser(name,email,amount).subscribe({
      next:(user)=> {
        this.FormUser.reset();
      },
      error:(err)=>{
        console.log('Failed to add user')
      }
    });
  }
}
