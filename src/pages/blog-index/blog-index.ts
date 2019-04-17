import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { BlogProvider } from "../../providers/blog/blog";

@IonicPage({ name: "BlogIndexPage" })
@Component({
  selector: "page-blog-index",
  templateUrl: "blog-index.html"
})
export class BlogIndexPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private blogProvider: BlogProvider
  ) {}

  getCategories() {
    return this.blogProvider.categories;
  }

  goToCategory(item) {
    this.navCtrl.push("ArticlesListPage", { category: item.slug });
  }
}
