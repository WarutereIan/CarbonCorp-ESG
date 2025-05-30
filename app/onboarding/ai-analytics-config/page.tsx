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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useOnboarding, AIFeature } from "@/contexts/OnboardingContext"
import { 
  ArrowLeft,
  ArrowRight,
  Brain,
  BarChart3,
  MessageSquare,
  TrendingUp,
  Shield,
  FileText,
  Target,
  Users,
  Zap,
  Eye,
  Lock,
  Info,
  AlertCircle,
  CheckCircle,
  Lightbulb,
  Cpu,
  Activity,
  PieChart,
  LineChart
} from "lucide-react"

// AI Features configuration
const aiFeatureCategories = {
  "Data Intelligence": [
    {
      id: "automated-insights",
      name: "Automated Insights & Anomaly Detection",
      description: "Automatically identify unusual data patterns and get insights from your ESG data",
      category: "data" as const,
      icon: <Eye className="h-5 w-5" />,
      benefits: ["Real-time anomaly detection", "Pattern recognition", "Data quality alerts"],
      dataRequirement: "Moderate - works with basic data connections"
    },
    {
      id: "predictive-analytics",
      name: "Predictive Analytics & Forecasting",
      description: "Forecast future KPI performance and goal achievement",
      category: "analytics" as const,
      icon: <TrendingUp className="h-5 w-5" />,
      benefits: ["Goal achievement forecasting", "Trend prediction", "Risk early warning"],
      dataRequirement: "High - requires 6+ months of historical data"
    }
  ],
  "Content Generation": [
    {
      id: "generative-reporting",
      name: "Generative AI Reporting",
      description: "Draft report narratives and summaries using AI",
      category: "reporting" as const,
      icon: <FileText className="h-5 w-5" />,
      benefits: ["Automated report drafting", "Narrative generation", "Content suggestions"],
      dataRequirement: "Low - works with minimal data"
    },
    {
      id: "ai-assistant",
      name: "AI Assistant Chat",
      description: "Enable the global AI chat assistant for queries and support",
      category: "assistant" as const,
      icon: <MessageSquare className="h-5 w-5" />,
      benefits: ["24/7 support", "Data exploration", "Process guidance"],
      dataRequirement: "None - available immediately"
    }
  ],
  "Strategic Intelligence": [
    {
      id: "materiality-ai",
      name: "Materiality Assessment AI",
      description: "Leverage AI to identify and prioritize material ESG topics",
      category: "risk" as const,
      icon: <Target className="h-5 w-5" />,
      benefits: ["Industry benchmarking", "Stakeholder analysis", "Topic prioritization"],
      dataRequirement: "Low - uses industry and external data"
    },
    {
      id: "risk-prediction",
      name: "Risk Prediction AI",
      description: "Model potential ESG risks and their impacts",
      category: "risk" as const,
      icon: <Shield className="h-5 w-5" />,
      benefits: ["Scenario modeling", "Impact assessment", "Mitigation strategies"],
      dataRequirement: "Moderate - enhanced with operational data"
    }
  ]
}

const dashboardTemplates = [
  {
    id: "compliance-focused",
    name: "Compliance Focused",
    description: "Regulatory deadlines, gap analysis, and compliance status tracking",
    icon: <Shield className="h-4 w-4" />,
    widgets: ["Compliance Status Tracker", "Upcoming Regulatory Deadlines", "Gap Analysis", "Audit Readiness"]
  },
  {
    id: "performance-focused", 
    name: "Performance Focused",
    description: "KPIs, goal progress, and performance metrics",
    icon: <BarChart3 className="h-4 w-4" />,
    widgets: ["KPI Dashboard", "Goal Progress Tracker", "Performance Trends", "Benchmarking"]
  },
  {
    id: "risk-overview",
    name: "Risk Overview", 
    description: "ESG risks, mitigation status, and early warning indicators",
    icon: <AlertCircle className="h-4 w-4" />,
    widgets: ["ESG Risk Heatmap", "Risk Mitigation Status", "Early Warning Alerts", "Scenario Analysis"]
  },
  {
    id: "balanced-view",
    name: "Balanced View",
    description: "Comprehensive overview balancing compliance, performance, and risk",
    icon: <PieChart className="h-4 w-4" />,
    widgets: ["Executive Summary", "Key KPIs", "Compliance Status", "Risk Overview", "Recent Activity"]
  }
]

