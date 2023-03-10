import { useState } from 'react';
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
import type { ChartData } from '~/fixtures/metricData';

function Charts() {
  const [dataDays, setDataDays] = useState<number>(7);
  const [data, setData] = useState<any[]>(getRandomData(7));
  const [iopsRead, setIopsRead]=useState<number>(0.0)
  const [iopsWrite, setIopsWrite]=useState<number>(0.0)
  const [throughputRead, setThroughputRead]=useState<number>(0.0)
  const [throughputWrite, setThroughputWrite]=useState<number>(0.0)

  const handleDayChange = (day: string) => {
    setData(getRandomData(Number(day)));
  }

  return (
    <div className="charts-container">
      <div className="charts-select-container">
        <select className="charts-select" onChange={(e)=>handleDayChange(e.target.value)} >
          <option value="7">7 Days</option>
          <option value="14">14 Days</option>
          <option value="30">30 Days</option>
        </select>
      </div>
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
            <XAxis
              dataKey="datetime"
              tickFormatter={(value: any, index): string => {
                const timeArr = value.split(' ');
                const displayTime = timeArr.slice(0, -1).join(' ').replace(/,/,'');
                return displayTime;
              }}
            />
            <YAxis
              axisLine={false}
              tickFormatter={(value) => {
                return `${value / 1000}k`
              }}
            />
            <Line dot={false} type="monotone" dataKey="iops_read" stroke="rgba(149, 95, 213, 1)" fill="rgba(149, 95, 213, 1)" isAnimationActive={true} />
            <Line dot={false} type="monotone" dataKey="iops_write" stroke="rgba(0, 163, 202, 1)" fill="rgba(0, 163, 202, 1)" isAnimationActive={true} />
            <Tooltip
              position={{ x: 'auto' as any, y: -44 }}
              wrapperStyle={{
                outline: 'none',
              }}
              formatter={(value: number, label: string, props: any): any =>{
                if (label === 'iops_write') {
                  setIopsWrite(value);
                }
                if (label === 'iops_read') {
                  setIopsRead(value);
                }

                return [];
              }}
              labelFormatter={(label, payload) => {
                const display = (
                  <span
                    style={{
                      display: 'block',
                      fontSize: '1.1rem',
                      lineHeight: '24px',
                    }}
                  >
                    <span
                      style={{
                        display: 'block',
                        color: '#ccc',
                        paddingBottom: '8px',
                        textAlign: 'center',
                        textTransform: 'capitalize',
                      }}
                    >
                      <span
                        style={{
                          color: '#fff',
                          fontSize: '1.2rem',
                        }}
                      >{label}
                      </span>
                    </span>
                  </span>
                );
                return display;
              }}
              contentStyle={{
                borderRadius: '8px',
                border: 'none',
                background: 'rgba(0,0,0,0)',
                outline: 'none',
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
            <div className="iops-read">{iopsRead} IOPS</div>
          </div>
          <div className="tooltip-read-write">
            Write
            <div className="iops-write">{iopsWrite} IOPS</div>
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
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid stroke="rgba(100, 107, 114, 1)" vertical={false} />
            <XAxis
              dataKey="datetime"
              tickFormatter={(value: any, index): string => {
                const timeArr = value.split(' ');
                const displayTime = timeArr.slice(0, -1).join(' ').replace(/,/,'');
                return displayTime;
              }}
            />
            <YAxis
              axisLine={false}
              tickFormatter={(value) => {
                if(value===0 || value === 2000000000 || value === 1000000000) {
                  return `${value / 1000000000} GB/s`
                }
                return ''
              }}
            />
            <Line dot={false} type="monotone" dataKey="throughput_read" stroke="rgba(142, 142, 205, 1)" fill="rgba(142, 142, 205, 1)" isAnimationActive={true} />
            <Line dot={false} type="monotone" dataKey="throughput_write" stroke="rgba(0, 163, 202, 1)" fill="rgba(0, 163, 202, 1)" isAnimationActive={true} />
            <Brush fill="rgba(0,0,0,0.2)" />
            <Tooltip
              //unfortunate number type only available
              position={{ x: 'auto' as any, y: -44 }}
              wrapperStyle={{
                outline: 'none',
              }}
              formatter={(value: number, label: string, props: any): any =>{
                if (label === 'throughput_write') {
                  setThroughputWrite(value);
                }
                if (label === 'throughput_read') {
                  setThroughputRead(value);
                }

                return [];
              }}
              labelFormatter={(label, payload) => {
                const display = (
                  <span
                    style={{
                      display: 'block',
                      fontSize: '1.1rem',
                      lineHeight: '24px',
                    }}
                  >
                    <span
                      style={{
                        display: 'block',
                        color: '#ccc',
                        paddingBottom: '8px',
                        textAlign: 'center',
                        textTransform: 'capitalize',
                      }}
                    >
                      <span
                        style={{
                          color: '#fff',
                          fontSize: '1.2rem',
                        }}
                      >{label}
                      </span>
                    </span>
                  </span>
                );
                return display;
              }}
              contentStyle={{
                borderRadius: '8px',
                border: 'none',
                background: 'rgba(0,0,0,0)',
                outline: 'none',
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
            <div className="throughput-read">{throughputRead} KB/s</div>
          </div>
          <div className="tooltip-read-write">
            Write
            <div className="throughput-write">{throughputWrite} KB/s</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Charts;
