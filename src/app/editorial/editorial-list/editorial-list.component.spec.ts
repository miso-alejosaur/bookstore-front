/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { faker } from '@faker-js/faker';

import { EditorialListComponent } from './editorial-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { EditorialDetail } from '../editorial-detail';
import { BookDetail } from 'src/app/book/book-detail';

describe('EditorialListComponent', () => {
  let component: EditorialListComponent;
  let fixture: ComponentFixture<EditorialListComponent>;
  let debug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule, RouterTestingModule],
      declarations: [ EditorialListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorialListComponent);
    component = fixture.componentInstance;

    let testEditorials: Array<EditorialDetail> = [];

    let testBooks: Array<BookDetail> = [];

    for(let i = 0; i<3; i++) {
      testBooks[i] = new BookDetail(
        faker.datatype.number(),
        faker.lorem.sentence(),
        faker.lorem.sentence(),
        faker.lorem.sentence(),
        faker.image.imageUrl(),
        faker.date.past(),
        new EditorialDetail(faker.datatype.number(), faker.lorem.sentence(), []),
        [],[]
      );
    }

    for(let i = 0; i<10; i++) {
      testEditorials[i] = new EditorialDetail(
        faker.datatype.number(),
        faker.lorem.sentence(),
        testBooks
      );
    }

    component.editorials = testEditorials;

    debug = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 10 <p> elements', () => {
    expect(debug.queryAll(By.css('p')).length == 10).toBeTrue();
  });

  it('should have 30 <img> elements', () => {
    expect(debug.queryAll(By.css('img')).length == 30).toBeTrue();
  });

  it('should have p tag with the editorial.name', () => {
    debug.queryAll(By.css('p')).forEach((p, i)=>{
      expect(p.nativeElement.textContent).toContain(component.editorials[i].name)
    });
  });
});
