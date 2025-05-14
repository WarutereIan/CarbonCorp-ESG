import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

type ComplianceStatus = "compliant" | "partial" | "non-compliant"

interface ComplianceItem {
  standard: string
  status: ComplianceStatus
  progress: number
  dueDate: string
}

const complianceData: ComplianceItem[] = [
  {
    standard: "ISSB Climate",
    status: "compliant",
    progress: 100,
    dueDate: "Complete",
  },
  {
    standard: "CSRD",
    status: "partial",
    progress: 75,
    dueDate: "30 Jun 2024",
  },
  {
    standard: "Nigeria SEC",
    status: "partial",
    progress: 60,
    dueDate: "15 Jul 2024",
  },
  {
    standard: "JSE",
    status: "non-compliant",
    progress: 25,
    dueDate: "31 Aug 2024",
  },
  {
    standard: "Kenya NEMA",
    status: "compliant",
    progress: 100,
    dueDate: "Complete",
  },
]

export function DashboardCompliance() {
  return (
    <Card className="col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Compliance Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {complianceData.map((item) => (
            <div key={item.standard} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{item.standard}</span>
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs",
                    item.status === "compliant" && "border-green-500 text-green-500",
                    item.status === "partial" && "border-amber-500 text-amber-500",
                    item.status === "non-compliant" && "border-red-500 text-red-500",
                  )}
                >
                  {item.status === "compliant" && "Compliant"}
                  {item.status === "partial" && "Partial"}
                  {item.status === "non-compliant" && "Non-Compliant"}
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <Progress
                  value={item.progress}
                  className={cn(
                    "h-2 flex-1",
                    item.status === "compliant" && "bg-green-100 [&>div]:bg-green-500",
                    item.status === "partial" && "bg-amber-100 [&>div]:bg-amber-500",
                    item.status === "non-compliant" && "bg-red-100 [&>div]:bg-red-500",
                  )}
                />
                <span className="text-xs text-muted-foreground w-20 text-right">{item.dueDate}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
