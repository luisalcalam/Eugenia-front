import { Component, Input, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-titile',
  templateUrl: './titile.component.html',
  styleUrls: ['./titile.component.scss'],
})
export class TitileComponent {
  @Input() title = 'Titulo de la página';
  @Input() defaultBackLocation = false;
  @Input() customBackLocation?: string;
  private location = inject(Location);
  private router = inject(Router);

  back() {
    if (this.customBackLocation) {
      this.router.navigate([this.customBackLocation]);
    } else {
      this.location.back();
    }
  }
}
