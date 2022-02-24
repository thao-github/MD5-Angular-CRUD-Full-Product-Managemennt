import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../service/product.service";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  msg='';

  productForm: FormGroup = new FormGroup({
    'id': new FormControl(null, Validators.required),
    'name': new FormControl(null, Validators.required),
    'price': new FormControl(null,Validators.required),
    'description': new FormControl(null, Validators.required),
  });

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  create(){
    const product = this.productForm.value;
    this.productService.saveProduct(product);
    this.productForm.reset();
  }
}
