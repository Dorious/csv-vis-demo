import React, { memo, ReactElement } from 'react';

import { ChartFilter, ChartFilters as IChartFilters } from '../../../models/filters';

import './ChartFilters.less';

interface Props {
  filters: IChartFilters
}

export default memo(function ChartFilters({ filters }: Props): ReactElement {
  const filterRender = Object.keys(filters).map((name, key) => {
    const { label, plural, value } = filters[name] as ChartFilter;

    if(!value || !value.length) 
      return <span key={`${name}${key}`}>{`All ${plural}`}</span>;

    return (
      <span key={`${name}${key}`}>{label}: {value.map(val => <b key={val}>"{val}"</b>)}</span>
    )
  })

  return (
    <h2 className="ChartFilters">
      {filterRender}
    </h2>
  )
});
