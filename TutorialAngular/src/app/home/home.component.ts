import { Component, inject } from '@angular/core';
import {HousingLocationComponent} from '../housing-location/housing-location.component';
import { CommonModule } from '@angular/common';
import {HousingLocation} from '../housinglocation';
import {HousingService} from '../housing.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HousingLocationComponent, CommonModule, RouterLink, RouterOutlet],
  template: `
  <article>
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
        <a [routerLink]="['/create']">Create a new house</a>
      </form>
    </section>
    <section class="results">
      <app-housing-location *ngFor="let housingLocation of filteredLocationList" [housingLocation]="housingLocation"></app-housing-location>
    </section>
  </article>
  `,
  //templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  filteredLocationList: HousingLocation[] = [];
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  
  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter((housingLocation) =>
      housingLocation?.city.toLowerCase().includes(text.toLowerCase()),
    );
  }
  };

