import {Component, ElementRef, OnInit} from '@angular/core';
import {AbstractWidgetComponent} from "core-app/modules/grids/widgets/abstract-widget.component";
import {GridWidgetResource} from "core-app/modules/hal/resources/grid-widget-resource";
import {WidgetChangeset} from "core-app/modules/grids/widgets/widget-changeset";

@Component({
  templateUrl: './kitten.component.html',
  styleUrls: ['./kitten.component.sass'],
})
export class KittenComponent implements OnInit {

  public name:string;

  constructor(private elementRef:ElementRef) {
  }

  ngOnInit():void {
    // Since this component is bootstrapped
    // We read input from data fields instead of angular inputs
    const element = this.elementRef.nativeElement as HTMLElement;
    this.name = element.dataset.kittenName as string;
  }
}
