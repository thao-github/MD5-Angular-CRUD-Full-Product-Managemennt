import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../service/product.service";
import {CategoryService} from "../../service/category.service";
import {Category} from "../../model/category";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  categories: Category[] = [];

  productForm: FormGroup = new FormGroup({
    'id': new FormControl(null, Validators.required),
    'name': new FormControl(null, Validators.required),
    'price': new FormControl(null, Validators.required),
    'description': new FormControl(null, Validators.required),
    'img': new FormControl(),
    'category': new FormControl()
  });

  constructor(private productService: ProductService,
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.getCategoryList();
  }

  getCategoryList() {
    return this.categoryService.getAll().subscribe(categories => {
      this.categories = categories;
    })
  }

  create() {
    const product = this.productForm.value;
    console.log(product)
    this.productService.saveProduct(product).subscribe(() => {
      alert('Product CREATED.');
      this.productForm.reset();
    }, error => {
      console.log(error)
    });
  }
}
