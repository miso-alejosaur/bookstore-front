import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditorialCreateComponent } from './editorial-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('EditorialCreateComponent', () => {
  let component: EditorialCreateComponent;
  let fixture: ComponentFixture<EditorialCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        HttpClientModule,
        RouterTestingModule,
      ],
      declarations: [EditorialCreateComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorialCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
