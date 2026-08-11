import { Injectable } from '@angular/core';
import { ToyModel } from '../models/toys.models';

@Injectable({
  providedIn: 'root',
})
export class Utils {
  formatDate(iso: string) {
    return new Date(iso).toLocaleString('rs-RS', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  getImageUrl(toy: ToyModel) {
    const fileName = toy.imageUrl.split(' ')[0].toLocaleLowerCase();
    return `https://toy.pequla.com${fileName}`;
  }
}
