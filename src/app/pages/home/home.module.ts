import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { DashboardPipesModule } from '../../pipes/dashboard-pipes.module';
import { AbsoluteNumberPipe } from '../../pipes/absolute-number.pipe';

import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPipesModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage],
  providers: [AbsoluteNumberPipe]
})
export class HomePageModule {}
