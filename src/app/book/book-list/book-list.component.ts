import { Component, OnInit } from '@angular/core';
import { BookDetail } from '../book-detail';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Array<BookDetail> = [];
  selected: boolean = false;
  selectedBook!: BookDetail;
  p: number = 1;
  searchedBook: any;

  constructor(private bookService: BookService) { }

  getBooks(): void {
    this.bookService.getBooks().subscribe({next: apiData => this.books = apiData , error: e => console.error(e)});
  }

  onSelected(book: BookDetail): void {
    this.selected = true;
    this.selectedBook = book;
  }

  ngOnInit() {
    this.getBooks();
  }

}
