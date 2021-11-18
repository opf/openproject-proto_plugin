import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'op-kitten',
  templateUrl: './kitten.component.html',
  styleUrls: ['./kitten.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KittenComponent implements OnInit {

  @Input() public name:string;

  constructor(private elementRef:ElementRef) {
  }

  ngOnInit():void {
    // Since this component is bootstrapped
    // We read input from data fields instead of angular inputs
    const element = this.elementRef.nativeElement as HTMLElement;
    this.name = this.name || element.dataset.kittenName as string;
  }
}
