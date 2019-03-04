import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';
import {ConnectorService} from './connector.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService,
              private connectorService: ConnectorService) { }

  profileNavShow = false;
  Connectors = this.connectorService.Connectors;

  onProfileNavClicked() {
    this.profileNavShow = !this.profileNavShow;
  }

  onLogout() {
    this.profileNavShow = false;
    this.userService.logout();
  }

  async ngOnInit() {
      if (!this.userService.isConnected()) {
          return;
      }
      for (const connector of this.Connectors) {
          await connector.getConnected();
          if (connector.isConnected() === true) {
              await connector.getData();
          }
      }
  }
}
