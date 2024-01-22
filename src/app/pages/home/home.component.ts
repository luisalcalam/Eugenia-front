import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);
  constructor() {
    this.http.get(`${this.baseUrl}/auth/login`).subscribe((resp) => {
      console.log(resp);
    });
  }
}
