import { Author } from '../author/author';
import { Editorial } from '../editorial/editorial';
import { Book } from './book';
import { Review } from './review';

export class BookDetail extends Book {
  authors: Array<Author> = [];
  reviews: Array<Review> = [];

  constructor(
    id: number,
    name: string,
    isbn: string,
    description: string,
    image: string,
    publishingdate: any,
    editorial: Editorial,
    authors: Array<Author>,
    reviews: Array<Review>
  ) {
    super(id, name, isbn, description, image, publishingdate, editorial);
    this.authors = authors;
    this.reviews = reviews;
  }
}
