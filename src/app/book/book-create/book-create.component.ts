import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Author } from 'src/app/author/author';
import { AuthorService } from 'src/app/author/author.service';
import { Editorial } from 'src/app/editorial/editorial';
import { EditorialService } from 'src/app/editorial/editorial.service';
import { BookDetail } from '../book-detail';
import { BookService } from '../book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: [],
})
export class BookCreateComponent implements OnInit {
  authors!: Author[];
  bookAuthors!: Author[];
  bookForm!: FormGroup;
  editorials!: Editorial[];

  constructor(
    private bookService: BookService,
    private editorialService: EditorialService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private authorService: AuthorService,
    private router: Router
  ) {}

  getEditorials(): void {
    this.editorialService.getEditorials().subscribe({
      next: apiData => this.editorials = apiData,
      error: e => this.toastrService.error(e, 'Error')
    });
  }

  getAuthors(): void {
    this.authorService.getAuthors().subscribe({
      next: apiData => this.authors = apiData,
      error: e => this.toastrService.error(e, 'Error')
    });
  }

  createBook(book: BookDetail) {
    if (!this.bookForm.valid) return;

    const date = this.bookForm.controls['publishingDate'].value;
    const formattedDate: Date = new Date(date);
    book.publishingDate = formattedDate;
    const authorId = this.bookForm.get('authors')!.value;

    this.bookService.createBook(book).subscribe({
      next: apiDataBook => {
        this.toastrService.success('The book was created successfully');
        this.bookService.createAuthorBook(apiDataBook.id, authorId).subscribe({
          next: apiDataAuthorBook => {
            this.toastrService.success(
              'The author was associated successfully'
            );
            this.router.navigate(['/books/list']);
            this.bookForm.reset();
          },
          error: errorAssociation => {
            this.toastrService.error(errorAssociation, 'Error');
          }
        });
      },
      error: errorBook => {
        this.toastrService.error(errorBook, 'Error');
      }
    });
  }

  cancelCreation(): void {
    this.toastrService.warning("The book wasn't created", 'Book creation');
    this.bookForm.reset();
  }

  ngOnInit() {
    this.getEditorials();
    this.getAuthors();

    this.bookForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      authors: ['', [Validators.required]],
      publishingDate: ['', [Validators.required]],
      description: ['', [Validators.required]],
      isbn: ['', [Validators.required]],
      image: ['', [Validators.required]],
      editorial: ['', [Validators.required]],
    });
  }
}
