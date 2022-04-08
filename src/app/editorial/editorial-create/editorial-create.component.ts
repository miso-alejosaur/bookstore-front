import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EditorialDetail } from '../editorial-detail';
import { EditorialService } from '../editorial.service';

@Component({
  selector: 'app-editorial-create',
  templateUrl: './editorial-create.component.html',
  styleUrls: ['./editorial-create.component.css'],
})
export class EditorialCreateComponent implements OnInit {
  editorialForm!: FormGroup;

  constructor(
    private editorialService: EditorialService,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.editorialForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  createEditorial(editorial: EditorialDetail) {
    this.editorialService.createEditorial(editorial).subscribe(
      () => {
        this.toastrService.success(
          'The editorial was created',
          'Editorial creation'
        );
        this.router.navigate(['/editorials/list']);
        this.editorialForm.reset();
      },
      (err: string | undefined) => {
        this.toastrService.error(err, 'Error creating the editorial');
      }
    );
  }

  cancelCreation(): void {
    this.toastrService.warning(
      "The editorial wasn't created",
      'Editorial creation'
    );
    this.editorialForm.reset();
  }
}
