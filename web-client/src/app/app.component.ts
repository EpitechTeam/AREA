import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService) { }

  profileNavShow = false;
  onProfileNavClicked() {
    this.profileNavShow = !this.profileNavShow;
  }

  onLogout() {
    this.profileNavShow = false;
    this.userService.logout();
  }

  ngOnInit(): void {
  }
}
