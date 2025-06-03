// Types for Kenya-focused Compliance Center

export interface Regulation {
  id: string
  title: string
  code: string
  authority: string // e.g., NEMA, WARMA, EPRA, NSE, CMA, etc.
  category: 'environmental' | 'social' | 'governance'
  subcategory: string
  description: string
  requirements: RegulationRequirement[]
  applicability: string[]
  effectiveDate: string
  lastUpdated: string
  status: 'active' | 'proposed' | 'repealed'
  relatedRegulations: string[]
  documents: RegulationDocument[]
}

export interface RegulationRequirement {
  id: string
  title: string
  description: string
  mandatory: boolean
  frequency: 'one-time' | 'annual' | 'quarterly' | 'monthly' | 'as-needed'
  deadline?: string
  applicableTo: string[]
  evidenceTypes: string[]
  penaltyDescription?: string
}

export interface RegulationDocument {
  id: string
  title: string
  type: 'act' | 'regulation' | 'guideline' | 'form' | 'template'
  url?: string
  fileSize?: number
  lastUpdated: string
}

export interface ComplianceRequirement {
  id: string
  regulationId: string
  regulationTitle: string
  requirementTitle: string
  authority: string
  category: 'environmental' | 'social' | 'governance'
  subcategory: string
  status: 'compliant' | 'pending' | 'overdue' | 'non-compliant' | 'not-applicable'
  priority: 'high' | 'medium' | 'low'
  dueDate?: string
  assignedTo?: string
  lastReviewDate?: string
  nextReviewDate?: string
  evidence: ComplianceEvidence[]
  tasks: ComplianceTask[]
  notes?: string
}

export interface ComplianceEvidence {
  id: string
  type: 'document' | 'data' | 'audit' | 'certificate' | 'report'
  title: string
  description?: string
  fileUrl?: string
  uploadDate: string
  uploadedBy: string
  validUntil?: string
  status: 'valid' | 'expired' | 'pending-review'
}

export interface ComplianceTask {
  id: string
  title: string
  description: string
  assignedTo: string
  status: 'not-started' | 'in-progress' | 'completed' | 'overdue'
  priority: 'high' | 'medium' | 'low'
  dueDate: string
  createdDate: string
  completedDate?: string
  progress: number // 0-100
}

export interface ComplianceCalendarEvent {
  id: string
  title: string
  type: 'deadline' | 'review' | 'audit' | 'training' | 'renewal'
  description: string
  authority: string
  category: 'environmental' | 'social' | 'governance'
  startDate: string
  endDate?: string
  status: 'upcoming' | 'due-soon' | 'overdue' | 'completed'
  priority: 'high' | 'medium' | 'low'
  assignedTo?: string
  relatedRequirements: string[]
  reminders: CalendarReminder[]
  recurrence?: RecurrencePattern
}

export interface CalendarReminder {
  id: string
  type: 'email' | 'notification' | 'task'
  triggerDays: number // days before event
  recipients: string[]
  sent: boolean
  sentDate?: string
}

export interface RecurrencePattern {
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annually'
  interval: number
  endDate?: string
  maxOccurrences?: number
}

export interface ComplianceAudit {
  id: string
  title: string
  type: 'internal' | 'external' | 'regulatory' | 'certification'
  scope: AuditScope
  auditor: AuditorInfo
  status: 'planned' | 'in-progress' | 'completed' | 'cancelled'
  startDate: string
  endDate?: string
  completedDate?: string
  objectives: string[]
  criteria: string[]
  methodology: string
  findings: AuditFinding[]
  recommendations: AuditRecommendation[]
  finalReport?: AuditDocument
  followUpAudits: string[]
  relatedRequirements: string[]
}

export interface AuditScope {
  departments: string[]
  facilities: string[]
  processes: string[]
  regulations: string[]
  timeframe: {
    startDate: string
    endDate: string
  }
}

export interface AuditorInfo {
  type: 'internal' | 'external'
  name: string
  organization?: string
  credentials: string[]
  contactInfo: ContactInfo
}

export interface ContactInfo {
  email: string
  phone?: string
  address?: string
}

export interface AuditFinding {
  id: string
  title: string
  description: string
  severity: 'critical' | 'major' | 'minor' | 'observation'
  category: 'environmental' | 'social' | 'governance'
  subcategory: string
  relatedRequirement?: string
  evidence: string[]
  rootCause?: string
  status: 'open' | 'in-progress' | 'closed' | 'verified'
  assignedTo?: string
  dueDate?: string
  resolution?: string
  verificationDate?: string
}

