"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { 
  ArrowLeft, 
  ArrowRight, 
  Building2, 
  Globe, 
  Users, 
  TrendingUp,
  Factory,
  Lightbulb,
  Target,
  BarChart3,
  CheckCircle,
  Brain,
  Move,
  ChevronRight,
  Download,
  Upload,
  FileText,
  AlertCircle,
  Star,
  Zap,
  Shield,
  Leaf
} from "lucide-react"

// Industry categories and subcategories
const industries = [
  {
    id: "manufacturing",
    name: "Manufacturing",
    subcategories: [
      { id: "textiles", name: "Textiles & Apparel" },
      { id: "automotive", name: "Automotive & Parts" },
      { id: "chemicals", name: "Chemicals & Materials" },
      { id: "electronics", name: "Electronics & Technology" },
      { id: "food-beverage", name: "Food & Beverage" },
      { id: "metals-mining", name: "Metals & Mining" }
    ]
  },
  {
    id: "energy",
    name: "Energy",
    subcategories: [
      { id: "oil-gas", name: "Oil & Gas" },
      { id: "renewables", name: "Renewable Energy" },
      { id: "utilities", name: "Electric Utilities" },
      { id: "coal", name: "Coal Operations" }
    ]
  },
  {
    id: "agriculture",
    name: "Agriculture",
    subcategories: [
      { id: "crop-production", name: "Crop Production" },
      { id: "livestock", name: "Livestock & Dairy" },
      { id: "forestry", name: "Forestry" },
      { id: "aquaculture", name: "Aquaculture & Fishing" }
    ]
  },
  {
    id: "finance",
    name: "Finance",
    subcategories: [
      { id: "banking", name: "Commercial Banking" },
      { id: "insurance", name: "Insurance" },
      { id: "asset-management", name: "Asset Management" },
      { id: "capital-markets", name: "Capital Markets" }
    ]
  },
  {
    id: "technology",
    name: "Technology",
    subcategories: [
      { id: "software", name: "Software & Services" },
      { id: "hardware", name: "Hardware & Equipment" },
      { id: "telecommunications", name: "Telecommunications" },
      { id: "media", name: "Media & Entertainment" }
    ]
  },
  {
    id: "healthcare",
    name: "Healthcare",
    subcategories: [
      { id: "pharmaceuticals", name: "Pharmaceuticals" },
      { id: "medical-devices", name: "Medical Devices" },
      { id: "healthcare-services", name: "Healthcare Services" },
      { id: "biotechnology", name: "Biotechnology" }
    ]
  }
]

// Country/region options
const regions = [
  { id: "nigeria", name: "Nigeria", continent: "Africa" },
  { id: "kenya", name: "Kenya", continent: "Africa" },
  { id: "south-africa", name: "South Africa", continent: "Africa" },
  { id: "ghana", name: "Ghana", continent: "Africa" },
  { id: "egypt", name: "Egypt", continent: "Africa" },
  { id: "usa", name: "United States", continent: "North America" },
  { id: "uk", name: "United Kingdom", continent: "Europe" },
  { id: "germany", name: "Germany", continent: "Europe" },
  { id: "france", name: "France", continent: "Europe" },
  { id: "china", name: "China", continent: "Asia" },
  { id: "india", name: "India", continent: "Asia" },
  { id: "japan", name: "Japan", continent: "Asia" },
  { id: "australia", name: "Australia", continent: "Oceania" },
  { id: "brazil", name: "Brazil", continent: "South America" }
]

// Stakeholder groups
const defaultStakeholderGroups = [
  { id: "investors", name: "Investors", description: "Shareholders, institutional investors, financial analysts" },
  { id: "employees", name: "Employees", description: "Current staff, unions, potential hires" },
  { id: "customers", name: "Customers", description: "End consumers, business clients, distributors" },
  { id: "communities", name: "Local Communities", description: "Neighbors, local governments, community organizations" },
  { id: "regulators", name: "Regulators", description: "Government agencies, standard setters, compliance bodies" },
  { id: "suppliers", name: "Suppliers", description: "Vendors, contractors, business partners" },
  { id: "ngos", name: "NGOs & Civil Society", description: "Environmental groups, social organizations, advocacy groups" },
  { id: "media", name: "Media", description: "Journalists, industry publications, social media" }
]

// ESG Topics for materiality matrix
const esgTopics = [
  // Environmental
  { id: "energy-management", name: "Energy Management", category: "Environmental", framework: "SASB", icon: Zap },
  { id: "ghg-emissions", name: "GHG Emissions", category: "Environmental", framework: "GRI", icon: Leaf },
  { id: "water-management", name: "Water & Wastewater Management", category: "Environmental", framework: "SASB", icon: Globe },
  { id: "waste-management", name: "Waste & Hazardous Materials", category: "Environmental", framework: "GRI", icon: Leaf },
  { id: "air-quality", name: "Air Quality", category: "Environmental", framework: "SASB", icon: Globe },
  { id: "biodiversity", name: "Biodiversity", category: "Environmental", framework: "GRI", icon: Leaf },
  { id: "climate-adaptation", name: "Climate Change Adaptation", category: "Environmental", framework: "TCFD", icon: Shield },
  { id: "circular-economy", name: "Circular Economy", category: "Environmental", framework: "Custom", icon: Target },
  
  // Social
  { id: "labor-practices", name: "Labor Practices", category: "Social", framework: "GRI", icon: Users },
  { id: "employee-safety", name: "Employee Health & Safety", category: "Social", framework: "SASB", icon: Shield },
  { id: "diversity-inclusion", name: "Diversity & Inclusion", category: "Social", framework: "SASB", icon: Users },
  { id: "human-rights", name: "Human Rights", category: "Social", framework: "GRI", icon: Shield },
  { id: "community-relations", name: "Community Relations", category: "Social", framework: "SASB", icon: Users },
  { id: "product-quality", name: "Product Quality & Safety", category: "Social", framework: "SASB", icon: Star },
  { id: "supply-chain-labor", name: "Supply Chain Labor Standards", category: "Social", framework: "GRI", icon: Users },
  { id: "customer-privacy", name: "Customer Privacy", category: "Social", framework: "SASB", icon: Shield },
  
  // Governance
  { id: "business-ethics", name: "Business Ethics", category: "Governance", framework: "GRI", icon: Shield },
  { id: "data-security", name: "Data Security", category: "Governance", framework: "SASB", icon: Shield },
  { id: "regulatory-compliance", name: "Regulatory Compliance", category: "Governance", framework: "Custom", icon: Shield },
  { id: "board-composition", name: "Board Composition", category: "Governance", framework: "SASB", icon: Users },
  { id: "executive-compensation", name: "Executive Compensation", category: "Governance", framework: "SASB", icon: TrendingUp },
  { id: "supply-chain-management", name: "Supply Chain Management", category: "Governance", framework: "SASB", icon: Building2 },
  { id: "risk-management", name: "Risk Management", category: "Governance", framework: "Custom", icon: Shield },
  { id: "transparency", name: "Transparency & Reporting", category: "Governance", framework: "GRI", icon: FileText }
]

