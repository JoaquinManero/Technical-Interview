/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/models';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  url = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products';
  constructor(private readonly http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    const headers = new HttpHeaders().set('authorId', '1');
    return this.http.get<Product[]>(this.url, { headers });
  }

  postProduct(product: Product): Observable<Product[]> {
    const headers = new HttpHeaders().set('authorId', '1');
    return this.http.post<Product[]>(this.url, product, { headers });
  }

  updateProduct(product: Product): Observable<Product[]> {
    const headers = new HttpHeaders().set('authorId', '1');
    return this.http.put<Product[]>(this.url, product, { headers });
  }

  deleteProduct(id: string): Observable<string> {
    const headers = new HttpHeaders().set('authorId', '1');
    return this.http.delete<string>(`${this.url}?id=${id}`, { headers, responseType: 'text' as 'json' });
  }

  getExistentId(id: number): Observable<boolean> {
    const headers = new HttpHeaders().set('authorId', '1');
    const url = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products/verification';
    return this.http.get<boolean>(`${url}?id=${id}`, { headers });
  }
}
