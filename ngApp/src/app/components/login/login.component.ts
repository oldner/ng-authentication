import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errMessage: String;

  user = {
    email: '',
    password: ''
  }
  name: String;
  at;

  @ViewChild('error') showError: ElementRef;
  @ViewChild('sendButton') sendButton: ElementRef;

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
  }

  loginUser() {

    this.sendButton.nativeElement.disable = true;

    this._authService.loginUser(this.user).subscribe(res => {
      if(res.success === true){
      this.at = res.access_token;
      console.log(res);
      this.errMessage = 'Login is successful. You will be redirected.';
      this.showError.nativeElement.className = 'error alert alert-success';
      this.sendButton.nativeElement.disable = false;
      this.name = 'Welcome ' + res.data.name;
      }
    }, err => {
      console.log(err);
      this.showError.nativeElement.className += 'error alert alert-danger';
      this.errMessage = err.error.message;
      this.sendButton.nativeElement.disabled = false;
    })
  }

}
