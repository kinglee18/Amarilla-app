import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapaPage } from './mapa';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

@NgModule({
  declarations: [
    MapaPage,
  ],
  imports: [
    IonicPageModule.forChild(MapaPage),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDWu9yo0YwzlueZVxWc_498AFesUCIiBYY'
    }),
    AgmDirectionModule
  ],
})
export class MapaPageModule {}
