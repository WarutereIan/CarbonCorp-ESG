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
import { useOnboarding, Goal } from "@/contexts/OnboardingContext"
import { 
  ArrowLeft,
  ArrowRight,
  Target,
  Lightbulb,
  PlusCircle,
  Edit3,
  Check,
  X,
  TrendingUp,
  Users,
  Leaf,
  Shield,
  Building,
  Recycle,
  Heart,
  Zap,
  Globe,
  BookOpen,
  Star,
  Calendar,
  CheckCircle,
  Info,
  Sparkles
} from "lucide-react"

// Strategic ESG priorities
const strategicPriorities = [
  { id: "decarbonization", name: "Decarbonization", icon: <Leaf className="h-4 w-4" />, description: "Reduce carbon footprint and achieve net-zero goals" },
  { id: "dei-enhancement", name: "DEI Enhancement", icon: <Users className="h-4 w-4" />, description: "Improve diversity, equity, and inclusion across the organization" },
  { id: "supply-chain-sustainability", name: "Supply Chain Sustainability", icon: <Building className="h-4 w-4" />, description: "Ensure sustainable and ethical supply chain practices" },
  { id: "circular-economy", name: "Circular Economy", icon: <Recycle className="h-4 w-4" />, description: "Implement circular economy principles and waste reduction" },
  { id: "employee-wellbeing", name: "Employee Well-being", icon: <Heart className="h-4 w-4" />, description: "Enhance employee health, safety, and overall well-being" },
  { id: "energy-efficiency", name: "Energy Efficiency", icon: <Zap className="h-4 w-4" />, description: "Optimize energy consumption and increase renewable energy use" },
  { id: "water-stewardship", name: "Water Stewardship", icon: <Globe className="h-4 w-4" />, description: "Responsible water management and conservation" },
  { id: "ethical-governance", name: "Ethical Governance", icon: <Shield className="h-4 w-4" />, description: "Strengthen corporate governance and ethical business practices" }
]

// Generate AI-suggested goals based on industry and frameworks
const generateAISuggestedGoals = (industry: string, frameworks: string[], companyName: string): Goal[] => {
  const suggestions: Goal[] = []
  
  // Base goal for emissions (common across all industries)
  suggestions.push({
    id: "ai-goal-emissions",
    title: "Establish Baseline for Scope 1 & 2 Emissions",
    description: `Complete comprehensive measurement and baseline calculation for ${companyName}'s direct and indirect emissions to support future reduction targets.`,
    kpi: "Total Scope 1 & 2 Emissions (tCO2e)",
    target: "Complete baseline calculation within 3 months",
    deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 3 months from now
    isAccepted: false
  })

  // Industry-specific goals
  if (industry?.toLowerCase().includes("manufacturing")) {
    suggestions.push({
      id: "ai-goal-energy",
      title: "Improve Energy Efficiency in Manufacturing",
      description: "Implement energy monitoring and efficiency measures across manufacturing facilities to reduce operational costs and environmental impact.",
      kpi: "Energy Intensity (kWh per unit produced)",
      target: "Reduce energy intensity by 15% by end of year",
      deadline: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 year
      isAccepted: false
    })
  }

  if (industry?.toLowerCase().includes("finance") || industry?.toLowerCase().includes("technology")) {
    suggestions.push({
      id: "ai-goal-data-quality",
      title: "Enhance ESG Data Completeness",
      description: "Improve the quality and completeness of ESG data collection across all business units to support accurate reporting and decision-making.",
      kpi: "ESG Data Completeness Score (%)",
      target: "Achieve 90% data completeness across all key metrics within 6 months",
      deadline: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 6 months
      isAccepted: false
    })
  }

  // Framework-specific goals
  if (frameworks.some(f => f.includes("csrd") || f.includes("CSRD"))) {
    suggestions.push({
      id: "ai-goal-csrd-readiness",
      title: "Achieve CSRD Compliance Readiness",
      description: "Prepare for Corporate Sustainability Reporting Directive requirements by establishing necessary data collection and reporting processes.",
      kpi: "CSRD Compliance Readiness (%)",
      target: "Achieve 100% readiness for first CSRD reporting period",
      deadline: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 year
      isAccepted: false
    })
  }

  return suggestions.slice(0, 3) // Return max 3 suggestions
}

