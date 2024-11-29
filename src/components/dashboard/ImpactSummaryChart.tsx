import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ImpactData {
  categoryName: string;
  totalValue: number;
}

interface ImpactSummaryChartProps {
  data: ImpactData[];
}

const ImpactSummaryChart = ({ data }: ImpactSummaryChartProps) => {
  // Sort data by total value
  const sortedData = [...data].sort((a, b) => b.totalValue - a.totalValue);
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Impact Summary</CardTitle>
        <CardDescription>Environmental impact categories</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartContainer
          config={{
            totalValue: {
              label: "Impact Value",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="min-h-[400px]"
        >
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={sortedData} layout="vertical">
              <XAxis type="number" />
              <YAxis
                dataKey="categoryName"
                type="category"
                width={150}
                tickFormatter={(value) =>
                  value.length > 20 ? `${value.slice(0, 20)}...` : value
                }
              />
              <Bar dataKey="totalValue" radius={[0, 4, 4, 0]}>
                {sortedData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.totalValue >= 0
                        ? "var(--color-totalValue)"
                        : "hsl(var(--destructive))"
                    }
                  />
                ))}
              </Bar>
              <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default ImpactSummaryChart