const commonKPIs = [
  { id: "scope-1-2-emissions", name: "Total Scope 1+2 Emissions", category: "Environmental" },
  { id: "renewable-energy-percent", name: "Renewable Energy %", category: "Environmental" },
  { id: "water-intensity", name: "Water Intensity", category: "Environmental" },
  { id: "waste-diverted", name: "Waste Diverted from Landfill %", category: "Environmental" },
  { id: "employee-engagement", name: "Employee Engagement Score", category: "Social" },
  { id: "diversity-leadership", name: "Leadership Diversity %", category: "Social" },
  { id: "safety-incident-rate", name: "Lost Time Injury Frequency Rate", category: "Social" },
  { id: "training-hours", name: "Employee Training Hours per FTE", category: "Social" },
  { id: "board-independence", name: "Board Independence %", category: "Governance" },
  { id: "ethics-training", name: "Ethics Training Completion %", category: "Governance" },
  { id: "supplier-assessments", name: "Supplier ESG Assessments Completed", category: "Governance" },
  { id: "data-privacy-incidents", name: "Data Privacy Incidents", category: "Governance" }
]

const aiAnalyticsSchema = z.object({
  enabledAIFeatures: z.array(z.string()),
  benchmarkingOptIn: z.boolean(),
  receiveBenchmarkInsights: z.boolean(),
  allowInitialModelTraining: z.boolean(),
  dashboardPreference: z.enum(["compliance-focused", "performance-focused", "risk-overview", "balanced-view"]),
  selectedKPIs: z.array(z.string()).min(3, "Please select at least 3 KPIs").max(5, "Please select no more than 5 KPIs"),
  dataProcessingConsent: z.boolean().refine(val => val === true, "You must consent to data processing to continue"),
  additionalRequirements: z.string().optional()
})

type AIAnalyticsFormData = z.infer<typeof aiAnalyticsSchema>

