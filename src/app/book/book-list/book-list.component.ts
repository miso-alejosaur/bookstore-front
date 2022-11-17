import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookDetail } from '../book-detail';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Array<BookDetail> = [];
  selected: Boolean = false;
  selectedBook!: BookDetail;
  p: number = 1;
  searchedBook: any;

  constructor(private bookService: BookService) { }

  getBooks(): void {
    this.bookService.getBooks().subscribe({next: books => this.books = books , error: e => console.error(e)});
  }

  onSelected(book: BookDetail): void {
    this.selected = true;
    this.selectedBook = book;
  }

  ngOnInit() {
    this.getBooks();
  }

}
