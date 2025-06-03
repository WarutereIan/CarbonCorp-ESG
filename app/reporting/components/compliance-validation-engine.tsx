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
  Zap,
  CheckCircle2,
  ArrowLeft,
  Play,
  RefreshCw
} from "lucide-react"

interface ReportContent {
  title: string
  sections: {
    id: string
    title: string
    content: string
    status: 'pending' | 'generating' | 'completed' | 'error'
    wordCount: number
    confidence: number
  }[]
  metadata: {
    totalWordCount: number
    averageConfidence: number
    generatedAt: string
    framework: string
    reportingPeriod: string
  }
}

interface ComplianceRequirement {
  id: string
  framework: string
  section: string
  title: string
  description: string
  mandatory: boolean
  status: 'not-checked' | 'checking' | 'compliant' | 'partially-compliant' | 'non-compliant' | 'not-applicable'
  evidence?: string[]
  issues?: string[]
  recommendations?: string[]
  score?: number
}

interface ComplianceValidationEngineProps {
  reportContent: ReportContent
  selectedFrameworks: string[]
  onValidationComplete: (results: any) => void
  onIssueResolve: (requirementId: string, resolution: any) => void
}

export function ComplianceValidationEngine({ 
  reportContent, 
  selectedFrameworks, 
  onValidationComplete, 
  onIssueResolve 
}: ComplianceValidationEngineProps) {
  const [validationProgress, setValidationProgress] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [requirements, setRequirements] = useState<ComplianceRequirement[]>([])
  const [selectedFramework, setSelectedFramework] = useState<string>(selectedFrameworks[0] || 'CSRD')

  // Mock compliance requirements based on selected frameworks
  const frameworkRequirements = {
    'CSRD': [
      {
        id: 'esrs-e1-1',
        framework: 'CSRD',
        section: 'ESRS E1',
        title: 'Transition plan for climate change mitigation',
        description: 'The undertaking shall disclose its transition plan for climate change mitigation',
        mandatory: true
      },
      {
        id: 'esrs-e1-2',
        framework: 'CSRD',
        section: 'ESRS E1',
        title: 'Policies implemented to manage material climate-related impacts',
        description: 'Disclosure of policies related to climate change mitigation and adaptation',
        mandatory: true
      },
      {
        id: 'esrs-e1-6',
        framework: 'CSRD',
        section: 'ESRS E1',
        title: 'Gross Scopes 1, 2, 3 and Total GHG emissions',
        description: 'Quantitative disclosure of greenhouse gas emissions',
        mandatory: true
      },
      {
        id: 'esrs-s1-1',
        framework: 'CSRD',
        section: 'ESRS S1',
        title: 'Policies related to own workforce',
        description: 'Disclosure of policies related to the management of impacts on own workforce',
        mandatory: true
      }
    ],
    'ISSB S2': [
      {
        id: 'issb-s2-gov',
        framework: 'ISSB S2',
        section: 'Governance',
        title: 'Climate-related governance',
        description: 'Governance processes, controls and procedures used to monitor climate-related risks and opportunities',
        mandatory: true
      },
      {
        id: 'issb-s2-strategy',
        framework: 'ISSB S2',
        section: 'Strategy',
        title: 'Climate-related strategy',
        description: 'Climate-related risks and opportunities that affect strategy and decision-making',
        mandatory: true
      },
      {
        id: 'issb-s2-risk',
        framework: 'ISSB S2',
        section: 'Risk Management',
        title: 'Climate-related risk management',
        description: 'Processes used to identify, assess, prioritize and monitor climate-related risks',
        mandatory: true
      },
      {
        id: 'issb-s2-metrics',
        framework: 'ISSB S2',
        section: 'Metrics and Targets',
        title: 'Climate-related metrics and targets',
        description: 'Metrics and targets used to manage climate-related risks and opportunities',
        mandatory: true
      }
    ],
    'GRI': [
      {
        id: 'gri-2-1',
        framework: 'GRI',
        section: 'GRI 2',
        title: 'Organizational details',
        description: 'Basic organizational information and reporting entity details',
        mandatory: true
      },
      {
        id: 'gri-2-6',
        framework: 'GRI',
        section: 'GRI 2',
        title: 'Activities, value chain and other business relationships',
        description: 'Description of activities, value chain and business relationships',
        mandatory: true
      },
      {
        id: 'gri-305-1',
        framework: 'GRI',
        section: 'GRI 305',
        title: 'Direct (Scope 1) GHG emissions',
        description: 'Gross direct (Scope 1) GHG emissions in metric tons of CO2 equivalent',
        mandatory: false
      }
    ]
  }

  useEffect(() => {
    // Initialize requirements based on selected frameworks
    const allRequirements = selectedFrameworks.flatMap(framework => 
      (frameworkRequirements[framework as keyof typeof frameworkRequirements] || []).map(req => ({
        ...req,
        status: 'not-checked' as const
      }))
    )
    setRequirements(allRequirements)
  }, [selectedFrameworks])

  const startValidation = async () => {
    setIsRunning(true)
    setValidationProgress(0)

    // Simulate compliance checking process
    for (let i = 0; i < requirements.length; i++) {
      const requirement = requirements[i]
      
      // Update requirement status to checking
      setRequirements(prev => prev.map(req => 
        req.id === requirement.id ? { ...req, status: 'checking' } : req
      ))

      // Simulate validation time
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2000))

      // Mock validation result
      const mockResult = generateMockValidationResult(requirement, reportContent)
      
      setRequirements(prev => prev.map(req => 
        req.id === requirement.id ? { ...req, ...mockResult } : req
      ))

      setValidationProgress(((i + 1) / requirements.length) * 100)
    }

    setIsRunning(false)
  }

  const generateMockValidationResult = (requirement: ComplianceRequirement, content: ReportContent) => {
    // Mock logic to determine compliance status
    const random = Math.random()
    let status: ComplianceRequirement['status']
    let score: number
    let evidence: string[] = []
    let issues: string[] = []
    let recommendations: string[] = []

    // Check if related content exists
    const relatedSections = content.sections.filter(section => {
      const lowerContent = section.content.toLowerCase()
      return (
        lowerContent.includes('climate') ||
        lowerContent.includes('emission') ||
        lowerContent.includes('governance') ||
        lowerContent.includes('risk') ||
        lowerContent.includes('strategy')
      )
    })

    if (relatedSections.length > 0) {
      if (random > 0.8) {
        status = 'compliant'
        score = Math.floor(90 + Math.random() * 10)
        evidence = [`Content found in section: ${relatedSections[0].title}`, 'Adequate disclosure provided']
      } else if (random > 0.4) {
        status = 'partially-compliant'
        score = Math.floor(60 + Math.random() * 30)
        evidence = [`Partial content found in section: ${relatedSections[0].title}`]
        issues = ['Missing quantitative data', 'Insufficient detail on implementation']
        recommendations = ['Add specific metrics and targets', 'Include timeline for implementation']
      } else {
        status = 'non-compliant'
        score = Math.floor(20 + Math.random() * 40)
        issues = ['Required disclosure not found', 'Content does not meet minimum requirements']
        recommendations = ['Add dedicated section for this requirement', 'Include all mandatory disclosures']
      }
    } else {
      status = 'non-compliant'
      score = Math.floor(10 + Math.random() * 30)
      issues = ['No relevant content found in report']
      recommendations = ['Add section covering this requirement', 'Ensure all mandatory elements are included']
    }

    return { status, score, evidence, issues, recommendations }
  }

  const getOverallComplianceScore = () => {
    const scoredRequirements = requirements.filter(req => req.score !== undefined)
    if (scoredRequirements.length === 0) return 0
    return Math.round(scoredRequirements.reduce((sum, req) => sum + (req.score || 0), 0) / scoredRequirements.length)
  }

  const getStatusCounts = () => {
    return {
      compliant: requirements.filter(req => req.status === 'compliant').length,
      partiallyCompliant: requirements.filter(req => req.status === 'partially-compliant').length,
      nonCompliant: requirements.filter(req => req.status === 'non-compliant').length,
      notChecked: requirements.filter(req => req.status === 'not-checked').length
    }
  }

  const getStatusColor = (status: ComplianceRequirement['status']) => {
    switch (status) {
      case 'compliant': return 'text-green-600 bg-green-50 border-green-200'
      case 'partially-compliant': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'non-compliant': return 'text-red-600 bg-red-50 border-red-200'
      case 'checking': return 'text-blue-600 bg-blue-50 border-blue-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getStatusIcon = (status: ComplianceRequirement['status']) => {
    switch (status) {
      case 'compliant': return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case 'partially-compliant': return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case 'non-compliant': return <XCircle className="h-4 w-4 text-red-600" />
      case 'checking': return <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />
      default: return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const filteredRequirements = requirements.filter(req => req.framework === selectedFramework)
  const statusCounts = getStatusCounts()
  const overallScore = getOverallComplianceScore()
  const canProceed = requirements.every(req => req.status !== 'not-checked' && req.status !== 'checking')

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Compliance Validation
          </CardTitle>
          <CardDescription>
            Validate report compliance against selected ESG frameworks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Frameworks:</span>
              <p className="font-medium">{selectedFrameworks.join(', ')}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Requirements:</span>
              <p className="font-medium">{requirements.length}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Overall Score:</span>
              <p className="font-medium">{overallScore}%</p>
            </div>
            <div>
              <span className="text-muted-foreground">Status:</span>
              <p className="font-medium">
                {isRunning ? 'Validating...' : 
                 canProceed ? 'Complete' : 'Pending'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Validation Controls */}
      {!isRunning && statusCounts.notChecked > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Shield className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Ready to Validate</h3>
              <p className="text-muted-foreground mb-4">
                Run compliance validation against {requirements.length} requirements across {selectedFrameworks.length} framework(s)
              </p>
              <Button onClick={startValidation} size="lg">
                <Play className="mr-2 h-4 w-4" />
                Start Compliance Validation
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Validation Progress */}
      {isRunning && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span className="text-sm font-medium">Validating Requirements...</span>
                </div>
                <Progress value={validationProgress} className="w-full max-w-md mx-auto" />
                <p className="text-xs text-muted-foreground mt-2">
                  {Math.round(validationProgress)}% complete
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {requirements.some(req => req.status !== 'not-checked') && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Validation Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">{overallScore}%</div>
                  <p className="text-sm text-muted-foreground">Overall Score</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-3 w-3 text-green-600" />
                      <span className="text-sm">Compliant</span>
                    </div>
                    <span className="text-sm font-medium">{statusCounts.compliant}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-3 w-3 text-yellow-600" />
                      <span className="text-sm">Partial</span>
                    </div>
                    <span className="text-sm font-medium">{statusCounts.partiallyCompliant}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <XCircle className="h-3 w-3 text-red-600" />
                      <span className="text-sm">Non-compliant</span>
                    </div>
                    <span className="text-sm font-medium">{statusCounts.nonCompliant}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Framework Filter</h4>
                  <div className="space-y-1">
                    {selectedFrameworks.map(framework => (
                      <Button
                        key={framework}
                        variant={selectedFramework === framework ? "default" : "outline"}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => setSelectedFramework(framework)}
                      >
                        {framework}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Requirements List */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">
                  {selectedFramework} Requirements ({filteredRequirements.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-3">
                    {filteredRequirements.map((requirement) => (
                      <Card key={requirement.id} className={`border ${getStatusColor(requirement.status)}`}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                {getStatusIcon(requirement.status)}
                                <h4 className="font-medium text-sm">{requirement.title}</h4>
                                {requirement.mandatory && (
                                  <Badge variant="outline" className="text-xs">
                                    Mandatory
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground">{requirement.description}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="secondary" className="text-xs">
                                  {requirement.section}
                                </Badge>
                                {requirement.score !== undefined && (
                                  <Badge variant="outline" className="text-xs">
                                    {requirement.score}%
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>

                          {requirement.evidence && requirement.evidence.length > 0 && (
                            <div className="mb-3">
                              <h5 className="text-xs font-medium text-green-600 mb-1">Evidence Found:</h5>
                              <ul className="text-xs space-y-1">
                                {requirement.evidence.map((evidence, index) => (
                                  <li key={index} className="flex items-center gap-1">
                                    <CheckCircle className="h-3 w-3 text-green-500" />
                                    {evidence}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {requirement.issues && requirement.issues.length > 0 && (
                            <div className="mb-3">
                              <h5 className="text-xs font-medium text-red-600 mb-1">Issues:</h5>
                              <ul className="text-xs space-y-1">
                                {requirement.issues.map((issue, index) => (
                                  <li key={index} className="flex items-center gap-1">
                                    <AlertTriangle className="h-3 w-3 text-red-500" />
                                    {issue}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {requirement.recommendations && requirement.recommendations.length > 0 && (
                            <div className="mb-3">
                              <h5 className="text-xs font-medium text-blue-600 mb-1">Recommendations:</h5>
                              <ul className="text-xs space-y-1">
                                {requirement.recommendations.map((rec, index) => (
                                  <li key={index} className="flex items-center gap-1">
                                    <Info className="h-3 w-3 text-blue-500" />
                                    {rec}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {requirement.status === 'non-compliant' && (
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Resolve Issue
                              </Button>
                              <Button variant="ghost" size="sm">
                                <ExternalLink className="h-3 w-3" />
                                View Standard
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Completion Summary */}
      {canProceed && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-semibold text-green-800">Validation Complete</h3>
                <div className="flex gap-4 text-sm text-green-700">
                  <span>Overall Score: {overallScore}%</span>
                  <span>{statusCounts.compliant} compliant</span>
                  <span>{statusCounts.partiallyCompliant} partial</span>
                  <span>{statusCounts.nonCompliant} non-compliant</span>
                </div>
                <p className="text-sm text-green-600">
                  Review any non-compliant requirements before finalizing the report.
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export Report
                </Button>
                <Button onClick={() => onValidationComplete({ 
                  score: overallScore, 
                  requirements, 
                  statusCounts 
                })}>
                  Complete Validation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 