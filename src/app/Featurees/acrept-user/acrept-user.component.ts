import { Component, inject, OnInit ,TemplateRef} from '@angular/core';
import { User } from '../../Core/models/user.model';
import { EspenseServicesService } from '../../Core/services/espense-services.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContentObserver } from '@angular/cdk/observers';

@Component({
  selector: 'app-acrept-user',
  templateUrl: './acrept-user.component.html',
  styleUrl: './acrept-user.component.css'
})
export class AcreptUserComponent implements OnInit{
  acreptUserList:any[]=[];
  selectedRoles: string = '';
  dialogRef!: MatDialogRef<any>;
  readonly dialog = inject(MatDialog);  
  formAceptUser!:FormGroup;
    usersRole = [
    {id:1,role:'admin'},
    {id:2,role:'user'},
  ];

  constructor(private exposerService:EspenseServicesService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.exposerService.acreptUsers$.subscribe({
      next:(user)=>{
        this.acreptUserList = user
        console.log(this.acreptUserList)
      },error:(err=>{
          console.log('Failed to add user',err)
      })
    })
  }

  submitAddOnUser(){ 
    this.exposerService.approveUser(this.formAceptUser.value).subscribe((res)=>{
      console.log(res)
    })
  }
  intallForm(userAcrept:any):void{ 
    console.log("userAcrept",userAcrept)
    this.formAceptUser = this.fb.group({
      name: [userAcrept.name,Validators.required],
      email: [userAcrept.email,Validators.required],
      password: [userAcrept.password,Validators.required],
      role: [userAcrept.role||"user"],
      balance: [0],
      id: [userAcrept.id],
      expenses: this.fb.array([]),
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

  openDilog(userAcrept:any,templateRef: TemplateRef<any>) :void {
    console.log("userAcrept=>",userAcrept)
    console.log("acreptUserList=>",this.acreptUserList)

    this.intallForm(userAcrept);
    this.openDialog(templateRef);
  }
cancel(user:any):void {
  this.exposerService.updatedPendingUser(user.id);
}
toggleUser(role: any) {
    this.selectedRoles = role.role;
    this.formAceptUser.get('role')?.setValue(role.role);
  }
  approveUser():void { 
    console.log("ApproveUser",this.formAceptUser.value)
  }

}
