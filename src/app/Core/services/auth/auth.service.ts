import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:3000/users';
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();
  public currentUser:any = null;
  constructor(private http:HttpClient, private router:Router) { 
    const user = localStorage.getItem('user');
    if (user) {
        this.currentUser = JSON.parse(user);
        this.isLoggedInSubject.next(true);
    }
  }
login(email: string, password: string): Observable<any> {
  return this.http.get<any[]>(`${this.authUrl}?email=${email}&password=${password}`).pipe(
    tap(users => {
      console.log("users=> ", users);
      if (users.length) {
        this.currentUser = users[0];
        localStorage.setItem("user", JSON.stringify(this.currentUser));
        this.isLoggedInSubject.next(true);
        this.router.navigate(['/dashBord']);
      } else {
        throw new Error('Invalid credentials');
      }
    })
  );
}
  logout(){
    this.currentUser = null;
    localStorage.removeItem("user");
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login'])
  }

  getCurrentUser(){ 
    return this.currentUser;
  }
  isAuthnticated(): boolean {
    return this.currentUser !== null;
  }
}
