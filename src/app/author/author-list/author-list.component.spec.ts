/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { faker } from '@faker-js/faker';

import { AuthorListComponent } from './author-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { AuthorDetail } from '../author-detail';
import { BookDetail } from 'src/app/book/book-detail';
import { Editorial } from 'src/app/editorial/editorial';

describe('AuthorListComponent', () => {
  let component: AuthorListComponent;
  let fixture: ComponentFixture<AuthorListComponent>;
  let debug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule, RouterTestingModule],
      declarations: [ AuthorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorListComponent);
    component = fixture.componentInstance;

    let testAuthors: Array<AuthorDetail>= [];
    let testBooks: Array<BookDetail> = [];
    let editorial = new Editorial(
      faker.datatype.number(),
      faker.lorem.sentence()
    );

    for(let i = 0; i<2; i++) {
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
    for(let i = 0; i<10; i++) {
      testAuthors[i] = new AuthorDetail(
        faker.datatype.number(),
        faker.lorem.sentence(),
        faker.lorem.sentence(),
        faker.lorem.sentence(),
        faker.image.imageUrl(),
        testBooks
      );
    }

    component.authors = testAuthors;

    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 10 <div.book-card> elements', () => {
    expect(debug.queryAll(By.css('div.book-card')).length == 10).toBeTrue();
  });

  it('should have 10 <img> elements', () => {
    expect(debug.queryAll(By.css('img')).length == 10).toBeTrue();
  });

  it('should have the corresponding src to the author image', () => {
    for(let i = 0; i<debug.queryAll(By.css('img')).length; i++) {
      expect(debug.queryAll(By.css('img'))[i].attributes['src']).toEqual(
        component.authors[i].image
      );
    }
  });

  it('should have the corresponding alt to the author name', () => {
    for(let i=0; i<debug.queryAll(By.css('img')).length; i++) {
      expect(debug.queryAll(By.css('img'))[i].attributes['alt']).toEqual(
        component.authors[i].name
      );
    }
  });

  it('should have h5 tag with the author.name', () => {
    for(let i = 0; i < debug.queryAll(By.css('h5')).length; i++) {
      const element: HTMLElement = debug.queryAll(By.css('h5'))[i].nativeElement;
      expect(element.textContent).toContain(component.authors[i].name);
    }
  });

  it('should have p tag with the author.birthDate', () => {
    for(let i = 0; i < debug.queryAll(By.css('p')).length; i++) {
      const element: HTMLElement = debug.queryAll(By.css('p'))[i].nativeElement;
      expect(element.textContent).toContain(component.authors[i].birthDate);
    }
  });

});
