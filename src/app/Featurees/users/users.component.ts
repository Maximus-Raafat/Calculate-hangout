import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import { EspenseServicesService } from '../../Core/services/espense-services.service';
import { User } from '../../Core/models/user.model';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  users$: Observable<User[]> | undefined;
  readonly dialog = inject(MatDialog);
  FormUser!: FormGroup;
  dialogRef!: MatDialogRef<any>;
  constructor(private fb: FormBuilder,private expenseService:EspenseServicesService) {
    
  }
  ngOnInit(): void {
    this.users$ = this.expenseService.users$;
    console.log( this.users$)
  }

  openDilog(updatedUser:User,templateRef: TemplateRef<any>) :void {
    this.intallForm(updatedUser);
    this.openDialog(templateRef);
  }
  submitUpdateUser():void {
    console.log(this.FormUser.value)
    this.expenseService.updateUser(this.FormUser.value).subscribe({
      next:(user)=>{
        this.closeDialog();
        this.FormUser.reset();
      },error:(error)=>{
        console.log('Failed to add user',error)
      }
    })
  }
  intallForm(currentUser:User):void{ 
      this.FormUser = this.fb.group({
      name: [currentUser.name,Validators.required],
      email: [currentUser.email,Validators.required],
      balance: [currentUser.balance,Validators.required],
      expenses:[currentUser.expenses],
      id:[currentUser.id],
    });
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
}
