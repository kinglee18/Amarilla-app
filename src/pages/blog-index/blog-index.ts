import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { BlogProvider } from "../../providers/blog/blog";

@IonicPage({ name: "BlogIndexPage" })
@Component({
  selector: "page-blog-index",
  templateUrl: "blog-index.html"
})
export class BlogIndexPage {
  categories: Array<object>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private blogProvider: BlogProvider
  ) {
    this.categories = this.blogProvider.categories;
    for (let x of this.categories) {
      x["image"] = this.randomNumber(x["imgPrefixName"]);
      x['count'] = this.navParams.get(x['slug'])
    }
  }

  getCategories() {
    return this.categories;
  }

  goToCategory(item) {
    this.navCtrl.push("ArticlesListPage", { category: item.slug });
  }

  randomNumber(name: string, limit = 4) {
    return `${name}_${Math.floor(Math.random() * limit + 1)}`;
  }

  
}
