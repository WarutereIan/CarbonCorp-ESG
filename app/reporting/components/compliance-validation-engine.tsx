"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  FileText, 
  Search, 
  Filter,
  Download,
  Eye,
  Bot,
  Lightbulb,
  ExternalLink,
  ArrowRight,
  Clock,
  Target,
  AlertCircle,
  Info,
  Zap
} from "lucide-react"

interface ComplianceRequirement {
  id: string
  framework: string
  section: string
  title: string
  description: string
  type: 'mandatory' | 'conditional' | 'recommended'
  status: 'met' | 'partially-met' | 'not-met' | 'not-applicable' | 'needs-review'
  evidence?: {
    reportSection: string
    content: string
    confidence: number
  }
  gaps?: string[]
  aiSuggestions?: string[]
  dueDate?: string
  priority: 'critical' | 'high' | 'medium' | 'low'
}

interface ComplianceFramework {
  id: string
  name: string
  description: string
  version: string
  requirements: ComplianceRequirement[]
  overallScore: number
}

interface ComplianceValidationProps {
  reportContent: any
  selectedFrameworks: string[]
  onIssueResolve: (requirementId: string, resolution: any) => void
  onValidationComplete?: () => void
}

export function ComplianceValidationEngine({ 
  reportContent, 
  selectedFrameworks, 
  onIssueResolve,
  onValidationComplete
}: ComplianceValidationProps) {
  const [frameworks, setFrameworks] = useState<ComplianceFramework[]>([])
  const [selectedFramework, setSelectedFramework] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isValidating, setIsValidating] = useState(false)
  const [validationProgress, setValidationProgress] = useState(0)
  const [isResolvingIssue, setIsResolvingIssue] = useState<string | null>(null)
  const [resolutionComments, setResolutionComments] = useState<{[key: string]: string}>({})

  // Initialize frameworks and requirements
  useEffect(() => {
    initializeFrameworks()
  }, [selectedFrameworks])

  const initializeFrameworks = () => {
    const frameworkData: ComplianceFramework[] = []

    if (selectedFrameworks.includes('issb')) {
      frameworkData.push({
        id: 'issb',
        name: 'ISSB S1/S2',
        description: 'International Sustainability Standards Board',
        version: '2023',
        overallScore: 0,
        requirements: [
          {
            id: 'issb-s1-governance',
            framework: 'ISSB S1',
            section: 'Governance',
            title: 'Governance processes and controls',
            description: 'Disclose governance processes, controls, and procedures for monitoring, managing, and overseeing sustainability-related risks and opportunities',
            type: 'mandatory',
            status: 'needs-review',
            priority: 'critical',
            gaps: ['Missing board oversight details', 'No risk management process described'],
            aiSuggestions: ['Add section on board sustainability committee', 'Include risk assessment methodology'],
            dueDate: '2024-12-31'
          },
          {
            id: 'issb-s1-strategy',
            framework: 'ISSB S1',
            section: 'Strategy',
            title: 'Strategy for managing sustainability risks and opportunities',
            description: 'Disclose information about sustainability-related risks and opportunities that affect business model, strategy and cash flows',
            type: 'mandatory',
            status: 'partially-met',
            priority: 'critical',
            evidence: {
              reportSection: 'Strategic Overview',
              content: 'Our sustainability strategy focuses on...',
              confidence: 75
            },
            gaps: ['Missing quantitative impact analysis'],
            aiSuggestions: ['Add financial impact projections', 'Include scenario analysis results']
          },
          {
            id: 'issb-s2-climate-governance',
            framework: 'ISSB S2',
            section: 'Climate Governance',
            title: 'Climate-related governance',
            description: 'Disclose governance arrangements for climate-related risks and opportunities',
            type: 'mandatory',
            status: 'met',
            priority: 'critical',
            evidence: {
              reportSection: 'Climate Governance',
              content: 'Our Board Climate Committee oversees...',
              confidence: 95
            }
          },
          {
            id: 'issb-s2-metrics',
            framework: 'ISSB S2',
            section: 'Metrics and Targets',
            title: 'Climate-related metrics and targets',
            description: 'Disclose metrics and targets used to assess and manage climate-related risks and opportunities',
            type: 'mandatory',
            status: 'not-met',
            priority: 'high',
            gaps: ['Missing Scope 3 emissions data', 'No climate targets set'],
            aiSuggestions: ['Calculate Scope 3 emissions using available data', 'Set science-based targets']
          }
        ]
      })
    }

    if (selectedFrameworks.includes('csrd')) {
      frameworkData.push({
        id: 'csrd',
        name: 'CSRD ESRS',
        description: 'Corporate Sustainability Reporting Directive',
        version: '2023',
        overallScore: 0,
        requirements: [
          {
            id: 'esrs-2-general',
            framework: 'ESRS 2',
            section: 'General Disclosures',
            title: 'Basis for preparation',
            description: 'General basis for preparation of sustainability statements',
            type: 'mandatory',
            status: 'met',
            priority: 'critical',
            evidence: {
              reportSection: 'Methodology',
              content: 'This report has been prepared in accordance with...',
              confidence: 90
            }
          },
          {
            id: 'esrs-e1-transition-plan',
            framework: 'ESRS E1',
            section: 'Climate Change',
            title: 'Transition plan for climate change mitigation',
            description: 'Disclosure of transition plan for climate change mitigation including targets and actions',
            type: 'mandatory',
            status: 'partially-met',
            priority: 'critical',
            gaps: ['Missing detailed implementation timeline', 'No budget allocation specified'],
            aiSuggestions: ['Add 5-year implementation roadmap', 'Include investment requirements']
          },
          {
            id: 'esrs-e1-ghg-emissions',
            framework: 'ESRS E1',
            section: 'Climate Change',
            title: 'Gross Scopes 1, 2, 3 and Total GHG emissions',
            description: 'Disclosure of gross GHG emissions by scope with calculation methodology',
            type: 'mandatory',
            status: 'met',
            priority: 'critical',
            evidence: {
              reportSection: 'GHG Emissions',
              content: 'Total GHG emissions for 2023: Scope 1: 1,234 tCO2e...',
              confidence: 88
            }
          },
          {
            id: 'esrs-s1-workforce',
            framework: 'ESRS S1',
            section: 'Own Workforce',
            title: 'Characteristics of employees',
            description: 'Information about characteristics of the undertaking\'s employees',
            type: 'mandatory',
            status: 'not-met',
            priority: 'medium',
            gaps: ['Missing gender diversity breakdown', 'No age group analysis'],
            aiSuggestions: ['Add diversity metrics table', 'Include workforce demographics chart']
          }
        ]
      })
    }

    if (selectedFrameworks.includes('gri')) {
      frameworkData.push({
        id: 'gri',
        name: 'GRI Standards',
        description: 'Global Reporting Initiative Universal Standards',
        version: '2021',
        overallScore: 0,
        requirements: [
          {
            id: 'gri-2-1',
            framework: 'GRI 2',
            section: 'Organizational Details',
            title: 'Organizational details',
            description: 'Report organizational details including name, headquarters, operations',
            type: 'mandatory',
            status: 'met',
            priority: 'medium',
            evidence: {
              reportSection: 'About Us',
              content: 'CarbonCorp is headquartered in...',
              confidence: 100
            }
          },
          {
            id: 'gri-3-1',
            framework: 'GRI 3',
            section: 'Material Topics',
            title: 'Process to determine material topics',
            description: 'Description of the process followed to determine material topics',
            type: 'mandatory',
            status: 'partially-met',
            priority: 'high',
            gaps: ['Missing stakeholder engagement details'],
            aiSuggestions: ['Add stakeholder consultation methodology', 'Include materiality matrix']
          }
        ]
      })
    }

    // Calculate overall scores
    frameworkData.forEach(framework => {
      const totalRequirements = framework.requirements.length
      const metRequirements = framework.requirements.filter(r => r.status === 'met').length
      const partiallyMet = framework.requirements.filter(r => r.status === 'partially-met').length * 0.5
      framework.overallScore = Math.round(((metRequirements + partiallyMet) / totalRequirements) * 100)
    })

    setFrameworks(frameworkData)
  }

  const runFullComplianceCheck = async () => {
    setIsValidating(true)
    setValidationProgress(0)

    // Simulate validation process
    const totalSteps = frameworks.reduce((acc, f) => acc + f.requirements.length, 0)
    let currentStep = 0

    for (const framework of frameworks) {
      for (const requirement of framework.requirements) {
        // Simulate AI validation
        await new Promise(resolve => setTimeout(resolve, 500))
        
        currentStep++
        setValidationProgress(Math.round((currentStep / totalSteps) * 100))
        
        // Simulate updating requirement status based on report content
        if (Math.random() > 0.3) { // 70% chance of finding evidence
          requirement.status = Math.random() > 0.5 ? 'met' : 'partially-met'
          if (!requirement.evidence && requirement.status === 'met') {
            requirement.evidence = {
              reportSection: 'Generated Section',
              content: 'AI-detected relevant content...',
              confidence: Math.round(Math.random() * 30 + 70)
            }
          }
        }
      }
    }

    setIsValidating(false)
    // Recalculate scores
    initializeFrameworks()
  }

  const filteredRequirements = () => {
    let allRequirements: ComplianceRequirement[] = []
    
    if (selectedFramework === 'all') {
      allRequirements = frameworks.flatMap(f => f.requirements)
    } else {
      const framework = frameworks.find(f => f.id === selectedFramework)
      allRequirements = framework?.requirements || []
    }

    return allRequirements.filter(req => {
      const matchesStatus = statusFilter === 'all' || req.status === statusFilter
      const matchesPriority = priorityFilter === 'all' || req.priority === priorityFilter
      const matchesSearch = searchQuery === '' || 
        req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.description.toLowerCase().includes(searchQuery.toLowerCase())
      
      return matchesStatus && matchesPriority && matchesSearch
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'met': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'partially-met': return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case 'not-met': return <XCircle className="h-4 w-4 text-red-500" />
      case 'not-applicable': return <Info className="h-4 w-4 text-gray-400" />
      case 'needs-review': return <Clock className="h-4 w-4 text-blue-500" />
      default: return <AlertCircle className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'met': return 'text-green-600 bg-green-50 border-green-200'
      case 'partially-met': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'not-met': return 'text-red-600 bg-red-50 border-red-200'
      case 'not-applicable': return 'text-gray-600 bg-gray-50 border-gray-200'
      case 'needs-review': return 'text-blue-600 bg-blue-50 border-blue-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getOverallComplianceScore = () => {
    if (frameworks.length === 0) return 0
    return Math.round(frameworks.reduce((acc, f) => acc + f.overallScore, 0) / frameworks.length)
  }

  const getTotalIssues = () => {
    return frameworks.reduce((acc, f) => 
      acc + f.requirements.filter(r => r.status === 'not-met' || r.status === 'partially-met').length, 0
    )
  }

  // New function to check if validation can be completed
  const canCompleteValidation = () => {
    const allRequirements = frameworks.flatMap(f => f.requirements)
    const criticalIssues = allRequirements.filter(r => 
      r.priority === 'critical' && (r.status === 'not-met' || r.status === 'needs-review')
    )
    const highPriorityIssues = allRequirements.filter(r => 
      r.priority === 'high' && r.status === 'not-met'
    )
    
    // Allow completion if no critical issues and less than 2 high priority issues
    return criticalIssues.length === 0 && highPriorityIssues.length < 2
  }

  // New function to handle issue resolution
  const resolveIssue = async (requirementId: string, resolution: 'accept' | 'not-applicable' | 'manual-fix') => {
    setIsResolvingIssue(requirementId)
    
    // Simulate resolution process
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setFrameworks(prev => prev.map(framework => ({
      ...framework,
      requirements: framework.requirements.map(req => {
        if (req.id === requirementId) {
          let newStatus = req.status
          switch (resolution) {
            case 'accept':
              newStatus = 'met'
              break
            case 'not-applicable':
              newStatus = 'not-applicable'
              break
            case 'manual-fix':
              newStatus = 'partially-met' // User will manually address
              break
          }
          return { ...req, status: newStatus }
        }
        return req
      })
    })))

    // Recalculate scores
    setTimeout(() => {
      setFrameworks(prev => prev.map(framework => {
        const totalRequirements = framework.requirements.length
        const metRequirements = framework.requirements.filter(r => r.status === 'met').length
        const partiallyMet = framework.requirements.filter(r => r.status === 'partially-met').length * 0.5
        const notApplicable = framework.requirements.filter(r => r.status === 'not-applicable').length
        framework.overallScore = Math.round(((metRequirements + partiallyMet + notApplicable) / totalRequirements) * 100)
        return framework
      }))
    }, 100)

    setIsResolvingIssue(null)
    onIssueResolve(requirementId, resolution)

    // Check if validation can be completed
    setTimeout(() => {
      if (canCompleteValidation()) {
        onValidationComplete?.()
      }
    }, 200)
  }

  const addResolutionComment = (requirementId: string, comment: string) => {
    setResolutionComments(prev => ({
      ...prev,
      [requirementId]: comment
    }))
  }

  const getCriticalIssuesCount = () => {
    return frameworks.reduce((acc, f) => 
      acc + f.requirements.filter(r => r.priority === 'critical' && (r.status === 'not-met' || r.status === 'needs-review')).length, 0
    )
  }

  const getValidationStatusMessage = () => {
    const criticalIssues = getCriticalIssuesCount()
    const totalIssues = getTotalIssues()
    
    if (criticalIssues === 0 && totalIssues === 0) {
      return { type: 'success', message: 'All compliance requirements are met! Ready to proceed.' }
    } else if (criticalIssues === 0) {
      return { type: 'warning', message: `${totalIssues} non-critical issues remain. You can proceed or address them for better compliance.` }
    } else {
      return { type: 'error', message: `${criticalIssues} critical compliance issues must be resolved before proceeding.` }
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header with Overall Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle>Compliance Validation Engine</CardTitle>
                <CardDescription>
                  Real-time compliance checking against selected ESG frameworks
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{getOverallComplianceScore()}%</div>
                <div className="text-xs text-muted-foreground">Overall Score</div>
              </div>
              <Button onClick={runFullComplianceCheck} disabled={isValidating}>
                {isValidating ? (
                  <>
                    <Bot className="h-4 w-4 mr-2 animate-pulse" />
                    Validating...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Run Full Check
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Validation Status Alert */}
      <Alert className={
        getValidationStatusMessage().type === 'success' ? 'border-green-200 bg-green-50' :
        getValidationStatusMessage().type === 'warning' ? 'border-yellow-200 bg-yellow-50' :
        'border-red-200 bg-red-50'
      }>
        {getValidationStatusMessage().type === 'success' ? <CheckCircle className="h-4 w-4 text-green-600" /> :
         getValidationStatusMessage().type === 'warning' ? <AlertTriangle className="h-4 w-4 text-yellow-600" /> :
         <XCircle className="h-4 w-4 text-red-600" />}
        <AlertDescription className={
          getValidationStatusMessage().type === 'success' ? 'text-green-800' :
          getValidationStatusMessage().type === 'warning' ? 'text-yellow-800' :
          'text-red-800'
        }>
          {getValidationStatusMessage().message}
        </AlertDescription>
      </Alert>

      {/* Validation Progress */}
      {isValidating && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Validation Progress</span>
                <span>{validationProgress}%</span>
              </div>
              <Progress value={validationProgress} className="h-2" />
              <div className="text-xs text-muted-foreground">
                AI is analyzing report content against compliance requirements...
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Framework Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {frameworks.map((framework) => (
          <Card key={framework.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">{framework.name}</CardTitle>
                <Badge variant="outline">{framework.version}</Badge>
              </div>
              <CardDescription className="text-xs">{framework.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">Compliance Score</span>
                  <span className="text-sm font-bold">{framework.overallScore}%</span>
                </div>
                <Progress value={framework.overallScore} className="h-2" />
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="text-center">
                    <div className="font-bold text-green-600">
                      {framework.requirements.filter(r => r.status === 'met').length}
                    </div>
                    <div className="text-muted-foreground">Met</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-red-600">
                      {framework.requirements.filter(r => r.status === 'not-met' || r.status === 'partially-met').length}
                    </div>
                    <div className="text-muted-foreground">Issues</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="search" className="text-xs">Search Requirements</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by title or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            
            <div>
              <Label className="text-xs">Framework</Label>
              <Select value={selectedFramework} onValueChange={setSelectedFramework}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Frameworks</SelectItem>
                  {frameworks.map(f => (
                    <SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="met">Met</SelectItem>
                  <SelectItem value="partially-met">Partially Met</SelectItem>
                  <SelectItem value="not-met">Not Met</SelectItem>
                  <SelectItem value="needs-review">Needs Review</SelectItem>
                  <SelectItem value="not-applicable">Not Applicable</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs">Priority</Label>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
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
        </CardContent>
      </Card>

      {/* Enhanced Requirements List with Resolution Actions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Compliance Requirements
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{filteredRequirements().length} requirements</Badge>
              <Badge variant="destructive" className={getCriticalIssuesCount() === 0 ? 'hidden' : ''}>
                {getCriticalIssuesCount()} critical
              </Badge>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Gap Analysis
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-4">
              {filteredRequirements().map((requirement) => (
                <Card key={requirement.id} className={`border-l-4 ${getStatusColor(requirement.status)}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {getStatusIcon(requirement.status)}
                          <h4 className="font-medium text-sm">{requirement.title}</h4>
                          <Badge className={getPriorityColor(requirement.priority)}>
                            {requirement.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                          <span>{requirement.framework}</span>
                          <span>•</span>
                          <span>{requirement.section}</span>
                          {requirement.dueDate && (
                            <>
                              <span>•</span>
                              <span>Due: {requirement.dueDate}</span>
                            </>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{requirement.description}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {requirement.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  {(requirement.evidence || requirement.gaps || requirement.aiSuggestions) && (
                    <CardContent className="pt-0">
                      <Tabs defaultValue="evidence" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                          <TabsTrigger value="evidence">Evidence</TabsTrigger>
                          <TabsTrigger value="gaps">Gaps</TabsTrigger>
                          <TabsTrigger value="suggestions">AI Suggestions</TabsTrigger>
                          <TabsTrigger value="actions">Actions</TabsTrigger>
                        </TabsList>

                        <TabsContent value="evidence" className="mt-3">
                          {requirement.evidence ? (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-medium">Found in: {requirement.evidence.reportSection}</span>
                                <Badge variant="outline" className="text-xs">
                                  {requirement.evidence.confidence}% confidence
                                </Badge>
                              </div>
                              <div className="p-2 bg-muted rounded text-xs">
                                {requirement.evidence.content}
                              </div>
                              <Button variant="outline" size="sm">
                                <Eye className="h-3 w-3 mr-1" />
                                View in Report
                              </Button>
                            </div>
                          ) : (
                            <div className="text-xs text-muted-foreground p-2 bg-muted rounded">
                              No evidence found in current report content
                            </div>
                          )}
                        </TabsContent>

                        <TabsContent value="gaps" className="mt-3">
                          {requirement.gaps && requirement.gaps.length > 0 ? (
                            <div className="space-y-2">
                              {requirement.gaps.map((gap, index) => (
                                <div key={index} className="flex items-start gap-2 text-xs">
                                  <XCircle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                                  <span>{gap}</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-xs text-muted-foreground p-2 bg-muted rounded">
                              No gaps identified
                            </div>
                          )}
                        </TabsContent>

                        <TabsContent value="suggestions" className="mt-3">
                          {requirement.aiSuggestions && requirement.aiSuggestions.length > 0 ? (
                            <div className="space-y-3">
                              {requirement.aiSuggestions.map((suggestion, index) => (
                                <div key={index} className="flex items-start gap-2">
                                  <Lightbulb className="h-3 w-3 text-blue-500 mt-0.5 flex-shrink-0" />
                                  <div className="flex-1">
                                    <span className="text-xs">{suggestion}</span>
                                    <div className="flex gap-1 mt-1">
                                      <Button variant="outline" size="sm" className="h-6 text-xs">
                                        Apply Fix
                                      </Button>
                                      <Button variant="ghost" size="sm" className="h-6 text-xs">
                                        More Info
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-xs text-muted-foreground p-2 bg-muted rounded">
                              No AI suggestions available
                            </div>
                          )}
                        </TabsContent>

                        <TabsContent value="actions" className="mt-3">
                          {(requirement.status === 'not-met' || requirement.status === 'needs-review' || requirement.status === 'partially-met') ? (
                            <div className="space-y-3">
                              <div className="text-xs font-medium mb-2">Resolve this requirement:</div>
                              
                              <Textarea
                                placeholder="Add resolution comments or notes..."
                                value={resolutionComments[requirement.id] || ''}
                                onChange={(e) => addResolutionComment(requirement.id, e.target.value)}
                                className="h-16 text-xs"
                              />
                              
                              <div className="flex flex-wrap gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => resolveIssue(requirement.id, 'accept')}
                                  disabled={isResolvingIssue === requirement.id}
                                  className="text-xs"
                                >
                                  {isResolvingIssue === requirement.id ? (
                                    <>
                                      <Bot className="h-3 w-3 mr-1 animate-pulse" />
                                      Processing...
                                    </>
                                  ) : (
                                    <>
                                      <CheckCircle className="h-3 w-3 mr-1" />
                                      Mark as Met
                                    </>
                                  )}
                                </Button>
                                
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => resolveIssue(requirement.id, 'not-applicable')}
                                  disabled={isResolvingIssue === requirement.id}
                                  className="text-xs"
                                >
                                  <Info className="h-3 w-3 mr-1" />
                                  Not Applicable
                                </Button>
                                
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => resolveIssue(requirement.id, 'manual-fix')}
                                  disabled={isResolvingIssue === requirement.id}
                                  className="text-xs"
                                >
                                  <Eye className="h-3 w-3 mr-1" />
                                  Will Address Manually
                                </Button>
                              </div>
                              
                              {requirement.priority === 'critical' && (
                                <div className="text-xs text-red-600 mt-2">
                                  ⚠️ Critical requirement - must be resolved to proceed
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="text-xs text-green-600 p-2 bg-green-50 rounded flex items-center gap-2">
                              <CheckCircle className="h-3 w-3" />
                              This requirement has been resolved
                            </div>
                          )}
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Completion Actions */}
      {canCompleteValidation() && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <h3 className="font-medium text-green-800">Validation Complete!</h3>
                  <p className="text-sm text-green-700">
                    All critical compliance requirements have been addressed. You can now proceed to the editor.
                  </p>
                </div>
              </div>
              <Button onClick={onValidationComplete} className="bg-green-600 hover:bg-green-700">
                <Shield className="h-4 w-4 mr-2" />
                Proceed to Editor
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary Alert */}
      {getTotalIssues() > 0 && !canCompleteValidation() && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {getCriticalIssuesCount()} critical and {getTotalIssues() - getCriticalIssuesCount()} other compliance issues require attention. 
            Resolve critical issues to proceed to the next step.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
} 