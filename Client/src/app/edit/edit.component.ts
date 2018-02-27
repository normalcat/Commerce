import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
	oneProductID: any;
  	oneProduct = {name: "", qty: "", price: ""};
    errors:String;

  constructor(
  	private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService) {}
 
  ngOnInit() {
  	this._route.params.subscribe((params: Params) => console.log(params['id']));
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

    submitEdit(ID){
        console.log(this.oneProduct);
    	  let observable = this._httpService.editOneProduct(ID, this.oneProduct);
        observable.subscribe(response => {
        	let data = response as any;
          if(data.error){
            console.log(data.error);
            this.errors = data.error.message;
          }else{
            this._router.navigate(['/details']);
          }
        })
    }
}
