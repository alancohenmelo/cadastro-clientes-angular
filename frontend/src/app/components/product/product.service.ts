import { catchError ,map} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { EMPTY, Observable } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  base_url = "http://localhost:3001/products"

  constructor(private snackbar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError:boolean =false): void {
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass:isError ? ['msg-error'] : ['msg-success']

    });
  }

  //cria um produto
  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.base_url, product).pipe(
      map((obj)=>obj),
      catchError(e=>this.errorHandler(e))
    );

  }

  

  //lê um array de produtos
  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.base_url).pipe(
      map((obj)=>obj),
      catchError(e=>this.errorHandler(e))
    );;
  }

  readById(id: number): Observable<Product> {
    const url = `${this.base_url}/${id}`
    return this.http.get<Product>(url).pipe(
      map((obj)=>obj),
      catchError(e=>this.errorHandler(e))
    );
  }

  update(product: Product): Observable<Product> {
    const url = `${this.base_url}/${product.id}`;
    return this.http.put<Product>(url, product).pipe(
      map((obj)=>obj),
      catchError(e=>this.errorHandler(e))
    );
  }

  delete(id: number): Observable<Product> {
    const url = `${this.base_url}/${id}`;
    return this.http.delete<Product>(url).pipe(
      map((obj)=>obj),
      catchError(e=>this.errorHandler(e))
    );



  }

  errorHandler(e:any):Observable<any>{
    console.log(e);
    this.showMessage('Ocorreu um erro!',true)
      return EMPTY;
  }

}
