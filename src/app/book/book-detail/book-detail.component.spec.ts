/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BookDetailComponent } from './book-detail.component';
import { faker } from '@faker-js/faker';
import { BookDetail } from '../book-detail';
import { Editorial } from 'src/app/editorial/editorial';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { AuthorDetail } from 'src/app/author/author-detail';

describe('BookDetailComponent', () => {
  let component: BookDetailComponent;
  let fixture: ComponentFixture<BookDetailComponent>;
  let debug: DebugElement;
  let authorsSize: number;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule, RouterTestingModule],
      declarations: [ BookDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailComponent);
    component = fixture.componentInstance;
    authorsSize = 3;

    let editorial = new Editorial(
      faker.datatype.number(),
      faker.lorem.sentence()
    );

    let autores = Array(authorsSize);
    for (let i = 0; i < authorsSize; i++) {
      autores[i] = new AuthorDetail(
        faker.datatype.number(),
        faker.lorem.sentence(),
        faker.datatype.number(),
        faker.lorem.sentence(),
        faker.lorem.sentence(),
        []
      );
    }
    component.bookDetail= new BookDetail(
        faker.datatype.number(),
        faker.lorem.sentence(),
        faker.lorem.sentence(),
        faker.lorem.sentence(),
        faker.image.imageUrl(),
        faker.date.past(),
        editorial,
        autores,[]
      );

    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a p.h3.p-3 element with bookDetail.name', () => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const p = componentElement.querySelectorAll('p.h3.p-3')!;
    expect(p[0].textContent).toContain(component.bookDetail.name);
  });

  it('should have an img element with alt= bookDetail.name', () => {
    expect(debug.query(By.css('img')).attributes['alt']).toEqual(
      component.bookDetail.name
    );
  });

  it('should have an img element with src= bookDetail.image', () => {
    expect(debug.query(By.css('img')).attributes['src']).toEqual(
      component.bookDetail.image
    );
  });

  it('should have 1(bookDetail.Editorial.name) + 3(Authors) <dd.caption> elements', () => {
    expect(debug.queryAll(By.css('dd.caption')).length == 4).toBeTrue();
  });

  it('should have a routerLink=/authors/author.id for each author', () => {
    for (let i = 0; i < authorsSize; i++) {
      expect(debug.queryAll(By.css('a'))[i].attributes['ng-reflect-router-link'])
      .toContain('/authors/' + component.bookDetail.authors[i].id);
    }
  });

  it('should have an a tag with component.bookDetail.authors[i].name', () => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const a = componentElement.querySelectorAll('a')!;
    for (let i = 0; i < authorsSize; i++) {
     expect(a[i].textContent).toContain(component.bookDetail.authors[i].name);
    }
  });

  it('should have one dd tag for component.bookDetail.isbn', () => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const dd = componentElement.querySelectorAll('dd')!;
    let ans = false;
    for (let i = 0; i < dd.length; i++) {
      if(dd[i].textContent?.includes(component.bookDetail.isbn)) {
        ans = true;
      }
    }
    expect(ans).toBeTrue();
  });

  it('should have one dd tag for component.bookDetail.publishingDate', () => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const dd = componentElement.querySelectorAll('dd')!;
    let ans = false;
    for (let i = 0; i < dd.length; i++) {
      if(dd[i].textContent?.includes(component.bookDetail.publishingDate)) {
        ans = true;
      }
    }
    expect(ans).toBeTrue();
  });

  it('should have one dd tag for component.bookDetail.editorial.name', () => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const dd = componentElement.querySelectorAll('dd')!;
    let ans = false;
    for (let i = 0; i < dd.length; i++) {
      if(dd[i].textContent?.includes(component.bookDetail.editorial.name)) {
        ans = true;
      }
    }
    expect(ans).toBeTrue();
  });

  it('should have one dd tag for component.bookDetail.description', () => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const dd = componentElement.querySelectorAll('dd')!;
    let ans = false;
    for (let i = 0; i < dd.length; i++) {
      if(dd[i].textContent?.includes(component.bookDetail.description)) {
        ans = true;
      }
    }
    expect(ans).toBeTrue();
  });

});
