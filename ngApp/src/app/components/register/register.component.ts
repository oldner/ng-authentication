import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = {
    name: '',
    email: '',
    password: ''
  };

  @ViewChild('error') showError: ElementRef;
  @ViewChild('sendButton') sendButton: ElementRef;

  errMessage: String;
  constructor(
    private _authService: AuthService,
    private _router: Router) { }

  ngOnInit(): void {
  }

  registerUser() {
    this.sendButton.nativeElement.disabled = true;

    this._authService.registerUser(this.user).subscribe(
      res => {
         if(res.success === true) {
           this.errMessage = res.message + ' Giris sayfasina yonlendiriliyorsunuz..';
           this.showError.nativeElement.className = 'error alert alert-success';
           this.sendButton.nativeElement.disabled = false;
          //  setTimeout(() => {
          //   this._router.navigate(['/login']);
          //  }, 3000)
         }
      }, err => {
        console.log(err);
        this.showError.nativeElement.className += 'error alert alert-danger';
        this.errMessage = err.error.message;
        this.sendButton.nativeElement.disabled = false;
      })
  }

}
