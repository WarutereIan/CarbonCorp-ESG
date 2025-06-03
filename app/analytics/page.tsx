"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import {
  BarChart3,
  Download,
  FileText,
  LineChart,
  PieChart,
  Plus,
  RefreshCw,
  Search,
  Share2,
  Clock,
  Settings,
  Filter,
  Brain,
  TrendingUp,
  TrendingDown,
  Target,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  MapPin,
  Tag,
  Layout,
  Grid3X3,
  Save,
  Copy,
  Mail,
  ExternalLink,
  Lightbulb
} from "lucide-react"
import { AnalyticsKpiCard } from "@/components/analytics/analytics-kpi-card"
import { AnalyticsChart } from "@/components/analytics/analytics-chart"
import { useState } from "react"

type FilterPeriod = "last-7-days" | "last-30-days" | "q1-2024" | "q2-2024" | "q3-2024" | "q4-2024" | "2023" | "custom"
type ComparisonType = "previous" | "target" | "benchmark" | "none"
type ESGCategory = "all" | "environmental" | "social" | "governance"

interface KPIData {
  id: string
  title: string
  value: string
  unit: string
  change: number
  target?: string
  progress: number
  status: "on-track" | "at-risk" | "off-track"
  lastUpdated: string
  category: ESGCategory
}

interface WidgetConfig {
  id: string
  title: string
  type: "chart" | "kpi" | "insight"
  chartType?: "bar" | "line" | "pie" | "radar" | "gauge"
  position: { x: number; y: number; w: number; h: number }
  visible: boolean
  category: ESGCategory
}

interface AIInsight {
  id: string
  type: "performance" | "anomaly" | "prediction" | "correlation" | "recommendation"
  priority: "high" | "medium" | "low"
  title: string
  description: string
  impact: string
  actionSuggestion?: string
  confidence: number
  timestamp: string
}

