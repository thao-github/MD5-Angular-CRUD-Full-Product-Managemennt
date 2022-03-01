import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../service/product.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {CategoryService} from "../../service/category.service";
import {Category} from "../../model/category";

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {
  productForm!: FormGroup;
  id!: number;
  categories : Category[] = [];

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private categoryService: CategoryService,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      // @ts-ignore
      this.id = +paramMap.get('id');
      this.getProduct(this.id)
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
      this.productForm = new FormGroup({
        'name': new FormControl(product.name, Validators.required),
        'price': new FormControl(product.price, Validators.required),
        'description': new FormControl(product.description, Validators.required),
        'category': new FormControl(product.category?.name, Validators.required),
        'img': new FormControl(product.img)
      })
    });
  }

  delete(id: number){
    return this.productService.deleteProduct(id).subscribe(() =>{
      this.router.navigate([`/product/list`])
    }, error => {
      console.log(error)
    });
  }

}
