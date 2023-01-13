import { Component, OnInit } from '@angular/core';
import { FeatureCollection, GeometryObject } from 'geojson';
import { geoJson, Icon, Map, Marker, tileLayer } from 'leaflet';
import { map, tap } from 'rxjs/operators';
import { MapService } from '../../services/map.service';
import { faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons';
// import icon from '../../../assets/icons/logo-5.png';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  dataFromMap!: FeatureCollection<GeometryObject>;
  private map: Map;
  currLat: number = 41.25;
  currLng: number = 1.55;
  faHandHoldingHeart = faHandHoldingHeart;

  icon = new Icon({
    iconUrl: 'https://img.icons8.com/color/512/place-marker.png',
    iconSize:     [50, 50]
});

  constructor(
    private mapService: MapService
  ) { }

  ngOnInit(): void {
    this.mapService.getMapData().pipe(
      map((res: FeatureCollection<GeometryObject>) => res),
      tap((data) => this.dataFromMap = data),
    ).subscribe(() => {
      // this.initMap();
      this.getUserLocation();
    });
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.currLat = position.coords.latitude;
        console.log("🚀 ~ file: map.component.ts:36 ~ getUserLocation ~ this.currLat", this.currLat)
        this.currLng = position.coords.longitude;
        console.log("🚀 ~ file: map.component.ts:38 ~ getUserLocation ~ this.currLng", this.currLng)
        this.initMap();
      });
    }
    else {
      alert("Geolocation is not supported by this browser.");
      this.initMap();
    }
  }

  private initMap(): void {
    this.map = new Map('map').setView([this.currLat, this.currLng], 15);

    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    // tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(this.map);
    new Marker([this.currLat, this.currLng], {icon: this.icon}).addTo(this.map);
    // geoJson(this.dataFromMap, {
    //   style: (feature) => {
    //     const fillColor: string = feature?.properties.color;
    //     return {
    //       color: "black",
    //       weight: 2,
    //       fillColor: fillColor,
    //       fillOpacity: 0.5,
    //       opacity: 1,
    //       dashArray: '3',
    //     };
    //   },
    //   onEachFeature: (feature, layer) => {
    //     layer.bindPopup("<strong>" + feature.properties.name + "</strong>");
    //   }
    // }).addTo(this.map);
  }
}