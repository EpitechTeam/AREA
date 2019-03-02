import { Component, OnInit } from '@angular/core';import { Router } from '@angular/router';import { UserService } from '../../user.service';import {Title} from '@angular/platform-browser';@Component({  selector: 'app-login',  templateUrl: './login.component.html',  styleUrls: ['./login.component.css']})export class LoginComponent implements OnInit {  login = true;  bad = false;  loading = false;  email = '';  password = '';  firstname = '';  lastname = '';  constructor(private router: Router,              private userService: UserService,              private titleService: Title) {  }  ngOnInit() {      this.titleService.setTitle('Sonar - Login');    if (this.userService.isConnected()) {      this.router.navigate(['pages/myWaves']).then();    }  }  onLoginLabelClick() {    this.login = true;  }  onLoginRegisterClick() {    this.login = false;  }  async loginProcedure() {    this.loading = true;    await this.userService.login(this.email, this.password)        .subscribe(response => {          let res;          // @ts-ignore          res = response;          if (res.type === false) {              this.loading = false;              this.bad = true;          } else {              this.loading = false;              this.userService.setUser(res.data.token);          }        });  }  registerProcedure() {    this.loading = true;    this.userService.register(this.email, this.password, this.firstname, this.lastname)        .subscribe(response => {          let res;          // @ts-ignore          res = response;          if (res.type === false) {            this.loading = false;            this.bad = true;          } else {            this.loading = false;            this.login = true;          }        });  }}