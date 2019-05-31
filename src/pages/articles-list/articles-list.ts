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
  page: number = 0;
  total: number;
  errorMessage: string = "";
  pageSize = 5;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private blogProvider: BlogProvider
  ) {}

  ionViewDidLoad() {
    this.category = this.blogProvider.searchCategoryBySlugName(
      this.navParams.get("category")
    );
    this.getArticles();
  }

  getArticles() {
    this.blogProvider
      .getByCategory(this.category["slug"], this.pageSize, this.page)
      .then(data => {
        this.articles = data["hits"]["hits"];
        this.total = Math.round(data["hits"]["total"] / this.pageSize);
      });
  }

  paginate(ev) {
    this.page++;
    if (this.page <= this.total) {
      setTimeout(() => {
        this.blogProvider
          .getByCategory(this.category["slug"], this.pageSize, this.page)
          .then(data => {
            data["hits"]["hits"].forEach(element => {
              this.articles.push(element);
            });
          });
        ev.complete();
      }, 2000);
    }
  }
}
