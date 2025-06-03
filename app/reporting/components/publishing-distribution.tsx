"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Progress } from "@/components/ui/progress"
import { 
  Send, 
  Download, 
  Globe,
  FileText,
  Image,
  Calendar as CalendarIcon,
  Clock,
  CheckCircle,
  AlertTriangle,
  Mail,
  Users,
  Settings,
  Eye,
  Share2,
  Archive,
  Shield,
  Zap,
  Upload,
  Printer,
  RefreshCw,
  PlayCircle,
  PauseCircle,
  StopCircle,
  Bell,
  ExternalLink,
  Copy,
  MoreHorizontal,
  Target,
  TrendingUp,
  BarChart3
} from "lucide-react"

interface PublishingFormat {
  id: string
  name: string
  extension: string
  description: string
  icon: React.ReactNode
  options: {
    quality?: 'standard' | 'high' | 'print'
    interactive?: boolean
    watermark?: boolean
    pageNumbers?: boolean
    toc?: boolean
    accessibility?: boolean
  }
}

interface DistributionChannel {
  id: string
  name: string
  type: 'email' | 'portal' | 'api' | 'ftp' | 'sharepoint'
  description: string
  icon: React.ReactNode
  status: 'active' | 'inactive' | 'error'
  lastUsed?: string
  config?: any
}

interface RecipientGroup {
  id: string
  name: string
  description: string
  members: string[]
  type: 'internal' | 'board' | 'investors' | 'regulators' | 'public'
  autoApproval: boolean
}

interface PublishingJob {
  id: string
  title: string
  formats: string[]
  channels: string[]
  recipients: string[]
  status: 'draft' | 'scheduled' | 'publishing' | 'completed' | 'failed'
  scheduledAt?: string
  completedAt?: string
  progress: number
  deliveryStats?: {
    sent: number
    delivered: number
    opened: number
    downloaded: number
  }
}

interface PublishingDistributionProps {
  reportId: string
  reportTitle: string
  content: any
  onPublish: (data: any) => void
  onSchedule: (data: any) => void
}

