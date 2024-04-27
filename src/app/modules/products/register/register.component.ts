import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../services/products.service';
import { Product } from 'src/app/core/models';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  public registerForm!: FormGroup;
  public today = new Date().toISOString().split('T')[0];
  public flagExists: boolean = false;
  public isDestroyed$ = new Subject<void>();
  public errorMessage: string = '';
  public successfulMessage: boolean = false;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.buildForm();
    this.detectChangesDateRealased();
  }

  buildForm() {
    this.registerForm = this.fb.group({
      id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', [Validators.required]],
      dateReleased: ['', [Validators.required]],
      dateReviewed: [{ value: '', disabled: true }, [Validators.required]],
    });
  }

  detectChangesDateRealased() {
    this.registerForm.get('dateReleased')?.valueChanges.subscribe((date) => {
      const dateReviewed = new Date(date);
      dateReviewed.setFullYear(dateReviewed.getFullYear() + 1);
      this.registerForm.get('dateReviewed')?.setValue(dateReviewed.toISOString().split('T')[0]);
    });
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next();
    this.isDestroyed$.complete();
  }

  resetForm() {
    this.registerForm.reset();
    this.flagExists = false;
  }

  redirectToList() {
    this.router.navigate(['/']);
  }

  postData() {
    if (this.registerForm.valid) {
      const formValues = this.registerForm.getRawValue();
      this.productsService
        .getExistentId(formValues.id)
        .pipe(takeUntil(this.isDestroyed$))
        .subscribe({
          next: (response) => {
            if (response) {
              this.flagExists = true;
            } else {
              const payload: Product = {
                id: formValues.id,
                name: formValues.name,
                description: formValues.description,
                logo: formValues.logo,
                date_release: formValues.dateReleased,
                date_revision: formValues.dateReviewed,
              };
              this.productsService
                .postProduct(payload)
                .pipe(takeUntil(this.isDestroyed$))
                .subscribe({
                  next: () => {
                    this.successfulMessage = true;
                    this.resetForm();
                  },
                  error: (error) => {
                    console.log(error);
                  },
                });
            }
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }
}
