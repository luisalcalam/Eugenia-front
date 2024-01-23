import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import {
  PaginationResponse,
  ApiResponse,
  QueryParams,
} from '../../../core/interfaces/response.interfaces';
import {
  DataField,
  DataFieldTypeEnum,
  DataTableImplementation,
} from './interfaces/dataTable.interface';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../core/services/api.service';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent implements OnInit {
  displayedColumns: string[] = [];
  dataSource: any[] = [];
  @Input() dataTableImplementation!: DataTableImplementation;
  @Output() rowClick = new EventEmitter<any>();
  @Output() addClick = new EventEmitter<void>();
  isLoadingResults = false;
  dataResources?: any[];
  fields: DataField[] = [];
  dataFieldTypeEnum = DataFieldTypeEnum;
  search: string = '';
  dataError = false;
  noData = false;
  implementationError = false;
  pagination!: PaginationResponse;
  private apiService = inject(ApiService);

  ngOnInit(): void {
    if (!this.dataTableImplementation) {
      console.error(
        'No se ha implementado correctamente la interfaz DataTable en el componente. Esta interfaz es necesaria para que el DataTable.component funcione correctamente'
      );
      this.implementationError = true;
      return;
    }
    this.init();
  }

  init(): void {
    this.fields = this.dataTableImplementation.fields;
    this.displayedColumns = this.getDisplayedCols();
    this.getResources();
  }

  getResources() {
    this.isLoadingResults = true;
    this.dataError = false;
    this.apiService
      .get<any>(this.dataTableImplementation.path, this.getQueryParams())
      .subscribe({
        complete: () => {
          this.isLoadingResults = false;
        },
        error: () => {
          this.isLoadingResults = false;
          this.dataError = true;
        },
        next: (res) => {
          if (res.content.length < 1) {
            this.noData = true;
          }
          this.dataSource = res.content;
          this.pagination = res.pagination;
        },
      });
  }

  getDisplayedCols(): string[] {
    const targetedFields = this.fields.map((field) => field.tableValue);
    // let displayCols = []
    // if (this.isSelectable) { displayCols.push('select'); }
    // return [...displayCols, ...targetedFields];
    return targetedFields;
  }

  searchResources(value: string) {
    this.search = value.trim();
    this.getResources();
  }

  clearSearch() {
    this.search = '';
    this.getResources();
  }

  getQueryParams(): QueryParams {
    const params: QueryParams = {};
    if (this.pagination) {
      params['perPage'] = this.pagination.perPage.toString();
      params['currentPage'] = this.pagination.currentPage.toString();
    }
    if (this.search) {
      params['q'] = this.search;
    }
    return params;
  }

  pageChange(e: PaginationResponse) {
    this.pagination = { ...e };
    this.getResources();
  }
}
