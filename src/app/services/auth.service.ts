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

  static logout() {
    localStorage.removeItem(ACTIVE);
  }
}
