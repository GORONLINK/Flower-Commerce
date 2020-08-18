import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ShowcaseComponent } from './views/showcase/showcase.component';
import { SingleItemComponent } from './views/single-item/single-item.component';


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
    path: "item/:id",
    component: SingleItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
