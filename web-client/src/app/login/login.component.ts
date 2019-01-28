import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = true;
  loading = false;

  constructor(private authService : AuthService) { }

  ngOnInit() {
  }

  onLoginLabelClick() {
    this.login = true;
  }

  onLoginRegisterlClick() {
    this.login = false;
  }

  loginProcedure() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.authService.isConnected = true;
    }, 1000);
  }

}
