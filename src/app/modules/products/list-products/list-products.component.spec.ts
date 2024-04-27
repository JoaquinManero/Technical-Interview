import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ListProductsComponent } from './list-products.component';

import { ModalConfirmationService } from 'src/app/core/layouts/modal-state/modal-state.service';
import { Product } from 'src/app/core/models';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

describe('ListProductsComponent', () => {
  let component: ListProductsComponent;
  let fixture: ComponentFixture<ListProductsComponent>;

  let modalService: ModalConfirmationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListProductsComponent],
      imports: [HttpClientTestingModule, CoreModule, FormsModule, ReactiveFormsModule, RouterModule.forRoot([])],
    });
    fixture = TestBed.createComponent(ListProductsComponent);
    component = fixture.componentInstance;
    modalService = TestBed.inject(ModalConfirmationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProducts on init', () => {
    spyOn(component, 'getProducts');
    component.ngOnInit();
    expect(component.getProducts).toHaveBeenCalled();
  });

  it('should call showModal when openModal is called', () => {
    const product: Product = { id: '1', name: 'Test', logo: 'test', description: 'test', date_release: new Date(), date_revision: new Date() };
    const showModalSpy = spyOn(modalService, 'showModal').and.returnValue(Promise.resolve(true));
    component.openModal(product);
    expect(showModalSpy).toHaveBeenCalledWith({ product });
  });

  it('should increment currentPage when nextPage is called and not on last page', () => {
    component.totalPages = 3;
    component.currentPage = 1;
    component.nextPage();
    expect(component.currentPage).toEqual(2);
    component.nextPage();
    expect(component.currentPage).toEqual(3);
    component.nextPage();
    expect(component.currentPage).toEqual(3);
  });

  it('should decrement currentPage when previousPage is called and not on first page', () => {
    component.totalPages = 3;
    component.currentPage = 3;
    component.previousPage();
    expect(component.currentPage).toEqual(2);
    component.previousPage();
    expect(component.currentPage).toEqual(1);
    component.previousPage();
    expect(component.currentPage).toEqual(1);
  });

  it('should redirect to modify page with correct id', () => {
    const routerSpy = spyOn(component['router'], 'navigateByUrl');
    component.redirectToModify('1');
    expect(routerSpy).toHaveBeenCalledWith('/modify/1');
  });

  it('should toggle dropdown', () => {
    component.dropdownId = '1';
    component.toggleDropdown('1');
    expect(component.dropdownId).toBeNull();
    component.toggleDropdown('2');
    expect(component.dropdownId).toEqual('2');
  });

  it('should change page size', () => {
    component.pageSize = 2;
    component.currentPage = 2;
    component.products = [
      { id: '1', name: 'Test', logo: 'test', description: 'test', date_release: new Date(), date_revision: new Date() },
      { id: '2', name: 'Test', logo: 'test', description: 'test', date_release: new Date(), date_revision: new Date() },
      { id: '3', name: 'Test', logo: 'test', description: 'test', date_release: new Date(), date_revision: new Date() },
    ];
    component.changePageSize(1);
    expect(component.pageSize).toEqual(1);
    expect(component.currentPage).toEqual(1);
    expect(component.totalPages).toEqual(3);
  });

  it('should calculate total pages', () => {
    component.pageSize = 2;
    component.products = [
      { id: '1', name: 'Test', logo: 'test', description: 'test', date_release: new Date(), date_revision: new Date() },
      { id: '2', name: 'Test', logo: 'test', description: 'test', date_release: new Date(), date_revision: new Date() },
      { id: '3', name: 'Test', logo: 'test', description: 'test', date_release: new Date(), date_revision: new Date() },
    ];
    component.calculateTotalPages();
    expect(component.totalPages).toEqual(2);
  });

  it('should validate no results', () => {
    component.products = [];
    expect(component.validateNoResults()).toBeTruthy();
    component.products = [{ id: '1', name: 'Test', logo: 'test', description: 'test', date_release: new Date(), date_revision: new Date() }];
    expect(component.validateNoResults()).toBeFalsy();
  });
});
