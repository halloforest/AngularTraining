import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  tabSelected: string = 'recipes';
  @Output() navigationSelected = new EventEmitter<string>();

  onClick(itemSelected: string) {
    this.navigationSelected.emit(itemSelected);
    this.tabSelected = itemSelected;
  }

  ngOnInit() {
    this.navigationSelected.emit('recipes');    
  }
}
