/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';
import { ModalConfirmationService } from 'src/app/core/layouts/modal-state/modal-state.service';
import { Product } from 'src/app/core/models';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent implements OnInit, OnDestroy {
  public products: Product[] = [];
  public pageSize = 5;
  public currentPage = 1;
  public filter: string = '';

  public dropdownId: string | null = null;
  public totalPages!: number;

  private isDestroyed$ = new Subject<void>();

  constructor(
    private readonly service: ProductsService,
    private readonly router: Router,
    private readonly modalService: ModalConfirmationService
  ) {}

  ngOnDestroy(): void {
    this.isDestroyed$.next();
    this.isDestroyed$.complete();
  }

  ngOnInit(): void {
    this.getProducts();
    this.modalService.confirmationDelete.subscribe((result) => {
      console.log(result);
      if (result) {
        this.getProducts();
      }
    });
  }

  openModal(product: Product) {
    this.modalService.showModal({ product: product }).then((result) => {
      if (result) {
        return;
      }
    });
  }

  getProducts(): void {
    this.service
      .getProducts()
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe((data) => {
        this.products = data;
        this.calculateTotalPages();
      });
  }

  toggleDropdown(id: string) {
    this.dropdownId = this.dropdownId === id ? null : id;
  }

  getDisplayedProducts(): Product[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;

    return this.products.filter((product) => product.name.toLowerCase().includes(this.filter.toLowerCase())).slice(start, end);
  }

  changePageSize(size: number): void {
    this.pageSize = size;
    this.currentPage = 1;
    this.calculateTotalPages();
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.products.length / this.pageSize);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  validateNoResults(): boolean {
    return this.getDisplayedProducts().length === 0;
  }

  redirectToModify(id: string): void {
    this.router.navigateByUrl(`/modify/${id}`);
  }
}
