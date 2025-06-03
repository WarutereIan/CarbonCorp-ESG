"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { 
  ArrowLeft, 
  FileText, 
  Download, 
  Search, 
  Filter, 
  Eye,
  User,
  Calendar as CalendarIcon,
  Clock,
  Shield,
  Database,
  Edit,
  Plus,
  Trash2,
  Upload,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Info,
  Settings,
  Globe,
  HardDrive,
  MoreHorizontal,
  ChevronDown,
  ExternalLink,
  Copy
} from "lucide-react"

interface AuditEntry {
  id: string
  timestamp: string
  userId: string
  userName: string
  userEmail: string
  userAvatar?: string
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'IMPORT' | 'EXPORT' | 'VIEW' | 'DOWNLOAD'
  resourceType: 'DATA_POINT' | 'DATASET' | 'TEMPLATE' | 'REPORT' | 'USER' | 'SYSTEM'
  resourceId: string
  resourceName: string
  dataCategory: 'ENVIRONMENTAL' | 'SOCIAL' | 'GOVERNANCE' | 'FINANCIAL' | 'OPERATIONAL'
  description: string
  details: {
    beforeValue?: any
    afterValue?: any
    changes?: string[]
    metadata?: Record<string, any>
  }
  ipAddress: string
  userAgent: string
  systemNotes?: string[]
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  source: 'USER' | 'SYSTEM' | 'API' | 'IMPORT' | 'SCHEDULED'
  sessionId: string
}

interface FilterState {
  dateRange: { from?: Date; to?: Date }
  userId: string
  dataCategory: string
  actionType: string
  resourceType: string
  severity: string
  source: string
  searchQuery: string
}

