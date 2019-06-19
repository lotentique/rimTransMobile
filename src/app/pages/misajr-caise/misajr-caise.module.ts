import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MisajrCaisePage } from './misajr-caise.page';

const routes: Routes = [
  {
    path: '',
    component: MisajrCaisePage
  }
];
 
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MisajrCaisePage]
})
export class MisajrCaisePageModule {}
