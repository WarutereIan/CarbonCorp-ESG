"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  UserPlus, 
  Users, 
  Shield, 
  Mail, 
  MoreHorizontal, 
  Edit2, 
  Trash2, 
  UserX, 
  RefreshCw,
  Plus,
  Settings
} from "lucide-react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

// Define available roles and permissions
const PREDEFINED_ROLES = [
  { id: "admin", name: "Admin", description: "Full access to all features" },
  { id: "data_manager", name: "Data Manager", description: "Manage data sources and quality" },
  { id: "esg_strategist", name: "ESG Strategist", description: "Create and manage ESG strategies" },
  { id: "report_creator", name: "Report Creator", description: "Create and edit reports" },
  { id: "auditor", name: "Auditor", description: "View-only access for audit purposes" },
  { id: "viewer", name: "Viewer", description: "Read-only access to dashboards" }
]

const MODULES = [
  { id: "dashboard", name: "Dashboard" },
  { id: "data_hub", name: "Data Hub" },
  { id: "ai_engine", name: "AI Engine" },
  { id: "reporting", name: "Reporting Studio" },
  { id: "compliance", name: "Compliance Center" },
  { id: "collaboration", name: "Collaboration Workspace" },
  { id: "analytics", name: "Analytics Module" },
  { id: "settings", name: "Settings" }
]

const PERMISSIONS = ["create", "read", "update", "delete", "approve"]

interface TeamMember {
  id: string
  name: string
  email: string
  roles: string[]
  status: "invited" | "active" | "suspended"
  lastActive?: string
  avatar?: string
}

interface CustomRole {
  id: string
  name: string
  description: string
  permissions: Record<string, string[]>
}

const inviteSchema = z.object({
  emails: z.string().min(1, "At least one email is required"),
  roles: z.array(z.string()).min(1, "At least one role must be selected")
})

const roleSchema = z.object({
  name: z.string().min(2, "Role name must be at least 2 characters"),
  description: z.string().min(5, "Description must be at least 5 characters")
})

type InviteFormData = z.infer<typeof inviteSchema>
type RoleFormData = z.infer<typeof roleSchema>

