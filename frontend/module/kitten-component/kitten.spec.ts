import { KittenComponent } from "./kitten.component";
import { ComponentFixture, TestBed } from '@angular/core/testing';


describe('Kitten', () => {
  let component:KittenComponent;
  let fixture:ComponentFixture<KittenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ KittenComponent ],
    });
    fixture = TestBed.createComponent(KittenComponent)
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should have a <div> with the given kitten name', () => {
    component.name = "Annabelle";
    fixture.detectChanges();

    const kittenElement:HTMLElement = fixture.nativeElement
    expect(kittenElement.textContent).toContain(component.name)
  })
})
