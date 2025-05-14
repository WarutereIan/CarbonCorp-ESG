import { Card, CardContent } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string
  unit: string
  change: number
  data: number[]
  changeType?: "positive" | "negative"
}

export function MetricCard({ title, value, unit, change, data, changeType }: MetricCardProps) {
  // Determine if the change is positive or negative based on the value
  // If changeType is provided, use that instead
  const isPositive = changeType ? changeType === "positive" : change >= 0

  // Calculate the min and max values for the sparkline
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min

  // Generate the sparkline path
  const width = 100
  const height = 30
  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width
      const y = height - ((value - min) / range) * height
      return `${x},${y}`
    })
    .join(" ")

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-1">
              <p className="text-2xl font-bold">{value}</p>
              <span className="text-xs text-muted-foreground">{unit}</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div
              className={cn("flex items-center text-xs font-medium", isPositive ? "text-green-500" : "text-red-500")}
            >
              {isPositive ? <ArrowUpIcon className="mr-1 h-3 w-3" /> : <ArrowDownIcon className="mr-1 h-3 w-3" />}
              {Math.abs(change)}%
            </div>
            <svg className="h-[30px] w-[100px]" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
              <path d={`M 0,${height} ${points} ${width},${height}`} fill="rgba(var(--primary), 0.1)" stroke="none" />
              <polyline points={points} fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
