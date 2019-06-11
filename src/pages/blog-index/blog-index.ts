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
      x["image"] = this.imageName(x["imgPrefixName"]);
      this.getArticleInfo(x["slug"], x);
    }
  }

  ionViewWillEnter() {
    for (let x of this.categories) {
      x["image"] = this.imageName(x["imgPrefixName"]);
    }
  }

  getCategories() {
    return this.categories;
  }

  goToCategory(item) {
    this.navCtrl.push("ArticlesListPage", { category: item.slug });
  }

  imageName(name: string, limit = 4) {
    return `${name}_${Math.floor(Math.random() * limit + 1)}`;
  }

  getArticleInfo(catName: string, item) {
    this.blogProvider.getByCategory(catName).then((data: Array<any>) => {
      item["count"] = data["hits"]["total"];
    }).catch(e=>{console.error(e)});
  }
}
