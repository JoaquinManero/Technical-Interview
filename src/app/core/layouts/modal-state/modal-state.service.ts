/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalConfirmationService {
  private display: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  private confirmationResult: BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(null);
  public confirmationDelete: BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(null);

  watch(): Observable<any | null> {
    return this.display.asObservable();
  }

  showModal(modalData: any): Promise<boolean> {
    this.display.next(modalData);
    return new Promise((resolve) => {
      this.confirmationResult.subscribe({
        next: (result) => {
          if (result == null) {
            return;
          }
          resolve(result);
          this.confirmationResult.next(null);
          this.display.next(null);
        },
        error: () => {
          this.confirmationResult.next(null);
          this.display.next(null);
        },
      });
    });
  }

  close(): void {
    this.confirmationResult.next(false);
  }

  confirmChanges(): void {
    this.confirmationResult.next(true);
  }
}
