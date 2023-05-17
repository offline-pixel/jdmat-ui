import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductComponent } from './list-product.component'

import { ListProductRoutingModule } from './list-product-routing.module';
import { SharedModule } from '../../_modules/shared/shared.module';
@NgModule({
  declarations: [ListProductComponent],
  imports: [
    CommonModule,
    ListProductRoutingModule,
    SharedModule
  ]
})
export class ListProductModule { }
