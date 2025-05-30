"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useOnboarding, TeamMember } from "@/contexts/OnboardingContext"
import { 
  ArrowLeft,
  ArrowRight,
  Users,
  UserPlus,
  Mail,
  Shield,
  Eye,
  Edit,
  Trash2,
  Upload,
  Download,
  CheckCircle,
  Settings,
  Lock,
  Database,
  FileText,
  BarChart3,
  MessageSquare,
  AlertCircle,
  Info,
  Star,
  PartyPopper,
  Target,
  Building
} from "lucide-react"

// Default roles with permissions
const defaultRoles = [
  {
    id: "admin",
    name: "Admin",
    description: "Full platform access with administrative privileges",
    icon: <Shield className="h-4 w-4" />,
    permissions: ["all"],
    color: "bg-red-100 text-red-700"
  },
  {
    id: "data-manager",
    name: "Data Manager",
    description: "Manage data sources, quality, and collection processes",
    icon: <Database className="h-4 w-4" />,
    permissions: ["data-hub", "analytics", "data-quality"],
    color: "bg-blue-100 text-blue-700"
  },
  {
    id: "esg-strategist",
    name: "ESG Strategist", 
    description: "Develop ESG strategy, set goals, and oversee initiatives",
    icon: <Target className="h-4 w-4" />,
    permissions: ["analytics", "ai-engine", "strategy", "goals"],
    color: "bg-green-100 text-green-700"
  },
  {
    id: "report-creator",
    name: "Report Creator",
    description: "Create, edit, and publish ESG reports and communications",
    icon: <FileText className="h-4 w-4" />,
    permissions: ["reporting-studio", "analytics", "ai-engine"],
    color: "bg-purple-100 text-purple-700"
  },
  {
    id: "compliance-officer", 
    name: "Compliance Officer",
    description: "Monitor regulatory compliance and manage audits",
    icon: <AlertCircle className="h-4 w-4" />,
    permissions: ["compliance-center", "reporting-studio", "analytics"],
    color: "bg-orange-100 text-orange-700"
  },
  {
    id: "auditor",
    name: "Auditor (View-Only)",
    description: "Read-only access for auditing and verification purposes",
    icon: <Eye className="h-4 w-4" />,
    permissions: ["view-only"],
    color: "bg-gray-100 text-gray-700"
  },
  {
    id: "general-user",
    name: "General User",
    description: "Basic access to view dashboards and contribute data",
    icon: <Users className="h-4 w-4" />,
    permissions: ["dashboard", "data-entry", "collaboration"],
    color: "bg-yellow-100 text-yellow-700"
  }
]

