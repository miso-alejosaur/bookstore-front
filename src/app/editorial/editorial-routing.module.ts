import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorialCreateComponent } from './editorial-create/editorial-create.component';
import { EditorialListComponent } from './editorial-list/editorial-list.component';

const routes: Routes = [
  {
    path: 'editorials',
    children: [
      { path: 'create', component: EditorialCreateComponent },
      {
        path: 'list',
        component: EditorialListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditorialRoutingModule {}
