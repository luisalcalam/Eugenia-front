import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { MaterialModule } from '../material/material.module';
import { HomeComponent } from './home/home.component';
import { PageRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [LayoutComponent, HomeComponent],
  imports: [CommonModule, PageRoutingModule, MaterialModule],
})
export class PagesModule {}
