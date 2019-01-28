import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = true;
  loading = false;

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    if (this.userService.isConnected()) {
      this.router.navigate(['pages/myWaves']);
    }
  }

  onLoginLabelClick() {
    this.login = true;
  }

  onLoginRegisterClick() {
    this.login = false;
  }

  loginProcedure() {
    this.loading = true;
    this.userService.login('a', 'a');
  }

}
