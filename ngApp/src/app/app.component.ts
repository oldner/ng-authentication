import { AuthService } from './services/auth.service';

import { Component, OnInit } from '@angular/core';
import { AuthGuard } from './services/auth.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ngApp';
  user = {
    name: ''
  };
  constructor(private _authService: AuthService) {
    this.user.name = _authService.user.name;
  }

  ngOnInit() {
  }

}
