import { ToyModel } from './../../models/toys.models';
import { Component, signal } from '@angular/core';
import axios from 'axios';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Utils } from '../utils';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-home',
  imports: [RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  public service = AuthService;
  toys = signal<ToyModel[]>([]);

  constructor(public utils: Utils) {
    axios.get<ToyModel[]>('https://toy.pequla.com/api/toy').then((rsp) => {
      const sorted = rsp.data.sort((t1, t2) => {
        return t1.price - t2.price;
      });
      this.toys.set(rsp.data);
    });
  }
}
