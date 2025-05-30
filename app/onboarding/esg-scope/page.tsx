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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useOnboarding, ESGFramework } from "@/contexts/OnboardingContext"
import { 
  ArrowLeft,
  ArrowRight,
  FileText,
  Calendar,
  Target,
  AlertCircle,
  CheckCircle,
  Globe,
  Building,
  Lightbulb
} from "lucide-react"

// Global regulatory frameworks
const globalFrameworks: ESGFramework[] = [
  {
    id: "issb-s1",
    name: "ISSB S1 - General Requirements",
    description: "International Sustainability Standards Board general requirements for disclosure",
    isSelected: false,
    isRegional: false
  },
  {
    id: "issb-s2", 
    name: "ISSB S2 - Climate-related Disclosures",
    description: "International Sustainability Standards Board climate-related disclosures",
    isSelected: false,
    isRegional: false
  },
  {
    id: "csrd-esrs",
    name: "CSRD + ESRS",
    description: "Corporate Sustainability Reporting Directive + European Sustainability Reporting Standards",
    isSelected: false,
    isRegional: false
  },
  {
    id: "gri-universal",
    name: "GRI Universal Standards",
    description: "Global Reporting Initiative Universal Standards",
    isSelected: false,
    isRegional: false
  },
  {
    id: "sasb",
    name: "SASB Standards",
    description: "Sustainability Accounting Standards Board industry-specific standards",
    isSelected: false,
    isRegional: false
  },
  {
    id: "tcfd",
    name: "TCFD Recommendations",
    description: "Task Force on Climate-related Financial Disclosures",
    isSelected: false,
    isRegional: false
  }
]

// Regional frameworks based on common African markets
const getRegionalFrameworks = (country: string): ESGFramework[] => {
  const frameworks: ESGFramework[] = []
  
  if (country?.toLowerCase().includes("nigeria")) {
    frameworks.push({
      id: "ngx-climate",
      name: "NGX Climate Disclosure Guidelines",
      description: "Nigerian Exchange Group climate-related disclosure requirements",
      isSelected: false,
      isRegional: true
    })
    frameworks.push({
      id: "nigeria-sec",
      name: "Nigeria SEC Sustainability Rules",
      description: "Securities and Exchange Commission Nigeria sustainability guidelines",
      isSelected: false,
      isRegional: true
    })
  }
  
  if (country?.toLowerCase().includes("kenya")) {
    frameworks.push({
      id: "nse-esg",
      name: "NSE ESG Disclosures Guide",
      description: "Nairobi Securities Exchange ESG disclosure requirements",
      isSelected: false,
      isRegional: true
    })
    frameworks.push({
      id: "kenya-nema",
      name: "Kenya NEMA Regulations",
      description: "National Environment Management Authority environmental regulations",
      isSelected: false,
      isRegional: true
    })
  }
  
  if (country?.toLowerCase().includes("south africa")) {
    frameworks.push({
      id: "jse-sustainability",
      name: "JSE Sustainability Requirements",
      description: "Johannesburg Stock Exchange sustainability listing requirements",
      isSelected: false,
      isRegional: true
    })
    frameworks.push({
      id: "king-iv",
      name: "King IV Code",
      description: "South African corporate governance code",
      isSelected: false,
      isRegional: true
    })
  }
  
  if (country?.toLowerCase().includes("ghana")) {
    frameworks.push({
      id: "gse-esg",
      name: "GSE ESG Guidelines",
      description: "Ghana Stock Exchange ESG reporting guidelines",
      isSelected: false,
      isRegional: true
    })
  }
  
  return frameworks
}

const reportingFrequencies = [
  { value: "annual", label: "Annual" },
  { value: "biannual", label: "Bi-Annual" },
  { value: "quarterly", label: "Quarterly" }
]

const materialityFocusAreas = [
  "Climate Change & Carbon Management",
  "Energy Efficiency & Renewable Energy", 
  "Water Stewardship",
  "Waste Management & Circular Economy",
  "Employee Well-being & Safety",
  "Diversity, Equity & Inclusion",
  "Supply Chain Sustainability",
  "Community Engagement",
  "Data Privacy & Cybersecurity",
  "Ethical Governance & Compliance",
  "Human Rights",
  "Innovation & Technology"
]

const esgScopeSchema = z.object({
  selectedFrameworks: z.array(z.string()).min(1, "Please select at least one framework"),
  reportingPeriodStart: z.string().optional(),
  reportingPeriodEnd: z.string().optional(),
  reportingFrequency: z.enum(["annual", "biannual", "quarterly"]).optional(),
  firstReportingDeadline: z.string().optional(),
  wantsToPerformMaterialityAssessment: z.boolean(),
  initialFocusAreas: z.array(z.string()).optional(),
  customFramework: z.string().optional()
})

