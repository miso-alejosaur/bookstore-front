import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Author } from 'src/app/author/author';
import { AuthorService } from 'src/app/author/author.service';
import { Editorial } from 'src/app/editorial/editorial';
import { EditorialService } from 'src/app/editorial/editorial.service';
import { Book } from '../book';
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
    this.editorialService.getEditorials().subscribe(
      (editorials) => {
        this.editorials = editorials;
      },
      (err) => {
        this.toastrService.error(err, 'Error');
      }
    );
  }

  getAuthors(): void {
    this.authorService.getAuthors().subscribe(
      (auth) => {
        this.authors = auth;
      },
      (err) => {
        this.toastrService.error(err, 'Error');
      }
    );
  }

  createBook(book: BookDetail) {
    if (!this.bookForm.valid) return;

    const date = this.bookForm.controls['publishingDate'].value;
    const formattedDate: Date = new Date(date);
    book.publishingDate = formattedDate;
    const authorId = this.bookForm.get('authors')!.value;

    this.bookService.createBook(book).subscribe(
      (b: Book) => {
        this.toastrService.success('The book was created successfully');
        this.bookService.createAuthorBook(b.id, authorId).subscribe(
          () => {
            this.toastrService.success(
              'The author was associated successfully'
            );
          },
          (err: string) => {
            this.toastrService.error(err, 'Error');
          }
        );

        this.router.navigate(['/books/list']);
        this.bookForm.reset();
      },
      (err: string) => {
        this.toastrService.error(err, 'Error');
      }
    );
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
