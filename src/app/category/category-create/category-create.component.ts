import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../service/category.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

  categoryForm : FormGroup = new FormGroup({
    'name' : new FormControl(null, Validators.required)
  })

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
  }

  submit(){
    const category = this.categoryForm.value;
    this.categoryService.saveCategory(category).subscribe(() => {
      this.categoryForm.reset();
      alert("Category CREATED!");
    }, e => {
      console.log(e)
    });
  }
}
