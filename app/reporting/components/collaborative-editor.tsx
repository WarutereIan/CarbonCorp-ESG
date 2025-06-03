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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { 
  Users, 
  MessageSquare, 
  Edit3, 
  Lock, 
  Unlock,
  Share2, 
  History, 
  Clock,
  CheckCircle,
  AlertCircle,
  Trash2,
  Reply,
  AtSign,
  Eye,
  Download,
  Filter,
  Plus,
  MoreHorizontal,
  GitBranch,
  FileText,
  User,
  Calendar as CalendarIcon,
  Zap
} from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'owner' | 'editor' | 'commenter' | 'viewer'
  status: 'online' | 'away' | 'offline'
  lastSeen: string
  currentSection?: string
  cursor?: { line: number, column: number }
}

interface Comment {
  id: string
  content: string
  author: User
  timestamp: string
  sectionId: string
  position?: { start: number, end: number }
  status: 'open' | 'resolved'
  replies?: Comment[]
  mentions?: string[]
  attachments?: string[]
}

interface Change {
  id: string
  type: 'insert' | 'delete' | 'format' | 'move'
  content: string
  author: User
  timestamp: string
  sectionId: string
  position: { start: number, end: number }
  status: 'pending' | 'accepted' | 'rejected'
}

interface Version {
  id: string
  name: string
  description?: string
  author: User
  timestamp: string
  changes: number
  status: 'draft' | 'review' | 'approved' | 'published'
}

interface SectionLock {
  sectionId: string
  lockedBy: User
  lockedAt: string
  expiresAt: string
}

interface CollaborativeEditorProps {
  reportId: string
  currentUser: User
  content: any
  onContentChange: (content: any) => void
  onSave: () => void
}

