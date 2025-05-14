import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, MoreHorizontal, RefreshCw } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { LucideIcon } from "lucide-react"

interface AnalyticsChartProps {
  title: string
  type: "bar" | "line" | "pie" | "radar"
  icon: LucideIcon
}

export function AnalyticsChart({ title, type, icon: Icon }: AnalyticsChartProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="text-base">{title}</CardTitle>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Download className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Chart Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Change Chart Type</DropdownMenuItem>
              <DropdownMenuItem>Edit Data Source</DropdownMenuItem>
              <DropdownMenuItem>View Full Screen</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Remove Widget</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex h-[250px] items-center justify-center rounded-md border-2 border-dashed p-6">
          <div className="text-center">
            <p className="text-sm font-medium">{type.charAt(0).toUpperCase() + type.slice(1)} Chart Visualization</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {type === "bar" && "Showing comparative data across categories"}
              {type === "line" && "Showing trends over time"}
              {type === "pie" && "Showing proportion of total"}
              {type === "radar" && "Showing multiple variables comparison"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
