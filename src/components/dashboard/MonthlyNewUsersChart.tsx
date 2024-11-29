import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { MonthlyUserCount } from "@/api/manageAdminDashboard"

interface MonthlyNewUsersChartProps {
  data: MonthlyUserCount[];
}

const MonthlyNewUsersChart = ({ data }: MonthlyNewUsersChartProps) => {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Monthly New Users</CardTitle>
        <CardDescription>
          The number of new users registered each month
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartContainer
          config={{
            userCount: {
              label: "New Users",
              color: "hsl(var(--chart-2))",
            },      
          }}
          className="min-h-[200px]"
        >
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data}>
              <XAxis
                dataKey="month"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Bar dataKey="userCount" fill="var(--color-userCount)" radius={[4, 4, 0, 0]} />
              <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default MonthlyNewUsersChart