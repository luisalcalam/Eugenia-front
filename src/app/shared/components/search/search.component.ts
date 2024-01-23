import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Output() clearSearchChange = new EventEmitter<void>();
  @Output() searchValueChange = new EventEmitter<string>();
  @Input() searchValue: string = '';
  @Input() debounceDelay = 400;
  @Input() placeholder: string | null = 'Buscar';

  public searchControl = new FormControl('');

  constructor() {}

  ngOnInit(): void {
    if (this.searchValue !== '') {
      this.searchControl.setValue(this.searchValue);
    }
    this.searchControl.valueChanges
      .pipe(
        debounceTime(this.debounceDelay),
        distinctUntilChanged(),
        tap((text) => {
          if (text !== '') {
            const search = text as string;
            this.searchValue = search;
            this.searchValueChange.emit(search.trim());
          } else {
            this.searchValue = '';
            this.clearSearchChange.emit();
          }
        })
      )
      .subscribe();
  }

  clearSearch() {
    this.searchControl.setValue('');
  }
}
