import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { MaterialModule } from '../material/material.module';
import { HomeComponent } from './home/home.component';
import { PageRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NewInvitationComponent } from './new-invitation/new-invitation.component';
import { EditInvitationComponent } from './edit-invitation/edit-invitation.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    NewInvitationComponent,
    EditInvitationComponent,
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class PagesModule {}
