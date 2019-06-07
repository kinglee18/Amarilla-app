import { Component } from "@angular/core";
import { NavController, IonicPage } from "ionic-angular";
import { InformacionProvider } from "../../providers/informacion/informacion";
import { Geolocation } from "@ionic-native/geolocation";
import { BlogProvider } from "../../providers/blog/blog";

@IonicPage()
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
    public _info: InformacionProvider,
    public geolocation: Geolocation,
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
        this.coords["lat"] = 19.4326018;
        this.coords["lng"] = -99.1353936;
      });
  }

  goDirect(texto) {
    this.navCtrl.push("ListPage", {
      searchTerm: texto,
      coords: this.coords
    });
  }

  getArticles() {
    this.blogProvider
      .getHomeArticles()
      .then((data: Array<any>) => {
        for (let x of data) {
          this.loading = false;
          this.articles.push(x["hits"]["hits"][0]);
        }
      })
      .catch(e => {
        console.error(e);
      });
  }

  showBlogMenu(): void {
    this.navCtrl.push("BlogIndexPage", this.counter);
  }
}
