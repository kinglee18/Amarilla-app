import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsPage } from './tabs';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    TabsPage, 
    ComponentsModule
  ],
  imports: [
    IonicPageModule.forChild(TabsPage),
  ]
})
export class TabsPageModule {}
