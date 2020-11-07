import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _registerURI = 'http://localhost:3000/auth/register';
  _loginURI = 'http://localhost:3000/auth/login';
  _token = 'http://localhost:3000/auth/VpW02cG0W2vGeGXs8DdLIq3dQ62qMd0';
  isIt: boolean = false;

  token = {};
  user = {
    name: ''
  };

  constructor(
    private http: HttpClient,
    private _cookieService: CookieService) { }

  registerUser(user) {
    return this.http.post<any>(this._registerURI, user, {withCredentials: true});
  };

  loginUser(user) {
    return this.http.post<any>(this._loginURI, user, {withCredentials: true});
  };

  getToken() {
    return this.http.post<any>(this._token, this.token, {responseType: 'json', withCredentials: true});
  }

  loggedIn(): boolean {
    this.getToken().subscribe(res => {
      if(res.success === true){
        this.isIt = true;
      }
    }, err => {
      if(err.status === 401){
      this.isIt = false;
      alert('You need to sign in.');
      }
      console.log(err);
    })

    return this.isIt;
  }

};
