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
import { Bot, FileText, Wand2, CheckCircle, Clock, AlertCircle, Eye, Download, Sparkles, Lightbulb, RefreshCw, Play, Pause, Square, Brain } from "lucide-react"

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

interface ReportSetup {
  title: string
  reportingPeriod: string
  targetAudience: string
  initiationMethod: string
  selectedTemplate?: string
  customPrompt?: string
  selectedFrameworks: string[]
  selectedTopics: string[]
  selectedRegions: string[]
  timeframes: {
    primary: string
    comparison?: string
  }
  brandKit: string
  theme: string
  coverStyle: string
  colorPalette: string
}

interface GeneratedSection {
  id: string
  title: string
  content: string
  status: 'pending' | 'generating' | 'completed' | 'error'
  wordCount: number
  confidence: number
}

interface AIDraftingProps {
  reportSetup: ReportSetup
  onComplete: (content: any) => void
}

export function AIDraftingInterface({ reportSetup, onComplete }: AIDraftingProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [currentSection, setCurrentSection] = useState<string>("")
  const [generatedSections, setGeneratedSections] = useState<GeneratedSection[]>([])
  const [estimatedTime, setEstimatedTime] = useState("15-20")

  // Mock sections based on selected frameworks
  const sections = [
    { id: 'executive-summary', title: 'Executive Summary', required: true },
    { id: 'methodology', title: 'Methodology', required: true },
    { id: 'environmental-performance', title: 'Environmental Performance', required: true },
    { id: 'social-impact', title: 'Social Impact', required: true },
    { id: 'governance', title: 'Governance', required: true },
    { id: 'risk-management', title: 'Risk Management', required: reportSetup.selectedFrameworks.includes('TCFD') },
    { id: 'climate-disclosures', title: 'Climate-Related Disclosures', required: reportSetup.selectedFrameworks.includes('ISSB S2') },
    { id: 'sustainability-goals', title: 'Sustainability Goals & Targets', required: true },
    { id: 'stakeholder-engagement', title: 'Stakeholder Engagement', required: true },
    { id: 'data-tables', title: 'Performance Data Tables', required: true },
    { id: 'appendices', title: 'Appendices & Notes', required: false }
  ].filter(section => section.required)

  useEffect(() => {
    // Initialize sections
    const initialSections = sections.map(section => ({
      id: section.id,
      title: section.title,
      content: '',
      status: 'pending' as const,
      wordCount: 0,
      confidence: 0
    }))
    setGeneratedSections(initialSections)
  }, [])

  const startGeneration = async () => {
    setIsGenerating(true)
    setGenerationProgress(0)

    // Simulate AI generation process
    for (let i = 0; i < generatedSections.length; i++) {
      const section = generatedSections[i]
      setCurrentSection(section.title)
      
      // Update section status to generating
      setGeneratedSections(prev => prev.map(s => 
        s.id === section.id ? { ...s, status: 'generating' } : s
      ))

      // Simulate generation time
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000))

      // Mock generated content
      const mockContent = generateMockContent(section.id, reportSetup)
      const wordCount = mockContent.split(' ').length
      const confidence = Math.floor(85 + Math.random() * 10) // 85-95%

      // Update section with generated content
      setGeneratedSections(prev => prev.map(s => 
        s.id === section.id ? { 
          ...s, 
          status: 'completed',
          content: mockContent,
          wordCount,
          confidence
        } : s
      ))

      setGenerationProgress(((i + 1) / generatedSections.length) * 100)
    }

    setIsGenerating(false)
    setCurrentSection("")
  }

  const regenerateSection = async (sectionId: string) => {
    setGeneratedSections(prev => prev.map(s => 
      s.id === sectionId ? { ...s, status: 'generating' } : s
    ))

    // Simulate regeneration
    await new Promise(resolve => setTimeout(resolve, 3000))

    const section = generatedSections.find(s => s.id === sectionId)
    if (section) {
      const mockContent = generateMockContent(sectionId, reportSetup)
      const wordCount = mockContent.split(' ').length
      const confidence = Math.floor(85 + Math.random() * 10)

      setGeneratedSections(prev => prev.map(s => 
        s.id === sectionId ? { 
          ...s, 
          status: 'completed',
          content: mockContent,
          wordCount,
          confidence
        } : s
      ))
    }
  }

  const handleComplete = () => {
    const reportContent = {
      title: reportSetup.title,
      sections: generatedSections,
      metadata: {
        totalWordCount: generatedSections.reduce((sum, s) => sum + s.wordCount, 0),
        averageConfidence: Math.round(generatedSections.reduce((sum, s) => sum + s.confidence, 0) / generatedSections.length),
        generatedAt: new Date().toISOString(),
        framework: reportSetup.selectedFrameworks.join(', '),
        reportingPeriod: reportSetup.reportingPeriod
      }
    }
    onComplete(reportContent)
  }

  const canProceed = generatedSections.every(section => section.status === 'completed')

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Content Generation
          </CardTitle>
          <CardDescription>
            Generate report content based on your configuration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Configuration Summary */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-medium mb-3">Generation Parameters</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Framework:</span>
                <p className="font-medium">{reportSetup.selectedFrameworks.join(', ') || 'Custom'}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Period:</span>
                <p className="font-medium">{reportSetup.reportingPeriod}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Audience:</span>
                <p className="font-medium">{reportSetup.targetAudience}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Estimated Time:</span>
                <p className="font-medium">{estimatedTime} minutes</p>
              </div>
            </div>
          </div>

          {/* Generation Controls */}
          {!isGenerating && generatedSections.every(s => s.status === 'pending') && (
            <div className="text-center py-8">
              <div className="mb-4">
                <Wand2 className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold">Ready to Generate</h3>
                <p className="text-muted-foreground">
                  AI will generate {sections.length} sections based on your configuration
                </p>
              </div>
              <Button onClick={startGeneration} size="lg">
                <Play className="mr-2 h-4 w-4" />
                Start AI Generation
              </Button>
            </div>
          )}

          {/* Generation Progress */}
          {isGenerating && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span className="text-sm font-medium">Generating: {currentSection}</span>
                </div>
                <Progress value={generationProgress} className="w-full max-w-md mx-auto" />
                <p className="text-xs text-muted-foreground mt-2">
                  {Math.round(generationProgress)}% complete
                </p>
              </div>
            </div>
          )}

          {/* Generated Sections */}
          {generatedSections.some(s => s.status !== 'pending') && (
            <div className="space-y-4">
              <h4 className="font-medium">Generated Content</h4>
              <div className="space-y-3">
                {generatedSections.map((section) => (
                  <Card key={section.id} className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          section.status === 'completed' ? 'bg-green-500' :
                          section.status === 'generating' ? 'bg-blue-500 animate-pulse' :
                          section.status === 'error' ? 'bg-red-500' : 'bg-gray-300'
                        }`} />
                        <h5 className="font-medium">{section.title}</h5>
                        {section.status === 'completed' && (
                          <div className="flex gap-2">
                            <Badge variant="outline" className="text-xs">
                              {section.wordCount} words
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {section.confidence}% confidence
                            </Badge>
                          </div>
                        )}
                      </div>
                      {section.status === 'completed' && (
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => regenerateSection(section.id)}>
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    {section.status === 'generating' && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Generating content...
                      </div>
                    )}
                    
                    {section.content && (
                      <ScrollArea className="h-32">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {section.content.substring(0, 500)}...
                        </p>
                      </ScrollArea>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Completion Summary */}
          {canProceed && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <h4 className="font-medium text-green-800">Generation Complete</h4>
              </div>
              <p className="text-sm text-green-700 mb-4">
                All sections have been generated successfully. You can now review and refine the content.
              </p>
              <div className="flex gap-4 text-sm">
                <div>
                  <span className="text-green-600">Total Words:</span>
                  <span className="font-medium ml-1">
                    {generatedSections.reduce((sum, s) => sum + s.wordCount, 0)}
                  </span>
                </div>
                <div>
                  <span className="text-green-600">Avg Confidence:</span>
                  <span className="font-medium ml-1">
                    {Math.round(generatedSections.reduce((sum, s) => sum + s.confidence, 0) / generatedSections.length)}%
                  </span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button onClick={handleComplete} disabled={!canProceed}>
          Proceed to Review
          <Square className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

// Mock content generator
function generateMockContent(sectionId: string, reportSetup: ReportSetup): string {
  const company = "CarbonCorp" // This would come from company settings
  const period = reportSetup.reportingPeriod
  
  const mockContent: Record<string, string> = {
    'executive-summary': `This ${period} sustainability report presents ${company}'s environmental, social, and governance (ESG) performance and our continued commitment to sustainable business practices. During this reporting period, we achieved significant milestones including a 15% reduction in Scope 1 and 2 emissions, improved employee engagement scores, and enhanced governance frameworks. Our materiality assessment identified climate change, employee wellbeing, and ethical governance as key focus areas, aligning with stakeholder expectations and business strategy. We remain committed to transparency and accountability in our sustainability journey, working towards our 2030 net-zero goals while creating value for all stakeholders.`,
    
    'methodology': `This report has been prepared in accordance with ${reportSetup.selectedFrameworks.join(' and ')} standards, ensuring comprehensive coverage of material ESG topics. Our reporting scope encompasses all operations within our organizational boundary, covering ${reportSetup.selectedRegions.join(', ')} regions. Data collection processes follow established protocols with third-party verification for key metrics. We apply the principle of materiality to focus on topics that significantly impact our business and stakeholders. The reporting period covers ${period}, with comparative data from previous periods where available.`,
    
    'environmental-performance': `Our environmental strategy focuses on reducing our carbon footprint, improving resource efficiency, and protecting biodiversity. During ${period}, we achieved a 15% reduction in absolute GHG emissions compared to the previous year, driven by renewable energy adoption and operational efficiency improvements. Water consumption decreased by 8% through conservation initiatives, while waste diversion from landfill reached 85%. We invested $2.3M in clean technology and established science-based targets aligned with 1.5°C pathways. Our environmental management system is ISO 14001 certified across all major facilities.`,
    
    'social-impact': `We prioritize the wellbeing and development of our 2,500+ employees while contributing positively to the communities where we operate. Employee engagement scores increased to 82%, supported by comprehensive training programs and diversity initiatives. Women represent 45% of our workforce and 35% of leadership positions. We invested $1.8M in community development programs, impacting over 15,000 beneficiaries. Our health and safety performance achieved a lost-time injury frequency rate of 0.3, well below industry average. We maintain strong labor practices and supplier standards throughout our value chain.`,
    
    'governance': `Strong governance foundations underpin our sustainability commitments and business integrity. Our Board includes three independent directors with ESG expertise, providing oversight of sustainability strategy and risk management. We maintain robust anti-corruption policies and conducted ethics training for 100% of employees. Executive compensation is linked to ESG performance indicators, ensuring accountability at the highest levels. Our risk management framework integrates climate and ESG risks into strategic planning processes. We engage transparently with stakeholders through regular consultations and feedback mechanisms.`
  }
  
  return mockContent[sectionId] || `Generated content for ${sectionId} section focusing on ${reportSetup.targetAudience} audience. This section covers key performance indicators, strategic initiatives, and future commitments relevant to this area of our ESG performance during ${period}.`
} 