const teamSetupSchema = z.object({
  teamMembers: z.array(z.object({
    id: z.string(),
    email: z.string().email("Please enter a valid email address"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    role: z.string().min(1, "Please select a role"),
    hasBeenInvited: z.boolean()
  })),
  invitationMessage: z.string().optional(),
  skipTeamSetup: z.boolean(),
  additionalNotes: z.string().optional()
})

type TeamSetupFormData = z.infer<typeof teamSetupSchema>

interface NewTeamMember {
  email: string
  firstName: string
  lastName: string
  role: string
}

export default function TeamSetupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showAddMemberDialog, setShowAddMemberDialog] = useState(false)
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null)
  const [newMemberForm, setNewMemberForm] = useState<NewTeamMember>({
    email: "",
    firstName: "",
    lastName: "",
    role: ""
  })
  const [bulkInviteText, setBulkInviteText] = useState("")
  const [showBulkInviteDialog, setShowBulkInviteDialog] = useState(false)
  
  const router = useRouter()
  const { 
    state, 
    dispatch,
    getProgressPercentage, 
    completeStep, 
    goToStep 
  } = useOnboarding()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
    getValues
  } = useForm<TeamSetupFormData>({
    resolver: zodResolver(teamSetupSchema),
    defaultValues: {
      teamMembers: state.teamMembers || [],
      invitationMessage: "",
      skipTeamSetup: false,
      additionalNotes: ""
    }
  })

  const watchedTeamMembers = watch("teamMembers")
  const watchedSkipTeamSetup = watch("skipTeamSetup")

  // Initialize component
  useEffect(() => {
    goToStep(6)
  }, [goToStep])

  const handleAddTeamMember = () => {
    if (!newMemberForm.email || !newMemberForm.firstName || !newMemberForm.lastName || !newMemberForm.role) {
      return
    }

    const newMember: TeamMember = {
      id: `member-${Date.now()}`,
      email: newMemberForm.email,
      firstName: newMemberForm.firstName,
      lastName: newMemberForm.lastName,
      role: newMemberForm.role,
      hasBeenInvited: false
    }
    
    const current = getValues("teamMembers")
    setValue("teamMembers", [...current, newMember])
    
    // Reset form
    setNewMemberForm({
      email: "",
      firstName: "",
      lastName: "",
      role: ""
    })
    setShowAddMemberDialog(false)
  }

  const handleEditTeamMember = (member: TeamMember) => {
    setNewMemberForm({
      email: member.email,
      firstName: member.firstName,
      lastName: member.lastName,
      role: member.role
    })
    setEditingMemberId(member.id)
    setShowAddMemberDialog(true)
  }

  const handleUpdateTeamMember = () => {
    const current = getValues("teamMembers")
    const updated = current.map(member => 
      member.id === editingMemberId 
        ? { ...member, ...newMemberForm }
        : member
    )
    setValue("teamMembers", updated)
    
    setNewMemberForm({
      email: "",
      firstName: "",
      lastName: "",
      role: ""
    })
    setEditingMemberId(null)
    setShowAddMemberDialog(false)
  }

  const handleDeleteTeamMember = (memberId: string) => {
    const current = getValues("teamMembers")
    setValue("teamMembers", current.filter(member => member.id !== memberId))
  }

  const processBulkInvite = () => {
    const lines = bulkInviteText.split('\n').filter(line => line.trim())
    const newMembers: TeamMember[] = []
    
    lines.forEach((line, index) => {
      const parts = line.split(',').map(part => part.trim())
      if (parts.length >= 3) {
        const [email, firstName, lastName, role = "general-user"] = parts
        if (email && firstName && lastName) {
          newMembers.push({
            id: `bulk-member-${Date.now()}-${index}`,
            email,
            firstName,
            lastName,
            role,
            hasBeenInvited: false
          })
        }
      }
    })
    
    if (newMembers.length > 0) {
      const current = getValues("teamMembers")
      setValue("teamMembers", [...current, ...newMembers])
      setBulkInviteText("")
      setShowBulkInviteDialog(false)
    }
  }

  const getRoleInfo = (roleId: string) => {
    return defaultRoles.find(role => role.id === roleId) || defaultRoles[6] // Default to general-user
  }

  const handleCompleteOnboarding = async () => {
    setIsLoading(true)
    
    try {
      const formData = getValues()
      
      // Update team members
      dispatch({
        type: 'SET_TEAM_MEMBERS',
        payload: formData.teamMembers
      })
      
      // Mark step as completed
      completeStep(6)
      
      // Mark entire onboarding as complete
      dispatch({
        type: 'MARK_COMPLETE'
      })
      
      // Navigate to dashboard or completion page
      router.push("/onboarding/complete")
    } catch (error) {
      console.error("Error completing onboarding:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    router.push("/onboarding/goals-strategy")
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button variant="outline" onClick={handleBack} className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
            <Badge variant="outline">Step 6 of 6</Badge>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Team Setup & Access Control</h1>
          <p className="text-lg text-gray-600">
            Invite colleagues and assign roles to set up your ESG team for collaborative success.
          </p>
          
          <Progress value={getProgressPercentage() || 100} className="w-full mt-4" />
        </div>

        <form onSubmit={handleSubmit(handleCompleteOnboarding)} className="space-y-8">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Team Collaboration Setup</span>
              </CardTitle>
              <CardDescription>
                Invite colleagues who will manage ESG data, contribute to reports, or oversee ESG strategy. 
                You can assign them roles to control their access and permissions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  You can always add more team members later and fine-tune permissions in Settings {"> "} Team Management. 
                  Team members will receive email invitations to join your ESG workspace.
                </AlertDescription>
              </Alert>
              
              <div className="mt-6 flex items-center space-x-2">
                <Controller
                  name="skipTeamSetup"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label htmlFor="skipTeamSetup" className="text-base">
                  Skip team setup for now (I'll add team members later)
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Role Overview */}
          {!watchedSkipTeamSetup && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Available Roles</span>
                </CardTitle>
                <CardDescription>
                  Each role provides different levels of access to platform modules and features.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {defaultRoles.map((role) => (
                    <div key={role.id} className={`p-4 rounded-lg border-2 ${role.color.replace('text-', 'border-').replace('-700', '-200')}`}>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className={`p-1 rounded ${role.color}`}>
                          {role.icon}
                        </div>
                        <h4 className="font-semibold">{role.name}</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{role.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.slice(0, 3).map((permission, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {permission.replace('-', ' ')}
                          </Badge>
                        ))}
                        {role.permissions.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{role.permissions.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Team Members */}
          {!watchedSkipTeamSetup && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <UserPlus className="h-5 w-5" />
                    <span>Team Members</span>
                  </div>
                  <div className="flex space-x-2">
                    <Dialog open={showBulkInviteDialog} onOpenChange={setShowBulkInviteDialog}>
                      <DialogTrigger asChild>
                        <Button type="button" variant="outline" size="sm">
                          <Upload className="h-3 w-3 mr-1" />
                          Bulk Add
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Bulk Add Team Members</DialogTitle>
                          <DialogDescription>
                            Add multiple team members by entering their details, one per line in CSV format: 
                            email, first name, last name, role (optional)
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="bulkInvite">Team Members (CSV Format)</Label>
                            <Textarea
                              id="bulkInvite"
                              value={bulkInviteText}
                              onChange={(e) => setBulkInviteText(e.target.value)}
                              placeholder="john.doe@example.com, John, Doe, data-manager\njane.smith@example.com, Jane, Smith, esg-strategist\nmike.wilson@example.com, Mike, Wilson"
                              rows={6}
                              className="font-mono text-sm"
                            />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={() => setShowBulkInviteDialog(false)}
                            >
                              Cancel
                            </Button>
                            <Button 
                              type="button"
                              onClick={processBulkInvite}
                              disabled={!bulkInviteText.trim()}
                            >
                              Add Members
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Dialog open={showAddMemberDialog} onOpenChange={setShowAddMemberDialog}>
                      <DialogTrigger asChild>
                        <Button type="button" size="sm">
                          <UserPlus className="h-3 w-3 mr-1" />
                          Add Member
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>
                            {editingMemberId ? "Edit Team Member" : "Add Team Member"}
                          </DialogTitle>
                          <DialogDescription>
                            Enter the details for the team member you want to invite.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="memberFirstName">First Name *</Label>
                              <Input
                                id="memberFirstName"
                                value={newMemberForm.firstName}
                                onChange={(e) => setNewMemberForm({...newMemberForm, firstName: e.target.value})}
                                placeholder="John"
                              />
                            </div>
                            <div>
                              <Label htmlFor="memberLastName">Last Name *</Label>
                              <Input
                                id="memberLastName"
                                value={newMemberForm.lastName}
                                onChange={(e) => setNewMemberForm({...newMemberForm, lastName: e.target.value})}
                                placeholder="Doe"
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="memberEmail">Email Address *</Label>
                            <Input
                              id="memberEmail"
                              type="email"
                              value={newMemberForm.email}
                              onChange={(e) => setNewMemberForm({...newMemberForm, email: e.target.value})}
                              placeholder="john.doe@example.com"
                            />
                          </div>
                          <div>
                            <Label htmlFor="memberRole">Role *</Label>
                            <Select 
                              value={newMemberForm.role} 
                              onValueChange={(value) => setNewMemberForm({...newMemberForm, role: value})}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select a role" />
                              </SelectTrigger>
                              <SelectContent>
                                {defaultRoles.map((role) => (
                                  <SelectItem key={role.id} value={role.id}>
                                    <div className="flex items-center space-x-2">
                                      {role.icon}
                                      <span>{role.name}</span>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={() => {
                                setShowAddMemberDialog(false)
                                setEditingMemberId(null)
                                setNewMemberForm({
                                  email: "",
                                  firstName: "",
                                  lastName: "",
                                  role: ""
                                })
                              }}
                            >
                              Cancel
                            </Button>
                            <Button 
                              type="button"
                              onClick={editingMemberId ? handleUpdateTeamMember : handleAddTeamMember}
                              disabled={!newMemberForm.email || !newMemberForm.firstName || !newMemberForm.lastName || !newMemberForm.role}
                            >
                              {editingMemberId ? "Update Member" : "Add Member"}
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardTitle>
                <CardDescription>
                  Team members will receive email invitations to join your ESG workspace with their assigned permissions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {watchedTeamMembers.length > 0 ? (
                  <div className="space-y-4">
                    {watchedTeamMembers.map((member, index) => {
                      const roleInfo = getRoleInfo(member.role)
                      return (
                        <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg hover:border-blue-300 transition-colors">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-semibold">
                                {member.firstName[0]}{member.lastName[0]}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-semibold">{member.firstName} {member.lastName}</h4>
                              <p className="text-sm text-gray-600">{member.email}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <div className={`flex items-center space-x-1 px-2 py-1 rounded text-xs ${roleInfo.color}`}>
                                  {roleInfo.icon}
                                  <span>{roleInfo.name}</span>
                                </div>
                                {member.hasBeenInvited && (
                                  <Badge variant="outline" className="text-xs">
                                    Invited
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditTeamMember(member)}
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteTeamMember(member.id)}
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No team members added yet. Click "Add Member" to get started.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Invitation Customization */}
          {!watchedSkipTeamSetup && watchedTeamMembers.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="h-5 w-5" />
                  <span>Invitation Message</span>
                </CardTitle>
                <CardDescription>
                  Customize the invitation message that will be sent to your team members.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="invitationMessage">Custom Message (Optional)</Label>
                  <Textarea
                    {...register("invitationMessage")}
                    id="invitationMessage"
                    placeholder="Welcome to our ESG team! We're excited to have you join our sustainability journey..."
                    rows={3}
                  />
                </div>
                
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Team members will receive a professional invitation email with login instructions and their role information.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          )}

          {/* Completion Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PartyPopper className="h-5 w-5" />
                <span>Ready to Launch!</span>
              </CardTitle>
              <CardDescription>
                Your ESG platform setup is almost complete. Review your configuration and launch your workspace.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {watchedSkipTeamSetup ? 0 : watchedTeamMembers.length}
                  </div>
                  <p className="text-sm text-gray-600">Team Members</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {state.completedSteps.length + 1}
                  </div>
                  <p className="text-sm text-gray-600">Steps Completed</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {state.selectedFrameworks.filter(f => f.isSelected).length}
                  </div>
                  <p className="text-sm text-gray-600">ESG Frameworks</p>
                </div>
              </div>

              <div>
                <Label htmlFor="additionalNotes">Additional Notes (Optional)</Label>
                <Textarea
                  {...register("additionalNotes")}
                  id="additionalNotes"
                  placeholder="Any additional setup notes or requirements for your team..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Goals & Strategy
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-green-600 hover:bg-green-700">
              {isLoading ? "Completing Setup..." : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Complete Setup & Launch ESG Hub
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
} 