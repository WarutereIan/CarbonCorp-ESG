export interface MaterialityAssessmentData {
  id: string
  name: string
  status: "completed" | "in-progress" | "draft"
  completedAt?: string
  lastModified: string
  industryContext: {
    industry: string
    subIndustry: string
    regions: string[]
    companySize: string
  }
  materialTopics: Array<{
    id: string
    name: string
    category: "environmental" | "social" | "governance"
    stakeholderImportance: number
    businessImpact: number
    priority: "high" | "monitor" | "consider"
  }>
  assessmentMetadata: {
    completedSteps: number
    totalSteps: number
    stakeholderInput: string
    customStakeholders: number
  }
}

export interface RiskScenario {
  id: string
  name: string
  type: "climate-physical" | "climate-transition" | "regulatory" | "market-disruption" | "social-unrest" | "supply-chain"
  status: "completed" | "running" | "draft"
  createdAt: string
  lastRun?: string
  config: {
    timeHorizon: "short" | "medium" | "long"
    scope: string
    parameters: Record<string, any>
  }
  results?: {
    overallRiskScore: number
    financialImpact: {
      revenueRisk: number
      costIncrease: number
      assetRisk: number
    }
    riskCategories: Array<{
      category: string
      severity: "critical" | "high" | "medium" | "low"
      probability: number
      impact: number
    }>
  }
}

export interface GeneratedReport {
  id: string
  title: string
  type: "full-report" | "section" | "executive-summary" | "custom"
  framework?: string
  status: "draft" | "review" | "published"
  generatedAt: string
  wordCount: number
  aiConfidence: number
  prompt: string
  sections: Array<{
    title: string
    wordCount: number
    status: "generated" | "reviewed" | "approved"
  }>
  lastModified: string
}

export interface ESGStrategy {
  id: string
  name: string
  status: "draft" | "approved" | "active" | "completed"
  timeHorizon: string
  scope: string
  createdAt: string
  lastModified: string
  pillars: Array<{
    id: string
    name: string
    objectives: number
    initiatives: number
    kpis: number
    progress: number
  }>
  linkedMaterialityAssessment?: string
  linkedRiskScenarios: string[]
  implementation: {
    totalInitiatives: number
    completedInitiatives: number
    overallProgress: number
  }
}

export interface AIInsightSummary {
  totalInsights: number
  byType: Record<string, number>
  bySeverity: Record<string, number>
  actionableItems: number
  recentInsights: Array<{
    id: string
    type: string
    title: string
    severity: "critical" | "high" | "medium" | "low"
    timestamp: string
  }>
} 