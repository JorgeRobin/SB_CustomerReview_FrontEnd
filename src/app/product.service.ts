import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { Product } from './product';

@Injectable()
export class ProductService {
    //URLs for CRUD operations
    allProductsUrl = "http://localhost:8080/api/getAllProducts";
    productUrlBase = "http://localhost:8080/api/";
	//Create constructor to get Http instance
	constructor(private http:Http) { 
	}
	//Fetch all products
    getAllProducts(): Observable<Product[]> {
        return this.http.get(this.allProductsUrl)
		   		.map(this.extractData)
		        .catch(this.handleError);

    }
	//Create article
    createProduct(product: Product):Observable<number> {
	    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.productUrlBase + "addProduct", product, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
	// Fetch product by id
    getProductById(id: string): Observable<Product> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let cpParams = new URLSearchParams();
		cpParams.set('id', id);			
		let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
		return this.http.get(this.productUrlBase + "getProduct", options)
			   .map(this.extractData)
			   .catch(this.handleError);
    }	
	//Update product
    updateProduct(product: Product):Observable<number> {
	    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: cpHeaders });
		var productId = product.id;
        return this.http.put(this.productUrlBase + "updateProduct/" + productId, product, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
    //Delete product	
    deleteProductById(id: string): Observable<number> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		var productId = id;		
		let options = new RequestOptions({ headers: cpHeaders });
		return this.http.delete(this.productUrlBase + "deleteProduct/" + productId, options)
			   .map(success => success.status)
			   .catch(this.handleError);
    }		
	private extractData(res: Response) {
		let body = res.json();
		// get all object property names
		var data = body.data;
        var result = JSON.parse(data);
		console.log(result);
        return result;
    }
    private handleError (error: Response | any) {
		console.error(error.message || error);
		return Observable.throw(error.status);
    }
}