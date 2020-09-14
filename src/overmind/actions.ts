import { Action, AsyncAction } from "overmind";
import QueryString from 'query-string';

import { ChartFilters } from "../models/filters";

function getValueFromQuery(search : string, key : string) {
  const qs = QueryString.parse(search, { arrayFormat: 'bracket' });
  let value = [] as Array<string>;

  if(qs[key] && typeof qs[key] === 'string') {
    value = [qs[key]] as Array<string>;
  } else if(Array.isArray(qs[key])) {
    value = qs[key] as Array<string>;
  }

  return value;
}

export const setLocation : AsyncAction<Location|object> = async ({state,actions}, location) => {
  state.location = location;
  const { search } = location as Location;
  actions.setFiltersValue(search);
  await new Promise(res => setTimeout(() => { res(true); }, 0));
  actions.loadSeries();
}

export const loadCsv : AsyncAction = async ({effects, state, actions}) => {
  state.csvLoading = true;
  state.csv = await effects.http.get('/DAMKBAoDBwoDBAkOBAYFCw.csv').then(res => res.data);
  actions.loadFilters();
  state.csvLoading = false;
}

export const setFiltersValue : Action<string> = ({state}, search : string) => {
  const { filters } = state;
  const newFilters : ChartFilters = {};
  
  Object.keys(filters).forEach(key => {
    const value = getValueFromQuery(search, key);
    newFilters[key] = {
      ...filters[key],
      value
    }
  });

  state.filters = newFilters;
}

export const loadFilters : Action = ({state, actions, effects}) => {
  const { csv, location } = state;
  const { search } = location as Location;
  state.filters = effects.loadFilters(csv, search);
  actions.loadSeries();
}

export const loadSeries : Action = ({state, effects}) => {
  const { csv, filters } = state;
  if (csv) state.data = effects.loadSeries(csv, filters);
}