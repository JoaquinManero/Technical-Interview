import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
    });

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should build the form', () => {
    component.buildForm();
    expect(component.registerForm).toBeTruthy();
  });

  it('should detect changes in dateReleased', () => {
    component.detectChangesDateRealased();
    component.registerForm.get('dateReleased')?.setValue('2021-06-01');
    expect(component.registerForm.get('dateReviewed')?.value).toEqual('2022-06-01');
  });

  it('should reset the form', () => {
    component.registerForm.get('id')?.setValue('1');
    component.registerForm.get('name')?.setValue('Test');
    component.registerForm.get('description')?.setValue('Test');
    component.registerForm.get('logo')?.setValue('Test');
    component.registerForm.get('dateReleased')?.setValue('2021-06-01');
    component.registerForm.get('dateReviewed')?.setValue('2022-06-01');
    component.flagExists = true;
    component.resetForm();
    expect(component.registerForm.get('id')?.value).toBeNull();
    expect(component.registerForm.get('name')?.value).toBeNull();
    expect(component.registerForm.get('description')?.value).toBeNull();
    expect(component.registerForm.get('logo')?.value).toBeNull();
    expect(component.registerForm.get('dateReleased')?.value).toBeNull();
    expect(component.registerForm.get('dateReviewed')?.value).toBeNull();
    expect(component.flagExists).toBeFalsy();
  });

  it('should destroy the subscription', () => {
    component.ngOnDestroy();
    expect(component.isDestroyed$).toBeTruthy();
  });

  it('should navigate to /products', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component['router'].navigate(['/products']);
    expect(routerSpy).toHaveBeenCalledWith(['/products']);
  });
});
