export interface AnalyticsSection {
  id: string
  title: string
  description: string
  emoji: string
  route: string
  features: string[]
  status?: 'available' | 'beta' | 'coming-soon'
}

export interface KPIData {
  id: string
  title: string
  value: string
  unit: string
  change: number
  status: "on-track" | "at-risk" | "off-track"
  lastUpdated: string
}

export interface AIInsight {
  id: string
  type: "performance" | "anomaly" | "prediction" | "recommendation"
  priority: "high" | "medium" | "low"
  title: string
  description: string
  confidence: number
}

export interface AnalyticsFilter {
  timePeriod: string
  location: string
  comparison: string
  esgCategories: string[]
  dataSources: string[]
  performanceStatus: string[]
}

export interface DashboardConfig {
  widgets: WidgetConfig[]
  filters: AnalyticsFilter
  layout: 'grid' | 'list' | 'cards'
}

export interface WidgetConfig {
  id: string
  type: 'kpi' | 'chart' | 'insight' | 'table'
  title: string
  position: { x: number; y: number; width: number; height: number }
  visible: boolean
  configuration: any
} 