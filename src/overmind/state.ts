import { ChartFilters } from "../models/filters";

type State = {
  csvLoading: boolean,
  csv: string | null,
  filters: ChartFilters,
  location: Location | object,
  data: Array<any>,
}

export const state: State = {
  csvLoading: false,
  csv: null,
  filters: {},
  location: {},
  data: [],
}