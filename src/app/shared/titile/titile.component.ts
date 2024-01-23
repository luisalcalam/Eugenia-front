import { Component, Input, inject } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-titile',
  templateUrl: './titile.component.html',
  styleUrls: ['./titile.component.scss'],
})
export class TitileComponent {
  @Input() title = 'Titulo de la página';
  public defaultBackLocation = false;
  private location = inject(Location);

  back() {
    this.location.back();
  }
}
