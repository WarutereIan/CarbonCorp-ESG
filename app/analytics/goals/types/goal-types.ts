// ESG Goal & KPI Tracking Types

export interface ESGGoal {
  id: string
  name: string
  description: string
  category: 'environmental' | 'social' | 'governance' | 'custom'
  strategicTheme?: string // Link to AI Strategy Builder themes
  materialityTopics: string[] // Link to materiality assessment results
  
  // SMART Criteria
  specific: string
  measurable: string
  achievable: string
  relevant: string
  timeBound: string
  
  // Goal Properties
  goalType: 'absolute' | 'intensity' | 'percentage-reduction' | 'binary'
  status: 'draft' | 'active' | 'paused' | 'completed' | 'cancelled'
  priority: 'critical' | 'high' | 'medium' | 'low'
  
  // Timeline
  startDate: string
  targetDate: string
  reviewFrequency: 'monthly' | 'quarterly' | 'semi-annual' | 'annual'
  
  // Ownership & Accountability
  owner: string
  stakeholders: string[]
  approvedBy?: string
  approvalDate?: string
  
  // Linked Elements
  linkedKPIs: string[]
  linkedInitiatives: string[] // From Strategy Builder
  regulatoryFrameworks: string[]
  
  // Metadata
  createdAt: string
  updatedAt: string
  tags: string[]
  notes?: string
}

export interface KPIMetric {
  id: string
  name: string
  description: string
  unit: string
  
  // Data Mapping
  dataHubMetricId?: string // Link to Data Hub metrics
  calculationLogic: string
  formula?: string // For calculated KPIs
  
  // Baseline & Targets
  baseline: {
    value: number
    period: string
    establishedDate: string
    source: string
    confidence: 'high' | 'medium' | 'low'
  }
  
  targets: Array<{
    id: string
    type: 'interim' | 'final'
    value: number
    targetDate: string
    description?: string
  }>
  
  // Tracking Configuration
  reportingFrequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annual'
  dataSource: string
  responsibleParty: string
  collectionMethod: 'automated' | 'manual' | 'hybrid'
  
  // Performance Thresholds
  performanceRanges: {
    excellent: { min?: number; max?: number }
    good: { min?: number; max?: number }
    warning: { min?: number; max?: number }
    critical: { min?: number; max?: number }
  }
  
  // Metadata
  createdAt: string
  updatedAt: string
  isActive: boolean
  validationRules: ValidationRule[]
}

export interface ValidationRule {
  id: string
  type: 'range' | 'trend' | 'consistency' | 'completeness'
  description: string
  configuration: any
  severity: 'error' | 'warning' | 'info'
}

export interface KPIDataPoint {
  id: string
  kpiId: string
  goalId: string
  value: number
  period: string
  timestamp: string
  source: string
  enteredBy: string
  quality: 'verified' | 'estimated' | 'pending'
  notes?: string
  adjustments?: Array<{
    originalValue: number
    adjustedValue: number
    reason: string
    adjustedBy: string
    adjustedAt: string
  }>
}

export interface GoalProgress {
  goalId: string
  currentStatus: {
    overallProgress: number // Percentage of goal completion
    lastUpdated: string
    trend: 'improving' | 'stable' | 'declining' | 'insufficient-data'
    riskLevel: 'on-track' | 'at-risk' | 'off-track' | 'needs-attention'
  }
  
  kpiPerformance: Array<{
    kpiId: string
    currentValue: number
    targetValue: number
    progress: number
    trend: 'improving' | 'stable' | 'declining'
    lastDataPoint: string
    projectedAchievement: number
    confidence: number
  }>
  
  milestones: Array<{
    id: string
    name: string
    targetDate: string
    status: 'completed' | 'in-progress' | 'overdue' | 'not-started'
    completedDate?: string
    notes?: string
  }>
  
  linkedInitiativeProgress: Array<{
    initiativeId: string
    name: string
    progress: number
    status: string
    impact: 'high' | 'medium' | 'low' | 'unknown'
  }>
}

export interface ForecastingModel {
  goalId: string
  kpiId?: string
  model: {
    type: 'linear-regression' | 'arima' | 'exponential-smoothing' | 'machine-learning'
    confidence: number
    dataPoints: number
    lastTrained: string
    parameters: any
  }
  
  predictions: Array<{
    period: string
    predictedValue: number
    confidenceInterval: {
      lower: number
      upper: number
    }
    probability: number
  }>
  
  achievementProbability: {
    likelihood: number
    confidenceLevel: number
    keyDrivers: Array<{
      factor: string
      impact: number
      type: 'positive' | 'negative'
    }>
  }
  
  scenarios: Array<{
    name: string
    description: string
    assumptions: string[]
    projectedOutcome: number
    probability: number
  }>
}

export interface ActionAlert {
  id: string
  type: 'performance-decline' | 'target-risk' | 'data-quality' | 'milestone-overdue' | 'initiative-delay'
  severity: 'critical' | 'high' | 'medium' | 'low'
  
