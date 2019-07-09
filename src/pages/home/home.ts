import { Component } from "@angular/core";
import { NavController, IonicPage } from "ionic-angular";
import { InformacionProvider } from "../../providers/informacion/informacion";
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
    private blogProvider: BlogProvider
  ) {}

  ionViewDidLoad() {
    this.getArticles();
  }

  goDirect(texto) {
    this.navCtrl.push("ListPage", {
      searchTerm: texto
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
