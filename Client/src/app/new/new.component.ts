import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
	newProduct: any;
  errors: String;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService)
  {
  	this.newProduct = {name: '', qty: '', price: ''};
  }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => console.log(params['id']));
  }

  submitPet(){
        console.log(this.newProduct);
        let observable = this._httpService.addProduct(this.newProduct);
        observable.subscribe(response => {
            let data = response as any;

            if(data.error){
              if(data.error.errmsg){
                this.errors = "Duplicated data";
              }else if(data.error.message){
                this.errors = data.error.message;
              }
            }else{
              this._router.navigate(['']);
            }
        })
      }
}
