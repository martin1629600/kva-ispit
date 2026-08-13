import { ToyService } from './../services/toy.service';
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
import { Loading } from '../loading/loading';
import { Alerts } from '../alerts';

@Component({
  selector: 'app-details',
  imports: [MatCardModule, MatListModule, MatIconModule, MatButtonModule, Loading],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
  public service = AuthService;
  public ToyService = ToyService;

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

  addToCart() {
    if (this.toy() == null) {
      return;
    }

    AuthService.createOrder(this.toy()!.toyId);

    Alerts.success('Successfully reserved');
  }
}
