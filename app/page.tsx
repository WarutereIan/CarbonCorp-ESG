import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardMetrics } from "@/components/dashboard/dashboard-metrics"
import { DashboardInsights } from "@/components/dashboard/dashboard-insights"
import { DashboardCompliance } from "@/components/dashboard/dashboard-compliance"
import { DashboardRiskMap } from "@/components/dashboard/dashboard-risk-map"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <DashboardHeader />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <DashboardMetrics />
        <DashboardCompliance />
        <DashboardInsights />
      </div>
      <DashboardRiskMap />
    </div>
  )
}
