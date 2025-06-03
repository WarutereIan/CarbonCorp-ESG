// Strategy Builder Type Definitions

export interface MaterialityAssessment {
  id: string
  name: string
  completedAt: string
  materialTopics: Array<{
    id: string
    name: string
    category: string
    priority: 'high' | 'medium' | 'low'
    stakeholderImportance: number
    businessImpact: number
  }>
  industryContext: {
    industry: string
    subIndustry: string
    regions: string[]
    companySize: string
  }
}

export interface StrategyScope {
  name: string
  description: string
  timeHorizon: string
  scope: string
  linkedMaterialityAssessment?: string
  strategicThemes: string[]
  businessPriorities: string[]
  stakeholderPressures: string[]
  existingCommitments: string[]
  resourceCapacity: string
  regulatoryDrivers: string[]
}

export interface StrategicInitiative {
  id: string
  name: string
  description: string
  owner: string
  timeline: string
  budgetRange: string
  status: 'not-started' | 'planning' | 'in-progress' | 'completed'
  priority: 'critical' | 'high' | 'medium' | 'low'
  dependencies: string[]
  riskFactors: string[]
  expectedOutcomes: string[]
  kpis?: string[]
  regulatoryAlignment?: string[]
  stakeholderBenefit?: string[]
}

export interface StrategicObjective {
  id: string
  name: string
  description: string
  timeframe: string
  targetMetrics: string[]
  initiatives: StrategicInitiative[]
  regulatoryAlignment: string[]
  stakeholderBenefit: string[]
  successCriteria?: string[]
  measurableOutcomes?: string[]
}

export interface StrategicPillar {
  id: string
  name: string
  description: string
  relatedThemes: string[]
  objectives: StrategicObjective[]
  estimatedImpact: 'high' | 'medium' | 'low'
  feasibilityScore: number
  resourceAllocation?: {
    budgetPercentage: number
    fteAllocation: number
  }
  riskLevel?: 'high' | 'medium' | 'low'
}

export interface KPIMetric {
  name: string
  description: string
  target: string
  baseline: string
  frequency: string
  unit?: string
  formula?: string
  dataSource?: string
  responsibleParty?: string
}

export interface RegulatoryFramework {
  framework: string
  coverageScore: number
  gaps: string[]
  recommendations: string[]
  complianceDeadline?: string
  criticalRequirements?: string[]
}

export interface RiskFactor {
  category: string
  description: string
  impact: 'high' | 'medium' | 'low'
  probability: 'high' | 'medium' | 'low'
  mitigation: string
  owner?: string
  reviewDate?: string
}

export interface OpportunityArea {
  category: string
  description: string
  value: string
  timeline: string
  prerequisites?: string[]
  successFactors?: string[]
}

export interface BenchmarkInsights {
  industryComparison: string
  bestPractices: string[]
  peerAnalysis: string
  competitivePosition?: string
  improvementOpportunities?: string[]
}

export interface ImplementationPhase {
  phase: string
  duration: string
  keyMilestones: string[]
  criticalPath: string[]
  dependencies?: string[]
  riskFactors?: string[]
  successMetrics?: string[]
}

export interface ResourceEstimate {
  totalBudgetRange: string
  fteRequirement: string
  timelineOverview: string
  riskAssessment: string[]
  budgetBreakdown?: {
    category: string
    amount: string
    percentage: number
  }[]
  resourceConstraints?: string[]
}

export interface StrategyBlueprint {
  id?: string
  name?: string
  version?: string
  createdAt?: string
  updatedAt?: string
  status?: 'draft' | 'review' | 'approved' | 'active' | 'archived'
  
  executiveSummary: string
  strategicPillars: StrategicPillar[]
  
  kpiFramework: {
    category: string
    kpis: KPIMetric[]
  }[]
  
  regulatoryAlignment: RegulatoryFramework[]
  resourceEstimate: ResourceEstimate
  
  riskOpportunityAnalysis: {
    risks: RiskFactor[]
    opportunities: OpportunityArea[]
  }
  
  benchmarkInsights: BenchmarkInsights
  implementationRoadmap: ImplementationPhase[]
  
  metadata?: {
    industry?: string
    geography?: string[]
    companySize?: string
    lastReviewed?: string
    nextReview?: string
    approvedBy?: string
    tags?: string[]
  }
}

export interface AICoPilotInsight {
  id: string
  type: 'feasibility' | 'alignment' | 'gap' | 'suggestion' | 'risk' | 'opportunity' | 'optimization'
  severity: 'high' | 'medium' | 'low' | 'info'
  title: string
  description: string
  relatedElements: string[]
  recommendations: string[]
  timestamp: Date
  confidence?: number
  category?: string
  actionable?: boolean
  estimatedImpact?: 'high' | 'medium' | 'low'
}

export interface BenchmarkData {
  category: string
  metric: string
  yourValue: number
  industryAverage: number
  bestInClass: number
  percentile: number
  unit: string
  trend: 'improving' | 'stable' | 'declining'
  source: string
}

export interface RegulatoryRequirement {
  id: string
  framework: string
  requirement: string
  description: string
  applicability: 'mandatory' | 'recommended' | 'voluntary'
  deadline?: string
  penalty?: string
  relatedInitiatives: string[]
  complianceStatus: 'compliant' | 'partial' | 'non-compliant' | 'not-applicable'
  gapAnalysis?: string
}

export interface CollaborationProject {
  id: string
  name: string
  description: string
  relatedInitiatives: string[]
  assignedTo: string[]
  status: 'not-started' | 'planning' | 'in-progress' | 'completed' | 'on-hold'
  priority: 'critical' | 'high' | 'medium' | 'low'
  timeline: {
    startDate: string
    endDate: string
    milestones: Array<{
      name: string
      date: string
      status: 'pending' | 'completed' | 'overdue'
    }>
  }
  budget: {
    allocated: number
    spent: number
    currency: string
  }
  deliverables: string[]
  dependencies: string[]
}

export interface StrategyTemplate {
  id: string
  name: string
  description: string
  industry: string
  companySize: string
  applicableFrameworks: string[]
  blueprint: Partial<StrategyBlueprint>
  usageCount: number
  rating: number
  tags: string[]
  createdBy: string
  createdAt: string
  lastUsed?: string
}

export interface VersionHistory {
  version: string
  timestamp: string
  changes: Array<{
    type: 'added' | 'modified' | 'removed'
    element: string
    description: string
    author: string
  }>
  comment?: string
  approvedBy?: string
  approvalDate?: string
}

export interface StrategyReportConfig {
  format: 'pdf' | 'docx' | 'pptx' | 'html'
  sections: Array<{
    name: string
    included: boolean
    customization?: any
  }>
  branding: {
    logo?: string
    colors?: {
      primary: string
      secondary: string
    }
    companyName: string
  }
  recipients?: string[]
  scheduledDelivery?: {
    frequency: 'one-time' | 'weekly' | 'monthly' | 'quarterly'
    nextDelivery: string
  }
}

// Utility types for form states and UI
export interface FormState<T> {
  data: T
  errors: Record<string, string>
  isValid: boolean
  isDirty: boolean
}

export interface LoadingState {
  isLoading: boolean
  message?: string
  progress?: number
}

export interface UIState {
  selectedPillar?: string
  selectedObjective?: string
  selectedInitiative?: string
  viewMode: 'canvas' | 'outline' | 'timeline' | 'dashboard'
  showCoPilot: boolean
  activeTab?: string
  sidebarCollapsed?: boolean
} 