'use client'

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ComplianceNavigation from "./components/compliance-navigation"
import { 
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  FileText,
  Calendar,
  Shield,
  Activity,
  Target,
  Users,
  Building2
} from "lucide-react"

interface ComplianceMetric {
  id: string
  title: string
  value: number
  target?: number
  trend: 'up' | 'down' | 'stable'
  change: string
  status: 'good' | 'warning' | 'critical'
  category: 'environmental' | 'social' | 'governance' | 'overall'
}

interface RecentActivity {
  id: string
  type: 'audit' | 'policy' | 'regulation' | 'incident'
  title: string
  description: string
  timestamp: string
  status: 'completed' | 'in-progress' | 'overdue' | 'upcoming'
  priority: 'high' | 'medium' | 'low'
}

const mockMetrics: ComplianceMetric[] = [
  {
    id: '1',
    title: 'Overall Compliance Score',
    value: 87,
    target: 95,
    trend: 'up',
    change: '+3% from last month',
    status: 'warning',
    category: 'overall'
  },
  {
    id: '2',
    title: 'Environmental Compliance',
    value: 92,
    target: 95,
    trend: 'up',
    change: '+5% from last month',
    status: 'good',
    category: 'environmental'
  },
  {
    id: '3',
    title: 'Social Compliance',
    value: 85,
    target: 90,
    trend: 'stable',
    change: 'No change',
    status: 'warning',
    category: 'social'
  },
  {
    id: '4',
    title: 'Governance Compliance',
    value: 94,
    target: 95,
    trend: 'up',
    change: '+2% from last month',
    status: 'good',
    category: 'governance'
  }
]

const mockActivities: RecentActivity[] = [
  {
    id: '1',
    type: 'audit',
    title: 'Environmental Audit Completed',
    description: 'Annual environmental compliance audit for Manufacturing Plant A completed with 8 recommendations',
    timestamp: '2024-03-15T14:30:00Z',
    status: 'completed',
    priority: 'high'
  },
  {
    id: '2',
    type: 'policy',
    title: 'OSH Policy Review Required',
    description: 'Occupational Safety and Health policy requires immediate review and updates',
    timestamp: '2024-03-14T09:15:00Z',
    status: 'overdue',
    priority: 'high'
  },
  {
    id: '3',
    type: 'regulation',
    title: 'New NEMA Regulations Released',
    description: 'Updated waste management regulations published - impact assessment required',
    timestamp: '2024-03-13T16:45:00Z',
    status: 'in-progress',
    priority: 'medium'
  },
  {
    id: '4',
    type: 'incident',
    title: 'Minor Safety Incident Reported',
    description: 'Slip and fall incident in warehouse - investigation and corrective actions underway',
    timestamp: '2024-03-12T11:20:00Z',
    status: 'in-progress',
    priority: 'medium'
  },
  {
    id: '5',
    type: 'audit',
    title: 'Water Management Audit Scheduled',
    description: 'External audit for water resource management scheduled for next month',
    timestamp: '2024-03-11T08:00:00Z',
    status: 'upcoming',
    priority: 'low'
  }
]

// Mock user data - replace with actual auth context
const mockUser = {
  role: 'Compliance Manager',
  name: 'Jane Smith'
}

