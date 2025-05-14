import { Card, CardContent } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface AnalyticsKpiCardProps {
  title: string
  value: string
  unit: string
  change: number
  target: string
  progress: number
}

export function AnalyticsKpiCard({ title, value, unit, change, target, progress }: AnalyticsKpiCardProps) {
  // Determine if the change is positive or negative based on the value
  const isPositive = change >= 0

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div
              className={cn("flex items-center text-xs font-medium", isPositive ? "text-green-500" : "text-red-500")}
            >
              {isPositive ? <ArrowUpIcon className="mr-1 h-3 w-3" /> : <ArrowDownIcon className="mr-1 h-3 w-3" />}
              {Math.abs(change)}%
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <p className="text-3xl font-bold">{value}</p>
            <span className="text-sm text-muted-foreground">{unit}</span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span>Progress to target</span>
              <span>
                {target} {unit}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{progress}%</span>
              <span>Target</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