export default function AIAnalyticsConfigPage() {
  const [isLoading, setIsLoading] = useState(false)
  
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
  } = useForm<AIAnalyticsFormData>({
    resolver: zodResolver(aiAnalyticsSchema),
    defaultValues: {
      enabledAIFeatures: state.aiFeatures.filter(f => f.isEnabled).map(f => f.id) || [],
      benchmarkingOptIn: state.benchmarkingOptIn || false,
      receiveBenchmarkInsights: false,
      allowInitialModelTraining: false,
      dashboardPreference: state.dashboardPreference as any || "balanced-view",
      selectedKPIs: state.selectedKPIs || [],
      dataProcessingConsent: false
    }
  })

  const watchedEnabledFeatures = watch("enabledAIFeatures")
  const watchedBenchmarkingOptIn = watch("benchmarkingOptIn")
  const watchedDashboardPreference = watch("dashboardPreference")
  const watchedSelectedKPIs = watch("selectedKPIs")

  // Initialize component
  useEffect(() => {
    goToStep(4)
  }, [goToStep])

  const handleAIFeatureToggle = useCallback((featureId: string, checked: boolean) => {
    const current = getValues("enabledAIFeatures")
    if (checked) {
      setValue("enabledAIFeatures", [...current, featureId])
    } else {
      setValue("enabledAIFeatures", current.filter(id => id !== featureId))
    }
  }, [getValues, setValue])

  const handleKPIToggle = useCallback((kpiId: string, checked: boolean) => {
    const current = getValues("selectedKPIs")
    if (checked && current.length < 5) {
      setValue("selectedKPIs", [...current, kpiId])
    } else if (!checked) {
      setValue("selectedKPIs", current.filter(id => id !== kpiId))
    }
  }, [getValues, setValue])

  const handleNext = async () => {
    setIsLoading(true)
    
    try {
      const formData = getValues()
      
      // Convert enabled features to AIFeature objects
      const allFeatures: AIFeature[] = Object.values(aiFeatureCategories).flat().map(feature => ({
        id: feature.id,
        name: feature.name,
        description: feature.description,
        isEnabled: formData.enabledAIFeatures.includes(feature.id),
        category: feature.category
      }))
      
      // Update AI features
      dispatch({
        type: 'UPDATE_AI_FEATURES',
        payload: allFeatures
      })
      
      // Update benchmarking preferences
      dispatch({
        type: 'SET_BENCHMARKING_OPT_IN',
        payload: formData.benchmarkingOptIn
      })
      
      // Update dashboard preference
      dispatch({
        type: 'SET_DASHBOARD_PREFERENCE',
        payload: formData.dashboardPreference
      })
      
      // Update selected KPIs
      dispatch({
        type: 'SET_SELECTED_KPIS',
        payload: formData.selectedKPIs
      })
      
      // Mark step as completed
      completeStep(4)
      
      // Navigate to next step
      router.push("/onboarding/goals-strategy")
    } catch (error) {
      console.error("Error saving AI & Analytics configuration:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    router.push("/onboarding/data-integration")
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
            <Badge variant="outline">Step 4 of 6</Badge>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI & Analytics Configuration</h1>
          <p className="text-lg text-gray-600">
            Configure AI-powered features and customize your analytics experience for intelligent ESG insights.
          </p>
          
          <Progress value={getProgressPercentage() || 66.67} className="w-full mt-4" />
        </div>

        <form onSubmit={handleSubmit(handleNext)} className="space-y-8">
          {/* AI Features Activation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5" />
                <span>AI Features Activation</span>
              </CardTitle>
              <CardDescription>
                Enable AI-powered capabilities to enhance your ESG management. Each feature can be toggled on or off based on your needs and data availability.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {Object.entries(aiFeatureCategories).map(([category, features]) => (
                <div key={category}>
                  <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                    <span>{category}</span>
                    <Badge variant="outline">{features.length} features</Badge>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {features.map((feature) => (
                      <div key={feature.id} className="border rounded-lg p-4 hover:border-blue-300 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                              {feature.icon}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{feature.name}</h4>
                              <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                            </div>
                          </div>
                          <Switch
                            checked={watchedEnabledFeatures.includes(feature.id)}
                            onCheckedChange={(checked) => handleAIFeatureToggle(feature.id, checked)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Cpu className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-600">{feature.dataRequirement}</span>
                          </div>
                          
                          <div className="space-y-1">
                            <p className="text-xs font-medium text-gray-700">Key benefits:</p>
                            <div className="flex flex-wrap gap-1">
                              {feature.benefits.map((benefit, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {benefit}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Note:</strong> Some AI features perform best with sufficient historical data. You can enable features now and they will become more effective as your data grows.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Data Sharing & Benchmarking */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Data Sharing & Benchmarking Preferences</span>
              </CardTitle>
              <CardDescription>
                Configure your preferences for data sharing and receiving industry benchmark insights.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border rounded-lg p-4 bg-green-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-green-600" />
                    <div>
                      <h4 className="font-medium">Contribute to Industry Benchmarking</h4>
                      <p className="text-sm text-gray-600">Help improve insights for you and other users by contributing anonymized and aggregated data</p>
                    </div>
                  </div>
                  <Controller
                    name="benchmarkingOptIn"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                </div>
                
                <Alert>
                  <Lock className="h-4 w-4" />
                  <AlertDescription>
                    Your data remains completely private and secure. Only anonymized, aggregated statistics are used for benchmarking. 
                    <a href="#" className="text-blue-600 underline ml-1">View our data privacy policy</a>
                  </AlertDescription>
                </Alert>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    <div>
                      <h4 className="font-medium">Receive Benchmark Insights</h4>
                      <p className="text-sm text-gray-600">Get peer and industry benchmark insights in your dashboard and reports</p>
                    </div>
                  </div>
                  <Controller
                    name="receiveBenchmarkInsights"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                </div>
                
                {!watchedBenchmarkingOptIn && (
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      You can receive benchmark insights even without contributing data, but the insights will be more limited.
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Controller
                  name="allowInitialModelTraining"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label htmlFor="allowInitialModelTraining" className="text-base font-medium">
                  Allow AI models to begin initial analysis of your historical data
                </Label>
              </div>
              <p className="text-sm text-gray-600 ml-6">
                This background process improves the relevance of AI suggestions and insights. No data leaves your secure environment.
              </p>
            </CardContent>
          </Card>

          {/* Analytics Dashboard Customization */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Analytics Dashboard Customization</span>
              </CardTitle>
              <CardDescription>
                Choose your default dashboard layout and select key metrics for your main view.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium mb-4 block">Choose your default dashboard view:</Label>
                <Controller
                  name="dashboardPreference"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup value={field.value} onValueChange={field.onChange} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {dashboardTemplates.map((template) => (
                        <div key={template.id} className="relative">
                          <RadioGroupItem
                            value={template.id}
                            id={template.id}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={template.id}
                            className="flex flex-col space-y-2 rounded-lg border-2 border-gray-200 p-4 hover:border-blue-300 peer-checked:border-blue-500 peer-checked:bg-blue-50 cursor-pointer transition-colors"
                          >
                            <div className="flex items-center space-x-2">
                              {template.icon}
                              <span className="font-medium">{template.name}</span>
                            </div>
                            <p className="text-sm text-gray-600">{template.description}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {template.widgets.map((widget, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {widget}
                                </Badge>
                              ))}
                            </div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                />
              </div>

              <div>
                <Label className="text-base font-medium mb-4 block">
                  Select 3-5 Key KPIs for your main dashboard:
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {commonKPIs.map((kpi) => (
                    <div key={kpi.id} className="flex items-center space-x-2 p-2 border rounded">
                      <Checkbox
                        id={kpi.id}
                        checked={watchedSelectedKPIs.includes(kpi.id)}
                        onCheckedChange={(checked) => handleKPIToggle(kpi.id, checked as boolean)}
                        disabled={!watchedSelectedKPIs.includes(kpi.id) && watchedSelectedKPIs.length >= 5}
                      />
                      <div className="flex-1">
                        <Label htmlFor={kpi.id} className="text-sm font-medium cursor-pointer">
                          {kpi.name}
                        </Label>
                        <Badge variant="outline" className="text-xs ml-2">
                          {kpi.category}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Selected: {watchedSelectedKPIs.length}/5 KPIs
                </p>
                {errors.selectedKPIs && (
                  <p className="text-sm text-red-600 mt-1">{errors.selectedKPIs.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Data Processing Consent */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Data Processing & Privacy</span>
              </CardTitle>
              <CardDescription>
                Required consents for AI and analytics processing.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-2">
                <Controller
                  name="dataProcessingConsent"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <div className="flex-1">
                  <Label className="text-base font-medium">
                    I consent to the processing of my organization's data for AI analytics and insights generation
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    This allows CarbonCorp's AI systems to analyze your data to provide insights, predictions, and recommendations. 
                    All processing occurs within secure, compliant infrastructure.
                  </p>
                </div>
              </div>
              {errors.dataProcessingConsent && (
                <p className="text-sm text-red-600">{errors.dataProcessingConsent.message}</p>
              )}

              <div>
                <Label htmlFor="additionalRequirements">Additional AI/Analytics Requirements (Optional)</Label>
                <Textarea
                  {...register("additionalRequirements")}
                  id="additionalRequirements"
                  placeholder="Describe any specific AI features you need, data restrictions, or compliance requirements..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Configuration Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>Configuration Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {watchedEnabledFeatures.length}
                  </div>
                  <p className="text-sm text-gray-600">AI Features Enabled</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {watchedBenchmarkingOptIn ? "Yes" : "No"}
                  </div>
                  <p className="text-sm text-gray-600">Benchmarking Opt-in</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {dashboardTemplates.find(t => t.id === watchedDashboardPreference)?.name}
                  </div>
                  <p className="text-sm text-gray-600">Dashboard Style</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {watchedSelectedKPIs.length}
                  </div>
                  <p className="text-sm text-gray-600">Selected KPIs</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Data Integration
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save & Next: Goals & Strategy"}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
} 