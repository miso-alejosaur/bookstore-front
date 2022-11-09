import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { RouterModule } from '@angular/router';
import { BookRoutingModule } from './book-routing.module';
import { BookCreateComponent } from './book-create/book-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [CommonModule, RouterModule, BookRoutingModule, ReactiveFormsModule, NgxPaginationModule],
  exports: [BookListComponent],
  declarations: [BookListComponent, BookDetailComponent, BookCreateComponent],
})
export class BookModule {}
