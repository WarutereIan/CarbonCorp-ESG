"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Eye } from "lucide-react"
import { DataQualityMetrics, Anomaly } from "@/types/data-quality"
import { QualityMetricsOverview } from "./quality-metrics-overview"
import { getSeverityColor } from "@/lib/data-quality-utils"

interface DashboardTabProps {
  qualityMetrics: DataQualityMetrics
  topIssues: Anomaly[]
  onViewAnomaly: (anomaly: Anomaly) => void
}

export function DashboardTab({ qualityMetrics, topIssues, onViewAnomaly }: DashboardTabProps) {
  return (
    <div className="space-y-6">
      <QualityMetricsOverview metrics={qualityMetrics} />

      {/* Top Issues */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Quality Issues</CardTitle>
            <CardDescription>Issues requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topIssues.slice(0, 3).map((anomaly) => (
                <div key={anomaly.id} className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={getSeverityColor(anomaly.severity)}>
                        {anomaly.severity}
                      </Badge>
                      <span className="text-sm text-gray-500">{anomaly.facility}</span>
                    </div>
                    <h4 className="font-medium">{anomaly.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{anomaly.description}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => onViewAnomaly(anomaly)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Quality Trends</CardTitle>
            <CardDescription>Quality metrics over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center py-8">
                <BarChart3 className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-600">Quality trend charts coming soon</p>
                <p className="text-sm text-gray-500 mt-2">
                  Interactive charts showing quality score trends, anomaly patterns, and data source health over time
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 