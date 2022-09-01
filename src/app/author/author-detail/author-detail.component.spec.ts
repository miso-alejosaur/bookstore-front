/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { faker } from '@faker-js/faker';

import { AuthorDetailComponent } from './author-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { AuthorDetail } from '../author-detail';
import { BookDetail } from 'src/app/book/book-detail';
import { Editorial } from 'src/app/editorial/editorial';

describe('AuthorDetailComponent', () => {
  let component: AuthorDetailComponent;
  let fixture: ComponentFixture<AuthorDetailComponent>;
  let debug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule, RouterTestingModule],
      declarations: [ AuthorDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorDetailComponent);
    component = fixture.componentInstance;

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

    component.authorDetail = new AuthorDetail(
      faker.datatype.number(), faker.lorem.sentence(),  faker.date.past(), faker.image.imageUrl(), faker.lorem.sentence(), testBooks
    );

    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an img element', () => {
    expect(debug.query(By.css('img')).attributes['alt']).toEqual(
      component.authorDetail.name
    );
  });

  it('should have an img element with src = authorDetail.image', () => {
    expect(debug.query(By.css('img')).attributes['src']).toEqual(
      component.authorDetail.image
    );
  });

  it('should have a <p> tag with component.authorDetail.name', () => {
    const componentElement: HTMLElement = debug.query(By.css('p.h3.p-2.author-name')).nativeElement;
    expect(componentElement.textContent).toContain(component.authorDetail.name);
  });

  it('should have one dd tag for component.authorDetail.description', () => {
    const allDt : DebugElement[]= debug.queryAll(By.css('dt'));
    let nodo = allDt.find((value) => {
      return value.nativeElement.textContent == 'Bio';
    });
    expect(nodo?.nativeElement.nextSibling.textContent).toContain(component.authorDetail.description);
  });

  it('should have one dd tag for component.authorDetail.birthDate', () => {
    const allDt : DebugElement[]= debug.queryAll(By.css('dt'));
    let nodo = allDt.find((value) => {
      return value.nativeElement.textContent == 'BirthDay';
    });
    expect(nodo?.nativeElement.nextSibling.textContent).toContain(component.authorDetail.birthDate);
  });

  it('should have a tag with component.authorDetail.books[i].name', () => {
    for (let i = 0; i < component.authorDetail.books.length; i++) {
      const componentElement: HTMLElement = debug.queryAll(By.css('ul > li'))[i].nativeElement;
      expect(componentElement.textContent).toContain(component.authorDetail.books[i].name);
    }
  });

});
