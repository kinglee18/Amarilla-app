import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { BlogProvider } from "../../providers/blog/blog";


@IonicPage()
@Component({
  selector: "page-articles-list",
  templateUrl: "articles-list.html"
})
export class ArticlesListPage {
  articles: Array<object>;
  category: object = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private blogProvider: BlogProvider
  ) {}

  ionViewDidLoad() {
    this.category = this.blogProvider.searchCategoryBySlugName(this.navParams.get('category'));
    this.getArticles();
  }

  getArticles() {
    this.blogProvider.getByCategory(this.category['slug'], 5).then(data => {
      this.articles = data["hits"]["hits"];
    });
  }
}
