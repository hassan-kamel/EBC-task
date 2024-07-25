import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject, switchMap } from 'rxjs';
import { PageList } from '../interfaces/page-list.interface';
import { Product } from '../interfaces/product.interface';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productsUrl = environment.baseUrl + '/product';
  private searchKeywordSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {}

  public products$: Observable<PageList<Product>> = this.searchKeywordSubject
    .asObservable()
    .pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((searchKeyword) => this.getList(searchKeyword))
    );
  private getList(
    searchKeyword: string | null = null
  ): Observable<PageList<Product>> {
    return this.http.get<PageList<Product>>(
      this.productsUrl + (searchKeyword ? `?keyword=${searchKeyword}` : '')
    );
  }

  public updateSearchKeyword(keyword: string | null) {
    this.searchKeywordSubject.next(keyword);
  }
}