export default function DataAuditPage() {
  const router = useRouter()
  const [auditEntries, setAuditEntries] = useState<AuditEntry[]>([])
  const [filteredEntries, setFilteredEntries] = useState<AuditEntry[]>([])
  const [selectedEntry, setSelectedEntry] = useState<AuditEntry | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState<FilterState>({
    dateRange: {},
    userId: 'all',
    dataCategory: 'all',
    actionType: 'all',
    resourceType: 'all',
    severity: 'all',
    source: 'all',
    searchQuery: ''
  })

  // Initialize mock audit data
  useEffect(() => {
    initializeMockData()
  }, [])

  // Apply filters whenever filter state changes
  useEffect(() => {
    applyFilters()
  }, [filters, auditEntries])

  const initializeMockData = () => {
    const mockEntries: AuditEntry[] = [
      {
        id: '1',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        userId: 'user-1',
        userName: 'Sarah Chen',
        userEmail: 'sarah.chen@company.com',
        action: 'UPDATE',
        resourceType: 'DATA_POINT',
        resourceId: 'energy-001',
        resourceName: 'Monthly Energy Consumption - Facility A',
        dataCategory: 'ENVIRONMENTAL',
        description: 'Updated energy consumption value for January 2024',
        details: {
          beforeValue: { value: 45000, unit: 'kWh' },
          afterValue: { value: 47500, unit: 'kWh' },
          changes: ['Value changed from 45,000 kWh to 47,500 kWh'],
          metadata: { facility: 'Facility A', month: 'January 2024' }
        },
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        systemNotes: ['Data quality validation passed', 'Automatic backup created'],
        severity: 'MEDIUM',
        source: 'USER',
        sessionId: 'session-001'
      },
      {
        id: '2',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        userId: 'user-2',
        userName: 'Marcus Johnson',
        userEmail: 'marcus.j@company.com',
        action: 'IMPORT',
        resourceType: 'DATASET',
        resourceId: 'import-batch-2024-001',
        resourceName: 'Q1 2024 Employee Diversity Data',
        dataCategory: 'SOCIAL',
        description: 'Imported employee diversity metrics from HR system',
        details: {
          metadata: { 
            recordsImported: 1250,
            source: 'HRIS-System',
            fileFormat: 'CSV',
            validationErrors: 0
          }
        },
        ipAddress: '192.168.1.105',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        systemNotes: ['Data validation completed successfully', 'All records processed without errors'],
        severity: 'LOW',
        source: 'IMPORT',
        sessionId: 'session-002'
      },
      {
        id: '3',
        timestamp: new Date(Date.now() - 14400000).toISOString(),
        userId: 'system',
        userName: 'System Automation',
        userEmail: 'system@company.com',
        action: 'CREATE',
        resourceType: 'DATA_POINT',
        resourceId: 'carbon-calc-001',
        resourceName: 'Calculated Scope 2 Emissions - March 2024',
        dataCategory: 'ENVIRONMENTAL',
        description: 'Automatically calculated Scope 2 emissions based on energy consumption data',
        details: {
          afterValue: { value: 23.4, unit: 'tCO2e' },
          metadata: { 
            calculationMethod: 'Location-based',
            emissionFactor: 0.492,
            sourceData: 'energy-consumption-march-2024'
          }
        },
        ipAddress: '127.0.0.1',
        userAgent: 'System/1.0 Carbon Calculator Service',
        systemNotes: ['Automatic calculation triggered by data update', 'Used latest emission factors'],
        severity: 'LOW',
        source: 'SYSTEM',
        sessionId: 'auto-session-001'
      },
      {
        id: '4',
        timestamp: new Date(Date.now() - 21600000).toISOString(),
        userId: 'user-3',
        userName: 'Dr. Aisha Patel',
        userEmail: 'aisha.patel@company.com',
        action: 'DELETE',
        resourceType: 'DATA_POINT',
        resourceId: 'waste-002',
        resourceName: 'Incorrect Waste Generation Entry',
        dataCategory: 'ENVIRONMENTAL',
        description: 'Removed duplicate waste generation entry identified during data quality review',
        details: {
          beforeValue: { value: 150, unit: 'kg', date: '2024-03-15' },
          metadata: { reason: 'Duplicate entry - original preserved' }
        },
        ipAddress: '192.168.1.112',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        systemNotes: ['Data quality rule violation detected', 'Approved by data steward'],
        severity: 'HIGH',
        source: 'USER',
        sessionId: 'session-003'
      },
      {
        id: '5',
        timestamp: new Date(Date.now() - 28800000).toISOString(),
        userId: 'user-1',
        userName: 'Sarah Chen',
        userEmail: 'sarah.chen@company.com',
        action: 'EXPORT',
        resourceType: 'REPORT',
        resourceId: 'report-q1-2024',
        resourceName: 'Q1 2024 ESG Performance Report',
        dataCategory: 'GOVERNANCE',
        description: 'Exported ESG performance report for board review',
        details: {
          metadata: { 
            format: 'PDF',
            recipients: ['board@company.com'],
            pageCount: 45
          }
        },
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        systemNotes: ['Digital signature applied', 'Audit trail entry created'],
        severity: 'MEDIUM',
        source: 'USER',
        sessionId: 'session-004'
      }
    ]

    setAuditEntries(mockEntries)
    setIsLoading(false)
  }

  const applyFilters = () => {
    let filtered = [...auditEntries]

    // Date range filter
    if (filters.dateRange.from) {
      filtered = filtered.filter(entry => new Date(entry.timestamp) >= filters.dateRange.from!)
    }
    if (filters.dateRange.to) {
      filtered = filtered.filter(entry => new Date(entry.timestamp) <= filters.dateRange.to!)
    }

    // User filter
    if (filters.userId !== 'all') {
      filtered = filtered.filter(entry => entry.userId === filters.userId)
    }

    // Data category filter
    if (filters.dataCategory !== 'all') {
      filtered = filtered.filter(entry => entry.dataCategory === filters.dataCategory)
    }

    // Action type filter
    if (filters.actionType !== 'all') {
      filtered = filtered.filter(entry => entry.action === filters.actionType)
    }

    // Resource type filter
    if (filters.resourceType !== 'all') {
      filtered = filtered.filter(entry => entry.resourceType === filters.resourceType)
    }

    // Severity filter
    if (filters.severity !== 'all') {
      filtered = filtered.filter(entry => entry.severity === filters.severity)
    }

    // Source filter
    if (filters.source !== 'all') {
      filtered = filtered.filter(entry => entry.source === filters.source)
    }

    // Search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter(entry => 
        entry.description.toLowerCase().includes(query) ||
        entry.resourceName.toLowerCase().includes(query) ||
        entry.userName.toLowerCase().includes(query) ||
        entry.userEmail.toLowerCase().includes(query)
      )
    }

    setFilteredEntries(filtered)
  }

  const handleExportAuditLog = () => {
    // In a real implementation, this would generate and download a file
    console.log('Exporting audit log with filters:', filters)
    alert('Audit log export functionality would be implemented here')
  }

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'CREATE': return <Plus className="h-4 w-4 text-green-600" />
      case 'UPDATE': return <Edit className="h-4 w-4 text-blue-600" />
      case 'DELETE': return <Trash2 className="h-4 w-4 text-red-600" />
      case 'IMPORT': return <Upload className="h-4 w-4 text-purple-600" />
      case 'EXPORT': return <Download className="h-4 w-4 text-orange-600" />
      case 'VIEW': return <Eye className="h-4 w-4 text-gray-600" />
      default: return <Settings className="h-4 w-4 text-gray-600" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'bg-red-100 text-red-800 border-red-200'
      case 'HIGH': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'LOW': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'USER': return <User className="h-4 w-4" />
      case 'SYSTEM': return <HardDrive className="h-4 w-4" />
      case 'API': return <Globe className="h-4 w-4" />
      case 'IMPORT': return <Upload className="h-4 w-4" />
      case 'SCHEDULED': return <Clock className="h-4 w-4" />
      default: return <Settings className="h-4 w-4" />
    }
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  const getUniqueUsers = () => {
    const users = auditEntries.reduce((acc, entry) => {
      if (!acc.find(u => u.id === entry.userId)) {
        acc.push({
          id: entry.userId,
          name: entry.userName,
          email: entry.userEmail
        })
      }
      return acc
    }, [] as Array<{id: string, name: string, email: string}>)
    return users
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
            <h1 className="text-2xl font-bold tracking-tight">Data Audit Trail</h1>
            <p className="text-muted-foreground">
              Comprehensive logging and tracking of all data activities for transparency and governance
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportAuditLog}>
            <Download className="mr-2 h-4 w-4" />
            Export Audit Log
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Audit Trail Filters
          </CardTitle>
          <CardDescription>
            Filter audit entries by date, user, category, action type, and more
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search activities..."
                  value={filters.searchQuery}
                  onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>

            {/* User Filter */}
            <div className="space-y-2">
              <Label>User</Label>
              <Select value={filters.userId} onValueChange={(value) => setFilters(prev => ({ ...prev, userId: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="All users" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  {getUniqueUsers().map(user => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Data Category Filter */}
            <div className="space-y-2">
              <Label>Data Category</Label>
              <Select value={filters.dataCategory} onValueChange={(value) => setFilters(prev => ({ ...prev, dataCategory: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="ENVIRONMENTAL">Environmental</SelectItem>
                  <SelectItem value="SOCIAL">Social</SelectItem>
                  <SelectItem value="GOVERNANCE">Governance</SelectItem>
                  <SelectItem value="FINANCIAL">Financial</SelectItem>
                  <SelectItem value="OPERATIONAL">Operational</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Action Type Filter */}
            <div className="space-y-2">
              <Label>Action Type</Label>
              <Select value={filters.actionType} onValueChange={(value) => setFilters(prev => ({ ...prev, actionType: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="All actions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="CREATE">Create</SelectItem>
                  <SelectItem value="UPDATE">Update</SelectItem>
                  <SelectItem value="DELETE">Delete</SelectItem>
                  <SelectItem value="IMPORT">Import</SelectItem>
                  <SelectItem value="EXPORT">Export</SelectItem>
                  <SelectItem value="VIEW">View</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {/* Resource Type Filter */}
            <div className="space-y-2">
              <Label>Resource Type</Label>
              <Select value={filters.resourceType} onValueChange={(value) => setFilters(prev => ({ ...prev, resourceType: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="All resources" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Resources</SelectItem>
                  <SelectItem value="DATA_POINT">Data Point</SelectItem>
                  <SelectItem value="DATASET">Dataset</SelectItem>
                  <SelectItem value="TEMPLATE">Template</SelectItem>
                  <SelectItem value="REPORT">Report</SelectItem>
                  <SelectItem value="USER">User</SelectItem>
                  <SelectItem value="SYSTEM">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Severity Filter */}
            <div className="space-y-2">
              <Label>Severity</Label>
              <Select value={filters.severity} onValueChange={(value) => setFilters(prev => ({ ...prev, severity: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="All severities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="CRITICAL">Critical</SelectItem>
                  <SelectItem value="HIGH">High</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="LOW">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Source Filter */}
            <div className="space-y-2">
              <Label>Source</Label>
              <Select value={filters.source} onValueChange={(value) => setFilters(prev => ({ ...prev, source: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="All sources" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="USER">User Action</SelectItem>
                  <SelectItem value="SYSTEM">System</SelectItem>
                  <SelectItem value="API">API</SelectItem>
                  <SelectItem value="IMPORT">Import</SelectItem>
                  <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {filteredEntries.length} of {auditEntries.length} audit entries
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setFilters({
                dateRange: {},
                userId: 'all',
                dataCategory: 'all',
                actionType: 'all',
                resourceType: 'all',
                severity: 'all',
                source: 'all',
                searchQuery: ''
              })}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Audit Entries List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Audit Activities
          </CardTitle>
          <CardDescription>
            Detailed log of all data-related activities and changes
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="h-6 w-6 animate-spin mr-2" />
              Loading audit entries...
            </div>
          ) : filteredEntries.length === 0 ? (
            <div className="text-center py-8">
              <Database className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">No audit entries found</h3>
              <p className="text-gray-600">
                Try adjusting your filters or check back later for new activities.
              </p>
            </div>
          ) : (
            <ScrollArea className="h-96">
              <div className="space-y-4">
                {filteredEntries.map((entry) => (
                  <div key={entry.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="flex items-center space-x-2">
                          {getActionIcon(entry.action)}
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={entry.userAvatar} />
                            <AvatarFallback>
                              {entry.userName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
              </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium text-sm">{entry.description}</h4>
                            <Badge variant="outline" className={getSeverityColor(entry.severity)}>
                              {entry.severity}
                            </Badge>
              </div>

                          <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-2">
                            <span className="flex items-center space-x-1">
                              <User className="h-3 w-3" />
                              <span>{entry.userName}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{formatTimestamp(entry.timestamp)}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              {getSourceIcon(entry.source)}
                              <span>{entry.source}</span>
                            </span>
              </div>

                          <div className="flex items-center space-x-2 text-xs">
                            <Badge variant="secondary">{entry.resourceType}</Badge>
                            <Badge variant="outline">{entry.dataCategory}</Badge>
                            <span className="text-muted-foreground">
                              Resource: {entry.resourceName}
                            </span>
                          </div>
              </div>
            </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedEntry(entry)
                          setIsDetailDialogOpen(true)
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
            </div>
          </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      {/* Detailed View Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Audit Entry Details
            </DialogTitle>
            <DialogDescription>
              Complete information about this audit activity
            </DialogDescription>
          </DialogHeader>
          
          {selectedEntry && (
            <div className="space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">ACTION</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        {getActionIcon(selectedEntry.action)}
                        <span className="font-medium">{selectedEntry.action}</span>
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">TIMESTAMP</Label>
                      <p className="mt-1">{formatTimestamp(selectedEntry.timestamp)}</p>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">RESOURCE TYPE</Label>
                      <p className="mt-1">{selectedEntry.resourceType}</p>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">DATA CATEGORY</Label>
                      <p className="mt-1">{selectedEntry.dataCategory}</p>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-xs font-medium text-muted-foreground">DESCRIPTION</Label>
                    <p className="mt-1">{selectedEntry.description}</p>
                  </div>
                  
                  <div>
                    <Label className="text-xs font-medium text-muted-foreground">RESOURCE</Label>
                    <p className="mt-1">{selectedEntry.resourceName} (ID: {selectedEntry.resourceId})</p>
                  </div>
                </CardContent>
              </Card>

              {/* User Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">User Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={selectedEntry.userAvatar} />
                      <AvatarFallback>
                        {selectedEntry.userName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{selectedEntry.userName}</p>
                      <p className="text-sm text-muted-foreground">{selectedEntry.userEmail}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">IP ADDRESS</Label>
                      <p className="mt-1">{selectedEntry.ipAddress}</p>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">SESSION ID</Label>
                      <p className="mt-1">{selectedEntry.sessionId}</p>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-xs font-medium text-muted-foreground">USER AGENT</Label>
                    <p className="mt-1 text-sm break-all">{selectedEntry.userAgent}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Change Details */}
              {(selectedEntry.details.beforeValue || selectedEntry.details.afterValue) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Change Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedEntry.details.beforeValue && (
                      <div>
                        <Label className="text-xs font-medium text-muted-foreground">BEFORE</Label>
                        <pre className="mt-1 p-3 bg-muted/50 rounded text-sm overflow-x-auto">
                          {JSON.stringify(selectedEntry.details.beforeValue, null, 2)}
                        </pre>
                      </div>
                    )}
                    
                    {selectedEntry.details.afterValue && (
                      <div>
                        <Label className="text-xs font-medium text-muted-foreground">AFTER</Label>
                        <pre className="mt-1 p-3 bg-muted/50 rounded text-sm overflow-x-auto">
                          {JSON.stringify(selectedEntry.details.afterValue, null, 2)}
                        </pre>
                      </div>
                    )}
                    
                    {selectedEntry.details.changes && selectedEntry.details.changes.length > 0 && (
                      <div>
                        <Label className="text-xs font-medium text-muted-foreground">CHANGES</Label>
                        <ul className="mt-1 space-y-1">
                          {selectedEntry.details.changes.map((change, index) => (
                            <li key={index} className="text-sm flex items-center space-x-2">
                              <CheckCircle className="h-3 w-3 text-green-600" />
                              <span>{change}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* System Notes */}
              {selectedEntry.systemNotes && selectedEntry.systemNotes.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">System Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {selectedEntry.systemNotes.map((note, index) => (
                        <li key={index} className="text-sm flex items-center space-x-2">
                          <Info className="h-3 w-3 text-blue-600" />
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Metadata */}
              {selectedEntry.details.metadata && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Additional Metadata</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="p-3 bg-muted/50 rounded text-sm overflow-x-auto">
                      {JSON.stringify(selectedEntry.details.metadata, null, 2)}
                    </pre>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
} 