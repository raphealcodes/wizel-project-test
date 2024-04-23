import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesComponent } from './features.component';
import { FeaturesRoutingModule } from './features-routing.module';
import { SharedModule } from '../_shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    SharedModule
  ],
  declarations: [FeaturesComponent]
})
export class FeaturesModule { }
