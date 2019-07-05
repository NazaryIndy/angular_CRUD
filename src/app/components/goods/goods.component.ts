import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Good } from '../../models/good.interface';
import { GoodService } from '../../services/good.service';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.scss']
})
export class GoodsComponent {

  @Input() private set goodInput(good: Good) {
    this.good = good;
    this.buildForm(good);
  }
  @Output() private selectedGood = new EventEmitter<Good>();

  public form: FormGroup;
  public good: Good;

  constructor(private goodService: GoodService,
              private fb: FormBuilder
  ) { }

  public buildForm(good: Good): void {
    this.form = this.fb.group({
      id: [good && good.id],
      article: [good && good.article],
      title: [good && good.title],
      price: [good && good.price],
      weight: [good && good.weight],
    });
  }

  public saveData(): void {
    if (this.form.value.id) {
      this.updateGood();
    } else {
      this.createGood();
    }
  }

  private updateGood(): void {
    this.goodService.update(this.form.value, this.good.id).subscribe(item => {
      this.good = item;
      this.selectedGood.emit(item);
    });
  }

  public createGood(): void {
    this.goodService.create(this.form.value).subscribe(item => {
      this.good = item;
      this.selectedGood.emit(item);
    });
  }
}
