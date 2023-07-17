import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListAddInlineComponent } from './shopping-list-add-inline.component';

describe('ShoppingListAddInlineComponent', () => {
  let component: ShoppingListAddInlineComponent;
  let fixture: ComponentFixture<ShoppingListAddInlineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoppingListAddInlineComponent]
    });
    fixture = TestBed.createComponent(ShoppingListAddInlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
