import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ProductService } from './product.service';
import { Product } from './product';

@Component({
   selector: 'app-product',
   templateUrl: './product.component.html',
   styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit { 
   //Component properties
   allProducts: Product[];
   statusCode: number;
   requestProcessing = false;
   productIdToUpdate = null;
   processValidation = false;
   //Create form
   productForm = new FormGroup({
       name: new FormControl('', Validators.required),
       description: new FormControl('', Validators.required)	   
   });
   //Create constructor to get service instance
   constructor(private productService: ProductService) {
   }
   //Create ngOnInit() and and load products
   ngOnInit(): void {
	   this.getAllProducts();
   }   
   //Fetch all products
   getAllProducts() {
        this.productService.getAllProducts()
		  .subscribe(
                data => this.allProducts = data,
                errorCode =>  this.statusCode = errorCode);   
   }
   //Handle create and update product
   onProductFormSubmit() {
	  this.processValidation = true;   
	  if (this.productForm.invalid) {
	       return; //Validation failed, exit from method.
	  }   
	  //Form is valid, now perform create or update
      this.preProcessConfigurations();
	    let name = this.productForm.get('name').value.trim();
      let description = this.productForm.get('description').value.trim();	  
	  if (this.productIdToUpdate === null) {  
	    //Handle create product
	    let product = new Product(null, name, description, 0);	  
	    this.productService.createProduct(product)
	      .subscribe(successCode => {
		            this.statusCode = successCode;
				    this.getAllProducts();	
					this.backToCreateProduct();
			    },
		        errorCode => this.statusCode = errorCode);
	  } else {  
   	    //Handle update product
	    let product = new Product(this.productIdToUpdate, name, description, 0);	  
	    this.productService.updateProduct(product)
	      .subscribe(successCode => {
		            this.statusCode = successCode;
				    this.getAllProducts();	
					this.backToCreateProduct();
			    },
		        errorCode => this.statusCode = errorCode);	  
	  }
   }
   //Load product by id to edit
   loadProductToEdit(productId: string) {
      this.preProcessConfigurations();
      this.productService.getProductById(productId)
	      .subscribe(product => {
		            this.productIdToUpdate = product.id;   
		            this.productForm.setValue({ name: product.name, description: product.description });
					this.processValidation = true;
					this.requestProcessing = false;   
		        },
		        errorCode =>  this.statusCode = errorCode);   
   }
   //Delete product
   deleteProduct(productId: string) {
      this.preProcessConfigurations();
      this.productService.deleteProductById(productId)
	      .subscribe(successCode => {
		            this.statusCode = successCode;
				    this.getAllProducts();	
				    this.backToCreateProduct();
			    },
		        errorCode => this.statusCode = errorCode);    
   }
   //Perform preliminary processing configurations
   preProcessConfigurations() {
      this.statusCode = null;
	  this.requestProcessing = true;   
   }
   //Go back from update to create
   backToCreateProduct() {
      this.productIdToUpdate = null;
      this.productForm.reset();	  
	  this.processValidation = false;
   }
}
    