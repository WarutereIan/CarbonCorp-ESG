'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  Users, 
  Server, 
  Activity, 
  Shield, 
  Database,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  ExternalLink
} from "lucide-react"

interface SystemMetric {
  id: string
  title: string
  value: string
  status: 'healthy' | 'warning' | 'error'
  icon: React.ComponentType<{ className?: string }>
  trend?: string
}

interface RecentActivity {
  id: string
  action: string
  user: string
  timestamp: string
  type: 'user' | 'system' | 'security' | 'data'
}

interface QuickAction {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  urgent?: boolean
}

const systemMetrics: SystemMetric[] = [
  {
    id: 'uptime',
    title: 'System Uptime',
    value: '99.8%',
    status: 'healthy',
    icon: Server,
    trend: '+0.2%'
  },
  {
    id: 'active-users',
    title: 'Active Users',
    value: '24',
    status: 'healthy',
    icon: Users,
    trend: '+3'
  },
  {
    id: 'storage',
    title: 'Storage Used',
    value: '78%',
    status: 'warning',
    icon: Database,
    trend: '+5%'
  },
  {
    id: 'security',
    title: 'Security Score',
    value: '94%',
    status: 'healthy',
    icon: Shield,
    trend: '+2%'
  }
]

const recentActivities: RecentActivity[] = [
  {
    id: '1',
    action: 'New user John Smith added to ESG Strategist role',
    user: 'Admin',
    timestamp: '2 hours ago',
    type: 'user'
  },
  {
    id: '2',
    action: 'QuickBooks integration sync completed successfully',
    user: 'System',
    timestamp: '4 hours ago',
    type: 'system'
  },
  {
    id: '3',
    action: 'Password policy updated for enhanced security',
    user: 'Alice Johnson',
    timestamp: '1 day ago',
    type: 'security'
  },
  {
    id: '4',
    action: 'Monthly data backup completed',
    user: 'System',
    timestamp: '1 day ago',
    type: 'data'
  },
  {
    id: '5',
    action: 'Facility "Lagos Office" details updated',
    user: 'Michael Chen',
    timestamp: '2 days ago',
    type: 'user'
  }
]

const quickActions: QuickAction[] = [
  {
    id: 'add-user',
    title: 'Add New User',
    description: 'Invite team members and assign roles',
    icon: Users,
    href: '/settings/users'
  },
  {
    id: 'setup-integration',
    title: 'Setup Integration',
    description: 'Connect your business systems',
    icon: ExternalLink,
    href: '/settings/integrations'
  },
  {
    id: 'review-security',
    title: 'Review Security',
    description: 'Check security settings and policies',
    icon: Shield,
    href: '/settings/security',
    urgent: true
  },
  {
    id: 'system-health',
    title: 'System Health',
    description: 'Monitor performance and diagnostics',
    icon: Activity,
    href: '/settings/system'
  }
]

export default function DashboardOverview() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-green-600 dark:text-green-400'
      case 'warning':
        return 'text-yellow-600 dark:text-yellow-400'
      case 'error':
        return 'text-red-600 dark:text-red-400'
      default:
        return 'text-gray-600 dark:text-gray-400'
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user':
        return <Users className="h-4 w-4 text-blue-500" />
      case 'system':
        return <Settings className="h-4 w-4 text-green-500" />
      case 'security':
        return <Shield className="h-4 w-4 text-red-500" />
      case 'data':
        return <Database className="h-4 w-4 text-purple-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* System Health Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>System Health Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {systemMetrics.map((metric) => {
              const IconComponent = metric.icon
              return (
                <div key={metric.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <IconComponent className="h-5 w-5 text-gray-600" />
                    {getStatusIcon(metric.status)}
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {metric.value}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {metric.title}
                    </p>
                    {metric.trend && (
                      <p className={`text-xs ${getStatusColor(metric.status)}`}>
                        {metric.trend} from last month
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quickActions.map((action) => {
                const IconComponent = action.icon
                return (
                  <Button
                    key={action.id}
                    variant="ghost"
                    className="w-full justify-start h-auto p-3"
                    onClick={() => window.location.href = action.href}
                  >
                    <div className="flex items-center space-x-3">
                      <IconComponent className="h-5 w-5" />
                      <div className="text-left flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{action.title}</span>
                          {action.urgent && (
                            <Badge variant="destructive" className="text-xs">
                              Urgent
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {activity.action}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        by {activity.user}
                      </p>
                      <span className="text-gray-300">•</span>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {activity.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Storage Usage Detail */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>Storage & Usage</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Data Storage</span>
                <span className="text-sm text-gray-600">7.8 GB / 10 GB</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-600 dark:text-gray-400">ESG Data</p>
                <p className="font-medium">4.2 GB</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Documents</p>
                <p className="font-medium">2.1 GB</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Reports</p>
                <p className="font-medium">1.5 GB</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 