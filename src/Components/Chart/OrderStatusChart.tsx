// import { useState } from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";

const COLORS = ["#22c55e", "#f59e0b", "#ef4444"]; // green, amber, red

interface OrderData {
  totalOrders: number;
  completedPercentage: number;
  pendingPercentage: number;
  cancelledPercentage: number;
}

// 🌀 Custom shape for the active (hovered) slice
// const renderActiveShape = (props: any) => {
//   const RADIAN = Math.PI / 180;
//   const {
//     cx,
//     cy,
//     midAngle,
//     innerRadius,
//     outerRadius,
//     startAngle,
//     endAngle,
//     fill,
//     payload,
//     percent,
//     value,
//   } = props;

//   const sin = Math.sin(-RADIAN * midAngle);
//   const cos = Math.cos(-RADIAN * midAngle);
//   const sx = cx + (outerRadius + 10) * cos;
//   const sy = cy + (outerRadius + 10) * sin;
//   const mx = cx + (outerRadius + 30) * cos;
//   const my = cy + (outerRadius + 30) * sin;
//   const ex = mx + (cos >= 0 ? 1 : -1) * 22;
//   const ey = my;
//   const textAnchor = cos >= 0 ? "start" : "end";

//   return (
//     <g>
//       <text
//         x={cx}
//         y={cy}
//         dy={8}
//         textAnchor="middle"
//         className="fill-gray-800 font-semibold"
//       >
//         {payload.name}
//       </text>
//       <Sector
//         cx={cx}
//         cy={cy}
//         innerRadius={innerRadius}
//         outerRadius={outerRadius}
//         startAngle={startAngle}
//         endAngle={endAngle}
//         fill={fill}
//       />
//       <Sector
//         cx={cx}
//         cy={cy}
//         startAngle={startAngle}
//         endAngle={endAngle}
//         innerRadius={outerRadius + 4}
//         outerRadius={outerRadius + 8}
//         fill={fill}
//       />
//       <path
//         d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
//         stroke={fill}
//         fill="none"
//       />
//       <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
//       <text
//         x={ex + (cos >= 0 ? 1 : -1) * 12}
//         y={ey}
//         textAnchor={textAnchor}
//         className="fill-gray-800 text-sm"
//       >{`${value}%`}</text>
//       <text
//         x={ex + (cos >= 0 ? 1 : -1) * 12}
//         y={ey}
//         dy={18}
//         textAnchor={textAnchor}
//         className="fill-gray-500 text-xs"
//       >
//         {(percent * 100).toFixed(1)}%
//       </text>
//     </g>
//   );
// };

const OrderStatusChart = ({ data }: { data: OrderData }) => {
  // const [activeIndex, setActiveIndex] = useState(0);

  const chartData = [
    { name: "Completed", value: data?.completedPercentage || 0 },
    { name: "Pending", value: data?.pendingPercentage || 0 },
    { name: "Cancelled", value: data?.cancelledPercentage || 0 },
  ];

  // const onPieEnter = (_: any, index: number) => setActiveIndex(index);

  return (
    <div className="flex flex-col justify-center items-center">
      <PieChart width={300} height={300}>
        <Pie
          // activeIndex={activeIndex}
          // activeShape={renderActiveShape}
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        // onMouseEnter={onPieEnter}
        >
          {chartData.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Legend
          verticalAlign="bottom"
          align="center"
          iconType="circle"
          formatter={(value: string) => {
            const percentage = chartData.find((d) => d.name === value)?.value;
            return (
              <span className="text-sm text-gray-700">
                {value}: {percentage}%
              </span>
            );
          }}
        />
      </PieChart>

      {/* Optional total orders in center */}
      <p className="text-gray-700 text-sm mt-2">
        Total Orders:{" "}
        <span className="font-semibold">{data?.totalOrders || 0}</span>
      </p>
    </div>
  );
};

export default OrderStatusChart;
