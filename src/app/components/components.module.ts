import { NgModule } from "@angular/core";
import { SpinnerComponent } from './spinner/spinner.component';
import { ZSidemenuComponent } from './z-sidemenu/z-sidemenu.component';
import { AppRoutingModule } from '../app-routing.module';
import { IonicModule } from '@ionic/angular';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [SpinnerComponent],
    exports: [SpinnerComponent]
})

export class ComponentsModule { }
