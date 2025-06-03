'use client'

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { 
  Search, 
  Plus, 
  Filter, 
  Download, 
  FileText, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Edit,
  Users,
  Building2,
  Target,
  TrendingUp,
  BarChart3,
  ClipboardCheck
} from "lucide-react"

interface Audit {
  id: string
  title: string
  type: 'internal' | 'external' | 'regulatory' | 'certification'
  scope: string[]
  auditor: string
  auditorType: 'internal' | 'external'
  status: 'planned' | 'in-progress' | 'completed' | 'cancelled'
  startDate: string
  endDate?: string
  completedDate?: string
  progress: number
  findings: AuditFinding[]
  recommendations: number
  criticalFindings: number
  majorFindings: number
  minorFindings: number
  relatedRegulations: string[]
  facilities: string[]
  departments: string[]
}

interface AuditFinding {
  id: string
  title: string
  severity: 'critical' | 'major' | 'minor' | 'observation'
  category: 'environmental' | 'social' | 'governance'
  status: 'open' | 'in-progress' | 'closed' | 'verified'
  assignedTo?: string
  dueDate?: string
  description: string
  rootCause?: string
  corrective: string
}

const mockAudits: Audit[] = [
  {
    id: '1',
    title: 'Environmental Compliance Audit 2024',
    type: 'regulatory',
    scope: ['Environmental Management', 'Waste Management', 'Air Quality'],
    auditor: 'NEMA Certified Auditor',
    auditorType: 'external',
    status: 'in-progress',
    startDate: '2024-03-01',
    endDate: '2024-03-15',
    progress: 65,
    findings: [],
    recommendations: 8,
    criticalFindings: 1,
    majorFindings: 3,
    minorFindings: 4,
    relatedRegulations: ['EMCA 1999', 'Waste Management Regulations'],
    facilities: ['Manufacturing Plant A', 'Warehouse B'],
    departments: ['Operations', 'Environmental']
  },
  {
    id: '2',
    title: 'Occupational Health & Safety Audit',
    type: 'internal',
    scope: ['Workplace Safety', 'Training Records', 'Incident Management'],
    auditor: 'Internal Safety Team',
    auditorType: 'internal',
    status: 'completed',
    startDate: '2024-02-01',
    endDate: '2024-02-14',
    completedDate: '2024-02-14',
    progress: 100,
    findings: [],
    recommendations: 12,
    criticalFindings: 0,
    majorFindings: 2,
    minorFindings: 8,
    relatedRegulations: ['OSHA 2007'],
    facilities: ['Manufacturing Plant A', 'Office Building'],
    departments: ['Operations', 'HR', 'Maintenance']
  },
  {
    id: '3',
    title: 'Water Resource Management Audit',
    type: 'external',
    scope: ['Water Usage', 'Conservation Measures', 'Quality Testing'],
    auditor: 'AquaConsult Kenya',
    auditorType: 'external',
    status: 'planned',
    startDate: '2024-04-01',
    endDate: '2024-04-10',
    progress: 0,
    findings: [],
    recommendations: 0,
    criticalFindings: 0,
    majorFindings: 0,
    minorFindings: 0,
    relatedRegulations: ['Water Resources Management Act'],
    facilities: ['Manufacturing Plant A'],
    departments: ['Operations', 'Environmental']
  },
  {
    id: '4',
    title: 'Energy Management System Audit',
    type: 'certification',
    scope: ['Energy Efficiency', 'Management System', 'Documentation'],
    auditor: 'KEBS Energy Auditor',
    auditorType: 'external',
    status: 'completed',
    startDate: '2024-01-15',
    endDate: '2024-01-25',
    completedDate: '2024-01-25',
    progress: 100,
    findings: [],
    recommendations: 6,
    criticalFindings: 0,
    majorFindings: 1,
    minorFindings: 3,
    relatedRegulations: ['Energy Management Regulations'],
    facilities: ['Manufacturing Plant A', 'Office Building'],
    departments: ['Operations', 'Maintenance']
  }
]

const mockFindings: AuditFinding[] = [
  {
    id: '1',
    title: 'Inadequate Waste Segregation at Source',
    severity: 'major',
    category: 'environmental',
    status: 'open',
    assignedTo: 'Environmental Officer',
    dueDate: '2024-04-15',
    description: 'Waste segregation at source is not being properly implemented across all production areas.',
    rootCause: 'Lack of proper training and insufficient waste containers',
    corrective: 'Implement comprehensive training program and install adequate waste segregation containers'
  },
  {
    id: '2',
    title: 'Missing Safety Data Sheets for Chemicals',
    severity: 'critical',
    category: 'social',
    status: 'in-progress',
    assignedTo: 'Safety Manager',
    dueDate: '2024-03-30',
    description: 'Several chemicals in the storage area do not have accessible Safety Data Sheets.',
    rootCause: 'Incomplete procurement process documentation',
    corrective: 'Obtain and display all required SDS documents and update procurement procedures'
  },
  {
    id: '3',
    title: 'Incomplete Board Meeting Minutes',
    severity: 'minor',
    category: 'governance',
    status: 'closed',
    assignedTo: 'Company Secretary',
    description: 'Board meeting minutes for Q4 2023 lack sufficient detail on ESG discussions.',
    rootCause: 'Inadequate minute-taking template',
    corrective: 'Updated meeting minute template to include detailed ESG discussion sections'
  },
  {
    id: '4',
    title: 'Energy Consumption Monitoring Gaps',
    severity: 'major',
    category: 'environmental',
    status: 'open',
    assignedTo: 'Energy Manager',
    dueDate: '2024-04-30',
    description: 'Energy consumption data is not being collected from all metered equipment.',
    rootCause: 'Faulty meters and incomplete monitoring system',
    corrective: 'Repair/replace faulty meters and implement comprehensive monitoring system'
  }
]

