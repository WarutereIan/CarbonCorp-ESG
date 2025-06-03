"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { 
  CalendarIcon,
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Database,
  TrendingUp,
  Send,
  Settings,
  Download,
  Plus,
  Bell
} from "lucide-react"
import { CompletenessCheck, DataCategory } from "@/types/data-quality"
import { getCompletenessStatusColor, formatDate } from "@/lib/data-quality-utils"
import { useState } from "react"

interface DataCompletenessTabProps {
  completenessChecks: CompletenessCheck[]
  onCreateCheck: (check: Omit<CompletenessCheck, 'id'>) => void
  onUpdateCheck: (id: string, updates: Partial<CompletenessCheck>) => void
  onSendReminder: (id: string) => void
}

export function DataCompletenessTab({ 
  completenessChecks, 
  onCreateCheck, 
  onUpdateCheck, 
  onSendReminder 
}: DataCompletenessTabProps) {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [newCheck, setNewCheck] = useState<Partial<CompletenessCheck>>({
    dataCategory: "environmental",
    expectedFrequency: "monthly",
    status: "current",
    completeness: 100,
    sources: [],
    remindersSent: 0
  })

  const handleCreateCheck = () => {
    if (newCheck.name && newCheck.nextDue) {
      onCreateCheck(newCheck as Omit<CompletenessCheck, 'id'>)
      setNewCheck({
        dataCategory: "environmental",
        expectedFrequency: "monthly",
        status: "current",
        completeness: 100,
        sources: [],
        remindersSent: 0
      })
      setShowCreateForm(false)
    }
  }

  const filteredChecks = completenessChecks.filter(check => {
    const statusMatch = filterStatus === "all" || check.status === filterStatus
    const categoryMatch = filterCategory === "all" || check.dataCategory === filterCategory
    return statusMatch && categoryMatch
  })

  const getOverallStats = () => {
    const total = completenessChecks.length
    const current = completenessChecks.filter(c => c.status === "current").length
    const overdue = completenessChecks.filter(c => c.status === "overdue").length
    const missing = completenessChecks.filter(c => c.status === "missing").length
    const avgCompleteness = completenessChecks.reduce((sum, c) => sum + c.completeness, 0) / total || 0

    return { total, current, overdue, missing, avgCompleteness }
  }

  const stats = getOverallStats()

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "current": return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "overdue": return <Clock className="h-4 w-4 text-orange-600" />
      case "missing": return <AlertTriangle className="h-4 w-4 text-red-600" />
      default: return <Database className="h-4 w-4 text-gray-600" />
    }
  }

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case "daily": return "bg-blue-100 text-blue-800"
      case "weekly": return "bg-green-100 text-green-800"
      case "monthly": return "bg-orange-100 text-orange-800"
      case "quarterly": return "bg-purple-100 text-purple-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Data Completeness Tracking</h3>
          <p className="text-gray-600">Monitor data submission schedules and completeness</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Check
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Checks</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats.current}</div>
            <div className="text-sm text-gray-600">Current</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">{stats.overdue}</div>
            <div className="text-sm text-gray-600">Overdue</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{stats.missing}</div>
            <div className="text-sm text-gray-600">Missing</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{Math.round(stats.avgCompleteness)}%</div>
            <div className="text-sm text-gray-600">Avg Completeness</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Label>Status:</Label>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="current">Current</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
              <SelectItem value="missing">Missing</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Label>Category:</Label>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="environmental">Environmental</SelectItem>
              <SelectItem value="social">Social</SelectItem>
              <SelectItem value="governance">Governance</SelectItem>
              <SelectItem value="financial">Financial</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Create Check Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create Completeness Check</CardTitle>
            <CardDescription>Set up automated tracking for data submission schedules</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="check-name">Check Name</Label>
                <Input
                  id="check-name"
                  placeholder="e.g., Monthly Energy Data Submission"
                  value={newCheck.name || ""}
                  onChange={(e) => setNewCheck({ ...newCheck, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="check-category">Data Category</Label>
                <Select
                  value={newCheck.dataCategory}
                  onValueChange={(value) => setNewCheck({ ...newCheck, dataCategory: value as DataCategory })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="environmental">Environmental</SelectItem>
                    <SelectItem value="social">Social</SelectItem>
                    <SelectItem value="governance">Governance</SelectItem>
                    <SelectItem value="financial">Financial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="check-frequency">Expected Frequency</Label>
                <Select
                  value={newCheck.expectedFrequency}
                  onValueChange={(value) => setNewCheck({ ...newCheck, expectedFrequency: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Next Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newCheck.nextDue ? formatDate(newCheck.nextDue) : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={newCheck.nextDue ? new Date(newCheck.nextDue) : undefined}
                      onSelect={(date) => setNewCheck({ ...newCheck, nextDue: date?.toISOString() })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="check-sources">Data Sources (comma-separated)</Label>
              <Input
                id="check-sources"
                placeholder="e.g., Facility A, Facility B, Energy System API"
                value={newCheck.sources?.join(", ") || ""}
                onChange={(e) => setNewCheck({ 
                  ...newCheck, 
                  sources: e.target.value.split(",").map(s => s.trim()).filter(Boolean)
                })}
              />
            </div>

            <div className="flex items-center justify-end gap-2">
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateCheck}>
                Create Check
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Completeness Checks List */}
      <div className="space-y-4">
        {filteredChecks.map((check) => (
          <Card key={check.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusIcon(check.status)}
                    <div>
                      <h4 className="font-semibold">{check.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="capitalize">
                          {check.dataCategory}
                        </Badge>
                        <Badge className={getFrequencyColor(check.expectedFrequency)}>
                          {check.expectedFrequency}
                        </Badge>
                        <Badge className={getCompletenessStatusColor(check.status)}>
                          {check.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Completeness</div>
                      <div className="flex items-center gap-2">
                        <Progress value={check.completeness} className="flex-1" />
                        <span className="text-sm font-medium">{check.completeness}%</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Next Due</div>
                      <div className="font-medium">{formatDate(check.nextDue)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Last Received</div>
                      <div className="font-medium">
                        {check.lastReceived ? formatDate(check.lastReceived) : "Never"}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Sources</div>
                      <div className="font-medium">{check.sources.length} sources</div>
                    </div>
                  </div>

                  {check.sources.length > 0 && (
                    <div className="mt-3">
                      <div className="text-sm text-gray-600 mb-2">Data Sources:</div>
                      <div className="flex flex-wrap gap-1">
                        {check.sources.map((source, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {source}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {check.status === "overdue" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onSendReminder(check.id)}
                    >
                      <Bell className="h-4 w-4 mr-1" />
                      Remind ({check.remindersSent})
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {/* View details */}}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredChecks.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Completeness Checks</h3>
            <p className="text-gray-600 mb-4">
              {completenessChecks.length === 0 
                ? "Create your first completeness check to start tracking data submissions."
                : "No checks match your current filters."
              }
            </p>
            {completenessChecks.length === 0 && (
              <Button onClick={() => setShowCreateForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Check
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
} 