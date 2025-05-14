import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, ArrowRight, Lightbulb, TrendingUp, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface Insight {
  id: string
  type: "alert" | "insight" | "opportunity"
  title: string
  description: string
}

const insights: Insight[] = [
  {
    id: "1",
    type: "alert",
    title: "Scope 3 Emissions Increase",
    description: "Your Scope 3 emissions increased by 12% this quarter, primarily from supply chain activities.",
  },
  {
    id: "2",
    type: "insight",
    title: "Energy Efficiency Improvement",
    description:
      "Your energy efficiency measures have reduced electricity consumption by 5.2% compared to last quarter.",
  },
  {
    id: "3",
    type: "opportunity",
    title: "Renewable Energy Potential",
    description: "Upgrading 50% of lighting to LED could reduce energy costs by 20% and improve your CSRD score.",
  },
  {
    id: "4",
    type: "insight",
    title: "Diversity Ratio Improvement",
    description: "Gender diversity ratio has improved by 3.5% this quarter, exceeding industry benchmarks.",
  },
]

export function DashboardInsights() {
  return (
    <Card className="col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">AI Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight) => (
            <Card key={insight.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <div
                    className={cn(
                      "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                      insight.type === "alert" && "bg-red-100 text-red-500",
                      insight.type === "insight" && "bg-blue-100 text-blue-500",
                      insight.type === "opportunity" && "bg-green-100 text-green-500",
                    )}
                  >
                    {insight.type === "alert" && <AlertCircle className="h-3.5 w-3.5" />}
                    {insight.type === "insight" && <Lightbulb className="h-3.5 w-3.5" />}
                    {insight.type === "opportunity" && <TrendingUp className="h-3.5 w-3.5" />}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">{insight.title}</h4>
                    <p className="text-xs text-muted-foreground">{insight.description}</p>
                    <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                      View details <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <Button variant="outline" size="sm" className="mt-2" asChild>
            <Link href="/analytics/reports/new?tab=ai">
              <FileText className="mr-2 h-4 w-4" />
              Generate AI Report
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