export default function MaterialityAssessmentPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [assessmentData, setAssessmentData] = useState({
    industry: "",
    subIndustry: "",
    regions: [] as string[],
    companySize: {
      revenue: "",
      employees: ""
    },
    selectedStakeholders: [] as string[],
    customStakeholders: [] as { id: string; name: string; description: string }[],
    stakeholderPerspectives: {
      method: "ai-synthetic" as "survey" | "ai-synthetic" | "manual",
      surveyFile: null as File | null,
      manualRatings: {} as Record<string, Record<string, number>>
    },
    businessImpactAssessment: {} as Record<string, {
      financialImpact: number;
      operationalImpact: number;
      reputationImpact: number;
      strategicImpact: number;
    }>,
    materialityMatrix: {} as Record<string, { stakeholderImportance: number; businessImpact: number }>
  })

  const [showBenchmarks, setShowBenchmarks] = useState(false)
  const [showAIAnalysis, setShowAIAnalysis] = useState(false)
  const [selectedTopicForRating, setSelectedTopicForRating] = useState<string | null>(null)
  const [substep, setSubstep] = useState("2A") // For step 2 sub-steps

  // Computed values
  const selectedIndustry = industries.find(i => i.id === assessmentData.industry)
  const selectedSubcategories = selectedIndustry?.subcategories || []
  const allStakeholders = [...defaultStakeholderGroups, ...assessmentData.customStakeholders]

  const handleNext = () => {
    if (currentStep === 1) {
      setShowBenchmarks(true)
      setTimeout(() => {
        setCurrentStep(2)
        setShowBenchmarks(false)
        setSubstep("2A")
      }, 2000)
    } else if (currentStep === 2) {
      if (substep === "2A") {
        setSubstep("2B")
      } else {
        setCurrentStep(3)
      }
    } else if (currentStep === 3) {
      setShowAIAnalysis(true)
      setTimeout(() => {
        setCurrentStep(4)
        setShowAIAnalysis(false)
      }, 3000)
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep === 2 && substep === "2B") {
      setSubstep("2A")
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      if (currentStep === 2) {
        setSubstep("2A")
      }
    } else {
      router.push("/ai-engine")
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return assessmentData.industry && 
               assessmentData.regions.length > 0 && 
               assessmentData.companySize.revenue && 
               assessmentData.companySize.employees
      case 2:
        if (substep === "2A") {
          return assessmentData.selectedStakeholders.length >= 3
        } else {
          return Object.keys(assessmentData.businessImpactAssessment).length >= 5
        }
      case 3:
        return Object.keys(assessmentData.materialityMatrix).length >= 10
      default:
        return true
    }
  }

  const addCustomStakeholder = () => {
    const name = prompt("Enter stakeholder group name:")
    const description = prompt("Enter description:")
    
    if (name && description) {
      const newStakeholder = {
        id: `custom-${Date.now()}`,
        name,
        description
      }
      setAssessmentData({
        ...assessmentData,
        customStakeholders: [...assessmentData.customStakeholders, newStakeholder]
      })
    }
  }

  const handleTopicRating = (topicId: string, stakeholderImportance: number, businessImpact: number) => {
    setAssessmentData({
      ...assessmentData,
      materialityMatrix: {
        ...assessmentData.materialityMatrix,
        [topicId]: { stakeholderImportance, businessImpact }
      }
    })
  }

  const getTopicColor = (topicId: string) => {
    // Find the index of the topic in the esgTopics array
    const topicIndex = esgTopics.findIndex(topic => topic.id === topicId)
    
    // Generate a unique color based on the topic index using HSL color space
    // This ensures good distribution and visibility
    const hue = (topicIndex * 360 / esgTopics.length) % 360
    const saturation = 70 + (topicIndex % 3) * 10 // Vary saturation between 70-90%
    const lightness = 45 + (topicIndex % 2) * 10  // Vary lightness between 45-55%
    
    // Convert to CSS HSL values
    const hslColor = `hsl(${Math.round(hue)}, ${saturation}%, ${lightness}%)`
    
    // For Tailwind compatibility, we'll use CSS custom properties
    return {
      bg: "bg-transparent", // We'll use inline styles instead
      bgHover: "bg-transparent",
      bgSelected: "bg-transparent",
      border: "border-gray-600",
      text: "text-gray-600",
      hsl: hslColor,
      hslHover: `hsl(${Math.round(hue)}, ${saturation}%, ${lightness - 5}%)`, // Slightly darker on hover
      hslSelected: `hsl(${Math.round(hue)}, ${saturation + 10}%, ${lightness}%)` // More saturated when selected
    }
  }

  const getTopicPosition = (topicId: string) => {
    const rating = assessmentData.materialityMatrix[topicId]
    if (!rating) return null
    
    return {
      x: (rating.businessImpact / 10) * 100, // Updated for 0-10 scale
      y: 100 - (rating.stakeholderImportance / 5) * 100 // Stakeholder importance remains 1-5
    }
  }

  const getQuadrantLabel = (x: number, y: number) => {
    if (x > 50 && y < 50) return "High Priority"
    if (x < 50 && y < 50) return "Monitor"
    if (x > 50 && y > 50) return "Consider"
    return "Low Priority"
  }

  const handleBusinessImpactAssessment = (topicId: string, dimension: string, value: number) => {
    setAssessmentData({
      ...assessmentData,
      businessImpactAssessment: {
        ...assessmentData.businessImpactAssessment,
        [topicId]: {
          ...assessmentData.businessImpactAssessment[topicId],
          [dimension]: value
        }
      }
    })
  }

  const getOverallBusinessImpact = (topicId: string) => {
    const assessment = assessmentData.businessImpactAssessment[topicId]
    if (!assessment) return 5 // Default value for 0-10 scale
    
    const { financialImpact = 5, operationalImpact = 5, reputationImpact = 5, strategicImpact = 5 } = assessment
    
    // Handle case where all values are defined (including 0 as valid)
    const values = [financialImpact, operationalImpact, reputationImpact, strategicImpact]
    const validValues = values.filter(val => val !== undefined && val !== null && !isNaN(val))
    
    if (validValues.length === 0) return 5 // Default if no valid values
    
    const sum = validValues.reduce((total, val) => total + val, 0)
    return Math.round(sum / validValues.length)
  }

  return (
    <div className="flex flex-col gap-6 p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Materiality Assessment Wizard</h1>
            <p className="text-muted-foreground">
              Step {currentStep} of 4 - {
                currentStep === 1 ? "Industry Baseline & Scoping" :
                currentStep === 2 ? `Stakeholder Input & Business Impact (${substep})` :
                currentStep === 3 ? "Interactive Materiality Matrix" :
                "AI Analysis & Finalization"
              }
            </p>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span>{currentStep}/4 steps</span>
        </div>
        <Progress value={(currentStep / 4) * 100} className="h-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Industry Baseline</span>
          <span>Stakeholder Input</span>
          <span>Materiality Matrix</span>
          <span>AI Analysis</span>
        </div>
      </div>

      {/* Step 1: Industry Baseline & Scoping */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="h-5 w-5" />
              <span>Industry Baseline & Scoping</span>
            </CardTitle>
            <CardDescription>
              Define your industry, regions of operation, and company characteristics to load relevant benchmarks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Industry Selection */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="industry">Primary Industry *</Label>
                <Select 
                  value={assessmentData.industry} 
                  onValueChange={(value) => setAssessmentData({
                    ...assessmentData, 
                    industry: value,
                    subIndustry: "" // Reset sub-industry when main industry changes
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your primary industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry.id} value={industry.id}>
                        {industry.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {assessmentData.industry && (
                <div>
                  <Label htmlFor="sub-industry">Sub-Industry (Optional)</Label>
                  <Select 
                    value={assessmentData.subIndustry} 
                    onValueChange={(value) => setAssessmentData({...assessmentData, subIndustry: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select sub-industry for more specific benchmarks" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedSubcategories.map((sub) => (
                        <SelectItem key={sub.id} value={sub.id}>
                          {sub.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <Separator />

            {/* Region Selection */}
            <div className="space-y-4">
              <div>
                <Label className="text-base font-medium">Regions of Operation *</Label>
                <p className="text-sm text-muted-foreground">
                  Select countries/regions where your company operates (select multiple)
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["Africa", "North America", "Europe", "Asia", "Oceania", "South America"].map((continent) => (
                  <div key={continent} className="space-y-2">
                    <h4 className="font-medium text-sm">{continent}</h4>
                    <div className="space-y-2">
                      {regions
                        .filter(region => region.continent === continent)
                        .map((region) => (
                          <div key={region.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={region.id}
                              checked={assessmentData.regions.includes(region.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setAssessmentData({
                                    ...assessmentData,
                                    regions: [...assessmentData.regions, region.id]
                                  })
                                } else {
                                  setAssessmentData({
                                    ...assessmentData,
                                    regions: assessmentData.regions.filter(r => r !== region.id)
                                  })
                                }
                              }}
                            />
                            <Label htmlFor={region.id} className="text-sm">
                              {region.name}
                            </Label>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>

              {assessmentData.regions.length > 0 && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-800 mb-2">Selected Regions:</p>
                  <div className="flex flex-wrap gap-1">
                    {assessmentData.regions.map((regionId) => {
                      const region = regions.find(r => r.id === regionId)
                      return region ? (
                        <Badge key={regionId} variant="outline" className="text-xs">
                          {region.name}
                        </Badge>
                      ) : null
                    })}
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* Company Size */}
            <div className="space-y-4">
              <div>
                <Label className="text-base font-medium">Company Size *</Label>
                <p className="text-sm text-muted-foreground">
                  Provide company size for more accurate peer grouping and benchmarking
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="revenue">Annual Revenue (USD)</Label>
                  <Select 
                    value={assessmentData.companySize.revenue} 
                    onValueChange={(value) => setAssessmentData({
                      ...assessmentData,
                      companySize: { ...assessmentData.companySize, revenue: value }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select revenue range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-1m">Under $1M</SelectItem>
                      <SelectItem value="1m-10m">$1M - $10M</SelectItem>
                      <SelectItem value="10m-50m">$10M - $50M</SelectItem>
                      <SelectItem value="50m-250m">$50M - $250M</SelectItem>
                      <SelectItem value="250m-1b">$250M - $1B</SelectItem>
                      <SelectItem value="1b-10b">$1B - $10B</SelectItem>
                      <SelectItem value="over-10b">Over $10B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="employees">Number of Employees</Label>
                  <Select 
                    value={assessmentData.companySize.employees} 
                    onValueChange={(value) => setAssessmentData({
                      ...assessmentData,
                      companySize: { ...assessmentData.companySize, employees: value }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select employee count" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-1000">201-1,000 employees</SelectItem>
                      <SelectItem value="1001-5000">1,001-5,000 employees</SelectItem>
                      <SelectItem value="5001-10000">5,001-10,000 employees</SelectItem>
                      <SelectItem value="over-10000">Over 10,000 employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* AI Benchmark Loading */}
            {showBenchmarks && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <Brain className="h-5 w-5 text-blue-600 animate-pulse" />
                  <span className="text-sm font-medium text-blue-800">Loading Industry Benchmarks & Stakeholder Perspectives</span>
                </div>
                <Progress value={75} className="h-2" />
                <p className="text-xs text-blue-700 mt-2">
                  Fetching SASB and GRI standards, analyzing peer data, and generating stakeholder insights...
                </p>
              </div>
            )}

            <div className="flex justify-end pt-4">
              <Button onClick={handleNext} disabled={!canProceed() || showBenchmarks}>
                {showBenchmarks ? (
                  <>
                    <Brain className="mr-2 h-4 w-4 animate-pulse" />
                    Loading Benchmarks...
                  </>
                ) : (
                  <>
                    Load Benchmarks & Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Stakeholder Input & Business Impact Assessment */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Stakeholder Input & Business Impact Assessment</span>
            </CardTitle>
            <CardDescription>
              {substep === "2A" 
                ? "Define stakeholder groups and gather their perspectives on ESG topics"
                : "Assess the potential business impact of each ESG topic"
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">Benchmarks Loaded Successfully</span>
              </div>
              <p className="text-sm text-green-700">
                Found relevant standards and peer data for {selectedIndustry?.name} in {assessmentData.regions.length} region(s)
              </p>
            </div>

            <Tabs value={substep} onValueChange={setSubstep}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="2A">2A: Stakeholder Perspectives</TabsTrigger>
                <TabsTrigger value="2B">2B: Business Impact Assessment</TabsTrigger>
              </TabsList>

              {/* Sub-Step 2A: Gathering Stakeholder Perspectives */}
              <TabsContent value="2A" className="space-y-6">
                <div>
                  <Label className="text-base font-medium">Select Stakeholder Groups *</Label>
                  <p className="text-sm text-muted-foreground mb-4">
                    Choose at least 3 stakeholder groups that are most relevant to your business. You can add custom groups if needed.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {allStakeholders.map((stakeholder) => (
                      <Card 
                        key={stakeholder.id}
                        className={`cursor-pointer transition-all ${
                          assessmentData.selectedStakeholders.includes(stakeholder.id) 
                            ? "border-blue-500 bg-blue-50" 
                            : "hover:border-gray-300"
                        }`}
                        onClick={() => {
                          if (assessmentData.selectedStakeholders.includes(stakeholder.id)) {
                            setAssessmentData({
                              ...assessmentData,
                              selectedStakeholders: assessmentData.selectedStakeholders.filter(s => s !== stakeholder.id)
                            })
                          } else {
                            setAssessmentData({
                              ...assessmentData,
                              selectedStakeholders: [...assessmentData.selectedStakeholders, stakeholder.id]
                            })
                          }
                        }}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{stakeholder.name}</h4>
                              <p className="text-xs text-muted-foreground mt-1">{stakeholder.description}</p>
                            </div>
                            <Checkbox
                              checked={assessmentData.selectedStakeholders.includes(stakeholder.id)}
                              onChange={() => {}} // Handled by card click
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="mt-4">
                    <Button variant="outline" onClick={addCustomStakeholder}>
                      <Users className="h-4 w-4 mr-2" />
                      Add Custom Stakeholder Group
                    </Button>
                  </div>

                  {assessmentData.selectedStakeholders.length > 0 && (
                    <div className="p-3 bg-blue-50 rounded-lg mt-4">
                      <p className="text-sm font-medium text-blue-800 mb-2">
                        Selected Groups ({assessmentData.selectedStakeholders.length}):
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {assessmentData.selectedStakeholders.map((stakeholderId) => {
                          const stakeholder = allStakeholders.find(s => s.id === stakeholderId)
                          return stakeholder ? (
                            <Badge key={stakeholderId} variant="outline" className="text-xs">
                              {stakeholder.name}
                            </Badge>
                          ) : null
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Stakeholder Input Methods */}
                {assessmentData.selectedStakeholders.length >= 3 && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-medium">Stakeholder Input Method</Label>
                      <p className="text-sm text-muted-foreground">
                        Choose how to gather stakeholder perspectives on ESG topic importance
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card 
                        className={`cursor-pointer transition-all ${
                          assessmentData.stakeholderPerspectives.method === "survey" 
                            ? "border-blue-500 bg-blue-50" 
                            : "hover:border-gray-300"
                        }`}
                        onClick={() => setAssessmentData({
                          ...assessmentData,
                          stakeholderPerspectives: { ...assessmentData.stakeholderPerspectives, method: "survey" }
                        })}
                      >
                        <CardContent className="p-4 text-center">
                          <Upload className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                          <h4 className="font-medium text-sm">Upload Survey Results</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            Upload CSV/Excel with stakeholder survey responses
                          </p>
                        </CardContent>
                      </Card>

                      <Card 
                        className={`cursor-pointer transition-all ${
                          assessmentData.stakeholderPerspectives.method === "ai-synthetic" 
                            ? "border-blue-500 bg-blue-50" 
                            : "hover:border-gray-300"
                        }`}
                        onClick={() => setAssessmentData({
                          ...assessmentData,
                          stakeholderPerspectives: { ...assessmentData.stakeholderPerspectives, method: "ai-synthetic" }
                        })}
                      >
                        <CardContent className="p-4 text-center">
                          <Brain className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                          <h4 className="font-medium text-sm">AI-Generated Perspectives</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            Use AI to simulate stakeholder perspectives based on industry data
                          </p>
                        </CardContent>
                      </Card>

                      <Card 
                        className={`cursor-pointer transition-all ${
                          assessmentData.stakeholderPerspectives.method === "manual" 
                            ? "border-blue-500 bg-blue-50" 
                            : "hover:border-gray-300"
                        }`}
                        onClick={() => setAssessmentData({
                          ...assessmentData,
                          stakeholderPerspectives: { ...assessmentData.stakeholderPerspectives, method: "manual" }
                        })}
                      >
                        <CardContent className="p-4 text-center">
                          <Target className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                          <h4 className="font-medium text-sm">Manual Rating</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            Manually rate topics based on workshops or qualitative feedback
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    {assessmentData.stakeholderPerspectives.method === "ai-synthetic" && (
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Brain className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-800">AI-Generated Stakeholder Data Ready</span>
                        </div>
                        <p className="text-sm text-blue-700">
                          AI will generate plausible stakeholder perspectives based on your industry ({selectedIndustry?.name}), 
                          regions, and selected stakeholder groups. This data is suitable for SMEs without extensive survey capability.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </TabsContent>

              {/* Sub-Step 2B: Assessing Impact on Business Success */}
              <TabsContent value="2B" className="space-y-6">
                <div>
                  <Label className="text-base font-medium">Business Impact Assessment</Label>
                  <p className="text-sm text-muted-foreground">
                    Assess the potential impact of each ESG topic on your business success across multiple dimensions
                  </p>
                </div>

                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {esgTopics.slice(0, 8).map((topic) => {
                    const IconComponent = topic.icon
                    const assessment = assessmentData.businessImpactAssessment[topic.id] || {
                      financialImpact: 5,
                      operationalImpact: 5,
                      reputationImpact: 5,
                      strategicImpact: 5
                    }
                    
                    return (
                      <Card key={topic.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3 mb-4">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                              <IconComponent className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">{topic.name}</h4>
                              <div className="flex items-center space-x-2">
                                <Badge 
                                  variant="outline" 
                                  className={`text-xs ${
                                    topic.category === "Environmental" ? "border-green-300 text-green-700" :
                                    topic.category === "Social" ? "border-blue-300 text-blue-700" :
                                    "border-purple-300 text-purple-700"
                                  }`}
                                >
                                  {topic.category}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {topic.framework}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-xs">Financial Impact (0-10)</Label>
                              <Slider
                                value={[assessment.financialImpact]}
                                onValueChange={([value]) => handleBusinessImpactAssessment(topic.id, "financialImpact", value)}
                                max={10}
                                min={0}
                                step={1}
                                className="mt-2"
                              />
                              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                <span>None</span>
                                <span>{assessment.financialImpact}</span>
                                <span>High</span>
                              </div>
                            </div>

                            <div>
                              <Label className="text-xs">Operational Impact (0-10)</Label>
                              <Slider
                                value={[assessment.operationalImpact]}
                                onValueChange={([value]) => handleBusinessImpactAssessment(topic.id, "operationalImpact", value)}
                                max={10}
                                min={0}
                                step={1}
                                className="mt-2"
                              />
                              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                <span>None</span>
                                <span>{assessment.operationalImpact}</span>
                                <span>High</span>
                              </div>
                            </div>

                            <div>
                              <Label className="text-xs">Reputation Impact (0-10)</Label>
                              <Slider
                                value={[assessment.reputationImpact]}
                                onValueChange={([value]) => handleBusinessImpactAssessment(topic.id, "reputationImpact", value)}
                                max={10}
                                min={0}
                                step={1}
                                className="mt-2"
                              />
                              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                <span>None</span>
                                <span>{assessment.reputationImpact}</span>
                                <span>High</span>
                              </div>
                            </div>

                            <div>
                              <Label className="text-xs">Strategic Impact (0-10)</Label>
                              <Slider
                                value={[assessment.strategicImpact]}
                                onValueChange={([value]) => handleBusinessImpactAssessment(topic.id, "strategicImpact", value)}
                                max={10}
                                min={0}
                                step={1}
                                className="mt-2"
                              />
                              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                <span>None</span>
                                <span>{assessment.strategicImpact}</span>
                                <span>High</span>
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 p-2 bg-gray-50 rounded text-center">
                            <span className="text-xs font-medium">
                              Overall Business Impact: {getOverallBusinessImpact(topic.id)}/10
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Assessment Progress</span>
                    <span className="text-sm text-gray-600">
                      {Object.keys(assessmentData.businessImpactAssessment).length} / 8 topics assessed
                    </span>
                  </div>
                  <Progress 
                    value={(Object.keys(assessmentData.businessImpactAssessment).length / 8) * 100} 
                    className="h-2" 
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button onClick={handleNext} disabled={!canProceed()}>
                {substep === "2A" ? "Continue to Business Impact" : "Continue to Matrix Mapping"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Interactive Materiality Matrix */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Interactive Materiality Matrix</span>
            </CardTitle>
            <CardDescription>
              Rate ESG topics based on stakeholder importance and business impact to build your materiality matrix
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Lightbulb className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">AI-Suggested Topics & Integration</span>
              </div>
              <p className="text-sm text-blue-700">
                Based on your industry ({selectedIndustry?.name}), regions, and stakeholder groups, we've identified key ESG topics. 
                Business impact assessments from Step 2B are automatically integrated. Rate stakeholder importance to complete the matrix.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Topics List */}
              <div className="space-y-4">
                <h3 className="font-medium">ESG Topics to Assess</h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {esgTopics.map((topic) => {
                    const IconComponent = topic.icon
                    const isRated = assessmentData.materialityMatrix[topic.id]
                    const businessImpact = getOverallBusinessImpact(topic.id) || 5
                    
                    return (
                      <Card 
                        key={topic.id}
                        className={`cursor-pointer transition-all ${
                          selectedTopicForRating === topic.id 
                            ? "border-blue-500 bg-blue-50" 
                            : isRated
                              ? "border-green-300 bg-green-50"
                              : "hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedTopicForRating(topic.id)}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 flex-1">
                              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <IconComponent className="h-4 w-4 text-blue-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-1">
                                  <h4 className="font-medium text-sm truncate">{topic.name}</h4>
                                  <Badge 
                                    variant="outline" 
                                    className={`text-xs ${
                                      topic.category === "Environmental" ? "border-green-300 text-green-700" :
                                      topic.category === "Social" ? "border-blue-300 text-blue-700" :
                                      "border-purple-300 text-purple-700"
                                    }`}
                                  >
                                    {topic.category}
                                  </Badge>
                                </div>
                                {isRated ? (
                                  <div className="text-xs text-green-600">
                                    Stakeholder: {isRated.stakeholderImportance}/5 | Business: {isRated.businessImpact}/5
                                  </div>
                                ) : (
                                  <div className="text-xs text-gray-500">
                                    Business Impact: {businessImpact}/5 (from Step 2B)
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {isRated ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                <ChevronRight className="h-4 w-4 text-gray-400" />
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>

              {/* Rating Interface */}
              <div className="space-y-4">
                {selectedTopicForRating ? (
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        {esgTopics.find(t => t.id === selectedTopicForRating)?.icon && 
                          React.createElement(esgTopics.find(t => t.id === selectedTopicForRating)!.icon, {
                            className: "h-4 w-4 text-blue-600"
                          })
                        }
                      </div>
                      <div>
                        <h3 className="font-medium">
                          {esgTopics.find(t => t.id === selectedTopicForRating)?.name}
                        </h3>
                        <div className="text-xs text-gray-500">
                          Business Impact: {getOverallBusinessImpact(selectedTopicForRating)}/5 (pre-filled from Step 2B)
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <Label className="text-sm font-medium">Stakeholder Importance</Label>
                        <p className="text-xs text-muted-foreground mb-3">
                          How important is this topic to your selected stakeholder groups?
                        </p>
                        <div className="flex space-x-2">
                          {[1, 2, 3, 4, 5].map((rating) => {
                            const currentRating = assessmentData.materialityMatrix[selectedTopicForRating]
                            return (
                              <Button
                                key={rating}
                                variant={currentRating?.stakeholderImportance === rating ? "default" : "outline"}
                                size="sm"
                                className="w-12 h-12"
                                onClick={() => {
                                  const businessImpact = getOverallBusinessImpact(selectedTopicForRating) || 5
                                  handleTopicRating(selectedTopicForRating, rating, businessImpact)
                                }}
                              >
                                {rating}
                              </Button>
                            )
                          })}
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>Low</span>
                          <span>High</span>
                        </div>
                      </div>

                      <div className="p-3 bg-blue-50 rounded-lg">
                        <h4 className="text-sm font-medium text-blue-800 mb-2">AI Context & Guidance</h4>
                        <p className="text-xs text-blue-700">
                          Based on industry benchmarks, this topic is typically rated 
                          {Math.random() > 0.5 ? " high" : " medium"} priority by 
                          {assessmentData.selectedStakeholders.length} stakeholder groups in {selectedIndustry?.name}.
                        </p>
                      </div>

                      {assessmentData.materialityMatrix[selectedTopicForRating] && (
                        <div className="p-3 bg-green-50 rounded-lg">
                          <h4 className="text-sm font-medium text-green-800 mb-1">Matrix Position</h4>
                          <p className="text-xs text-green-700">
                            This topic is positioned in the "{getQuadrantLabel(
                              getOverallBusinessImpact(selectedTopicForRating) * 10, // Scale 0-10 to 0-100
                              100 - (assessmentData.materialityMatrix[selectedTopicForRating].stakeholderImportance * 20) // Scale 1-5 to inverted y position
                            )}" quadrant
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <Target className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="font-medium text-gray-600">Select a Topic to Rate</h3>
                    <p className="text-sm text-gray-500">
                      Click on any ESG topic from the list to rate its stakeholder importance. 
                      Business impact is pre-filled from your Step 2B assessments.
                    </p>
                  </div>
                )}

                {/* Progress */}
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Assessment Progress</span>
                    <span className="text-sm text-gray-600">
                      {Object.keys(assessmentData.materialityMatrix).length} / {esgTopics.length} topics
                    </span>
                  </div>
                  <Progress 
                    value={(Object.keys(assessmentData.materialityMatrix).length / esgTopics.length) * 100} 
                    className="h-2" 
                  />
                </div>
              </div>
            </div>

            {/* Materiality Matrix Visualization */}
            {Object.keys(assessmentData.materialityMatrix).length > 0 && (
              <div className="space-y-4">
                <h3 className="font-medium">Live Materiality Matrix</h3>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-sm font-medium text-blue-800">Interactive Matrix</span>
                  </div>
                  <p className="text-xs text-blue-700 mt-1">
                    Hover over topics to see their names, click to select and rate. Selected topics show permanent labels.
                  </p>
                </div>

                <div className="relative w-full h-96 border rounded-lg bg-gradient-to-r from-red-50 via-yellow-50 to-green-50">
                  {/* Axis Labels */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-6 text-sm font-medium">
                    Business Impact →
                  </div>
                  <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-6 -rotate-90 text-sm font-medium">
                    Stakeholder Importance →
                  </div>
                  
                  {/* Quadrant Lines */}
                  <div className="absolute w-full h-px bg-gray-300 top-1/2 transform -translate-y-1/2"></div>
                  <div className="absolute h-full w-px bg-gray-300 left-1/2 transform -translate-x-1/2"></div>
                  
                  {/* Quadrant Labels */}
                  <div className="absolute top-2 right-2 text-xs font-medium text-green-700 bg-white px-2 py-1 rounded shadow">High Priority</div>
                  <div className="absolute top-2 left-2 text-xs font-medium text-blue-700 bg-white px-2 py-1 rounded shadow">Monitor</div>
                  <div className="absolute bottom-2 right-2 text-xs font-medium text-yellow-700 bg-white px-2 py-1 rounded shadow">Consider</div>
                  <div className="absolute bottom-2 left-2 text-xs font-medium text-gray-700 bg-white px-2 py-1 rounded shadow">Low Priority</div>
                  
                  {/* Topics as dots */}
                  {Object.entries(assessmentData.materialityMatrix).map(([topicId, rating]) => {
                    const position = getTopicPosition(topicId)
                    const topic = esgTopics.find(t => t.id === topicId)
                    if (!position || !topic) return null
                    
                    const colors = getTopicColor(topicId)
                    
                    return (
                      <div
                        key={topicId}
                        className="absolute w-4 h-4 rounded-full transform -translate-x-1/2 -translate-y-1/2 border-2 border-white shadow"
                        style={{ 
                          left: `${position.x}%`, 
                          top: `${position.y}%`,
                          backgroundColor: colors.hsl
                        }}
                        title={`${topic.name} (${topic.category}): Stakeholder ${rating.stakeholderImportance}/5, Business ${rating.businessImpact}/10`}
                      />
                    )
                  })}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2">High Priority Topics</h4>
                    <div className="space-y-1">
                      {Object.entries(assessmentData.materialityMatrix)
                        .filter(([_, rating]) => rating.stakeholderImportance >= 4 && rating.businessImpact >= 7) // Updated threshold for 0-10 scale
                        .map(([topicId]) => {
                          const topic = esgTopics.find(t => t.id === topicId)
                          if (!topic) return null
                          const colors = getTopicColor(topicId)
                          return (
                            <div key={topicId} className="flex items-center space-x-2">
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.hsl }}></div>
                              <span className="text-xs">{topic.name}</span>
                            </div>
                          )
                        })}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">Monitor Topics</h4>
                    <div className="space-y-1">
                      {Object.entries(assessmentData.materialityMatrix)
                        .filter(([_, rating]) => rating.stakeholderImportance >= 4 && rating.businessImpact < 7)
                        .map(([topicId]) => {
                          const topic = esgTopics.find(t => t.id === topicId)
                          if (!topic) return null
                          const colors = getTopicColor(topicId)
                          return (
                            <div key={topicId} className="flex items-center space-x-2">
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.hsl }}></div>
                              <span className="text-xs">{topic.name}</span>
                            </div>
                          )
                        })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* AI Analysis Loading */}
            {showAIAnalysis && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <Brain className="h-5 w-5 text-blue-600 animate-pulse" />
                  <span className="text-sm font-medium text-blue-800">AI Analysis in Progress</span>
                </div>
                <Progress value={75} className="h-2" />
                <p className="text-xs text-blue-700 mt-2">
                  Analyzing your materiality matrix, comparing with industry benchmarks, generating insights, and preparing recommendations...
                </p>
              </div>
            )}

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button onClick={handleNext} disabled={!canProceed() || showAIAnalysis}>
                {showAIAnalysis ? (
                  <>
                    <Brain className="mr-2 h-4 w-4 animate-pulse" />
                    Running AI Analysis...
                  </>
                ) : (
                  <>
                    Generate AI Insights & Finalize
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: AI Analysis & Finalization */}
      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5" />
              <span>AI Analysis & Final Materiality Assessment</span>
            </CardTitle>
            <CardDescription>
              Review AI insights, peer comparisons, and finalize your materiality assessment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">AI Analysis Complete</span>
              </div>
              <p className="text-sm text-green-700">
                Successfully analyzed {Object.keys(assessmentData.materialityMatrix).length} ESG topics against industry benchmarks 
                and {assessmentData.regions.length} regional peer data sets
              </p>
            </div>

            {/* AI Insights and Comparisons */}
            <Tabs defaultValue="insights" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="insights">AI Insights</TabsTrigger>
                <TabsTrigger value="peer-comparison">Peer Comparison</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                <TabsTrigger value="final-matrix">Final Matrix</TabsTrigger>
              </TabsList>

              <TabsContent value="insights" className="space-y-4 mt-6">
                <h3 className="font-medium">Key AI-Generated Insights</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mt-0.5">
                          <Lightbulb className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-2">High Priority Alignment</h4>
                          <p className="text-xs text-gray-600">
                            Your top material topics (GHG Emissions, Energy Management) align with 87% of peer companies 
                            in {selectedIndustry?.name}. This indicates strong industry consensus on these priorities.
                          </p>
                          <div className="mt-2">
                            <Badge variant="default" className="bg-green-100 text-green-700 text-xs">
                              Strong Alignment
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mt-0.5">
                          <TrendingUp className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-2">Emerging Opportunity</h4>
                          <p className="text-xs text-gray-600">
                            Your Circular Economy rating exceeds industry average by 23%, suggesting competitive 
                            advantage potential in sustainable innovation and cost reduction.
                          </p>
                          <div className="mt-2">
                            <Badge variant="default" className="bg-blue-100 text-blue-700 text-xs">
                              Above Average
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mt-0.5">
                          <AlertCircle className="h-4 w-4 text-yellow-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-2">Gap Identified</h4>
                          <p className="text-xs text-gray-600">
                            Supply Chain Labor Standards shows lower priority than 65% of peers. Consider deeper 
                            stakeholder engagement to validate this assessment given regional context.
                          </p>
                          <div className="mt-2">
                            <Badge variant="outline" className="border-yellow-300 text-yellow-700 text-xs">
                              Below Peer Average
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mt-0.5">
                          <Target className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-2">Regional Relevance</h4>
                          <p className="text-xs text-gray-600">
                            Your assessment reflects regional ESG priorities well, with Water Management and 
                            Community Relations appropriately weighted for {assessmentData.regions.length} operational regions.
                          </p>
                          <div className="mt-2">
                            <Badge variant="default" className="bg-purple-100 text-purple-700 text-xs">
                              Regionally Aligned
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="peer-comparison" className="space-y-4 mt-6">
                <h3 className="font-medium">Industry & Peer Benchmarking</h3>
                
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium text-sm mb-3">Your Assessment vs. Industry Benchmarks</h4>
                      <div className="space-y-3">
                        {Object.entries(assessmentData.materialityMatrix)
                          .filter(([_, rating]) => rating.stakeholderImportance >= 4 || rating.businessImpact >= 4)
                          .slice(0, 5)
                          .map(([topicId, rating]) => {
                            const topic = esgTopics.find(t => t.id === topicId)
                            const industryAvg = Math.round(Math.random() * 2 + 3) // Simulated industry average
                            const yourScore = Math.round((rating.stakeholderImportance + rating.businessImpact) / 2)
                            
                            return topic ? (
                              <div key={topicId} className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                                    {React.createElement(topic.icon, { className: "h-3 w-3 text-blue-600" })}
                                  </div>
                                  <span className="text-sm">{topic.name}</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                  <div className="text-right">
                                    <div className="text-xs text-gray-500">Your Score</div>
                                    <div className="text-sm font-medium">{yourScore}/5</div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-xs text-gray-500">Industry Avg</div>
                                    <div className="text-sm font-medium">{industryAvg}/5</div>
                                  </div>
                                  <div className="w-16">
                                    {yourScore > industryAvg ? (
                                      <Badge variant="default" className="bg-green-100 text-green-700 text-xs">
                                        Above
                                      </Badge>
                                    ) : yourScore < industryAvg ? (
                                      <Badge variant="outline" className="border-yellow-300 text-yellow-700 text-xs">
                                        Below
                                      </Badge>
                                    ) : (
                                      <Badge variant="outline" className="text-xs">
                                        Aligned
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ) : null
                          })}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-blue-600">78%</div>
                        <p className="text-sm text-gray-600">Alignment with Industry</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Your materiality assessment aligns well with {selectedIndustry?.name} sector benchmarks
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-green-600">3</div>
                        <p className="text-sm text-gray-600">Above-Average Topics</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Topics where you exceed peer performance
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-yellow-600">2</div>
                        <p className="text-sm text-gray-600">Attention Areas</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Topics to review based on peer comparison
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="recommendations" className="space-y-4 mt-6">
                <h3 className="font-medium">AI-Generated Strategic Recommendations</h3>
                
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mt-0.5">
                          <Target className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm mb-2">Focus on High-Priority Material Topics</h4>
                          <p className="text-xs text-gray-600 mb-3">
                            Prioritize resources on GHG Emissions, Energy Management, and Employee Safety - 
                            your stakeholders rate these as most critical and they have high business impact.
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex space-x-2">
                              <Badge variant="outline" className="text-xs">Priority: High</Badge>
                              <Badge variant="outline" className="text-xs">Timeline: 3-6 months</Badge>
                            </div>
                            <Button variant="outline" size="sm">Link to Strategy Builder</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mt-0.5">
                          <Users className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm mb-2">Enhance Stakeholder Engagement</h4>
                          <p className="text-xs text-gray-600 mb-3">
                            Consider conducting focused stakeholder surveys on Supply Chain Labor Standards 
                            to validate current assessment and ensure regional context is properly captured.
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex space-x-2">
                              <Badge variant="outline" className="text-xs">Priority: Medium</Badge>
                              <Badge variant="outline" className="text-xs">Timeline: 6-12 months</Badge>
                            </div>
                            <Button variant="outline" size="sm">Schedule Review</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mt-0.5">
                          <Zap className="h-4 w-4 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm mb-2">Leverage Competitive Advantages</h4>
                          <p className="text-xs text-gray-600 mb-3">
                            Your strong performance in Circular Economy presents opportunity for thought leadership 
                            and potential cost savings through innovation initiatives.
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex space-x-2">
                              <Badge variant="default" className="bg-purple-100 text-purple-700 text-xs">Opportunity</Badge>
                              <Badge variant="outline" className="text-xs">Timeline: Ongoing</Badge>
                            </div>
                            <Button variant="outline" size="sm">Explore Initiatives</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="final-matrix" className="space-y-4 mt-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Final Materiality Matrix</h3>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export Matrix
                    </Button>
                  </div>
                </div>

                <div className="p-3 bg-green-50 border border-green-200 rounded-lg mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span className="text-sm font-medium text-green-800">Complete Assessment</span>
                  </div>
                  <p className="text-xs text-green-700 mt-1">
                    Final materiality matrix with color-coded topics. Use the legend below to identify specific topics.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="relative w-full h-80 border rounded-lg bg-gradient-to-r from-red-50 via-yellow-50 to-green-50">
                    {/* Axis Labels */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-6 text-sm font-medium">
                      Business Impact →
                    </div>
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-6 -rotate-90 text-sm font-medium">
                      Stakeholder Importance →
                    </div>
                    
                    {/* Quadrant Lines */}
                    <div className="absolute w-full h-px bg-gray-300 top-1/2 transform -translate-y-1/2"></div>
                    <div className="absolute h-full w-px bg-gray-300 left-1/2 transform -translate-x-1/2"></div>
                    
                    {/* Quadrant Labels */}
                    <div className="absolute top-2 right-2 text-xs font-medium text-green-700 bg-white px-2 py-1 rounded shadow">High Priority</div>
                    <div className="absolute top-2 left-2 text-xs font-medium text-blue-700 bg-white px-2 py-1 rounded shadow">Monitor</div>
                    <div className="absolute bottom-2 right-2 text-xs font-medium text-yellow-700 bg-white px-2 py-1 rounded shadow">Consider</div>
                    <div className="absolute bottom-2 left-2 text-xs font-medium text-gray-700 bg-white px-2 py-1 rounded shadow">Low Priority</div>
                    
                    {/* Topics as dots */}
                    {Object.entries(assessmentData.materialityMatrix).map(([topicId, rating]) => {
                      const position = getTopicPosition(topicId)
                      const topic = esgTopics.find(t => t.id === topicId)
                      if (!position || !topic) return null
                      
                      const colors = getTopicColor(topicId)
                      
                      return (
                        <div
                          key={topicId}
                          className="absolute w-4 h-4 rounded-full transform -translate-x-1/2 -translate-y-1/2 border-2 border-white shadow"
                          style={{ 
                            left: `${position.x}%`, 
                            top: `${position.y}%`,
                            backgroundColor: colors.hsl
                          }}
                          title={`${topic.name} (${topic.category}): Stakeholder ${rating.stakeholderImportance}/5, Business ${rating.businessImpact}/10`}
                        />
                      )
                    })}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm mb-3">Material Topics Summary</h4>
                      <div className="space-y-3">
                        {[
                          { label: "High Priority (Both ≥4)", color: "green", topics: Object.entries(assessmentData.materialityMatrix).filter(([_, rating]) => rating.stakeholderImportance >= 4 && rating.businessImpact >= 7) },
                          { label: "Monitor (Stakeholder ≥4, Business <7)", color: "blue", topics: Object.entries(assessmentData.materialityMatrix).filter(([_, rating]) => rating.stakeholderImportance >= 4 && rating.businessImpact < 7) },
                          { label: "Consider (Business ≥7, Stakeholder <4)", color: "yellow", topics: Object.entries(assessmentData.materialityMatrix).filter(([_, rating]) => rating.stakeholderImportance < 4 && rating.businessImpact >= 7) }
                        ].map((category) => (
                          <div key={category.label}>
                            <div className="flex items-center space-x-2 mb-2">
                              <div className={`w-3 h-3 rounded-full ${
                                category.color === "green" ? "bg-green-600" :
                                category.color === "blue" ? "bg-blue-600" : "bg-yellow-600"
                              }`}></div>
                              <span className="text-xs font-medium">{category.label} ({category.topics.length})</span>
                            </div>
                            <div className="space-y-1 ml-5">
                              {category.topics.map(([topicId]) => {
                                const topic = esgTopics.find(t => t.id === topicId)
                                if (!topic) return null
                                const colors = getTopicColor(topicId)
                                return (
                                  <div key={topicId} className="flex items-center space-x-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.hsl }}></div>
                                    <span className="text-xs text-gray-600">{topic.name}</span>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Color Legend */}
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h5 className="text-xs font-medium text-gray-700 mb-2">ESG Topics Legend</h5>
                      <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                        {esgTopics.slice(0, 8).map((topic) => {
                          const colors = getTopicColor(topic.id)
                          return (
                            <div key={topic.id} className="flex items-center space-x-2">
                              <div className="w-2 h-2 rounded-full border border-gray-300" style={{ backgroundColor: colors.hsl }}></div>
                              <span className="text-xs text-gray-600 truncate">{topic.name}</span>
                            </div>
                          )
                        })}
                      </div>
                      {esgTopics.length > 8 && (
                        <div className="text-center mt-2">
                          <span className="text-xs text-gray-500">+ {esgTopics.length - 8} more topics with unique colors</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-between pt-4 border-t">
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Matrix
              </Button>
              <div className="flex space-x-3">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export Assessment Report
                </Button>
                <Button onClick={() => {
                  // Save materiality data to localStorage or state management
                  const materialityData = {
                    industryContext: {
                      industry: assessmentData.industry,
                      subIndustry: assessmentData.subIndustry,
                      regions: assessmentData.regions,
                      companySize: assessmentData.companySize
                    },
                    materialTopics: Object.entries(assessmentData.materialityMatrix)
                      .filter(([_, rating]) => rating.stakeholderImportance >= 4 || rating.businessImpact >= 7)
                      .map(([topicId, rating]) => {
                        const topic = esgTopics.find(t => t.id === topicId)
                        return {
                          id: topicId,
                          name: topic?.name || '',
                          category: topic?.category || '',
                          stakeholderImportance: rating.stakeholderImportance,
                          businessImpact: rating.businessImpact,
                          priority: rating.stakeholderImportance >= 4 && rating.businessImpact >= 7 ? 'high' : 
                                   rating.stakeholderImportance >= 4 ? 'monitor' : 'consider'
                        }
                      }),
                    assessmentMetadata: {
                      completedAt: new Date().toISOString(),
                      stakeholderInput: assessmentData.stakeholderInput,
                      customStakeholders: assessmentData.customStakeholders
                    }
                  }
                  
                  localStorage.setItem('materialityAssessmentData', JSON.stringify(materialityData))
                  router.push("/ai-engine/strategy-builder")
                }}>
                  Link to ESG Strategy Builder
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 