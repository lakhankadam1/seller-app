import { Component, OnInit } from '@angular/core';
import {CommonService} from '../common.service';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-sell-item',
  templateUrl: './sell-item.component.html',
  styleUrls: ['./sell-item.component.css']
})
export class SellItemComponent implements OnInit {
  allItems = [];
  cartItems = {};
  addItemstoCart = [];
  finalItems = [];
  constructor(private http: HttpClient, private newService: CommonService) { }

  ngOnInit(): void {
    this.getAllItems();
  }

  addtoCart(event:any)
  {
    var idAttr = event.target.attributes.id;
    var _id = idAttr.nodeValue;
    console.log(_id);
    var item = this.allItems.find(val => {
      return val._id == _id;
    });
    item.sold = 1;
    console.log(item);
    
    this.newService.cartItems({item:item});
  }
  onSearchChange(searchValue: string): void {  
    searchValue = searchValue.toLowerCase();
    this.finalItems = this.allItems.filter(val=>
      {
        return val.name.toLowerCase().includes(searchValue);
      })
  }
  
  getAllItems()
  {
    this.allItems = [];
    this.http.get('http://localhost:8000/api/getItems').subscribe(
      results => {
        for(let i in results)
        {
          var value = JSON.stringify(results[i]);
          var _id = JSON.parse(value)._id;
          var id = parseInt(i)+1;
          var name = JSON.parse(value).name;
          var price = JSON.parse(value).price;
          var quantity = JSON.parse(value).quantity;
          var sold = "";
          if(quantity != 0)
            this.allItems.push({_id,id,name,price,quantity,sold});
        }
        this.finalItems = this.allItems;
      }
    );
  }
}
