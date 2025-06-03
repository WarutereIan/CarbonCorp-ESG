'use client'

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Search, 
  Filter, 
  Download, 
  ExternalLink, 
  Calendar, 
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  BookOpen,
  Building2,
  Leaf,
  Users,
  Scale
} from "lucide-react"

interface Regulation {
  id: string
  title: string
  code: string
  authority: string
  category: 'environmental' | 'social' | 'governance'
  subcategory: string
  status: 'active' | 'proposed' | 'updated'
  effectiveDate: string
  lastUpdated: string
  description: string
  applicability: string[]
  keyRequirements: string[]
  penalties?: string
  relatedDocs: number
  compliance: 'compliant' | 'partial' | 'non-compliant' | 'not-assessed'
}

const mockRegulations: Regulation[] = [
  {
    id: '1',
    title: 'Environmental Management and Co-ordination Act',
    code: 'EMCA 1999',
    authority: 'NEMA',
    category: 'environmental',
    subcategory: 'Environmental Impact Assessment',
    status: 'active',
    effectiveDate: '2000-01-14',
    lastUpdated: '2023-07-15',
    description: 'Framework law on environmental management, providing for environmental impact assessment, environmental audit and monitoring.',
    applicability: ['All Industries', 'Manufacturing', 'Mining', 'Agriculture'],
    keyRequirements: ['EIA License', 'Environmental Audit', 'EMP Implementation', 'Waste Management'],
    penalties: 'Fines up to KES 2M or imprisonment up to 2 years',
    relatedDocs: 12,
    compliance: 'compliant'
  },
  {
    id: '2',
    title: 'Water Resources Management Rules',
    code: 'WRM Rules 2007',
    authority: 'WARMA',
    category: 'environmental',
    subcategory: 'Water Management',
    status: 'active',
    effectiveDate: '2007-03-01',
    lastUpdated: '2022-11-30',
    description: 'Regulations governing water abstraction, use, and conservation including permit requirements.',
    applicability: ['Manufacturing', 'Agriculture', 'Mining', 'Hospitality'],
    keyRequirements: ['Water Permit', 'Usage Monitoring', 'Conservation Plans', 'Quality Testing'],
    penalties: 'Permit revocation and fines up to KES 500K',
    relatedDocs: 8,
    compliance: 'partial'
  },
  {
    id: '3',
    title: 'Energy (Management) Regulations',
    code: 'EMR 2012',
    authority: 'EPRA',
    category: 'environmental',
    subcategory: 'Energy Management',
    status: 'updated',
    effectiveDate: '2012-09-01',
    lastUpdated: '2024-01-15',
    description: 'Regulations on energy efficiency, conservation, and management for designated consumers.',
    applicability: ['Large Consumers', 'Manufacturing', 'Commercial Buildings'],
    keyRequirements: ['Energy Audit', 'Energy Manager', 'Efficiency Targets', 'Reporting'],
    penalties: 'Fines up to KES 1M for non-compliance',
    relatedDocs: 6,
    compliance: 'compliant'
  },
  {
    id: '4',
    title: 'Employment Act',
    code: 'EA 2007',
    authority: 'Ministry of Labour',
    category: 'social',
    subcategory: 'Labour Standards',
    status: 'active',
    effectiveDate: '2007-06-01',
    lastUpdated: '2023-03-20',
    description: 'Comprehensive employment law covering contracts, wages, working conditions, and termination.',
    applicability: ['All Employers', 'Private Sector', 'Public Sector'],
    keyRequirements: ['Employment Contracts', 'Wage Compliance', 'Working Hours', 'Leave Entitlements'],
    penalties: 'Fines and compensation as determined by Employment Court',
    relatedDocs: 15,
    compliance: 'compliant'
  },
  {
    id: '5',
    title: 'Occupational Safety and Health Act',
    code: 'OSHA 2007',
    authority: 'DOSH',
    category: 'social',
    subcategory: 'Workplace Safety',
    status: 'active',
    effectiveDate: '2007-09-01',
    lastUpdated: '2023-05-10',
    description: 'Framework for securing safety, health and welfare of workers and the public.',
    applicability: ['All Workplaces', 'Industrial', 'Commercial', 'Service Sector'],
    keyRequirements: ['Safety Policy', 'Risk Assessment', 'Safety Training', 'Incident Reporting'],
    penalties: 'Fines up to KES 300K or imprisonment up to 3 months',
    relatedDocs: 10,
    compliance: 'partial'
  },
  {
    id: '6',
    title: 'NSE ESG Disclosure Guidance',
    code: 'NSE-ESG 2021',
    authority: 'NSE',
    category: 'governance',
    subcategory: 'ESG Reporting',
    status: 'active',
    effectiveDate: '2021-01-01',
    lastUpdated: '2023-12-01',
    description: 'Guidelines for ESG disclosures by listed companies on the Nairobi Securities Exchange.',
    applicability: ['Listed Companies', 'Public Companies'],
    keyRequirements: ['ESG Report', 'Sustainability Strategy', 'Board Oversight', 'Stakeholder Engagement'],
    penalties: 'Delisting and regulatory penalties',
    relatedDocs: 5,
    compliance: 'compliant'
  },
  {
    id: '7',
    title: 'CMA Code of Corporate Governance',
    code: 'CMA-CG 2015',
    authority: 'CMA',
    category: 'governance',
    subcategory: 'Corporate Governance',
    status: 'active',
    effectiveDate: '2015-04-01',
    lastUpdated: '2023-08-15',
    description: 'Code of corporate governance practices for public listed companies.',
    applicability: ['Listed Companies', 'Public Companies', 'State Corporations'],
    keyRequirements: ['Board Independence', 'Audit Committee', 'Risk Management', 'Internal Controls'],
    penalties: 'Regulatory action and sanctions',
    relatedDocs: 8,
    compliance: 'compliant'
  }
]

