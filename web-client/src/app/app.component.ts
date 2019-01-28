import {Component, OnInit} from '@angular/core';
import {User, UserService} from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService) { }

  user = this.userService._user;

  isConnected = this.userService.isConnected();
  profileNavShow = false;

  onProfileNavClicked() {
    this.profileNavShow = !this.profileNavShow;
  }

  onLogout() {
    this.userService.logout();
  }

  ngOnInit(): void {
  }
}
