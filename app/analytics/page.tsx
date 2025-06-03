"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Download,
  RefreshCw,
  Settings,
  Filter,
  Calendar,
  Save,
  Share2,
  Mail,
  Layout,
  BarChart3
} from "lucide-react"
import { AnalyticsNavigation } from "./components/analytics-navigation"
import { DashboardOverview } from "./components/dashboard-overview"
import { useState } from "react"

type FilterPeriod = "last-7-days" | "last-30-days" | "q1-2024" | "q2-2024" | "q3-2024" | "q4-2024" | "2023" | "custom"
type ComparisonType = "previous" | "target" | "benchmark" | "none"

export default function AnalyticsPage() {
  const [timePeriod, setTimePeriod] = useState<FilterPeriod>("q2-2024")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [comparisonType, setComparisonType] = useState<ComparisonType>("previous")
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [savedViews] = useState<string[]>(["Executive View", "Operational Dashboard", "Compliance Focus"])

  const handleSaveView = () => {
    // Logic to save current dashboard configuration
    console.log("Saving current view configuration...")
  }

  const handleExportDashboard = () => {
    // Logic to export dashboard as PDF/PNG
    console.log("Exporting dashboard...")
  }

  const handleScheduleReport = () => {
    // Logic to schedule dashboard delivery
    console.log("Opening schedule report dialog...")
  }

  return (
    <div className="flex flex-col h-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Analytics Hub</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive ESG analytics and performance monitoring
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}>
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm" onClick={handleSaveView}>
            <Save className="h-4 w-4 mr-2" />
            Save View
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportDashboard}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap items-center gap-4 p-4 bg-muted/30 rounded-lg mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <Select value={timePeriod} onValueChange={(value: FilterPeriod) => setTimePeriod(value)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-7-days">Last 7 Days</SelectItem>
              <SelectItem value="last-30-days">Last 30 Days</SelectItem>
              <SelectItem value="q1-2024">Q1 2024</SelectItem>
              <SelectItem value="q2-2024">Q2 2024</SelectItem>
              <SelectItem value="q3-2024">Q3 2024</SelectItem>
              <SelectItem value="q4-2024">Q4 2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Locations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="lagos">Lagos, Nigeria</SelectItem>
            <SelectItem value="abuja">Abuja, Nigeria</SelectItem>
            <SelectItem value="kano">Kano, Nigeria</SelectItem>
            <SelectItem value="nairobi">Nairobi, Kenya</SelectItem>
          </SelectContent>
        </Select>

        <Select value={comparisonType} onValueChange={(value: ComparisonType) => setComparisonType(value)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Compare to..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No Comparison</SelectItem>
            <SelectItem value="previous">Previous Period</SelectItem>
            <SelectItem value="target">Target Values</SelectItem>
            <SelectItem value="benchmark">Industry Benchmark</SelectItem>
          </SelectContent>
        </Select>

        {savedViews.length > 0 && (
          <Select defaultValue="current">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Saved Views" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current View</SelectItem>
              {savedViews.map((view) => (
                <SelectItem key={view} value={view.toLowerCase().replace(/\s+/g, '-')}>
                  {view}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Advanced Filters (Collapsible) */}
      {showAdvancedFilters && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Advanced Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">ESG Categories</label>
                <div className="space-y-2">
                  {["Environmental", "Social", "Governance"].map((category) => (
                    <label key={category} className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                      <span className="text-sm">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Data Sources</label>
                <div className="space-y-2">
                  {["Automated", "Manual Entry", "Third Party"].map((source) => (
                    <label key={source} className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                      <span className="text-sm">{source}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Performance Status</label>
                <div className="space-y-2">
                  {["On Track", "At Risk", "Off Track"].map((status) => (
                    <label key={status} className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                      <span className="text-sm">{status}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button variant="outline" size="sm">Reset Filters</Button>
              <Button size="sm">Apply Filters</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content */}
      <div className="flex-1 space-y-8">
        {/* Navigation Grid */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Analytics Modules</h2>
          <AnalyticsNavigation />
        </section>

        {/* Dashboard Overview */}
        <section>
          <DashboardOverview />
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <BarChart3 className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-medium mb-1">Create Custom Report</h3>
                <p className="text-sm text-muted-foreground">Build analytical reports</p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <RefreshCw className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-medium mb-1">Refresh All Data</h3>
                <p className="text-sm text-muted-foreground">Update all metrics</p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <Mail className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-medium mb-1">Schedule Reports</h3>
                <p className="text-sm text-muted-foreground">Automate delivery</p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <Settings className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-medium mb-1">Dashboard Settings</h3>
                <p className="text-sm text-muted-foreground">Customize layout</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
