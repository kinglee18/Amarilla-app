import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { InformacionProvider } from "../../providers/informacion/informacion";

@IonicPage()
@Component({
  selector: "page-mapa",
  templateUrl: "mapa.html"
})
export class MapaPage {
  lat
  lng
  name;
  address;
  coords: object = {};  
  latU;
  lngU;
  dir;

  urlIcon = {
    url: "./assets/imgs/ico_seccion.png",
    scaledSize: {
      width: 41,
      height: 56
    }
  };

  public renderOptions = {
    suppressMarkers: true
  };

  public markerOptions = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _info: InformacionProvider
  ) {
    console.log(this.navParams);
    
    this.lat = parseFloat(this.navParams.get("lat"));
    this.lng = parseFloat(this.navParams.get("lng"));
    this.name = this.navParams.get("name");
    this.address = this.navParams.get("address");
    this.coords = this.navParams.get("coords");
    
    this.markerOptions = {
      origin: {
        icon: "./assets/imgs/person0.png",
        label: "YO"
      },
      destination: {
        icon: "./assets/imgs/ico_seccion.png",
        label: this.name,
        infoWindow: this.name + "<br>" + this.address
      }
    };

    this.latU = this.coords['lat'];
    this.lngU = this.coords['lng'];
    console.log(this)
    this.dir = {
      destination: { lat: this.lat, lng: this.lng },
      origin: { lat: this.latU, lng: this.lngU }
    };
  }

  async caminar() {
    for (let i = 0; i < 20; i++) {
      this.coords['lat'] = this.coords['lat'] + 0.001;
      this.coords['lng'] = this.coords['lng'] + 0.001;
      this.dir = {
        destination: { lat: this.lat, lng: this.lng },
        origin: {
          lat: this.coords['lat'],
          lng: this.coords['lng']
        }
      };
      await this.sleep(3);
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms * 1000));
  }
}