  goalId: string
  kpiId?: string
  initiativeId?: string
  
  title: string
  description: string
  detectedAt: string
  
  triggerConditions: {
    condition: string
    threshold: number
    actualValue: number
    trend?: string
  }
  
  recommendations: Array<{
    action: string
    priority: 'immediate' | 'short-term' | 'long-term'
    impact: 'high' | 'medium' | 'low'
    effort: 'high' | 'medium' | 'low'
    responsibleParty?: string
  }>
  
  status: 'open' | 'acknowledged' | 'in-progress' | 'resolved' | 'dismissed'
  assignedTo?: string
  resolvedAt?: string
  resolution?: string
}

export interface ScenarioModel {
  id: string
  name: string
  description: string
  goalId: string
  
  baselineAssumptions: {
    noChangeScenario: {
      description: string
      projectedOutcome: number
      confidence: number
    }
  }
  
  interventions: Array<{
    id: string
    name: string
    description: string
    type: 'initiative' | 'resource-increase' | 'process-change' | 'technology-adoption'
    
    impact: {
      estimatedEffect: number
      confidence: number
      timeframe: string
      assumptions: string[]
    }
    
    requirements: {
      budget?: number
      resources?: string[]
      timeline?: string
      dependencies?: string[]
    }
  }>
  
  combinedScenarios: Array<{
    id: string
    name: string
    description: string
    interventions: string[]
    projectedOutcome: number
    probability: number
    netBenefit: number
    riskFactors: string[]
  }>
  
  recommendations: {
    optimalScenario: string
    reasoning: string
    nextSteps: string[]
    monitoringPoints: string[]
  }
}

export interface CarbonBudget {
  id: string
  name: string
  description: string
  targetYear: string // Net-Zero target year
  
  budgetAllocation: {
    totalBudget: number // Total allowable emissions
    unit: 'tCO2e' | 'MtCO2e'
    baselineYear: string
    baselineEmissions: number
  }
  
  annualBudgets: Array<{
    year: string
    allowedEmissions: number
    actualEmissions?: number
    variance?: number
    remaining: number
  }>
  
  emissionSources: Array<{
    scope: 'scope-1' | 'scope-2' | 'scope-3'
    category: string
    currentEmissions: number
    targetReduction: number
    reductionPlan: Array<{
      initiative: string
      expectedReduction: number
      timeline: string
      status: string
    }>
  }>
  
  offsetStrategy: {
    maxOffsetsAllowed: number // Percentage of total budget
    offsetTypes: string[]
    qualityCriteria: string[]
    currentOffsets: number
    plannedOffsets: Array<{
      year: string
      amount: number
      type: string
      project?: string
    }>
  }
  
  riskFactors: Array<{
    factor: string
    impact: 'high' | 'medium' | 'low'
    mitigation: string
    probability: number
  }>
  
  monitoring: {
    reviewFrequency: string
    keyIndicators: string[]
    alertThresholds: {
      yellow: number // Percentage variance
      red: number
    }
  }
}

export interface GoalTemplate {
  id: string
  name: string
  description: string
  category: string
  industry?: string
  
  template: {
    goalStructure: Partial<ESGGoal>
    suggestedKPIs: Array<Partial<KPIMetric>>
    implementationGuidance: string[]
    bestPractices: string[]
  }
  
  benchmarkData?: {
    industryAverage: number
    bestInClass: number
    peerComparison: Array<{
      metric: string
      value: number
      source: string
    }>
  }
  
  usageCount: number
  rating: number
  tags: string[]
  createdBy: string
  isPublic: boolean
}

export interface GoalDashboardConfig {
  userId: string
  widgets: Array<{
    id: string
    type: 'goal-overview' | 'kpi-summary' | 'progress-chart' | 'alerts' | 'forecasting'
    configuration: any
    position: { x: number; y: number; width: number; height: number }
  }>
  
  filters: {
    goalCategories: string[]
    timeRange: string
    status: string[]
    priority: string[]
  }
  
  preferences: {
    defaultView: 'dashboard' | 'list' | 'calendar'
    autoRefresh: boolean
    refreshInterval: number
    alertsEnabled: boolean
    emailDigest: 'daily' | 'weekly' | 'monthly' | 'disabled'
  }
}

export interface APIResponse<T> {
  data: T
  success: boolean
  message?: string
  errors?: string[]
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface FormState<T> {
  data: T
  errors: Record<string, string>
  isValid: boolean
  isDirty: boolean
  isSubmitting: boolean
}

export interface LoadingState {
  isLoading: boolean
  message?: string
  progress?: number
  operation?: string
}

export interface UIState {
  selectedGoal?: string
  selectedKPI?: string
  viewMode: 'dashboard' | 'goals' | 'kpis' | 'forecasting' | 'alerts' | 'carbon-budget'
  sidebarCollapsed: boolean
  activeTab?: string
  filterPanelOpen: boolean
  timeRange: {
    start: string
    end: string
    preset?: 'last-month' | 'last-quarter' | 'last-year' | 'ytd' | 'custom'
  }
} 