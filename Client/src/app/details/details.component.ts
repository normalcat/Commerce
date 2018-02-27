import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService) { }

  oneProduct = {name: "", qty: "", price: ""};
  oneProductID: any;

  ngOnInit() {
  	this.oneProductID = this._httpService.getOneProductID();
  	this.getOneProduct(this.oneProductID);
  }

  getOneProduct(ID) {
        let observable = this._httpService.getOneProduct(ID);
        observable.subscribe(response => {
        	let data = response as any;
            this.oneProduct = data.products[0];
            console.log(this.oneProduct);
        })
    }

  deleteOne(productID){
    console.log("we are inside the function" + productID);
    let observable = this._httpService.deleteOneProduct(productID);
    observable.subscribe(response => {    //need to subscribe, otherwise it won't call the server
      this._router.navigate(['']);
    })
  }
}
