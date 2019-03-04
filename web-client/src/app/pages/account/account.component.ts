import {Component, OnInit} from '@angular/core';
import {UserService} from '../../user.service';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

    firstName = '';
    lastName = '';
    email = '';
    changePassword = false;
    password = '';
    confirmPassword = '';

    badPasswordClass = '';

    constructor(private userService: UserService) {
        this.firstName = this.userService.getUser().first_name;
        this.lastName = this.userService.getUser().last_name;
        this.email = this.userService.getUser().email;
        console.log(this.userService.getUser());
    }

    ngOnInit() {
    }

    editPassword() {
        this.changePassword = true;
    }

    editPasswordProcedure() {
        if (this.password === '' || this.confirmPassword === '' || this.password !== this.confirmPassword) {
            this.badPasswordClass = 'badPassword';
            return;
        }
        if (this.password === this.confirmPassword) {
            this.userService.changeUserPassword(this.password).then();
            this.changePassword = false;
        }
    }

    saveChanges() {
        this.userService.updateUser(this.firstName, this.lastName, this.email).then();
    }

    onChanged(event) {
        if (this.badPasswordClass !== '') {
            this.badPasswordClass = '';
        }
    }

}
