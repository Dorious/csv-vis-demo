import React, { memo, ReactElement } from 'react';
import moment from 'moment';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

import './ChartData.less';

export const ChartLegend = memo(function ChartLegend(): ReactElement {
  return (
    <div className="ChartLegend">
      Tutaj berdzie lenenda
    </div>
  )
});

function dateFormat(item : any) {
  return moment(item).format('DD. MMM \'YY');
}


interface Props {
  data: any
}

export default memo(function ChartData({ data }: Props): ReactElement {
  return (
    <div className="ChartData">
      <div className="ChartData-content">
        <div className="ChartData-label-left">
          <span>Clicks</span>
        </div>

        <ResponsiveContainer width={'100%'} height={'100%'}>
          <LineChart
            data={data}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid />
            <XAxis dataKey="time" tickFormatter={dateFormat}/>
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip labelFormatter={dateFormat} />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="Clicks" stroke="#8884d8" strokeWidth={2} dot={false} />
            <Line yAxisId="right" type="monotone" dataKey="Impressions" stroke="#82ca9d" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>

        <div className="ChartData-label-right">
          <span>Impressions</span>
        </div>
      </div>
    </div>
  )
})
