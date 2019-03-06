import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {
  MatToolbarModule, MatIconModule, MatButtonModule, MatSidenavModule, MatCardModule,
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderMainComponent } from './header-main/header-main.component';
import { HeaderSubMainComponent } from './header-sub-main/header-sub-main.component';
import { ButtonIconComponent } from './parts/button-icon/button-icon.component';
import { ExamplesComponent } from './examples/examples.component';
import { ProfileTextAllComponent } from './parts/profile-text-all/profile-text-all.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderMainComponent,
    HeaderSubMainComponent,
    ButtonIconComponent,
    ExamplesComponent,
    ProfileTextAllComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