export default function AnalyticsPage() {
  const [timePeriod, setTimePeriod] = useState<FilterPeriod>("q2-2024")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [comparisonType, setComparisonType] = useState<ComparisonType>("previous")
  const [selectedCategory, setSelectedCategory] = useState<ESGCategory>("all")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isConfiguring, setIsConfiguring] = useState(false)
  const [savedViews, setSavedViews] = useState<string[]>(["Executive View", "Operational Dashboard", "Compliance Focus"])

  const kpiData: KPIData[] = [
    {
      id: "emissions",
      title: "Total Carbon Emissions",
      value: "1,245.8",
      unit: "tCO₂e",
      change: -8.2,
      target: "1,150.0",
      progress: 78,
      status: "on-track",
      lastUpdated: "2024-05-20",
      category: "environmental"
    },
    {
      id: "renewable",
      title: "Renewable Energy",
      value: "32.5",
      unit: "%",
      change: 8.7,
      target: "40.0",
      progress: 81,
      status: "on-track",
      lastUpdated: "2024-05-19",
      category: "environmental"
    },
    {
      id: "water",
      title: "Water Usage",
      value: "12,450",
      unit: "m³",
      change: -3.2,
      target: "11,000",
      progress: 65,
      status: "at-risk",
      lastUpdated: "2024-05-18",
      category: "environmental"
    },
    {
      id: "diversity",
      title: "Board Diversity",
      value: "42",
      unit: "%",
      change: 5.3,
      target: "50",
      progress: 84,
      status: "on-track",
      lastUpdated: "2024-05-17",
      category: "social"
    },
    {
      id: "training",
      title: "Training Hours",
      value: "2,840",
      unit: "hours",
      change: 12.4,
      target: "3,000",
      progress: 95,
      status: "on-track",
      lastUpdated: "2024-05-16",
      category: "social"
    },
    {
      id: "compliance",
      title: "Policy Compliance",
      value: "94.2",
      unit: "%",
      change: -1.8,
      target: "95.0",
      progress: 99,
      status: "at-risk",
      lastUpdated: "2024-05-15",
      category: "governance"
    }
  ]

  const aiInsights: AIInsight[] = [
    {
      id: "1",
      type: "anomaly",
      priority: "high",
      title: "Water Usage Spike Detected",
      description: "Facilities in Lagos region showing 15% increase in water consumption compared to historical patterns.",
      impact: "May affect Q2 water reduction targets",
      actionSuggestion: "Investigate equipment efficiency and leak detection at Lagos facilities",
      confidence: 92,
      timestamp: "2024-05-20T10:30:00Z"
    },
    {
      id: "2",
      type: "prediction",
      priority: "medium",
      title: "Renewable Energy Target Achievement Forecast",
      description: "Current trend suggests 95% likelihood of meeting 40% renewable energy target by Q4 2024.",
      impact: "On track for annual sustainability goals",
      confidence: 88,
      timestamp: "2024-05-19T14:15:00Z"
    },
    {
      id: "3",
      type: "correlation",
      priority: "low",
      title: "Training Hours vs Safety Incidents Correlation",
      description: "Strong negative correlation (-0.78) observed between employee training hours and workplace safety incidents.",
      impact: "Supports investment in training programs",
      actionSuggestion: "Consider expanding safety training initiatives",
      confidence: 85,
      timestamp: "2024-05-18T09:45:00Z"
    }
  ]

  const getKPIStatusColor = (status: string) => {
    switch (status) {
      case "on-track": return "bg-green-100 text-green-800"
      case "at-risk": return "bg-yellow-100 text-yellow-800"
      case "off-track": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getInsightPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800"
      case "medium": return "bg-yellow-100 text-yellow-800"
      case "low": return "bg-blue-100 text-blue-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const filteredKPIs = kpiData.filter(kpi => 
    selectedCategory === "all" || kpi.category === selectedCategory
  )

  const handleSaveView = () => {
    const viewName = `Custom View ${savedViews.length + 1}`
    setSavedViews([...savedViews, viewName])
  }

  const handleExportDashboard = () => {
    // Implementation for PDF export
    console.log("Exporting dashboard...")
  }

  const handleScheduleReport = () => {
    // Implementation for scheduling
    console.log("Scheduling report...")
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">ESG Analytics Dashboard</h1>
          <p className="text-muted-foreground">Monitor performance, track goals, and discover insights with AI-powered analytics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <a href="/analytics/explorer">
              <Search className="mr-2 h-4 w-4" />
              Data Explorer
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/analytics/benchmarks">
              <BarChart3 className="mr-2 h-4 w-4" />
              Benchmarks
            </a>
          </Button>
          <Button variant="outline" onClick={handleScheduleReport}>
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Report
          </Button>
          <Button variant="outline" onClick={handleExportDashboard}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={() => setIsConfiguring(!isConfiguring)}>
            <Settings className="mr-2 h-4 w-4" />
            {isConfiguring ? "Done" : "Configure"}
          </Button>
        </div>
      </div>

      {/* Advanced Global Filtering & Segmentation */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters & Context
            </CardTitle>
            <div className="flex items-center gap-2">
              <Select value={savedViews[0]} onValueChange={() => {}}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Saved Views" />
                </SelectTrigger>
                <SelectContent>
                  {savedViews.map((view, idx) => (
                    <SelectItem key={idx} value={view}>{view}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={handleSaveView}>
                <Save className="mr-1 h-3 w-3" />
                Save View
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">Time Period</span>
                <Select value={timePeriod} onValueChange={(value) => setTimePeriod(value as FilterPeriod)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                    <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                    <SelectItem value="q1-2024">Q1 2024</SelectItem>
                    <SelectItem value="q2-2024">Q2 2024</SelectItem>
                    <SelectItem value="q3-2024">Q3 2024</SelectItem>
                    <SelectItem value="q4-2024">Q4 2024</SelectItem>
                    <SelectItem value="2023">2023 (Full Year)</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">Organizational Unit</span>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="lagos">Lagos, Nigeria</SelectItem>
                    <SelectItem value="nairobi">Nairobi, Kenya</SelectItem>
                    <SelectItem value="accra">Accra, Ghana</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing Division</SelectItem>
                    <SelectItem value="operations">Operations Division</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">ESG Category</span>
                <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as ESGCategory)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="environmental">Environmental</SelectItem>
                    <SelectItem value="social">Social</SelectItem>
                    <SelectItem value="governance">Governance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">Comparison</span>
                <Select value={comparisonType} onValueChange={(value) => setComparisonType(value as ComparisonType)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select comparison" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="previous">vs Previous Period</SelectItem>
                    <SelectItem value="target">vs Target Values</SelectItem>
                    <SelectItem value="benchmark">vs Industry Benchmark</SelectItem>
                    <SelectItem value="none">No Comparison</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Tags:</span>
              <div className="flex gap-2">
                <Badge variant="outline" className="cursor-pointer">Net Zero</Badge>
                <Badge variant="outline" className="cursor-pointer">CSRD</Badge>
                <Badge variant="outline" className="cursor-pointer">Water Stewardship</Badge>
                <Button variant="ghost" size="sm">
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI-Driven Insights & Recommendations Widget */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Brain className="h-4 w-4 text-blue-600" />
            AI Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {aiInsights.map((insight) => (
              <Card key={insight.id} className="bg-white border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {insight.type === "anomaly" && <AlertTriangle className="h-4 w-4 text-orange-500" />}
                      {insight.type === "prediction" && <TrendingUp className="h-4 w-4 text-green-500" />}
                      {insight.type === "correlation" && <Lightbulb className="h-4 w-4 text-blue-500" />}
                      <span className="text-xs font-medium capitalize">{insight.type}</span>
                    </div>
                    <Badge className={getInsightPriorityColor(insight.priority)} variant="outline">
                      {insight.priority}
                    </Badge>
                  </div>
                  <h4 className="font-medium text-sm mb-1">{insight.title}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{insight.description}</p>
                  <div className="text-xs text-muted-foreground">
                    <p className="mb-1">Impact: {insight.impact}</p>
                    {insight.actionSuggestion && (
                      <p className="text-blue-600">💡 {insight.actionSuggestion}</p>
                    )}
                    <p className="mt-2">Confidence: {insight.confidence}%</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Configurable KPI Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredKPIs.map((kpi) => (
          <Card key={kpi.id} className="relative">
            {isConfiguring && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 h-6 w-6 p-0"
              >
                <Settings className="h-3 w-3" />
              </Button>
            )}
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-medium text-sm">{kpi.title}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold">{kpi.value}</span>
                    <span className="text-sm text-muted-foreground">{kpi.unit}</span>
                  </div>
                </div>
                <Badge className={getKPIStatusColor(kpi.status)} variant="outline">
                  {kpi.status.replace('-', ' ')}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                {kpi.change > 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span className={`text-sm ${kpi.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {kpi.change > 0 ? '+' : ''}{kpi.change}%
                </span>
                <span className="text-xs text-muted-foreground">vs {comparisonType}</span>
              </div>

              {kpi.target && (
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span>Progress to Target</span>
                    <span>{kpi.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${kpi.progress >= 80 ? 'bg-green-500' : kpi.progress >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${Math.min(kpi.progress, 100)}%` }}
                    />
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Target className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Target: {kpi.target} {kpi.unit}</span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Updated: {kpi.lastUpdated}</span>
                <Button variant="ghost" size="sm" className="h-6 px-2">
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Customizable Visualization Grid */}
      <Tabs defaultValue="overview">
        <div className="flex items-center justify-between">
          <TabsList className="grid w-auto grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="environmental">Environmental</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="governance">Governance</TabsTrigger>
          </TabsList>
          
          {isConfiguring && (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Grid3X3 className="mr-2 h-4 w-4" />
                Layout
              </Button>
              <Button variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Widget
              </Button>
            </div>
          )}
        </div>

        <TabsContent value="overview" className="mt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <AnalyticsChart title="Carbon Emissions by Scope" type="bar" icon={BarChart3} />
            <AnalyticsChart title="Energy Consumption Trend" type="line" icon={LineChart} />
            <AnalyticsChart title="Water Usage by Facility" type="pie" icon={PieChart} />
            <AnalyticsChart title="ESG Score Comparison" type="radar" icon={BarChart3} />
          </div>
        </TabsContent>
        
        <TabsContent value="environmental" className="mt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <AnalyticsChart title="Scope 1 Emissions by Source" type="bar" icon={BarChart3} />
            <AnalyticsChart title="Renewable Energy Adoption" type="line" icon={LineChart} />
            <AnalyticsChart title="Water Consumption by Region" type="pie" icon={PieChart} />
            <AnalyticsChart title="Waste Generation vs Recycling" type="bar" icon={BarChart3} />
          </div>
        </TabsContent>
        
        <TabsContent value="social" className="mt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <AnalyticsChart title="Workforce Diversity Metrics" type="pie" icon={PieChart} />
            <AnalyticsChart title="Employee Training Hours" type="line" icon={LineChart} />
            <AnalyticsChart title="Community Investment" type="bar" icon={BarChart3} />
            <AnalyticsChart title="Safety Incident Trends" type="line" icon={LineChart} />
          </div>
        </TabsContent>
        
        <TabsContent value="governance" className="mt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <AnalyticsChart title="Board Diversity & Independence" type="pie" icon={PieChart} />
            <AnalyticsChart title="Policy Compliance Score" type="bar" icon={BarChart3} />
            <AnalyticsChart title="Risk Assessment Matrix" type="radar" icon={BarChart3} />
            <AnalyticsChart title="Audit Completion Status" type="line" icon={LineChart} />
          </div>
        </TabsContent>
      </Tabs>

      {/* Export, Sharing & Quick Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Quick Actions & Export</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={handleExportDashboard}>
              <Download className="mr-2 h-4 w-4" />
              Export Dashboard (PDF)
            </Button>
            <Button variant="outline" size="sm">
              <Mail className="mr-2 h-4 w-4" />
              Email Report
            </Button>
            <Button variant="outline" size="sm">
              <Copy className="mr-2 h-4 w-4" />
              Copy Link
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Delivery
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="/analytics/explorer">
                <Search className="mr-2 h-4 w-4" />
                Drill Down Analysis
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
