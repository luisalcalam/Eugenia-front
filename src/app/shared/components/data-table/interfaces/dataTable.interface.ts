export interface DataTableImplementation {
  path: string;
  fields: DataField[];
}

export interface DataField {
  name: string;
  tableValue: string;
  tableValue2?: string;
  fieldType: DataFieldTypeEnum;
  button?: string;
  dateFormat?: string;
}

export enum DataFieldTypeEnum {
  text = 'text',
  date = 'date',
}