export default function TeamPage() {
  const [isInviting, setIsInviting] = useState(false)
  const [isCreatingRole, setIsCreatingRole] = useState(false)
  const [showInviteDialog, setShowInviteDialog] = useState(false)
  const [showRoleDialog, setShowRoleDialog] = useState(false)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [customRoles, setCustomRoles] = useState<CustomRole[]>([])
  const [newRolePermissions, setNewRolePermissions] = useState<Record<string, string[]>>({})

  // Mock team members data
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@company.com",
      roles: ["admin"],
      status: "active",
      lastActive: "2 hours ago"
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@company.com",
      roles: ["data_manager", "report_creator"],
      status: "active",
      lastActive: "1 day ago"
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike.johnson@company.com",
      roles: ["esg_strategist"],
      status: "invited",
      lastActive: undefined
    }
  ])

  const inviteForm = useForm<InviteFormData>({
    resolver: zodResolver(inviteSchema)
  })

  const roleForm = useForm<RoleFormData>({
    resolver: zodResolver(roleSchema)
  })

  const handleInviteSubmit = async (data: InviteFormData) => {
    setIsInviting(true)
    try {
      // TODO: Implement actual invitation logic
      console.log("Inviting team members:", data)
      
      // Parse emails and create new members
      const emails = data.emails.split(",").map(email => email.trim())
      const newMembers: TeamMember[] = emails.map((email, index) => ({
        id: `new_${Date.now()}_${index}`,
        name: email.split("@")[0],
        email,
        roles: data.roles,
        status: "invited" as const
      }))
      
      setTeamMembers(prev => [...prev, ...newMembers])
      setShowInviteDialog(false)
      inviteForm.reset()
    } catch (error) {
      console.error("Failed to invite members:", error)
    } finally {
      setIsInviting(false)
    }
  }

  const handleCreateRole = async (data: RoleFormData) => {
    setIsCreatingRole(true)
    try {
      // TODO: Implement actual role creation logic
      const newRole: CustomRole = {
        id: `custom_${Date.now()}`,
        name: data.name,
        description: data.description,
        permissions: newRolePermissions
      }
      
      setCustomRoles(prev => [...prev, newRole])
      setShowRoleDialog(false)
      roleForm.reset()
      setNewRolePermissions({})
    } catch (error) {
      console.error("Failed to create role:", error)
    } finally {
      setIsCreatingRole(false)
    }
  }

  const updateMemberStatus = (memberId: string, status: TeamMember["status"]) => {
    setTeamMembers(prev => 
      prev.map(member => 
        member.id === memberId ? { ...member, status } : member
      )
    )
  }

  const removeMember = (memberId: string) => {
    setTeamMembers(prev => prev.filter(member => member.id !== memberId))
  }

  const getStatusBadge = (status: TeamMember["status"]) => {
    switch (status) {
      case "active":
        return <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>
      case "invited":
        return <Badge variant="secondary">Invited</Badge>
      case "suspended":
        return <Badge variant="destructive">Suspended</Badge>
    }
  }

  const getRoleName = (roleId: string) => {
    const predefined = PREDEFINED_ROLES.find(role => role.id === roleId)
    if (predefined) return predefined.name
    
    const custom = customRoles.find(role => role.id === roleId)
    return custom?.name || roleId
  }

  const togglePermission = (moduleId: string, permission: string) => {
    setNewRolePermissions(prev => {
      const modulePerms = prev[moduleId] || []
      const updated = modulePerms.includes(permission)
        ? modulePerms.filter(p => p !== permission)
        : [...modulePerms, permission]
      
      return {
        ...prev,
        [moduleId]: updated
      }
    })
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Team Management</h1>
          <p className="text-gray-600">Manage team members, roles, and permissions</p>
        </div>
        <div className="flex space-x-2">
          <Dialog open={showRoleDialog} onOpenChange={setShowRoleDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Create Custom Role
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Create Custom Role</DialogTitle>
                <DialogDescription>
                  Define a custom role with specific permissions for your team
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={roleForm.handleSubmit(handleCreateRole)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="roleName">Role Name</Label>
                    <Input
                      {...roleForm.register("name")}
                      id="roleName"
                      placeholder="e.g., Senior Analyst"
                    />
                    {roleForm.formState.errors.name && (
                      <p className="text-sm text-red-600">{roleForm.formState.errors.name.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="roleDescription">Description</Label>
                    <Input
                      {...roleForm.register("description")}
                      id="roleDescription"
                      placeholder="Brief description of this role"
                    />
                    {roleForm.formState.errors.description && (
                      <p className="text-sm text-red-600">{roleForm.formState.errors.description.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Permissions</Label>
                  <div className="border rounded-lg p-4 space-y-4">
                    {MODULES.map(module => (
                      <div key={module.id} className="space-y-2">
                        <h4 className="font-medium">{module.name}</h4>
                        <div className="flex flex-wrap gap-2">
                          {PERMISSIONS.map(permission => (
                            <div key={permission} className="flex items-center space-x-2">
                              <Checkbox
                                id={`${module.id}_${permission}`}
                                checked={newRolePermissions[module.id]?.includes(permission) || false}
                                onCheckedChange={() => togglePermission(module.id, permission)}
                              />
                              <Label htmlFor={`${module.id}_${permission}`} className="text-sm capitalize">
                                {permission}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setShowRoleDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isCreatingRole}>
                    {isCreatingRole ? "Creating..." : "Create Role"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Invite Team Members
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite Team Members</DialogTitle>
                <DialogDescription>
                  Send invitations to new team members and assign their roles
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={inviteForm.handleSubmit(handleInviteSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="emails">Email Addresses</Label>
                  <Input
                    {...inviteForm.register("emails")}
                    id="emails"
                    placeholder="email1@company.com, email2@company.com"
                  />
                  <p className="text-xs text-gray-500">
                    Separate multiple emails with commas
                  </p>
                  {inviteForm.formState.errors.emails && (
                    <p className="text-sm text-red-600">{inviteForm.formState.errors.emails.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Roles</Label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {PREDEFINED_ROLES.map(role => (
                      <div key={role.id} className="flex items-center space-x-2">
                        <Checkbox
                          {...inviteForm.register("roles")}
                          value={role.id}
                        />
                        <div>
                          <Label className="font-medium">{role.name}</Label>
                          <p className="text-xs text-gray-500">{role.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {inviteForm.formState.errors.roles && (
                    <p className="text-sm text-red-600">{inviteForm.formState.errors.roles.message}</p>
                  )}
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setShowInviteDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isInviting}>
                    {isInviting ? "Sending..." : "Send Invitations"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="members" className="w-full">
        <TabsList>
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="roles">Role Management</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Team Members ({teamMembers.length})
              </CardTitle>
              <CardDescription>
                Manage your team members and their access permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Roles</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamMembers.map(member => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>
                              {member.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-gray-500">{member.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {member.roles.map(roleId => (
                            <Badge key={roleId} variant="outline">
                              {getRoleName(roleId)}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(member.status)}</TableCell>
                      <TableCell>{member.lastActive || "Never"}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          {member.status === "suspended" ? (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => updateMemberStatus(member.id, "active")}
                            >
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => updateMemberStatus(member.id, "suspended")}
                            >
                              <UserX className="h-4 w-4" />
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeMember(member.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Predefined Roles</CardTitle>
                <CardDescription>Default roles available in the system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {PREDEFINED_ROLES.map(role => (
                  <div key={role.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{role.name}</h4>
                      <p className="text-sm text-gray-500">{role.description}</p>
                    </div>
                    <Shield className="h-5 w-5 text-gray-400" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Custom Roles</CardTitle>
                <CardDescription>Roles created for your organization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {customRoles.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Shield className="mx-auto h-12 w-12 mb-4 opacity-50" />
                    <p>No custom roles created yet</p>
                    <p className="text-sm">Create custom roles to fit your team structure</p>
                  </div>
                ) : (
                  customRoles.map(role => (
                    <div key={role.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{role.name}</h4>
                        <p className="text-sm text-gray-500">{role.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 