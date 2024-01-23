import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { NewInvitationComponent } from './new-invitation/new-invitation.component';
import { EditInvitationComponent } from './edit-invitation/edit-invitation.component';

// localhost:4200/auth/
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'invitations', component: HomeComponent },
      { path: 'new-invitation', component: NewInvitationComponent },
      { path: 'edit-invitation/:id', component: EditInvitationComponent },
      { path: '**', redirectTo: 'invitations' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRoutingModule {}
