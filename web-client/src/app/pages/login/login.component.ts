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
  bad = false;
  loading = false;
  email = '';
  password = '';
  firstname = '';
  lastname = '';

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    if (this.userService.isConnected()) {
      this.router.navigate(['pages/myWaves']).then();
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
    this.userService.login(this.email, this.password)
        .subscribe(response => {
          let res;
          // @ts-ignore
          res = response;
          if (res.type === false) {
            this.loading = false;
            this.bad = true;
          } else {
            this.loading = false;
            localStorage.setItem('appUser', JSON.stringify(res.data));
            this.router.navigate(['pages/myWaves']).then();
          }
        });
  }

  registerProcedure() {
    this.loading = true;
    this.userService.register(this.email, this.password, this.firstname, this.lastname)
        .subscribe(response => {
          let res;
          // @ts-ignore
          res = response;
          if (res.type === false) {
            this.loading = false;
            this.bad = true;
          } else {
            this.loading = false;
            this.login = true;
          }
        });
  }

}
