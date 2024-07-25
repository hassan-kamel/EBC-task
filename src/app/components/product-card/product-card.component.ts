import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [TagModule, ButtonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() isFavorite: boolean = false;
  @Output() favoriteToggled = new EventEmitter<Product>();

  onToggleFavorite() {
    this.favoriteToggled.emit(this.product);
  }

  getSeverity(product: Product): {
    severity:
      | 'success'
      | 'secondary'
      | 'info'
      | 'warning'
      | 'danger'
      | 'contrast'
      | undefined;
    text: string;
  } {
    if (product.quantity < 10) {
      return {
        severity: 'danger',
        text: 'Low Stock',
      };
    } else if (product.quantity < 20) {
      return {
        severity: 'warning',
        text: 'Hight Stock',
      };
    }
    return {
      severity: 'success',
      text: 'In Stock',
    };
  }
}
