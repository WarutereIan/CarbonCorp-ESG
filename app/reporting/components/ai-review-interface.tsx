"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Eye, 
  Edit3, 
  RefreshCw, 
  CheckCircle, 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown, 
  Sparkles, 
  FileText, 
  BarChart, 
  Table, 
  Image,
  ArrowLeft,
  ArrowRight,
  Download,
  Share,
  Bot,
  Lightbulb,
  AlertTriangle
} from "lucide-react"

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
  userFeedback?: {
    rating: 'good' | 'needs-work' | 'regenerate'
    comments: string
    edits: string[]
  }
}

interface AIReviewProps {
  generatedContent: {
    sections: ReportSection[]
    metadata: {
      generatedAt: string
      framework: string[]
      topics: string[]
      audience: string
    }
  }
  onAccept: () => void
  onBack: () => void
}

export function AIReviewInterface({ generatedContent, onAccept, onBack }: AIReviewProps) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [sections, setSections] = useState<ReportSection[]>(generatedContent.sections)
  const [overallFeedback, setOverallFeedback] = useState<string>("")
  const [regeneratingSection, setRegeneratingSection] = useState<string | null>(null)

  const currentSection = sections[currentSectionIndex]

  const updateSectionFeedback = (sectionId: string, feedback: Partial<ReportSection['userFeedback']>) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId 
        ? { 
            ...section, 
            userFeedback: { 
              ...section.userFeedback, 
              rating: section.userFeedback?.rating || 'good',
              comments: section.userFeedback?.comments || '',
              edits: section.userFeedback?.edits || [],
              ...feedback 
            } 
          }
        : section
    ))
  }

  const regenerateSection = async (sectionId: string, customPrompt?: string) => {
    setRegeneratingSection(sectionId)
    
    // Simulate AI regeneration
    setTimeout(() => {
      setSections(prev => prev.map(section => 
        section.id === sectionId 
          ? { 
              ...section, 
              content: generateImprovedContent(section, customPrompt),
              userFeedback: undefined // Reset feedback after regeneration
            }
          : section
      ))
      setRegeneratingSection(null)
    }, 3000)
  }

  const generateImprovedContent = (section: ReportSection, customPrompt?: string): string => {
    const baseContent = section.content || ""
    const improvement = customPrompt ? ` (Updated based on feedback: ${customPrompt})` : " (Regenerated with improved AI analysis)"
    
    switch (section.type) {
      case 'text':
        return baseContent + improvement
      case 'chart':
        return baseContent + `\nUpdated visualization parameters${improvement}`
      case 'table':
        return baseContent + `\nEnhanced data presentation${improvement}`
      case 'infographic':
        return baseContent + `\nImproved visual design${improvement}`
      default:
        return baseContent + improvement
    }
  }

  const getSectionIcon = (type: string) => {
    switch (type) {
      case 'text': return <FileText className="h-4 w-4" />
      case 'chart': return <BarChart className="h-4 w-4" />
      case 'table': return <Table className="h-4 w-4" />
      case 'infographic': return <Image className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const getFeedbackColor = (rating: string) => {
    switch (rating) {
      case 'good': return 'text-green-600'
      case 'needs-work': return 'text-yellow-600'
      case 'regenerate': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getOverallProgress = () => {
    const reviewedSections = sections.filter(s => s.userFeedback?.rating).length
    return Math.round((reviewedSections / sections.length) * 100)
  }

  const canProceedToStudio = () => {
    return sections.every(s => s.userFeedback?.rating && s.userFeedback.rating !== 'regenerate')
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Eye className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <CardTitle>Review AI-Generated Content</CardTitle>
                <CardDescription>
                  Review each section, provide feedback, and make refinements before finalizing
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                {getOverallProgress()}% Reviewed
              </Badge>
              <Badge variant="secondary">
                {sections.length} Sections
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Progress and Navigation */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Review Progress</span>
              <span className="text-sm text-muted-foreground">
                Section {currentSectionIndex + 1} of {sections.length}
              </span>
            </div>
            
            {/* Section Navigation Pills */}
            <div className="flex flex-wrap gap-2">
              {sections.map((section, index) => (
                <Button
                  key={section.id}
                  variant={index === currentSectionIndex ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentSectionIndex(index)}
                  className="relative"
                >
                  <div className="flex items-center gap-2">
                    {getSectionIcon(section.type)}
                    <span className="hidden md:inline">{section.title}</span>
                    <span className="md:hidden">{index + 1}</span>
                  </div>
                  {section.userFeedback?.rating && (
                    <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
                      section.userFeedback.rating === 'good' ? 'bg-green-500' :
                      section.userFeedback.rating === 'needs-work' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`} />
                  )}
                </Button>
              ))}
            </div>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentSectionIndex(Math.max(0, currentSectionIndex - 1))}
                disabled={currentSectionIndex === 0}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={() => setCurrentSectionIndex(Math.min(sections.length - 1, currentSectionIndex + 1))}
                disabled={currentSectionIndex === sections.length - 1}
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Review Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Content Review Panel */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getSectionIcon(currentSection.type)}
                  <CardTitle className="text-lg">{currentSection.title}</CardTitle>
                  <Badge variant="secondary">{currentSection.type}</Badge>
                </div>
                {regeneratingSection === currentSection.id && (
                  <Badge variant="outline" className="animate-pulse">
                    <Bot className="h-3 w-3 mr-1" />
                    Regenerating...
                  </Badge>
                )}
              </div>
              <CardDescription>
                Review the AI-generated content and provide feedback for improvements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="content" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="content">Generated Content</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="sources">Data Sources</TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="space-y-4">
                  <ScrollArea className="h-96 p-4 border rounded-lg bg-muted/20">
                    <div className="space-y-4">
                      {currentSection.type === 'text' ? (
                        <div className="prose prose-sm max-w-none">
                          <pre className="whitespace-pre-wrap font-sans text-sm">
                            {currentSection.content}
                          </pre>
                        </div>
                      ) : (
                        <div className="p-4 bg-white border rounded-lg">
                          <h4 className="font-medium mb-2">{currentSection.title}</h4>
                          <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
                            {currentSection.content}
                          </pre>
                        </div>
                      )}
                    </div>
                  </ScrollArea>

                  {/* Quick Edit Options */}
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      <Edit3 className="h-3 w-3 mr-1" />
                      Quick Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Enhance
                    </Button>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Alternative Version
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="preview" className="space-y-4">
                  <div className="p-4 border rounded-lg bg-white">
                    <div className="text-sm text-muted-foreground mb-2">Preview (styled)</div>
                    <div className="prose prose-sm max-w-none">
                      {currentSection.type === 'text' ? (
                        <div dangerouslySetInnerHTML={{ 
                          __html: currentSection.content?.replace(/\n/g, '<br>') || '' 
                        }} />
                      ) : (
                        <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                          {getSectionIcon(currentSection.type)}
                          <div className="mt-2 text-sm text-muted-foreground">
                            {currentSection.type} preview will be generated in the studio
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="sources" className="space-y-4">
                  <div className="space-y-3">
                    <Alert>
                      <Lightbulb className="h-4 w-4" />
                      <AlertDescription>
                        This content was generated using the following data sources and parameters:
                      </AlertDescription>
                    </Alert>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm">Data Sources</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Data Hub - Emissions</span>
                            <Badge variant="outline">85% complete</Badge>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>HR System - Workforce</span>
                            <Badge variant="outline">92% complete</Badge>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>Financial System - Revenue</span>
                            <Badge variant="outline">100% complete</Badge>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm">Framework Alignment</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          {generatedContent.metadata.framework.map((fw) => (
                            <div key={fw} className="flex justify-between text-xs">
                              <span>{fw.toUpperCase()}</span>
                              <Badge variant="secondary">Aligned</Badge>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Feedback Panel */}
        <div className="space-y-6">
          {/* Section Feedback */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Section Feedback</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-xs font-medium">Rate this section</Label>
                <div className="flex gap-2 mt-2">
                  <Button
                    variant={currentSection.userFeedback?.rating === 'good' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => updateSectionFeedback(currentSection.id, { rating: 'good' })}
                  >
                    <ThumbsUp className="h-3 w-3 mr-1" />
                    Good
                  </Button>
                  <Button
                    variant={currentSection.userFeedback?.rating === 'needs-work' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => updateSectionFeedback(currentSection.id, { rating: 'needs-work' })}
                  >
                    <Edit3 className="h-3 w-3 mr-1" />
                    Needs Work
                  </Button>
                  <Button
                    variant={currentSection.userFeedback?.rating === 'regenerate' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => updateSectionFeedback(currentSection.id, { rating: 'regenerate' })}
                  >
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Regenerate
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-xs font-medium">Comments & Suggestions</Label>
                <Textarea
                  placeholder="Provide specific feedback for improvements..."
                  value={currentSection.userFeedback?.comments || ''}
                  onChange={(e) => updateSectionFeedback(currentSection.id, { comments: e.target.value })}
                  className="mt-2"
                  rows={3}
                />
              </div>

              {currentSection.userFeedback?.rating === 'regenerate' && (
                <div>
                  <Label className="text-xs font-medium">Regeneration Instructions</Label>
                  <Textarea
                    placeholder="Specific instructions for regenerating this section..."
                    className="mt-2"
                    rows={2}
                  />
                  <Button
                    className="w-full mt-2"
                    onClick={() => regenerateSection(currentSection.id)}
                    disabled={regeneratingSection === currentSection.id}
                  >
                    {regeneratingSection === currentSection.id ? (
                      <>
                        <Bot className="h-4 w-4 mr-2 animate-pulse" />
                        Regenerating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Regenerate Section
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Overall Review Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Review Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-xs">
                <div className="flex justify-between mb-1">
                  <span>Progress</span>
                  <span>{getOverallProgress()}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${getOverallProgress()}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-sm font-bold text-green-600">
                    {sections.filter(s => s.userFeedback?.rating === 'good').length}
                  </div>
                  <div className="text-xs text-muted-foreground">Good</div>
                </div>
                <div>
                  <div className="text-sm font-bold text-yellow-600">
                    {sections.filter(s => s.userFeedback?.rating === 'needs-work').length}
                  </div>
                  <div className="text-xs text-muted-foreground">Needs Work</div>
                </div>
                <div>
                  <div className="text-sm font-bold text-red-600">
                    {sections.filter(s => s.userFeedback?.rating === 'regenerate').length}
                  </div>
                  <div className="text-xs text-muted-foreground">Regenerate</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <Button 
                  onClick={onAccept} 
                  className="w-full"
                  disabled={!canProceedToStudio()}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Accept & Continue to Studio
                </Button>
                
                {!canProceedToStudio() && (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription className="text-xs">
                      Please review all sections before proceeding
                    </AlertDescription>
                  </Alert>
                )}

                <Button variant="outline" onClick={onBack} className="w-full">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Generation
                </Button>

                <div className="flex gap-2">
                  <Button variant="ghost" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="ghost" className="flex-1">
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Overall Feedback */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Overall Report Feedback</CardTitle>
          <CardDescription>
            Provide general feedback about the entire generated report
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Overall thoughts on the generated content, structure, and quality..."
            value={overallFeedback}
            onChange={(e) => setOverallFeedback(e.target.value)}
            rows={3}
          />
        </CardContent>
      </Card>
    </div>
  )
} 