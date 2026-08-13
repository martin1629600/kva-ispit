import { email } from '@angular/forms/signals';
import { UserModel } from '../../models/user.model';

const USERS = 'users';
const ACTIVE = 'active';
export class AuthService {
  static getUsers(): UserModel[] {
    const baseUser: UserModel = {
      email: 'user@example.com',
      password: 'user123',
      igracka: 'Slagalica',
      ime: 'Example',
      prezime: 'User',
      telefon: '+3812345678',
      adresa: 'Neka adresa',
      orders: [],
    };
    if (localStorage.getItem(USERS) == null) {
      localStorage.setItem(USERS, JSON.stringify([baseUser]));
    }

    return JSON.parse(localStorage.getItem(USERS)!);
  }
  static login(email: string, password: string) {
    const users = this.getUsers();
    for (let u of users) {
      if (u.email === email && u.password === password) {
        localStorage.setItem(ACTIVE, email);
        return true;
      }
    }
    return false;
  }

  static registerUser(user: UserModel) {
    const users = this.getUsers();
    for (let u of users) {
      if (u.email === user.email) {
        return false;
      }
    }
    users.push(user);
    localStorage.setItem(USERS, JSON.stringify(users));
    return true;
  }

  static getActiveUser(): UserModel | null {
    const users = this.getUsers();
    for (let u of users) {
      if (u.email === localStorage.getItem(ACTIVE)) {
        return u;
      }
    }
    return null;
  }

  static updateActiveUser(newUserData: UserModel) {
    const users = this.getUsers();
    for (let u of users) {
      if (u.email === localStorage.getItem(ACTIVE)) {
        u.ime = newUserData.ime;
        u.prezime = newUserData.prezime;
        u.password = newUserData.password;
        u.adresa = newUserData.adresa;
        u.telefon = newUserData.telefon;
        u.igracka = newUserData.igracka;
      }
    }
    localStorage.setItem(USERS, JSON.stringify(users));
  }

  static updateActiveUserPassword(newPassword: string) {
    const users = this.getUsers();
    for (let u of users) {
      if (u.email === localStorage.getItem(ACTIVE)) {
        u.password = newPassword;
      }
    }
    localStorage.setItem(USERS, JSON.stringify(users));
  }

  static logout() {
    localStorage.removeItem(ACTIVE);
  }

  static createOrder(toyId: number) {
    const users = this.getUsers();

    for (let u of users) {
      if (u.email === localStorage.getItem(ACTIVE)) {
        u.orders.push({
          toyId: toyId,
          status: 'reserved',
          quantity: 1,
        });
        localStorage.setItem(USERS, JSON.stringify(users));
      }
    }
  }

  static cancelOrder(toyId: number) {
    const users = this.getUsers();

    for (let u of users) {
      if (u.email === localStorage.getItem(ACTIVE)) {
        for (let order of u.orders) {
          if (toyId === order.toyId) {
            order.status = 'canceled';
          }
        }
      }
    }
    localStorage.setItem(USERS, JSON.stringify(users));
  }

  static deleteOrder(toyId: number) {
    const users = this.getUsers();

    for (let u of users) {
      if (u.email === localStorage.getItem(ACTIVE)) {
        for (let order of u.orders) {
          if (
            toyId === order.toyId &&
            (order.status == 'delivered' || order.status == 'canceled')
          ) {
            u.orders.splice(u.orders.indexOf(order), 1);
          }
        }
      }
    }
    localStorage.setItem(USERS, JSON.stringify(users));
  }

  static changeStatus(toyId: number) {
    const users = this.getUsers();
    for (let u of users) {
      if (u.email === localStorage.getItem(ACTIVE)) {
        for (let order of u.orders) {
          if (toyId === order.toyId && order.status == 'reserved') {
            order.status = 'delivered';
          }
        }
      }
    }
    localStorage.setItem(USERS, JSON.stringify(users));
  }

  static updateQuantity(toyId: number, quantity: number) {
    const users = this.getUsers();
    for (let u of users) {
      if (u.email === localStorage.getItem(ACTIVE)) {
        for (let order of u.orders) {
          if (toyId === order.toyId && order.status == 'reserved') {
            order.quantity = quantity;
          }
        }
      }
    }
    localStorage.setItem(USERS, JSON.stringify(users));
  }

  static rateOrder(toyId: number, rating: number) {
    const users = this.getUsers();
    for (let u of users) {
      if (u.email === localStorage.getItem(ACTIVE)) {
        for (let order of u.orders) {
          if (toyId === order.toyId && order.status == 'delivered') {
            order.rating = rating;
          }
        }
      }
    }
    localStorage.setItem(USERS, JSON.stringify(users));
  }
}
