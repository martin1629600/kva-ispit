import { Utils } from './../utils';
import { appConfig } from './../app.config';
import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToyModel } from '../../models/toys.models';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { AuthService } from '../services/auth.service';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ToyService } from '../services/toy.service';
import { Loading } from '../loading/loading';

@Component({
  selector: 'app-details',
  imports: [MatCardModule, MatListModule, MatIconModule, MatButtonModule, Loading],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
  public service = AuthService;

  toy = signal<ToyModel | null>(null);

  constructor(
    route: ActivatedRoute,
    public utils: Utils,
  ) {
    route.params.subscribe((params) => {
      const toyId = params['toyId'];
      ToyService.getToyById(toyId).then((rsp) => this.toy.set(rsp.data));
    });
  }
}
