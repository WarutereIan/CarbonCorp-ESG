"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { User, UserRole, Permission } from "../types/settings-types"
import {
  Users,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  UserX,
  UserCheck,
  Key,
  Mail,
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react"

export default function UserManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false)
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const [isNewUser, setIsNewUser] = useState(false)

  // Mock data - would come from API
  const mockUsers: User[] = [
    {
      id: "1",
      email: "john.doe@company.com",
      firstName: "John",
      lastName: "Doe",
      title: "ESG Manager",
      department: "Sustainability",
      roles: [
        {
          id: "admin",
          name: "Administrator",
          description: "Full system access",
          permissions: [],
          isCustom: false
        }
      ],
      status: "active",
      lastActive: "2024-01-15T10:30:00Z",
      createdAt: "2023-06-01T09:00:00Z",
      updatedAt: "2024-01-15T10:30:00Z",
      preferences: {
        theme: "light",
        language: "en",
        timezone: "UTC",
        notifications: {
          email: true,
          inApp: true,
          pushNotifications: false,
          reportReminders: true,
          complianceDeadlines: true,
          dataQualityAlerts: true,
          goalPerformanceAlerts: true
        }
      }
    },
    {
      id: "2",
      email: "sarah.wilson@company.com",
      firstName: "Sarah",
      lastName: "Wilson",
      title: "Data Analyst",
      department: "Operations",
      roles: [
        {
          id: "data-manager",
          name: "Data Manager",
          description: "Data hub and analytics access",
          permissions: [],
          isCustom: false
        }
      ],
      status: "active",
      lastActive: "2024-01-14T16:45:00Z",
      createdAt: "2023-07-15T14:20:00Z",
      updatedAt: "2024-01-14T16:45:00Z",
      preferences: {
        theme: "dark",
        language: "en",
        timezone: "UTC",
        notifications: {
          email: true,
          inApp: true,
          pushNotifications: true,
          reportReminders: false,
          complianceDeadlines: true,
          dataQualityAlerts: true,
          goalPerformanceAlerts: false
        }
      }
    },
    {
      id: "3",
      email: "mike.chen@company.com",
      firstName: "Mike",
      lastName: "Chen",
      title: "Sustainability Coordinator",
      department: "Sustainability",
      roles: [
        {
          id: "esg-strategist",
          name: "ESG Strategist",
          description: "ESG planning and strategy access",
          permissions: [],
          isCustom: false
        }
      ],
      status: "invited",
      createdAt: "2024-01-10T11:00:00Z",
      updatedAt: "2024-01-10T11:00:00Z",
      preferences: {
        theme: "system",
        language: "en",
        timezone: "UTC",
        notifications: {
          email: true,
          inApp: true,
          pushNotifications: false,
          reportReminders: true,
          complianceDeadlines: true,
          dataQualityAlerts: false,
          goalPerformanceAlerts: true
        }
      }
    }
  ]

  const mockRoles: UserRole[] = [
    {
      id: "admin",
      name: "Administrator",
      description: "Full system access with all permissions",
      permissions: [
        { id: "1", module: "users", action: "admin", granted: true },
        { id: "2", module: "settings", action: "admin", granted: true }
      ],
      isCustom: false
    },
    {
      id: "data-manager",
      name: "Data Manager",
      description: "Manage data sources, quality, and analytics",
      permissions: [
        { id: "3", module: "data-hub", action: "admin", granted: true },
        { id: "4", module: "analytics", action: "create", granted: true }
      ],
      isCustom: false
    },
    {
      id: "esg-strategist",
      name: "ESG Strategist",
      description: "Create and manage ESG strategies and goals",
      permissions: [
        { id: "5", module: "ai-engine", action: "create", granted: true },
        { id: "6", module: "analytics", action: "read", granted: true }
      ],
      isCustom: false
    },
    {
      id: "report-creator",
      name: "Report Creator",
      description: "Create and publish ESG reports",
      permissions: [
        { id: "7", module: "reporting", action: "create", granted: true },
        { id: "8", module: "analytics", action: "read", granted: true }
      ],
      isCustom: false
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "suspended":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "invited":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "inactive":
        return <XCircle className="h-4 w-4 text-gray-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "suspended":
        return "destructive"
      case "invited":
        return "secondary"
      case "inactive":
        return "outline"
      default:
        return "outline"
    }
  }

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    const matchesRole = roleFilter === "all" || user.roles.some(role => role.id === roleFilter)
    
    return matchesSearch && matchesStatus && matchesRole
  })

  const handleAddUser = () => {
    setSelectedUser({
      id: "",
      email: "",
      firstName: "",
      lastName: "",
      title: "",
      department: "",
      roles: [],
      status: "invited",
      createdAt: "",
      updatedAt: "",
      preferences: {
        theme: "system",
        language: "en",
        timezone: "UTC",
        notifications: {
          email: true,
          inApp: true,
          pushNotifications: false,
          reportReminders: true,
          complianceDeadlines: true,
          dataQualityAlerts: true,
          goalPerformanceAlerts: true
        }
      }
    })
    setIsNewUser(true)
    setIsUserDialogOpen(true)
  }

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setIsNewUser(false)
    setIsUserDialogOpen(true)
  }

  const handleSuspendUser = (userId: string) => {
    console.log("Suspending user:", userId)
    // API call to suspend user
  }

  const handleReactivateUser = (userId: string) => {
    console.log("Reactivating user:", userId)
    // API call to reactivate user
  }

  const handleResetPassword = (userId: string) => {
    console.log("Resetting password for user:", userId)
    // API call to reset password
  }

  const handleDeleteUser = (userId: string) => {
    console.log("Deleting user:", userId)
    // API call to delete user
  }

  const handleSaveUser = () => {
    console.log("Saving user:", selectedUser)
    // API call to save user
    setIsUserDialogOpen(false)
    setSelectedUser(null)
  }

  const handleAddRole = () => {
    setSelectedRole({
      id: "",
      name: "",
      description: "",
      permissions: [],
      isCustom: true
    })
    setIsRoleDialogOpen(true)
  }

  const UserActionsMenu = ({ user }: { user: User }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => handleEditUser(user)}>
          <Edit className="mr-2 h-4 w-4" />
          Edit User
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleResetPassword(user.id)}>
          <Key className="mr-2 h-4 w-4" />
          Reset Password
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {user.status === "active" ? (
          <DropdownMenuItem onClick={() => handleSuspendUser(user.id)}>
            <UserX className="mr-2 h-4 w-4" />
            Suspend User
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => handleReactivateUser(user.id)}>
            <UserCheck className="mr-2 h-4 w-4" />
            Reactivate User
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="text-red-600"
          onClick={() => handleDeleteUser(user.id)}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete User
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">
            Manage users, roles, and permissions across your organization
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleAddRole} variant="outline">
            <Shield className="mr-2 h-4 w-4" />
            Manage Roles
          </Button>
          <Button onClick={handleAddUser}>
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{mockUsers.length}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold text-green-600">
                  {mockUsers.filter(u => u.status === "active").length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Invites</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {mockUsers.filter(u => u.status === "invited").length}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Suspended</p>
                <p className="text-2xl font-bold text-red-600">
                  {mockUsers.filter(u => u.status === "suspended").length}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search users by name, email, or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="invited">Invited</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {mockRoles.map((role) => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role(s)</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.profilePhoto} />
                        <AvatarFallback>
                          {user.firstName[0]}{user.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {user.email}
                        </div>
                        {user.title && (
                          <div className="text-xs text-muted-foreground">
                            {user.title}
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.roles.map((role) => (
                        <Badge key={role.id} variant="outline" className="text-xs">
                          {role.name}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{user.department || "—"}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(user.status)}
                      <Badge variant={getStatusColor(user.status) as any}>
                        {user.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    {user.lastActive ? (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {new Date(user.lastActive).toLocaleDateString()}
                      </div>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <UserActionsMenu user={user} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* User Edit/Add Dialog */}
      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isNewUser ? "Add New User" : "Edit User"}
            </DialogTitle>
            <DialogDescription>
              {isNewUser 
                ? "Create a new user account and assign roles and permissions."
                : "Update user information, roles, and preferences."
              }
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <Tabs defaultValue="profile" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={selectedUser.firstName}
                      onChange={(e) => setSelectedUser({
                        ...selectedUser,
                        firstName: e.target.value
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={selectedUser.lastName}
                      onChange={(e) => setSelectedUser({
                        ...selectedUser,
                        lastName: e.target.value
                      })}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={selectedUser.email}
                    onChange={(e) => setSelectedUser({
                      ...selectedUser,
                      email: e.target.value
                    })}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={selectedUser.title || ""}
                      onChange={(e) => setSelectedUser({
                        ...selectedUser,
                        title: e.target.value
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={selectedUser.department || ""}
                      onChange={(e) => setSelectedUser({
                        ...selectedUser,
                        department: e.target.value
                      })}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={selectedUser.status} 
                    onValueChange={(value) => setSelectedUser({
                      ...selectedUser,
                      status: value as any
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="invited">Invited</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
              
              <TabsContent value="roles" className="space-y-4">
                <div>
                  <Label>Assigned Roles</Label>
                  <div className="space-y-2 mt-2">
                    {mockRoles.map((role) => (
                      <div key={role.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={role.id}
                          checked={selectedUser.roles.some(r => r.id === role.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedUser({
                                ...selectedUser,
                                roles: [...selectedUser.roles, role]
                              })
                            } else {
                              setSelectedUser({
                                ...selectedUser,
                                roles: selectedUser.roles.filter(r => r.id !== role.id)
                              })
                            }
                          }}
                        />
                        <div className="grid gap-1.5 leading-none">
                          <Label
                            htmlFor={role.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {role.name}
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            {role.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="preferences" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="theme">Theme</Label>
                    <Select 
                      value={selectedUser.preferences.theme} 
                      onValueChange={(value) => setSelectedUser({
                        ...selectedUser,
                        preferences: {
                          ...selectedUser.preferences,
                          theme: value as any
                        }
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="language">Language</Label>
                    <Select 
                      value={selectedUser.preferences.language} 
                      onValueChange={(value) => setSelectedUser({
                        ...selectedUser,
                        preferences: {
                          ...selectedUser.preferences,
                          language: value
                        }
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label>Notification Preferences</Label>
                  <div className="space-y-2 mt-2">
                    {Object.entries(selectedUser.preferences.notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center space-x-2">
                        <Checkbox
                          id={key}
                          checked={value}
                          onCheckedChange={(checked) => setSelectedUser({
                            ...selectedUser,
                            preferences: {
                              ...selectedUser.preferences,
                              notifications: {
                                ...selectedUser.preferences.notifications,
                                [key]: checked
                              }
                            }
                          })}
                        />
                        <Label htmlFor={key} className="text-sm capitalize">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUserDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveUser}>
              {isNewUser ? "Create User" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 