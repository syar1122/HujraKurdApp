import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SectionsPageRoutingModule } from './sections-routing.module';

import { SectionsPage } from './sections.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SectionsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SectionsPage]
})
export class SectionsPageModule { }
