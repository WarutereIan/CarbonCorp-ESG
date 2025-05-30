"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  ArrowLeft, 
  ArrowRight, 
  FileText, 
  Brain, 
  Lightbulb, 
  Target,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Download,
  Upload,
  Edit3,
  Zap,
  Globe,
  Users,
  Factory,
  Leaf,
  Shield,
  TrendingUp,
  RefreshCw,
  Save,
  Share,
  ExternalLink,
  Database,
  Calendar,
  Tag,
  Settings
} from "lucide-react"

// Report types and configurations
const reportTypes = [
  { id: "full-esg", name: "Full ESG Report", description: "Comprehensive ESG report covering all aspects" },
  { id: "climate-risk", name: "Climate Risk Report", description: "TCFD-aligned climate risk disclosure" },
  { id: "dei-progress", name: "DEI Progress Update", description: "Diversity, equity & inclusion report" },
  { id: "environmental", name: "Environmental Report", description: "Environmental performance report" },
  { id: "social-impact", name: "Social Impact Report", description: "Community and employee impact" },
  { id: "governance", name: "Governance Report", description: "Corporate governance disclosures" },
  { id: "section-draft", name: "Section Draft", description: "Draft specific sections for larger reports" },
  { id: "sustainability", name: "Sustainability Report", description: "General sustainability performance" }
]

const targetAudiences = [
  { id: "investors", name: "Investors", description: "Shareholders and financial stakeholders" },
  { id: "board", name: "Board of Directors", description: "Board members and executives" },
  { id: "employees", name: "Employees", description: "Internal workforce and staff" },
  { id: "customers", name: "Customers", description: "Clients and end consumers" },
  { id: "regulators", name: "Regulators", description: "Government agencies and compliance bodies" },
  { id: "public", name: "General Public", description: "Public stakeholders and communities" },
  { id: "suppliers", name: "Suppliers", description: "Supply chain partners" },
  { id: "ngos", name: "NGOs", description: "Non-governmental organizations" }
]

const toneOptions = [
  { id: "formal", name: "Formal", description: "Professional and official tone" },
  { id: "technical", name: "Technical", description: "Data-driven and analytical" },
  { id: "accessible", name: "Accessible", description: "Easy to understand for general audiences" },
  { id: "persuasive", name: "Persuasive", description: "Compelling and engaging" },
  { id: "optimistic", name: "Optimistic", description: "Positive and forward-looking" },
  { id: "cautious", name: "Cautious", description: "Conservative and measured" }
]

const lengthOptions = [
  { id: "paragraph", name: "Short Paragraph", description: "1-2 paragraphs" },
  { id: "summary", name: "Executive Summary", description: "1-2 pages" },
  { id: "section", name: "Section", description: "3-5 pages" },
  { id: "chapter", name: "Detailed Chapter", description: "10-15 pages" },
  { id: "full-report", name: "Full Report", description: "20+ pages" }
]

const focusAreaTags = [
  "Innovation", "Risk Mitigation", "Community Impact", "Financial Performance",
  "Environmental Stewardship", "Employee Wellbeing", "Supply Chain", "Governance",
  "Climate Change", "Water Management", "Waste Reduction", "Energy Efficiency",
  "Human Rights", "Diversity & Inclusion", "Health & Safety", "Data Privacy"
]

// Mock data for context (in real implementation, this would come from API)
const mockDataSources = [
  { id: "emissions", name: "GHG Emissions Data", type: "Environmental", completeness: 95 },
  { id: "energy", name: "Energy Consumption", type: "Environmental", completeness: 88 },
  { id: "water", name: "Water Usage", type: "Environmental", completeness: 72 },
  { id: "diversity", name: "Workforce Diversity", type: "Social", completeness: 90 },
  { id: "safety", name: "Health & Safety", type: "Social", completeness: 85 },
  { id: "governance", name: "Board Composition", type: "Governance", completeness: 100 }
]

const mockRegulations = [
  { id: "csrd", name: "CSRD ESRS", relevance: "High" },
  { id: "issb", name: "ISSB S1/S2", relevance: "High" },
  { id: "tcfd", name: "TCFD", relevance: "Medium" },
  { id: "gri", name: "GRI Standards", relevance: "Medium" }
]

const mockMaterialTopics = [
  { id: "ghg-emissions", name: "GHG Emissions", priority: "High" },
  { id: "energy-management", name: "Energy Management", priority: "High" },
  { id: "employee-safety", name: "Employee Safety", priority: "Medium" },
  { id: "diversity", name: "Diversity & Inclusion", priority: "Medium" }
]

