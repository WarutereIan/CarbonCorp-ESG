"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bot, FileText, Wand2, CheckCircle, Clock, AlertCircle, Eye, Download, Sparkles, Lightbulb, RefreshCw } from "lucide-react"

interface ReportSection {
  id: string
  title: string
  type: 'text' | 'chart' | 'table' | 'infographic'
  status: 'pending' | 'generating' | 'completed' | 'error'
  content?: string
  estimatedTime?: number
  dependencies?: string[]
  framework?: string
  parameters?: any
}

interface AIDraftingProps {
  reportSetup: any
  onComplete: (generatedContent: any) => void
  onBack: () => void
}

export function AIDraftingInterface({ reportSetup, onComplete, onBack }: AIDraftingProps) {
  const [currentPhase, setCurrentPhase] = useState<'preparing' | 'generating' | 'reviewing' | 'complete'>('preparing')
  const [overallProgress, setOverallProgress] = useState(0)
  const [sections, setSections] = useState<ReportSection[]>([])
  const [currentSection, setCurrentSection] = useState<string | null>(null)
  const [generationLog, setGenerationLog] = useState<Array<{
    timestamp: string
    type: 'info' | 'success' | 'warning' | 'error'
    message: string
  }>>([])

  // Initialize sections based on report setup
  useEffect(() => {
    initializeSections()
  }, [reportSetup])

  const initializeSections = () => {
    const reportSections: ReportSection[] = []

    // Add mandatory sections based on frameworks
    if (reportSetup.selectedFrameworks.includes('issb')) {
      reportSections.push(
        { id: 'executive-summary', title: 'Executive Summary', type: 'text', status: 'pending', estimatedTime: 2 },
        { id: 'governance', title: 'Governance', type: 'text', status: 'pending', estimatedTime: 3 },
        { id: 'strategy', title: 'Strategy', type: 'text', status: 'pending', estimatedTime: 4 },
        { id: 'risk-management', title: 'Risk Management', type: 'text', status: 'pending', estimatedTime: 3 },
        { id: 'metrics-targets', title: 'Metrics and Targets', type: 'text', status: 'pending', estimatedTime: 4, dependencies: ['governance'] }
      )
    }

    if (reportSetup.selectedFrameworks.includes('csrd')) {
      reportSections.push(
        { id: 'business-model', title: 'Business Model and Value Chain', type: 'text', status: 'pending', estimatedTime: 3 },
        { id: 'materiality-assessment', title: 'Materiality Assessment', type: 'text', status: 'pending', estimatedTime: 5 },
        { id: 'policies-actions', title: 'Policies and Actions', type: 'text', status: 'pending', estimatedTime: 4 }
      )
    }

    // Add sections based on selected topics
    if (reportSetup.selectedTopics.includes('GHG Emissions - Scope 1')) {
      reportSections.push(
        { id: 'scope-1-emissions', title: 'Scope 1 GHG Emissions', type: 'text', status: 'pending', estimatedTime: 3 }
      )
    }

    if (reportSetup.selectedTopics.includes('Employee Diversity')) {
      reportSections.push(
        { id: 'diversity-metrics', title: 'Diversity & Inclusion Metrics', type: 'table', status: 'pending', estimatedTime: 2 }
      )
    }

    // Add visualizations
    reportSections.push(
      { id: 'emissions-chart', title: 'Emissions Overview Chart', type: 'chart', status: 'pending', estimatedTime: 2 },
      { id: 'performance-dashboard', title: 'Performance Dashboard', type: 'infographic', status: 'pending', estimatedTime: 3 }
    )

    setSections(reportSections)
  }

  const startGeneration = async () => {
    setCurrentPhase('generating')
    addLog('info', 'Starting AI content generation process...')
    
    // Generate sections sequentially with dependencies
    for (const section of sections) {
      await generateSection(section)
    }

    setCurrentPhase('reviewing')
    setOverallProgress(100)
    addLog('success', 'All sections generated successfully! Ready for review.')
  }

  const generateSection = async (section: ReportSection): Promise<void> => {
    return new Promise((resolve) => {
      setCurrentSection(section.id)
      setSections(prev => prev.map(s => 
        s.id === section.id ? { ...s, status: 'generating' } : s
      ))

      addLog('info', `Generating ${section.title}...`)

      // Simulate AI generation with realistic timing
      const timer = setTimeout(() => {
        // Simulate content generation
        const generatedContent = generateMockContent(section)
        
        setSections(prev => prev.map(s => 
          s.id === section.id ? { 
            ...s, 
            status: 'completed', 
            content: generatedContent 
          } : s
        ))

        addLog('success', `Completed: ${section.title}`)
        
        // Update progress
        setOverallProgress(prev => {
          const completedSections = sections.filter(s => s.id === section.id || s.status === 'completed').length
          return Math.round((completedSections / sections.length) * 100)
        })

        resolve()
      }, (section.estimatedTime || 2) * 1000) // Convert to milliseconds for demo
    })
  }

  const generateMockContent = (section: ReportSection): string => {
    switch (section.type) {
      case 'text':
        return `# ${section.title}

This section has been generated by AI based on your selected parameters and available data from the Data Hub.

## Key Insights
- Comprehensive analysis of ${section.title.toLowerCase()} performance
- Integration with ${reportSetup.selectedFrameworks.join(', ')} frameworks
- Data-driven insights from ${reportSetup.timeframes.primary} reporting period

## Detailed Analysis
The AI has analyzed your organization's performance in ${section.title.toLowerCase()} and generated this content based on:
- Material topics identified in your assessment
- Regulatory requirements from selected frameworks
- Performance data from connected systems
- Industry benchmarks and best practices

*Note: This is AI-generated content that can be reviewed and refined in the next step.*`

      case 'chart':
        return `Chart Configuration:
Type: Line Chart
Data Source: Data Hub - Emissions Data
Time Period: ${reportSetup.timeframes.primary}
Metrics: Scope 1, 2, 3 Emissions
Styling: ${reportSetup.theme} theme with ${reportSetup.colorPalette} color palette`

      case 'table':
        return `Table Structure:
Columns: Metric, Current Year, Previous Year, % Change, Target
Rows: Generated based on selected diversity metrics
Data Source: HR System Integration
Calculations: Automated from Data Hub`

      case 'infographic':
        return `Infographic Elements:
- Key KPI cards with trend indicators
- Progress bars for goal achievement
- Comparative charts vs. industry benchmarks
- Visual hierarchy matching ${reportSetup.theme} design theme`

      default:
        return 'Generated content placeholder'
    }
  }

  const addLog = (type: 'info' | 'success' | 'warning' | 'error', message: string) => {
    setGenerationLog(prev => [
      ...prev,
      {
        timestamp: new Date().toLocaleTimeString(),
        type,
        message
      }
    ])
  }

  const regenerateSection = async (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId)
    if (section) {
      addLog('info', `Regenerating ${section.title}...`)
      await generateSection(section)
    }
  }

  const proceedToReview = () => {
    const generatedContent = {
      sections: sections.filter(s => s.status === 'completed'),
      metadata: {
        generatedAt: new Date().toISOString(),
        framework: reportSetup.selectedFrameworks,
        topics: reportSetup.selectedTopics,
        audience: reportSetup.targetAudience
      }
    }
    onComplete(generatedContent)
  }

  const getPhaseIcon = (phase: string) => {
    switch (phase) {
      case 'preparing': return <Clock className="h-4 w-4" />
      case 'generating': return <Bot className="h-4 w-4 animate-pulse" />
      case 'reviewing': return <Eye className="h-4 w-4" />
      case 'complete': return <CheckCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-3 w-3 text-gray-400" />
      case 'generating': return <Bot className="h-3 w-3 text-blue-500 animate-pulse" />
      case 'completed': return <CheckCircle className="h-3 w-3 text-green-500" />
      case 'error': return <AlertCircle className="h-3 w-3 text-red-500" />
      default: return <Clock className="h-3 w-3" />
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Wand2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>AI Content Generation</CardTitle>
                <CardDescription>
                  Generating your {reportSetup.title} using AI analysis of your data and parameters
                </CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="flex items-center gap-1">
              {getPhaseIcon(currentPhase)}
              {currentPhase.charAt(0).toUpperCase() + currentPhase.slice(1)}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Progress Overview */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">{sections.filter(s => s.status === 'completed').length}</div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-500">{sections.filter(s => s.status === 'generating').length}</div>
                <div className="text-xs text-muted-foreground">Generating</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-400">{sections.filter(s => s.status === 'pending').length}</div>
                <div className="text-xs text-muted-foreground">Pending</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{sections.length}</div>
                <div className="text-xs text-muted-foreground">Total</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Section Generation Queue */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Section Generation Queue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-3">
                  {sections.map((section, index) => (
                    <div key={section.id} className={`p-3 border rounded-lg transition-all ${
                      currentSection === section.id ? 'border-primary bg-primary/5' : ''
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">#{index + 1}</span>
                            {getStatusIcon(section.status)}
                          </div>
                          <div>
                            <div className="font-medium text-sm">{section.title}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary">
                                {section.type}
                              </Badge>
                              {section.estimatedTime && (
                                <span className="text-xs text-muted-foreground">
                                  ~{section.estimatedTime}s
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {section.status === 'completed' && (
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => regenerateSection(section.id)}
                            >
                              <RefreshCw className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                      
                      {section.content && section.status === 'completed' && (
                        <div className="mt-3 p-2 bg-muted/50 rounded text-xs">
                          <div className="line-clamp-2">
                            {section.content.substring(0, 150)}...
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Generation Log & Controls */}
        <div className="space-y-6">
          {/* Generation Log */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Generation Log</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-48">
                <div className="space-y-2">
                  {generationLog.map((log, index) => (
                    <div key={index} className="flex items-start gap-2 text-xs">
                      <span className="text-muted-foreground">{log.timestamp}</span>
                      <div className={`flex-1 ${
                        log.type === 'success' ? 'text-green-600' :
                        log.type === 'error' ? 'text-red-600' :
                        log.type === 'warning' ? 'text-yellow-600' :
                        'text-muted-foreground'
                      }`}>
                        {log.message}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Context Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Generation Context
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="text-xs font-medium mb-1">Target Audience</div>
                <Badge variant="secondary" className="text-xs">
                  {reportSetup.targetAudience}
                </Badge>
              </div>
              <Separator />
              <div>
                <div className="text-xs font-medium mb-1">Frameworks</div>
                <div className="flex flex-wrap gap-1">
                  {reportSetup.selectedFrameworks.map((fw: string) => (
                    <Badge key={fw} variant="outline" className="text-xs">
                      {fw.toUpperCase()}
                    </Badge>
                  ))}
                </div>
              </div>
              <Separator />
              <div>
                <div className="text-xs font-medium mb-1">Period</div>
                <div className="text-xs text-muted-foreground">
                  {reportSetup.timeframes.primary}
                </div>
              </div>
              <Separator />
              <div>
                <div className="text-xs font-medium mb-1">Data Sources</div>
                <div className="text-xs text-muted-foreground">
                  Connected to 5 sources
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Controls */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                {currentPhase === 'preparing' && (
                  <Button onClick={startGeneration} className="w-full">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Start AI Generation
                  </Button>
                )}
                
                {currentPhase === 'generating' && (
                  <div className="space-y-2">
                    <Button disabled className="w-full">
                      <Bot className="h-4 w-4 mr-2 animate-pulse" />
                      Generating...
                    </Button>
                    <div className="text-xs text-center text-muted-foreground">
                      Currently: {sections.find(s => s.id === currentSection)?.title}
                    </div>
                  </div>
                )}
                
                {currentPhase === 'reviewing' && (
                  <div className="space-y-2">
                    <Button onClick={proceedToReview} className="w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      Review Generated Content
                    </Button>
                    <Button variant="outline" onClick={startGeneration} className="w-full">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Regenerate All
                    </Button>
                  </div>
                )}
                
                <Button variant="ghost" onClick={onBack} className="w-full">
                  Back to Parameters
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Insights Alert */}
      {currentPhase === 'reviewing' && (
        <Alert>
          <Sparkles className="h-4 w-4" />
          <AlertDescription>
            AI generation complete! The content has been created based on your parameters and available data. 
            You can now review each section, make adjustments, and proceed to the full editing interface.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
} 