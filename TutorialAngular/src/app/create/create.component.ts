import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [HousingLocationComponent, CommonModule, ReactiveFormsModule],
  template: `
  <section class="listing-apply">
    <h2 class="section-heading">Introduce los datos de la casa</h2>
    <form [formGroup]="casaForm" (submit)="submitApplication()">
    <div>
      <label for="name">Name:</label>
      <input id="name" formControlName="name" />
    </div>
    <div>
      <label for="city">City:</label>
      <input id="city" formControlName="city" />
    </div>
    <div>
      <label for="state">State:</label>
      <input id="state" formControlName="state"/>
    </div>
    <div>
      <label for="photo">Photo:</label>
      <input id="photo" type="file" (change)="onFileChange($event)" accept="image/*" />
    </div>
    <div>
      <label for="availableUnits">AvailableUnits:</label>
      <input id="availableUnits" formControlName="availableUnits" type="number" />
    </div>
    <div>
      <label for="wifi">Wifi:</label>
      <input id="wifi" formControlName="wifi" type="checkbox" />
    </div>
    <div>
      <label for="laundry">Laundry:</label>
      <input id="laundry" formControlName="laundry" type="checkbox" />
    </div>
    <button type="submit">Create</button>
  </form>
  </section>`,
  //templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})

export class CreateComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  selectedFile: File | null = null;
  fileUrl: string | null = null;
  housingService = inject(HousingService);
  housingLocationList: HousingLocation[] = [];

  casaForm = new FormGroup({
    name: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    availableUnits: new FormControl(0, Validators.min(1)),
    wifi: new FormControl(false),
    laundry: new FormControl(false),
  });

  constructor() {
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      // Crear un nuevo FileReader
      const reader = new FileReader();

      // Definir la función de callback cuando la lectura se complete
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.fileUrl = e.target?.result as string;
        console.log('URL del archivo:', this.fileUrl);
        // Puedes usar fileUrl aquí para mostrar una previsualización o para otros propósitos
      };

      // Leer el archivo como una URL de datos (Data URL)
      reader.readAsDataURL(this.selectedFile);
    }
  }


  async submitApplication() {
    const formData = this.casaForm.value;
    const housingLocation: HousingLocation = {
      id: 10,
      name: formData.name ?? '',
      city: formData.city ?? '',
      state: formData.state ?? '',
      photo: this.fileUrl ?? '',
      availableUnits: formData.availableUnits ?? 0,
      wifi: formData.wifi ?? false,
      laundry: formData.laundry ?? false,
    };
    // this.housingService.realizarSolicitudPost(formData);
    await this.housingService.addHousingLocations(housingLocation)
    console.log("Casa añadida");
    await this.housingService.getAllHousingLocations()
    .then(respuesta => {
      console.log("Casas totales dbjson", respuesta);

      let casas = this.housingService.getAllHouses();
      console.log(casas)
    })
  }
}
