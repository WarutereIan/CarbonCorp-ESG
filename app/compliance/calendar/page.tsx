'use client'

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Calendar as CalendarIcon, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  Plus,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  Bell,
  FileText,
  Users,
  Building2
} from "lucide-react"

interface CalendarEvent {
  id: string
  title: string
  type: 'deadline' | 'review' | 'audit' | 'training' | 'renewal'
  authority: string
  category: 'environmental' | 'social' | 'governance'
  date: string
  endDate?: string
  status: 'upcoming' | 'due-soon' | 'overdue' | 'completed'
  priority: 'high' | 'medium' | 'low'
  assignedTo?: string
  description: string
  requirements: string[]
  reminderSet: boolean
}

const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'EIA License Renewal',
    type: 'renewal',
    authority: 'NEMA',
    category: 'environmental',
    date: '2024-03-15',
    status: 'due-soon',
    priority: 'high',
    assignedTo: 'Environmental Team',
    description: 'Renewal of Environmental Impact Assessment license for manufacturing facility',
    requirements: ['Updated EMP', 'Audit Report', 'Application Form', 'Fees Payment'],
    reminderSet: true
  },
  {
    id: '2',
    title: 'Water Permit Annual Report',
    type: 'deadline',
    authority: 'WARMA',
    category: 'environmental',
    date: '2024-03-30',
    status: 'upcoming',
    priority: 'medium',
    assignedTo: 'Operations Manager',
    description: 'Submit annual water usage and conservation report',
    requirements: ['Usage Data', 'Conservation Measures', 'Quality Test Results'],
    reminderSet: true
  },
  {
    id: '3',
    title: 'Energy Audit Submission',
    type: 'deadline',
    authority: 'EPRA',
    category: 'environmental',
    date: '2024-04-15',
    status: 'upcoming',
    priority: 'high',
    assignedTo: 'Energy Manager',
    description: 'Submit comprehensive energy audit report',
    requirements: ['Energy Audit Report', 'Efficiency Measures', 'Implementation Plan'],
    reminderSet: false
  },
  {
    id: '4',
    title: 'OSH Policy Review',
    type: 'review',
    authority: 'DOSH',
    category: 'social',
    date: '2024-03-20',
    status: 'upcoming',
    priority: 'medium',
    assignedTo: 'HR Department',
    description: 'Annual review of Occupational Safety and Health policies',
    requirements: ['Policy Documentation', 'Incident Analysis', 'Training Records'],
    reminderSet: true
  },
  {
    id: '5',
    title: 'Board Diversity Report',
    type: 'deadline',
    authority: 'NSE',
    category: 'governance',
    date: '2024-04-30',
    status: 'upcoming',
    priority: 'high',
    assignedTo: 'Company Secretary',
    description: 'Submit annual board diversity and ESG report',
    requirements: ['Board Composition', 'ESG Metrics', 'Sustainability Report'],
    reminderSet: true
  },
  {
    id: '6',
    title: 'Climate Risk Assessment Update',
    type: 'deadline',
    authority: 'NSE',
    category: 'environmental',
    date: '2024-02-28',
    status: 'overdue',
    priority: 'high',
    assignedTo: 'Risk Manager',
    description: 'Update climate-related financial risk disclosures',
    requirements: ['Risk Assessment', 'Scenario Analysis', 'Financial Impact'],
    reminderSet: true
  },
  {
    id: '7',
    title: 'Employee Training Compliance',
    type: 'training',
    authority: 'Ministry of Labour',
    category: 'social',
    date: '2024-03-25',
    endDate: '2024-03-27',
    status: 'upcoming',
    priority: 'medium',
    assignedTo: 'Training Coordinator',
    description: 'Mandatory compliance training for all employees',
    requirements: ['Training Materials', 'Attendance Records', 'Assessment Results'],
    reminderSet: true
  }
]

