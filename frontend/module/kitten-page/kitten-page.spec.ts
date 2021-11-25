import { KittenPageComponent } from "./kitten-page.component";
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('Kitten page', () => {
  let component:KittenPageComponent;
  let fixture:ComponentFixture<KittenPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ KittenPageComponent ],
    });
    fixture = TestBed.createComponent(KittenPageComponent)
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should have a <h2> of the plugin name', () => {
    component.text = {kittens : "Name of the plugin"}
    fixture.detectChanges();

    const h2: HTMLElement = fixture.nativeElement.querySelector('h2');
    expect(h2.textContent).toBe(component.text.kittens)
  })
})
