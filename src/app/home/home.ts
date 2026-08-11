import { Component, signal } from '@angular/core';
import axios from 'axios';
import { ToyModel } from '../../models/toys.models';
import { RouterLink } from "@angular/router";
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-home',
  imports: [RouterLink, MatCardModule, MatButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  toys = signal<ToyModel[]>([])
  constructor (){
    axios.get('https://toy.pequla.com/api/toy')
    .then(rsp=>this.toys.set(rsp.data))
  }
}
