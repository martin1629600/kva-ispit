import { appConfig } from './../app.config';
import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { ToyModel } from '../../models/toys.models';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
  toy = signal<ToyModel | null>(null)

  constructor(route: ActivatedRoute) {
    route.params.subscribe(params=>{
      const toyId = params['toyId']
      axios.get(`https://toy.pequla.com/api/toy/${toyId}`)
      .then(rsp => this.toy.set(rsp.data))
    })
  }
}
