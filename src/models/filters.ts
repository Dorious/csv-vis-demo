export enum FilterTypes {
  multiple = 'multiple',
  text = 'text',
}

export type FilterOption = {
  type: string,
  label: string,
  plural: string,
  color: string
}

export type FilterOptions = {
  [prop: string]: FilterOption,
}

export interface ChartFilter extends FilterOption {
  values: Array<string>,
  value: Array<string>,
};

export interface ChartFilters {
  [prop: string]: ChartFilter
}

export const filterOptions : FilterOptions = {
  datasource: {
    type: FilterTypes.multiple,
    label: 'Datasource',
    plural: 'datasources',
    color: '#f00',
  },
  campaign: {
    type: FilterTypes.multiple,
    label: 'Campaign',
    plural: 'campaigns',
    color: '#0f0',
  }
}