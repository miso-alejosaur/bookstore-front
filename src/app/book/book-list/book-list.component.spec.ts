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

  function updateBookList(): void {
    debugBookDetail = component.books.pop()!;
    fixture.detectChanges();
  }

  function findDeletedBook(): boolean {
    //TODO: preguntar si se debe revisar el component o el html
    for (var b in component.books) {
      if(component.books[b].id == debugBookDetail.id) {
        return true;
      }
    }
    return false;
  }

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
    expect(debug.queryAll(By.css('img'))[4].attributes['src']).toEqual(
      component.books[4].image
    );
  });

  it('should have the corresponding alt to the book name', () => {
    expect(debug.queryAll(By.css('img'))[4].attributes['alt']).toEqual(
      component.books[4].name
    );
  });

  it('should have h5 tag with the book.name', () => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const h5 = componentElement.querySelectorAll('h5')!;
    expect(h5[4].textContent).toContain(component.books[4].name);
  });

  it('should have p tag with the book.editorial.name', () => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const p = componentElement.querySelectorAll('p')!;
    expect(p[4].textContent).toContain(component.books[4].editorial.name);
  });

  it('should have 9 <div.col.mb-2> elements and the deleted book should not exist', () => {
    updateBookList();
    expect(debug.queryAll(By.css('div.col.mb-2')).length == 9).toBeTrue();
    expect(findDeletedBook()).toBeFalse();
  });

});
