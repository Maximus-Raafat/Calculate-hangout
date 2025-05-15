import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../Core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm!:FormGroup;
  constructor(private fb: FormBuilder,private authService:AuthService){}

  ngOnInit(): void {
    this.intallForm();
  }
  intallForm():void{ 
  this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required,Validators.minLength(8)]]
    });
  }
  
  submit() {
    const login = this.loginForm.value;
    console.log(login.email,login.password);
    this.authService.login(login.eamil, login.password).subscribe();
  }


}
