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
import { 
  Share2, 
  Users, 
  Link2, 
  Copy,
  Send,
  Settings,
  Crown,
  Edit3,
  MessageSquare,
  Eye,
  UserPlus,
  Mail,
  Globe,
  Lock,
  Unlock,
  Shield,
  Calendar as CalendarIcon,
  Clock,
  CheckCircle,
  AlertTriangle,
  Trash2,
  MoreHorizontal,
  Download
} from "lucide-react"

interface TeamMember {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'owner' | 'editor' | 'commenter' | 'viewer'
  status: 'active' | 'pending' | 'inactive'
  joinedAt: string
  lastActivity: string
}

interface ShareLink {
  id: string
  name: string
  url: string
  permissions: 'view' | 'comment' | 'edit'
  expires?: string
  password?: boolean
  analytics: {
    views: number
    downloads: number
    lastAccessed: string
  }
  created: string
}

interface SharingCollaborationManagerProps {
  reportId: string
  reportTitle: string
  currentUser: TeamMember
  onShare: (data: any) => void
}

export function SharingCollaborationManager({
  reportId,
  reportTitle,
  currentUser,
  onShare
}: SharingCollaborationManagerProps) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [shareLinks, setShareLinks] = useState<ShareLink[]>([])
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState<'editor' | 'commenter' | 'viewer'>('viewer')
  const [inviteMessage, setInviteMessage] = useState('')
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false)
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false)
  const [linkPermission, setLinkPermission] = useState<'view' | 'comment' | 'edit'>('view')
  const [linkExpiry, setLinkExpiry] = useState<Date | undefined>()
  const [linkPassword, setLinkPassword] = useState(false)
  const [linkName, setLinkName] = useState('')
  const [allowPublicAccess, setAllowPublicAccess] = useState(false)
  const [enableComments, setEnableComments] = useState(true)
  const [enableSuggestions, setEnableSuggestions] = useState(true)
  const [enableDownload, setEnableDownload] = useState(false)

  // Initialize mock data
  useEffect(() => {
    initializeMockData()
  }, [])

  const initializeMockData = () => {
    setTeamMembers([
      {
        id: 'member-1',
        name: 'Sarah Chen',
        email: 'sarah.chen@example.com',
        avatar: '/avatars/sarah.jpg',
        role: 'editor',
        status: 'active',
        joinedAt: '2024-01-15',
        lastActivity: new Date().toISOString()
      },
      {
        id: 'member-2',
        name: 'Marcus Johnson',
        email: 'marcus.j@example.com',
        role: 'commenter',
        status: 'active',
        joinedAt: '2024-02-01',
        lastActivity: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: 'member-3',
        name: 'Dr. Aisha Patel',
        email: 'aisha.patel@example.com',
        role: 'owner',
        status: 'active',
        joinedAt: '2024-01-01',
        lastActivity: new Date(Date.now() - 1800000).toISOString()
      },
      {
        id: 'member-4',
        name: 'James Wilson',
        email: 'james.wilson@example.com',
        role: 'viewer',
        status: 'pending',
        joinedAt: new Date().toISOString(),
        lastActivity: ''
      }
    ])

    setShareLinks([
      {
        id: 'link-1',
        name: 'Board Review Link',
        url: 'https://app.carboncorp.com/reports/shared/abc123xyz',
        permissions: 'comment',
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
        password: true,
        analytics: {
          views: 23,
          downloads: 5,
          lastAccessed: new Date(Date.now() - 7200000).toISOString()
        },
        created: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: 'link-2',
        name: 'Stakeholder Preview',
        url: 'https://app.carboncorp.com/reports/shared/def456uvw',
        permissions: 'view',
        analytics: {
          views: 45,
          downloads: 12,
          lastAccessed: new Date(Date.now() - 3600000).toISOString()
        },
        created: new Date(Date.now() - 172800000).toISOString()
      }
    ])
  }

  const handleInviteTeamMember = () => {
    if (!inviteEmail.trim()) return

    const newMember: TeamMember = {
      id: `member-${Date.now()}`,
      name: inviteEmail.split('@')[0], // Temporary name
      email: inviteEmail,
      role: inviteRole,
      status: 'pending',
      joinedAt: new Date().toISOString(),
      lastActivity: ''
    }

    setTeamMembers(prev => [...prev, newMember])
    setInviteEmail('')
    setInviteMessage('')
    setIsInviteDialogOpen(false)

    // Simulate sending invitation
    onShare({
      type: 'member_invited',
      member: newMember,
      message: inviteMessage
    })
  }

  const handleCreateShareLink = () => {
    const newLink: ShareLink = {
      id: `link-${Date.now()}`,
      name: linkName || `${reportTitle} - Shared Link`,
      url: `https://app.carboncorp.com/reports/shared/${Math.random().toString(36).substring(7)}`,
      permissions: linkPermission,
      expires: linkExpiry?.toISOString(),
      password: linkPassword,
      analytics: {
        views: 0,
        downloads: 0,
        lastAccessed: ''
      },
      created: new Date().toISOString()
    }

    setShareLinks(prev => [...prev, newLink])
    setLinkName('')
    setLinkExpiry(undefined)
    setLinkPassword(false)
    setIsLinkDialogOpen(false)

    onShare({
      type: 'link_created',
      link: newLink
    })
  }

  const updateMemberRole = (memberId: string, newRole: 'editor' | 'commenter' | 'viewer') => {
    setTeamMembers(prev => prev.map(member => 
      member.id === memberId ? { ...member, role: newRole } : member
    ))
  }

  const removeMember = (memberId: string) => {
    setTeamMembers(prev => prev.filter(member => member.id !== memberId))
  }

  const copyLinkToClipboard = (url: string) => {
    navigator.clipboard.writeText(url)
    // You might want to show a toast notification here
  }

  const deleteShareLink = (linkId: string) => {
    setShareLinks(prev => prev.filter(link => link.id !== linkId))
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPermissionIcon = (permission: string) => {
    switch (permission) {
      case 'edit': return <Edit3 className="h-3 w-3" />
      case 'comment': return <MessageSquare className="h-3 w-3" />
      case 'view': return <Eye className="h-3 w-3" />
      default: return <Eye className="h-3 w-3" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Share2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle>Share & Collaborate</CardTitle>
                <CardDescription>
                  Manage team access and sharing for "{reportTitle}"
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Invite Team Member
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Invite Team Member</DialogTitle>
                    <DialogDescription>
                      Send an invitation to collaborate on this report
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="invite-email">Email Address</Label>
                      <Input
                        id="invite-email"
                        type="email"
                        placeholder="colleague@example.com"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Role</Label>
                      <Select value={inviteRole} onValueChange={(value: 'editor' | 'commenter' | 'viewer') => setInviteRole(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="editor">Editor - Can edit content</SelectItem>
                          <SelectItem value="commenter">Commenter - Can add comments</SelectItem>
                          <SelectItem value="viewer">Viewer - Read-only access</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="invite-message">Message (Optional)</Label>
                      <Textarea
                        id="invite-message"
                        placeholder="Add a personal message to the invitation..."
                        value={inviteMessage}
                        onChange={(e) => setInviteMessage(e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleInviteTeamMember} className="flex-1">
                        <Send className="h-4 w-4 mr-2" />
                        Send Invitation
                      </Button>
                      <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Link2 className="h-4 w-4 mr-2" />
                    Create Share Link
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Share Link</DialogTitle>
                    <DialogDescription>
                      Generate a shareable link with specific permissions
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="link-name">Link Name</Label>
                      <Input
                        id="link-name"
                        placeholder="e.g., Board Review Link"
                        value={linkName}
                        onChange={(e) => setLinkName(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Permissions</Label>
                      <Select value={linkPermission} onValueChange={(value: 'view' | 'comment' | 'edit') => setLinkPermission(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="view">View Only</SelectItem>
                          <SelectItem value="comment">Can Comment</SelectItem>
                          <SelectItem value="edit">Can Edit</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="link-password"
                        checked={linkPassword}
                        onCheckedChange={setLinkPassword}
                      />
                      <Label htmlFor="link-password">Require password</Label>
                    </div>
                    <div>
                      <Label>Expiry Date (Optional)</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {linkExpiry ? linkExpiry.toLocaleDateString() : "No expiry"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={linkExpiry}
                            onSelect={setLinkExpiry}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleCreateShareLink} className="flex-1">
                        <Link2 className="h-4 w-4 mr-2" />
                        Create Link
                      </Button>
                      <Button variant="outline" onClick={() => setIsLinkDialogOpen(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="team" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="team">Team Members</TabsTrigger>
          <TabsTrigger value="links">Share Links</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Team Members ({teamMembers.length})</CardTitle>
              <CardDescription>
                Manage team member access and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{member.name}</span>
                          {member.role === 'owner' && <Crown className="h-3 w-3 text-yellow-500" />}
                          <Badge className={getStatusColor(member.status)}>
                            {member.status}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">{member.email}</div>
                        {member.lastActivity && (
                          <div className="text-xs text-muted-foreground">
                            Last active: {new Date(member.lastActivity).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {member.role !== 'owner' ? (
                        <Select value={member.role} onValueChange={(value: 'editor' | 'commenter' | 'viewer') => updateMemberRole(member.id, value)}>
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="editor">Editor</SelectItem>
                            <SelectItem value="commenter">Commenter</SelectItem>
                            <SelectItem value="viewer">Viewer</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <Badge className={getRoleColor(member.role)}>
                          {member.role}
                        </Badge>
                      )}
                      
                      {member.role !== 'owner' && currentUser.role === 'owner' && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeMember(member.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="links" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Share Links ({shareLinks.length})</CardTitle>
              <CardDescription>
                Manage shareable links and track their usage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {shareLinks.map((link) => (
                  <div key={link.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-sm">{link.name}</h4>
                          <Badge variant="outline" className="flex items-center gap-1">
                            {getPermissionIcon(link.permissions)}
                            {link.permissions}
                          </Badge>
                          {link.password && (
                            <Badge variant="outline">
                              <Lock className="h-3 w-3 mr-1" />
                              Protected
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <div>Created: {new Date(link.created).toLocaleDateString()}</div>
                          {link.expires && (
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Expires: {new Date(link.expires).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => copyLinkToClipboard(link.url)}
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Copy
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => deleteShareLink(link.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 p-3 bg-muted/50 rounded">
                      <div className="text-center">
                        <div className="text-lg font-bold">{link.analytics.views}</div>
                        <div className="text-xs text-muted-foreground">Views</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold">{link.analytics.downloads}</div>
                        <div className="text-xs text-muted-foreground">Downloads</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs font-medium">
                          {link.analytics.lastAccessed ? 
                            new Date(link.analytics.lastAccessed).toLocaleDateString() : 
                            'Never'
                          }
                        </div>
                        <div className="text-xs text-muted-foreground">Last Accessed</div>
                      </div>
                    </div>
                    
                    <div className="text-xs font-mono bg-gray-100 p-2 rounded border truncate">
                      {link.url}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Collaboration Settings</CardTitle>
              <CardDescription>
                Configure how team members can interact with this report
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="public-access" className="font-medium">Allow Public Access</Label>
                    <p className="text-xs text-muted-foreground">Anyone with the link can view this report</p>
                  </div>
                  <Switch 
                    id="public-access"
                    checked={allowPublicAccess}
                    onCheckedChange={setAllowPublicAccess}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enable-comments" className="font-medium">Enable Comments</Label>
                    <p className="text-xs text-muted-foreground">Allow team members to add comments</p>
                  </div>
                  <Switch 
                    id="enable-comments"
                    checked={enableComments}
                    onCheckedChange={setEnableComments}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enable-suggestions" className="font-medium">Enable Suggestions</Label>
                    <p className="text-xs text-muted-foreground">Allow suggesting edits without direct changes</p>
                  </div>
                  <Switch 
                    id="enable-suggestions"
                    checked={enableSuggestions}
                    onCheckedChange={setEnableSuggestions}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enable-download" className="font-medium">Enable Download</Label>
                    <p className="text-xs text-muted-foreground">Allow downloading PDF/Word versions</p>
                  </div>
                  <Switch 
                    id="enable-download"
                    checked={enableDownload}
                    onCheckedChange={setEnableDownload}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div>
                <Label className="font-medium mb-3 block">Default Permissions for New Members</Label>
                <Select defaultValue="viewer">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="commenter">Commenter</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Separator />
              
              <div>
                <Label className="font-medium mb-3 block">Notification Preferences</Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">New comments</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Content changes</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">New team members</span>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Share link access</span>
                    <Switch />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Changes to collaboration settings will be applied immediately and affect all team members.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  )
} 