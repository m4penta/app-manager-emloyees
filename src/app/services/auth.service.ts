import { Injectable } from '@angular/core';
import { AdminService } from './admin.services';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
users: any;
constructor(private _admin: AdminService) {
  _admin.getAllAdmins().subscribe(x => this.users = x)
}
authenticate(username: string, password: string): boolean {
  const foundUser = this.users.find((user: any) => user.username === username && user.password === password);
  return !!foundUser;
}

}
