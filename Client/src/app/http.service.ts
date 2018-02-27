import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
	product: any;
	productID: any;
  constructor(private _http: HttpClient) { }

  addProduct(product) {
      console.log(product);
        return this._http.post('/new', product);
  }

  getProducts() {
        return this._http.get('/products');
   }

   setID(ID) {
        this.productID = ID;
    }

   getOneProductID(){
   	return this.productID;
   }

   getOneProduct(ID) {
        let url = '/products/' + ID;
        return this._http.get(url);
    }

   editOneProduct(ID, product){
       console.log("THIS IS THE ONE ");
       console.log(product);
   		let url = "/products/edit/" + ID;
   		return this._http.put(url, product);
   }

   deleteOneProduct(ID){
     let url = "/products/" + ID;
     console.log("HTTP service " + url);
     return this._http.delete(url);
   }
}
