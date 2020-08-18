import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { OnsenModule } from 'ngx-onsenui';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HomeComponent } from './views/home/home.component';
import { ShowcaseComponent } from './views/showcase/showcase.component';
import { SingleItemComponent } from './views/single-item/single-item.component';
import { ShopCarouselComponent } from './components/shop-carousel/shop-carousel.component';
import { KindCarouselComponent } from './components/kind-carousel/kind-carousel.component';
import { ShowcaseItemComponent } from './components/showcase-item/showcase-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShowcaseComponent,
    SingleItemComponent,
    ShopCarouselComponent,
    KindCarouselComponent,
    ShowcaseItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    OnsenModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