export interface AuditRecommendation {
  id: string
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  category: 'environmental' | 'social' | 'governance'
  implementation: RecommendationImplementation
  relatedFindings: string[]
  status: 'pending' | 'approved' | 'in-progress' | 'completed' | 'rejected'
  assignedTo?: string
  estimatedCost?: number
  estimatedTimeframe?: string
}

export interface RecommendationImplementation {
  steps: string[]
  resources: string[]
  timeline: string
  successCriteria: string[]
  riskAssessment?: string
}

export interface AuditDocument {
  id: string
  title: string
  type: 'plan' | 'checklist' | 'report' | 'evidence' | 'correspondence'
  fileUrl?: string
  uploadDate: string
  uploadedBy: string
  version: string
  status: 'draft' | 'final' | 'archived'
}

export interface CompliancePolicy {
  id: string
  title: string
  code: string
  category: 'environmental' | 'social' | 'governance' | 'operational'
  subcategory: string
  version: string
  status: 'draft' | 'active' | 'under-review' | 'archived' | 'superseded'
  approvalStatus: 'pending' | 'approved' | 'rejected'
  effectiveDate: string
  reviewDate: string
  nextReviewDate: string
  owner: string
  approver: string
  description: string
  purpose: string
  scope: string
  content: PolicyContent
  relatedPolicies: string[]
  relatedRegulations: string[]
  documents: PolicyDocument[]
  acknowledgments: PolicyAcknowledment[]
  trainingRequired: boolean
  trainingDetails?: TrainingDetails
}

export interface PolicyContent {
  sections: PolicySection[]
  procedures: string[]
  responsibilities: RoleResponsibility[]
  definitions: PolicyDefinition[]
  references: string[]
}

export interface PolicySection {
  id: string
  title: string
  content: string
  subsections?: PolicySection[]
}

export interface RoleResponsibility {
  role: string
  responsibilities: string[]
}

export interface PolicyDefinition {
  term: string
  definition: string
}

export interface PolicyDocument {
  id: string
  title: string
  type: 'form' | 'template' | 'guideline' | 'attachment'
  fileUrl?: string
  uploadDate: string
  version: string
}

export interface PolicyAcknowledment {
  userId: string
  userName: string
  acknowledgedDate: string
  version: string
  method: 'digital-signature' | 'click-through' | 'training-completion'
  ipAddress?: string
}

export interface TrainingDetails {
  required: boolean
  frequency: 'one-time' | 'annual' | 'bi-annual' | 'custom'
  method: 'online' | 'classroom' | 'self-study' | 'mixed'
  duration: number // in hours
  materials: string[]
  assessmentRequired: boolean
  passingScore?: number
}

export interface ComplianceDashboard {
  overallScore: number
  categoryScores: {
    environmental: number
    social: number
    governance: number
  }
  totalRequirements: number
  compliantRequirements: number
  pendingRequirements: number
  overdueRequirements: number
  upcomingDeadlines: ComplianceCalendarEvent[]
  recentAudits: ComplianceAudit[]
  criticalFindings: AuditFinding[]
  pendingTasks: ComplianceTask[]
  policyUpdates: CompliancePolicy[]
}

export interface ComplianceReport {
  id: string
  title: string
  type: 'summary' | 'detailed' | 'audit' | 'gap-analysis' | 'regulatory-update'
  period: {
    startDate: string
    endDate: string
  }
  generatedDate: string
  generatedBy: string
  status: 'draft' | 'final' | 'distributed'
  recipients: string[]
  sections: ReportSection[]
  attachments: string[]
  executiveSummary?: string
}

export interface ReportSection {
  id: string
  title: string
  content: string
  charts?: ChartData[]
  tables?: TableData[]
}

export interface ChartData {
  type: 'bar' | 'line' | 'pie' | 'donut'
  title: string
  data: any[]
  options?: any
}

export interface TableData {
  title: string
  headers: string[]
  rows: any[][]
}

// API Response types
export interface APIResponse<T> {
  data: T
  success: boolean
  message?: string
  errors?: string[]
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Filter and search types
export interface ComplianceFilters {
  authority?: string[]
  category?: string[]
  status?: string[]
  priority?: string[]
  assignedTo?: string[]
  dateRange?: {
    start: string
    end: string
  }
}

export interface SearchCriteria {
  query: string
  filters: ComplianceFilters
  sortBy: string
  sortOrder: 'asc' | 'desc'
  page: number
  limit: number
} 