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
}

// GET https://toy.pequla.com/api/toy (листа свих играчака)
// GET https://toy.pequla.com/api/toy/<toyId> (једна играчка за ИД)
// GET https://toy.pequla.com/api/toy/permalink/<permalink> (једна играчка за пермалинк)
// POST https://toy.pequla.com/api/toy/list - BODY мора да има низ ID-јева, враћа листу играчака за исте
// GET https://toy.pequla.com/api/age-group (листа свих старосних група)
// GET https://toy.pequla.com/api/type (листа свих типова играчака)
