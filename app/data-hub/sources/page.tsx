"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  Database, 
  FileUp, 
  Link, 
  Plus, 
  RefreshCw, 
  CheckCircle, 
  XCircle,
  Settings,
  Calendar,
  Eye,
  Search,
  Filter,
  ArrowLeft,
  AlertCircle,
  Zap,
  Droplets,
  Recycle,
  Shield,
  BarChart3,
  Download,
  Upload
} from "lucide-react"

// Mock data for data sources
const dataSources = [
  {
    id: "quickbooks-api",
    name: "QuickBooks API",
    type: "API",
    category: "Financial",
    description: "Financial data for Scope 1, 2, some Scope 3 calculations",
    status: "Connected",
    lastSync: "2024-01-15T10:23:00Z",
    nextSync: "2024-01-16T10:23:00Z",
    dataPoints: 1240,
    errorCount: 0,
    configuredBy: "John Doe",
    frequency: "Daily",
    dataTypes: ["Financial Transactions", "Account Balances", "Cost Centers"]
  },
  {
    id: "hr-system",
    name: "HR System API",
    type: "API",
    category: "Social", 
    description: "Employee data, diversity metrics, training records",
    status: "Connected",
    lastSync: "2024-01-15T09:15:00Z",
    nextSync: "2024-01-16T09:15:00Z",
    dataPoints: 856,
    errorCount: 2,
    configuredBy: "Jane Smith",
    frequency: "Daily",
    dataTypes: ["Employee Demographics", "Training Records", "Performance Data"]
  },
  {
    id: "energy-upload",
    name: "Monthly Energy Excel Upload",
    type: "Manual",
    category: "Environmental",
    description: "Energy consumption data from facilities",
    status: "Pending",
    lastSync: "2024-01-10T16:30:00Z",
    nextSync: null,
    dataPoints: 324,
    errorCount: 0,
    configuredBy: "Mike Johnson",
    frequency: "Monthly",
    dataTypes: ["Electricity Consumption", "Natural Gas Usage", "Renewable Energy"]
  },
  {
    id: "facility-x-utility",
    name: "Facility X Utility Portal",
    type: "API",
    category: "Environmental",
    description: "Real-time utility consumption data",
    status: "Error",
    lastSync: "2024-01-14T08:45:00Z",
    nextSync: null,
    dataPoints: 0,
    errorCount: 5,
    configuredBy: "Sarah Lee",
    frequency: "Hourly",
    dataTypes: ["Electricity", "Water", "Gas"]
  },
  {
    id: "waste-management",
    name: "Waste Management System",
    type: "API",
    category: "Environmental",
    description: "Waste generation and disposal tracking",
    status: "Disconnected",
    lastSync: "2024-01-12T14:20:00Z",
    nextSync: null,
    dataPoints: 178,
    errorCount: 1,
    configuredBy: "Tom Wilson",
    frequency: "Weekly",
    dataTypes: ["Waste Generation", "Recycling Data", "Disposal Methods"]
  }
]

