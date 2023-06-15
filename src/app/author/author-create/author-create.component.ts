import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Author } from '../author';
import { AuthorService } from '../author.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-author-create',
  templateUrl: './author-create.component.html',
  styleUrls: [],
})
export class AuthorCreateComponent implements OnInit {
  authorForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authorService: AuthorService,
    private router: Router
  ) {}

  createAuthor(author: Author) {
    if (!this.authorForm.valid) return;
    const date = this.authorForm.controls['birthDate'].value;
    const formattedDate: Date = new Date(date);
    author.birthDate = formattedDate;
    this.authorService.createAuthor(author).subscribe((apiData) => {
      console.info('The author was created: ', apiData);
      this.toastr.success('Confirmation', 'Author created');
      this.router.navigate(['/authors/list']);
      this.authorForm.reset();
    });
  }

  cancelCreation() {
    this.toastr.warning("The author wasn't created", 'Author creation');
    this.authorForm.reset();
  }

  ngOnInit() {
    this.authorForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      image: ['', Validators.required],
      birthDate: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }
}
