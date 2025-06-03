import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Wand2, 
  Bot, 
  ArrowRight, 
  FileText, 
  CheckCircle, 
  Clock,
  Lightbulb,
  Target,
  Shield,
  Download,
  Eye,
  Edit,
  Sparkles
} from "lucide-react"

interface DefaultAIWorkflowProps {
  onComplete: (reportData: any) => void
  onBack: () => void
}

interface ReportContext {
  availableData: string[]
  frameworks: string[]
  previousReports: string[]
  materialityResults?: string[]
  strategyElements?: string[]
}

export function DefaultAIWorkflow({ onComplete, onBack }: DefaultAIWorkflowProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [reportSetup, setReportSetup] = useState({
    title: "",
    reportType: "",
    audience: "",
    tone: "",
    length: "",
    customPrompt: "",
    focusAreas: [] as string[]
  })
  const [generatedContent, setGeneratedContent] = useState<any>(null)

  // Mock context data - in real implementation, this would come from other modules
  const reportContext: ReportContext = {
    availableData: [
      "Energy consumption metrics (12 months)",
      "GHG emissions data (Scope 1, 2, partial Scope 3)",
      "Water usage by facility",
      "Waste generation and recycling rates",
      "Employee diversity metrics",
      "Health & safety incident reports",
      "Supplier sustainability assessments"
    ],
    frameworks: ["ISSB S1/S2", "CSRD ESRS", "GRI Standards", "TCFD", "SASB"],
    previousReports: [
      "Q2 2024 Sustainability Report (CSRD)",
      "2023 Annual ESG Report (ISSB)",
      "DEI Progress Report Q2 (Custom)"
    ],
    materialityResults: [
      "Climate Change (High Priority)",
      "Energy Management (High Priority)", 
      "Employee Well-being (Monitor)",
      "Water Stewardship (Consider)"
    ],
    strategyElements: [
      "Net Zero by 2030 commitment",
      "DEI improvement initiatives",
      "Circular economy transition plan"
    ]
  }

  const reportTypes = [
    { id: "sustainability", name: "Sustainability Report", desc: "Comprehensive ESG performance report" },
    { id: "climate", name: "Climate Disclosure", desc: "Climate-focused risk and opportunity report" },
    { id: "dei", name: "DEI Progress Report", desc: "Diversity, equity and inclusion metrics" },
    { id: "custom", name: "Custom Report", desc: "Flexible report based on your prompt" }
  ]

  const audiences = [
    { id: "investors", name: "Investors", desc: "Financial stakeholders and analysts" },
    { id: "board", name: "Board of Directors", desc: "Corporate governance and oversight" },
    { id: "employees", name: "Employees", desc: "Internal workforce communication" },
    { id: "public", name: "Public/Customers", desc: "External transparency and marketing" }
  ]

  const tones = [
    { id: "formal", name: "Formal & Technical", desc: "Professional, detailed, compliance-focused" },
    { id: "accessible", name: "Accessible", desc: "Clear, easy to understand, engaging" },
    { id: "persuasive", name: "Persuasive", desc: "Compelling, story-driven, impact-focused" }
  ]

  const lengths = [
    { id: "executive", name: "Executive Summary", desc: "2-4 pages, key highlights only" },
    { id: "standard", name: "Standard Report", desc: "15-25 pages, comprehensive coverage" },
    { id: "detailed", name: "Detailed Report", desc: "30+ pages, extensive analysis and data" }
  ]

  const handleGenerate = async () => {
    setIsGenerating(true)
    setGenerationProgress(0)

    // Simulate AI generation process
    const steps = [
      "Analyzing available data sources...",
      "Processing materiality assessment results...",
      "Generating report structure...",
      "Creating executive summary...",
      "Developing main content sections...",
      "Adding charts and visualizations...",
      "Performing compliance validation...",
      "Finalizing report..."
    ]

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setGenerationProgress(((i + 1) / steps.length) * 100)
    }

    // Mock generated content
    const mockContent = {
      title: reportSetup.title,
      type: reportSetup.reportType,
      sections: [
        { title: "Executive Summary", wordCount: 450, status: "generated" },
        { title: "Company Overview", wordCount: 680, status: "generated" },
        { title: "Environmental Performance", wordCount: 1240, status: "generated" },
        { title: "Social Impact", wordCount: 920, status: "generated" },
        { title: "Governance Framework", wordCount: 760, status: "generated" },
        { title: "Risk Assessment", wordCount: 840, status: "generated" },
        { title: "Future Commitments", wordCount: 520, status: "generated" }
      ],
      totalWordCount: 5410,
      aiConfidence: 94,
      complianceScore: 91,
      generatedAt: new Date().toISOString()
    }

    setGeneratedContent(mockContent)
    setIsGenerating(false)
    setCurrentStep(3)
  }

  const handleRegenerate = (sectionTitle: string) => {
    // Logic to regenerate specific section
    console.log(`Regenerating section: ${sectionTitle}`)
  }

  const handleComplete = () => {
    onComplete({
      setup: reportSetup,
      content: generatedContent,
      workflow: 'default'
    })
  }

  if (currentStep === 1) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">AI-Powered Report Generation</h2>
            <p className="text-muted-foreground">Set up your report preferences and let AI do the heavy lifting</p>
          </div>
          <Button variant="outline" onClick={onBack}>
            Back to Workflow Selection
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Report Configuration</CardTitle>
                <CardDescription>Basic setup for your ESG report</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Report Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Q3 2024 Sustainability Report"
                    value={reportSetup.title}
                    onChange={(e) => setReportSetup(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Report Type</Label>
                    <Select value={reportSetup.reportType} onValueChange={(value) => setReportSetup(prev => ({ ...prev, reportType: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {reportTypes.map(type => (
                          <SelectItem key={type.id} value={type.id}>
                            <div>
                              <div className="font-medium">{type.name}</div>
                              <div className="text-xs text-muted-foreground">{type.desc}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Target Audience</Label>
                    <Select value={reportSetup.audience} onValueChange={(value) => setReportSetup(prev => ({ ...prev, audience: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select audience" />
                      </SelectTrigger>
                      <SelectContent>
                        {audiences.map(audience => (
                          <SelectItem key={audience.id} value={audience.id}>
                            <div>
                              <div className="font-medium">{audience.name}</div>
                              <div className="text-xs text-muted-foreground">{audience.desc}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Writing Tone</Label>
                    <Select value={reportSetup.tone} onValueChange={(value) => setReportSetup(prev => ({ ...prev, tone: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent>
                        {tones.map(tone => (
                          <SelectItem key={tone.id} value={tone.id}>
                            <div>
                              <div className="font-medium">{tone.name}</div>
                              <div className="text-xs text-muted-foreground">{tone.desc}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Report Length</Label>
                    <Select value={reportSetup.length} onValueChange={(value) => setReportSetup(prev => ({ ...prev, length: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select length" />
                      </SelectTrigger>
                      <SelectContent>
                        {lengths.map(length => (
                          <SelectItem key={length.id} value={length.id}>
                            <div>
                              <div className="font-medium">{length.name}</div>
                              <div className="text-xs text-muted-foreground">{length.desc}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prompt">Additional Instructions (Optional)</Label>
                  <Textarea
                    id="prompt"
                    placeholder="e.g., Focus on climate risks, highlight recent achievements, include regional breakdown..."
                    value={reportSetup.customPrompt}
                    onChange={(e) => setReportSetup(prev => ({ ...prev, customPrompt: e.target.value }))}
                    className="min-h-[100px]"
                  />
                </div>

                <Button 
                  onClick={() => setCurrentStep(2)} 
                  className="w-full"
                  disabled={!reportSetup.title || !reportSetup.reportType}
                >
                  Review Context & Generate <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Available Context
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="text-xs font-medium mb-2 text-muted-foreground">DATA SOURCES</h4>
                  <div className="space-y-1">
                    {reportContext.availableData.slice(0, 3).map((data, idx) => (
                      <div key={idx} className="text-xs flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span>{data}</span>
                      </div>
                    ))}
                    {reportContext.availableData.length > 3 && (
                      <div className="text-xs text-muted-foreground">
                        +{reportContext.availableData.length - 3} more sources
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-medium mb-2 text-muted-foreground">MATERIALITY RESULTS</h4>
                  <div className="space-y-1">
                    {reportContext.materialityResults?.map((result, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {result.split(' (')[0]}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  AI Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs text-muted-foreground">
                <p>• Be specific in your additional instructions for better results</p>
                <p>• The AI will automatically include relevant data from your connected sources</p>
                <p>• You can regenerate any section after initial generation</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (currentStep === 2) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Review & Generate</h2>
            <p className="text-muted-foreground">Confirm your settings and start AI generation</p>
          </div>
          <Button variant="outline" onClick={() => setCurrentStep(1)}>
            Back to Setup
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Generation Preview</CardTitle>
                <CardDescription>Your report will be generated with these settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Title:</span>
                    <p className="text-muted-foreground">{reportSetup.title}</p>
                  </div>
                  <div>
                    <span className="font-medium">Type:</span>
                    <p className="text-muted-foreground capitalize">{reportSetup.reportType?.replace('-', ' ')}</p>
                  </div>
                  <div>
                    <span className="font-medium">Audience:</span>
                    <p className="text-muted-foreground capitalize">{reportSetup.audience}</p>
                  </div>
                  <div>
                    <span className="font-medium">Length:</span>
                    <p className="text-muted-foreground capitalize">{reportSetup.length?.replace('-', ' ')}</p>
                  </div>
                </div>

                {reportSetup.customPrompt && (
                  <div>
                    <span className="font-medium text-sm">Additional Instructions:</span>
                    <p className="text-sm text-muted-foreground bg-gray-50 p-3 rounded-lg mt-1">
                      {reportSetup.customPrompt}
                    </p>
                  </div>
                )}

                {isGenerating ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Bot className="h-5 w-5 text-blue-600 animate-pulse" />
                      <span className="font-medium">Generating your report...</span>
                    </div>
                    <Progress value={generationProgress} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                      This may take a few minutes. AI is analyzing your data and creating comprehensive content.
                    </p>
                  </div>
                ) : (
                  <Button onClick={handleGenerate} className="w-full">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Report with AI
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">What AI Will Include</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-medium">Data Analysis</div>
                    <div className="text-muted-foreground">Insights from your connected data sources</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-medium">Compliance Checking</div>
                    <div className="text-muted-foreground">Automatic validation against ESG frameworks</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-medium">Visualizations</div>
                    <div className="text-muted-foreground">Charts and graphs based on your data</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-medium">Best Practices</div>
                    <div className="text-muted-foreground">Industry standards and recommendations</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (currentStep === 3 && generatedContent) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Report Generated Successfully!</h2>
            <p className="text-muted-foreground">Review your AI-generated report and make any adjustments</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Button onClick={handleComplete}>
              <Edit className="mr-2 h-4 w-4" />
              Open in Studio
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{generatedContent.title}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{generatedContent.totalWordCount.toLocaleString()} words</span>
                  <span>•</span>
                  <span>AI Confidence: {generatedContent.aiConfidence}%</span>
                  <span>•</span>
                  <span>Compliance Score: {generatedContent.complianceScore}%</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {generatedContent.sections.map((section: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{section.title}</div>
                        <div className="text-sm text-muted-foreground">{section.wordCount} words</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-green-700 bg-green-50">
                          {section.status}
                        </Badge>
                        <Button size="sm" variant="ghost" onClick={() => handleRegenerate(section.title)}>
                          <Wand2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Quality Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">AI Confidence</span>
                  <div className="flex items-center gap-2">
                    <Progress value={generatedContent.aiConfidence} className="w-16 h-2" />
                    <span className="text-sm font-medium">{generatedContent.aiConfidence}%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Compliance Score</span>
                  <div className="flex items-center gap-2">
                    <Progress value={generatedContent.complianceScore} className="w-16 h-2" />
                    <span className="text-sm font-medium">{generatedContent.complianceScore}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Next Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>✓ Content generated successfully</p>
                <p>• Review sections in the Studio</p>
                <p>• Add custom content if needed</p>
                <p>• Export or publish when ready</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return null
} 