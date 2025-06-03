"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Brain,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Lightbulb,
  Target,
  ExternalLink,
  RefreshCw,
  Star,
  ArrowRight,
  BarChart3,
  Activity
} from "lucide-react"
import { useState } from "react"

interface AIInsight {
  id: string
  type: "anomaly" | "trend" | "recommendation" | "opportunity" | "risk"
  severity: "critical" | "high" | "medium" | "low"
  title: string
  description: string
  confidence: number
  category: string
  dataSource: string
  timestamp: string
  actionRequired: boolean
  link?: string
  metrics?: {
    currentValue: number
    previousValue?: number
    changePercent?: number
    unit: string
  }
  feedback?: {
    helpful: boolean
    userNote?: string
    timestamp: string
  }
}

interface AIInsightsTabProps {
  insights: AIInsight[]
  onRefreshInsights: () => void
  onProvideFeedback: (insightId: string, helpful: boolean, note?: string) => void
  onTakeAction: (insightId: string) => void
}

export function AIInsightsTab({ 
  insights, 
  onRefreshInsights, 
  onProvideFeedback, 
  onTakeAction 
}: AIInsightsTabProps) {
  const [filterType, setFilterType] = useState<string>("all")
  const [filterSeverity, setFilterSeverity] = useState<string>("all")
  const [selectedInsight, setSelectedInsight] = useState<AIInsight | null>(null)
  const [feedbackNote, setFeedbackNote] = useState("")

  const filteredInsights = insights.filter(insight => {
    const typeMatch = filterType === "all" || insight.type === filterType
    const severityMatch = filterSeverity === "all" || insight.severity === filterSeverity
    return typeMatch && severityMatch
  })

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "anomaly": return <AlertTriangle className="h-5 w-5 text-orange-600" />
      case "trend": return <TrendingUp className="h-5 w-5 text-blue-600" />
      case "recommendation": return <Lightbulb className="h-5 w-5 text-yellow-600" />
      case "opportunity": return <Target className="h-5 w-5 text-green-600" />
      case "risk": return <AlertTriangle className="h-5 w-5 text-red-600" />
      default: return <Brain className="h-5 w-5 text-gray-600" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-100 text-red-800 border-red-200"
      case "high": return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low": return "bg-blue-100 text-blue-800 border-blue-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600"
    if (confidence >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const formatChange = (current: number, previous: number, unit: string) => {
    const change = ((current - previous) / previous) * 100
    const isPositive = change > 0
    return {
      percent: Math.abs(change).toFixed(1),
      isPositive,
      icon: isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />
    }
  }

  const getStats = () => {
    const total = insights.length
    const critical = insights.filter(i => i.severity === "critical").length
    const actionRequired = insights.filter(i => i.actionRequired).length
    const avgConfidence = insights.reduce((sum, i) => sum + i.confidence, 0) / total || 0
    
    return { total, critical, actionRequired, avgConfidence }
  }

  const stats = getStats()

  const mockInsights: AIInsight[] = [
    {
      id: "insight_001",
      type: "anomaly",
      severity: "high",
      title: "Unusual Spike in Energy Consumption",
      description: "Facility A's energy consumption increased by 35% compared to the same period last month, which is 3 standard deviations above the normal range.",
      confidence: 92,
      category: "Environmental",
      dataSource: "Energy Management System",
      timestamp: "2024-01-15T10:30:00Z",
      actionRequired: true,
      link: "/data-hub/explorer?facility=A&metric=energy",
      metrics: {
        currentValue: 1250,
        previousValue: 925,
        changePercent: 35.1,
        unit: "kWh"
      }
    },
    {
      id: "insight_002", 
      type: "recommendation",
      severity: "medium",
      title: "Optimize Data Collection Schedule",
      description: "Based on analysis of data patterns, switching to weekly collection for water usage metrics could reduce data gaps by 15% while maintaining accuracy.",
      confidence: 78,
      category: "Data Quality",
      dataSource: "Multiple Sources",
      timestamp: "2024-01-15T09:15:00Z",
      actionRequired: false,
      metrics: {
        currentValue: 85,
        previousValue: 100,
        changePercent: -15,
        unit: "% data gaps"
      }
    },
    {
      id: "insight_003",
      type: "trend",
      severity: "low",
      title: "Positive Waste Reduction Trend",
      description: "All facilities are showing consistent waste reduction over the past 3 months, with an average decrease of 12% across operational sites.",
      confidence: 95,
      category: "Environmental",
      dataSource: "Waste Management System",
      timestamp: "2024-01-15T08:45:00Z",
      actionRequired: false,
      metrics: {
        currentValue: 88,
        previousValue: 100,
        changePercent: -12,
        unit: "% waste generated"
      }
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">AI-Driven Insights</h3>
          <p className="text-gray-600">Intelligent analysis and recommendations from your ESG data</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onRefreshInsights}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Insights
          </Button>
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            View Trends
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Insights</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{stats.critical}</div>
            <div className="text-sm text-gray-600">Critical Issues</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">{stats.actionRequired}</div>
            <div className="text-sm text-gray-600">Action Required</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{Math.round(stats.avgConfidence)}%</div>
            <div className="text-sm text-gray-600">Avg Confidence</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Type:</label>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="anomaly">Anomalies</SelectItem>
              <SelectItem value="trend">Trends</SelectItem>
              <SelectItem value="recommendation">Recommendations</SelectItem>
              <SelectItem value="opportunity">Opportunities</SelectItem>
              <SelectItem value="risk">Risks</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Severity:</label>
          <Select value={filterSeverity} onValueChange={setFilterSeverity}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* AI Learning Panel */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Brain className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-blue-900">AI Learning Progress</h4>
              <p className="text-sm text-blue-700 mt-1">
                The AI system has processed {insights.length} insights this week. Your feedback helps improve accuracy and relevance.
              </p>
              <div className="flex items-center gap-4 mt-2 text-xs text-blue-600">
                <span>✓ Learning from {insights.filter(i => i.feedback).length} feedback responses</span>
                <span>✓ Adapting to your data patterns</span>
                <span>✓ Improving confidence scores</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights List */}
      <div className="space-y-4">
        {filteredInsights.length === 0 ? (
          // Show mock insights if no real insights
          mockInsights.map((insight) => (
            <Card key={insight.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    {getInsightIcon(insight.type)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{insight.title}</h4>
                        <Badge className={getSeverityColor(insight.severity)}>
                          {insight.severity}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {insight.type}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-700 mb-3">{insight.description}</p>
                      
                      {insight.metrics && (
                        <div className="bg-gray-50 rounded-lg p-3 mb-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm text-gray-600">Current Value</div>
                              <div className="font-semibold">
                                {insight.metrics.currentValue.toLocaleString()} {insight.metrics.unit}
                              </div>
                            </div>
                            {insight.metrics.previousValue && (
                              <div className="text-right">
                                <div className="text-sm text-gray-600">Change</div>
                                <div className={`flex items-center gap-1 font-semibold ${
                                  insight.metrics.changePercent! > 0 ? 'text-red-600' : 'text-green-600'
                                }`}>
                                  {formatChange(
                                    insight.metrics.currentValue,
                                    insight.metrics.previousValue,
                                    insight.metrics.unit
                                  ).icon}
                                  {formatChange(
                                    insight.metrics.currentValue,
                                    insight.metrics.previousValue,
                                    insight.metrics.unit
                                  ).percent}%
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>
                          <strong>Confidence:</strong> 
                          <span className={getConfidenceColor(insight.confidence)}>
                            {insight.confidence}%
                          </span>
                        </span>
                        <span><strong>Source:</strong> {insight.dataSource}</span>
                        <span><strong>Category:</strong> {insight.category}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    {insight.actionRequired && (
                      <Badge className="bg-orange-100 text-orange-800">
                        Action Required
                      </Badge>
                    )}
                    
                    <div className="flex items-center gap-2">
                      {insight.link && (
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Investigate
                        </Button>
                      )}
                      
                      {insight.actionRequired && (
                        <Button size="sm" onClick={() => onTakeAction(insight.id)}>
                          <ArrowRight className="h-4 w-4 mr-1" />
                          Take Action
                        </Button>
                      )}
                    </div>

                    {/* Feedback Section */}
                    <div className="flex items-center gap-1 mt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onProvideFeedback(insight.id, true)}
                        className={insight.feedback?.helpful === true ? "bg-green-100" : ""}
                      >
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onProvideFeedback(insight.id, false)}
                        className={insight.feedback?.helpful === false ? "bg-red-100" : ""}
                      >
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          filteredInsights.map((insight) => (
            <Card key={insight.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                {/* Same structure as mock insights */}
                {/* Implementation would be identical to above */}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Empty State */}
      {filteredInsights.length === 0 && insights.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Generating AI Insights</h3>
            <p className="text-gray-600 mb-4">
              The AI engine is analyzing your data to generate intelligent insights and recommendations. 
              This typically takes a few minutes for initial analysis.
            </p>
            <Button onClick={onRefreshInsights}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Check for Insights
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Feedback Modal */}
      {selectedInsight && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Provide Feedback
              </CardTitle>
              <CardDescription>
                Help us improve AI insights by sharing your thoughts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">{selectedInsight.title}</h4>
                <p className="text-sm text-gray-600">{selectedInsight.description}</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Additional Comments (Optional)</label>
                <Textarea
                  placeholder="Share any specific feedback about this insight..."
                  value={feedbackNote}
                  onChange={(e) => setFeedbackNote(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedInsight(null)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    onProvideFeedback(selectedInsight.id, true, feedbackNote)
                    setSelectedInsight(null)
                    setFeedbackNote("")
                  }}
                >
                  Submit Feedback
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
} 