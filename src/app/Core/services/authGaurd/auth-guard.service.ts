import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{


  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.authService.isAuthnticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    const expectedRoles = route.data['role'] as Array<string>;
    const currentUser = this.authService.getCurrentUser();
    const userRole = currentUser?.role;
    if (expectedRoles && !expectedRoles.includes(userRole || '')) {
      this.router.navigate(['/dashBord']); 
       return false;
    }

    return true; // كل شيء تمام
  }

  
}
