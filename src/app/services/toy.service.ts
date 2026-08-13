import axios from 'axios';
import { ToyModel } from '../../models/toys.models';

const client = axios.create({
  baseURL: 'https://toy.pequla.com/api',
  headers: {
    Accept: 'application/json',
  },
  validateStatus(status) {
    return status === 200 || status === 204;
  },
});

export class ToyService {
  static async getToys() {
    return await client.get<ToyModel[]>('/toy');
  }
  static async getToyById(toyId: number) {
    return await client.get<ToyModel>('/toy/' + toyId);
  }

  static async getToyNames() {
    return await client.get<string[]>('/toy/name');
  }

  static async getToyTypes() {
    return await client.get<ToyModel['type'][]>('/type');
  }

  static reviews = [
    { toyId: 1, text: 'Odlicna igracka za razvoj motorike' },
    { toyId: 2, text: 'Detetu je bila veoma zanimljiva' },
    { toyId: 3, text: 'Veoma kvalitetna i zabavna igracka' },
    { toyId: 4, text: 'Odlican izbor za kreativnu decu' },
    { toyId: 5, text: 'Detetu je bila veoma zanimljiva' },
    { toyId: 6, text: 'Mekana i veoma kvalitetna igracka' },
    { toyId: 7, text: 'Odlicna igra za celu porodicu' },
    { toyId: 8, text: 'Dobra igracka za razvoj kreativnosti' },
    { toyId: 9, text: 'Zabavna i jednostavna za koriscenje' },
    { toyId: 10, text: 'Odlicna edukativna igracka' },
    { toyId: 11, text: 'Odlicna igracka za ucenje slova' },
    { toyId: 12, text: 'Detetu je bila veoma zanimljiva' },
    { toyId: 13, text: 'Veoma kvalitetna i zabavna igracka' },
    { toyId: 14, text: 'Odlican izbor za kreativnu decu' },
    { toyId: 15, text: 'Detetu je bila veoma zanimljiva' },
    { toyId: 16, text: 'Mekana i veoma kvalitetna igracka' },
    { toyId: 17, text: 'Odlicna igra za celu porodicu' },
    { toyId: 18, text: 'Dobra igracka za razvoj kreativnosti' },
    { toyId: 19, text: 'Zabavna i jednostavna za koriscenje' },
    { toyId: 20, text: 'Odlicna edukativna igracka' },
    { toyId: 21, text: 'Odlicna igracka za razvoj motorike' },
    { toyId: 22, text: 'Dobra slikovnica za najmladje' },
    { toyId: 23, text: 'Detetu je bila veoma zanimljiva' },
    { toyId: 24, text: 'Odlican izbor za kreativnu decu' },
    { toyId: 25, text: 'Veoma kvalitetna i zabavna igracka' },
    { toyId: 26, text: 'Mekana i veoma kvalitetna igracka' },
    { toyId: 27, text: 'Odlicna igra za razvoj pamcenja' },
    { toyId: 28, text: 'Dobra igracka za razvoj kreativnosti' },
    { toyId: 29, text: 'Zabavna i jednostavna za koriscenje' },
    { toyId: 30, text: 'Odlicna edukativna igracka' },
  ];

  static getReview(toyId: number) {
    return this.reviews.find((r) => r.toyId === toyId)?.text ?? '';
  }
}

// GET https://toy.pequla.com/api/toy (листа свих играчака)
// GET https://toy.pequla.com/api/toy/<toyId> (једна играчка за ИД)
// GET https://toy.pequla.com/api/toy/permalink/<permalink> (једна играчка за пермалинк)
// POST https://toy.pequla.com/api/toy/list - BODY мора да има низ ID-јева, враћа листу играчака за исте
// GET https://toy.pequla.com/api/age-group (листа свих старосних група)
// GET https://toy.pequla.com/api/type (листа свих типова играчака)
