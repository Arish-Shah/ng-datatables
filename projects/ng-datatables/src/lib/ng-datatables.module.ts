import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';
import { RouterModule, Routes } from '@angular/router';

import { NgDatatablesComponent } from './ng-datatables.component';
import { TableComponent } from './components/table/table.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { Transform } from './pipes/transform.pipe';

const appRoutes: Routes = [
  { path: '', component: TableComponent },
  { path: 'add', component: AddComponent },
  { path: 'edit', component: EditComponent }
];

@NgModule({
  declarations: [
    NgDatatablesComponent,
    TableComponent,
    AddComponent,
    EditComponent,
    Transform
  ],
  imports: [
    BrowserModule,
    RouterModule,
    RouterModule.forRoot(appRoutes),
    DataTablesModule
  ],
  exports: [NgDatatablesComponent]
})
export class NgDatatablesModule {}
