import { OrderModel } from './order.model';

export interface UserModel {
  email: string;
  password: string;
  orders: OrderModel[];
  ime: string;
  prezime: string;
  telefon: string;
  adresa: string;
  igracka: string;
}
