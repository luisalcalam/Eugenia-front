import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DataTableComponent } from './components/data-table/data-table.component';
import { SearchComponent } from './components/search/search.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { SvgComponent } from './components/svg/svg.component';
import { TitileComponent } from './components/titile/titile.component';
import { DialogGeneralComponent } from './components/dialogs/dialog-general/dialog-general.component';
import { DialogConfirmComponent } from './components/dialogs/dialog-confirm/dialog-confirm.component';

@NgModule({
  declarations: [
    DataTableComponent,
    SearchComponent,
    SvgComponent,
    PaginatorComponent,
    TitileComponent,
    DialogGeneralComponent,
    DialogConfirmComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  exports: [DataTableComponent, TitileComponent],
})
export class SharedModule {}
