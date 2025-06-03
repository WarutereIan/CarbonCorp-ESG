"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Toggle } from "@/components/ui/toggle"
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Download, 
  FileText, 
  Globe, 
  Palette, 
  PlusCircle,
  Settings,
  Sparkles,
  Bot,
  Search,
  Upload,
  Type,
  Layers,
  CheckCircle,
  Copy,
  Wand2,
  Eye,
  Image,
  Lightbulb,
  Shield
} from "lucide-react"
import { WorkflowSelector } from "../components/workflow-selector"
import { DefaultAIWorkflow } from "../components/default-ai-workflow"
import { AIDraftingInterface } from "../components/ai-drafting-interface"
import { AIReviewInterface } from "../components/ai-review-interface"
import { ComplianceValidationEngine } from "../components/compliance-validation-engine"
import { SharingCollaborationManager } from "../components/sharing-collaboration-manager"
import { PublishingDistribution } from "../components/publishing-distribution"

interface ReportTemplate {
  id: string
  name: string
  description: string
  framework: string
  type: string
  thumbnail?: string
  features: string[]
  complexity: 'basic' | 'intermediate' | 'advanced'
}

interface ReportSetup {
  title: string
  reportingPeriod: string
  targetAudience: string
  initiationMethod: 'template' | 'ai-prompt' | 'hybrid' | 'clone'
  selectedTemplate?: string
  customPrompt?: string
  cloneFromReport?: string
  // Parameter configuration
  selectedFrameworks: string[]
  selectedTopics: string[]
  selectedRegions: string[]
  timeframes: {
    primary: string
    comparison?: string
  }
  // Design configuration
  brandKit: string
  theme: string
  coverStyle: string
  colorPalette: string
}

