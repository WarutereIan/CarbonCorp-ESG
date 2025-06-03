"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Flag } from "lucide-react"
import { Anomaly } from "@/types/data-quality"
import { getAnomalyStatusColor, getSeverityColor, formatConfidence } from "@/lib/data-quality-utils"

interface AnomalyListItemProps {
  anomaly: Anomaly
  onView: (anomaly: Anomaly) => void
  onFlag?: (anomalyId: string) => void
  onResolve?: (anomalyId: string) => void
}

export function AnomalyListItem({ anomaly, onView, onFlag, onResolve }: AnomalyListItemProps) {
  return (
    <div className="border rounded-lg p-4 hover:bg-gray-50">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge className={getSeverityColor(anomaly.severity)}>
              {anomaly.severity}
            </Badge>
            <Badge className={getAnomalyStatusColor(anomaly.status)}>
              {anomaly.status}
            </Badge>
            <Badge variant="outline">{anomaly.type}</Badge>
            {anomaly.facility && (
              <span className="text-sm text-gray-500">{anomaly.facility}</span>
            )}
          </div>
          
          <h4 className="font-medium mb-1">{anomaly.title}</h4>
          <p className="text-sm text-gray-600 mb-2">{anomaly.description}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Metric:</span>
              <div className="font-medium">{anomaly.metric}</div>
            </div>
            <div>
              <span className="text-gray-500">Value:</span>
              <div className="font-medium">{anomaly.value}</div>
            </div>
            <div>
              <span className="text-gray-500">Source:</span>
              <div className="font-medium">{anomaly.dataSource}</div>
            </div>
            <div>
              <span className="text-gray-500">Confidence:</span>
              <div className="font-medium">{formatConfidence(anomaly.confidence)}</div>
            </div>
          </div>

          {anomaly.context && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
              <div className="text-sm">
                <span className="font-medium">Context: </span>
                {anomaly.context.historicalAverage && (
                  <span>Historical avg: {anomaly.context.historicalAverage} | </span>
                )}
                {anomaly.context.lastPeriodValue && (
                  <span>Previous: {anomaly.context.lastPeriodValue}</span>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2 ml-4">
          <Button variant="outline" size="sm" onClick={() => onView(anomaly)}>
            <Eye className="h-4 w-4" />
          </Button>
          {anomaly.status === "pending" && (
            <>
              {onFlag && (
                <Button variant="outline" size="sm" onClick={() => onFlag(anomaly.id)}>
                  <Flag className="h-4 w-4" />
                </Button>
              )}
              {onResolve && (
                <Button size="sm" onClick={() => onResolve(anomaly.id)}>
                  Resolve
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
} 