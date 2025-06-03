"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { XCircle } from "lucide-react"
import { Anomaly } from "@/types/data-quality"
import { getAnomalyStatusColor, getSeverityColor, formatConfidence } from "@/lib/data-quality-utils"

interface AnomalyDetailModalProps {
  anomaly: Anomaly
  onClose: () => void
  onResolve: (anomalyId: string, resolution: string) => void
  onAccept: (anomalyId: string, note: string) => void
}

export function AnomalyDetailModal({ anomaly, onClose, onResolve, onAccept }: AnomalyDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">{anomaly.title}</h3>
              <div className="flex items-center gap-2 mt-2">
                <Badge className={getSeverityColor(anomaly.severity)}>
                  {anomaly.severity}
                </Badge>
                <Badge className={getAnomalyStatusColor(anomaly.status)}>
                  {anomaly.status}
                </Badge>
              </div>
            </div>
            <Button variant="outline" onClick={onClose}>
              <XCircle className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Description</Label>
              <p className="text-sm text-gray-600">{anomaly.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Metric</Label>
                <p className="text-sm">{anomaly.metric}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Value</Label>
                <p className="text-sm">{anomaly.value}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Data Source</Label>
                <p className="text-sm">{anomaly.dataSource}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Confidence</Label>
                <p className="text-sm">{formatConfidence(anomaly.confidence)}</p>
              </div>
            </div>
            
            {anomaly.expectedRange && (
              <div>
                <Label className="text-sm font-medium">Expected Range</Label>
                <p className="text-sm text-gray-600">{anomaly.expectedRange}</p>
              </div>
            )}
            
            {anomaly.context && (
              <div>
                <Label className="text-sm font-medium">Context</Label>
                <div className="p-3 bg-gray-50 rounded-lg text-sm">
                  {anomaly.context.historicalAverage && (
                    <div>Historical Average: {anomaly.context.historicalAverage}</div>
                  )}
                  {anomaly.context.lastPeriodValue && (
                    <div>Previous Period: {anomaly.context.lastPeriodValue}</div>
                  )}
                  {anomaly.context.standardDeviation && (
                    <div>Standard Deviation: {anomaly.context.standardDeviation}</div>
                  )}
                </div>
              </div>
            )}
            
            {anomaly.status === "pending" && (
              <div className="flex gap-2 pt-4">
                <Button 
                  variant="outline"
                  onClick={() => onAccept(anomaly.id, "Accepted as valid data point")}
                >
                  Accept as Valid
                </Button>
                <Button 
                  onClick={() => onResolve(anomaly.id, "Corrected data value")}
                >
                  Mark as Resolved
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 