export function PublishingDistribution({
  reportId,
  reportTitle,
  content,
  onPublish,
  onSchedule
}: PublishingDistributionProps) {
  const [selectedFormats, setSelectedFormats] = useState<string[]>(['pdf'])
  const [selectedChannels, setSelectedChannels] = useState<string[]>(['email'])
  const [selectedGroups, setSelectedGroups] = useState<string[]>([])
  const [customRecipients, setCustomRecipients] = useState('')
  const [publishingJobs, setPublishingJobs] = useState<PublishingJob[]>([])
  const [scheduleDate, setScheduleDate] = useState<Date | undefined>()
  const [scheduleTime, setScheduleTime] = useState('09:00')
  const [emailSubject, setEmailSubject] = useState('')
  const [emailMessage, setEmailMessage] = useState('')
  const [requireApproval, setRequireApproval] = useState(true)
  const [enableTracking, setEnableTracking] = useState(true)
  const [autoArchive, setAutoArchive] = useState(false)
  const [currentJob, setCurrentJob] = useState<PublishingJob | null>(null)
  const [isPublishing, setIsPublishing] = useState(false)

  // Available formats
  const formats: PublishingFormat[] = [
    {
      id: 'pdf',
      name: 'PDF Document',
      extension: 'pdf',
      description: 'Print-ready PDF with embedded fonts and graphics',
      icon: <FileText className="h-4 w-4" />,
      options: {
        quality: 'high',
        watermark: false,
        pageNumbers: true,
        toc: true,
        accessibility: true
      }
    },
    {
      id: 'word',
      name: 'Microsoft Word',
      extension: 'docx',
      description: 'Editable Word document with styles preserved',
      icon: <FileText className="h-4 w-4" />,
      options: {
        watermark: false,
        pageNumbers: true,
        toc: true
      }
    },
    {
      id: 'html',
      name: 'Interactive Web',
      extension: 'html',
      description: 'Responsive web version with interactive elements',
      icon: <Globe className="h-4 w-4" />,
      options: {
        interactive: true,
        accessibility: true
      }
    },
    {
      id: 'powerpoint',
      name: 'PowerPoint',
      extension: 'pptx',
      description: 'Executive summary presentation slides',
      icon: <Image className="h-4 w-4" />,
      options: {
        quality: 'high'
      }
    }
  ]

  // Distribution channels
  const channels: DistributionChannel[] = [
    {
      id: 'email',
      name: 'Email Distribution',
      type: 'email',
      description: 'Send via corporate email system',
      icon: <Mail className="h-4 w-4" />,
      status: 'active',
      lastUsed: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: 'portal',
      name: 'Company Portal',
      type: 'portal',
      description: 'Publish to internal portal',
      icon: <Globe className="h-4 w-4" />,
      status: 'active',
      lastUsed: new Date(Date.now() - 172800000).toISOString()
    },
    {
      id: 'sharepoint',
      name: 'SharePoint',
      type: 'sharepoint',
      description: 'Upload to SharePoint document library',
      icon: <Archive className="h-4 w-4" />,
      status: 'active'
    },
    {
      id: 'regulatory-api',
      name: 'Regulatory Submission',
      type: 'api',
      description: 'Submit to regulatory authorities via API',
      icon: <Shield className="h-4 w-4" />,
      status: 'inactive'
    }
  ]

  // Recipient groups
  const recipientGroups: RecipientGroup[] = [
    {
      id: 'board',
      name: 'Board of Directors',
      description: 'Executive board members',
      members: ['john.smith@board.com', 'mary.jones@board.com', 'david.wilson@board.com'],
      type: 'board',
      autoApproval: false
    },
    {
      id: 'investors',
      name: 'Institutional Investors',
      description: 'Key institutional shareholders',
      members: ['investor.relations@fund1.com', 'esg@investment.com'],
      type: 'investors',
      autoApproval: false
    },
    {
      id: 'employees',
      name: 'All Employees',
      description: 'Company-wide distribution',
      members: ['all@company.com'],
      type: 'internal',
      autoApproval: true
    },
    {
      id: 'regulators',
      name: 'Regulatory Bodies',
      description: 'Compliance reporting recipients',
      members: ['submissions@regulator.gov'],
      type: 'regulators',
      autoApproval: false
    }
  ]

  useEffect(() => {
    initializeMockJobs()
  }, [])

  const initializeMockJobs = () => {
    setPublishingJobs([
      {
        id: 'job-1',
        title: '2023 Annual Report - Q4 Distribution',
        formats: ['pdf', 'html'],
        channels: ['email', 'portal'],
        recipients: ['board', 'investors'],
        status: 'completed',
        completedAt: new Date(Date.now() - 86400000).toISOString(),
        progress: 100,
        deliveryStats: {
          sent: 45,
          delivered: 44,
          opened: 38,
          downloaded: 32
        }
      },
      {
        id: 'job-2',
        title: 'Q3 Climate Report - Stakeholder Update',
        formats: ['pdf'],
        channels: ['email'],
        recipients: ['employees'],
        status: 'scheduled',
        scheduledAt: new Date(Date.now() + 86400000).toISOString(),
        progress: 0
      }
    ])
  }

  const handlePublishNow = async () => {
    if (selectedFormats.length === 0 || selectedChannels.length === 0) return

    setIsPublishing(true)

    const newJob: PublishingJob = {
      id: `job-${Date.now()}`,
      title: `${reportTitle} - Immediate Publication`,
      formats: selectedFormats,
      channels: selectedChannels,
      recipients: [...selectedGroups],
      status: 'publishing',
      progress: 0
    }

    setCurrentJob(newJob)
    setPublishingJobs(prev => [newJob, ...prev])

    // Simulate publishing process
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 500))
      setCurrentJob(prev => prev ? { ...prev, progress: i } : null)
      if (i === 100) {
        setCurrentJob(prev => prev ? { ...prev, status: 'completed', completedAt: new Date().toISOString() } : null)
        setPublishingJobs(prev => prev.map(job => 
          job.id === newJob.id ? { ...job, status: 'completed', completedAt: new Date().toISOString(), progress: 100 } : job
        ))
      }
    }

    setIsPublishing(false)
    onPublish({
      formats: selectedFormats,
      channels: selectedChannels,
      recipients: selectedGroups
    })
  }

  const handleSchedulePublication = () => {
    if (!scheduleDate || selectedFormats.length === 0) return

    const scheduledDateTime = new Date(scheduleDate)
    const [hours, minutes] = scheduleTime.split(':')
    scheduledDateTime.setHours(parseInt(hours), parseInt(minutes))

    const newJob: PublishingJob = {
      id: `job-${Date.now()}`,
      title: `${reportTitle} - Scheduled Publication`,
      formats: selectedFormats,
      channels: selectedChannels,
      recipients: [...selectedGroups],
      status: 'scheduled',
      scheduledAt: scheduledDateTime.toISOString(),
      progress: 0
    }

    setPublishingJobs(prev => [newJob, ...prev])
    onSchedule({
      scheduledAt: scheduledDateTime.toISOString(),
      formats: selectedFormats,
      channels: selectedChannels,
      recipients: selectedGroups
    })
  }

  const getFormatIcon = (formatId: string) => {
    const format = formats.find(f => f.id === formatId)
    return format?.icon || <FileText className="h-3 w-3" />
  }

  const getChannelIcon = (channelId: string) => {
    const channel = channels.find(c => c.id === channelId)
    return channel?.icon || <Send className="h-3 w-3" />
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'publishing': return 'bg-blue-100 text-blue-800'
      case 'scheduled': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const calculateTotalRecipients = () => {
    return selectedGroups.reduce((total, groupId) => {
      const group = recipientGroups.find(g => g.id === groupId)
      return total + (group?.members.length || 0)
    }, 0) + (customRecipients.split(',').filter(email => email.trim()).length)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Send className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <CardTitle>Publish & Distribute</CardTitle>
                <CardDescription>
                  Configure publishing formats and distribution for "{reportTitle}"
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                {calculateTotalRecipients()} recipients
              </Badge>
              <Badge variant="outline">
                {selectedFormats.length} formats
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Active Publishing Job */}
      {currentJob && currentJob.status === 'publishing' && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Publishing in Progress</h4>
                <Badge className="bg-blue-100 text-blue-800">
                  {currentJob.progress}%
                </Badge>
              </div>
              <Progress value={currentJob.progress} className="h-2" />
              <div className="text-sm text-muted-foreground">
                Generating {currentJob.formats.join(', ')} formats and distributing via {currentJob.channels.join(', ')}...
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="formats" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="formats">Formats</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="formats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Export Formats</CardTitle>
              <CardDescription>
                Select the file formats for your report
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formats.map((format) => (
                  <Card 
                    key={format.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedFormats.includes(format.id) ? 'ring-2 ring-primary bg-primary/5' : ''
                    }`}
                    onClick={() => {
                      if (selectedFormats.includes(format.id)) {
                        setSelectedFormats(prev => prev.filter(f => f !== format.id))
                      } else {
                        setSelectedFormats(prev => [...prev, format.id])
                      }
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-muted rounded">
                          {format.icon}
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium text-sm">{format.name}</h5>
                          <p className="text-xs text-muted-foreground mt-1">{format.description}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {Object.entries(format.options).map(([key, value]) => (
                              value && (
                                <Badge key={key} variant="outline" className="text-xs">
                                  {key}
                                </Badge>
                              )
                            ))}
                          </div>
                        </div>
                        {selectedFormats.includes(format.id) && (
                          <CheckCircle className="h-5 w-5 text-primary" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {selectedFormats.length > 0 && (
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-3">Format Options</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Include watermark</Label>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Page numbers</Label>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Table of contents</Label>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm">Quality</Label>
                        <Select defaultValue="high">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="print">Print Ready</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Accessibility features</Label>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Distribution Channels</CardTitle>
              <CardDescription>
                Choose how to deliver your report
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {channels.map((channel) => (
                  <div 
                    key={channel.id}
                    className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedChannels.includes(channel.id) ? 'bg-primary/5 border-primary' : 'hover:bg-muted/50'
                    }`}
                    onClick={() => {
                      if (selectedChannels.includes(channel.id)) {
                        setSelectedChannels(prev => prev.filter(c => c !== channel.id))
                      } else {
                        setSelectedChannels(prev => [...prev, channel.id])
                      }
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted rounded">
                        {channel.icon}
                      </div>
                      <div>
                        <h5 className="font-medium text-sm">{channel.name}</h5>
                        <p className="text-xs text-muted-foreground">{channel.description}</p>
                        {channel.lastUsed && (
                          <div className="text-xs text-muted-foreground mt-1">
                            Last used: {new Date(channel.lastUsed).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant={channel.status === 'active' ? 'default' : 'secondary'}>
                        {channel.status}
                      </Badge>
                      {selectedChannels.includes(channel.id) && (
                        <CheckCircle className="h-5 w-5 text-primary" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recipients</CardTitle>
              <CardDescription>
                Select recipient groups and add custom emails
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {recipientGroups.map((group) => (
                  <div 
                    key={group.id}
                    className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedGroups.includes(group.id) ? 'bg-primary/5 border-primary' : 'hover:bg-muted/50'
                    }`}
                    onClick={() => {
                      if (selectedGroups.includes(group.id)) {
                        setSelectedGroups(prev => prev.filter(g => g !== group.id))
                      } else {
                        setSelectedGroups(prev => [...prev, group.id])
                      }
                    }}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="font-medium text-sm">{group.name}</h5>
                        <Badge variant="outline" className="text-xs">
                          {group.members.length} members
                        </Badge>
                        {!group.autoApproval && (
                          <Badge variant="outline" className="text-xs">
                            <Shield className="h-3 w-3 mr-1" />
                            Approval Required
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{group.description}</p>
                    </div>
                    
                    {selectedGroups.includes(group.id) && (
                      <CheckCircle className="h-5 w-5 text-primary" />
                    )}
                  </div>
                ))}
              </div>

              <Separator />

              <div>
                <Label htmlFor="custom-recipients">Additional Recipients</Label>
                <Textarea
                  id="custom-recipients"
                  placeholder="Enter email addresses separated by commas..."
                  value={customRecipients}
                  onChange={(e) => setCustomRecipients(e.target.value)}
                  className="mt-2"
                  rows={3}
                />
              </div>

              {selectedChannels.includes('email') && (
                <>
                  <Separator />
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="email-subject">Email Subject</Label>
                      <Input
                        id="email-subject"
                        placeholder="2024 Sustainability Report - Now Available"
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email-message">Email Message</Label>
                      <Textarea
                        id="email-message"
                        placeholder="Dear stakeholder, we are pleased to share our 2024 sustainability report..."
                        value={emailMessage}
                        onChange={(e) => setEmailMessage(e.target.value)}
                        className="mt-1"
                        rows={4}
                      />
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Publication Options</CardTitle>
              <CardDescription>
                Choose when and how to publish your report
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4">
                <Button 
                  onClick={handlePublishNow}
                  disabled={isPublishing || selectedFormats.length === 0}
                  className="flex-1"
                >
                  <PlayCircle className="h-4 w-4 mr-2" />
                  Publish Now
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleSchedulePublication}
                  disabled={!scheduleDate || selectedFormats.length === 0}
                  className="flex-1"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Schedule Publication
                </Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Schedule Settings</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Publication Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {scheduleDate ? scheduleDate.toLocaleDateString() : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={scheduleDate}
                          onSelect={setScheduleDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label>Publication Time</Label>
                    <Input
                      type="time"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Publication Settings</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">Require approval before publishing</Label>
                      <p className="text-xs text-muted-foreground">Send to approvers before distribution</p>
                    </div>
                    <Switch 
                      checked={requireApproval}
                      onCheckedChange={setRequireApproval}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">Enable delivery tracking</Label>
                      <p className="text-xs text-muted-foreground">Track opens, downloads, and engagement</p>
                    </div>
                    <Switch 
                      checked={enableTracking}
                      onCheckedChange={setEnableTracking}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">Auto-archive after distribution</Label>
                      <p className="text-xs text-muted-foreground">Move to archive after successful delivery</p>
                    </div>
                    <Switch 
                      checked={autoArchive}
                      onCheckedChange={setAutoArchive}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Publishing History</CardTitle>
              <CardDescription>
                Track previous publications and their performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {publishingJobs.map((job) => (
                  <Card key={job.id} className="border">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h5 className="font-medium text-sm">{job.title}</h5>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={getStatusColor(job.status)}>
                                {job.status}
                              </Badge>
                              {job.scheduledAt && (
                                <span className="text-xs text-muted-foreground">
                                  Scheduled: {new Date(job.scheduledAt).toLocaleString()}
                                </span>
                              )}
                              {job.completedAt && (
                                <span className="text-xs text-muted-foreground">
                                  Completed: {new Date(job.completedAt).toLocaleString()}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          {job.status === 'publishing' && (
                            <div className="text-right">
                              <Badge variant="outline">{job.progress}%</Badge>
                              <Progress value={job.progress} className="w-20 h-2 mt-1" />
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <span>Formats:</span>
                            {job.formats.map(formatId => (
                              <Badge key={formatId} variant="outline" className="text-xs">
                                {getFormatIcon(formatId)}
                                {formatId.toUpperCase()}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <span>Channels:</span>
                            {job.channels.map(channelId => (
                              <Badge key={channelId} variant="outline" className="text-xs">
                                {getChannelIcon(channelId)}
                                {channelId}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {job.deliveryStats && (
                          <div className="grid grid-cols-4 gap-4 p-3 bg-muted/50 rounded">
                            <div className="text-center">
                              <div className="text-lg font-bold">{job.deliveryStats.sent}</div>
                              <div className="text-xs text-muted-foreground">Sent</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold">{job.deliveryStats.delivered}</div>
                              <div className="text-xs text-muted-foreground">Delivered</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold">{job.deliveryStats.opened}</div>
                              <div className="text-xs text-muted-foreground">Opened</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold">{job.deliveryStats.downloaded}</div>
                              <div className="text-xs text-muted-foreground">Downloaded</div>
                            </div>
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3 mr-1" />
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-3 w-3 mr-1" />
                            Download Files
                          </Button>
                          {job.status === 'scheduled' && (
                            <Button variant="outline" size="sm">
                              <StopCircle className="h-3 w-3 mr-1" />
                              Cancel
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Summary Panel */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="h-4 w-4" />
            <span>Publishing summary: {selectedFormats.length} formats, {selectedChannels.length} channels, {calculateTotalRecipients()} recipients</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 