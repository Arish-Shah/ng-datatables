import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { DatatablesComponent } from './datatables.component';
import { Transform } from './pipes/transform.pipe';
import { AddComponent } from './dialogs/add/add.component';
import { EditComponent } from './dialogs/edit/edit.component';
import { DeleteComponent } from './dialogs/delete/delete.component';

@NgModule({
  declarations: [
    DatatablesComponent,
    AddComponent,
    EditComponent,
    DeleteComponent,
    Transform
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule
  ],
  exports: [DatatablesComponent]
})
export class DatatablesModule {}