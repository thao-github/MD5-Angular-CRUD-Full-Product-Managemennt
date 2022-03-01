import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../service/product.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {CategoryService} from "../../service/category.service";
import {Category} from "../../model/category";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productForm!: FormGroup;
  id!: number;
  categories: Category[] = [];

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private categoryService: CategoryService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      // @ts-ignore
      this.id = +paramMap.get('id');
      this.getProduct(this.id);
    });
  }

  ngOnInit() {
    this.getCategoryList();
  }

  getCategoryList() {
    return this.categoryService.getAll().subscribe(categories => {
      this.categories = categories;
    })
  }

  getProduct(id: number) {
    return this.productService.findById(id).subscribe(product =>{
      console.log(product);
      this.productForm = new FormGroup({
        'name': new FormControl(product.name, Validators.required),
        'price': new FormControl(product.price, Validators.required),
        'description': new FormControl(product.description, Validators.required),
        'category': new FormControl(product.category?.name, Validators.required),
        'img': new FormControl(product.img)
      });
    });
  }

  updateProduct(id: number) {
    const product = this.productForm.value;
    this.productService.updateProduct(id, product).subscribe(() => {
      alert('UPDATED!');
    }, error => {
      console.log(error);
    });

  }

}