export default function DataSourcesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const router = useRouter()

  const filteredSources = dataSources.filter(source => {
    const matchesSearch = source.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         source.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || source.status.toLowerCase() === statusFilter
    const matchesType = typeFilter === "all" || source.type.toLowerCase() === typeFilter
    
    return matchesSearch && matchesStatus && matchesType
  })

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
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => router.push("/data-hub")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Data Hub
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Data Sources</h1>
            <p className="text-muted-foreground">
              Manage all connected data sources and manual upload channels
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.location.reload()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh All
          </Button>
          <Button onClick={() => router.push("/data-hub/sources/new")}>
            <Plus className="mr-2 h-4 w-4" />
            Add Data Source
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filter & Search</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search data sources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="connected">Connected</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="disconnected">Disconnected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="api">API Sources</SelectItem>
                <SelectItem value="manual">Manual Uploads</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => {
              setSearchTerm("")
              setStatusFilter("all")
              setTypeFilter("all")
            }}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Sources Table */}
      <Card>
        <CardHeader>
          <CardTitle>Data Sources Overview</CardTitle>
          <CardDescription>
            {filteredSources.length} of {dataSources.length} data sources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Sync</TableHead>
                <TableHead>Data Points</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSources.map((source) => (
                <TableRow key={source.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        {getCategoryIcon(source.category)}
                      </div>
                      <div>
                        <div className="font-medium">{source.name}</div>
                        <div className="text-sm text-gray-500">{source.category}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {source.type === "API" ? (
                        <Link className="h-4 w-4 text-blue-600" />
                      ) : (
                        <FileUp className="h-4 w-4 text-orange-600" />
                      )}
                      <span>{source.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(source.status)}`}>
                      {getStatusIcon(source.status)}
                      <span>{source.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(source.lastSync).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(source.lastSync).toLocaleTimeString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{source.dataPoints.toLocaleString()}</div>
                    {source.errorCount > 0 && (
                      <div className="text-xs text-red-600">{source.errorCount} errors</div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{source.frequency}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {source.type === "API" ? (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Settings className="h-3 w-3 mr-1" />
                              Manage
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Manage API Connection: {source.name}</DialogTitle>
                              <DialogDescription>
                                View details, re-authenticate, or disable this API connection
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Connection Status</label>
                                  <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border mt-1 ${getStatusColor(source.status)}`}>
                                    {getStatusIcon(source.status)}
                                    <span>{source.status}</span>
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Sync Frequency</label>
                                  <p className="text-sm text-gray-600 mt-1">{source.frequency}</p>
                                </div>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Data Types Collected</label>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {source.dataTypes.map((type) => (
                                    <Badge key={type} variant="outline">{type}</Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="flex space-x-2 pt-4">
                                <Button variant="outline">
                                  <RefreshCw className="h-4 w-4 mr-2" />
                                  Test Connection
                                </Button>
                                <Button variant="outline">
                                  <Settings className="h-4 w-4 mr-2" />
                                  Edit Configuration
                                </Button>
                                <Button variant="destructive">
                                  Disable Connection
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      ) : (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Calendar className="h-3 w-3 mr-1" />
                              Configure
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Configure Upload: {source.name}</DialogTitle>
                              <DialogDescription>
                                Manage upload schedule and template configuration
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <label className="text-sm font-medium">Upload Template</label>
                                <p className="text-sm text-gray-600 mt-1">
                                  Standardized Excel template for {source.category.toLowerCase()} data
                                </p>
                                <Button variant="outline" size="sm" className="mt-2">
                                  <Download className="h-4 w-4 mr-2" />
                                  Download Template
                                </Button>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Expected Upload Frequency</label>
                                <p className="text-sm text-gray-600 mt-1">{source.frequency}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Data Types Expected</label>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {source.dataTypes.map((type) => (
                                    <Badge key={type} variant="outline">{type}</Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="flex space-x-2 pt-4">
                                <Button>
                                  <Upload className="h-4 w-4 mr-2" />
                                  Upload New Data
                                </Button>
                                <Button variant="outline">
                                  <Settings className="h-4 w-4 mr-2" />
                                  Edit Configuration
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="ghost">
                            <Eye className="h-3 w-3 mr-1" />
                            View Log
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>Data Log: {source.name}</DialogTitle>
                            <DialogDescription>
                              Detailed activity log for troubleshooting and monitoring
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
                                  <TableCell>Automatic sync completed successfully</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>2024-01-15 09:15</TableCell>
                                  <TableCell>Validation</TableCell>
                                  <TableCell>
                                    <Badge variant="outline">Warning</Badge>
                                  </TableCell>
                                  <TableCell>12 issues</TableCell>
                                  <TableCell>Data validation warnings detected</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>2024-01-15 08:30</TableCell>
                                  <TableCell>Connection Test</TableCell>
                                  <TableCell>
                                    <Badge variant="default">Success</Badge>
                                  </TableCell>
                                  <TableCell>-</TableCell>
                                  <TableCell>API endpoint responding normally</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">
              {dataSources.filter(s => s.status === "Connected").length}
            </div>
            <p className="text-sm text-gray-600">Connected Sources</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">
              {dataSources.filter(s => s.status === "Pending").length}
            </div>
            <p className="text-sm text-gray-600">Pending Sources</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">
              {dataSources.filter(s => s.status === "Error").length}
            </div>
            <p className="text-sm text-gray-600">Error Sources</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">
              {dataSources.reduce((sum, s) => sum + s.dataPoints, 0).toLocaleString()}
            </div>
            <p className="text-sm text-gray-600">Total Data Points</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 