"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { KPIData, AIInsight } from "../types/analytics-types"
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  RefreshCw
} from "lucide-react"

export function DashboardOverview() {
  const keyKPIs: KPIData[] = [
    {
      id: "emissions",
      title: "Carbon Emissions",
      value: "1,245.8",
      unit: "tCO₂e",
      change: -8.2,
      status: "on-track",
      lastUpdated: "2024-05-20"
    },
    {
      id: "renewable",
      title: "Renewable Energy",
      value: "32.5",
      unit: "%",
      change: 8.7,
      status: "on-track",
      lastUpdated: "2024-05-19"
    },
    {
      id: "water",
      title: "Water Usage",
      value: "12,450",
      unit: "m³",
      change: -3.2,
      status: "at-risk",
      lastUpdated: "2024-05-18"
    },
    {
      id: "diversity",
      title: "Board Diversity",
      value: "42",
      unit: "%",
      change: 5.3,
      status: "on-track",
      lastUpdated: "2024-05-17"
    }
  ]

  const topInsights: AIInsight[] = [
    {
      id: "1",
      type: "anomaly",
      priority: "high",
      title: "Water Usage Spike Detected",
      description: "Lagos facilities showing 15% increase in water consumption vs. historical patterns.",
      confidence: 92
    },
    {
      id: "2",
      type: "prediction",
      priority: "medium",
      title: "Renewable Energy Target on Track",
      description: "95% likelihood of meeting 40% renewable energy target by Q4 2024.",
      confidence: 88
    },
    {
      id: "3",
      type: "recommendation",
      priority: "low",
      title: "Training Investment Opportunity",
      description: "Strong correlation between training hours and safety performance suggests expansion opportunity.",
      confidence: 85
    }
  ]

  const getKPIStatusIcon = (status: string) => {
    switch (status) {
      case "on-track":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "at-risk":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "off-track":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  const getChangeIcon = (change: number) => {
    return change >= 0 ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    )
  }

  const getInsightPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  const formatChange = (change: number) => {
    const sign = change >= 0 ? "+" : ""
    return `${sign}${change.toFixed(1)}%`
  }

  return (
    <div className="space-y-6">
      {/* Key Performance Indicators */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Key Performance Indicators</h2>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {keyKPIs.map((kpi) => (
            <Card key={kpi.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-sm text-muted-foreground">
                    {kpi.title}
                  </h3>
                  {getKPIStatusIcon(kpi.status)}
                </div>
                
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-2xl font-bold">
                    {kpi.value}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {kpi.unit}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {getChangeIcon(kpi.change)}
                    <span className={`text-sm ${
                      kpi.change >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {formatChange(kpi.change)}
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {kpi.lastUpdated}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* AI-Powered Insights */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">AI-Powered Insights</h2>
          <Badge variant="secondary" className="text-xs">
            🤖 AI Generated
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {topInsights.map((insight) => (
            <Card key={insight.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <Badge 
                    variant={getInsightPriorityColor(insight.priority) as any}
                    className="text-xs capitalize"
                  >
                    {insight.priority} Priority
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {insight.confidence}% Confidence
                  </Badge>
                </div>
                
                <h3 className="font-medium mb-2 text-sm">
                  {insight.title}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {insight.description}
                </p>
                
                <Button variant="ghost" size="sm" className="mt-3 p-0 h-auto text-primary">
                  View Details →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
} 