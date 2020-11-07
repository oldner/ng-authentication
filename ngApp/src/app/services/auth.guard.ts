import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService, private _router:Router, private _cookieService: CookieService) {}
  
  canActivate(): boolean {
    if(this._cookieService.get('access_token')) {
      return this._authService.loggedIn();
    } else {
      this._router.navigate(['login']);
      return false;
    }
    
  }
  
}
