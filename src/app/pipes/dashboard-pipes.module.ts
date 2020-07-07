import { NgModule } from '@angular/core';
import { AbsoluteNumberPipe } from './absolute-number.pipe';

@NgModule({
  imports: [],
  declarations: [
    AbsoluteNumberPipe
  ],
  exports: [
    AbsoluteNumberPipe
  ]
})
export class DashboardPipesModule { }
