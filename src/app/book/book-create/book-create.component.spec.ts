import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookCreateComponent } from './book-create.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BookService } from '../book.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('BookCreateComponent', () => {
  let component: BookCreateComponent;
  let fixture: ComponentFixture<BookCreateComponent>;
  let debug: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookCreateComponent],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        ReactiveFormsModule,
        ToastrModule.forRoot({
          timeOut: 10000,
          positionClass: 'toast-bottom-right',
          preventDuplicates: true,
        }),
      ],
      providers: [BookService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //TODO: VALIDAR ESTADO DEL BOT{ON DE SUBMIT ESTe DESACTIVADO AL INICIO}

  it('should have a button with id submit and with type submit', () => {
    expect(debug.query(By.css('#submit')).attributes['type']).toEqual('submit');
  });

  it('should have an input with id name and with formControlName name', () => {
    expect(debug.query(By.css('#name')).attributes['formControlName']).toEqual(
      'name'
    );
  });

  it('should have a select with id authors and with formControlName authors', () => {
    expect(
      debug.query(By.css('#authors')).attributes['formControlName']
    ).toEqual('authors');
  });

  it('should have an input with id publishingDate and with formControlName publishingDate', () => {
    expect(
      debug.query(By.css('#publishingDate')).attributes['formControlName']
    ).toEqual('publishingDate');
  });

  it('should have an input with id description and with formControlName description', () => {
    expect(
      debug.query(By.css('#description')).attributes['formControlName']
    ).toEqual('description');
  });

  it('should have an input with id isbn and with formControlName isbn', () => {
    expect(debug.query(By.css('#isbn')).attributes['formControlName']).toEqual(
      'isbn'
    );
  });

  it('should have an input with id image and with formControlName image', () => {
    expect(debug.query(By.css('#image')).attributes['formControlName']).toEqual(
      'image'
    );
  });

  it('should have an input with id editorial and with formControlName editorial', () => {
    expect(
      debug.query(By.css('#editorial')).attributes['formControlName']
    ).toEqual('editorial');
  });
});
