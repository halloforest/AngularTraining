import { Component, AfterContentInit, ContentChild } from '@angular/core';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  template: `
    <app-child>
      <h1>Hello, Child Component!</h1>
    </app-child>
  `
})
export class ParentComponent implements AfterContentInit {
  @ContentChild(ChildComponent) childComponent!: ChildComponent;

  ngAfterContentInit() {
    // 在内容初始化后，可以通过 @ContentChild 获取父组件投影的子组件的引用
    console.log(this.constructor.name, ": ngAfterContentInit");
    

      this.childComponent.greet();

  }
}
