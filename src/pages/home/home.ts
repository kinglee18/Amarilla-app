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
  loading: boolean = true;
  counter = {};

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
  }

  getUb() {
    this.geolocation
      .getCurrentPosition()
      .then(resp => {
        this.coords["lat"] = resp.coords.latitude;
        this.coords["lng"] = resp.coords.longitude;
      })
      .catch(error => {
        this.coords['lat'] = 19.4326018;
        this.coords['lng'] = -99.1353936;
      });
  }

  goDirect(texto) {
    this.navCtrl.push("ListPage", {
      searchTerm: texto,
      coords: this.coords
    });
  }

  getArticles() {
    this.blogProvider.getHomeArticles().then((data: Array<any>) => {
      for (let x of data) {
        this.loading = false;
        this.articles.push(x["hits"]["hits"][0]);
        this.counter[x["hits"]["hits"][0]._source.categories[0].slug] =
          x["hits"]["total"];
      }
    });
  }

  showBlogMenu(): void {
    this.navCtrl.push("BlogIndexPage", this.counter);
  }
}
