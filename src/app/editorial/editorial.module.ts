import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorialListComponent } from './editorial-list/editorial-list.component';
import { RouterModule } from '@angular/router';
import { EditorialRoutingModule } from './editorial-routing.module';
import { EditorialCreateComponent } from './editorial-create/editorial-create.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    EditorialRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [EditorialListComponent, EditorialCreateComponent],
})
export class EditorialModule {}
