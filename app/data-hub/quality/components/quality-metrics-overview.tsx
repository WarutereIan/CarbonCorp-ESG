"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Database, AlertTriangle, CheckCircle2, Zap } from "lucide-react"
import { DataQualityMetrics } from "@/types/data-quality"
import { getQualityScoreColor, formatNumber } from "@/lib/data-quality-utils"

interface QualityMetricsOverviewProps {
  metrics: DataQualityMetrics
}

export function QualityMetricsOverview({ metrics }: QualityMetricsOverviewProps) {
  return (
    <>
      {/* Overall Quality Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Data Quality Overview
          </CardTitle>
          <CardDescription>
            Real-time monitoring of ESG data quality across all sources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className={`text-4xl font-bold ${getQualityScoreColor(metrics.overallScore)}`}>
                {metrics.overallScore}%
              </div>
              <div className="text-sm text-gray-600 mt-1">Overall Quality Score</div>
              <div className="flex items-center justify-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500">+{metrics.qualityTrend}%</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Completeness</span>
                <span className="font-medium">{metrics.completenessScore}%</span>
              </div>
              <Progress value={metrics.completenessScore} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Accuracy</span>
                <span className="font-medium">{metrics.accuracyScore}%</span>
              </div>
              <Progress value={metrics.accuracyScore} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Consistency</span>
                <span className="font-medium">{metrics.consistencyScore}%</span>
              </div>
              <Progress value={metrics.consistencyScore} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Data Points</p>
                <p className="text-2xl font-bold">{formatNumber(metrics.totalDataPoints)}</p>
              </div>
              <Database className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Anomalies Detected</p>
                <p className="text-2xl font-bold text-orange-600">{metrics.anomaliesDetected}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Anomalies Resolved</p>
                <p className="text-2xl font-bold text-green-600">{metrics.anomaliesResolved}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Data Sources</p>
                <p className="text-2xl font-bold">{metrics.dataSourcesMonitored}</p>
              </div>
              <Zap className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
} 