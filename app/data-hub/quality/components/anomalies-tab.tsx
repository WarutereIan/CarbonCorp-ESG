"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, Download } from "lucide-react"
import { Anomaly, DataQualityFilters } from "@/types/data-quality"
import { AnomalyListItem } from "./anomaly-list-item"

interface AnomaliesTabProps {
  anomalies: Anomaly[]
  filters: DataQualityFilters
  onFilterUpdate: (key: keyof DataQualityFilters, value: string) => void
  onViewAnomaly: (anomaly: Anomaly) => void
  onResolveAnomaly?: (anomalyId: string) => void
  onFlagAnomaly?: (anomalyId: string) => void
}

export function AnomaliesTab({ 
  anomalies, 
  filters, 
  onFilterUpdate, 
  onViewAnomaly,
  onResolveAnomaly,
  onFlagAnomaly 
}: AnomaliesTabProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Data Anomalies</CardTitle>
          <CardDescription>
            Review and resolve data quality issues detected by validation rules and AI analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search anomalies..."
                value={filters.searchTerm}
                onChange={(e) => onFilterUpdate("searchTerm", e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filters.severity} onValueChange={(value) => onFilterUpdate("severity", value)}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filters.status} onValueChange={(value) => onFilterUpdate("status", value)}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="investigating">Investigating</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="excluded">Excluded</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          {/* Anomalies List */}
          <div className="space-y-4">
            {anomalies.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No anomalies found matching your criteria
              </div>
            ) : (
              anomalies.map((anomaly) => (
                <AnomalyListItem
                  key={anomaly.id}
                  anomaly={anomaly}
                  onView={onViewAnomaly}
                  onResolve={onResolveAnomaly}
                  onFlag={onFlagAnomaly}
                />
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 