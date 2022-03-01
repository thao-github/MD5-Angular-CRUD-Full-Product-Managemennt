import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product";
import {environment} from "../../environments/environment";

const API_URL = `${environment.apiUrl}`

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get<any>(API_URL + `/products/`);
  }

  saveProduct(product: Product): Observable<any> {
    return this.http.post<any>(API_URL + `/products/add`, product);
  }

  findById(id: number): Observable<any> {
    return this.http.get<any>(API_URL + `/products/${id}`);
  }

  updateProduct(id: number, product: Product): Observable<any> {
    return this.http.put<any>(API_URL + `/products/edit/${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(API_URL + `/products/delete/${id}`);
  }

}
