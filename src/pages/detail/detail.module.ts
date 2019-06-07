import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailPage } from './detail';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    DetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailPage),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDWu9yo0YwzlueZVxWc_498AFesUCIiBYY'
    })
  ],
})
export class DetailPageModule {}
