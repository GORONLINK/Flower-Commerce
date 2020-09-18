import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ShowcaseComponent } from './views/showcase/showcase.component';
import { SingleItemComponent } from './views/single-item/single-item.component';
import { ItemFormComponent } from './views/item-form/item-form.component';
import { BuyerValidationComponent } from './views/buyer-validation/buyer-validation.component';
import { CheckoutComponent } from './views/checkout/checkout.component';
import { AuthComponent } from './views/auth/auth.component';


const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "showcase",
    component: ShowcaseComponent
  },
  {
    path: "auth",
    component: AuthComponent
  },
  {
    path: "verification",
    component: AuthComponent
  },
  {
    path: "item/:id",
    component: SingleItemComponent
  },
  {
    path: "item-form",
    component: ItemFormComponent
  },
  {
    path: "basket/:mode",
    component: BuyerValidationComponent
  },
  {
    path: "checkout/:mode",
    component: CheckoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
