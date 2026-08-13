import { ToyModel } from './../../models/toys.models';
import { Component, Input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Utils } from '../utils';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../services/auth.service';
import { ToyService } from '../services/toy.service';
import { Loading } from '../loading/loading';
import { Alerts } from '../alerts';
import { Router } from '@angular/router';
import { FormField } from '@angular/forms/signals';
import { MatFormField, MatLabel, MatSelect, MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    Loading,
    MatLabel,
    MatSidenavModule,
    FormsModule,
    MatSelectModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  public service = AuthService;
  toys = signal<ToyModel[]>([]);
  filteredToys = signal<ToyModel[]>([]);
  searchName = '';
  selectedType = '';
  selectedAge = '';
  selectedTargetGroup = '';
  selectedPrice: number | null = null;
  selectedYear = '';
  selectedReview = '';

  constructor(
    public utils: Utils,
    private router: Router,
  ) {
    ToyService.getToys().then((rsp) => {
      const sorted = rsp.data.sort((t1, t2) => {
        return t1.price - t2.price;
      });
      this.toys.set(rsp.data);
      this.filteredToys.set(rsp.data);
    });
  }

  addToCart(toyId: number) {
    if (!AuthService.getActiveUser()) {
      this.router.navigate(['/login']);
      return;
    }

    AuthService.createOrder(toyId);

    Alerts.success('Successfully reserved');
  }

  getToyTypes() {
    return [...new Set(this.toys().map((t) => t.type.name))];
  }

  getAgeGroups() {
    return [...new Set(this.toys().map((t) => t.ageGroup.name))];
  }

  getTargetGroup() {
    return [...new Set(this.toys().map((t) => t.targetGroup))];
  }

  filter() {
    const filtered = this.toys().filter((t) => {
      const q = this.searchName.toLowerCase();
      const w = this.selectedType.toLowerCase();
      const a = this.selectedAge;
      const tg = this.selectedTargetGroup.toLowerCase();
      const p = this.selectedPrice;
      const y = this.selectedYear;

      const searchMatch =
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        ToyService.getReview(t.toyId).toLowerCase().includes(q);
      const typeMatch = w === '' || t.type.name.toLowerCase().includes(w);
      const ageMatch = a === '' || t.ageGroup.name.toLowerCase().includes(a);
      const targetMatch = tg === '' || t.targetGroup.toLowerCase().includes(tg);
      const targetPrice = p === 0 || p === null || t.price < p;
      const yearMatch = y === '' || t.productionDate.substring(0, 4).includes(y);

      return searchMatch && typeMatch && ageMatch && targetMatch && targetPrice && yearMatch;
    });
    this.filteredToys.set(filtered);
  }
}
