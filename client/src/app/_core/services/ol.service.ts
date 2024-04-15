import { Injectable } from '@angular/core';
import Map from 'ol/Map';

@Injectable({
  providedIn: 'root'
})
export class OlService {
  public map!: Map;
}
