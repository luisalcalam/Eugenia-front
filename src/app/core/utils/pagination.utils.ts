import { PaginationResponse } from '../interfaces/response.interfaces';
import { IResourceTablePaginatorPage } from '../../shared/components/paginator/intefaces/paginatorResourse.interface';

export class PaginationUtils {
  private static canSkipNext(
    numberOfPage: number,
    currentPage: number,
    totalPages: number,
    PAGE_SKIP_CONSTANT = 5
  ) {
    const positionOfDisplay = numberOfPage - 3;
    return (
      positionOfDisplay === currentPage &&
      totalPages - positionOfDisplay > PAGE_SKIP_CONSTANT
    );
  }

  private static canSkipPrevious(
    numberOfPage: number,
    currentPage: number,
    PAGE_SKIP_CONSTANT = 5
  ) {
    const positionOfDisplay = currentPage - PAGE_SKIP_CONSTANT;
    return positionOfDisplay > 0 && numberOfPage - 1 === positionOfDisplay;
  }

  public static convertFeaturedPagination(
    pagination: PaginationResponse,
    PAGE_SKIP_CONSTANT = 3
  ): IResourceTablePaginatorPage[] {
    const featuredPagination: IResourceTablePaginatorPage[] = [];
    const baseNumberOfPages =
      pagination.currentPage > 2 ? pagination.currentPage - 2 : 1;
    const pagesLeft = pagination.totalPages - pagination.currentPage;
    const numberOfPagesToShow =
      pagesLeft <= PAGE_SKIP_CONSTANT
        ? pagination.currentPage + pagesLeft
        : pagination.currentPage + 4;
    if (pagination.currentPage >= PAGE_SKIP_CONSTANT) {
      featuredPagination.push({
        index: pagination.currentPage - 1,
        display: pagination.currentPage.toString(),
        action: 'navigate',
        icon: 'chevron_left',
      });
      if (baseNumberOfPages !== 1) {
        featuredPagination.push({
          index: 1,
          display: '1',
          action: 'navigate',
        });
      }
    }
    for (
      let index = baseNumberOfPages;
      index < numberOfPagesToShow + 1;
      index++
    ) {
      let page: IResourceTablePaginatorPage;
      if (
        this.canSkipNext(
          index,
          pagination.currentPage,
          pagination.totalPages,
          PAGE_SKIP_CONSTANT
        )
      ) {
        page = {
          index,
          display: '...',
          action: 'skipNext',
        };
      } else if (
        this.canSkipPrevious(index, pagination.currentPage, PAGE_SKIP_CONSTANT)
      ) {
        page = {
          index,
          display: '...',
          action: 'skipPrevious',
        };
      } else {
        page = {
          index,
          display: index.toString(),
          action: 'navigate',
        };
      }
      featuredPagination.push(page);
    }

    if (pagination.totalPages - pagination.currentPage > PAGE_SKIP_CONSTANT) {
      featuredPagination.push({
        index: pagination.totalPages,
        display: pagination.totalPages.toString(),
        action: 'navigate',
      });
      featuredPagination.push({
        index: pagination.currentPage + 1,
        display: pagination.currentPage.toString(),
        action: 'navigate',
        icon: 'chevron_right',
      });
    }
    return featuredPagination;
  }

  public static convertSimplePagination(
    pagination: PaginationResponse
  ): IResourceTablePaginatorPage[] {
    const featuredPagination: IResourceTablePaginatorPage[] = [];
    for (let index = 1; index < pagination.totalPages + 1; index++) {
      const page: IResourceTablePaginatorPage = {
        index,
        display: index.toString(),
        action: 'navigate',
      };

      featuredPagination.push(page);
    }
    return featuredPagination;
  }
}