export default function GenAIReportingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [generatingDraft, setGeneratingDraft] = useState(false)
  const [generatedContent, setGeneratedContent] = useState("")
  const [reportConfig, setReportConfig] = useState({
    reportType: "",
    targetAudience: "",
    tone: "",
    length: "",
    focusAreas: [] as string[],
    customPrompt: "",
    selectedSection: "",
    parameters: {
      dataFilters: {
        region: "",
        timeframe: "",
        facilities: [] as string[]
      },
      frameworks: [] as string[],
      topics: [] as string[]
    }
  })

  const handleFocusAreaToggle = (tag: string) => {
    setReportConfig(prev => ({
      ...prev,
      focusAreas: prev.focusAreas.includes(tag)
        ? prev.focusAreas.filter(t => t !== tag)
        : [...prev.focusAreas, tag]
    }))
  }

  const handleGenerateDraft = async () => {
    setGeneratingDraft(true)
    
    // Simulate AI generation (in real implementation, this would call GPT API)
    setTimeout(() => {
      const mockContent = generateMockContent()
      setGeneratedContent(mockContent)
      setGeneratingDraft(false)
      setCurrentStep(3)
    }, 3000)
  }

  const generateMockContent = () => {
    const reportTypeText = reportTypes.find(rt => rt.id === reportConfig.reportType)?.name || "ESG Report"
    const audienceText = targetAudiences.find(ta => ta.id === reportConfig.targetAudience)?.name || "stakeholders"
    
    return `# ${reportTypeText}

## Executive Summary

This ${reportTypeText.toLowerCase()} provides a comprehensive overview of our environmental, social, and governance (ESG) performance for the reporting period. Our organization continues to demonstrate strong commitment to sustainable business practices and stakeholder value creation.

### Key Highlights

- **Environmental Performance**: Achieved a 15% reduction in Scope 1 and 2 GHG emissions compared to the previous year, exceeding our target of 12%.
- **Social Impact**: Maintained industry-leading diversity metrics with 45% female representation in leadership positions.
- **Governance Excellence**: Implemented enhanced board oversight mechanisms and strengthened our risk management framework.

## Environmental Stewardship

### Climate Action and GHG Emissions

Our organization has made significant progress in reducing our carbon footprint. During the reporting period, we achieved:

- Total Scope 1 emissions: 12,450 tCO2e (down 18% from previous year)
- Total Scope 2 emissions: 8,320 tCO2e (down 12% from previous year)  
- Scope 3 emissions assessment completed for 85% of relevant categories

This performance was driven by strategic investments in renewable energy, facility efficiency improvements, and enhanced operational practices across our facilities.

### Energy Management

Energy efficiency remains a core focus area, with initiatives including:
- LED lighting upgrades across 75% of facilities
- Implementation of smart building management systems
- Renewable energy procurement accounting for 35% of total consumption

## Social Responsibility

### Workforce Development and Diversity

Our commitment to creating an inclusive workplace is reflected in our diversity metrics:
- Overall workforce diversity: 52% female, 48% male
- Leadership diversity: 45% female representation in senior roles
- Ethnic diversity: 35% representation from underrepresented groups

### Health and Safety

Employee safety remains our top priority, with achievements including:
- Lost Time Injury Frequency Rate (LTIFR): 0.8 per million hours worked
- Zero fatal incidents across all operations
- 95% completion rate for mandatory safety training

## Governance and Ethics

### Board Composition and Oversight

Our governance framework includes:
- Independent board chair with 7 of 9 directors being independent
- Regular board evaluation and refreshment processes
- Enhanced ESG oversight through dedicated sustainability committee

### Risk Management

Comprehensive risk management approach addressing:
- Climate-related financial risks per TCFD recommendations
- Supply chain resilience and human rights due diligence
- Cybersecurity and data protection measures

## Forward-Looking Commitments

Looking ahead, we remain committed to:
- Achieving net-zero emissions by 2050
- Maintaining industry-leading safety performance
- Advancing diversity and inclusion across all levels of the organization

---

*This content has been generated using AI assistance and should be reviewed for accuracy and completeness.*`
  }

  const handleRegenerateSection = (sectionTitle: string) => {
    setGeneratingDraft(true)
    // Simulate regeneration
    setTimeout(() => {
      setGeneratingDraft(false)
      // In real implementation, would regenerate specific section
    }, 2000)
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return reportConfig.reportType && reportConfig.targetAudience
      case 2:
        return reportConfig.tone && reportConfig.length
      default:
        return true
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => router.push("/ai-engine")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to AI Engine
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Gen AI Reporting Assistant</h1>
            <p className="text-muted-foreground">
              Create AI-powered ESG report drafts using advanced prompts and contextual data
            </p>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span>{currentStep}/3 steps</span>
        </div>
        <Progress value={(currentStep / 3) * 100} className="h-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Configure</span>
          <span>Generate</span>
          <span>Review</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Step 1: Advanced Prompt Builder */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Advanced Prompt Builder</span>
                </CardTitle>
                <CardDescription>
                  Configure your report requirements and AI generation parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Report Type Selection */}
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-medium">Report Type *</Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      Choose the type of report you want to generate
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {reportTypes.map((type) => (
                      <Card 
                        key={type.id}
                        className={`cursor-pointer transition-all ${
                          reportConfig.reportType === type.id 
                            ? "border-blue-500 bg-blue-50" 
                            : "hover:border-gray-300"
                        }`}
                        onClick={() => setReportConfig({...reportConfig, reportType: type.id})}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{type.name}</h4>
                              <p className="text-xs text-muted-foreground mt-1">{type.description}</p>
                            </div>
                            <Checkbox
                              checked={reportConfig.reportType === type.id}
                              onChange={() => {}} // Handled by card click
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Target Audience Selection */}
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-medium">Target Audience *</Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      Select the primary audience for this report
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {targetAudiences.map((audience) => (
                      <Card 
                        key={audience.id}
                        className={`cursor-pointer transition-all ${
                          reportConfig.targetAudience === audience.id 
                            ? "border-blue-500 bg-blue-50" 
                            : "hover:border-gray-300"
                        }`}
                        onClick={() => setReportConfig({...reportConfig, targetAudience: audience.id})}
                      >
                        <CardContent className="p-3">
                          <div className="text-center">
                            <h4 className="font-medium text-sm">{audience.name}</h4>
                            <p className="text-xs text-muted-foreground mt-1">{audience.description}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Section Selection (for section draft) */}
                {reportConfig.reportType === "section-draft" && (
                  <>
                    <Separator />
                    <div className="space-y-3">
                      <Label htmlFor="section">Section to Draft</Label>
                      <Input
                        id="section"
                        placeholder="e.g., 'Climate Strategy' section for CSRD report"
                        value={reportConfig.selectedSection}
                        onChange={(e) => setReportConfig({
                          ...reportConfig, 
                          selectedSection: e.target.value
                        })}
                      />
                    </div>
                  </>
                )}

                <div className="flex justify-end">
                  <Button onClick={() => setCurrentStep(2)} disabled={!canProceed()}>
                    Configure Style & Parameters
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Style & Parameter Configuration */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Edit3 className="h-5 w-5" />
                  <span>Style & Parameter Configuration</span>
                </CardTitle>
                <CardDescription>
                  Fine-tune the tone, length, and data parameters for your report
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Tone Selection */}
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-medium">Tone *</Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      Choose the writing style and tone
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {toneOptions.map((tone) => (
                      <Card 
                        key={tone.id}
                        className={`cursor-pointer transition-all ${
                          reportConfig.tone === tone.id 
                            ? "border-blue-500 bg-blue-50" 
                            : "hover:border-gray-300"
                        }`}
                        onClick={() => setReportConfig({...reportConfig, tone: tone.id})}
                      >
                        <CardContent className="p-3">
                          <div className="text-center">
                            <h4 className="font-medium text-sm">{tone.name}</h4>
                            <p className="text-xs text-muted-foreground mt-1">{tone.description}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Length Selection */}
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-medium">Length *</Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      Select the desired length of the generated content
                    </p>
                  </div>
                  
                  <Select 
                    value={reportConfig.length} 
                    onValueChange={(value) => setReportConfig({...reportConfig, length: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select content length" />
                    </SelectTrigger>
                    <SelectContent>
                      {lengthOptions.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          <div>
                            <div className="font-medium">{option.name}</div>
                            <div className="text-xs text-muted-foreground">{option.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Focus Area Tags */}
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-medium">Focus Areas (Optional)</Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      Select specific areas to emphasize in the report
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {focusAreaTags.map((tag) => (
                      <Badge 
                        key={tag}
                        variant={reportConfig.focusAreas.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleFocusAreaToggle(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  {reportConfig.focusAreas.length > 0 && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-800 mb-1">Selected Focus Areas:</p>
                      <div className="flex flex-wrap gap-1">
                        {reportConfig.focusAreas.map((area) => (
                          <Badge key={area} variant="outline" className="text-xs">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Custom Prompt */}
                <div className="space-y-3">
                  <Label htmlFor="custom-prompt">Additional Instructions (Optional)</Label>
                  <Textarea
                    id="custom-prompt"
                    placeholder="Provide any specific instructions or requirements for the AI generation..."
                    value={reportConfig.customPrompt}
                    onChange={(e) => setReportConfig({
                      ...reportConfig, 
                      customPrompt: e.target.value
                    })}
                    rows={4}
                  />
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button onClick={handleGenerateDraft} disabled={!canProceed()}>
                    Generate Draft
                    <Zap className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Review Interface */}
          {currentStep === 3 && (
            <div className="space-y-6">
              {/* Generation Progress */}
              {generatingDraft && (
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <Brain className="h-8 w-8 text-blue-600 animate-pulse" />
                      <div className="flex-1">
                        <h3 className="font-medium">Generating AI Draft...</h3>
                        <p className="text-sm text-muted-foreground">
                          Processing your requirements and analyzing available data sources
                        </p>
                        <Progress value={75} className="mt-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Generated Content Review */}
              {!generatingDraft && generatedContent && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <FileText className="h-5 w-5" />
                        <span>AI-Generated Draft</span>
                      </CardTitle>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleRegenerateSection("full")}>
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Regenerate
                        </Button>
                        <Button variant="outline" size="sm">
                          <Save className="h-4 w-4 mr-2" />
                          Save Draft
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* AI Generation Summary */}
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium text-green-800">Draft Generated Successfully</span>
                        </div>
                        <p className="text-sm text-green-700">
                          Generated {reportConfig.length} {reportTypes.find(rt => rt.id === reportConfig.reportType)?.name} 
                          for {targetAudiences.find(ta => ta.id === reportConfig.targetAudience)?.name} 
                          in {toneOptions.find(to => to.id === reportConfig.tone)?.name.toLowerCase()} tone.
                        </p>
                      </div>

                      {/* Content Display with Basic Review Tools */}
                      <div className="border rounded-lg p-6 bg-white">
                        <div className="prose max-w-none">
                          <div className="whitespace-pre-wrap font-mono text-sm">
                            {generatedContent}
                          </div>
                        </div>
                      </div>

                      {/* Review Actions */}
                      <div className="flex justify-between">
                        <Button variant="outline" onClick={() => setCurrentStep(2)}>
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Back to Configuration
                        </Button>
                        <div className="flex space-x-3">
                          <Button variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Export Draft
                          </Button>
                          <Button>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Export to Reporting Studio
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>

        {/* Context Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>Context & Data Sources</span>
              </CardTitle>
              <CardDescription>
                Available data and context to inform AI generation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* Available Data Sources */}
              <div>
                <h4 className="font-medium text-sm mb-3">Data Sources</h4>
                <div className="space-y-2">
                  {mockDataSources.map((source) => (
                    <div key={source.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{source.name}</p>
                        <p className="text-xs text-muted-foreground">{source.type}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-medium">{source.completeness}%</div>
                        <div className="text-xs text-muted-foreground">Complete</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Regulatory Requirements */}
              <div>
                <h4 className="font-medium text-sm mb-3">Relevant Regulations</h4>
                <div className="space-y-2">
                  {mockRegulations.map((reg) => (
                    <div key={reg.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">{reg.name}</span>
                      <Badge 
                        variant={reg.relevance === "High" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {reg.relevance}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Material Topics */}
              <div>
                <h4 className="font-medium text-sm mb-3">Material Topics</h4>
                <div className="space-y-2">
                  {mockMaterialTopics.map((topic) => (
                    <div key={topic.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">{topic.name}</span>
                      <Badge 
                        variant={topic.priority === "High" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {topic.priority}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Quick Stats */}
              <div>
                <h4 className="font-medium text-sm mb-3">Quick Stats</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-center p-2 bg-blue-50 rounded">
                    <div className="text-lg font-bold text-blue-600">12</div>
                    <div className="text-xs text-blue-700">Data Sources</div>
                  </div>
                  <div className="text-center p-2 bg-green-50 rounded">
                    <div className="text-lg font-bold text-green-600">87%</div>
                    <div className="text-xs text-green-700">Data Quality</div>
                  </div>
                  <div className="text-center p-2 bg-purple-50 rounded">
                    <div className="text-lg font-bold text-purple-600">8</div>
                    <div className="text-xs text-purple-700">Material Topics</div>
                  </div>
                  <div className="text-center p-2 bg-orange-50 rounded">
                    <div className="text-lg font-bold text-orange-600">4</div>
                    <div className="text-xs text-orange-700">Frameworks</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Assistant Help */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="h-5 w-5" />
                <span>AI Suggestions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <h5 className="text-sm font-medium text-blue-800 mb-1">Pro Tip</h5>
                <p className="text-xs text-blue-700">
                  For climate reports, focus on TCFD recommendations and include scenario analysis from your Risk Predictor.
                </p>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <h5 className="text-sm font-medium text-green-800 mb-1">Data Quality</h5>
                <p className="text-xs text-green-700">
                  Your GHG emissions data has high completeness (95%) - perfect for detailed climate disclosures.
                </p>
              </div>
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <h5 className="text-sm font-medium text-purple-800 mb-1">Recommendation</h5>
                <p className="text-xs text-purple-700">
                  Consider including your recent diversity initiatives in social impact sections.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 