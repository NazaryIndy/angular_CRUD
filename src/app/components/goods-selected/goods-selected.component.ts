import { Component, OnInit, Input } from '@angular/core';
import { Good } from 'src/app/models';

@Component({
  selector: 'app-goods-selected',
  templateUrl: './goods-selected.component.html',
  styleUrls: ['./goods-selected.component.scss']
})
export class GoodsSelectedComponent implements OnInit {

  @Input() good: Good;

  constructor() { }

  ngOnInit() {
  }

}
