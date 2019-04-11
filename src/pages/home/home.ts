import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  ModalController,
  Platform
} from "ionic-angular";
import { InformacionProvider } from "../../providers/informacion/informacion";
import { Geolocation } from '@ionic-native/geolocation';
import { MenuController } from "ionic-angular";

import * as moment from "moment";
moment.locale("es");

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public _info: InformacionProvider,
    public platform: Platform,
    public geolocation: Geolocation,
    public menuCtrl: MenuController
  ) {}

  ionViewDidLoad() {
    this.getUb();
  }

  getUb() {
     this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this._info.info.coords.lat = resp.coords.latitude;
        this._info.info.coords.lng = resp.coords.longitude;
       }).catch((error) => {
         console.log('Error getting location', error);
       });
  }

  openSearch() {
    this.modalCtrl.create("SearchPage").present();
  }

  getTime(valor) {
    let tiempo = valor.split(" ");
    return moment(tiempo[0]).fromNow();
  }

  goDirect(texto) {
    this._info.info.page = 1;
    this._info.info.texto = texto;
    this._info.getNegociosSE(texto, this._info.info.page);
    this.navCtrl.push("ListPage");
  }

  openMenu() {
    this.menuCtrl.toggle();
  }
}
