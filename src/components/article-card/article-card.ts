import { Component, Input } from "@angular/core";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { NavController } from "ionic-angular";
import * as moment from "moment";

@Component({
  selector: "article-card",
  templateUrl: "article-card.html"
})
export class ArticleCardComponent {
  @Input() article: object = {};
  @Input() categoryLink: boolean = false;

  constructor(public navCtrl: NavController, private iab: InAppBrowser) {
    
  }

  openBrowser(sitio: string) {
    const browser = this.iab.create(sitio);
    browser.show();
  }

  goToCategory(category: string) {
    if(this.categoryLink)
      this.navCtrl.push("ArticlesListPage", {category});
  }
  
  articleDate(){
    moment.locale("es")
    return moment(this.article['_source']["date"].substr(0, 11)).format('DD-MMM-YYYY');
  }
}
