import React, { ReactElement } from 'react'

import { useAppState } from '../../overmind';
import ChartFilters from './ChartFilters';
import ChartData from './ChartData';

import './Chart.less';

export default function Chart(): ReactElement {
  const { filters, data } = useAppState();

  return (
    <section role="contentinfo" aria-label="Chart Data" className="Chart">
      <ChartFilters filters={filters} />
      <ChartData data={data} />
    </section>
  )
}
