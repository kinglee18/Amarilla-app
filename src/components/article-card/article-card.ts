import { Component, Input } from "@angular/core";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { NavController } from "ionic-angular";
import * as moment from "moment";
import { BlogProvider } from "../../providers/blog/blog";

@Component({
  selector: "article-card",
  templateUrl: "article-card.html"
})
export class ArticleCardComponent {
  @Input() article: object = {};
  @Input() categoryLink: boolean = false;

  constructor(
    public navCtrl: NavController,
    private iab: InAppBrowser,
    private blogProvider: BlogProvider
  ) {}

  openBrowser(sitio: string) {
    const browser = this.iab.create(sitio);
    browser.show();
  }

  goToCategory(category: string) {
    if (this.categoryLink) this.navCtrl.push("ArticlesListPage", { category });
  }

  articleDate() {
    moment.locale("es");
    return moment(this.article["_source"]["date"].substr(0, 11), 'YYYY-MM-DD hh:mm:ss').format(
      "DD-MMM-YYYY"
    );
  }

  getCategorie(categories: Array<any>) {
    let a: object;
    this.blogProvider.categories.map(data => {
      for (let cat of categories) {
        if (data.slug === cat.slug) {
          a = data;
          break;
        }
      }
    });
    return a;
  }
}
