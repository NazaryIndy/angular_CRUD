import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsWrapperComponent } from './goods-wrapper.component';

describe('GoodsWrapperComponent', () => {
  let component: GoodsWrapperComponent;
  let fixture: ComponentFixture<GoodsWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
