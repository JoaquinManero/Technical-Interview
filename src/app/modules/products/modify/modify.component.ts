import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css'],
})
export class ModifyComponent implements OnInit, OnDestroy {
  modifyForm!: FormGroup;
  today = new Date().toISOString().split('T')[0];
  public idValue: string | null = null;
  public isDestroyed$ = new Subject<void>();
  public successfulMessage: boolean = false;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    this.isDestroyed$.next();
    this.isDestroyed$.complete();
  }

  ngOnInit() {
    this.idValue = this.route.snapshot.paramMap.get('id');
    this.buildFrom();
    this.detectChangesDateRealased();
    this.modifyForm.get('id')?.setValue(this.idValue);
  }

  detectChangesDateRealased() {
    this.modifyForm.get('dateReleased')?.valueChanges.subscribe((date) => {
      const dateReviewed = new Date(date);
      dateReviewed.setFullYear(dateReviewed.getFullYear() + 1);
      this.modifyForm.get('dateReviewed')?.setValue(dateReviewed.toISOString().split('T')[0]);
    });
  }

  buildFrom() {
    this.modifyForm = this.fb.group({
      id: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', [Validators.required]],
      dateReleased: ['', [Validators.required]],
      dateReviewed: [{ value: '', disabled: true }, [Validators.required]],
    });
  }

  resetForm() {
    this.modifyForm.reset({
      id: this.idValue,
      name: '',
      description: '',
      logo: '',
      dateReleased: null,
      dateReviewed: null,
    });
  }

  updateProduct() {
    if (this.modifyForm.valid) {
      const formValues = this.modifyForm.getRawValue();
      const payload = {
        id: formValues.id,
        name: formValues.name,
        description: formValues.description,
        logo: formValues.logo,
        date_release: formValues.dateReleased,
        date_revision: formValues.dateReviewed,
      };
      this.productsService
        .updateProduct(payload)
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
  }
}
