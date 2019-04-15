import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";
import { InformacionProvider } from "../../providers/informacion/informacion";

@IonicPage()
@Component({
  selector: "page-search",
  templateUrl: "search.html"
})
export class SearchPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public _info: InformacionProvider
  ) {}

  ngOnDestroy() {
    this._info.info.search = "";
    this._info.info.auto = [];
    this._info.info.texto = "";
    this._info.info.page = 1;
    this._info.info.list = [];
  }

  closeSearch() {
    this.viewCtrl.dismiss();
    this._info.info.search = "";
    this._info.info.auto = [];
    this._info.info.texto = "";
    this._info.info.page = 1;
  }

  deleteSearch(ev: any) {
    this._info.info.search = "";
    this._info.info.auto = [];
  }

  goList(texto) {
    this._info.info.page = 1;
    if (texto == this._info.info.search)
      this._info.info.texto = this._info.info.search;
    else {
      this._info.info.texto = texto;
      this._info.info.search = texto;
    }
    this.navCtrl.push("ListPage");
  }
}
