import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { EmissionSubstanceCount } from "@/api/manageAdminDashboard"

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-6))",
  "hsl(var(--chart-7))",
  "hsl(var(--chart-8))",
  "hsl(var(--chart-9))",
]

interface EmissionSubstancePieChartProps {
  data: EmissionSubstanceCount[];
}

const EmissionSubstancePieChart = ({ data }: EmissionSubstancePieChartProps) => {
  const chartData = data
    .filter((item) => item.count > 0)
    .map((item, index) => ({
      name: item.compartmentName,
      value: item.count,
      color: COLORS[index % COLORS.length],
    }))

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Emission Substance Distribution</CardTitle>
        <CardDescription>Distribution of emission substances by compartment</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            value: {
              label: "Count",
            },
          }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default EmissionSubstancePieChart