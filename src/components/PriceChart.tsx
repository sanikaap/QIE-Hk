import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Card } from "@/components/ui/card";

interface PriceData {
  date: string;
  price: number;
}

interface PriceChartProps {
  data: PriceData[];
  title: string;
  color?: string;
}

const PriceChart = ({ data, title, color = "#FF7A00" }: PriceChartProps) => {
  return (
    <Card className="card-gradient border border-border p-6">
      <h3 className="text-lg font-semibold mb-4 gradient-text">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
          <XAxis 
            dataKey="date" 
            stroke="#8888aa"
            fontSize={12}
          />
          <YAxis 
            stroke="#8888aa"
            fontSize={12}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1a1a2e",
              border: "1px solid #2a2a3e",
              borderRadius: "8px",
              color: "#fff"
            }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, "Price"]}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke={color}
            strokeWidth={2}
            fill="url(#colorPrice)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default PriceChart;
