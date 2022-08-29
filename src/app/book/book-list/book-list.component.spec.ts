/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { asNativeElements, DebugElement } from '@angular/core';
import { faker } from '@faker-js/faker';

import { BookListComponent } from './book-list.component';
import { HttpClientModule } from '@angular/common/http';
import { Editorial } from 'src/app/editorial/editorial';
import { BookService } from '../book.service';
import { BookDetail } from '../book-detail';
import { RouterTestingModule } from '@angular/router/testing';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let debug: DebugElement;
  let debugBookDetail: BookDetail;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [ BookListComponent ],
      providers: [ BookService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;

    let editorial = new Editorial(
      faker.datatype.number(),
      faker.lorem.sentence()
    );

    let testBooks: Array<BookDetail> = [];

    for(let i = 0; i<10; i++) {
      testBooks[i] = new BookDetail(
        faker.datatype.number(),
        faker.lorem.sentence(),
        faker.lorem.sentence(),
        faker.lorem.sentence(),
        faker.image.imageUrl(),
        faker.date.past(),
        editorial,
        [],[]
      );
    }

    component.books = testBooks;
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 10 <div.col.mb-2> elements', () => {
    expect(debug.queryAll(By.css('div.col.mb-2')).length == 10).toBeTrue();
  });

  it('should have 10 <card.p-2> elements', () => {
    expect(debug.queryAll(By.css('div.card.p-2')).length == 10).toBeTrue();
  });

  it('should have 10 <img> elements', () => {
    expect(debug.queryAll(By.css('img')).length == 10).toBeTrue();
  });

  it('should have 10 <div.card-body> elements', () => {
    expect(debug.queryAll(By.css('div.card-body')).length == 10).toBeTrue();
  });

  it('should have the corresponding src to the book image', () => {
    for(let i = 0; i<debug.queryAll(By.css('img')).length; i++) {
      expect(debug.queryAll(By.css('img'))[i].attributes['src']).toEqual(
        component.books[i].image
      );
    }
  });

  it('should have the corresponding alt to the book name', () => {
    for(let i=0; i<debug.queryAll(By.css('img')).length; i++) {
      expect(debug.queryAll(By.css('img'))[i].attributes['alt']).toEqual(
        component.books[i].name
      );
    }
  });

  it('should have h5 tag with the book.name', () => {
    for(let i = 0; i < debug.queryAll(By.css('h5')).length; i++) {
      const element: HTMLElement = debug.queryAll(By.css('h5'))[i].nativeElement;
      expect(element.textContent).toContain(component.books[i].name);
    }
  });

  it('should have p tag with the book.editorial.name', () => {
    for(let i = 0; i < debug.queryAll(By.css('p')).length; i++) {
      const element: HTMLElement = debug.queryAll(By.css('p'))[i].nativeElement;
      expect(element.textContent).toContain(component.books[i].editorial.name);
    }
  });

  it('should have 9 <div.col.mb-2> elements and the deleted book should not exist', () => {
    debugBookDetail = component.books.pop()!;
    fixture.detectChanges();
    expect(debug.queryAll(By.css('div.col.mb-2')).length == 9).toBeTrue();

    for (let i =0; i < debug.queryAll(By.css('div.col.mb-2')).length; i++) {
      const element: HTMLElement = debug.queryAll(By.css('div.col.mb-2'))[i].nativeElement;
      expect(element.textContent).not.toContain(debugBookDetail.name);
    }
  });
});
