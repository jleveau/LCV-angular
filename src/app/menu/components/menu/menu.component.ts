import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { MenuItem } from '../../elements/menu-item';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  selectedElement: MenuItem

  constructor(private menuService: MenuService) {
    this.menuService = menuService;
  }

  ngOnInit() {
    this.menuService.selectedElementSubject$.subscribe((element) => {
      this.selectedElement = element
    })
  }

  getListElement() {
    return this.menuService.getElements()
  }

  selectElement(item: MenuItem) {
    return this.menuService.selectElement(item)
  }

}
