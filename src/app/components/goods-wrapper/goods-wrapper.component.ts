import { Component } from '@angular/core';
import { Good } from 'src/app/models/good.interface';
import { GoodService } from 'src/app/services/good.service';

@Component({
  selector: 'app-goods-wrapper',
  templateUrl: './goods-wrapper.component.html',
  styleUrls: ['./goods-wrapper.component.scss']
})
export class GoodsWrapperComponent {

  public goods: Array<Good>;
  public selectedGood = {} as Good;
  public isCollapsed = false;

  constructor(private goodService: GoodService) {
    this.goodService.getAll().subscribe(items => {
      this.goods = items;
    });
  }

  public addGood(): void {
    this.selectedGood = {} as Good;
    this.isCollapsed = !this.isCollapsed;
  }

  public recieveGood(good: Good): void {
    if (this.isCollapsed) {
      this.isCollapsed = false;
    }
    this.selectedGood = good;
  }

  private checkGoodInGoods(goodToSearch: Good): boolean {
    const findedGood = this.goods.find(good => {
      return good.id === goodToSearch.id;
    });
    return findedGood ? true : false;
  }

  public recieveEditedGood(newGood: Good): void {
    this.isCollapsed = true;
    if (!this.checkGoodInGoods(newGood)) {
      this.goods.push(newGood);
    } else {
      this.goods = this.goods.map(good => {
        if (good.id === newGood.id) {
          good = newGood;
        }
        return good;
      });
    }
  }

  public recieveRemovedGood(goodToRemove: Good): void {
    this.goods = this.goods.filter(good => good.id !== goodToRemove.id);
  }
}
