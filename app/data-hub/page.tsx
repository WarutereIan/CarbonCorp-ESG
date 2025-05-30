"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  Database, 
  FileUp, 
  Link, 
  Plus, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle, 
  XCircle,
  Settings,
  Download,
  Upload,
  Eye,
  Calendar,
  TrendingUp,
  BarChart3,
  Activity,
  Zap,
  Droplets,
  Recycle,
  Shield,
  Info,
  Search,
  Filter,
  FileText,
  AlertTriangle
} from "lucide-react"

// Mock data for demonstration
const dataSources = [
  {
    id: "quickbooks-api",
    name: "QuickBooks API",
    type: "API",
    description: "Financial data for Scope 1, 2, some Scope 3 calculations",
    status: "Connected",
    lastSync: "2024-01-15T10:23:00Z",
    nextSync: "2024-01-16T10:23:00Z",
    dataPoints: 1240,
    categories: ["Financial", "Emissions"]
  },
  {
    id: "hr-system",
    name: "HR System API",
    type: "API", 
    description: "Employee data, diversity metrics, training records",
    status: "Connected",
    lastSync: "2024-01-15T09:15:00Z",
    nextSync: "2024-01-16T09:15:00Z",
    dataPoints: 856,
    categories: ["Social", "Governance"]
  },
  {
    id: "energy-upload",
    name: "Monthly Energy Excel Upload",
    type: "Manual",
    description: "Energy consumption data from facilities",
    status: "Pending",
    lastSync: "2024-01-10T16:30:00Z",
    nextSync: null,
    dataPoints: 324,
    categories: ["Environmental", "Energy"]
  },
  {
    id: "facility-x-utility",
    name: "Facility X Utility Portal",
    type: "API",
    description: "Real-time utility consumption data",
    status: "Error",
    lastSync: "2024-01-14T08:45:00Z",
    nextSync: null,
    dataPoints: 0,
    categories: ["Environmental", "Energy", "Water"]
  },
  {
    id: "waste-management",
    name: "Waste Management System",
    type: "API",
    description: "Waste generation and disposal tracking",
    status: "Disconnected",
    lastSync: "2024-01-12T14:20:00Z",
    nextSync: null,
    dataPoints: 178,
    categories: ["Environmental", "Waste"]
  }
]

const dataQualityMetrics = {
  totalDataPoints: 2598,
  completenessScore: 87,
  qualityScore: 92,
  anomaliesDetected: 5,
  anomaliesResolved: 3,
  dataFreshness: {
    financial: "10 minutes ago",
    environmental: "2 hours ago", 
    social: "4 hours ago",
    governance: "1 day ago"
  }
}

const recentAnomalies = [
  {
    id: "anomaly-1",
    source: "Facility X Utility Portal",
    metric: "Water Usage",
    description: "20% spike in water usage detected",
    severity: "Medium",
    detected: "2024-01-15T08:30:00Z",
    status: "Under Review"
  },
  {
    id: "anomaly-2", 
    source: "Monthly Energy Excel Upload",
    metric: "Energy Consumption",
    description: "Missing data from 3 facilities for December",
    severity: "High",
    detected: "2024-01-14T16:45:00Z",
    status: "Resolved"
  }
]

const aiInsights = [
  "Data from 3 facilities for 'Water Usage' appears to be missing for the last reporting cycle.",
  "A 20% spike in 'Waste Generated' was observed from Facility X, review for accuracy.",
  "Energy consumption data quality has improved by 15% this month due to automated validation rules."
]

