import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Define the structure of the chart data
interface ChartData {
  name: string;
  uv: number;
}

const data: ChartData[] = [
  { name: "Jan", uv: 475 },
  { name: "Feb", uv: 580 },
  { name: "Mar", uv: 300 },
  { name: "Apr", uv: 525 },
  { name: "May", uv: 375 },
  { name: "Jun", uv: 450 },
  { name: "Jul", uv: 575 },
  { name: "Aug", uv: 360 },
  { name: "Sep", uv: 200 },
  { name: "Oct", uv: 400 },
  { name: "Nov", uv: 300 },
  { name: "Dec", uv: 600 },
];

const activeDotStyle = {
  r: 8, // Size of the hover dot
  stroke: "#000", // Color of the hover dot
  strokeWidth: 2, // Border width of the hover dot
  fill: "#ffffff", // Inside color of the hover dot
};

const Area_Chart: React.FC = () => {
  // Formatter function to add 'K' suffix to Y-axis values
  const yAxisTickFormatter = (value: number): string => `${value}`;

  // Custom tick style
  const tickStyle = { fill: "#ffffff" };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid
            vertical={false}
            stroke="#434E58"
            strokeDasharray="0"
          />
          <XAxis dataKey="name" tick={{ ...tickStyle }} tickMargin={6} />
          <YAxis
            tickFormatter={yAxisTickFormatter}
            tick={{ ...tickStyle }}
            tickMargin={16}
            axisLine={{
              stroke: "#ffffff00", // Y-axis line color
              strokeWidth: 2,
              strokeDasharray: "7 7",
            }}
          />
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0a0a08" stopOpacity={1} />
              <stop offset="100%" stopColor="#11111122" stopOpacity={1} />
            </linearGradient>
          </defs>
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff", // Tooltip background color
              border: "1px solid #ccc", // Tooltip border
              borderRadius: "5px", // Tooltip border radius
            }}
            itemStyle={{ color: "#0a0a08" }} // Tooltip text color
            labelStyle={{ color: "#202020" }} // Tooltip label color
            formatter={(value: number): [string, string] => [`${value}K`, "UV"]}
            labelFormatter={(label: string) => `Month: ${label}`}
          />
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#ffffff"
            strokeWidth={3}
            fill="url(#colorUv)"
            activeDot={{ ...activeDotStyle }} // Custom hover line
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Area_Chart;
