import { Component, OnInit } from '@angular/core';
import { EspenseServicesService } from '../../Core/services/espense-services.service';
import { User } from '../../Core/models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  users$: Observable<User[]> | undefined;
  
  constructor(private exposeService:EspenseServicesService){}
  ngOnInit(): void {
    this.users$ = this.exposeService.users$;
    console.log( this.users$)
  }



}
