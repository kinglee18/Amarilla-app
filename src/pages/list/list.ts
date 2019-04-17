import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { InformacionProvider } from "../../providers/informacion/informacion";

import * as geolib from "geolib";
import Business from "../../models/Business";

@IonicPage()
@Component({
  selector: "page-list",
  templateUrl: "list.html"
})
export class ListPage {
  businesses = [];
  coords: object = {};
  page = 1;
  total: number;
  searchTerm: string;
  errorMessage: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _info: InformacionProvider
  ) {
    this.coords = navParams.get("coords");
    this.searchTerm = navParams.get("searchTerm");
    this._info
      .getBusiness(this.searchTerm, this.coords["lng"], this.coords["lat"])
      .subscribe(
        data => {
          if (data['totalResultsNum'] > 0) {
            for (let business of data["ListRes"]) {
              this.businesses.push(new Business().deserialize(business));
            }
          } else {
            this.errorMessage =
              "No encontramos ningún negocio referente a tu búsqueda";
          }
        },
        error => {
          this.errorMessage =
            "Parece que algo no está funcionando bien, intenta mas tarde";
        }
      );
  }

  openDetail(data) {
    this.navCtrl.push("DetailPage", { negocio: data, coords: this.coords });
  }

  goAddList(ev) {
    this.page++;
    if (this.page <= this.total) {
      if (this.coords["lat"] && this.coords["lng"]) {
        this._info
          .getBusiness(
            this.searchTerm,
            this.coords["lng"],
            this.coords["lat"],
            this.page
          )
          .subscribe(data => {
            console.log(data);
            
            for (let business of data["ListRes"][0]["ListRes"]) {
              this.businesses.push(new Business().deserialize(business));
            }
          });
      }
    } else {
      ev.complete();
    }
  }

  getDist(lat, lng): string | boolean {
    let dist = geolib.getDistance(
      {
        latitude: this.coords["lat"],
        longitude: this.coords["lng"]
      },
      {
        latitude: lat,
        longitude: lng
      }
    );

    if (dist < 1000) {
      return dist + " m";
    } else {
      let a = (dist / 1000).toFixed(2);
      if (dist > 20) return false;
      return a + " Km";
    }
  }
}
