import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExamplesComponent } from './examples/examples.component';
import { TopComponent } from './top/top.component';

const routes: Routes = [
  {
    path: '',
    component: TopComponent,
  },
  {
    path: 'examples',
    component: ExamplesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
