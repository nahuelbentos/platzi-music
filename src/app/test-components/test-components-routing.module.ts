import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestComponentsPage } from './test-components.page';

const routes: Routes = [
  {
    path: '',
    component: TestComponentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestComponentsPageRoutingModule {}
