import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticlesListPage } from './articles-list';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ArticlesListPage,
  ],
  imports: [
    IonicPageModule.forChild(ArticlesListPage),
    ComponentsModule
  ],
})
export class ArticlesListPageModule {}
