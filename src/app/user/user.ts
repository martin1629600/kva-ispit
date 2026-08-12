import { Component, signal } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToyModel } from '../../models/toys.models';
import { ToyService } from '../services/toy.service';
import { Loading } from '../loading/loading';
import { Alerts } from '../alerts';

@Component({
  selector: 'app-user',
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    Loading,
  ],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  public activeUser = AuthService.getActiveUser();
  toyTypes = signal<ToyModel['type'][]>([]);
  oldPassword = '';
  newPassword = '';
  passRepeat = '';

  constructor(private router: Router) {
    if (!AuthService.getActiveUser()) {
      router.navigate(['/login']);
      return;
    }
    ToyService.getToyTypes().then((rsp) => this.toyTypes.set(rsp.data));
  }

  updateUser() {
    Alerts.confirm('Save changes?', () => {
      AuthService.updateActiveUser(this.activeUser!);
      Alerts.success('Promene sacuvane');
    });
  }

  updatePassword() {
    Alerts.confirm('Are you sure you want to change your password?', () => {
      if (this.oldPassword != this.activeUser?.password) {
        Alerts.fail('Invalid old password');
        return;
      }

      if (this.newPassword != this.passRepeat) {
        Alerts.fail('Passwords dont match');
        return;
      }

      if (this.newPassword == this.activeUser?.password) {
        Alerts.fail('Cannot be the same as old password');
        return;
      }

      AuthService.updateActiveUserPassword(this.newPassword);
      Alerts.success('Password changed successfully');
      AuthService.logout();
      this.router.navigate(['login']);
    });
  }
}