export function CollaborativeEditor({
  reportId,
  currentUser,
  content,
  onContentChange,
  onSave
}: CollaborativeEditorProps) {
  const [activeUsers, setActiveUsers] = useState<User[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [changes, setChanges] = useState<Change[]>([])
  const [versions, setVersions] = useState<Version[]>([])
  const [sectionLocks, setSectionLocks] = useState<SectionLock[]>([])
  const [trackChanges, setTrackChanges] = useState(false)
  const [selectedText, setSelectedText] = useState<string>('')
  const [commentFilter, setCommentFilter] = useState<'all' | 'open' | 'resolved' | 'mentions'>('all')
  const [showPresence, setShowPresence] = useState(true)
  const [newComment, setNewComment] = useState('')
  const [selectedSection, setSelectedSection] = useState<string>('')

  // Initialize mock data
  useEffect(() => {
    initializeMockData()
    // Simulate real-time updates
    const interval = setInterval(() => {
      updateUserPresence()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const initializeMockData = () => {
    // Mock active users
    setActiveUsers([
      {
        id: 'user-1',
        name: 'Sarah Chen',
        email: 'sarah.chen@example.com',
        avatar: '/avatars/sarah.jpg',
        role: 'editor',
        status: 'online',
        lastSeen: new Date().toISOString(),
        currentSection: 'executive-summary'
      },
      {
        id: 'user-2',
        name: 'Marcus Johnson',
        email: 'marcus.j@example.com',
        role: 'commenter',
        status: 'online',
        lastSeen: new Date(Date.now() - 300000).toISOString(),
        currentSection: 'climate-metrics'
      },
      {
        id: 'user-3',
        name: 'Dr. Aisha Patel',
        email: 'aisha.patel@example.com',
        role: 'owner',
        status: 'away',
        lastSeen: new Date(Date.now() - 1800000).toISOString()
      }
    ])

    // Mock comments
    setComments([
      {
        id: 'comment-1',
        content: 'This section needs more specific metrics. Can we add the actual reduction percentages?',
        author: activeUsers[0] || currentUser,
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        sectionId: 'emissions-reduction',
        status: 'open',
        mentions: ['user-2'],
        replies: [
          {
            id: 'reply-1',
            content: '@sarah.chen I agree, let me pull the latest data from our energy management system.',
            author: activeUsers[1] || currentUser,
            timestamp: new Date(Date.now() - 1800000).toISOString(),
            sectionId: 'emissions-reduction',
            status: 'open',
            mentions: ['user-1']
          }
        ]
      },
      {
        id: 'comment-2',
        content: 'The methodology section looks comprehensive. Well done team! 👏',
        author: activeUsers[2] || currentUser,
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        sectionId: 'methodology',
        status: 'resolved'
      }
    ])

    // Mock versions
    setVersions([
      {
        id: 'v-1',
        name: 'Draft v1.0',
        description: 'Initial draft with core sections',
        author: currentUser,
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        changes: 23,
        status: 'draft'
      },
      {
        id: 'v-2',
        name: 'Review v1.1',
        description: 'Added compliance sections and updated metrics',
        author: activeUsers[0] || currentUser,
        timestamp: new Date(Date.now() - 43200000).toISOString(),
        changes: 15,
        status: 'review'
      }
    ])

    // Mock changes
    setChanges([
      {
        id: 'change-1',
        type: 'insert',
        content: 'Added new paragraph about renewable energy initiatives',
        author: activeUsers[0] || currentUser,
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        sectionId: 'environmental-strategy',
        position: { start: 150, end: 220 },
        status: 'pending'
      }
    ])
  }

  const updateUserPresence = () => {
    setActiveUsers(prev => prev.map(user => ({
      ...user,
      lastSeen: user.status === 'online' ? new Date().toISOString() : user.lastSeen,
      currentSection: Math.random() > 0.7 ? getRandomSection() : user.currentSection
    })))
  }

  const getRandomSection = () => {
    const sections = ['executive-summary', 'climate-metrics', 'governance', 'methodology', 'environmental-strategy']
    return sections[Math.floor(Math.random() * sections.length)]
  }

  const addComment = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: `comment-${Date.now()}`,
      content: newComment,
      author: currentUser,
      timestamp: new Date().toISOString(),
      sectionId: selectedSection || 'general',
      status: 'open',
      mentions: extractMentions(newComment)
    }

    setComments(prev => [comment, ...prev])
    setNewComment('')
  }

  const extractMentions = (text: string): string[] => {
    const mentionRegex = /@(\w+(?:\.\w+)*)/g
    const mentions = []
    let match
    while ((match = mentionRegex.exec(text)) !== null) {
      mentions.push(match[1])
    }
    return mentions
  }

  const resolveComment = (commentId: string) => {
    setComments(prev => prev.map(comment => 
      comment.id === commentId ? { ...comment, status: 'resolved' } : comment
    ))
  }

  const lockSection = (sectionId: string) => {
    const lock: SectionLock = {
      sectionId,
      lockedBy: currentUser,
      lockedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 3600000).toISOString() // 1 hour
    }
    setSectionLocks(prev => [...prev.filter(l => l.sectionId !== sectionId), lock])
  }

  const unlockSection = (sectionId: string) => {
    setSectionLocks(prev => prev.filter(l => l.sectionId !== sectionId))
  }

  const isSectionLocked = (sectionId: string) => {
    const lock = sectionLocks.find(l => l.sectionId === sectionId)
    return lock && lock.lockedBy.id !== currentUser.id
  }

  const acceptChange = (changeId: string) => {
    setChanges(prev => prev.map(change => 
      change.id === changeId ? { ...change, status: 'accepted' } : change
    ))
  }

  const rejectChange = (changeId: string) => {
    setChanges(prev => prev.map(change => 
      change.id === changeId ? { ...change, status: 'rejected' } : change
    ))
  }

  const filteredComments = () => {
    return comments.filter(comment => {
      switch (commentFilter) {
        case 'open': return comment.status === 'open'
        case 'resolved': return comment.status === 'resolved'
        case 'mentions': return comment.mentions?.includes(currentUser.email.split('@')[0])
        default: return true
      }
    })
  }

  const getUserStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'away': return 'bg-yellow-500'
      case 'offline': return 'bg-gray-400'
      default: return 'bg-gray-400'
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner': return 'bg-purple-100 text-purple-800'
      case 'editor': return 'bg-blue-100 text-blue-800'
      case 'commenter': return 'bg-yellow-100 text-yellow-800'
      case 'viewer': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="w-full space-y-6">
      {/* Collaboration Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <CardTitle>Collaborative Editing</CardTitle>
                <CardDescription>
                  Real-time collaboration with team members
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Switch
                  checked={trackChanges}
                  onCheckedChange={setTrackChanges}
                  id="track-changes"
                />
                <Label htmlFor="track-changes" className="text-sm">Track Changes</Label>
              </div>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-3">
          {/* User Presence Indicators */}
          {showPresence && (
            <Card className="mb-4">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium">Currently Active</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPresence(!showPresence)}
                  >
                    <Eye className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex items-center gap-3">
                  {activeUsers.map((user) => (
                    <div key={user.id} className="flex items-center gap-2">
                      <div className="relative">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback className="text-xs">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-white ${getUserStatusColor(user.status)}`} />
                      </div>
                      <div className="text-xs">
                        <div className="font-medium">{user.name}</div>
                        {user.currentSection && (
                          <div className="text-muted-foreground">
                            {user.currentSection.replace('-', ' ')}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Main Editor Area */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Report Content</CardTitle>
                <div className="flex items-center gap-2">
                  {trackChanges && (
                    <Badge variant="outline" className="text-xs">
                      <Edit3 className="h-3 w-3 mr-1" />
                      Tracking Changes
                    </Badge>
                  )}
                  <Button variant="outline" size="sm" onClick={onSave}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Section Selection for Comments */}
                <div className="flex items-center gap-2 text-sm">
                  <Label>Current Section:</Label>
                  <Select value={selectedSection} onValueChange={setSelectedSection}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select section" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="executive-summary">Executive Summary</SelectItem>
                      <SelectItem value="methodology">Methodology</SelectItem>
                      <SelectItem value="climate-metrics">Climate Metrics</SelectItem>
                      <SelectItem value="environmental-strategy">Environmental Strategy</SelectItem>
                      <SelectItem value="governance">Governance</SelectItem>
                    </SelectContent>
                  </Select>
                  {selectedSection && isSectionLocked(selectedSection) && (
                    <Badge variant="destructive" className="text-xs">
                      <Lock className="h-3 w-3 mr-1" />
                      Locked
                    </Badge>
                  )}
                </div>

                {/* Mock Content Editor */}
                <div className="border rounded-lg p-4 min-h-96 bg-white relative">
                  <div className="prose prose-sm max-w-none">
                    <h2>Executive Summary</h2>
                    <p>
                      Our 2023 sustainability report demonstrates significant progress toward our net-zero commitments.
                      <span className="bg-blue-100 px-1 rounded" title="Comment by Sarah Chen">
                        Key achievements include a 25% reduction in Scope 1 and 2 emissions
                      </span>
                      compared to our 2020 baseline, primarily driven by our transition to renewable energy sources
                      and implementation of energy efficiency measures across all operations.
                    </p>
                    
                    {trackChanges && (
                      <div className="mt-4 p-2 border-l-4 border-green-500 bg-green-50">
                        <div className="text-xs text-green-700 mb-1">
                          ✅ Added by {activeUsers[0]?.name} • 30 minutes ago
                        </div>
                        <p className="text-sm">
                          Additionally, we have achieved a 40% improvement in water efficiency and diverted 95% of our waste from landfills through our comprehensive circular economy initiatives.
                        </p>
                      </div>
                    )}

                    <h3>Climate Action</h3>
                    <p>
                      Our climate strategy is aligned with the Science Based Targets initiative (SBTi) and follows the recommendations of the Task Force on Climate-related Financial Disclosures (TCFD).
                    </p>
                  </div>

                  {/* Selection Highlight */}
                  {selectedText && (
                    <div className="absolute top-2 right-2">
                      <Button size="sm" variant="outline" onClick={() => setNewComment(selectedText)}>
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Comment
                      </Button>
                    </div>
                  )}
                </div>

                {/* Quick Comment Input */}
                <div className="space-y-2">
                  <Label>Add Comment</Label>
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Add a comment... (use @username to mention team members)"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="flex-1"
                      rows={2}
                    />
                    <Button onClick={addComment} disabled={!newComment.trim()}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Comment
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Collaboration Sidebar */}
        <div className="lg:col-span-1">
          <Tabs defaultValue="comments" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="comments">Comments</TabsTrigger>
              <TabsTrigger value="changes">Changes</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="comments" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">Comments</CardTitle>
                    <Select value={commentFilter} onValueChange={(value: 'all' | 'open' | 'resolved' | 'mentions') => setCommentFilter(value)}>
                      <SelectTrigger className="w-24">
                        <Filter className="h-3 w-3" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="mentions">Mentions</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    <div className="space-y-4">
                      {filteredComments().map((comment) => (
                        <div key={comment.id} className="space-y-2">
                          <div className="flex items-start gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={comment.author.avatar} />
                              <AvatarFallback className="text-xs">
                                {comment.author.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-medium">{comment.author.name}</span>
                                <Badge className={getRoleColor(comment.author.role)}>
                                  {comment.author.role}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(comment.timestamp).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-xs text-gray-700 mb-2">{comment.content}</p>
                              <div className="flex items-center gap-1">
                                {comment.status === 'open' ? (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => resolveComment(comment.id)}
                                    className="h-6 text-xs"
                                  >
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Resolve
                                  </Button>
                                ) : (
                                  <Badge variant="outline" className="text-xs">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Resolved
                                  </Badge>
                                )}
                                <Button variant="ghost" size="sm" className="h-6 text-xs">
                                  <Reply className="h-3 w-3 mr-1" />
                                  Reply
                                </Button>
                              </div>
                              
                              {/* Replies */}
                              {comment.replies && comment.replies.length > 0 && (
                                <div className="ml-4 mt-2 space-y-2 border-l-2 border-gray-200 pl-3">
                                  {comment.replies.map((reply) => (
                                    <div key={reply.id} className="text-xs">
                                      <div className="flex items-center gap-1 mb-1">
                                        <span className="font-medium">{reply.author.name}</span>
                                        <span className="text-muted-foreground">
                                          {new Date(reply.timestamp).toLocaleDateString()}
                                        </span>
                                      </div>
                                      <p className="text-gray-600">{reply.content}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                          <Separator />
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="changes" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Track Changes</CardTitle>
                  <CardDescription className="text-xs">
                    Review and accept/reject modifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    <div className="space-y-3">
                      {changes.map((change) => (
                        <div key={change.id} className="space-y-2">
                          <div className="flex items-start gap-2">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              change.type === 'insert' ? 'bg-green-500' :
                              change.type === 'delete' ? 'bg-red-500' :
                              'bg-blue-500'
                            }`} />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline" className="text-xs">
                                  {change.type}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  by {change.author.name}
                                </span>
                              </div>
                              <p className="text-xs text-gray-700 mb-2">{change.content}</p>
                              {change.status === 'pending' && (
                                <div className="flex gap-1">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => acceptChange(change.id)}
                                    className="h-6 text-xs"
                                  >
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Accept
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => rejectChange(change.id)}
                                    className="h-6 text-xs"
                                  >
                                    <Trash2 className="h-3 w-3 mr-1" />
                                    Reject
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                          <Separator />
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Version History</CardTitle>
                  <CardDescription className="text-xs">
                    Track document versions and changes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    <div className="space-y-3">
                      {versions.map((version) => (
                        <div key={version.id} className="space-y-2">
                          <div className="flex items-start gap-3">
                            <GitBranch className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium">{version.name}</span>
                                <Badge variant="outline" className="text-xs">
                                  {version.status}
                                </Badge>
                              </div>
                              {version.description && (
                                <p className="text-xs text-gray-600 mb-1">{version.description}</p>
                              )}
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>{version.author.name}</span>
                                <span>•</span>
                                <span>{new Date(version.timestamp).toLocaleDateString()}</span>
                                <span>•</span>
                                <span>{version.changes} changes</span>
                              </div>
                              <div className="flex gap-1 mt-2">
                                <Button variant="outline" size="sm" className="h-6 text-xs">
                                  <Eye className="h-3 w-3 mr-1" />
                                  View
                                </Button>
                                <Button variant="outline" size="sm" className="h-6 text-xs">
                                  <Download className="h-3 w-3 mr-1" />
                                  Compare
                                </Button>
                              </div>
                            </div>
                          </div>
                          <Separator />
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Team Presence */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {activeUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback className="text-xs">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-white ${getUserStatusColor(user.status)}`} />
                      </div>
                      <div className="text-xs">
                        <div className="font-medium">{user.name}</div>
                        <div className="text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                    <Badge className={getRoleColor(user.role)}>
                      {user.role}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 