export default function AuditManagementPage() {
  const [selectedTab, setSelectedTab] = useState('audits')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedSeverity, setSelectedSeverity] = useState('all')

  const filteredAudits = mockAudits.filter(audit => {
    const matchesSearch = audit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         audit.auditor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || audit.type === selectedType
    const matchesStatus = selectedStatus === 'all' || audit.status === selectedStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const filteredFindings = mockFindings.filter(finding => {
    const matchesSearch = finding.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         finding.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSeverity = selectedSeverity === 'all' || finding.severity === selectedSeverity
    return matchesSearch && matchesSeverity
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
      case 'planned':
        return <Badge className="bg-gray-100 text-gray-800">Planned</Badge>
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <Badge variant="destructive">Critical</Badge>
      case 'major':
        return <Badge className="bg-orange-100 text-orange-800">Major</Badge>
      case 'minor':
        return <Badge className="bg-yellow-100 text-yellow-800">Minor</Badge>
      case 'observation':
        return <Badge variant="outline">Observation</Badge>
      default:
        return <Badge variant="outline">{severity}</Badge>
    }
  }

  const getFindingStatusIcon = (status: string) => {
    switch (status) {
      case 'closed':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-600" />
      case 'open':
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <FileText className="h-4 w-4 text-gray-600" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'environmental':
        return '🌿'
      case 'social':
        return '👥'
      case 'governance':
        return '⚖️'
      default:
        return '📋'
    }
  }

  const stats = {
    totalAudits: mockAudits.length,
    activeAudits: mockAudits.filter(a => a.status === 'in-progress').length,
    completedAudits: mockAudits.filter(a => a.status === 'completed').length,
    totalFindings: mockFindings.length,
    openFindings: mockFindings.filter(f => f.status === 'open').length,
    criticalFindings: mockFindings.filter(f => f.severity === 'critical').length
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Audit Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Plan, conduct, and track compliance audits
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Reports
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Audit
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <ClipboardCheck className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Audits</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.totalAudits}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.activeAudits}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.completedAudits}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Target className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Findings</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.totalFindings}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Open Findings</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.openFindings}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-8 w-8 text-red-700" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Critical</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.criticalFindings}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="audits">Audit Plans</TabsTrigger>
          <TabsTrigger value="findings">Findings</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="audits" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Search className="h-5 w-5" />
                <span>Search & Filter Audits</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <Input
                    placeholder="Search audits, auditors, or scope..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="internal">Internal</SelectItem>
                    <SelectItem value="external">External</SelectItem>
                    <SelectItem value="regulatory">Regulatory</SelectItem>
                    <SelectItem value="certification">Certification</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="planned">Planned</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Audits List */}
          <div className="space-y-4">
            {filteredAudits.map((audit) => (
              <Card key={audit.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {audit.title}
                      </h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-blue-600 capitalize">{audit.type}</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{audit.auditor}</span>
                        {getStatusBadge(audit.status)}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Scope</h4>
                      <div className="flex flex-wrap gap-1">
                        {audit.scope.slice(0, 2).map((item, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                        {audit.scope.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{audit.scope.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Timeline</h4>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(audit.startDate).toLocaleDateString()}</span>
                        </div>
                        {audit.endDate && (
                          <div className="text-xs text-gray-500 mt-1">
                            to {new Date(audit.endDate).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Progress</h4>
                      <div className="space-y-2">
                        <Progress value={audit.progress} className="w-full" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{audit.progress}%</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Findings Summary</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-red-600">Critical:</span>
                          <span>{audit.criticalFindings}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-orange-600">Major:</span>
                          <span>{audit.majorFindings}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-yellow-600">Minor:</span>
                          <span>{audit.minorFindings}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Facilities</h4>
                      <div className="flex flex-wrap gap-1">
                        {audit.facilities.map((facility, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <Building2 className="h-3 w-3 mr-1" />
                            {facility}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Departments</h4>
                      <div className="flex flex-wrap gap-1">
                        {audit.departments.map((dept, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <Users className="h-3 w-3 mr-1" />
                            {dept}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="findings" className="space-y-6">
          {/* Findings Search and Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Search className="h-5 w-5" />
                <span>Search & Filter Findings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <Input
                    placeholder="Search findings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severities</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="major">Major</SelectItem>
                    <SelectItem value="minor">Minor</SelectItem>
                    <SelectItem value="observation">Observation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Findings List */}
          <div className="space-y-4">
            {filteredFindings.map((finding) => (
              <Card key={finding.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{getCategoryIcon(finding.category)}</div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {finding.title}
                        </h3>
                        <div className="flex items-center space-x-4 mt-1">
                          {getSeverityBadge(finding.severity)}
                          <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                            {finding.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        {getFindingStatusIcon(finding.status)}
                        <span className="text-sm capitalize">{finding.status.replace('-', ' ')}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Manage
                      </Button>
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {finding.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {finding.rootCause && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Root Cause</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {finding.rootCause}
                        </p>
                      </div>
                    )}

                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Corrective Action</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {finding.corrective}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-4">
                      {finding.assignedTo && (
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4" />
                          <span>Assigned to: {finding.assignedTo}</span>
                        </div>
                      )}
                      {finding.dueDate && (
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>Due: {new Date(finding.dueDate).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <Card>
            <CardContent className="p-8 text-center">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                Recommendations Management
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Track implementation of audit recommendations and corrective actions
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardContent className="p-8 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                Audit Reports
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Generate and manage comprehensive audit reports and certificates
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 