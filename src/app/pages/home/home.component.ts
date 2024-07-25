import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Observable, tap } from 'rxjs';
import { PageList } from '../../interfaces/page-list.interface';
import { Product } from '../../interfaces/product.interface';
import { AsyncPipe, CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AsyncPipe,
    DataViewModule,
    TagModule,
    ButtonModule,
    RatingModule,
    CommonModule,
    ProductCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public products$: Observable<PageList<Product>> | null = null;
  public favoriteProductIDs: Set<string> = new Set<string>();
  public selectedProducts = signal<Product[]>([]);

  constructor(
    private _router: Router,
    private _productsService: ProductsService
  ) {}

  ngOnInit() {
    this.products$ = this._productsService.products$.pipe(
      tap((products) => {
        this.selectedProducts?.set([]);
        this.favoriteProductIDs.clear();
        return products;
      })
    );
  }

  onFavoriteToggled(product: Product) {
    if (this.favoriteProductIDs.has(product._id)) {
      this.favoriteProductIDs.delete(product._id);
      this.selectedProducts?.set([
        ...this.selectedProducts()?.filter((p) => p._id !== product._id),
      ]);
    } else {
      this.favoriteProductIDs.add(product._id);
      this.selectedProducts?.set([...this.selectedProducts(), product]);
    }
    console.log(
      'this.selectedProducts: ',
      this.selectedProducts && this.selectedProducts()
    );
  }

  isFavorite(productId: string): boolean {
    return this.favoriteProductIDs.has(productId);
  }
}
