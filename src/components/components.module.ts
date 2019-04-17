import { NgModule } from '@angular/core';
import { ArticleCardComponent } from './article-card/article-card';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
@NgModule({
	declarations: [ArticleCardComponent],
	imports: [ CommonModule,
		IonicModule,],
	exports: [ArticleCardComponent]
})
export class ComponentsModule {}
