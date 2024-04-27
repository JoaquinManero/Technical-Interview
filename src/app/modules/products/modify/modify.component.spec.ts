import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { ModifyComponent } from './modify.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ModifyComponent', () => {
  let component: ModifyComponent;
  let fixture: ComponentFixture<ModifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyComponent],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      providers: [{ provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } }],
    });
    fixture = TestBed.createComponent(ModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should build the form', () => {
    component.buildFrom();
    expect(component.modifyForm).toBeTruthy();
  });

  it('should detect changes in dateReleased', () => {
    component.modifyForm.get('dateReleased')?.setValue('2021-06-01');
    expect(component.modifyForm.get('dateReviewed')?.value).toEqual('2022-06-01');
  });

  it('should reset the form', () => {
    component.idValue = '1';

    component.modifyForm.get('id')?.setValue('1');
    component.modifyForm.get('name')?.setValue('Test');
    component.modifyForm.get('description')?.setValue('Test');
    component.modifyForm.get('logo')?.setValue('Test');
    component.modifyForm.get('dateReleased')?.setValue('2021-06-01');
    component.modifyForm.get('dateReleased')?.setValue('2021-06-01');
    component.resetForm();
    expect(component.modifyForm.get('id')?.value).toEqual(component.idValue);
    expect(component.modifyForm.get('name')?.value).toEqual('');
    expect(component.modifyForm.get('description')?.value).toEqual('');
    expect(component.modifyForm.get('logo')?.value).toEqual('');
    expect(component.modifyForm.get('dateReleased')?.value).toBeNull();
    expect(component.modifyForm.get('dateReviewed')?.value).toBeNull();
  });

  it('should destroy the subscription', () => {
    component.ngOnDestroy();
    expect(component.isDestroyed$).toBeTruthy();
  });

  it('should set the idValue', () => {
    expect(component.idValue).toEqual('1');
  });
});
