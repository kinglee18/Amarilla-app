import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { InformacionProvider } from "../../providers/informacion/informacion";

import * as geolib from "geolib";

@IonicPage()
@Component({
  selector: "page-list",
  templateUrl: "list.html"
})
export class ListPage {
  load;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _info: InformacionProvider
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ListPage");

    if (this._info.info.coords.lat && this._info.info.coords.lng) {
      this._info.getNegocios1(
        this._info.info.texto,
        this._info.info.page,
        null
      );
    } else
      this._info.getNegocios2(
        this._info.info.texto,
        this._info.info.page,
        null
      );
    /*this.load =  this._info.loadingCtrl.create({
      content: 'Cargando...'
    });

    this.load.present();
    this._info.getNegociosSE(this._info.info.texto,this._info.info.page).then(() => {
      if(this._info.info.list.length == 0) this.resultados = false;
      
      this.load.dismiss();
    });*/
  }

  ionViewWillUnload() {
    console.log("ionViewWillUnload :(");
    this._info.info.list = [];
  }

  openDetail(data) {
    this.navCtrl.push("DetailPage", { negocio: data });
  }

  goAddList(ev) {
    this._info.info.page++;
    if (this._info.info.page <= this._info.info.total) {
      if (this._info.info.coords.lat && this._info.info.coords.lng) {
        this._info.getNegocios1(
          this._info.info.texto,
          this._info.info.page,
          ev
        );
      } else
        this._info.getNegocios2(
          this._info.info.texto,
          this._info.info.page,
          ev
        );

      /*this._info.getNegociosSE(this._info.info.texto,this._info.info.page).then(() => {
        ev.complete();
      });*/
    } else {
      ev.complete();
    }
  }

  getDist(lat, lng) {
    let status = true;
    let dist = geolib.getDistance(
      {
        latitude: this._info.info.coords.lat,
        longitude: this._info.info.coords.lng
      },
      {
        latitude: lat,
        longitude: lng
      }
    );

    let result;

    if (dist < 1000) {
      result = dist + " m";
    } else {
      let a = (dist / 1000).toFixed(2);
      if (dist > 20) status = false;
      result = a + " Km";
    }

    //console.log('Distancia: ',dist)

    return {
      status,
      result
    };
  }
}
