import { Component, OnInit } from '@angular/core';
import { Good } from '../../models/good.interface';
import { GoodService } from '../../good.service';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.scss']
})
export class GoodsComponent implements OnInit {

  public goods: Good[] = [];

  good = {
    id: null,
    name: 'sdasdasd',
    price: 444
  }

  constructor(private goodService: GoodService) { }

  ngOnInit() {
  }

  getGoods(): void {
    this.goodService.getAll().subscribe(items => {
      this.goods = items;
      console.log(this.goods)
    })
  }

  addGood(): void {
    this.goodService.create(this.good).subscribe(item => {
      this.goods.push(item);
    })
  }

  updateGood(): void {
    this.goodService.update(this.good.id).subscribe(item => {
      this.goods.push(item);
    })
  }

  removeGood(): void {
    this.goodService.delete(this.good.id).subscribe(item => {
      this.goods.forEach((_, index) => {
          this.goods.splice(index, 1);
      });
      console.log(this.goods) 
    })
  }
}