type ESGScopeFormData = z.infer<typeof esgScopeSchema>

export default function ESGScopePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedFrameworks, setSelectedFrameworks] = useState<ESGFramework[]>([])
  const [regionalFrameworks, setRegionalFrameworks] = useState<ESGFramework[]>([])
  
  const router = useRouter()
  const { 
    state, 
    dispatch,
    updateCompanyData,
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
  } = useForm<ESGScopeFormData>({
    resolver: zodResolver(esgScopeSchema),
    defaultValues: {
      selectedFrameworks: state.selectedFrameworks.filter(f => f.isSelected).map(f => f.id),
      reportingPeriodStart: state.reportingPeriod.start || "",
      reportingPeriodEnd: state.reportingPeriod.end || "",
      reportingFrequency: state.reportingPeriod.frequency || "annual",
      wantsToPerformMaterialityAssessment: state.materialityAssessment.wantsToPerform,
      initialFocusAreas: state.materialityAssessment.focusAreas || []
    }
  })

  const watchedWantsMateriality = watch("wantsToPerformMaterialityAssessment")

  // Initialize component and set up regional frameworks
  useEffect(() => {
    goToStep(2)
    
    // Get regional frameworks based on company's HQ country
    const hqCountry = state.companyData.hqCountry || ""
    const regional = getRegionalFrameworks(hqCountry)
    setRegionalFrameworks(regional)
    
    // Initialize selected frameworks
    const allFrameworks = [...globalFrameworks, ...regional]
    const currentSelected = state.selectedFrameworks.length > 0 
      ? state.selectedFrameworks 
      : allFrameworks
    setSelectedFrameworks(currentSelected)
  }, [goToStep, state.companyData.hqCountry, state.selectedFrameworks])

  const handleFrameworkToggle = useCallback((frameworkId: string, checked: boolean) => {
    setSelectedFrameworks(prev => 
      prev.map(framework => 
        framework.id === frameworkId 
          ? { ...framework, isSelected: checked }
          : framework
      )
    )
    
    // Update form value
    const currentSelected = getValues("selectedFrameworks")
    if (checked) {
      setValue("selectedFrameworks", [...currentSelected, frameworkId])
    } else {
      setValue("selectedFrameworks", currentSelected.filter(id => id !== frameworkId))
    }
  }, [getValues, setValue])

  const handleNext = async () => {
    setIsLoading(true)
    
    try {
      const formData = getValues()
      
      // Update frameworks in context
      const updatedFrameworks = selectedFrameworks.map(framework => ({
        ...framework,
        isSelected: formData.selectedFrameworks.includes(framework.id)
      }))
      
      dispatch({ 
        type: 'UPDATE_FRAMEWORKS', 
        payload: updatedFrameworks
      })
      
      // Update reporting period
      dispatch({
        type: 'UPDATE_REPORTING_PERIOD',
        payload: {
          start: formData.reportingPeriodStart,
          end: formData.reportingPeriodEnd,
          frequency: formData.reportingFrequency
        }
      })
      
      // Update materiality assessment
      dispatch({
        type: 'UPDATE_MATERIALITY',
        payload: {
          wantsToPerform: formData.wantsToPerformMaterialityAssessment,
          focusAreas: formData.initialFocusAreas || []
        }
      })
      
      // Mark step as completed if minimum requirements are met
      if (formData.selectedFrameworks.length > 0) {
        completeStep(2)
      }
      
      // Navigate to next step
      router.push("/onboarding/data-integration")
    } catch (error) {
      console.error("Error saving ESG scope data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    router.push("/onboarding/organization")
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button variant="outline" onClick={handleBack} className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
            <Badge variant="outline">Step 2 of 6</Badge>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ESG Scope & Compliance</h1>
          <p className="text-lg text-gray-600">
            Define your ESG reporting frameworks, requirements, and materiality focus areas.
          </p>
          
          <Progress value={getProgressPercentage() || 33.33} className="w-full mt-4" />
        </div>

        <form onSubmit={handleSubmit(handleNext)} className="space-y-8">
          {/* Regulatory Frameworks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Regulatory Framework Selection</span>
              </CardTitle>
              <CardDescription>
                Select the ESG frameworks and standards relevant to your organization. 
                We've suggested regional frameworks based on your headquarters location.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Global Frameworks */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Global Standards</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {globalFrameworks.map((framework) => (
                    <div key={framework.id} className="flex items-start space-x-3 p-4 border rounded-lg">
                      <Checkbox
                        id={framework.id}
                        checked={selectedFrameworks.find(f => f.id === framework.id)?.isSelected || false}
                        onCheckedChange={(checked) => handleFrameworkToggle(framework.id, checked as boolean)}
                      />
                      <div className="flex-1">
                        <Label htmlFor={framework.id} className="text-sm font-medium cursor-pointer">
                          {framework.name}
                        </Label>
                        <p className="text-sm text-gray-600 mt-1">{framework.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Regional Frameworks */}
              {regionalFrameworks.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                    <Globe className="h-5 w-5" />
                    <span>Regional Requirements ({state.companyData.hqCountry})</span>
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {regionalFrameworks.map((framework) => (
                      <div key={framework.id} className="flex items-start space-x-3 p-4 border rounded-lg bg-blue-50">
                        <Checkbox
                          id={framework.id}
                          checked={selectedFrameworks.find(f => f.id === framework.id)?.isSelected || false}
                          onCheckedChange={(checked) => handleFrameworkToggle(framework.id, checked as boolean)}
                        />
                        <div className="flex-1">
                          <Label htmlFor={framework.id} className="text-sm font-medium cursor-pointer">
                            {framework.name}
                          </Label>
                          <p className="text-sm text-gray-600 mt-1">{framework.description}</p>
                          <Badge variant="secondary" className="mt-2">Regional</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Custom Framework Input */}
              <div>
                <Label htmlFor="customFramework">Additional Framework or Internal Policy</Label>
                <Textarea
                  {...register("customFramework")}
                  id="customFramework"
                  placeholder="Describe any additional ESG frameworks, internal policies, or standards you need to track"
                  rows={3}
                />
              </div>

              {errors.selectedFrameworks && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {errors.selectedFrameworks.message}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Reporting Requirements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Reporting Requirements Configuration</span>
              </CardTitle>
              <CardDescription>
                Configure your reporting periods and key submission deadlines.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="reportingPeriodStart">First Reporting Period Start</Label>
                  <Input
                    {...register("reportingPeriodStart")}
                    id="reportingPeriodStart"
                    type="date"
                  />
                </div>

                <div>
                  <Label htmlFor="reportingPeriodEnd">First Reporting Period End</Label>
                  <Input
                    {...register("reportingPeriodEnd")}
                    id="reportingPeriodEnd"
                    type="date"
                  />
                </div>

                <div>
                  <Label htmlFor="reportingFrequency">Reporting Frequency</Label>
                  <Controller
                    name="reportingFrequency"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          {reportingFrequencies.map((freq) => (
                            <SelectItem key={freq.value} value={freq.value}>
                              {freq.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="firstReportingDeadline">Key Submission Deadline</Label>
                <Input
                  {...register("firstReportingDeadline")}
                  id="firstReportingDeadline"
                  type="date"
                />
                <p className="text-sm text-gray-500 mt-1">
                  When is your first major ESG report or disclosure due?
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Materiality Assessment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Materiality Assessment</span>
              </CardTitle>
              <CardDescription>
                Identify the ESG topics most relevant to your business and stakeholders.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Controller
                  name="wantsToPerformMaterialityAssessment"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="wantsToPerformMaterialityAssessment"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label htmlFor="wantsToPerformMaterialityAssessment" className="text-base font-medium">
                  Perform initial materiality assessment
                </Label>
              </div>

              <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertDescription>
                  A materiality assessment helps identify which ESG topics are most important for your organization based on business impact and stakeholder concerns. You can always perform a full assessment later in the AI Engine.
                </AlertDescription>
              </Alert>

              {watchedWantsMateriality && (
                <div>
                  <Label className="text-base font-medium">
                    Select 3-5 initial ESG focus areas (you can refine these later)
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                    {materialityFocusAreas.map((area) => (
                      <div key={area} className="flex items-center space-x-2">
                        <Controller
                          name="initialFocusAreas"
                          control={control}
                          render={({ field }) => (
                            <Checkbox
                              id={area}
                              checked={field.value?.includes(area) || false}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.onChange([...(field.value || []), area])
                                } else {
                                  field.onChange(field.value?.filter(item => item !== area) || [])
                                }
                              }}
                            />
                          )}
                        />
                        <Label htmlFor={area} className="text-sm cursor-pointer">
                          {area}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Progress Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>Configuration Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Selected Frameworks:</span>
                  <Badge variant="outline">
                    {selectedFrameworks.filter(f => f.isSelected).length} selected
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Materiality Assessment:</span>
                  <Badge variant={watchedWantsMateriality ? "default" : "secondary"}>
                    {watchedWantsMateriality ? "Planned" : "Skip for now"}
                  </Badge>
                </div>
                {watchedWantsMateriality && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Initial Focus Areas:</span>
                    <Badge variant="outline">
                      {watch("initialFocusAreas")?.length || 0} selected
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Organization
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save & Next: Data Integration"}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
} 