import { useState } from "react"
import { Anomaly, ValidationRule, DataQualityFilters, AnomalySeverity, AnomalyStatus, CompletenessCheck } from "@/types/data-quality"
import { mockAnomalies, mockValidationRules, mockQualityMetrics, mockCompletenessChecks } from "@/data/mock-data-quality"

// AI Insight interface (should move to types file eventually)
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

export const useDataQuality = () => {
  const [anomalies, setAnomalies] = useState<Anomaly[]>(mockAnomalies)
  const [validationRules, setValidationRules] = useState<ValidationRule[]>(mockValidationRules)
  const [qualityMetrics] = useState(mockQualityMetrics)
  const [completenessChecks, setCompletenessChecks] = useState<CompletenessCheck[]>(mockCompletenessChecks)
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([])
  const [selectedAnomaly, setSelectedAnomaly] = useState<Anomaly | null>(null)
  const [filters, setFilters] = useState<DataQualityFilters>({
    severity: "all",
    status: "all", 
    searchTerm: ""
  })

  const filteredAnomalies = anomalies.filter(anomaly => {
    const severityMatch = filters.severity === "all" || anomaly.severity === filters.severity
    const statusMatch = filters.status === "all" || anomaly.status === filters.status
    const searchMatch = filters.searchTerm === "" || 
      anomaly.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      anomaly.description.toLowerCase().includes(filters.searchTerm.toLowerCase())
    
    return severityMatch && statusMatch && searchMatch
  })

  const updateFilter = (key: keyof DataQualityFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleResolveAnomaly = (anomalyId: string, resolution: string) => {
    setAnomalies(prev => prev.map(anomaly => 
      anomaly.id === anomalyId 
        ? { 
            ...anomaly, 
            status: "resolved", 
            resolvedBy: "Current User",
            resolvedAt: new Date().toISOString(),
            resolutionNote: resolution
          }
        : anomaly
    ))
  }

  const handleAcceptAnomaly = (anomalyId: string, note: string) => {
    setAnomalies(prev => prev.map(anomaly => 
      anomaly.id === anomalyId 
        ? { 
            ...anomaly, 
            status: "accepted",
            resolvedBy: "Current User", 
            resolvedAt: new Date().toISOString(),
            resolutionNote: note
          }
        : anomaly
    ))
  }

  const handleFlagAnomaly = (anomalyId: string, assignedTo: string) => {
    setAnomalies(prev => prev.map(anomaly => 
      anomaly.id === anomalyId 
        ? { 
            ...anomaly, 
            status: "investigating",
            assignedTo: assignedTo
          }
        : anomaly
    ))
  }

  // Validation Rules methods
  const handleCreateValidationRule = (rule: Omit<ValidationRule, 'id' | 'createdAt' | 'createdBy' | 'violationCount'>) => {
    const newRule: ValidationRule = {
      ...rule,
      id: `rule_${Date.now()}`,
      createdAt: new Date().toISOString(),
      createdBy: "Current User",
      violationCount: 0
    }
    setValidationRules(prev => [...prev, newRule])
  }

  const handleUpdateValidationRule = (id: string, updates: Partial<ValidationRule>) => {
    setValidationRules(prev => prev.map(rule => 
      rule.id === id ? { ...rule, ...updates } : rule
    ))
  }

  const handleDeleteValidationRule = (id: string) => {
    setValidationRules(prev => prev.filter(rule => rule.id !== id))
  }

  const handleToggleValidationRule = (id: string, enabled: boolean) => {
    setValidationRules(prev => prev.map(rule => 
      rule.id === id ? { ...rule, enabled } : rule
    ))
  }

  // Data Completeness methods
  const handleCreateCompletenessCheck = (check: Omit<CompletenessCheck, 'id'>) => {
    const newCheck: CompletenessCheck = {
      ...check,
      id: `check_${Date.now()}`
    }
    setCompletenessChecks(prev => [...prev, newCheck])
  }

  const handleUpdateCompletenessCheck = (id: string, updates: Partial<CompletenessCheck>) => {
    setCompletenessChecks(prev => prev.map(check => 
      check.id === id ? { ...check, ...updates } : check
    ))
  }

  const handleSendReminder = (id: string) => {
    setCompletenessChecks(prev => prev.map(check => 
      check.id === id ? { ...check, remindersSent: check.remindersSent + 1 } : check
    ))
  }

  // AI Insights methods
  const handleRefreshInsights = () => {
    // Mock AI insights generation
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
        timestamp: new Date().toISOString(),
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
        timestamp: new Date().toISOString(),
        actionRequired: false,
        metrics: {
          currentValue: 85,
          previousValue: 100,
          changePercent: -15,
          unit: "% data gaps"
        }
      }
    ]
    setAiInsights(mockInsights)
  }

  const handleProvideFeedback = (insightId: string, helpful: boolean, note?: string) => {
    setAiInsights(prev => prev.map(insight => 
      insight.id === insightId 
        ? { 
            ...insight, 
            feedback: {
              helpful,
              userNote: note,
              timestamp: new Date().toISOString()
            }
          }
        : insight
    ))
  }

  const handleTakeAction = (insightId: string) => {
    // Navigate to relevant section or create task
    console.log(`Taking action for insight: ${insightId}`)
  }

  return {
    // Existing exports
    qualityMetrics,
    filteredAnomalies,
    selectedAnomaly,
    setSelectedAnomaly,
    filters,
    updateFilter,
    handleResolveAnomaly,
    handleAcceptAnomaly,
    handleFlagAnomaly,
    
    // New exports for validation rules
    validationRules,
    handleCreateValidationRule,
    handleUpdateValidationRule,
    handleDeleteValidationRule,
    handleToggleValidationRule,
    
    // New exports for data completeness
    completenessChecks,
    handleCreateCompletenessCheck,
    handleUpdateCompletenessCheck,
    handleSendReminder,
    
    // New exports for AI insights
    aiInsights,
    handleRefreshInsights,
    handleProvideFeedback,
    handleTakeAction
  }
} 