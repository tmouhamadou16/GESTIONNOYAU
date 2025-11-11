import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  tokenValid: string;
  constructor(private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
    this.tokenValid = localStorage.getItem('token');
    if (this.tokenValid) {
      return true;
    } else {
      this.router.navigateByUrl('/');
      return false;
    }
  }
  
}
