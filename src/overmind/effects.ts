import { filterOptions, ChartFilters } from "../models/filters";
import parse from 'csv-parse';
import QueryString from 'query-string';
import mem from "mem";
import { isEmpty } from 'lodash';

export { default as http } from 'axios';

function createParser() {
  return parse({
    delimiter: ','
  });
}

function getFilterColumns(keys: Array<string>, record : Array<string>) {
  const columns : any = {};
  keys.forEach(key => columns[key] = record.indexOf(filterOptions[key].label));
  return columns;
}

function getDimensionColumns(keys: Array<string>, record : Array<string>) {
  const columns : any = {};
  keys.forEach(key => columns[key] = record.indexOf(key));
  return columns;
}

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

const recordTime = mem((date : string) => new Date(date.replace(/(\d+).(\d+).(\d+)/, '$3-$2-$1')).getTime());

export function loadSeries(csv : string | null, filters: ChartFilters, callback  : Function = () => {}) {
  const parser = createParser();
  const activeFilters = Object.keys(filters).filter(col => filters[col].value.length).map(name => ({
    name,
    filter: filters[name]
  }));

  let data : any = {};
  let columns : any = {};
  let filterColumns : any = {};
  let i = 0;

  parser.on('readable', () => {
    let record : Array<string>;

    while ((record = parser.read()) !== null) {
      if (i === 0) {
        columns = getDimensionColumns(["Clicks", "Impressions"], record);
        filterColumns = getFilterColumns(Object.keys(filters), record);
        i++;
        continue;
      } 

      const time  = recordTime(record[0]);
      let stop = false;
      if (!data[time]) data[time] = { time };

      if (!isEmpty(filterColumns) && !isEmpty(activeFilters)) {
        for(let filter of activeFilters) {
          if(filter.filter.value.indexOf(record[filterColumns[filter.name]]) === -1) {
            stop = true;
            continue;
          }
        }
      }

      for(let label of Object.keys(columns)) {
        if (stop) {
          data[time][label] = data[time][label] || 0;
          continue;
        }

        const value = parseInt(record[columns[label]]) || 0;
        
        data[time][label] = (+data[time][label] || 0) + value;
      }
      
      i++;
    }
  });

  parser.write(csv);
  parser.end();
  
  return Object.values(data);
}

export function loadFilters(csv : string | null, search : string) {
  const filters : ChartFilters = {};
  const parser = createParser();
  const filtersKeys = Object.keys(filterOptions);

  let filterColumns : any = {};
  let filterValues : any = {};
  let i = 0;

  parser.on('readable', () => {
    let record : Array<string>;
    while ((record = parser.read()) !== null) {
      // Figure out column indexes
      if(i === 0) {
        filterColumns = getFilterColumns(filtersKeys, record);
      } else {
      // Do the needful
        for(let key of filtersKeys) {
          if (!filterValues[key]) 
            filterValues[key] = {};
          filterValues[key][record[filterColumns[key]]] = 1;
        }
      }

      i++;
    }
  });

  parser.write(csv);

  for(let key of filtersKeys) {
    filters[key] = {
      ...filterOptions[key],
      value: getValueFromQuery(search, key),
      values: Object.keys(filterValues[key]),
    }
  }

  parser.end();

  return filters;
}