export default function RegulatoryLibraryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedAuthority, setSelectedAuthority] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedCompliance, setSelectedCompliance] = useState('all')

  const filteredRegulations = mockRegulations.filter(reg => {
    const matchesSearch = reg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reg.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reg.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || reg.category === selectedCategory
    const matchesAuthority = selectedAuthority === 'all' || reg.authority === selectedAuthority
    const matchesStatus = selectedStatus === 'all' || reg.status === selectedStatus
    const matchesCompliance = selectedCompliance === 'all' || reg.compliance === selectedCompliance

    return matchesSearch && matchesCategory && matchesAuthority && matchesStatus && matchesCompliance
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'environmental':
        return <Leaf className="h-4 w-4 text-green-600" />
      case 'social':
        return <Users className="h-4 w-4 text-blue-600" />
      case 'governance':
        return <Scale className="h-4 w-4 text-purple-600" />
      default:
        return <FileText className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">Active</Badge>
      case 'proposed':
        return <Badge variant="secondary">Proposed</Badge>
      case 'updated':
        return <Badge variant="outline" className="border-blue-500 text-blue-600">Updated</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getComplianceStatus = (compliance: string) => {
    switch (compliance) {
      case 'compliant':
        return <div className="flex items-center text-green-600"><CheckCircle className="h-4 w-4 mr-1" />Compliant</div>
      case 'partial':
        return <div className="flex items-center text-yellow-600"><Clock className="h-4 w-4 mr-1" />Partial</div>
      case 'non-compliant':
        return <div className="flex items-center text-red-600"><AlertTriangle className="h-4 w-4 mr-1" />Non-Compliant</div>
      default:
        return <div className="flex items-center text-gray-600"><FileText className="h-4 w-4 mr-1" />Not Assessed</div>
    }
  }

  const stats = {
    total: mockRegulations.length,
    environmental: mockRegulations.filter(r => r.category === 'environmental').length,
    social: mockRegulations.filter(r => r.category === 'social').length,
    governance: mockRegulations.filter(r => r.category === 'governance').length,
    compliant: mockRegulations.filter(r => r.compliance === 'compliant').length,
    needsAttention: mockRegulations.filter(r => ['partial', 'non-compliant'].includes(r.compliance)).length
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Regulatory Library
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Kenya regulations and compliance requirements
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export List
          </Button>
          <Button>
            <ExternalLink className="h-4 w-4 mr-2" />
            Check Updates
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Regulations</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
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
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Needs Attention</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.needsAttention}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Building2 className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Authorities</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">7</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Search & Filter Regulations</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Search regulations, codes, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="environmental">Environmental</SelectItem>
                <SelectItem value="social">Social</SelectItem>
                <SelectItem value="governance">Governance</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedAuthority} onValueChange={setSelectedAuthority}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Authority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Authorities</SelectItem>
                <SelectItem value="NEMA">NEMA</SelectItem>
                <SelectItem value="WARMA">WARMA</SelectItem>
                <SelectItem value="EPRA">EPRA</SelectItem>
                <SelectItem value="NSE">NSE</SelectItem>
                <SelectItem value="CMA">CMA</SelectItem>
                <SelectItem value="Ministry of Labour">Ministry of Labour</SelectItem>
                <SelectItem value="DOSH">DOSH</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedCompliance} onValueChange={setSelectedCompliance}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Compliance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="compliant">Compliant</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
                <SelectItem value="non-compliant">Non-Compliant</SelectItem>
                <SelectItem value="not-assessed">Not Assessed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Regulations List */}
      <div className="space-y-4">
        {filteredRegulations.map((regulation) => (
          <Card key={regulation.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  {getCategoryIcon(regulation.category)}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {regulation.title}
                    </h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm font-medium text-blue-600">{regulation.code}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{regulation.authority}</span>
                      {getStatusBadge(regulation.status)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {getComplianceStatus(regulation.compliance)}
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {regulation.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Key Requirements</h4>
                  <div className="flex flex-wrap gap-1">
                    {regulation.keyRequirements.slice(0, 3).map((req, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {req}
                      </Badge>
                    ))}
                    {regulation.keyRequirements.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{regulation.keyRequirements.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Applicability</h4>
                  <div className="flex flex-wrap gap-1">
                    {regulation.applicability.slice(0, 2).map((app, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {app}
                      </Badge>
                    ))}
                    {regulation.applicability.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{regulation.applicability.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Last Updated</h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(regulation.lastUpdated).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mt-1">
                    <FileText className="h-4 w-4" />
                    <span>{regulation.relatedDocs} related documents</span>
                  </div>
                </div>
              </div>

              {regulation.penalties && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                    <div>
                      <h5 className="text-sm font-medium text-red-900 dark:text-red-100">Penalties for Non-Compliance</h5>
                      <p className="text-sm text-red-700 dark:text-red-300">{regulation.penalties}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRegulations.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              No regulations found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search criteria or filters
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 