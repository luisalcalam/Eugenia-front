import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { PaginationResponse } from '../../../core/interfaces/response.interfaces';
import { IResourceTablePaginatorPage } from './intefaces/paginatorResourse.interface';
import { PaginationUtils } from '../../../core/utils/pagination.utils';

const PAGE_SKIP_CONSTANT = 5;

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  private _pagination!: PaginationResponse;
  totalPages = 0;
  currentPage = 0;
  @Input() set pagination(pagination: PaginationResponse) {
    this._pagination = pagination;
    this.currentPage = this.pagination.currentPage;
    this.totalPages = this.pagination.totalPages;
    this.init();
  }
  get pagination(): PaginationResponse {
    return this._pagination;
  }
  @Output() pageChangeRequest = new EventEmitter<PaginationResponse>();
  currentDisplayOfPages = [];
  localPageCollection: IResourceTablePaginatorPage[] = [];
  perPageOptions = [
    { value: 10, viewValue: '10' },
    { value: 15, viewValue: '15' },
    { value: 30, viewValue: '30' },
    { value: 50, viewValue: '50' },
  ];
  public perPageControl = new FormControl(10);
  constructor() {}

  ngOnInit(): void {
    this.perPageControl.valueChanges.subscribe({
      next: (perPageValue) => {
        if (perPageValue) {
          const paginationTemp = { ...this.pagination };
          paginationTemp.perPage = perPageValue;
          this.handlePaginationChange(paginationTemp);
        }
      },
    });
  }

  init(): void {
    this.localPageCollection = [];
    if (this.totalPages > 10) {
      this.localPageCollection = PaginationUtils.convertFeaturedPagination(
        this.pagination
      );
      // this.convertFeaturedPagination();
    } else {
      this.localPageCollection = PaginationUtils.convertSimplePagination(
        this.pagination
      );
    }
  }

  requestPageChange(page: IResourceTablePaginatorPage) {
    const paginationTemp = { ...this.pagination };
    if (page.action === 'skipNext') {
      paginationTemp.currentPage = page.index! + PAGE_SKIP_CONSTANT;
    } else if (page.action === 'skipPrevious') {
      paginationTemp.currentPage = page.index! - PAGE_SKIP_CONSTANT;
    } else {
      paginationTemp.currentPage = page.index;
    }
    this.handlePaginationChange(paginationTemp);
  }

  canSkipNext(numberOfPage: number) {
    const positionOfDisplay = numberOfPage - 3;
    return (
      positionOfDisplay === this.currentPage &&
      this.totalPages - positionOfDisplay > PAGE_SKIP_CONSTANT
    );
  }

  canSkipPrevious(numberOfPage: number) {
    const positionOfDisplay = this.currentPage - PAGE_SKIP_CONSTANT;
    return positionOfDisplay > 0 && numberOfPage - 1 === positionOfDisplay;
  }

  private getBaseNumberOfPages() {
    return this.currentPage > 4 ? this.currentPage - 4 : 1;
  }

  isActive(index: number): boolean {
    return index === this.currentPage;
  }

  handlePaginationChange(pagination: PaginationResponse) {
    this.pageChangeRequest.emit(pagination);
  }
}
