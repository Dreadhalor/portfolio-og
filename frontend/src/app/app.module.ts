import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ViewerComponent } from './components/viewer/viewer.component';
import { SafePipe } from './pipes/safe.pipe';
import { AppIconComponent } from './components/app-icon/app-icon.component';
import { AppIconTwoComponent } from './components/app-icon-two/app-icon-two.component';
import { NavbarTwoComponent } from './components/navbar-two/navbar-two.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, ViewerComponent, SafePipe, AppIconComponent, AppIconTwoComponent, NavbarTwoComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [SafePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
