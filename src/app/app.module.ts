import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { OnsenModule } from 'ngx-onsenui';
import { HttpClientModule, HttpHeaders  } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { ApolloLink, concat } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from "apollo-cache-inmemory";

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
import { ItemFormComponent } from './views/item-form/item-form.component';
import { ShowcaseCategoryComponent } from './components/showcase-category/showcase-category.component';
import { BuyerValidationComponent } from './views/buyer-validation/buyer-validation.component';
import { CheckoutComponent } from './views/checkout/checkout.component';
import { AuthComponent } from './views/auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShowcaseComponent,
    SingleItemComponent,
    ShopCarouselComponent,
    KindCarouselComponent,
    ShowcaseItemComponent,
    ItemFormComponent,
    ShowcaseCategoryComponent,
    BuyerValidationComponent,
    CheckoutComponent,
    AuthComponent
  ],
  entryComponents: [
    ShowcaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    OnsenModule,
    ReactiveFormsModule,
    FormsModule,
    ApolloModule,
    HttpLinkModule,
    HttpClientModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  private URI = environment.apiBase;
  private apiKey = environment.apiKey;
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {

    const http = httpLink.create({ uri: `${this.URI}/graphql` });
    const authMiddleware = new ApolloLink((operation, forward) => {
      // add the authorization to the headers
      operation.setContext({
        headers: new HttpHeaders({
          'App-Key': this.apiKey,
          'Authorization': `Bearer ${localStorage.getItem('ecommerce-user-token') || null}`,
          'Content-Type': 'application/json'
        })
      });

      return forward(operation);
    });

    apollo.create({
      link: concat(authMiddleware, http),
      cache: new InMemoryCache()
    });
  }
}
