import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.scss']
})
export class SvgComponent implements OnInit {

  @Input() template?: string = 'success';
  @Input() width: number = 110;
  @Input() height: number = 110;

  constructor() { }

  ngOnInit(): void {
  }

}