export default function NewReportPage() {
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedWorkflow, setSelectedWorkflow] = useState<'default' | 'advanced' | null>(null)
  const [generatedContent, setGeneratedContent] = useState<any>(null)
  const [reportSetup, setReportSetup] = useState<ReportSetup>({
    title: "",
    reportingPeriod: "",
    targetAudience: "",
    initiationMethod: "template",
    selectedFrameworks: [],
    selectedTopics: [],
    selectedRegions: [],
    timeframes: {
      primary: "",
      comparison: ""
    },
    brandKit: "company-default",
    theme: "corporate-blue",
    coverStyle: "modern",
    colorPalette: "blue-gradient"
  })

  // Check for workflow parameter on mount
  useEffect(() => {
    const workflowParam = searchParams.get('workflow')
    const triggerParam = searchParams.get('trigger')
    
    if (workflowParam && (workflowParam === 'default' || workflowParam === 'advanced')) {
      setSelectedWorkflow(workflowParam)
      
      // If it's a default workflow, skip directly to it
      if (workflowParam === 'default') {
        setCurrentStep(1) // Skip workflow selection step
      }
    }
  }, [searchParams])

  // Enhanced templates data with more details
  const templates: ReportTemplate[] = [
    {
      id: "issb-s1-s2",
      name: "ISSB S1/S2 Sustainability Report",
      description: "Comprehensive sustainability report following ISSB Standards S1 (General Requirements) and S2 (Climate-related Disclosures)",
      framework: "ISSB",
      type: "annual",
      features: ["Climate Disclosures", "Financial Impact Analysis", "Governance Framework", "Risk Assessment"],
      complexity: "advanced"
    },
    {
      id: "csrd-esrs",
      name: "CSRD ESRS Report (Full)",
      description: "Complete Corporate Sustainability Reporting Directive report with all European Sustainability Reporting Standards",
      framework: "CSRD",
      type: "annual",
      features: ["Double Materiality", "Value Chain Analysis", "EU Taxonomy Alignment", "Impact Metrics"],
      complexity: "advanced"
    },
    {
      id: "gri-universal",
      name: "GRI Universal Standards Report",
      description: "Sustainability report based on GRI Universal Standards with topic-specific standards",
      framework: "GRI",
      type: "annual",
      features: ["Materiality Assessment", "Stakeholder Engagement", "Impact Reporting", "Topic-Specific Standards"],
      complexity: "intermediate"
    },
    {
      id: "tcfd-report",
      name: "TCFD Climate Risk Report",
      description: "Task Force on Climate-related Financial Disclosures comprehensive report",
      framework: "TCFD",
      type: "climate",
      features: ["Scenario Analysis", "Financial Risk Assessment", "Governance Disclosure", "Metrics & Targets"],
      complexity: "advanced"
    },
    {
      id: "ngx-guidelines",
      name: "NGX Sustainability Guidelines Report",
      description: "Nigerian Exchange Group sustainability reporting guidelines compliance report",
      framework: "NGX",
      type: "annual",
      features: ["Local Compliance", "ESG Performance", "Stakeholder Communication", "Regional Focus"],
      complexity: "intermediate"
    },
    {
      id: "jse-requirements",
      name: "JSE Sustainability Disclosure",
      description: "Johannesburg Stock Exchange sustainability disclosure requirements",
      framework: "JSE",
      type: "annual",
      features: ["Listing Requirements", "King IV Alignment", "B-BBEE Reporting", "Climate Disclosure"],
      complexity: "intermediate"
    },
    {
      id: "dei-progress",
      name: "Diversity, Equity & Inclusion Report",
      description: "Comprehensive DEI progress report with workforce analytics and initiatives",
      framework: "Custom",
      type: "thematic",
      features: ["Workforce Demographics", "Pay Equity Analysis", "Inclusion Metrics", "Progress Tracking"],
      complexity: "basic"
    },
    {
      id: "climate-transition",
      name: "Climate Transition Plan Report",
      description: "Detailed climate transition plan with decarbonization pathways and milestones",
      framework: "Multiple",
      type: "climate",
      features: ["Science-Based Targets", "Transition Roadmap", "Investment Plans", "Progress Monitoring"],
      complexity: "advanced"
    },
    {
      id: "custom-company",
      name: "Custom Company Template",
      description: "Your organization's custom report template with pre-defined structure and branding",
      framework: "Custom",
      type: "custom",
      features: ["Company Branding", "Custom Sections", "Flexible Framework", "Saved Preferences"],
      complexity: "basic"
    }
  ]

  // Sample existing reports for cloning
  const existingReports = [
    { id: "2023-annual", name: "2023 Annual Sustainability Report", framework: "ISSB", lastModified: "2024-02-15" },
    { id: "q3-2023-climate", name: "Q3 2023 Climate Risk Assessment", framework: "TCFD", lastModified: "2023-11-30" },
    { id: "2023-dei-report", name: "2023 DEI Progress Report", framework: "Custom", lastModified: "2024-01-20" }
  ]

  const steps = selectedWorkflow === 'default' 
    ? ['Workflow Selection', 'AI Generation'] 
    : [
        'Workflow Selection',
        'Report Setup', 
        'Initiation Method', 
        'Parameter Configuration', 
        'Visual Design', 
        'AI Drafting', 
        'Review & Refine', 
        'Compliance Check',
        'Collaboration & Review',
        'Publishing & Distribution'
      ]

  const handleWorkflowSelection = (workflowId: 'default' | 'advanced') => {
    setSelectedWorkflow(workflowId)
    setCurrentStep(1)
  }

  const handleDefaultWorkflowComplete = (reportData: any) => {
    // Handle completion of default workflow
    console.log('Default workflow completed with data:', reportData)
    // Redirect to report editor or final step
  }

  const handleAdvancedWorkflowBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateReportSetup = (updates: Partial<ReportSetup>) => {
    setReportSetup(prev => ({ ...prev, ...updates }))
  }

  const handleAIDraftingComplete = (content: any) => {
    // Handle completion of AI drafting and store the generated content
    console.log('AI drafting completed:', content)
    setGeneratedContent(content)
    setCurrentStep(6) // Move to review step
  }

  const handleAIReviewComplete = (finalContent: any) => {
    // Handle completion of AI review and store the final content
    console.log('AI review completed:', finalContent)
    setGeneratedContent(finalContent)
    setCurrentStep(7) // Move to compliance check
  }

  const handleComplianceComplete = async (validationResults: any) => {
    // Handle compliance check completion
    console.log('Compliance check completed:', validationResults)
    // Progress to collaboration step
    setCurrentStep(8)
  }

  const handleValidationComplete = () => {
    setCurrentStep(prev => prev + 1)
  }

  const onComplianceIssueResolve = (requirementId: string, resolution: any) => {
    console.log("Resolving compliance issue:", requirementId, resolution)
  }

  const canProceed = () => {
    switch (currentStep) {
      case 0: // Workflow Selection
        return selectedWorkflow !== null
      case 1: // Report Setup (advanced) or AI Generation (default)
        if (selectedWorkflow === 'default') return true
        return reportSetup.title && reportSetup.reportingPeriod
      case 2:
        return reportSetup.initiationMethod && (
          reportSetup.initiationMethod === 'ai-prompt' || 
          reportSetup.selectedTemplate || 
          reportSetup.cloneFromReport
        )
      case 3:
        return reportSetup.selectedFrameworks.length > 0 || reportSetup.selectedTopics.length > 0
      case 4:
        return true // Visual design step is optional
      default:
        return false
    }
  }

  const getStepTitle = (step: number) => {
    if (selectedWorkflow === 'default') {
      switch (step) {
        case 0: return "Choose Workflow"
        case 1: return "AI Report Generation"
        default: return "Report Creation"
      }
    } else {
      // Advanced workflow step titles
      switch (step) {
        case 0: return "Choose Workflow"
        case 1: return "Report Setup"
        case 2: return "Initiation Method"
        case 3: return "Parameter Configuration"
        case 4: return "Visual Design"
        case 5: return "AI Drafting"
        case 6: return "Review & Refine"
        case 7: return "Compliance Check"
        case 8: return "Collaboration & Review"
        case 9: return "Publishing & Distribution"
        default: return "Report Creation"
      }
    }
  }

  function renderStepContent() {
    if (selectedWorkflow === 'default') {
      return (
        <DefaultAIWorkflow
          onComplete={handleDefaultWorkflowComplete}
          onBack={() => setSelectedWorkflow(null)}
        />
      )
    }

    // Advanced workflow steps
    switch (currentStep) {
      case 1:
        return <ReportSetupStep reportSetup={reportSetup} updateReportSetup={updateReportSetup} />
      
      case 2:
        return (
          <InitiationMethodStep 
            reportSetup={reportSetup} 
            updateReportSetup={updateReportSetup}
            templates={templates}
            existingReports={existingReports}
          />
        )
      
      case 3:
        return <ParameterConfigurationStep reportSetup={reportSetup} updateReportSetup={updateReportSetup} />
      
      case 4:
        return <VisualDesignStep reportSetup={reportSetup} updateReportSetup={updateReportSetup} />
      
      case 5:
        return (
          <AIDraftingInterface
            reportSetup={reportSetup}
            onComplete={handleAIDraftingComplete}
          />
        )
      
      case 6:
        return (
          <AIReviewInterface
            generatedContent={generatedContent}
            onAccept={handleAIReviewComplete}
          />
        )
      
      case 7:
        return (
          <ComplianceValidationEngine
            reportContent={generatedContent}
            selectedFrameworks={reportSetup.selectedFrameworks}
            onValidationComplete={handleComplianceComplete}
            onIssueResolve={onComplianceIssueResolve}
          />
        )
      
      case 8:
        return (
          <SharingCollaborationManager
            reportId={`report-${Date.now()}`}
            reportTitle={reportSetup.title || 'ESG Report'}
            currentUser={{
              id: 'current-user',
              name: 'Current User',
              email: 'user@company.com',
              role: 'owner',
              status: 'active',
              joinedAt: new Date().toISOString(),
              lastActivity: new Date().toISOString()
            }}
            onShare={(data: any) => {
              console.log('Collaboration data:', data)
              // Handle collaboration completion and move to publishing
              setCurrentStep(9)
            }}
          />
        )
      
      case 9:
        return (
          <PublishingDistribution
            reportId={`report-${Date.now()}`}
            reportTitle={reportSetup.title || 'ESG Report'}
            content={generatedContent}
            onPublish={(data: any) => {
              console.log('Publishing data:', data)
              // Handle publishing completion - could redirect to success page
            }}
            onSchedule={(data: any) => {
              console.log('Scheduling data:', data)
              // Handle scheduling completion
            }}
          />
        )
      
      default:
        return <div>Step not implemented</div>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Reports
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <div>
                <h1 className="text-lg font-semibold">{getStepTitle(currentStep)}</h1>
                <p className="text-sm text-muted-foreground">
                  {selectedWorkflow === 'default' ? 'AI-Powered Generation' : 'Advanced Report Builder'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {steps.length}
              </div>
              <Progress value={((currentStep + 1) / steps.length) * 100} className="w-32" />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Progress Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {steps.map((step, index) => (
                  <div key={index} className={`flex items-center gap-2 text-sm p-2 rounded-md ${
                    index === currentStep ? 'bg-blue-50 text-blue-700' : 
                    index < currentStep ? 'text-green-700' : 'text-muted-foreground'
                  }`}>
                    {index < currentStep ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : index === currentStep ? (
                      <Clock className="h-4 w-4 text-blue-600" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                    )}
                    <span className="font-medium">{step}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {renderStepContent()}

              {/* Navigation */}
              {(selectedWorkflow === 'advanced' || (selectedWorkflow === 'default' && currentStep === 0)) && 
               currentStep !== 5 && currentStep !== 6 && currentStep !== 7 && currentStep !== 8 && currentStep !== 9 && (
                <div className="flex justify-between pt-6">
                  <Button 
                    variant="outline" 
                    onClick={handleBack}
                    disabled={currentStep === 0}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Button 
                    onClick={handleNext}
                    disabled={!canProceed() || currentStep === steps.length - 1}
                  >
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Step 1: Enhanced Report Setup
function ReportSetupStep({ reportSetup, updateReportSetup }: {
  reportSetup: ReportSetup
  updateReportSetup: (updates: Partial<ReportSetup>) => void
}): React.ReactElement {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Report Setup
        </CardTitle>
        <CardDescription>
          Configure basic report information and scope
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Report Title</Label>
          <Input
            id="title"
            placeholder="e.g., 2024 Annual Sustainability Report"
            value={reportSetup.title}
            onChange={(e) => updateReportSetup({ title: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="period">Reporting Period</Label>
            <Select value={reportSetup.reportingPeriod} onValueChange={(value) => updateReportSetup({ reportingPeriod: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024-annual">2024 Annual</SelectItem>
                <SelectItem value="2024-q4">2024 Q4</SelectItem>
                <SelectItem value="2024-q3">2024 Q3</SelectItem>
                <SelectItem value="2024-h1">2024 H1</SelectItem>
                <SelectItem value="2023-annual">2023 Annual</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="audience">Target Audience</Label>
            <Select value={reportSetup.targetAudience} onValueChange={(value) => updateReportSetup({ targetAudience: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select audience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="investors">Investors</SelectItem>
                <SelectItem value="board">Board of Directors</SelectItem>
                <SelectItem value="employees">Employees</SelectItem>
                <SelectItem value="customers">Customers</SelectItem>
                <SelectItem value="regulators">Regulators</SelectItem>
                <SelectItem value="public">General Public</SelectItem>
                <SelectItem value="suppliers">Suppliers</SelectItem>
                <SelectItem value="ngos">NGOs & Civil Society</SelectItem>
                <SelectItem value="multiple">Multiple Stakeholders</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-2">Quick Tips</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Choose a descriptive title that includes the reporting period</li>
            <li>• Target audience affects tone and technical detail level</li>
            <li>• You can always refine these settings later</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

// Step 2: Enhanced Initiation Method Selection
function InitiationMethodStep({ reportSetup, updateReportSetup, templates, existingReports }: {
  reportSetup: ReportSetup
  updateReportSetup: (updates: Partial<ReportSetup>) => void
  templates: ReportTemplate[]
  existingReports: any[]
}): React.ReactElement {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterFramework, setFilterFramework] = useState("all")
  
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFramework = filterFramework === "all" || template.framework === filterFramework
    return matchesSearch && matchesFramework
  })

  const frameworks = Array.from(new Set(templates.map(t => t.framework)))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          Choose Initiation Method
        </CardTitle>
        <CardDescription>
          Select how you want to create your report
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Method Selection */}
        <RadioGroup 
          value={reportSetup.initiationMethod} 
          onValueChange={(value) => updateReportSetup({ initiationMethod: value as any })}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
              <RadioGroupItem value="template" id="template" />
              <div className="flex-1">
                <Label htmlFor="template" className="font-medium cursor-pointer">Template + Parameters + Design</Label>
                <p className="text-sm text-muted-foreground">Start with a pre-built template and customize parameters</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
              <RadioGroupItem value="ai-prompt" id="ai-prompt" />
              <div className="flex-1">
                <Label htmlFor="ai-prompt" className="font-medium cursor-pointer">Custom AI Prompt</Label>
                <p className="text-sm text-muted-foreground">Describe what you want in natural language</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
              <RadioGroupItem value="hybrid" id="hybrid" />
              <div className="flex-1">
                <Label htmlFor="hybrid" className="font-medium cursor-pointer">Hybrid Approach</Label>
                <p className="text-sm text-muted-foreground">Combine parameters with custom AI prompts</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
              <RadioGroupItem value="clone" id="clone" />
              <div className="flex-1">
                <Label htmlFor="clone" className="font-medium cursor-pointer">From Existing Report</Label>
                <p className="text-sm text-muted-foreground">Clone structure from a previous report</p>
              </div>
            </div>
          </div>
        </RadioGroup>

        {/* Method-specific content */}
        {reportSetup.initiationMethod === 'template' || reportSetup.initiationMethod === 'hybrid' ? (
          <div className="space-y-4">
            <Separator />
            <div>
              <h4 className="font-medium mb-4">Select Template</h4>
              
              {/* Search and Filter */}
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search templates..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={filterFramework} onValueChange={setFilterFramework}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Frameworks" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Frameworks</SelectItem>
                    {frameworks.map(framework => (
                      <SelectItem key={framework} value={framework}>{framework}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Template Gallery */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredTemplates.map((template) => (
                  <Card 
                    key={template.id} 
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      reportSetup.selectedTemplate === template.id ? 'ring-2 ring-primary bg-primary/5' : ''
                    }`}
                    onClick={() => updateReportSetup({ selectedTemplate: template.id })}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium text-sm">{template.name}</h5>
                        <Badge variant={template.complexity === 'advanced' ? 'default' : 
                                      template.complexity === 'intermediate' ? 'secondary' : 'outline'}>
                          {template.complexity}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">{template.description}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {template.features.slice(0, 3).map((feature) => (
                          <Badge key={feature} variant="outline" className="text-xs px-2 py-0">
                            {feature}
                          </Badge>
                        ))}
                        {template.features.length > 3 && (
                          <Badge variant="outline" className="text-xs px-2 py-0">
                            +{template.features.length - 3} more
                          </Badge>
                        )}
                      </div>
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>{template.framework} • {template.type}</span>
                        <Eye className="h-3 w-3" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {reportSetup.initiationMethod === 'ai-prompt' || reportSetup.initiationMethod === 'hybrid' ? (
          <div className="space-y-4">
            <Separator />
            <div>
              <Label htmlFor="prompt">Custom AI Prompt</Label>
              <Textarea
                id="prompt"
                placeholder="Example: Generate a comprehensive climate transition plan report for a Kenyan agribusiness focusing on water stewardship and community engagement for fiscal year 2024, targeting institutional investors with emphasis on science-based targets and investment requirements."
                value={reportSetup.customPrompt || ""}
                onChange={(e) => updateReportSetup({ customPrompt: e.target.value })}
                className="min-h-[120px] mt-2"
              />
              <div className="mt-2">
                <h5 className="text-sm font-medium mb-2">Prompt Examples:</h5>
                <div className="space-y-2">
                  {[
                    "Create a TCFD climate risk report for a manufacturing company in Nigeria focusing on physical and transition risks",
                    "Generate a DEI progress report highlighting workforce demographics and inclusion initiatives for board presentation",
                    "Draft a comprehensive CSRD report section on biodiversity and ecosystems with emphasis on nature-based solutions"
                  ].map((example, idx) => (
                    <Button
                      key={idx}
                      variant="outline" 
                      size="sm"
                      className="text-xs h-auto py-2 px-3 justify-start text-left whitespace-normal"
                      onClick={() => updateReportSetup({ customPrompt: example })}
                    >
                      <Lightbulb className="h-3 w-3 mr-2 flex-shrink-0" />
                      {example}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {reportSetup.initiationMethod === 'clone' ? (
          <div className="space-y-4">
            <Separator />
            <div>
              <Label>Select Report to Clone</Label>
              <div className="grid gap-3 mt-2">
                {existingReports.map((report) => (
                  <Card 
                    key={report.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      reportSetup.cloneFromReport === report.id ? 'ring-2 ring-primary bg-primary/5' : ''
                    }`}
                    onClick={() => updateReportSetup({ cloneFromReport: report.id })}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-medium text-sm">{report.name}</h5>
                          <p className="text-xs text-muted-foreground">Framework: {report.framework}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Last Modified</p>
                          <p className="text-xs font-medium">{new Date(report.lastModified).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}

// Step 3: Comprehensive Parameter Selection Menu
function ParameterConfigurationStep({ reportSetup, updateReportSetup }: {
  reportSetup: ReportSetup
  updateReportSetup: (updates: Partial<ReportSetup>) => void
}) {
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([])
  const [selectedDisclosures, setSelectedDisclosures] = useState<string[]>([])
  const [customDateRange, setCustomDateRange] = useState({ start: '', end: '' })

  // Enhanced ESG Topics/Metrics hierarchy
  const esgMetrics = {
    environmental: {
      name: 'Environmental',
      icon: '🌍',
      categories: {
        'climate-change': {
          name: 'Climate Change',
          metrics: [
            'GHG Emissions - Scope 1',
            'GHG Emissions - Scope 2 (Location-based)',
            'GHG Emissions - Scope 2 (Market-based)',
            'GHG Emissions - Scope 3 Category 1 (Purchased Goods)',
            'GHG Emissions - Scope 3 Category 2 (Capital Goods)',
            'GHG Emissions - Scope 3 Category 3 (Fuel/Energy)',
            'Carbon Intensity (tCO2e/Revenue)',
            'Renewable Energy Percentage',
            'Energy Consumption - Total',
            'Energy Intensity (MWh/Revenue)'
          ]
        },
        'water': {
          name: 'Water & Marine Resources',
          metrics: [
            'Water Withdrawal - Total',
            'Water Withdrawal - Freshwater',
            'Water Consumption - Total',
            'Water Recycled/Reused',
            'Water Intensity (m³/Revenue)',
            'Water Stress Areas Operations'
          ]
        },
        'biodiversity': {
          name: 'Biodiversity & Ecosystems',
          metrics: [
            'Land Use Impact',
            'Protected Areas Impact',
            'IUCN Red List Species',
            'Biodiversity Offsets'
          ]
        },
        'circular-economy': {
          name: 'Circular Economy',
          metrics: [
            'Waste Generated - Total',
            'Waste Generated - Hazardous',
            'Waste Diverted from Disposal',
            'Recycling Rate',
            'Material Circularity Rate'
          ]
        },
        'pollution': {
          name: 'Pollution',
          metrics: [
            'Air Pollutant Emissions',
            'Water Pollutant Discharge',
            'Soil Contamination Incidents',
            'Chemical Safety Incidents'
          ]
        }
      }
    },
    social: {
      name: 'Social',
      icon: '👥',
      categories: {
        'workforce': {
          name: 'Own Workforce',
          metrics: [
            'Total Employees',
            'Employee Turnover Rate',
            'Gender Diversity - Board',
            'Gender Diversity - Senior Management',
            'Gender Diversity - All Employees',
            'Age Diversity',
            'Ethnic/Cultural Diversity',
            'Pay Equity Ratio',
            'Training Hours per Employee',
            'Employee Engagement Score'
          ]
        },
        'health-safety': {
          name: 'Health & Safety',
          metrics: [
            'Lost Time Injury Frequency Rate (LTIFR)',
            'Total Recordable Injury Rate (TRIR)',
            'Work-related Fatalities',
            'Occupational Disease Rate',
            'Health & Safety Training Hours',
            'Near Miss Incidents'
          ]
        },
        'human-rights': {
          name: 'Human Rights',
          metrics: [
            'Human Rights Assessments',
            'Freedom of Association Coverage',
            'Child Labor Risk Assessment',
            'Forced Labor Risk Assessment',
            'Indigenous Rights Impact'
          ]
        },
        'community': {
          name: 'Communities',
          metrics: [
            'Community Investment',
            'Local Employment Percentage',
            'Community Grievances',
            'Social Impact Assessments',
            'Local Procurement Spending'
          ]
        }
      }
    },
    governance: {
      name: 'Governance',
      icon: '⚖️',
      categories: {
        'business-conduct': {
          name: 'Business Conduct',
          metrics: [
            'Anti-corruption Training Coverage',
            'Ethics Violations Reported',
            'Whistleblower Reports',
            'Data Privacy Breaches',
            'Regulatory Fines/Penalties'
          ]
        },
        'risk-management': {
          name: 'Risk Management',
          metrics: [
            'Climate Risk Assessment',
            'Cybersecurity Incidents',
            'Business Continuity Tests',
            'Supply Chain Risk Assessments',
            'ESG Risk Integration'
          ]
        }
      }
    }
  }

  // Organizational structure for region/facility selection
  const organizationalUnits = {
    regions: [
      { id: 'africa', name: 'Africa', facilities: ['Lagos Office', 'Cairo Manufacturing', 'Johannesburg Hub'] },
      { id: 'europe', name: 'Europe', facilities: ['London HQ', 'Berlin Office', 'Stockholm R&D'] },
      { id: 'asia-pacific', name: 'Asia Pacific', facilities: ['Singapore Operations', 'Mumbai Center', 'Sydney Office'] },
      { id: 'americas', name: 'Americas', facilities: ['New York Office', 'São Paulo Branch', 'Toronto Center'] }
    ],
    businessUnits: [
      { id: 'operations', name: 'Operations', description: 'Manufacturing and production facilities' },
      { id: 'corporate', name: 'Corporate Functions', description: 'HQ, finance, HR, legal' },
      { id: 'rd', name: 'Research & Development', description: 'Innovation and product development' },
      { id: 'sales', name: 'Sales & Marketing', description: 'Customer-facing operations' }
    ]
  }

  // Compliance frameworks with detailed disclosures
  const complianceFrameworks = {
    'csrd': {
      name: 'CSRD ESRS',
      description: 'Corporate Sustainability Reporting Directive - European Sustainability Reporting Standards',
      topics: {
        'esrs-e1': {
          name: 'ESRS E1 - Climate Change',
          disclosures: [
            'E1-1: Transition plan for climate change mitigation',
            'E1-2: Policies related to climate change mitigation',
            'E1-3: Actions and resources related to climate change policies',
            'E1-4: Targets related to climate change mitigation',
            'E1-5: Energy consumption and mix',
            'E1-6: Gross Scopes 1, 2, 3 and Total GHG emissions',
            'E1-7: GHG removals and GHG mitigation projects',
            'E1-8: Internal carbon pricing',
            'E1-9: Anticipated financial effects from material climate risks'
          ]
        },
        'esrs-e2': {
          name: 'ESRS E2 - Pollution',
          disclosures: [
            'E2-1: Policies related to pollution',
            'E2-2: Actions and resources related to pollution',
            'E2-3: Targets related to pollution',
            'E2-4: Pollution of air, water and soil',
            'E2-5: Substances of concern and substances of very high concern',
            'E2-6: Anticipated financial effects from pollution-related impacts'
          ]
        },
        'esrs-e3': {
          name: 'ESRS E3 - Water and Marine Resources',
          disclosures: [
            'E3-1: Policies related to water and marine resources',
            'E3-2: Actions and resources related to water and marine resources',
            'E3-3: Targets related to water and marine resources',
            'E3-4: Water consumption',
            'E3-5: Anticipated financial effects from water and marine resources'
          ]
        },
        'esrs-s1': {
          name: 'ESRS S1 - Own Workforce',
          disclosures: [
            'S1-1: Policies related to own workforce',
            'S1-2: Processes for engaging with own workforce',
            'S1-3: Processes to remediate negative impacts',
            'S1-4: Taking action on material impacts on own workforce',
            'S1-5: Targets related to managing material negative impacts',
            'S1-6: Characteristics of the undertaking\'s employees',
            'S1-7: Characteristics of non-employee workers',
            'S1-8: Collective bargaining coverage and social dialogue'
          ]
        },
        'esrs-g1': {
          name: 'ESRS G1 - Business Conduct',
          disclosures: [
            'G1-1: Business conduct policies and corporate culture',
            'G1-2: Management of relationships with suppliers',
            'G1-3: Prevention and detection of corruption and bribery',
            'G1-4: Incidents of corruption or bribery'
          ]
        }
      }
    },
    'issb': {
      name: 'ISSB S1/S2',
      description: 'International Sustainability Standards Board',
      topics: {
        's1': {
          name: 'ISSB S1 - General Requirements',
          disclosures: [
            'Governance processes and controls for sustainability-related risks',
            'Strategy for managing sustainability-related risks and opportunities',
            'Risk management processes for sustainability-related risks',
            'Metrics and targets for measuring sustainability performance'
          ]
        },
        's2': {
          name: 'ISSB S2 - Climate-related Disclosures',
          disclosures: [
            'Climate-related governance',
            'Climate-related strategy including business model impacts',
            'Climate-related risk management',
            'Climate-related metrics and targets including GHG emissions'
          ]
        }
      }
    },
    'gri': {
      name: 'GRI Standards',
      description: 'Global Reporting Initiative Universal Standards',
      topics: {
        'gri-2': {
          name: 'GRI 2 - General Disclosures',
          disclosures: [
            '2-1: Organizational details',
            '2-6: Activities, value chain, and other business relationships',
            '2-9: Governance structure and composition',
            '2-22: Statement on sustainable development strategy',
            '2-29: Approach to stakeholder engagement'
          ]
        },
        'gri-3': {
          name: 'GRI 3 - Material Topics',
          disclosures: [
            '3-1: Process to determine material topics',
            '3-2: List of material topics',
            '3-3: Management of material topics'
          ]
        }
      }
    }
  }

  const timeframePeriods = [
    { id: 'q1-2024', name: 'Q1 2024', description: 'Jan - Mar 2024' },
    { id: 'q2-2024', name: 'Q2 2024', description: 'Apr - Jun 2024' },
    { id: 'q3-2024', name: 'Q3 2024', description: 'Jul - Sep 2024' },
    { id: 'q4-2024', name: 'Q4 2024', description: 'Oct - Dec 2024' },
    { id: 'fy-2024', name: 'FY 2024', description: 'Full Year 2024' },
    { id: 'fy-2023', name: 'FY 2023', description: 'Full Year 2023' },
    { id: 'custom', name: 'Custom Range', description: 'Define your own period' }
  ]

  const targetAudiences = [
    { id: 'investors', name: 'Investors', description: 'Shareholders, institutional investors, analysts', icon: '📈' },
    { id: 'board', name: 'Board of Directors', description: 'Internal governance and oversight', icon: '👔' },
    { id: 'employees', name: 'Employees', description: 'Internal stakeholders and workforce', icon: '👥' },
    { id: 'customers', name: 'Customers', description: 'Clients and end consumers', icon: '🛒' },
    { id: 'regulators', name: 'Regulators', description: 'Government agencies and compliance bodies', icon: '🏛️' },
    { id: 'public', name: 'General Public', description: 'Public disclosure and transparency', icon: '🌐' },
    { id: 'suppliers', name: 'Suppliers', description: 'Value chain partners and vendors', icon: '🤝' },
    { id: 'ngos', name: 'NGOs & Civil Society', description: 'Non-profit organizations and advocacy groups', icon: '🌱' }
  ]

  const reportStyles = [
    { id: 'formal', name: 'Formal', description: 'Traditional corporate language, professional tone' },
    { id: 'technical', name: 'Technical', description: 'Detailed methodology, data-focused approach' },
    { id: 'accessible', name: 'Accessible', description: 'Clear, jargon-free language for broader audiences' },
    { id: 'persuasive', name: 'Persuasive', description: 'Compelling narrative highlighting achievements' },
    { id: 'optimistic', name: 'Optimistic', description: 'Positive framing of progress and future plans' },
    { id: 'cautious', name: 'Cautious', description: 'Balanced view acknowledging challenges and risks' }
  ]

  const handleMetricToggle = (metric: string) => {
    const updated = selectedMetrics.includes(metric)
      ? selectedMetrics.filter(m => m !== metric)
      : [...selectedMetrics, metric]
    setSelectedMetrics(updated)
    updateReportSetup({ selectedTopics: updated })
  }

  const handleDisclosureToggle = (disclosure: string) => {
    const updated = selectedDisclosures.includes(disclosure)
      ? selectedDisclosures.filter(d => d !== disclosure)
      : [...selectedDisclosures, disclosure]
    setSelectedDisclosures(updated)
  }

  const handleSelectAllInCategory = (category: any) => {
    const categoryMetrics = category.metrics || []
    const allSelected = categoryMetrics.every((metric: string) => selectedMetrics.includes(metric))
    
    if (allSelected) {
      // Deselect all in category
      const updated = selectedMetrics.filter(m => !categoryMetrics.includes(m))
      setSelectedMetrics(updated)
      updateReportSetup({ selectedTopics: updated })
    } else {
      // Select all in category
      const updated = [...new Set([...selectedMetrics, ...categoryMetrics])]
      setSelectedMetrics(updated)
      updateReportSetup({ selectedTopics: updated })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Parameter Selection Menu
        </CardTitle>
        <CardDescription>
          Define the scope and content focus of your report using structured parameters
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="content">Content Filters</TabsTrigger>
            <TabsTrigger value="compliance">Compliance & Frameworks</TabsTrigger>
            <TabsTrigger value="audience">Audience & Tone</TabsTrigger>
            <TabsTrigger value="summary">Parameter Summary</TabsTrigger>
          </TabsList>

          {/* Content Filters Tab */}
          <TabsContent value="content" className="space-y-6">
            <div>
              <Label className="text-sm font-medium mb-3 block">ESG Topics & Metrics Selection</Label>
              <div className="space-y-4">
                {Object.entries(esgMetrics).map(([domain, domainData]) => (
                  <Card key={domain} className="border-l-4" style={{ borderLeftColor: domain === 'environmental' ? '#22c55e' : domain === 'social' ? '#3b82f6' : '#f59e0b' }}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <span className="text-lg">{domainData.icon}</span>
                        {domainData.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {Object.entries(domainData.categories).map(([categoryId, category]) => (
                        <div key={categoryId} className="border rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-sm">{category.name}</h4>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleSelectAllInCategory(category)}
                              className="text-xs"
                            >
                              {category.metrics.every((metric: string) => selectedMetrics.includes(metric)) ? 'Deselect All' : 'Select All'}
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {category.metrics.map((metric: string) => (
                              <div key={metric} className="flex items-center space-x-2">
                                <Checkbox
                                  id={metric}
                                  checked={selectedMetrics.includes(metric)}
                                  onCheckedChange={() => handleMetricToggle(metric)}
                                />
                                <Label htmlFor={metric} className="text-xs leading-relaxed">
                                  {metric}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-3 block">Organizational Scope</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Regions & Facilities</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {organizationalUnits.regions.map((region) => (
                      <div key={region.id} className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={region.id}
                            checked={reportSetup.selectedRegions.includes(region.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                updateReportSetup({ 
                                  selectedRegions: [...reportSetup.selectedRegions, region.id] 
                                })
                              } else {
                                updateReportSetup({ 
                                  selectedRegions: reportSetup.selectedRegions.filter(r => r !== region.id) 
                                })
                              }
                            }}
                          />
                          <Label htmlFor={region.id} className="text-sm font-medium">
                            {region.name}
                          </Label>
                        </div>
                        <div className="ml-6 space-y-1">
                          {region.facilities.map((facility, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <Checkbox id={`${region.id}-${idx}`} />
                              <Label htmlFor={`${region.id}-${idx}`} className="text-xs text-muted-foreground">
                                {facility}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Business Units</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {organizationalUnits.businessUnits.map((unit) => (
                      <div key={unit.id} className="flex items-center space-x-2">
                        <Checkbox id={unit.id} />
                        <div>
                          <Label htmlFor={unit.id} className="text-sm font-medium">
                            {unit.name}
                          </Label>
                          <p className="text-xs text-muted-foreground">{unit.description}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-3 block">Timeframes & Comparison Periods</Label>
              <div className="space-y-4">
                <div>
                  <Label className="text-xs font-medium text-muted-foreground mb-2 block">Primary Reporting Period</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {timeframePeriods.map((period) => (
                      <Card 
                        key={period.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          reportSetup.timeframes.primary === period.id ? 'ring-2 ring-primary bg-primary/5' : ''
                        }`}
                        onClick={() => updateReportSetup({ 
                          timeframes: { ...reportSetup.timeframes, primary: period.id } 
                        })}
                      >
                        <CardContent className="p-3 text-center">
                          <h5 className="font-medium text-sm">{period.name}</h5>
                          <p className="text-xs text-muted-foreground">{period.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {reportSetup.timeframes.primary === 'custom' && (
                  <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/20">
                    <div>
                      <Label className="text-xs font-medium">Start Date</Label>
                      <Input 
                        type="date" 
                        value={customDateRange.start}
                        onChange={(e) => setCustomDateRange(prev => ({ ...prev, start: e.target.value }))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium">End Date</Label>
                      <Input 
                        type="date" 
                        value={customDateRange.end}
                        onChange={(e) => setCustomDateRange(prev => ({ ...prev, end: e.target.value }))}
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <Label className="text-xs font-medium text-muted-foreground mb-2 block">Comparison Period (Optional)</Label>
                  <Select onValueChange={(value) => updateReportSetup({ 
                    timeframes: { ...reportSetup.timeframes, comparison: value } 
                  })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select comparison period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No comparison</SelectItem>
                      <SelectItem value="previous-period">Previous period</SelectItem>
                      <SelectItem value="same-period-last-year">Same period last year</SelectItem>
                      <SelectItem value="baseline-year">Baseline year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Compliance Frameworks Tab */}
          <TabsContent value="compliance" className="space-y-6">
            <div>
              <Label className="text-sm font-medium mb-3 block">Compliance Frameworks & Specific Disclosures</Label>
              <div className="space-y-4">
                {Object.entries(complianceFrameworks).map(([frameworkId, framework]) => (
                  <Card key={frameworkId}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-base">{framework.name}</CardTitle>
                          <CardDescription className="text-sm">{framework.description}</CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={frameworkId}
                            checked={reportSetup.selectedFrameworks.includes(frameworkId)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                updateReportSetup({ 
                                  selectedFrameworks: [...reportSetup.selectedFrameworks, frameworkId] 
                                })
                              } else {
                                updateReportSetup({ 
                                  selectedFrameworks: reportSetup.selectedFrameworks.filter(f => f !== frameworkId) 
                                })
                              }
                            }}
                          />
                          <Label htmlFor={frameworkId} className="text-sm font-medium">Include Framework</Label>
                        </div>
                      </div>
                    </CardHeader>
                    {reportSetup.selectedFrameworks.includes(frameworkId) && (
                      <CardContent className="space-y-3">
                        {Object.entries(framework.topics).map(([topicId, topic]) => (
                          <div key={topicId} className="border rounded-lg p-3">
                            <h4 className="font-medium text-sm mb-2">{topic.name}</h4>
                            <div className="space-y-2">
                              {topic.disclosures.map((disclosure, idx) => (
                                <div key={idx} className="flex items-start space-x-2">
                                  <Checkbox
                                    id={`${topicId}-${idx}`}
                                    checked={selectedDisclosures.includes(disclosure)}
                                    onCheckedChange={() => handleDisclosureToggle(disclosure)}
                                  />
                                  <Label htmlFor={`${topicId}-${idx}`} className="text-xs leading-relaxed">
                                    {disclosure}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                        <div className="flex gap-2 mt-3">
                          <Button variant="outline" size="sm" onClick={() => {
                            const allTopicDisclosures = Object.values(framework.topics).flatMap(topic => topic.disclosures)
                            setSelectedDisclosures(prev => [...new Set([...prev, ...allTopicDisclosures])])
                          }}>
                            Select All Core Disclosures
                          </Button>
                          <Button variant="outline" size="sm">
                            AI Recommend Based on Materiality
                          </Button>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Audience & Tone Tab */}
          <TabsContent value="audience" className="space-y-6">
            <div>
              <Label className="text-sm font-medium mb-3 block">Target Audience</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {targetAudiences.map((audience) => (
                  <Card 
                    key={audience.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      reportSetup.targetAudience === audience.id ? 'ring-2 ring-primary bg-primary/5' : ''
                    }`}
                    onClick={() => updateReportSetup({ targetAudience: audience.id })}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{audience.icon}</span>
                        <div>
                          <h5 className="font-medium text-sm">{audience.name}</h5>
                          <p className="text-xs text-muted-foreground">{audience.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-3 block">Report Style & Tone</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {reportStyles.map((style) => (
                  <Card 
                    key={style.id}
                    className="cursor-pointer transition-all hover:shadow-md"
                  >
                    <CardContent className="p-4">
                      <h5 className="font-medium text-sm">{style.name}</h5>
                      <p className="text-xs text-muted-foreground mt-1">{style.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-3 block">AI Content Preferences</Label>
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Use these parameters to guide AI generation</Label>
                      <p className="text-xs text-muted-foreground">Selected parameters will be passed to AI for content creation</p>
                    </div>
                    <Toggle defaultPressed={true} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Auto-suggest related content</Label>
                      <p className="text-xs text-muted-foreground">AI can recommend additional relevant sections</p>
                    </div>
                    <Toggle />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Include benchmark comparisons</Label>
                      <p className="text-xs text-muted-foreground">Add industry and peer comparisons where available</p>
                    </div>
                    <Toggle />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Parameter Summary Tab */}
          <TabsContent value="summary" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Parameter Summary
                </CardTitle>
                <CardDescription>
                  Review all selected parameters before proceeding to AI generation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Content Scope</h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span>Selected Metrics:</span>
                        <Badge variant="outline">{selectedMetrics.length}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Frameworks:</span>
                        <Badge variant="outline">{reportSetup.selectedFrameworks.length}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Disclosures:</span>
                        <Badge variant="outline">{selectedDisclosures.length}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Regions:</span>
                        <Badge variant="outline">{reportSetup.selectedRegions.length}</Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">Configuration</h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span>Primary Period:</span>
                        <span className="font-medium">{reportSetup.timeframes.primary || 'Not set'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Target Audience:</span>
                        <span className="font-medium">{reportSetup.targetAudience || 'Not set'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>AI Guidance:</span>
                        <Badge variant="secondary">Enabled</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedMetrics.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm mb-2">Top Selected Metrics</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedMetrics.slice(0, 6).map((metric) => (
                        <Badge key={metric} variant="secondary" className="text-xs">
                          {metric.length > 30 ? metric.substring(0, 30) + '...' : metric}
                        </Badge>
                      ))}
                      {selectedMetrics.length > 6 && (
                        <Badge variant="secondary" className="text-xs">
                          +{selectedMetrics.length - 6} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {reportSetup.selectedFrameworks.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm mb-2">Selected Frameworks</h4>
                    <div className="flex flex-wrap gap-1">
                      {reportSetup.selectedFrameworks.map((framework) => (
                        <Badge key={framework} variant="outline" className="text-xs">
                          {framework.toUpperCase()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Bot className="h-4 w-4" />
                  <span>These parameters will guide AI content generation and ensure comprehensive coverage of selected topics and requirements.</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

// Step 4: Comprehensive Visual Design Studio
function VisualDesignStep({ reportSetup, updateReportSetup }: {
  reportSetup: ReportSetup
  updateReportSetup: (updates: Partial<ReportSetup>) => void
}) {
  const [selectedFont, setSelectedFont] = useState('inter')
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [customBackground, setCustomBackground] = useState<string>('#ffffff')
  const [showAdvancedTypography, setShowAdvancedTypography] = useState(false)

  // Enhanced data for comprehensive design studio
  const brandKits = [
    { 
      id: 'company-default', 
      name: 'Company Default', 
      description: 'Your organization\'s standard branding',
      primaryColor: '#1e40af',
      secondaryColor: '#3b82f6',
      accentColor: '#60a5fa',
      logo: '🏢'
    },
    { 
      id: 'professional-blue', 
      name: 'Professional Blue', 
      description: 'Clean, corporate blue theme',
      primaryColor: '#1e3a8a',
      secondaryColor: '#1d4ed8',
      accentColor: '#3b82f6',
      logo: '💼'
    },
    { 
      id: 'eco-green', 
      name: 'Eco Green', 
      description: 'Sustainability-focused green palette',
      primaryColor: '#166534',
      secondaryColor: '#22c55e',
      accentColor: '#86efac',
      logo: '🌱'
    },
    { 
      id: 'modern-tech', 
      name: 'Modern Tech', 
      description: 'Contemporary technology theme',
      primaryColor: '#7c3aed',
      secondaryColor: '#a855f7',
      accentColor: '#c084fc',
      logo: '⚡'
    }
  ]

  const pageLayouts = [
    { id: 'a4-portrait', name: 'A4 Portrait', description: '210 × 297 mm', icon: '📄' },
    { id: 'a4-landscape', name: 'A4 Landscape', description: '297 × 210 mm', icon: '📰' },
    { id: 'letter-portrait', name: 'Letter Portrait', description: '8.5 × 11 in', icon: '📄' },
    { id: 'letter-landscape', name: 'Letter Landscape', description: '11 × 8.5 in', icon: '📰' }
  ]

  const coverLayouts = [
    {
      id: 'executive-classic',
      name: 'Executive Classic',
      description: 'Traditional corporate layout with centered content',
      preview: (
        <div className="w-full h-32 bg-gradient-to-b from-slate-100 to-slate-200 rounded border flex flex-col justify-center items-center p-2">
          <div className="w-6 h-6 bg-primary rounded mb-2"></div>
          <div className="w-20 h-2 bg-foreground/60 rounded mb-1"></div>
          <div className="w-16 h-1 bg-foreground/40 rounded mb-1"></div>
          <div className="w-12 h-1 bg-foreground/30 rounded"></div>
        </div>
      )
    },
    {
      id: 'modern-split',
      name: 'Modern Split',
      description: 'Contemporary design with asymmetrical layout',
      preview: (
        <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded border flex">
          <div className="flex-1 flex flex-col justify-center p-2">
            <div className="w-4 h-4 bg-primary rounded mb-2"></div>
            <div className="w-16 h-1.5 bg-foreground/60 rounded mb-1"></div>
            <div className="w-12 h-1 bg-foreground/40 rounded"></div>
          </div>
          <div className="w-8 bg-primary/20 rounded-r"></div>
        </div>
      )
    },
    {
      id: 'minimalist-clean',
      name: 'Minimalist Clean',
      description: 'Simple and elegant with lots of white space',
      preview: (
        <div className="w-full h-32 bg-white rounded border flex flex-col justify-end items-start p-3">
          <div className="w-20 h-1.5 bg-foreground/80 rounded mb-1"></div>
          <div className="w-16 h-1 bg-foreground/50 rounded mb-4"></div>
          <div className="w-3 h-3 bg-primary rounded"></div>
        </div>
      )
    },
    {
      id: 'creative-bold',
      name: 'Creative Bold',
      description: 'Vibrant design with strong visual elements',
      preview: (
        <div className="w-full h-32 bg-gradient-to-r from-orange-200 to-pink-200 rounded border relative overflow-hidden">
          <div className="absolute top-2 left-2">
            <div className="w-16 h-1.5 bg-foreground/80 rounded mb-1"></div>
            <div className="w-12 h-1 bg-foreground/60 rounded"></div>
          </div>
          <div className="absolute bottom-2 right-2 w-6 h-6 bg-primary rounded-full"></div>
          <div className="absolute top-4 right-4 w-8 h-8 bg-accent/30 rounded transform rotate-45"></div>
        </div>
      )
    }
  ]

  const fonts = [
    { id: 'inter', name: 'Inter', description: 'Modern, readable sans-serif', category: 'Sans-serif' },
    { id: 'roboto', name: 'Roboto', description: 'Google\'s flagship font', category: 'Sans-serif' },
    { id: 'source-serif', name: 'Source Serif Pro', description: 'Professional serif font', category: 'Serif' },
    { id: 'playfair', name: 'Playfair Display', description: 'Elegant display serif', category: 'Serif' },
    { id: 'montserrat', name: 'Montserrat', description: 'Versatile geometric font', category: 'Sans-serif' },
    { id: 'lora', name: 'Lora', description: 'Calligraphic serif', category: 'Serif' }
  ]

  const sectionDividers = [
    { id: 'none', name: 'None', preview: '—' },
    { id: 'simple-line', name: 'Simple Line', preview: '———' },
    { id: 'double-line', name: 'Double Line', preview: '═══' },
    { id: 'dots', name: 'Dotted', preview: '• • •' },
    { id: 'geometric', name: 'Geometric', preview: '◆ ◆ ◆' },
    { id: 'wave', name: 'Wave', preview: '∿∿∿' },
    { id: 'african-pattern', name: 'African Pattern', preview: '▲▼▲' },
    { id: 'kente-inspired', name: 'Kente Inspired', preview: '◢◣◢' }
  ]

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setLogoFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveAsTemplate = () => {
    const template = {
      name: `${reportSetup.title || 'Custom'} Template`,
      brandKit: reportSetup.brandKit,
      theme: reportSetup.theme,
      coverStyle: reportSetup.coverStyle,
      colorPalette: reportSetup.colorPalette,
      typography: {
        font: selectedFont,
        advanced: showAdvancedTypography
      },
      logo: logoFile ? 'uploaded' : null,
      customSettings: {
        background: customBackground
      },
      createdAt: new Date().toISOString()
    }
    
    // Save to localStorage for now (in real app, would save to backend)
    const existingTemplates = JSON.parse(localStorage.getItem('companyReportTemplates') || '[]')
    existingTemplates.push(template)
    localStorage.setItem('companyReportTemplates', JSON.stringify(existingTemplates))
    
    // Show success feedback (you might want to add a toast notification here)
    alert('Template saved successfully!')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Visual Design Studio
        </CardTitle>
        <CardDescription>
          Customize the visual appearance and branding of your report
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="global" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="global">Global Styles</TabsTrigger>
            <TabsTrigger value="cover">Cover Page</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
            <TabsTrigger value="elements">Elements</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>
          
          {/* Global Styles Tab */}
          <TabsContent value="global" className="space-y-6">
            <div>
              <Label className="text-sm font-medium mb-3 block">Brand Kit Selection</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {brandKits.map((kit) => (
                  <Card 
                    key={kit.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      reportSetup.brandKit === kit.id ? 'ring-2 ring-primary bg-primary/5' : ''
                    }`}
                    onClick={() => updateReportSetup({ brandKit: kit.id })}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{kit.logo}</span>
                          <h5 className="font-medium text-sm">{kit.name}</h5>
                        </div>
                        <div className="flex gap-1">
                          <div className="w-3 h-3 rounded-full border" style={{ backgroundColor: kit.primaryColor }} />
                          <div className="w-3 h-3 rounded-full border" style={{ backgroundColor: kit.secondaryColor }} />
                          <div className="w-3 h-3 rounded-full border" style={{ backgroundColor: kit.accentColor }} />
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{kit.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-3 block">Page Setup</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {pageLayouts.map((layout) => (
                  <Card 
                    key={layout.id}
                    className="cursor-pointer transition-all hover:shadow-md"
                  >
                    <CardContent className="p-3 text-center">
                      <div className="text-lg mb-1">{layout.icon}</div>
                      <h6 className="font-medium text-xs">{layout.name}</h6>
                      <p className="text-xs text-muted-foreground">{layout.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-3 block">Theme Mode</Label>
              <RadioGroup defaultValue="light" className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="light" />
                  <Label htmlFor="light" className="flex items-center gap-2">
                    ☀️ Light Mode
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dark" id="dark" />
                  <Label htmlFor="dark" className="flex items-center gap-2">
                    🌙 Dark Mode
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="auto" id="auto" />
                  <Label htmlFor="auto" className="flex items-center gap-2">
                    🔄 Auto
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </TabsContent>

          {/* Cover Page Designer Tab */}
          <TabsContent value="cover" className="space-y-6">
            <div>
              <Label className="text-sm font-medium mb-3 block">Cover Page Layout</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {coverLayouts.map((layout) => (
                  <Card 
                    key={layout.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      reportSetup.coverStyle === layout.id ? 'ring-2 ring-primary bg-primary/5' : ''
                    }`}
                    onClick={() => updateReportSetup({ coverStyle: layout.id })}
                  >
                    <CardContent className="p-4">
                      <div className="mb-3">
                        {layout.preview}
                      </div>
                      <h5 className="font-medium text-sm">{layout.name}</h5>
                      <p className="text-xs text-muted-foreground">{layout.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-3 block">Company Logo</Label>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  {logoPreview ? (
                    <div className="space-y-2">
                      <img src={logoPreview} alt="Logo preview" className="max-h-16 mx-auto" />
                      <p className="text-sm text-muted-foreground">Logo uploaded successfully</p>
                      <Button variant="outline" size="sm" onClick={() => {
                        setLogoFile(null)
                        setLogoPreview(null)
                      }}>
                        Remove Logo
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Drag and drop your logo here, or click to browse
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                        id="logo-upload"
                      />
                      <Button variant="outline" size="sm" asChild>
                        <label htmlFor="logo-upload" className="cursor-pointer">
                          Browse Files
                        </label>
                      </Button>
                    </div>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                  Supported formats: PNG, JPG, SVG (max 2MB). Recommended size: 200x80px
                </div>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-3 block">Background Options</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="cursor-pointer hover:shadow-md">
                  <CardContent className="p-4 text-center">
                    <div className="w-full h-16 bg-white border rounded mb-2"></div>
                    <p className="text-xs font-medium">Solid Color</p>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:shadow-md">
                  <CardContent className="p-4 text-center">
                    <div className="w-full h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded mb-2"></div>
                    <p className="text-xs font-medium">Gradient</p>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:shadow-md">
                  <CardContent className="p-4 text-center">
                    <div className="w-full h-16 bg-gray-100 border-2 border-dashed border-gray-300 rounded mb-2 flex items-center justify-center">
                      <span className="text-xs text-gray-500">Pattern</span>
                    </div>
                    <p className="text-xs font-medium">Pattern</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-3 block">Dynamic Fields</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {[
                  '{{Company_Name}}',
                  '{{Report_Title}}',
                  '{{Report_Year}}',
                  '{{Date_Published}}',
                  '{{Reporting_Period}}',
                  '{{Author_Name}}'
                ].map((field) => (
                  <Button key={field} variant="outline" size="sm" className="text-xs">
                    {field}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Click to insert dynamic fields that will be automatically populated
              </p>
            </div>
          </TabsContent>

          {/* Typography Tab */}
          <TabsContent value="typography" className="space-y-6">
            <div>
              <Label className="text-sm font-medium mb-3 block">Font Family</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {fonts.map((font) => (
                  <Card 
                    key={font.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedFont === font.id ? 'ring-2 ring-primary bg-primary/5' : ''
                    }`}
                    onClick={() => setSelectedFont(font.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-1">
                        <h5 className="font-medium text-sm" style={{ fontFamily: font.name.replace(' ', '+') }}>
                          {font.name}
                        </h5>
                        <Badge variant="outline" className="text-xs">
                          {font.category}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{font.description}</p>
                      <p className="text-sm mt-2" style={{ fontFamily: font.name.replace(' ', '+') }}>
                        The quick brown fox jumps over the lazy dog
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <Label className="text-sm font-medium">Advanced Typography Settings</Label>
                <Toggle 
                  pressed={showAdvancedTypography}
                  onPressedChange={setShowAdvancedTypography}
                  size="sm"
                >
                  Advanced
                </Toggle>
              </div>
              
              {showAdvancedTypography && (
                <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs font-medium">Heading Font Size</Label>
                      <Select defaultValue="24">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="20">20px</SelectItem>
                          <SelectItem value="24">24px</SelectItem>
                          <SelectItem value="28">28px</SelectItem>
                          <SelectItem value="32">32px</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs font-medium">Body Font Size</Label>
                      <Select defaultValue="14">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12">12px</SelectItem>
                          <SelectItem value="14">14px</SelectItem>
                          <SelectItem value="16">16px</SelectItem>
                          <SelectItem value="18">18px</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs font-medium">Line Height</Label>
                      <Select defaultValue="1.5">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1.3">1.3</SelectItem>
                          <SelectItem value="1.5">1.5</SelectItem>
                          <SelectItem value="1.7">1.7</SelectItem>
                          <SelectItem value="2.0">2.0</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs font-medium">Letter Spacing</Label>
                      <Select defaultValue="normal">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tight">Tight</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="wide">Wide</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Design Elements Tab */}
          <TabsContent value="elements" className="space-y-6">
            <div>
              <Label className="text-sm font-medium mb-3 block">Section Dividers</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {sectionDividers.map((divider) => (
                  <Card 
                    key={divider.id}
                    className="cursor-pointer transition-all hover:shadow-md"
                  >
                    <CardContent className="p-3 text-center">
                      <div className="text-lg mb-1">{divider.preview}</div>
                      <p className="text-xs font-medium">{divider.name}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Includes culturally relevant patterns like Kente-inspired designs for African markets
              </p>
            </div>

            <div>
              <Label className="text-sm font-medium mb-3 block">Chart Styling</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h6 className="font-medium text-sm mb-2">Default Chart Colors</h6>
                    <div className="flex gap-1 mb-2">
                      {['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'].map((color, idx) => (
                        <div key={idx} className="w-4 h-4 rounded border" style={{ backgroundColor: color }} />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">Primary chart color palette</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h6 className="font-medium text-sm mb-2">Chart Style</h6>
                    <Select defaultValue="modern">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="modern">Modern</SelectItem>
                        <SelectItem value="classic">Classic</SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-3 block">Table Styling</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Card className="cursor-pointer hover:shadow-md">
                  <CardContent className="p-3">
                    <div className="space-y-1 mb-2">
                      <div className="w-full h-2 bg-primary/20 rounded"></div>
                      <div className="w-full h-1 bg-muted rounded"></div>
                      <div className="w-full h-1 bg-muted rounded"></div>
                    </div>
                    <p className="text-xs font-medium">Header Accent</p>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:shadow-md">
                  <CardContent className="p-3">
                    <div className="space-y-1 mb-2">
                      <div className="w-full h-2 bg-muted rounded"></div>
                      <div className="w-full h-1 bg-primary/10 rounded"></div>
                      <div className="w-full h-1 bg-muted rounded"></div>
                    </div>
                    <p className="text-xs font-medium">Alternating Rows</p>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:shadow-md">
                  <CardContent className="p-3">
                    <div className="space-y-1 mb-2">
                      <div className="w-full h-2 border-b-2 border-primary/30"></div>
                      <div className="w-full h-1 bg-muted rounded"></div>
                      <div className="w-full h-1 bg-muted rounded"></div>
                    </div>
                    <p className="text-xs font-medium">Minimal Lines</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-3 block">Header & Footer</Label>
              <div className="space-y-3">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h6 className="font-medium text-sm">Header Content</h6>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>Left: {`{{Company_Name}}`}</p>
                      <p>Center: {`{{Report_Title}}`}</p>
                      <p>Right: {`{{Page_Number}}`}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h6 className="font-medium text-sm">Footer Content</h6>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>Left: {`{{Date_Published}}`}</p>
                      <p>Center: Confidential</p>
                      <p>Right: Page {`{{Page_Number}}`} of {`{{Total_Pages}}`}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Template Management Tab */}
          <TabsContent value="templates" className="space-y-6">
            <div>
              <Label className="text-sm font-medium mb-3 block">Save Current Design</Label>
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="template-name" className="text-sm">Template Name</Label>
                      <Input 
                        id="template-name"
                        placeholder={`${reportSetup.title || 'Custom'} Template`}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="template-description" className="text-sm">Description (Optional)</Label>
                      <Textarea 
                        id="template-description"
                        placeholder="Describe when to use this template..."
                        className="mt-1"
                        rows={2}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSaveAsTemplate} className="flex-1">
                        <Download className="mr-2 h-4 w-4" />
                        Save as Company Template
                      </Button>
                      <Button variant="outline">
                        Export Design
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Label className="text-sm font-medium mb-3 block">Company Templates</Label>
              <div className="space-y-3">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h6 className="font-medium text-sm">Annual Report Template 2024</h6>
                        <p className="text-xs text-muted-foreground">Created on Dec 15, 2024</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Apply</Button>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h6 className="font-medium text-sm">Climate Report Template</h6>
                        <p className="text-xs text-muted-foreground">Created on Nov 28, 2024</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Apply</Button>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-3 block">Brand Kit Management</Label>
              <Card>
                <CardContent className="p-4">
                  <div className="text-center space-y-3">
                    <div className="text-2xl">🎨</div>
                    <h6 className="font-medium text-sm">Update Company Brand Kit</h6>
                    <p className="text-xs text-muted-foreground">
                      Sync your current design choices with the company's default brand kit
                    </p>
                    <Button variant="outline" size="sm">
                      Update Brand Kit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Design Preview
          </h4>
          <p className="text-sm text-muted-foreground mb-3">
            Your design choices will be applied during report generation. Use the live preview panel to see how your selections will look.
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Eye className="mr-2 h-3 w-3" />
              Preview Full Report
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-3 w-3" />
              Download Style Guide
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Enhanced Live Preview Panel Component that reflects actual design choices
function LivePreviewPanel({ reportSetup }: { reportSetup: ReportSetup }) {
  // Get the selected brand kit details
  const brandKits = [
    { 
      id: 'company-default', 
      name: 'Company Default', 
      primaryColor: '#1e40af',
      secondaryColor: '#3b82f6',
      accentColor: '#60a5fa',
      logo: '🏢'
    },
    { 
      id: 'professional-blue', 
      name: 'Professional Blue', 
      primaryColor: '#1e3a8a',
      secondaryColor: '#1d4ed8',
      accentColor: '#3b82f6',
      logo: '💼'
    },
    { 
      id: 'eco-green', 
      name: 'Eco Green', 
      primaryColor: '#166534',
      secondaryColor: '#22c55e',
      accentColor: '#86efac',
      logo: '🌱'
    },
    { 
      id: 'modern-tech', 
      name: 'Modern Tech', 
      primaryColor: '#7c3aed',
      secondaryColor: '#a855f7',
      accentColor: '#c084fc',
      logo: '⚡'
    }
  ]

  const selectedBrandKit = brandKits.find(kit => kit.id === reportSetup.brandKit) || brandKits[0]

  // Define cover layout styles based on selection
  const getCoverPreviewStyle = () => {
    const baseStyle = {
      background: `linear-gradient(135deg, ${selectedBrandKit.primaryColor}15, ${selectedBrandKit.secondaryColor}25)`,
      borderColor: selectedBrandKit.accentColor + '30'
    }

    switch (reportSetup.coverStyle) {
      case 'executive-classic':
        return {
          ...baseStyle,
          background: `linear-gradient(to bottom, #f8fafc, #e2e8f0)`,
          borderColor: selectedBrandKit.primaryColor + '30'
        }
      case 'modern-split':
        return {
          ...baseStyle,
          background: `linear-gradient(135deg, ${selectedBrandKit.primaryColor}20, ${selectedBrandKit.accentColor}30)`,
        }
      case 'minimalist-clean':
        return {
          ...baseStyle,
          background: '#ffffff',
          borderColor: '#e5e7eb'
        }
      case 'creative-bold':
        return {
          ...baseStyle,
          background: `linear-gradient(45deg, ${selectedBrandKit.secondaryColor}40, ${selectedBrandKit.accentColor}50)`,
        }
      default:
        return baseStyle
    }
  }

  const coverStyle = getCoverPreviewStyle()

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Eye className="h-4 w-4" />
            Live Preview
            <Badge variant="outline" className="text-xs">
              {selectedBrandKit.name}
            </Badge>
          </CardTitle>
          <CardDescription className="text-xs">
            Updates automatically as you make design changes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Dynamic Cover Preview */}
          <div 
            className="border rounded-lg p-6 min-h-[240px] flex flex-col justify-center transition-all duration-300"
            style={coverStyle}
          >
            {reportSetup.coverStyle === 'modern-split' ? (
              <div className="flex">
                <div className="flex-1 flex flex-col justify-center">
                  <div 
                    className="w-8 h-8 rounded mb-3"
                    style={{ backgroundColor: selectedBrandKit.primaryColor }}
                  />
                  <h3 className="font-bold text-lg mb-2" style={{ color: selectedBrandKit.primaryColor }}>
                    {reportSetup.title || "Report Title"}
                  </h3>
                  <p className="text-sm opacity-80">{reportSetup.reportingPeriod || "Reporting Period"}</p>
                  <p className="text-sm font-medium mt-2">Company Name</p>
                </div>
                <div 
                  className="w-12 rounded-r-lg"
                  style={{ backgroundColor: selectedBrandKit.accentColor + '40' }}
                />
              </div>
            ) : reportSetup.coverStyle === 'minimalist-clean' ? (
              <div className="flex flex-col justify-end items-start h-full">
                <h3 className="font-bold text-xl mb-2" style={{ color: selectedBrandKit.primaryColor }}>
                  {reportSetup.title || "Report Title"}
                </h3>
                <p className="text-sm text-gray-600 mb-6">{reportSetup.reportingPeriod || "Reporting Period"}</p>
                <div 
                  className="w-6 h-6 rounded"
                  style={{ backgroundColor: selectedBrandKit.primaryColor }}
                />
              </div>
            ) : reportSetup.coverStyle === 'creative-bold' ? (
              <div className="relative text-center">
                <div 
                  className="absolute top-0 left-0 w-12 h-12 rounded-full opacity-30"
                  style={{ backgroundColor: selectedBrandKit.accentColor }}
                />
                <div 
                  className="absolute top-4 right-4 w-8 h-8 rounded transform rotate-45 opacity-20"
                  style={{ backgroundColor: selectedBrandKit.secondaryColor }}
                />
                <h3 className="font-bold text-xl mb-2 relative z-10" style={{ color: selectedBrandKit.primaryColor }}>
                  {reportSetup.title || "Report Title"}
                </h3>
                <p className="text-sm opacity-80 relative z-10">{reportSetup.reportingPeriod || "Reporting Period"}</p>
                <p className="text-sm font-medium mt-2 relative z-10">Company Name</p>
              </div>
            ) : (
              // Executive Classic (default)
              <div className="text-center space-y-3">
                <div className="text-2xl">{selectedBrandKit.logo}</div>
                <h3 className="font-bold text-lg" style={{ color: selectedBrandKit.primaryColor }}>
                  {reportSetup.title || "Report Title"}
                </h3>
                <p className="text-sm opacity-80">{reportSetup.reportingPeriod || "Reporting Period"}</p>
                <p className="text-sm font-medium">Company Name</p>
                <div 
                  className="w-16 h-1 mx-auto rounded-full"
                  style={{ backgroundColor: selectedBrandKit.accentColor }}
                />
              </div>
            )}
          </div>

          {/* Typography Preview */}
          <div className="border rounded-lg p-4 bg-white">
            <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
              <Type className="h-4 w-4" />
              Typography Sample
            </h4>
            <div className="space-y-2">
              <h5 className="text-lg font-bold" style={{ color: selectedBrandKit.primaryColor }}>
                Section Heading
              </h5>
              <p className="text-sm text-gray-700 leading-relaxed">
                This is how body text will appear in your report. The typography choices 
                you make will affect readability and professional appearance.
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>Chart Label</span>
                <div 
                  className="w-8 h-2 rounded"
                  style={{ backgroundColor: selectedBrandKit.secondaryColor }}
                />
                <span>Data Point</span>
              </div>
            </div>
          </div>

          {/* Configuration Summary */}
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Current Configuration
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Method:</span>
                  <Badge variant="outline" className="text-xs capitalize">
                    {reportSetup.initiationMethod}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Audience:</span>
                  <span className="font-medium">{reportSetup.targetAudience || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cover Style:</span>
                  <span className="font-medium capitalize">{reportSetup.coverStyle?.replace('-', ' ') || 'Default'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Brand Kit:</span>
                  <span className="font-medium">{selectedBrandKit.name}</span>
                </div>
              </div>
            </div>
            
            {/* Color Palette Preview */}
            <div>
              <h4 className="font-medium text-sm mb-2">Color Palette</h4>
              <div className="flex gap-2">
                <div className="flex flex-col items-center">
                  <div 
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: selectedBrandKit.primaryColor }}
                  />
                  <span className="text-xs text-muted-foreground mt-1">Primary</span>
                </div>
                <div className="flex flex-col items-center">
                  <div 
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: selectedBrandKit.secondaryColor }}
                  />
                  <span className="text-xs text-muted-foreground mt-1">Secondary</span>
                </div>
                <div className="flex flex-col items-center">
                  <div 
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: selectedBrandKit.accentColor }}
                  />
                  <span className="text-xs text-muted-foreground mt-1">Accent</span>
                </div>
              </div>
            </div>

            {/* Framework & Topics Preview */}
            {reportSetup.selectedFrameworks.length > 0 && (
              <div>
                <h4 className="font-medium text-sm mb-2">Selected Frameworks</h4>
                <div className="flex flex-wrap gap-1">
                  {reportSetup.selectedFrameworks.slice(0, 3).map((framework) => (
                    <Badge key={framework} variant="secondary" className="text-xs">
                      {framework.toUpperCase()}
                    </Badge>
                  ))}
                  {reportSetup.selectedFrameworks.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{reportSetup.selectedFrameworks.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            )}
            
            {reportSetup.selectedTopics.length > 0 && (
              <div>
                <h4 className="font-medium text-sm mb-2">Selected Topics</h4>
                <div className="flex flex-wrap gap-1">
                  {reportSetup.selectedTopics.slice(0, 2).map((topic) => (
                    <Badge 
                      key={topic} 
                      variant="outline" 
                      className="text-xs"
                      style={{ 
                        borderColor: selectedBrandKit.accentColor + '60',
                        color: selectedBrandKit.primaryColor 
                      }}
                    >
                      {topic}
                    </Badge>
                  ))}
                  {reportSetup.selectedTopics.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{reportSetup.selectedTopics.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Download className="mr-1 h-3 w-3" />
              Export Preview
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Eye className="mr-1 h-3 w-3" />
              Full Preview
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Context Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Layers className="h-4 w-4" />
            Available Context
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h4 className="font-medium text-sm mb-2">Data Sources</h4>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>Energy Data</span>
                <Badge variant="outline" className="text-xs">95%</Badge>
              </div>
              <div className="flex justify-between">
                <span>HR Metrics</span>
                <Badge variant="outline" className="text-xs">87%</Badge>
              </div>
              <div className="flex justify-between">
                <span>Financial Data</span>
                <Badge variant="outline" className="text-xs">100%</Badge>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-sm mb-2">Recent Reports</h4>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>• 2023 Annual Report</p>
              <p>• Q3 Climate Assessment</p>
              <p>• DEI Progress Report</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-sm mb-2">AI Suggestions</h4>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>💡 Include water risk assessment</p>
              <p>💡 Add benchmark comparisons</p>
              <p>💡 Highlight progress on targets</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 