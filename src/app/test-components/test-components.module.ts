import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestComponentsPageRoutingModule } from './test-components-routing.module';

import { TestComponentsPage } from './test-components.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TestComponentsPageRoutingModule],
  declarations: [TestComponentsPage]
})
export class TestComponentsPageModule {}
