import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToyService } from '../services/toy.service';
import { ToyModel } from '../../models/toys.models';
import { MatAnchor } from '@angular/material/button';
import { Alerts } from '../alerts';
import { OrderModel } from '../../models/order.model';
import { MatFormField, MatLabel, MatOption, MatSelect } from '@angular/material/select';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatList, MatListItem, MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-cart',
  imports: [MatAnchor, MatSelect, MatFormField, MatLabel, MatOption, MatIconModule, MatListModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  toys = signal<ToyModel[]>([]);
  orders = signal<OrderModel[]>([]);
  quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  ratings = [1, 2, 3, 4, 5];

  constructor(private router: Router) {
    const user = AuthService.getActiveUser();

    if (user == null) {
      this.router.navigate(['/login']);
      return;
    }
    this.orders.set(user.orders);

    for (let order of user.orders) {
      ToyService.getToyById(order.toyId).then((rsp) => {
        this.toys.update((toys) => [...toys, rsp.data]);
      });
    }
  }

  reloadComponent() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/cart']);
    });
  }

  getStatus(toyId: number) {
    for (let order of this.orders()) {
      if (order.toyId == toyId) {
        return order.status;
      }
    }
    return;
  }

  getTotalPrice() {
    let suma = 0;

    for (let t of this.toys()) {
      if (this.getStatus(t.toyId) == 'reserved') {
        suma += t.price * (this.getQuantity(t.toyId) ?? 1);
      }
    }
    return suma;
  }

  cancelOrder(toyId: number) {
    Alerts.confirm('Are you sure you want to cancel', () => {
      AuthService.cancelOrder(toyId);
      const user = AuthService.getActiveUser();

      if (user != null) {
        this.orders.set(user.orders);
      }
    });
  }

  deleteOrder(toyId: number) {
    Alerts.confirm('Are you sure you want to delete this order?', () => {
      AuthService.deleteOrder(toyId);
      const user = AuthService.getActiveUser();

      this.reloadComponent();
    });
  }

  changeOrderStatus(toyId: number) {
    Alerts.confirm('Are you sure the order has been delivered', () => {
      AuthService.changeStatus(toyId);
      const user = AuthService.getActiveUser();

      this.reloadComponent();
    });
  }

  getQuantity(toyId: number) {
    for (let order of this.orders()) {
      if (order.toyId == toyId) {
        return order.quantity;
      }
    }
    return;
  }

  changeQuantity(toyId: number, quantity: number) {
    Alerts.confirm('Are you sure about the quantity', () => {
      AuthService.updateQuantity(toyId, quantity);
      this.reloadComponent();
    });
  }

  rate(toyId: number, rating: number) {
    Alerts.confirm('Are you sure about the rating', () => {
      AuthService.rateOrder(toyId, rating);
      this.reloadComponent();
    });
  }

  getRating(toyId: number) {
    for (let order of this.orders()) {
      if (toyId === order.toyId) {
        return order.rating;
      }
    }
    return;
  }
}
