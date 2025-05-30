"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, ArrowRight, Wand2, FileText, Copy, Bot, Settings, Upload, Palette, Download, Search } from "lucide-react"
import Link from "next/link"

interface ReportTemplate {
  id: string
  name: string
  description: string
  framework: string
  type: string
  thumbnail?: string
}

interface ReportSetup {
  title: string
  reportingPeriod: string
  targetAudience: string
  initiationMethod: 'template' | 'ai-prompt' | 'hybrid' | 'clone'
  selectedTemplate?: string
  customPrompt?: string
  cloneFromReport?: string
}

export default function NewReportPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [reportSetup, setReportSetup] = useState<ReportSetup>({
    title: "",
    reportingPeriod: "",
    targetAudience: "",
    initiationMethod: 'template'
  })

  // Sample templates data
  const templates: ReportTemplate[] = [
    {
      id: "issb-s1-s2",
      name: "ISSB S1/S2 Sustainability Report",
      description: "Comprehensive sustainability report following ISSB Standards S1 (General Requirements) and S2 (Climate-related Disclosures)",
      framework: "ISSB",
      type: "annual"
    },
    {
      id: "csrd-esrs",
      name: "CSRD ESRS Report (Full)",
      description: "Complete Corporate Sustainability Reporting Directive report with all European Sustainability Reporting Standards",
      framework: "CSRD",
      type: "annual"
    },
    {
      id: "gri-universal",
      name: "GRI Universal Standards Report",
      description: "Sustainability report based on GRI Universal Standards with topic-specific standards",
      framework: "GRI",
      type: "annual"
    },
    {
      id: "tcfd-report",
      name: "TCFD Climate Risk Report",
      description: "Task Force on Climate-related Financial Disclosures comprehensive report",
      framework: "TCFD",
      type: "climate"
    },
    {
      id: "ngx-guidelines",
      name: "NGX Sustainability Guidelines Report",
      description: "Nigerian Exchange Group sustainability reporting guidelines compliance report",
      framework: "NGX",
      type: "annual"
    },
    {
      id: "custom-company",
      name: "Custom Company Template",
      description: "Your organization's custom report template with pre-defined structure and branding",
      framework: "Custom",
      type: "custom"
    }
  ]

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    } else {
      // Start drafting report
      router.push('/reporting/studio?new=true')
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      router.push('/reporting')
    }
  }

  const updateReportSetup = (updates: Partial<ReportSetup>) => {
    setReportSetup(prev => ({ ...prev, ...updates }))
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <ReportSetupStep reportSetup={reportSetup} updateReportSetup={updateReportSetup} />
      case 2:
        return <InitiationMethodStep reportSetup={reportSetup} updateReportSetup={updateReportSetup} templates={templates} />
      case 3:
        return <ParameterConfigurationStep reportSetup={reportSetup} updateReportSetup={updateReportSetup} />
      case 4:
        return <VisualDesignStep reportSetup={reportSetup} updateReportSetup={updateReportSetup} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" asChild>
              <Link href="/reporting">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-xl font-bold">Create New Report</h1>
              <p className="text-sm text-muted-foreground">Step {currentStep} of 4 - Configure your ESG report</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button onClick={handleNext}>
              {currentStep === 4 ? "Start Drafting Report" : "Next"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="border-b bg-muted/40 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step === currentStep ? 'bg-primary text-primary-foreground' :
                  step < currentStep ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                }`}>
                  {step}
                </div>
                <span className={`text-sm ${
                  step === currentStep ? 'text-foreground font-medium' : 
                  step < currentStep ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  {step === 1 && "Setup"}
                  {step === 2 && "Method"}
                  {step === 3 && "Parameters"}
                  {step === 4 && "Design"}
                </span>
                {step < 4 && (
                  <div className={`w-8 h-px ${step < currentStep ? 'bg-primary' : 'bg-muted'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {renderStepContent()}
      </div>
    </div>
  )
}

// Step 1: Report Setup
function ReportSetupStep({ reportSetup, updateReportSetup }: {
  reportSetup: ReportSetup
  updateReportSetup: (updates: Partial<ReportSetup>) => void
}) {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Report Setup</CardTitle>
        <CardDescription>
          Configure the basic details for your ESG report
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Report Title</Label>
          <Input
            id="title"
            placeholder="e.g., Q4 2024 Sustainability Report"
            value={reportSetup.title}
            onChange={(e) => updateReportSetup({ title: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="period">Reporting Period</Label>
          <Select value={reportSetup.reportingPeriod} onValueChange={(value) => updateReportSetup({ reportingPeriod: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select reporting period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="q1-2024">Q1 2024</SelectItem>
              <SelectItem value="q2-2024">Q2 2024</SelectItem>
              <SelectItem value="q3-2024">Q3 2024</SelectItem>
              <SelectItem value="q4-2024">Q4 2024</SelectItem>
              <SelectItem value="fy-2024">FY 2024</SelectItem>
              <SelectItem value="fy-2023">FY 2023</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="audience">Target Audience (Optional)</Label>
          <Select value={reportSetup.targetAudience} onValueChange={(value) => updateReportSetup({ targetAudience: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select target audience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="investors">Investors</SelectItem>
              <SelectItem value="regulators">Regulators</SelectItem>
              <SelectItem value="employees">Employees</SelectItem>
              <SelectItem value="customers">Customers</SelectItem>
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="board">Board of Directors</SelectItem>
              <SelectItem value="internal">Internal Management</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}

// Step 2: Initiation Method Selection
function InitiationMethodStep({ reportSetup, updateReportSetup, templates }: {
  reportSetup: ReportSetup
  updateReportSetup: (updates: Partial<ReportSetup>) => void
  templates: ReportTemplate[]
}) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Choose Report Creation Method</h2>
        <p className="text-muted-foreground mt-2">
          Select how you'd like to create your report. You can customize design and content in later steps.
        </p>
      </div>

      <RadioGroup
        value={reportSetup.initiationMethod}
        onValueChange={(value) => updateReportSetup({ initiationMethod: value as ReportSetup['initiationMethod'] })}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Template Method */}
        <Card className={`cursor-pointer transition-all ${reportSetup.initiationMethod === 'template' ? 'ring-2 ring-primary' : ''}`}>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="template" id="template" />
              <FileText className="h-5 w-5" />
              <Label htmlFor="template" className="font-semibold cursor-pointer">Template + Parameters + Design</Label>
            </div>
            <CardDescription>
              Start with a pre-built template and customize using parameters and visual design tools
            </CardDescription>
          </CardHeader>
          {reportSetup.initiationMethod === 'template' && (
            <CardContent>
              <div className="space-y-3">
                <Label>Select Template</Label>
                <ScrollArea className="h-40">
                  <div className="space-y-2">
                    {templates.map((template) => (
                      <div
                        key={template.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          reportSetup.selectedTemplate === template.id ? 'bg-primary/10 border-primary' : 'hover:bg-muted'
                        }`}
                        onClick={() => updateReportSetup({ selectedTemplate: template.id })}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-sm">{template.name}</div>
                            <div className="text-xs text-muted-foreground mt-1">{template.description}</div>
                          </div>
                          <Badge variant="outline">{template.framework}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </CardContent>
          )}
        </Card>

        {/* AI Prompt Method */}
        <Card className={`cursor-pointer transition-all ${reportSetup.initiationMethod === 'ai-prompt' ? 'ring-2 ring-primary' : ''}`}>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ai-prompt" id="ai-prompt" />
              <Bot className="h-5 w-5" />
              <Label htmlFor="ai-prompt" className="font-semibold cursor-pointer">Custom AI Prompt</Label>
            </div>
            <CardDescription>
              Describe your report requirements in natural language and let AI create the structure
            </CardDescription>
          </CardHeader>
          {reportSetup.initiationMethod === 'ai-prompt' && (
            <CardContent>
              <div className="space-y-3">
                <Label htmlFor="prompt">Describe Your Report</Label>
                <Textarea
                  id="prompt"
                  placeholder="e.g., Generate a sustainability report for a Kenyan agribusiness focusing on water stewardship and community engagement for the fiscal year 2023, targeting institutional investors..."
                  value={reportSetup.customPrompt || ''}
                  onChange={(e) => updateReportSetup({ customPrompt: e.target.value })}
                  rows={4}
                />
              </div>
            </CardContent>
          )}
        </Card>

        {/* Hybrid Method */}
        <Card className={`cursor-pointer transition-all ${reportSetup.initiationMethod === 'hybrid' ? 'ring-2 ring-primary' : ''}`}>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="hybrid" id="hybrid" />
              <Wand2 className="h-5 w-5" />
              <Label htmlFor="hybrid" className="font-semibold cursor-pointer">Hybrid Approach</Label>
            </div>
            <CardDescription>
              Combine parameter selection with custom AI prompts for nuanced control
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Clone Method */}
        <Card className={`cursor-pointer transition-all ${reportSetup.initiationMethod === 'clone' ? 'ring-2 ring-primary' : ''}`}>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="clone" id="clone" />
              <Copy className="h-5 w-5" />
              <Label htmlFor="clone" className="font-semibold cursor-pointer">From Existing Report</Label>
            </div>
            <CardDescription>
              Clone structure, design, and parameters from a previous report for a new period
            </CardDescription>
          </CardHeader>
          {reportSetup.initiationMethod === 'clone' && (
            <CardContent>
              <div className="space-y-3">
                <Label>Select Report to Clone</Label>
                <Select value={reportSetup.cloneFromReport} onValueChange={(value) => updateReportSetup({ cloneFromReport: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose existing report" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="q3-2024-report">Q3 2024 Sustainability Report</SelectItem>
                    <SelectItem value="annual-2023-report">Annual 2023 ESG Report</SelectItem>
                    <SelectItem value="climate-risk-2024">Climate Risk Assessment 2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          )}
        </Card>
      </RadioGroup>
    </div>
  )
}

// Step 3: Parameter Configuration (Simplified for now)
function ParameterConfigurationStep({ reportSetup, updateReportSetup }: {
  reportSetup: ReportSetup
  updateReportSetup: (updates: Partial<ReportSetup>) => void
}) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Parameter Configuration</h2>
        <p className="text-muted-foreground mt-2">
          Define the scope and content focus for your report
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Content Parameters
          </CardTitle>
          <CardDescription>
            These parameters will guide AI generation and ensure comprehensive coverage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Parameter Selection Menu will be implemented here</p>
            <p className="text-sm mt-2">This will include ESG topics, compliance frameworks, regions, and timeframes</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Step 4: Visual Design (Simplified for now)
function VisualDesignStep({ reportSetup, updateReportSetup }: {
  reportSetup: ReportSetup
  updateReportSetup: (updates: Partial<ReportSetup>) => void
}) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Visual Design</h2>
        <p className="text-muted-foreground mt-2">
          Customize the visual appearance and branding of your report
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Design Studio
          </CardTitle>
          <CardDescription>
            Apply professional themes and customize branding elements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            <Palette className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Visual Design Studio will be implemented here</p>
            <p className="text-sm mt-2">This will include brand kits, themes, cover page design, and style customization</p>
          </div>
        </CardContent>
      </Card>

      {/* Live Preview Area */}
      <Card>
        <CardHeader>
          <CardTitle>Live Preview</CardTitle>
          <CardDescription>
            Preview your report design and layout in real-time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Report preview will appear here</p>
              <p className="text-sm mt-2">Cover page and style previews based on your selections</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 