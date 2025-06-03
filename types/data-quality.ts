export type AnomalyStatus = "pending" | "investigating" | "resolved" | "accepted" | "excluded"
export type AnomalySeverity = "critical" | "high" | "medium" | "low"
export type ValidationRuleType = "range" | "format" | "completeness" | "consistency" | "threshold"
export type DataCategory = "environmental" | "social" | "governance" | "financial"

export interface ValidationRule {
  id: string
  name: string
  description: string
  type: ValidationRuleType
  category: DataCategory
  dataSource: string
  field: string
  parameters: Record<string, any>
  enabled: boolean
  severity: AnomalySeverity
  createdBy: string
  createdAt: string
  lastTriggered?: string
  violationCount: number
}

export interface Anomaly {
  id: string
  ruleId?: string
  ruleName?: string
  type: "validation" | "statistical" | "trend" | "correlation"
  severity: AnomalySeverity
  status: AnomalyStatus
  title: string
  description: string
  metric: string
  value: string | number
  expectedRange?: string
  dataSource: string
  facility?: string
  timestamp: string
  assignedTo?: string
  resolvedBy?: string
  resolvedAt?: string
  resolutionNote?: string
  confidence: number
  context: {
    historicalAverage?: number
    lastPeriodValue?: number
    standardDeviation?: number
    trendDirection?: "up" | "down" | "stable"
  }
}

export interface DataQualityMetrics {
  overallScore: number
  completenessScore: number
  accuracyScore: number
  timelinessScore: number
  consistencyScore: number
  totalDataPoints: number
  qualityTrend: number
  anomaliesDetected: number
  anomaliesResolved: number
  dataSourcesMonitored: number
}

export interface CompletenessCheck {
  id: string
  name: string
  dataCategory: DataCategory
  expectedFrequency: "daily" | "weekly" | "monthly" | "quarterly"
  lastReceived?: string
  nextDue: string
  status: "current" | "overdue" | "missing"
  completeness: number
  sources: string[]
  remindersSent: number
}

export interface DataQualityFilters {
  severity: AnomalySeverity | "all"
  status: AnomalyStatus | "all"
  searchTerm: string
} 