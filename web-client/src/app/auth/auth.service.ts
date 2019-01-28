import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService) {
  }

  async canActivate(next: ActivatedRouteSnapshot,
                    state: RouterStateSnapshot) {
    return (await this.CheckLogin());
  }

  async CheckLogin() {

    const isConnected = await this.userService.isConnected();

    if (!isConnected) {
      await this.router.navigate(['pages/login']);
      return (false);
    }
    return (true);
  }
}
