import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MountainsComponent} from "./mountains/mountains.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {EndpageComponent} from "./endpage/endpage.component";
import {TestComponent} from "./test/test.component";


const routes: Routes = [
  {
    path: 'mountains', component: MountainsComponent,
  },
  {
    path: 'homepage', component: HomepageComponent
  },
  {
    path: 'endpage', component: EndpageComponent
  },
  {
    path: '',   redirectTo: '/homepage', pathMatch: 'full' },
  {
    path: 'test', component: TestComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {'useHash': true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
