import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { MenuItem } from '../elements/menu-item';
import { AppRoutingModule } from '../../app-routing.module';
import { Router } from '@angular/router';
@Injectable()
export class MenuService {

  selectedElementSubject$: Subject<MenuItem>
  selectedElement: MenuItem;
  elements: MenuItem[];

  constructor(private router: Router) {
    this.router = router;
    this.selectedElementSubject$ = new Subject();
    this.selectedElementSubject$.subscribe((selected) => {
      this.selectedElement = selected
      this.redirect(this.selectedElement)
    });
    this.elements = [new MenuItem("Evenements"), new MenuItem("Tricount")]
   }

   selectElement(element) {
    this.selectedElementSubject$.next(element)
   }

   getSelectedElement() {
     return this.selectedElement;
   }

   getElements() {
     return this.elements;
   }

   redirect(element) {
    if (element.title === "Evenements") {
      this.router.navigateByUrl("events/list")
    }
    if (element.title === "Tricount") {
      this.router.navigateByUrl("tricount")

    }
   }

}
