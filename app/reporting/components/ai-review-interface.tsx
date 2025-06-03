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
  Edit, 
  RefreshCw, 
  CheckCircle2, 
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
  AlertCircle,
  Clock,
  Target,
  BookOpen,
  Wand2,
  Save,
  Undo
} from "lucide-react"

interface GeneratedSection {
  id: string
  title: string
  content: string
  status: 'pending' | 'generating' | 'completed' | 'error'
  wordCount: number
  confidence: number
}

interface ReportContent {
  title: string
  sections: GeneratedSection[]
  metadata: {
    totalWordCount: number
    averageConfidence: number
    generatedAt: string
    framework: string
    reportingPeriod: string
  }
}

interface Comment {
  id: string
  sectionId: string
  text: string
  timestamp: string
  resolved: boolean
}

interface AIReviewInterfaceProps {
  generatedContent: ReportContent
  onAccept: (finalContent: ReportContent) => void
}

export function AIReviewInterface({ generatedContent, onAccept }: AIReviewInterfaceProps) {
  const [selectedSection, setSelectedSection] = useState<string>(generatedContent.sections[0]?.id)
  const [editedContent, setEditedContent] = useState<Record<string, string>>({})
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState<string>("")
  const [isRegenerating, setIsRegenerating] = useState<string | null>(null)
  const [hasChanges, setHasChanges] = useState<boolean>(false)

  const currentSection = generatedContent.sections.find(s => s.id === selectedSection)
  const sectionContent = editedContent[selectedSection] || currentSection?.content || ""
  const sectionComments = comments.filter(c => c.sectionId === selectedSection)

  const handleContentEdit = (content: string) => {
    setEditedContent(prev => ({
      ...prev,
      [selectedSection]: content
    }))
    setHasChanges(true)
  }

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      sectionId: selectedSection,
      text: newComment,
      timestamp: new Date().toLocaleTimeString(),
      resolved: false
    }

    setComments(prev => [...prev, comment])
    setNewComment("")
  }

  const handleResolveComment = (commentId: string) => {
    setComments(prev => prev.map(c => 
      c.id === commentId ? { ...c, resolved: true } : c
    ))
  }

  const handleRegenerateSection = async (sectionId: string) => {
    setIsRegenerating(sectionId)
    
    // Simulate AI regeneration
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Mock regenerated content
    const regeneratedContent = `This section has been regenerated with improved content based on your feedback. ${sectionContent.substring(0, 200)}...`
    
    setEditedContent(prev => ({
      ...prev,
      [sectionId]: regeneratedContent
    }))
    
    setIsRegenerating(null)
    setHasChanges(true)
  }

  const handleAcceptChanges = () => {
    // Merge edited content back into the original structure
    const finalContent: ReportContent = {
      ...generatedContent,
      sections: generatedContent.sections.map(section => ({
        ...section,
        content: editedContent[section.id] || section.content,
        wordCount: (editedContent[section.id] || section.content).split(' ').length
      })),
      metadata: {
        ...generatedContent.metadata,
        totalWordCount: generatedContent.sections.reduce((sum, section) => 
          sum + (editedContent[section.id] || section.content).split(' ').length, 0
        )
      }
    }
    
    onAccept(finalContent)
  }

  const getOverallProgress = () => {
    const totalSections = generatedContent.sections.length
    const reviewedSections = generatedContent.sections.filter(s => 
      editedContent[s.id] || sectionComments.some(c => c.sectionId === s.id)
    ).length
    return Math.round((reviewedSections / totalSections) * 100)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Review & Refine Content
          </CardTitle>
          <CardDescription>
            Review AI-generated content, make edits, and add feedback before proceeding
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Total Sections:</span>
              <p className="font-medium">{generatedContent.sections.length}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Total Words:</span>
              <p className="font-medium">{generatedContent.metadata.totalWordCount}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Avg Confidence:</span>
              <p className="font-medium">{generatedContent.metadata.averageConfidence}%</p>
            </div>
            <div>
              <span className="text-muted-foreground">Review Progress:</span>
              <p className="font-medium">{getOverallProgress()}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Section Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Sections</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-96">
                <div className="space-y-1 p-4">
                  {generatedContent.sections.map((section) => {
                    const hasEdits = !!editedContent[section.id]
                    const hasComments = comments.some(c => c.sectionId === section.id)
                    const isSelected = selectedSection === section.id
                    
                    return (
                      <div
                        key={section.id}
                        className={`p-3 rounded-lg cursor-pointer transition-all ${
                          isSelected ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted/50'
                        }`}
                        onClick={() => setSelectedSection(section.id)}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-sm">{section.title}</h4>
                          <div className="flex gap-1">
                            {hasEdits && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full" title="Has edits" />
                            )}
                            {hasComments && (
                              <div className="w-2 h-2 bg-orange-500 rounded-full" title="Has comments" />
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 text-xs">
                          <Badge variant="outline" className="text-xs">
                            {section.wordCount} words
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {section.confidence}%
                          </Badge>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Content Editor */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">{currentSection?.title}</CardTitle>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleRegenerateSection(selectedSection)}
                    disabled={isRegenerating === selectedSection}
                  >
                    {isRegenerating === selectedSection ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Wand2 className="h-4 w-4" />
                    )}
                    Regenerate
                  </Button>
                  <Button variant="outline" size="sm">
                    <Save className="h-4 w-4" />
                    Save
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="edit">
                <TabsList className="mb-4">
                  <TabsTrigger value="edit" className="flex items-center gap-2">
                    <Edit className="h-3 w-3" />
                    Edit
                  </TabsTrigger>
                  <TabsTrigger value="preview" className="flex items-center gap-2">
                    <Eye className="h-3 w-3" />
                    Preview
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="edit">
                  <div className="space-y-4">
                    <Textarea
                      value={sectionContent}
                      onChange={(e) => handleContentEdit(e.target.value)}
                      className="min-h-[400px] font-mono text-sm"
                      placeholder="Edit section content..."
                    />
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Words: {sectionContent.split(' ').length}</span>
                      <span>Characters: {sectionContent.length}</span>
                      {editedContent[selectedSection] && (
                        <Badge variant="outline" className="text-xs">
                          Modified
                        </Badge>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="preview">
                  <ScrollArea className="h-[400px]">
                    <div className="prose prose-sm max-w-none">
                      <div className="whitespace-pre-wrap leading-relaxed">
                        {sectionContent}
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Comments & Feedback */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <MessageSquare className="h-4 w-4" />
                Comments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add Comment */}
              <div className="space-y-2">
                <Textarea
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="text-sm"
                  rows={3}
                />
                <Button size="sm" onClick={handleAddComment} disabled={!newComment.trim()}>
                  Add Comment
                </Button>
              </div>

              {/* Comments List */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Section Comments ({sectionComments.length})</h4>
                <ScrollArea className="h-64">
                  <div className="space-y-3">
                    {sectionComments.map((comment) => (
                      <div
                        key={comment.id}
                        className={`p-3 rounded-lg border ${
                          comment.resolved ? 'bg-green-50 border-green-200' : 'bg-muted/50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                          {!comment.resolved && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleResolveComment(comment.id)}
                            >
                              <CheckCircle2 className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                        <p className="text-sm">{comment.text}</p>
                        {comment.resolved && (
                          <Badge variant="outline" className="mt-2 text-xs">
                            Resolved
                          </Badge>
                        )}
                      </div>
                    ))}
                    {sectionComments.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No comments for this section
                      </p>
                    )}
                  </div>
                </ScrollArea>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Quick Actions</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">
                    <ThumbsUp className="h-3 w-3" />
                    Approve
                  </Button>
                  <Button variant="outline" size="sm">
                    <ThumbsDown className="h-3 w-3" />
                    Reject
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Summary & Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-semibold">Review Summary</h3>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span>{Object.keys(editedContent).length} sections edited</span>
                <span>{comments.length} comments added</span>
                <span>{comments.filter(c => c.resolved).length} comments resolved</span>
              </div>
              {hasChanges && (
                <div className="flex items-center gap-2 mt-2">
                  <AlertCircle className="h-4 w-4 text-orange-500" />
                  <span className="text-sm text-orange-600">You have unsaved changes</span>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAcceptChanges}>
                Proceed to Compliance
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 