import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookCreateComponent } from './book-create/book-create.component';


const routes: Routes = [{
  path: 'books',
  children: [
    {
      path: 'create',
      component: BookCreateComponent
    },
    {
      path: 'list',
      component: BookListComponent
    },
    {
      path: ':id',
      component: BookDetailComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
