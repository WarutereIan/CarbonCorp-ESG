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
  Upload,
  ExternalLink,
  BookOpen,
  Settings,
  Workflow,
  Archive
} from "lucide-react"

interface Policy {
  id: string
  title: string
  code: string
  category: 'environmental' | 'social' | 'governance'
  type: 'operational' | 'strategic' | 'procedural' | 'guidelines'
  status: 'draft' | 'under-review' | 'approved' | 'expired' | 'archived'
  version: string
  owner: string
  approver?: string
  effectiveDate: string
  reviewDate: string
  expiryDate?: string
  description: string
  scope: string[]
  relatedRegulations: string[]
  departments: string[]
  documents: PolicyDocument[]
  reviewHistory: PolicyReview[]
  compliance: 'compliant' | 'needs-review' | 'non-compliant'
}

interface PolicyDocument {
  id: string
  name: string
  type: 'main' | 'procedure' | 'form' | 'template'
  version: string
  uploadDate: string
  size: string
}

interface PolicyReview {
  id: string
  reviewDate: string
  reviewer: string
  status: 'approved' | 'rejected' | 'needs-changes'
  comments?: string
}

const mockPolicies: Policy[] = [
  {
    id: '1',
    title: 'Environmental Management Policy',
    code: 'EMP-001',
    category: 'environmental',
    type: 'strategic',
    status: 'approved',
    version: '2.1',
    owner: 'Environmental Manager',
    approver: 'CEO',
    effectiveDate: '2024-01-01',
    reviewDate: '2024-12-31',
    expiryDate: '2026-12-31',
    description: 'Comprehensive environmental management policy covering waste management, emissions control, and resource conservation.',
    scope: ['All Operations', 'Manufacturing', 'Facilities'],
    relatedRegulations: ['EMCA 1999', 'Waste Management Regulations'],
    departments: ['Operations', 'Environmental', 'Management'],
    documents: [
      {
        id: '1',
        name: 'Environmental Management Policy v2.1.pdf',
        type: 'main',
        version: '2.1',
        uploadDate: '2024-01-01',
        size: '2.3 MB'
      },
      {
        id: '2',
        name: 'EMP Implementation Procedure.pdf',
        type: 'procedure',
        version: '1.0',
        uploadDate: '2024-01-01',
        size: '1.8 MB'
      }
    ],
    reviewHistory: [],
    compliance: 'compliant'
  },
  {
    id: '2',
    title: 'Occupational Health and Safety Policy',
    code: 'OSH-001',
    category: 'social',
    type: 'operational',
    status: 'under-review',
    version: '1.3',
    owner: 'Safety Manager',
    effectiveDate: '2023-06-01',
    reviewDate: '2024-06-01',
    description: 'Policy covering workplace safety, employee health, emergency procedures, and incident management.',
    scope: ['All Employees', 'Contractors', 'Visitors'],
    relatedRegulations: ['OSHA 2007', 'Public Health Act'],
    departments: ['HR', 'Operations', 'Maintenance'],
    documents: [
      {
        id: '3',
        name: 'OSH Policy v1.3.pdf',
        type: 'main',
        version: '1.3',
        uploadDate: '2023-06-01',
        size: '1.9 MB'
      }
    ],
    reviewHistory: [
      {
        id: '1',
        reviewDate: '2024-03-01',
        reviewer: 'Legal Team',
        status: 'needs-changes',
        comments: 'Update emergency contact procedures and add new safety protocols'
      }
    ],
    compliance: 'needs-review'
  },
  {
    id: '3',
    title: 'Code of Ethics and Business Conduct',
    code: 'ETH-001',
    category: 'governance',
    type: 'strategic',
    status: 'approved',
    version: '3.0',
    owner: 'Company Secretary',
    approver: 'Board of Directors',
    effectiveDate: '2024-02-01',
    reviewDate: '2025-02-01',
    description: 'Comprehensive code of ethics covering anti-corruption, conflicts of interest, and business conduct standards.',
    scope: ['All Employees', 'Board Members', 'Contractors'],
    relatedRegulations: ['CMA Code of Corporate Governance', 'Ethics and Anti-Corruption Act'],
    departments: ['All Departments'],
    documents: [
      {
        id: '4',
        name: 'Code of Ethics v3.0.pdf',
        type: 'main',
        version: '3.0',
        uploadDate: '2024-02-01',
        size: '3.1 MB'
      },
      {
        id: '5',
        name: 'Ethics Training Materials.zip',
        type: 'template',
        version: '1.0',
        uploadDate: '2024-02-01',
        size: '15.7 MB'
      }
    ],
    reviewHistory: [],
    compliance: 'compliant'
  },
  {
    id: '4',
    title: 'Water Conservation and Management Policy',
    code: 'WMP-001',
    category: 'environmental',
    type: 'operational',
    status: 'draft',
    version: '1.0',
    owner: 'Environmental Officer',
    effectiveDate: '2024-04-01',
    reviewDate: '2024-10-01',
    description: 'Policy outlining water conservation measures, usage monitoring, and quality management procedures.',
    scope: ['Manufacturing Operations', 'Facilities Management'],
    relatedRegulations: ['Water Resources Management Act', 'WARMA Regulations'],
    departments: ['Operations', 'Environmental', 'Maintenance'],
    documents: [
      {
        id: '6',
        name: 'Water Management Policy Draft v1.0.pdf',
        type: 'main',
        version: '1.0',
        uploadDate: '2024-03-10',
        size: '1.4 MB'
      }
    ],
    reviewHistory: [],
    compliance: 'needs-review'
  },
  {
    id: '5',
    title: 'Anti-Money Laundering Policy',
    code: 'AML-001',
    category: 'governance',
    type: 'procedural',
    status: 'approved',
    version: '2.0',
    owner: 'Compliance Officer',
    approver: 'Risk Committee',
    effectiveDate: '2024-01-15',
    reviewDate: '2024-07-15',
    description: 'Policy covering AML procedures, customer due diligence, and suspicious transaction reporting.',
    scope: ['Finance Department', 'Sales', 'Procurement'],
    relatedRegulations: ['Proceeds of Crime and Anti-Money Laundering Act'],
    departments: ['Finance', 'Legal', 'Risk Management'],
    documents: [
      {
        id: '7',
        name: 'AML Policy v2.0.pdf',
        type: 'main',
        version: '2.0',
        uploadDate: '2024-01-15',
        size: '2.7 MB'
      },
      {
        id: '8',
        name: 'Customer Due Diligence Form.pdf',
        type: 'form',
        version: '1.0',
        uploadDate: '2024-01-15',
        size: '0.5 MB'
      }
    ],
    reviewHistory: [],
    compliance: 'compliant'
  }
]