export default function ComplianceOverviewPage() {
  const [activeTab, setActiveTab] = useState('navigation')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-green-600'
      case 'warning':
        return 'text-yellow-600'
      case 'critical':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <div className="h-4 w-4" />
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'audit':
        return '🔍'
      case 'policy':
        return '📋'
      case 'regulation':
        return '📚'
      case 'incident':
        return '⚠️'
      default:
        return '📄'
    }
  }

  const getActivityStatus = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
      case 'overdue':
        return <Badge variant="destructive">Overdue</Badge>
      case 'upcoming':
        return <Badge variant="outline">Upcoming</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  const overallMetric = mockMetrics.find(m => m.category === 'overall')
  const categoryMetrics = mockMetrics.filter(m => m.category !== 'overall')

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Compliance Center
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Monitor and manage regulatory compliance across your organization
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-600 dark:text-gray-400">Welcome back,</p>
            <p className="font-semibold text-gray-900 dark:text-gray-100">{mockUser.name}</p>
          </div>
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
            {mockUser.name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="navigation">Compliance Modules</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="navigation">
          <ComplianceNavigation />
        </TabsContent>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Overall Compliance Score */}
          {overallMetric && (
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {overallMetric.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Current organizational compliance standing
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <span className={`text-4xl font-bold ${getStatusColor(overallMetric.status)}`}>
                        {overallMetric.value}%
                      </span>
                      {getTrendIcon(overallMetric.trend)}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Target: {overallMetric.target}%
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {overallMetric.change}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <Progress 
                    value={overallMetric.value} 
                    max={100}
                    className="h-3"
                  />
                  <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-1">
                    <span>0%</span>
                    <span>Target: {overallMetric.target}%</span>
                    <span>100%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Category Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categoryMetrics.map((metric) => (
              <Card key={metric.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{metric.title}</CardTitle>
                    <div className="flex items-center space-x-1">
                      <span className={`text-2xl font-bold ${getStatusColor(metric.status)}`}>
                        {metric.value}%
                      </span>
                      {getTrendIcon(metric.trend)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Progress 
                    value={metric.value} 
                    max={100}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Target: {metric.target}%
                    </span>
                    <span className="text-gray-500 dark:text-gray-500">
                      {metric.change}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Shield className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Active Regulations</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">24</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Compliant Items</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">142</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-8 w-8 text-yellow-600" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Action Required</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">21</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Clock className="h-8 w-8 text-red-600" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Overdue</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">5</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5" />
                    <span>Recent Activity</span>
                  </CardTitle>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockActivities.slice(0, 5).map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl">{getActivityIcon(activity.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100">
                          {activity.title}
                        </h4>
                        <div className="flex items-center space-x-2 ml-2">
                          {getActivityStatus(activity.status)}
                          <span className="text-xs text-gray-500 dark:text-gray-500 whitespace-nowrap">
                            {formatTimeAgo(activity.timestamp)}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Deadlines */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Upcoming Deadlines</span>
                  </CardTitle>
                  <Button variant="outline" size="sm">View Calendar</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-red-200 bg-red-50 dark:bg-red-950/20 rounded-lg">
                    <div>
                      <h4 className="font-medium text-sm text-red-900 dark:text-red-100">
                        EIA License Renewal
                      </h4>
                      <p className="text-xs text-red-700 dark:text-red-300">
                        NEMA • Due in 3 days
                      </p>
                    </div>
                    <Badge variant="destructive" className="text-xs">Critical</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                    <div>
                      <h4 className="font-medium text-sm text-yellow-900 dark:text-yellow-100">
                        Water Permit Report
                      </h4>
                      <p className="text-xs text-yellow-700 dark:text-yellow-300">
                        WARMA • Due in 2 weeks
                      </p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800 text-xs">Medium</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border border-blue-200 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div>
                      <h4 className="font-medium text-sm text-blue-900 dark:text-blue-100">
                        Energy Audit Submission
                      </h4>
                      <p className="text-xs text-blue-700 dark:text-blue-300">
                        EPRA • Due in 1 month
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">Low</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border border-gray-200 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100">
                        Board Diversity Report
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        NSE • Due in 6 weeks
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">Planned</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button className="h-20 flex flex-col space-y-2" variant="outline">
                  <FileText className="h-6 w-6" />
                  <span className="text-sm">View Regulations</span>
                </Button>
                <Button className="h-20 flex flex-col space-y-2" variant="outline">
                  <Calendar className="h-6 w-6" />
                  <span className="text-sm">Schedule Audit</span>
                </Button>
                <Button className="h-20 flex flex-col space-y-2" variant="outline">
                  <Target className="h-6 w-6" />
                  <span className="text-sm">Update Policy</span>
                </Button>
                <Button className="h-20 flex flex-col space-y-2" variant="outline">
                  <Users className="h-6 w-6" />
                  <span className="text-sm">Assign Tasks</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
