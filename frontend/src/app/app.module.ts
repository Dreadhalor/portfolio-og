import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewerComponent } from './components/viewer/viewer.component';
import { SafePipe } from './pipes/safe.pipe';
import { AppIconComponent } from './components/app-icon/app-icon.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewerComponent,
    SafePipe,
    AppIconComponent,
    NavbarComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [SafePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