export default function PolicyManagementPage() {
  const [selectedTab, setSelectedTab] = useState('policies')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedCompliance, setSelectedCompliance] = useState('all')

  const filteredPolicies = mockPolicies.filter(policy => {
    const matchesSearch = policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || policy.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || policy.status === selectedStatus
    const matchesCompliance = selectedCompliance === 'all' || policy.compliance === selectedCompliance
    return matchesSearch && matchesCategory && matchesStatus && matchesCompliance
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case 'under-review':
        return <Badge className="bg-blue-100 text-blue-800">Under Review</Badge>
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>
      case 'expired':
        return <Badge variant="destructive">Expired</Badge>
      case 'archived':
        return <Badge variant="outline">Archived</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getComplianceStatus = (compliance: string) => {
    switch (compliance) {
      case 'compliant':
        return <div className="flex items-center text-green-600"><CheckCircle className="h-4 w-4 mr-1" />Compliant</div>
      case 'needs-review':
        return <div className="flex items-center text-yellow-600"><Clock className="h-4 w-4 mr-1" />Needs Review</div>
      case 'non-compliant':
        return <div className="flex items-center text-red-600"><AlertTriangle className="h-4 w-4 mr-1" />Non-Compliant</div>
      default:
        return <div className="flex items-center text-gray-600"><FileText className="h-4 w-4 mr-1" />Not Assessed</div>
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

  const getDocumentTypeIcon = (type: string) => {
    switch (type) {
      case 'main':
        return '📄'
      case 'procedure':
        return '📋'
      case 'form':
        return '📝'
      case 'template':
        return '📑'
      default:
        return '📄'
    }
  }

  const stats = {
    totalPolicies: mockPolicies.length,
    approved: mockPolicies.filter(p => p.status === 'approved').length,
    underReview: mockPolicies.filter(p => p.status === 'under-review').length,
    draft: mockPolicies.filter(p => p.status === 'draft').length,
    compliant: mockPolicies.filter(p => p.compliance === 'compliant').length,
    needsReview: mockPolicies.filter(p => p.compliance === 'needs-review').length
  }

  const upcomingReviews = mockPolicies
    .filter(policy => new Date(policy.reviewDate) <= new Date(Date.now() + 90 * 24 * 60 * 60 * 1000))
    .sort((a, b) => new Date(a.reviewDate).getTime() - new Date(b.reviewDate).getTime())
    .slice(0, 5)

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Policy Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Create, review, and manage compliance policies
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Library
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Policy
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Policies</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.totalPolicies}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Approved</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.approved}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Workflow className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Under Review</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.underReview}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Edit className="h-8 w-8 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Draft</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.draft}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Compliant</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.compliant}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Needs Review</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.needsReview}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList>
              <TabsTrigger value="policies">Policy Library</TabsTrigger>
              <TabsTrigger value="workflows">Review Workflows</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>

            <TabsContent value="policies" className="space-y-6">
              {/* Search and Filters */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Search className="h-5 w-5" />
                    <span>Search & Filter Policies</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px]">
                      <Input
                        placeholder="Search policies, codes, or descriptions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="environmental">Environmental</SelectItem>
                        <SelectItem value="social">Social</SelectItem>
                        <SelectItem value="governance">Governance</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="under-review">Under Review</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="expired">Expired</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={selectedCompliance} onValueChange={setSelectedCompliance}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Compliance" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="compliant">Compliant</SelectItem>
                        <SelectItem value="needs-review">Needs Review</SelectItem>
                        <SelectItem value="non-compliant">Non-Compliant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Policies List */}
              <div className="space-y-4">
                {filteredPolicies.map((policy) => (
                  <Card key={policy.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-3">
                          <div className="text-2xl">{getCategoryIcon(policy.category)}</div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                              {policy.title}
                            </h3>
                            <div className="flex items-center space-x-4 mt-1">
                              <span className="text-sm font-medium text-blue-600">{policy.code}</span>
                              <span className="text-sm text-gray-600 dark:text-gray-400">v{policy.version}</span>
                              {getStatusBadge(policy.status)}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          {getComplianceStatus(policy.compliance)}
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
                      </div>

                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        {policy.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Scope</h4>
                          <div className="flex flex-wrap gap-1">
                            {policy.scope.slice(0, 2).map((item, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {item}
                              </Badge>
                            ))}
                            {policy.scope.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{policy.scope.length - 2} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Owner & Approver</h4>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center space-x-2">
                              <Users className="h-4 w-4" />
                              <span>{policy.owner}</span>
                            </div>
                            {policy.approver && (
                              <div className="text-xs text-gray-500 mt-1">
                                Approved by: {policy.approver}
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Timeline</h4>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4" />
                              <span>Effective: {new Date(policy.effectiveDate).toLocaleDateString()}</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              Review: {new Date(policy.reviewDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Documents ({policy.documents.length})</h4>
                        <div className="flex flex-wrap gap-2">
                          {policy.documents.map((doc) => (
                            <div key={doc.id} className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-800 rounded-lg p-2">
                              <span className="text-lg">{getDocumentTypeIcon(doc.type)}</span>
                              <div>
                                <p className="text-xs font-medium text-gray-900 dark:text-gray-100">{doc.name}</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">{doc.size}</p>
                              </div>
                              <Button variant="ghost" size="sm">
                                <Download className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Related Regulations</h4>
                          <div className="flex flex-wrap gap-1">
                            {policy.relatedRegulations.map((reg, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {reg}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Departments</h4>
                          <div className="flex flex-wrap gap-1">
                            {policy.departments.map((dept, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                <Building2 className="h-3 w-3 mr-1" />
                                {dept}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {policy.reviewHistory.length > 0 && (
                        <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                          <h5 className="text-sm font-medium text-yellow-900 dark:text-yellow-100 mb-2">Latest Review</h5>
                          <div className="text-sm text-yellow-700 dark:text-yellow-300">
                            <p><strong>{policy.reviewHistory[0].reviewer}</strong> - {policy.reviewHistory[0].status}</p>
                            {policy.reviewHistory[0].comments && (
                              <p className="mt-1">{policy.reviewHistory[0].comments}</p>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="workflows" className="space-y-6">
              <Card>
                <CardContent className="p-8 text-center">
                  <Workflow className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Review Workflows
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Manage policy review workflows, approval processes, and version control
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="templates" className="space-y-6">
              <Card>
                <CardContent className="p-8 text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Policy Templates
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Access and manage policy templates for consistent document creation
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Reviews */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Reviews</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingReviews.map(policy => (
                <div key={policy.id} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-lg">{getCategoryIcon(policy.category)}</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100">
                      {policy.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {policy.code} • Review: {new Date(policy.reviewDate).toLocaleDateString()}
                    </p>
                    <div className="mt-1">
                      {getStatusBadge(policy.status)}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Create New Policy
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Configure Workflow
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Policy Templates
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Archive className="h-4 w-4 mr-2" />
                Archive Manager
              </Button>
            </CardContent>
          </Card>

          {/* Category Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Policy Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span>🌿</span>
                  <span className="text-sm">Environmental</span>
                </div>
                <Badge variant="secondary">
                  {mockPolicies.filter(p => p.category === 'environmental').length}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span>👥</span>
                  <span className="text-sm">Social</span>
                </div>
                <Badge variant="secondary">
                  {mockPolicies.filter(p => p.category === 'social').length}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span>⚖️</span>
                  <span className="text-sm">Governance</span>
                </div>
                <Badge variant="secondary">
                  {mockPolicies.filter(p => p.category === 'governance').length}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 