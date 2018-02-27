import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	products: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService) {}

  ngOnInit() {
  	this.getAllProducts();
  }


  getAllProducts() {
        let observable = this._httpService.getProducts();
        observable.subscribe(response => {
            let data = response as any;
            this.products = data.products;
            console.log(this.products);
        });
        
    }

  sendData(petID) {
        this._httpService.setID(petID);
    }
}
