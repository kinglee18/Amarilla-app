import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  ModalController,
  Platform
} from "ionic-angular";
import { InformacionProvider } from "../../providers/informacion/informacion";
import { Geolocation } from "@ionic-native/geolocation";
import { MenuController } from "ionic-angular";
import { BlogProvider } from "../../providers/blog/blog";
import { InAppBrowser } from "@ionic-native/in-app-browser";


@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  coords: object = {};
  articles: Array<object> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public _info: InformacionProvider,
    public platform: Platform,
    public geolocation: Geolocation,
    public menuCtrl: MenuController,
    private blogProvider: BlogProvider
  ) {}

  ionViewDidLoad() {
    this.getUb();
    this.getArticles();
    //this.getBusiness();
  }

  getUb() {
    this.geolocation
      .getCurrentPosition()
      .then(resp => {
        this.coords["lat"] = resp.coords.latitude;
        this.coords["lng"] = resp.coords.longitude;
      })
      .catch(error => {
        console.error("Error getting location", error);
      });
  }

  openSearch() {
    this.modalCtrl.create("SearchPage", { coords: this.coords }).present();
  }

  goDirect(texto) {
    this.navCtrl.push("ListPage", {
      searchTerm: texto,
      coords: this.coords
    });
  }

  /*   getBusiness(): void {
    let businesses: Array<Business>;
    this._info.getBusiness("cafeteria").subscribe(
      (data: Array<any>) => {
        from(data).pipe(map(item => new Business().deserialize(item)));
      },
      error => {
        console.error(error);
      }
    );
  } */

  getArticles() {
    this.blogProvider.getHomeArticles().then((data: Array<any>) => {
      for (let x of data) {
        this.articles.push(x["hits"]["hits"][0]);
      }
    });
  }

  showBlogMenu(): void {
    this.navCtrl.push("BlogIndexPage");
  }
}
