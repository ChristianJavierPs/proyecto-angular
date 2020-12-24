import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';

import { decimalValidator } from '../../directives/decimal.directive';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit {

  @Input() buttonText: string = 'Submit';
  @Input() product: Product = null;
  @Output() saveProduct: EventEmitter<Product> = new EventEmitter<Product>();

  constructor(
    private router: Router
  ){}

  productForm = null;

  ngOnInit(): void {
    this.productForm = new FormGroup({
      name: new FormControl(this.product ? this.product.name : '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ]),
      description: new FormControl(this.product ? this.product.description : '',
      [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(60)
      ]),
      price: new FormControl(this.product ? this.product.price : '',
      [
        Validators.required,
        Validators.min(0),
        decimalValidator()
      ]),
      stock: new FormControl(this.product ? this.product.stock : '',
      [
        Validators.required,
        Validators.min(1),
        Validators.max(10),
        Validators.pattern(/^\d+$/)
      ])
    });
  }

  onSubmit(): void {
    const { description, name, price, stock } = this.productForm.value;

    this.saveProduct.emit({
      description,
      name,
      price: parseFloat(price),
      stock: parseInt(stock, 10)
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin']);
  }
}
