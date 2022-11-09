/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, DebugNode } from '@angular/core';

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
    const element: HTMLElement = debug.query(By.css('p.h3.p-3')).nativeElement;
    expect(element.textContent).toContain(component.bookDetail.name);
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

  it('should have 3(Authors) <a> elements', () => {
    expect(debug.queryAll(By.css('dd.caption > a')).length == 3).toBeTrue();
  });

  it('should have a routerLink=/authors/author.id for each author', () => {
    for (let i = 0; i < authorsSize; i++) {
      expect(debug.queryAll(By.css('a'))[i].attributes['ng-reflect-router-link'])
      .toContain('/authors/' + component.bookDetail.authors[i].id);
    }
  });

  it('should have a tag with component.bookDetail.authors[i].name', () => {
    for (let i = 0; i < authorsSize; i++) {
      const componentElement: HTMLElement = debug.queryAll(By.css('dd.caption > a'))[i].nativeElement;
      expect(componentElement.textContent).toContain(component.bookDetail.authors[i].name);
    }
  });

  it('should have one dd tag for component.bookDetail.isbn', () => {
    const allDt : DebugElement[]= debug.queryAll(By.css('dt'));
    let nodo = allDt.find((value) => {
      return value.nativeElement.textContent == 'ISBN';
    });
    expect(nodo?.nativeElement.nextSibling.textContent).toContain(component.bookDetail.isbn);
  });

  it('should have one dd tag for component.bookDetail.publishingDate', () => {
    const allDt : DebugElement[]= debug.queryAll(By.css('dt'));
    let nodo = allDt.find((value) => {
      return value.nativeElement.textContent == 'Publishing Date';
    });
    expect(nodo?.nativeElement.nextSibling.textContent).toContain(component.bookDetail.publishingDate);
  });

  it('should have one dd tag for component.bookDetail.editorial.name', () => {
    const allDt : DebugElement[]= debug.queryAll(By.css('dt'));
    let nodo = allDt.find((value) => {
      return value.nativeElement.textContent == 'Editorial';
    });
    expect(nodo?.nativeElement.nextSibling.textContent).toContain(component.bookDetail.editorial.name);
  });

  it('should have one dd tag for component.bookDetail.description', () => {
    const allDt : DebugElement[]= debug.queryAll(By.css('dt'));
    let nodo = allDt.find((value) => {
      return value.nativeElement.textContent == 'Description';
    });
    expect(nodo?.nativeElement.nextSibling.textContent).toContain(component.bookDetail.description);
  });

});
