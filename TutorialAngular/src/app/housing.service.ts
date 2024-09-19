import { Injectable } from '@angular/core';
import {HousingLocation} from './housinglocation';
@Injectable({
  providedIn: 'root'
})
export class HousingService {
  //readonly baseUrl = 'https://angular.dev/assets/images/tutorials/common';
  url = 'http://localhost:3000/locations';

  allHouses: HousingLocation[] | null = null;

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const data = await fetch(this.url);
    this.allHouses = await data.json();
    return this.allHouses ?? [];
  }

  getAllHouses() {
    return this.allHouses;
  }

  async addHousingLocations(housingLocation: HousingLocation): Promise<void>{
    this.allHouses?.push(housingLocation);
  }
  
  async getHousingLocationById(id: number): Promise<HousingLocation> {
    const data = this.allHouses?.find(house => house.id == id);
    if (data === undefined) {
      throw new Error(`HousingLocation with id ${id} not found`);
    }
    return Promise.resolve(data);
  }

  async realizarSolicitudPost(datos: FormData) {
    try {
        // Realizamos la solicitud POST
        const respuesta = await fetch(this.url, {
            method: 'POST', // Método de la solicitud
            headers: {
                'Content-Type': 'application/json' // Tipo de contenido
            },
            body: JSON.stringify(datos) // Convertimos el objeto de datos a JSON
        });

        // Verificamos si la respuesta fue exitosa
        if (!respuesta.ok) {
            throw new Error('Error en la solicitud: ' + respuesta.statusText);
        }

        // Parseamos la respuesta JSON
        const resultado = await respuesta.json();
        console.log('Usuario creado con ID:', resultado.id);
    } catch (error) {
        console.error('Error al hacer la solicitud:', error);
        throw error; // Volvemos a lanzar el error para que el llamador pueda manejarlo
    }
}
  
  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`,
    );
  }
  
}
