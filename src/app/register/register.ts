import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Alerts } from '../alerts';
import { MatSelectModule } from '@angular/material/select';
import { ToyModel } from '../../models/toys.models';
import { ToyService } from '../services/toy.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-register',
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  email = '';
  password = '';
  passwordRepeat = '';
  igracka = '';
  ime = '';
  prezime = '';
  telefon = '';
  adresa = '';
  orders = [];

  toyTypes = signal<ToyModel['type'][]>([]);

  constructor(private router: Router) {
    if (AuthService.getActiveUser()) {
      router.navigate(['/']);
      return;
    }
    ToyService.getToyTypes().then((rsp) => this.toyTypes.set(rsp.data));
  }

  doRegister() {
    if (this.password === this.passwordRepeat) {
      const newUser: UserModel = {
        email: this.email,
        password: this.password,
        igracka: this.igracka,
        ime: this.ime,
        prezime: this.prezime,
        telefon: this.telefon,
        adresa: this.adresa,
        orders: [],
      };
      const result = AuthService.registerUser(newUser);
      if (result) {
        Alerts.success('Registered successfully');
      } else {
        Alerts.fail('Email je vec registrovan');
      }
    } else {
      Alerts.fail('Sifre se ne poklapaju');
    }
  }
}
