import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EspenseServicesService } from '../../../Core/services/espense-services.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!:FormGroup;
  
  constructor(private fb:FormBuilder,private expenseService:EspenseServicesService ){ }
  
  ngOnInit(): void {
     this.intallForm();
  }
    intallForm():void{ 
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(8)]]
      });
    }
  submit() {
    const registerForm = this.registerForm.value;
    this.expenseService.registerUser(registerForm.name,registerForm.email,registerForm.password).subscribe(res=>{
      this.registerForm.reset();
    })

  }
}
