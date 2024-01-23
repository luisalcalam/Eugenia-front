export interface IResourceTablePaginatorPage {
  index: number;
  display: string;
  icon?: string,
  action: 'navigate' | 'skipNext' | 'skipPrevious';
}