export default function DataHubPage() {
  const [selectedSource, setSelectedSource] = useState<string | null>(null)
  const [showDataLog, setShowDataLog] = useState(false)
  const router = useRouter()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Connected": return "bg-green-100 text-green-700 border-green-200"
      case "Pending": return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "Error": return "bg-red-100 text-red-700 border-red-200"
      case "Disconnected": return "bg-gray-100 text-gray-700 border-gray-200"
      default: return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Connected": return <CheckCircle className="h-4 w-4" />
      case "Pending": return <AlertCircle className="h-4 w-4" />
      case "Error": return <XCircle className="h-4 w-4" />
      case "Disconnected": return <XCircle className="h-4 w-4" />
      default: return <AlertCircle className="h-4 w-4" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Environmental": return <Droplets className="h-4 w-4 text-green-600" />
      case "Energy": return <Zap className="h-4 w-4 text-yellow-600" />
      case "Water": return <Droplets className="h-4 w-4 text-blue-600" />
      case "Waste": return <Recycle className="h-4 w-4 text-orange-600" />
      case "Social": return <Shield className="h-4 w-4 text-purple-600" />
      case "Governance": return <Shield className="h-4 w-4 text-indigo-600" />
      case "Financial": return <BarChart3 className="h-4 w-4 text-emerald-600" />
      default: return <Database className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Data Hub</h1>
          <p className="text-muted-foreground">
            Centralized ESG data collection, validation, and management
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.location.reload()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Data
          </Button>
          <Button onClick={() => router.push("/data-hub/import")}>
            <Plus className="mr-2 h-4 w-4" />
            Add Data Source
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Source Connectivity Dashboard */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>Source Connectivity Dashboard</span>
              </CardTitle>
              <CardDescription>
                Overview of all configured data sources and their connection status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dataSources.map((source) => (
                  <div key={source.id} className="flex items-center justify-between p-4 border rounded-lg hover:border-blue-300 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          {source.type === "API" ? (
                            <Link className="h-5 w-5 text-blue-600" />
                          ) : (
                            <FileUp className="h-5 w-5 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold">{source.name}</h4>
                          <p className="text-sm text-gray-600">{source.description}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Status:</span>
                          <div className={`inline-flex items-center space-x-1 ml-2 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(source.status)}`}>
                            {getStatusIcon(source.status)}
                            <span>{source.status}</span>
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500">Last Sync:</span>
                          <p className="text-gray-800">
                            {new Date(source.lastSync).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">Data Points:</span>
                          <p className="text-gray-800 font-medium">{source.dataPoints.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Categories:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {source.categories.map((category) => (
                              <div key={category} className="flex items-center space-x-1">
                                {getCategoryIcon(category)}
                                <span className="text-xs">{category}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2 ml-4">
                      {source.type === "API" ? (
                        <Button size="sm" variant="outline">
                          <Settings className="h-3 w-3 mr-1" />
                          Manage Connection
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline">
                          <Calendar className="h-3 w-3 mr-1" />
                          Configure Upload
                        </Button>
                      )}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="ghost">
                            <Eye className="h-3 w-3 mr-1" />
                            View Data Log
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>Data Log: {source.name}</DialogTitle>
                            <DialogDescription>
                              Raw data logs for troubleshooting and detailed inspection
                            </DialogDescription>
                          </DialogHeader>
                          <div className="max-h-96 overflow-auto">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Timestamp</TableHead>
                                  <TableHead>Event</TableHead>
                                  <TableHead>Status</TableHead>
                                  <TableHead>Records</TableHead>
                                  <TableHead>Details</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell>2024-01-15 10:23</TableCell>
                                  <TableCell>Data Sync</TableCell>
                                  <TableCell>
                                    <Badge variant="default">Success</Badge>
                                  </TableCell>
                                  <TableCell>145 records</TableCell>
                                  <TableCell>Financial transactions imported</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>2024-01-15 09:15</TableCell>
                                  <TableCell>Data Validation</TableCell>
                                  <TableCell>
                                    <Badge variant="outline">Warning</Badge>
                                  </TableCell>
                                  <TableCell>12 anomalies</TableCell>
                                  <TableCell>Value ranges exceeded for 12 records</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>2024-01-15 08:30</TableCell>
                                  <TableCell>Connection Test</TableCell>
                                  <TableCell>
                                    <Badge variant="default">Success</Badge>
                                  </TableCell>
                                  <TableCell>-</TableCell>
                                  <TableCell>API endpoint accessible</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Aggregated Data Overview & Quality Insights Pane */}
        <div className="space-y-6">
          {/* Data Quality Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Data Quality Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {dataQualityMetrics.totalDataPoints.toLocaleString()}
                  </div>
                  <p className="text-sm text-gray-600">Total Data Points</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {dataQualityMetrics.completenessScore}%
                  </div>
                  <p className="text-sm text-gray-600">Completeness</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Data Quality Score</span>
                  <span>{dataQualityMetrics.qualityScore}%</span>
                </div>
                <Progress value={dataQualityMetrics.qualityScore} className="h-2" />
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Data Freshness</h4>
                {Object.entries(dataQualityMetrics.dataFreshness).map(([category, time]) => (
                  <div key={category} className="flex justify-between text-sm">
                    <span className="capitalize">{category}:</span>
                    <span className="text-gray-600">{time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Anomalies & Issues */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Data Anomalies</span>
                </div>
                <Badge variant="outline">
                  {dataQualityMetrics.anomaliesDetected - dataQualityMetrics.anomaliesResolved} Active
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentAnomalies.slice(0, 3).map((anomaly) => (
                  <div key={anomaly.id} className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h5 className="font-medium text-sm">{anomaly.metric}</h5>
                        <p className="text-xs text-gray-600 mb-1">{anomaly.source}</p>
                        <p className="text-sm">{anomaly.description}</p>
                      </div>
                      <Badge 
                        variant={anomaly.severity === "High" ? "destructive" : "outline"}
                        className="ml-2"
                      >
                        {anomaly.severity}
                      </Badge>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full" onClick={() => router.push("/data-hub/quality")}>
                  View All Anomalies
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>AI Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {aiInsights.map((insight, index) => (
                  <Alert key={index}>
                    <Info className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      {insight}
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Data Volume Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Data Flow Overview</CardTitle>
          <CardDescription>
            Visual representation of data volume by source and category over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">2,340</div>
              <p className="text-sm text-gray-600">Environmental Data Points</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: "90%" }}></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">1,856</div>
              <p className="text-sm text-gray-600">Social Data Points</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: "75%" }}></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">1,240</div>
              <p className="text-sm text-gray-600">Governance Data Points</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: "60%" }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Button variant="outline" className="h-20 flex-col" onClick={() => router.push("/data-hub/import")}>
          <Upload className="h-6 w-6 mb-2" />
          Import Data
        </Button>
        <Button variant="outline" className="h-20 flex-col" onClick={() => router.push("/data-hub/quality")}>
          <Shield className="h-6 w-6 mb-2" />
          Data Quality
        </Button>
        <Button variant="outline" className="h-20 flex-col" onClick={() => router.push("/data-hub/audit")}>
          <FileText className="h-6 w-6 mb-2" />
          Audit Trail
        </Button>
        <Button variant="outline" className="h-20 flex-col" onClick={() => router.push("/data-hub/templates")}>
          <Database className="h-6 w-6 mb-2" />
          ESG Templates
        </Button>
      </div>
    </div>
  )
}
