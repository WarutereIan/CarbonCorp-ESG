"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { 
  ArrowLeft, 
  Download, 
  Send, 
  RefreshCw, 
  Eye, 
  MessageSquare,
  FileText,
  CheckCircle2,
  Clock,
  Users,
  Share2,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal,
  ExternalLink
} from "lucide-react"
import Link from "next/link"

type ReviewStatus = "pending" | "approved" | "changes-requested" | "in-review"

interface Reviewer {
  id: string
  name: string
  role: string
  status: ReviewStatus
  avatar: string
  comments?: number
}

interface Comment {
  id: string
  author: string
  role: string
  content: string
  timestamp: string
  resolved: boolean
  section: string
}

export default function ReportReviewPage() {
  const [currentTab, setCurrentTab] = useState("review")
  const [reviewStatus, setReviewStatus] = useState<ReviewStatus>("in-review")
  const [newComment, setNewComment] = useState("")

  const reviewers: Reviewer[] = [
    { id: "1", name: "Sarah Johnson", role: "ESG Manager", status: "approved", avatar: "SJ", comments: 2 },
    { id: "2", name: "Mike Chen", role: "Legal Counsel", status: "in-review", avatar: "MC", comments: 5 },
    { id: "3", name: "Alex Rivera", role: "Sustainability Lead", status: "approved", avatar: "AR", comments: 1 },
    { id: "4", name: "Dr. Kim Park", role: "Board Member", status: "pending", avatar: "KP", comments: 0 }
  ]

  const comments: Comment[] = [
    {
      id: "1",
      author: "Mike Chen",
      role: "Legal Counsel",
      content: "The governance section needs to include more detail about our board diversity metrics to meet CSRD requirements.",
      timestamp: "2 hours ago",
      resolved: false,
      section: "Governance"
    },
    {
      id: "2",
      author: "Sarah Johnson", 
      role: "ESG Manager",
      content: "Excellent work on the emissions data presentation. Very clear and comprehensive.",
      timestamp: "4 hours ago",
      resolved: true,
      section: "Environmental"
    }
  ]

  const reportSections = [
    { id: "executive-summary", title: "Executive Summary", wordCount: 485 },
    { id: "company-overview", title: "Company Overview", wordCount: 342 },
    { id: "environmental", title: "Environmental Performance", wordCount: 1240 },
    { id: "social", title: "Social Impact", wordCount: 890 },
    { id: "governance", title: "Governance", wordCount: 675 }
  ]

  const handleSubmitForApproval = () => {
    setReviewStatus("pending")
  }

  const handlePublishReport = () => {
    // Navigate to publishing workflow
  }

  const getStatusColor = (status: ReviewStatus) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-800"
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "in-review": return "bg-blue-100 text-blue-800"
      case "changes-requested": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="border-b bg-background p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" asChild>
              <Link href="/reporting">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-xl font-bold">Q2 2024 Sustainability Report</h1>
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">AI-Generated • Ready for Review</p>
                <Badge className={getStatusColor(reviewStatus)}>
                  {reviewStatus.replace('-', ' ')}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Eye className="mr-2 h-4 w-4" />
              Preview PDF
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export Draft
            </Button>
            {reviewStatus === "in-review" && (
              <Button onClick={handleSubmitForApproval}>
                <Send className="mr-2 h-4 w-4" />
                Submit for Approval
              </Button>
            )}
            {reviewStatus === "approved" && (
              <Button onClick={handlePublishReport}>
                <ExternalLink className="mr-2 h-4 w-4" />
                Publish Report
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Main Content */}
        <div className="flex-1">
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="h-full">
            <div className="border-b px-4">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="review">Review</TabsTrigger>
                <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
                <TabsTrigger value="publishing">Publishing</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="review" className="p-6 space-y-6">
              {/* Report Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Report Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">5</div>
                      <div className="text-sm text-muted-foreground">Sections</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">3,632</div>
                      <div className="text-sm text-muted-foreground">Words</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">12</div>
                      <div className="text-sm text-muted-foreground">Charts & Tables</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">95%</div>
                      <div className="text-sm text-muted-foreground">Compliance Score</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Report Sections */}
              <Card>
                <CardHeader>
                  <CardTitle>Report Sections</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {reportSections.map((section) => (
                      <div key={section.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{section.title}</h4>
                          <p className="text-sm text-muted-foreground">{section.wordCount} words</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">AI Generated</Badge>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* AI Regeneration Options */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <RefreshCw className="h-5 w-5" />
                    AI Refinements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Need changes? AI can regenerate specific sections or the entire report based on feedback.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Regenerate Executive Summary
                    </Button>
                    <Button variant="outline" size="sm">
                      Add More Technical Detail
                    </Button>
                    <Button variant="outline" size="sm">
                      Adjust Tone for Investors
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="collaboration" className="p-6 space-y-6">
              {/* Review Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Review Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reviewers.map((reviewer) => (
                      <div key={reviewer.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{reviewer.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{reviewer.name}</p>
                            <p className="text-sm text-muted-foreground">{reviewer.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {reviewer.comments && reviewer.comments > 0 && (
                            <Badge variant="outline">
                              {reviewer.comments} comments
                            </Badge>
                          )}
                          <Badge className={getStatusColor(reviewer.status)}>
                            {reviewer.status.replace('-', ' ')}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Comments & Feedback */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Comments & Feedback
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{comment.author}</span>
                          <Badge variant="outline" className="text-xs">{comment.role}</Badge>
                          <Badge variant="outline" className="text-xs">{comment.section}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{comment.timestamp}</span>
                          {comment.resolved ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          ) : (
                            <Clock className="h-4 w-4 text-yellow-600" />
                          )}
                        </div>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                      {!comment.resolved && (
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline">
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            Apply AI Fix
                          </Button>
                          <Button size="sm" variant="outline">
                            Mark Resolved
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Add Comment */}
                  <div className="border rounded-lg p-4">
                    <Textarea
                      placeholder="Add a comment or feedback..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="mb-3"
                    />
                    <Button size="sm">Add Comment</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="publishing" className="p-6 space-y-6">
              {/* Publishing Workflow */}
              <Card>
                <CardHeader>
                  <CardTitle>Publishing Workflow</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <div className="flex-1">
                        <p className="font-medium">AI Generation Complete</p>
                        <p className="text-sm text-muted-foreground">Report generated with all sections</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <Clock className="h-5 w-5 text-yellow-600" />
                      <div className="flex-1">
                        <p className="font-medium">Review & Approval</p>
                        <p className="text-sm text-muted-foreground">Waiting for final approvals</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 border rounded-lg opacity-50">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <div className="flex-1">
                        <p className="font-medium">Final Publishing</p>
                        <p className="text-sm text-muted-foreground">Generate final formats and distribute</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Export Options */}
              <Card>
                <CardHeader>
                  <CardTitle>Export Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      PDF Report
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      Word Document
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      PowerPoint Summary
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Web Publication
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Distribution Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Distribution Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Investor Portal</span>
                      <Badge variant="outline">Configured</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Public Website</span>
                      <Badge variant="outline">Ready</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Regulatory Filing</span>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Pending</Badge>
                    </div>
                  </div>
                  <Separator />
                  <Button className="w-full" disabled={reviewStatus !== "approved"}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Publish & Distribute
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Sidebar - Quick Actions */}
        <div className="w-80 border-l bg-muted/10">
          <ScrollArea className="h-[calc(100vh-120px)]">
            <div className="p-4 space-y-4">
              <div>
                <h3 className="font-medium mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Regenerate Section
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Add Comment
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Request Review
                  </Button>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-3">Compliance Status</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>CSRD Compliance</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700">95%</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>ISSB S1/S2</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700">92%</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>GRI Standards</span>
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700">88%</Badge>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
