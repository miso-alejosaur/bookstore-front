import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookDetail } from '../book-detail';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  bookId!: string;
  @Input() bookDetail!: BookDetail;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService) { }

  getBook(){
    this.bookService.getBook(this.bookId).subscribe(apiData => {
      this.bookDetail = apiData;
    })
  }

  ngOnInit() {
    if(this.bookDetail === undefined){
      this.bookId = this.route.snapshot.paramMap.get('id')!
      if(this.bookId){
        this.getBook();
      }
    }
  }

}