const goalsStrategySchema = z.object({
  acceptedAIGoals: z.array(z.string()),
  customGoals: z.array(z.object({
    id: z.string(),
    title: z.string().min(1, "Goal title is required"),
    description: z.string().min(1, "Goal description is required"),
    kpi: z.string().min(1, "KPI is required"),
    target: z.string().min(1, "Target is required"),
    deadline: z.string().optional()
  })),
  selectedPriorities: z.array(z.string()).min(1, "Please select at least one strategic priority").max(3, "Please select no more than 3 priorities"),
  existingInitiatives: z.string().optional(),
  wantsStrategyBlueprint: z.boolean(),
  additionalContext: z.string().optional()
})

type GoalsStrategyFormData = z.infer<typeof goalsStrategySchema>

interface CustomGoal {
  id: string
  title: string
  description: string
  kpi: string
  target: string
  deadline?: string
}

export default function GoalsStrategyPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [aiSuggestedGoals, setAISuggestedGoals] = useState<Goal[]>([])
  const [showCustomGoalDialog, setShowCustomGoalDialog] = useState(false)
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null)
  const [customGoalForm, setCustomGoalForm] = useState<CustomGoal>({
    id: "",
    title: "",
    description: "",
    kpi: "",
    target: "",
    deadline: ""
  })
  
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
  } = useForm<GoalsStrategyFormData>({
    resolver: zodResolver(goalsStrategySchema),
    defaultValues: {
      acceptedAIGoals: state.initialGoals.filter(g => g.isAccepted).map(g => g.id) || [],
      customGoals: state.initialGoals.filter(g => g.id.startsWith("custom-")) || [],
      selectedPriorities: state.strategyBlueprint.priorities || [],
      existingInitiatives: state.strategyBlueprint.existingInitiatives || "",
      wantsStrategyBlueprint: false,
      additionalContext: ""
    }
  })

  const watchedAcceptedGoals = watch("acceptedAIGoals")
  const watchedCustomGoals = watch("customGoals")
  const watchedSelectedPriorities = watch("selectedPriorities")
  const watchedWantsBlueprint = watch("wantsStrategyBlueprint")

  // Initialize component and generate AI suggestions
  useEffect(() => {
    goToStep(5)
    
    // Generate AI-suggested goals based on company data
    const frameworks = state.selectedFrameworks.filter(f => f.isSelected).map(f => f.id)
    const suggestions = generateAISuggestedGoals(
      state.companyData.industry || "",
      frameworks,
      state.companyData.legalName || "your organization"
    )
    setAISuggestedGoals(suggestions)
  }, [goToStep, state.companyData.industry, state.selectedFrameworks, state.companyData.legalName])

  const handleAIGoalToggle = useCallback((goalId: string, accepted: boolean) => {
    const current = getValues("acceptedAIGoals")
    if (accepted) {
      setValue("acceptedAIGoals", [...current, goalId])
    } else {
      setValue("acceptedAIGoals", current.filter(id => id !== goalId))
    }
  }, [getValues, setValue])

  const handlePriorityToggle = useCallback((priorityId: string, selected: boolean) => {
    const current = getValues("selectedPriorities")
    if (selected && current.length < 3) {
      setValue("selectedPriorities", [...current, priorityId])
    } else if (!selected) {
      setValue("selectedPriorities", current.filter(id => id !== priorityId))
    }
  }, [getValues, setValue])

  const handleAddCustomGoal = () => {
    const newGoal: CustomGoal = {
      id: `custom-${Date.now()}`,
      title: customGoalForm.title,
      description: customGoalForm.description,
      kpi: customGoalForm.kpi,
      target: customGoalForm.target,
      deadline: customGoalForm.deadline
    }
    
    const current = getValues("customGoals")
    setValue("customGoals", [...current, newGoal])
    
    // Reset form
    setCustomGoalForm({
      id: "",
      title: "",
      description: "",
      kpi: "",
      target: "",
      deadline: ""
    })
    setShowCustomGoalDialog(false)
  }

  const handleEditCustomGoal = (goal: CustomGoal) => {
    setCustomGoalForm(goal)
    setEditingGoalId(goal.id)
    setShowCustomGoalDialog(true)
  }

  const handleUpdateCustomGoal = () => {
    const current = getValues("customGoals")
    const updated = current.map(goal => 
      goal.id === editingGoalId ? customGoalForm : goal
    )
    setValue("customGoals", updated)
    
    setCustomGoalForm({
      id: "",
      title: "",
      description: "",
      kpi: "",
      target: "",
      deadline: ""
    })
    setEditingGoalId(null)
    setShowCustomGoalDialog(false)
  }

  const handleDeleteCustomGoal = (goalId: string) => {
    const current = getValues("customGoals")
    setValue("customGoals", current.filter(goal => goal.id !== goalId))
  }

  const handleNext = async () => {
    setIsLoading(true)
    
    try {
      const formData = getValues()
      
      // Combine AI goals and custom goals
      const acceptedAIGoals = aiSuggestedGoals
        .filter(goal => formData.acceptedAIGoals.includes(goal.id))
        .map(goal => ({ ...goal, isAccepted: true }))
      
      const customGoalsWithAccepted = formData.customGoals.map(goal => ({
        ...goal,
        isAccepted: true
      }))
      
      const allGoals = [...acceptedAIGoals, ...customGoalsWithAccepted]
      
      // Update goals
      dispatch({
        type: 'UPDATE_GOALS',
        payload: allGoals
      })
      
      // Update strategy blueprint
      dispatch({
        type: 'UPDATE_STRATEGY_BLUEPRINT',
        payload: {
          priorities: formData.selectedPriorities,
          existingInitiatives: formData.existingInitiatives || ""
        }
      })
      
      // Mark step as completed
      completeStep(5)
      
      // Navigate to next step
      router.push("/onboarding/team-setup")
    } catch (error) {
      console.error("Error saving goals and strategy:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    router.push("/onboarding/ai-analytics-config")
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
            <Badge variant="outline">Step 5 of 6</Badge>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Initial Goal Setting & Strategy Foundation</h1>
          <p className="text-lg text-gray-600">
            Establish foundational ESG goals and strategic priorities to guide your sustainability journey.
          </p>
          
          <Progress value={getProgressPercentage() || 83.33} className="w-full mt-4" />
        </div>

        <form onSubmit={handleSubmit(handleNext)} className="space-y-8">
          {/* Introduction to Goal Setting */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Introduction to ESG Goal Setting</span>
              </CardTitle>
              <CardDescription>
                Effective ESG goals follow SMART principles (Specific, Measurable, Achievable, Relevant, Time-bound) 
                and align with your business strategy and stakeholder expectations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Platform Support:</strong> CarbonCorp helps you track progress, automate data collection, 
                  and provide insights to achieve your ESG goals. You can define more comprehensive goals and 
                  detailed tracking in the Analytics Hub later.
                </AlertDescription>
              </Alert>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-4">
                {['Specific', 'Measurable', 'Achievable', 'Relevant', 'Time-bound'].map((principle, index) => (
                  <div key={principle} className="text-center p-3 border rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-blue-600 font-semibold">{principle[0]}</span>
                    </div>
                    <h4 className="font-medium text-sm">{principle}</h4>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI-Assisted Goal Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5" />
                <span>AI-Suggested Goals</span>
              </CardTitle>
              <CardDescription>
                Based on your industry ({state.companyData.industry}), selected frameworks, and company profile, 
                here are some recommended starter goals. You can accept, edit, or decline any suggestions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {aiSuggestedGoals.map((goal) => (
                <div key={goal.id} className="border rounded-lg p-4 hover:border-blue-300 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Target className="h-5 w-5 text-blue-600" />
                        <h4 className="font-semibold">{goal.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          AI Suggested
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{goal.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <Label className="font-medium text-gray-700">KPI:</Label>
                          <p className="text-gray-600">{goal.kpi}</p>
                        </div>
                        <div>
                          <Label className="font-medium text-gray-700">Target:</Label>
                          <p className="text-gray-600">{goal.target}</p>
                        </div>
                        <div>
                          <Label className="font-medium text-gray-700">Deadline:</Label>
                          <p className="text-gray-600">{goal.deadline ? new Date(goal.deadline).toLocaleDateString() : 'Not set'}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <Button
                        type="button"
                        size="sm"
                        variant={watchedAcceptedGoals.includes(goal.id) ? "default" : "outline"}
                        onClick={() => handleAIGoalToggle(goal.id, !watchedAcceptedGoals.includes(goal.id))}
                      >
                        {watchedAcceptedGoals.includes(goal.id) ? (
                          <>
                            <Check className="h-3 w-3 mr-1" />
                            Accepted
                          </>
                        ) : (
                          "Accept & Edit"
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              {aiSuggestedGoals.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Lightbulb className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No AI suggestions available. You can add custom goals below.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Custom Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <PlusCircle className="h-5 w-5" />
                  <span>Custom Goals</span>
                </div>
                <Dialog open={showCustomGoalDialog} onOpenChange={setShowCustomGoalDialog}>
                  <DialogTrigger asChild>
                    <Button type="button" size="sm">
                      <PlusCircle className="h-3 w-3 mr-1" />
                      Add Custom Goal
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>
                        {editingGoalId ? "Edit Custom Goal" : "Add Custom Goal"}
                      </DialogTitle>
                      <DialogDescription>
                        Define a specific ESG goal that's relevant to your organization's priorities.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="customGoalTitle">Goal Title *</Label>
                        <Input
                          id="customGoalTitle"
                          value={customGoalForm.title}
                          onChange={(e) => setCustomGoalForm({...customGoalForm, title: e.target.value})}
                          placeholder="e.g., Reduce waste generation by 25%"
                        />
                      </div>
                      <div>
                        <Label htmlFor="customGoalDescription">Description *</Label>
                        <Textarea
                          id="customGoalDescription"
                          value={customGoalForm.description}
                          onChange={(e) => setCustomGoalForm({...customGoalForm, description: e.target.value})}
                          placeholder="Detailed description of the goal and its importance"
                          rows={3}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="customGoalKPI">Key Performance Indicator *</Label>
                          <Input
                            id="customGoalKPI"
                            value={customGoalForm.kpi}
                            onChange={(e) => setCustomGoalForm({...customGoalForm, kpi: e.target.value})}
                            placeholder="e.g., Total waste generated (tonnes)"
                          />
                        </div>
                        <div>
                          <Label htmlFor="customGoalTarget">Target *</Label>
                          <Input
                            id="customGoalTarget"
                            value={customGoalForm.target}
                            onChange={(e) => setCustomGoalForm({...customGoalForm, target: e.target.value})}
                            placeholder="e.g., Reduce by 25% from baseline"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="customGoalDeadline">Target Deadline</Label>
                        <Input
                          id="customGoalDeadline"
                          type="date"
                          value={customGoalForm.deadline}
                          onChange={(e) => setCustomGoalForm({...customGoalForm, deadline: e.target.value})}
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => {
                            setShowCustomGoalDialog(false)
                            setEditingGoalId(null)
                            setCustomGoalForm({
                              id: "",
                              title: "",
                              description: "",
                              kpi: "",
                              target: "",
                              deadline: ""
                            })
                          }}
                        >
                          Cancel
                        </Button>
                        <Button 
                          type="button"
                          onClick={editingGoalId ? handleUpdateCustomGoal : handleAddCustomGoal}
                          disabled={!customGoalForm.title || !customGoalForm.description || !customGoalForm.kpi || !customGoalForm.target}
                        >
                          {editingGoalId ? "Update Goal" : "Add Goal"}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardTitle>
              <CardDescription>
                Add your own ESG goals that are specific to your organization's needs and priorities.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {watchedCustomGoals.length > 0 ? (
                <div className="space-y-4">
                  {watchedCustomGoals.map((goal, index) => (
                    <div key={goal.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <h4 className="font-semibold">{goal.title}</h4>
                            <Badge variant="secondary" className="text-xs">
                              Custom
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{goal.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <Label className="font-medium text-gray-700">KPI:</Label>
                              <p className="text-gray-600">{goal.kpi}</p>
                            </div>
                            <div>
                              <Label className="font-medium text-gray-700">Target:</Label>
                              <p className="text-gray-600">{goal.target}</p>
                            </div>
                            <div>
                              <Label className="font-medium text-gray-700">Deadline:</Label>
                              <p className="text-gray-600">{goal.deadline ? new Date(goal.deadline).toLocaleDateString() : 'Not set'}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditCustomGoal(goal)}
                          >
                            <Edit3 className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteCustomGoal(goal.id)}
                          >
                            <X className="h-3 w-3 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Target className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No custom goals added yet. Click "Add Custom Goal" to get started.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* ESG Strategy Blueprint */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>ESG Strategy Foundation</span>
              </CardTitle>
              <CardDescription>
                Define your organization's strategic ESG priorities to create a foundation for comprehensive strategy development.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Controller
                  name="wantsStrategyBlueprint"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label htmlFor="wantsStrategyBlueprint" className="text-base font-medium">
                  Start your ESG Strategy Blueprint
                </Label>
              </div>
              
              <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertDescription>
                  Our AI-Driven ESG Strategy Builder helps you create, manage, and track your overarching ESG strategy. 
                  This foundation will help the AI provide more tailored recommendations later.
                </AlertDescription>
              </Alert>

              {watchedWantsBlueprint && (
                <div className="space-y-6 mt-6 p-4 border rounded-lg bg-blue-50">
                  <div>
                    <Label className="text-base font-medium mb-4 block">
                      Select your top 1-3 strategic ESG priorities for the next 1-2 years:
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {strategicPriorities.map((priority) => (
                        <div key={priority.id} className="flex items-start space-x-3 p-3 border rounded-lg bg-white hover:border-blue-300 transition-colors">
                          <Checkbox
                            id={priority.id}
                            checked={watchedSelectedPriorities.includes(priority.id)}
                            onCheckedChange={(checked) => handlePriorityToggle(priority.id, checked as boolean)}
                            disabled={!watchedSelectedPriorities.includes(priority.id) && watchedSelectedPriorities.length >= 3}
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              {priority.icon}
                              <Label htmlFor={priority.id} className="font-medium cursor-pointer">
                                {priority.name}
                              </Label>
                            </div>
                            <p className="text-sm text-gray-600">{priority.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Selected: {watchedSelectedPriorities.length}/3 priorities
                    </p>
                    {errors.selectedPriorities && (
                      <p className="text-sm text-red-600 mt-1">{errors.selectedPriorities.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="existingInitiatives">
                      Are there any existing major ESG initiatives at {state.companyData.legalName}?
                    </Label>
                    <Textarea
                      {...register("existingInitiatives")}
                      id="existingInitiatives"
                      placeholder="Describe any current sustainability programs, certifications, or ESG initiatives already in place..."
                      rows={3}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="additionalContext">Additional Strategic Context (Optional)</Label>
                    <Textarea
                      {...register("additionalContext")}
                      id="additionalContext"
                      placeholder="Any additional context about your ESG strategy, stakeholder expectations, or regulatory drivers..."
                      rows={3}
                      className="mt-2"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>Goals & Strategy Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {watchedAcceptedGoals.length}
                  </div>
                  <p className="text-sm text-gray-600">AI Goals Accepted</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {watchedCustomGoals.length}
                  </div>
                  <p className="text-sm text-gray-600">Custom Goals</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {watchedSelectedPriorities.length}
                  </div>
                  <p className="text-sm text-gray-600">Strategic Priorities</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {watchedWantsBlueprint ? "Yes" : "No"}
                  </div>
                  <p className="text-sm text-gray-600">Strategy Blueprint</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to AI & Analytics
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save & Next: Team Setup"}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
} 