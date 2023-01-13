import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FeatureCollection, GeometryObject } from 'geojson';
import jsonData from '../../assets/data/cat-map.json';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  getMapData(): Observable<FeatureCollection<GeometryObject>> {
    return of(jsonData as FeatureCollection<GeometryObject>);
  }
}