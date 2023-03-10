import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Brush,
  ResponsiveContainer,
} from 'recharts';

import { getRandomData } from '~/fixtures/metricData';

const data = getRandomData(7);

function Charts() {
  return (
    <div className="charts-container">
      <div className="charts-header">IOPS</div>
      <div className="chart-tooltip-display">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            data={data}
            syncId="anyId"
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid stroke="rgba(100, 107, 114, 1)" vertical={false} />
            <XAxis dataKey="datetime" />
            <YAxis axisLine={false} />
            <Line dot={false} type="monotone" dataKey="iops_read" stroke="rgba(149, 95, 213, 1)" fill="rgba(149, 95, 213, 1)" isAnimationActive={true} />
            <Line dot={false} type="monotone" dataKey="iops_write" stroke="rgba(0, 163, 202, 1)" fill="rgba(0, 163, 202, 1)" isAnimationActive={true} />
            <Tooltip
              wrapperStyle={{
                width: '99%',
              }}
              contentStyle={{
                borderRadius: '8px',
                border: 'none',
                background: 'rgba(0,0,0,0)',
                color: '#fff',
                fontSize: '14px',
                lineHeight: '10px',
            }}/>
           </LineChart>
        </ResponsiveContainer>
        <div className="tooltip-display">
          <div>IOPS</div>
          <div className="tooltip-read-write">
            READ
            <div className="iops-read">21.2k IOPS</div>
          </div>
          <div className="tooltip-read-write">
            Write
            <div className="iops-write">122.0 IOPS</div>
          </div>
        </div>
      </div>
      <div className="charts-header">Throughput</div>
      <div className="chart-tooltip-display">
        <ResponsiveContainer width="100%" height={260}>
          <LineChart
            data={data}
            syncId="anyId"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid stroke="rgba(100, 107, 114, 1)" vertical={false} />
            <XAxis dataKey="datetime" />
            <YAxis
              tickFormatter={(value) => {
                return `${value / 1000000000} GB/s`
              }}
              axisLine={false}
            />
            <Line dot={false} type="monotone" dataKey="throughput_read" stroke="rgba(142, 142, 205, 1)" fill="rgba(142, 142, 205, 1)" isAnimationActive={true} />
            <Line dot={false} type="monotone" dataKey="throughput_write" stroke="rgba(0, 163, 202, 1)" fill="rgba(0, 163, 202, 1)" isAnimationActive={true} />
            <Brush fill="rgba(0,0,0,0.2)" />
            <Tooltip
              wrapperStyle={{
                width: '99%',
              }}
              contentStyle={{
                borderRadius: '8px',
                border: 'none',
                background: 'rgba(0,0,0,0)',
                color: '#fff',
                fontSize: '14px',
                lineHeight: '10px',
            }}/>
          </LineChart>
        </ResponsiveContainer>
        <div className="tooltip-display-brush">
          <div>Throughput</div>
          <div className="tooltip-read-write">
            READ
            <div className="throughput-read">10.3 KB/s</div>
          </div>
          <div className="tooltip-read-write">
            Write
            <div className="throughput-write">489.8 KB/s</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Charts;
