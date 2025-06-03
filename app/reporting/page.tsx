"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ArrowRight,
  Brain,
  Calendar,
  Clock,
  Download,
  FileText,
  MessageSquare,
  Plus,
  Search,
  Share2,
  Eye,
  AlertCircle,
  CheckCircle2,
  Users,
  Filter,
  MoreHorizontal,
  RefreshCw,
  Send,
  ExternalLink
} from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState } from "react"
import { WorkflowSelectionModal } from "./components/workflow-selection-modal"

type ReportStatus = "draft" | "in-review" | "pending-approval" | "approved" | "published" | "changes-requested"
type UserRole = "admin" | "esg-manager" | "legal-counsel" | "board-member" | "viewer"

interface Report {
  id: string
  title: string
  type: "ai-generated" | "template-based" | "custom"
  status: ReportStatus
  framework: string
  created: string
  lastModified: string
  author: string
  assignedReviewers: string[]
  pendingActions: string[]
  wordCount: number
  complianceScore: number
}

interface PendingAction {
  id: string
  type: "review" | "approve" | "comment" | "regenerate"
  reportTitle: string
  requestedBy: string
  dueDate: string
  priority: "high" | "medium" | "low"
}

export default function ReportingPage() {
  const [currentUserRole] = useState<UserRole>("esg-manager")
  const [currentTab, setCurrentTab] = useState("dashboard")
  const [statusFilter, setStatusFilter] = useState<ReportStatus | "all">("all")
  const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState(false)
  const [workflowTriggerType, setWorkflowTriggerType] = useState<'create-report' | 'ai-generation'>('create-report')

  const reports: Report[] = [
    {
      id: "1",
      title: "Q2 2024 Sustainability Report",
      type: "ai-generated",
      status: "published",
      framework: "CSRD",
      created: "2024-05-14",
      lastModified: "2024-05-16",
      author: "Sarah Johnson",
      assignedReviewers: ["Mike Chen", "Dr. Kim Park"],
      pendingActions: [],
      wordCount: 3640,
      complianceScore: 95
    },
    {
      id: "2", 
      title: "ISSB Climate Disclosures",
      type: "ai-generated",
      status: "pending-approval",
      framework: "ISSB S2",
      created: "2024-05-18",
      lastModified: "2024-05-19",
      author: "Alex Rivera",
      assignedReviewers: ["Sarah Johnson", "Mike Chen"],
      pendingActions: ["Final approval from Board"],
      wordCount: 2850,
      complianceScore: 92
    },
    {
      id: "3",
      title: "DEI Progress Report Q2",
      type: "ai-generated", 
      status: "in-review",
      framework: "GRI",
      created: "2024-05-19",
      lastModified: "2024-05-20",
      author: "Sarah Johnson",
      assignedReviewers: ["HR Team", "Legal"],
      pendingActions: ["Review by Mike Chen", "HR data validation"],
      wordCount: 1920,
      complianceScore: 88
    }
  ]

  const pendingActions: PendingAction[] = [
    {
      id: "1",
      type: "review",
      reportTitle: "DEI Progress Report Q2",
      requestedBy: "Sarah Johnson",
      dueDate: "2024-05-22",
      priority: "high"
    },
    {
      id: "2",
      type: "approve",
      reportTitle: "ISSB Climate Disclosures",
      requestedBy: "Alex Rivera", 
      dueDate: "2024-05-25",
      priority: "medium"
    }
  ]

  const getStatusColor = (status: ReportStatus) => {
    switch (status) {
      case "published": return "bg-green-100 text-green-800"
      case "approved": return "bg-green-100 text-green-800"
      case "pending-approval": return "bg-yellow-100 text-yellow-800"
      case "in-review": return "bg-blue-100 text-blue-800"
      case "draft": return "bg-gray-100 text-gray-800"
      case "changes-requested": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800"
      case "medium": return "bg-yellow-100 text-yellow-800"
      case "low": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const canEdit = (report: Report) => {
    return currentUserRole === "admin" || 
           currentUserRole === "esg-manager" || 
           (report.status === "draft" || report.status === "changes-requested")
  }

  const filteredReports = reports.filter(report => 
    statusFilter === "all" || report.status === statusFilter
  )

  const handleCreateReport = () => {
    setWorkflowTriggerType('create-report')
    setIsWorkflowModalOpen(true)
  }

  const handleStartAIGeneration = () => {
    setWorkflowTriggerType('ai-generation')
    setIsWorkflowModalOpen(true)
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">ESG Reporting</h1>
          <p className="text-muted-foreground">AI-powered reporting workflow and management</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Report
          </Button>
          <Button onClick={handleCreateReport}>
              <Plus className="mr-2 h-4 w-4" />
            Create Report
          </Button>
        </div>
      </div>

      {/* Pending Actions Alert */}
      {pendingActions.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <AlertCircle className="h-5 w-5" />
              You have {pendingActions.length} pending action{pendingActions.length > 1 ? 's' : ''}
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-2">
              {pendingActions.slice(0, 2).map((action) => (
                <div key={action.id} className="flex items-center justify-between bg-white p-3 rounded-lg">
                  <div className="flex items-center gap-3">
                    {action.type === "review" && <MessageSquare className="h-4 w-4 text-blue-600" />}
                    {action.type === "approve" && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                    <div>
                      <p className="font-medium text-sm">{action.type === "review" ? "Review" : "Approve"}: {action.reportTitle}</p>
                      <p className="text-xs text-muted-foreground">Due {action.dueDate} • Requested by {action.requestedBy}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(action.priority)}>{action.priority}</Badge>
                    <Button size="sm">Take Action</Button>
                  </div>
                </div>
              ))}
            </div>
              </CardContent>
            </Card>
      )}

      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="my-reports">My Reports</TabsTrigger>
          <TabsTrigger value="review-queue">Review Queue</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="mt-6 space-y-6">
          {/* AI-First Workflow Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="border-dashed border-2 border-primary/20 bg-primary/5">
              <CardContent className="p-6 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Brain className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">AI-Generated Report</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Complete end-to-end AI generation
                    </p>
                  </div>
                  <Button className="w-full" onClick={handleStartAIGeneration}>
                    Start AI Generation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="p-3 rounded-full bg-blue-100">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Team Collaboration</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Review and approve reports
                    </p>
                  </div>
                  <Button variant="outline" className="w-full" onClick={() => setCurrentTab("review-queue")}>
                    View Review Queue
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="p-3 rounded-full bg-green-100">
                    <ExternalLink className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Publish & Distribute</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Multi-format export and sharing
                    </p>
                  </div>
                  <Button variant="outline" className="w-full" onClick={() => setCurrentTab("published")}>
                    View Published
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">3</div>
                <p className="text-sm text-muted-foreground">Active Reports</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">2</div>
                <p className="text-sm text-muted-foreground">Pending Actions</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">1</div>
                <p className="text-sm text-muted-foreground">Published This Month</p>
        </CardContent>
      </Card>
          <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">92%</div>
                <p className="text-sm text-muted-foreground">Avg Compliance Score</p>
            </CardContent>
          </Card>
          </div>
        </TabsContent>

        <TabsContent value="my-reports" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>All Reports</CardTitle>
                <div className="flex gap-2">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <select 
                      value={statusFilter} 
                      onChange={(e) => setStatusFilter(e.target.value as ReportStatus | "all")}
                      className="text-sm border rounded px-2 py-1"
                    >
                      <option value="all">All Status</option>
                      <option value="draft">Draft</option>
                      <option value="in-review">In Review</option>
                      <option value="pending-approval">Pending Approval</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    <Input placeholder="Search reports..." className="w-64" />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredReports.map((report) => (
                  <Card key={report.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{report.title}</h3>
                          <Badge className={getStatusColor(report.status)}>
                            {report.status.replace('-', ' ')}
                          </Badge>
                          {report.type === "ai-generated" && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700">
                              <Brain className="mr-1 h-3 w-3" />
                              AI Generated
                            </Badge>
                          )}
                          </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{report.framework}</span>
                          <span>{report.wordCount} words</span>
                          <span>Compliance: {report.complianceScore}%</span>
                          <span>Modified {report.lastModified}</span>
                          {report.pendingActions.length > 0 && (
                            <Badge variant="outline" className="bg-orange-50 text-orange-700">
                              {report.pendingActions.length} pending
                            </Badge>
                          )}
                            </div>
                          </div>
                      <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                            </Button>
                        {canEdit(report) && (
                          <Button variant="ghost" size="sm" asChild>
                            <Link href="/reporting/studio">
                              <MessageSquare className="h-4 w-4" />
                            </Link>
                            </Button>
                        )}
                            <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                            </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="review-queue" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Review Queue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingActions.map((action) => (
                  <Card key={action.id} className="p-4">
                        <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-full bg-blue-100">
                          {action.type === "review" && <MessageSquare className="h-4 w-4 text-blue-600" />}
                          {action.type === "approve" && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                        </div>
                        <div>
                          <h4 className="font-medium">{action.reportTitle}</h4>
                          <p className="text-sm text-muted-foreground">
                            {action.type === "review" ? "Review requested" : "Approval requested"} by {action.requestedBy}
                          </p>
                          <p className="text-xs text-muted-foreground">Due: {action.dueDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getPriorityColor(action.priority)}>
                          {action.priority}
                        </Badge>
                        <Button size="sm" asChild>
                          <Link href="/reporting/studio">
                            {action.type === "review" ? "Review" : "Approve"}
                          </Link>
                        </Button>
                      </div>
                    </div>
                </Card>
                ))}
                {pendingActions.length === 0 && (
                  <div className="text-center py-8">
                    <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="font-medium mb-2">All caught up!</h3>
                    <p className="text-sm text-muted-foreground">No pending reviews or approvals.</p>
                        </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="published" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ExternalLink className="h-5 w-5" />
                Published Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {reports.filter(r => r.status === "published").map((report) => (
                  <Card key={report.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{report.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Published {report.lastModified} • {report.framework} • {report.complianceScore}% compliance
                        </p>
                      </div>
                          <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                            </Button>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                            </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="mr-2 h-4 w-4" />
                          Share
                            </Button>
                          </div>
                </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Workflow Selection Modal */}
      <WorkflowSelectionModal 
        isOpen={isWorkflowModalOpen}
        onClose={() => setIsWorkflowModalOpen(false)}
        triggerType={workflowTriggerType}
      />
    </div>
  )
}
