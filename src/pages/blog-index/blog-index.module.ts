import { NgModule } from "@angular/core";
import { IonicModule } from "ionic-angular";
import { IonicPageModule } from "ionic-angular";
import { BlogIndexPage } from "./blog-index";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [BlogIndexPage],
  imports: [IonicPageModule.forChild(BlogIndexPage), CommonModule, IonicModule]
})
export class BlogIndexPageModule {}