export default function ComplianceCalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedView, setSelectedView] = useState('month')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedPriority, setSelectedPriority] = useState('all')

  const filteredEvents = mockEvents.filter(event => {
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || event.status === selectedStatus
    const matchesPriority = selectedPriority === 'all' || event.priority === selectedPriority
    return matchesCategory && matchesStatus && matchesPriority
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'due-soon':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />
      case 'due-soon':
        return <Clock className="h-4 w-4" />
      case 'overdue':
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <CalendarIcon className="h-4 w-4" />
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive" className="text-xs">High</Badge>
      case 'medium':
        return <Badge variant="secondary" className="text-xs">Medium</Badge>
      case 'low':
        return <Badge variant="outline" className="text-xs">Low</Badge>
      default:
        return null
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deadline':
        return '📅'
      case 'review':
        return '🔍'
      case 'audit':
        return '📊'
      case 'training':
        return '🎓'
      case 'renewal':
        return '🔄'
      default:
        return '📋'
    }
  }

  const upcomingEvents = filteredEvents
    .filter(event => ['upcoming', 'due-soon'].includes(event.status))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5)

  const overdueEvents = filteredEvents.filter(event => event.status === 'overdue')

  const stats = {
    total: mockEvents.length,
    upcoming: mockEvents.filter(e => e.status === 'upcoming').length,
    dueSoon: mockEvents.filter(e => e.status === 'due-soon').length,
    overdue: mockEvents.filter(e => e.status === 'overdue').length,
    completed: mockEvents.filter(e => e.status === 'completed').length
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Compliance Calendar
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track deadlines, reviews, and compliance events
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Calendar
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <CalendarIcon className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Events</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Due Soon</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.dueSoon}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Overdue</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.overdue}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <CalendarIcon className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Upcoming</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.upcoming}</p>
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
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.completed}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert for Overdue Items */}
      {overdueEvents.length > 0 && (
        <Card className="border-red-200 bg-red-50 dark:bg-red-950/20">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-red-900 dark:text-red-100">
                  {overdueEvents.length} Overdue Requirement{overdueEvents.length > 1 ? 's' : ''}
                </h3>
                <p className="text-sm text-red-700 dark:text-red-300">
                  Immediate attention required for {overdueEvents.map(e => e.title).join(', ')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Controls */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <CalendarIcon className="h-5 w-5" />
                  <span>Calendar View</span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="font-medium">March 2024</span>
                  <Button variant="outline" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedView} onValueChange={setSelectedView}>
                <TabsList className="mb-4">
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="list">List</TabsTrigger>
                </TabsList>

                <div className="flex flex-wrap gap-4 mb-4">
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
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="due-soon">Due Soon</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priorities</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <TabsContent value="month">
                  <div className="border rounded-lg p-4">
                    <div className="grid grid-cols-7 gap-2 mb-4">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-center font-medium text-gray-600 dark:text-gray-400 py-2">
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {Array.from({ length: 35 }, (_, i) => {
                        const dayEvents = filteredEvents.filter(event => {
                          const eventDate = new Date(event.date)
                          return eventDate.getDate() === (i % 31) + 1 && (i % 31) + 1 <= 31
                        })
                        
                        return (
                          <div key={i} className="min-h-[100px] border rounded p-2 bg-gray-50 dark:bg-gray-800">
                            <div className="text-sm font-medium mb-1">{(i % 31) + 1}</div>
                            <div className="space-y-1">
                              {dayEvents.slice(0, 2).map(event => (
                                <div 
                                  key={event.id} 
                                  className={`text-xs p-1 rounded ${getStatusColor(event.status)}`}
                                >
                                  {getTypeIcon(event.type)} {event.title.slice(0, 15)}...
                                </div>
                              ))}
                              {dayEvents.length > 2 && (
                                <div className="text-xs text-gray-500">
                                  +{dayEvents.length - 2} more
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="week">
                  <div className="border rounded-lg p-4">
                    <div className="text-center text-gray-600 dark:text-gray-400 mb-4">
                      Week view implementation would show 7-day detailed layout
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="list">
                  <div className="space-y-3">
                    {filteredEvents.map(event => (
                      <Card key={event.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                              <div className="text-2xl">{getTypeIcon(event.type)}</div>
                              <div>
                                <h3 className="font-medium text-gray-900 dark:text-gray-100">
                                  {event.title}
                                </h3>
                                <div className="flex items-center space-x-4 mt-1">
                                  <span className="text-sm text-blue-600">{event.authority}</span>
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {new Date(event.date).toLocaleDateString()}
                                  </span>
                                  {getPriorityBadge(event.priority)}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getStatusColor(event.status)}`}>
                                {getStatusIcon(event.status)}
                                <span className="capitalize">{event.status.replace('-', ' ')}</span>
                              </div>
                              {event.reminderSet && (
                                <Bell className="h-4 w-4 text-blue-600" />
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                            {event.description}
                          </p>
                          {event.assignedTo && (
                            <div className="flex items-center space-x-2 mt-2">
                              <Users className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                Assigned to: {event.assignedTo}
                              </span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingEvents.map(event => (
                <div key={event.id} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-lg">{getCategoryIcon(event.category)}</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100">
                      {event.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {event.authority} • {new Date(event.date).toLocaleDateString()}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <div className={`text-xs px-2 py-1 rounded ${getStatusColor(event.status)}`}>
                        {event.status.replace('-', ' ')}
                      </div>
                      {event.reminderSet && (
                        <Bell className="h-3 w-3 text-blue-600" />
                      )}
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
                Add New Event
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Bell className="h-4 w-4 mr-2" />
                Set Reminders
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Calendar
              </Button>
            </CardContent>
          </Card>

          {/* Legend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Event Legend</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded bg-green-200"></div>
                <span className="text-sm">Completed</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded bg-blue-200"></div>
                <span className="text-sm">Upcoming</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded bg-yellow-200"></div>
                <span className="text-sm">Due Soon</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded bg-red-200"></div>
                <span className="text-sm">Overdue</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 