/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy } from '@angular/core';

import { ModalConfirmationService } from './modal-state.service';
import { ProductsService } from 'src/app/modules/products/services/products.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-modal-state',
  templateUrl: './modal-state.component.html',
  styleUrls: ['./modal-state.component.css'],
})
export class ModalStateComponent implements OnDestroy {
  public modalData!: null | any;
  public isOpen = false;
  public productId: string = '';
  public productName: string = '';
  public isDestroyed = new Subject<void>();

  constructor(
    private readonly modalService: ModalConfirmationService,
    private readonly service: ProductsService
  ) {
    this.modalService.watch().subscribe((data) => {
      this.modalData = data;
      this.productId = data?.product.id;
      this.productName = data?.product.name;

      if (data !== null) {
        this.isOpen = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.isDestroyed.next();
    this.isDestroyed.complete();
  }

  closeModal(): void {
    this.modalService.close();
    this.isOpen = false;
  }

  deleteProduct() {
    this.service
      .deleteProduct(this.productId)
      .pipe(takeUntil(this.isDestroyed))
      .subscribe({
        next: () => {
          this.modalService.confirmationDelete.next(true);
          this.closeModal();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  confirmChanges(): void {
    this.modalService.confirmChanges();
    this.isOpen = false;
  }
}
