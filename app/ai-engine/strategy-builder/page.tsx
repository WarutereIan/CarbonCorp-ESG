"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  ArrowLeft, 
  ArrowRight, 
  Brain, 
  Target, 
  Lightbulb, 
  CheckCircle, 
  Plus,
  Edit,
  Trash2,
  Save,
  Download,
  Users,
  TrendingUp,
  Shield,
  Settings,
  Share2,
  Clock
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Import modular components
import { StrategyInitiationWizard } from "./components/strategy-initiation-wizard"
import { AIBlueprintGenerator } from "./components/ai-blueprint-generator"
import { StrategyCanvas } from "./components/strategy-canvas"

// Import types
import { StrategyScope, StrategyBlueprint } from "./types/strategy-types"

interface MaterialityData {
  industryContext: {
    industry: string
    subIndustry: string
    regions: string[]
    companySize: string
  }
  materialTopics: Array<{
    id: string
    name: string
    category: string
    stakeholderImportance: number
    businessImpact: number
    priority: 'high' | 'monitor' | 'consider'
  }>
  assessmentMetadata: {
    completedAt: string
    stakeholderInput: any
    customStakeholders: any[]
  }
}

interface StrategicPillar {
  id: string
  name: string
  description: string
  relatedTopics: string[]
  objectives: StrategicObjective[]
}

interface StrategicObjective {
  id: string
  name: string
  description: string
  timeframe: string
  kpis: string[]
  initiatives: StrategicInitiative[]
}

interface StrategicInitiative {
  id: string
  name: string
  description: string
  owner: string
  timeline: string
  budget: string
  status: 'not-started' | 'planning' | 'in-progress' | 'completed'
}

interface StrategyBuilderStep {
  id: string
  title: string
  description: string
  icon: any
  status: 'not-started' | 'in-progress' | 'completed'
}

export default function StrategyBuilderPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [materialityData, setMaterialityData] = useState<MaterialityData | null>(null)
  const [isGeneratingBlueprint, setIsGeneratingBlueprint] = useState(false)
  const [strategyScope, setStrategyScope] = useState<StrategyScope | null>(null)
  const [blueprint, setBlueprint] = useState<StrategyBlueprint | null>(null)
  const [finalStrategy, setFinalStrategy] = useState<StrategyBlueprint | null>(null)
  const [strategicPillars, setStrategicPillars] = useState<StrategicPillar[]>([])

  useEffect(() => {
    // Load materiality data from localStorage
    const savedData = localStorage.getItem('materialityAssessmentData')
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setMaterialityData(parsedData)
      } catch (error) {
        console.error('Error parsing materiality data:', error)
      }
    }
  }, [])

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      router.push("/ai-engine/materiality")
    }
  }

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const generateAIBlueprint = async () => {
    setIsGeneratingBlueprint(true)
    
    // Simulate AI blueprint generation
    setTimeout(() => {
      if (materialityData) {
        const highPriorityTopics = materialityData.materialTopics.filter(t => t.priority === 'high')
        const environmentalTopics = materialityData.materialTopics.filter(t => t.category === 'Environmental')
        const socialTopics = materialityData.materialTopics.filter(t => t.category === 'Social')
        const governanceTopics = materialityData.materialTopics.filter(t => t.category === 'Governance')

        const aiGeneratedPillars: StrategicPillar[] = []

        // Environmental Pillar
        if (environmentalTopics.length > 0) {
          aiGeneratedPillars.push({
            id: 'env-pillar',
            name: 'Environmental Stewardship',
            description: 'Drive environmental sustainability through emissions reduction, resource efficiency, and circular economy practices.',
            relatedTopics: environmentalTopics.map(t => t.id),
            objectives: [
              {
                id: 'env-obj-1',
                name: 'Carbon Neutrality Pathway',
                description: 'Achieve net-zero emissions across operations by 2030',
                timeframe: '2024-2030',
                kpis: ['Scope 1 & 2 Emissions (tCO2e)', 'Renewable Energy %', 'Energy Intensity'],
                initiatives: [
                  {
                    id: 'env-init-1',
                    name: 'Energy Efficiency Program',
                    description: 'Implement energy efficiency measures across all facilities',
                    owner: 'Operations Team',
                    timeline: '6 months',
                    budget: '$500K - $1M',
                    status: 'not-started'
                  }
                ]
              }
            ]
          })
        }

        // Social Pillar
        if (socialTopics.length > 0) {
          aiGeneratedPillars.push({
            id: 'social-pillar',
            name: 'People & Community',
            description: 'Foster inclusive workplaces, ensure employee wellbeing, and strengthen community relationships.',
            relatedTopics: socialTopics.map(t => t.id),
            objectives: [
              {
                id: 'social-obj-1',
                name: 'Diversity & Inclusion Excellence',
                description: 'Build diverse, inclusive workplace culture with measurable outcomes',
                timeframe: '2024-2026',
                kpis: ['Gender Diversity %', 'Employee Engagement Score', 'Retention Rate'],
                initiatives: [
                  {
                    id: 'social-init-1',
                    name: 'D&I Training Program',
                    description: 'Comprehensive diversity and inclusion training for all employees',
                    owner: 'HR Team',
                    timeline: '3 months',
                    budget: '$100K - $250K',
                    status: 'not-started'
                  }
                ]
              }
            ]
          })
        }

        // Governance Pillar
        if (governanceTopics.length > 0) {
          aiGeneratedPillars.push({
            id: 'governance-pillar',
            name: 'Ethical Leadership',
            description: 'Maintain highest standards of corporate governance, ethics, and transparency.',
            relatedTopics: governanceTopics.map(t => t.id),
            objectives: [
              {
                id: 'gov-obj-1',
                name: 'ESG Governance Framework',
                description: 'Establish comprehensive ESG governance and oversight mechanisms',
                timeframe: '2024-2025',
                kpis: ['ESG Training Completion %', 'Ethics Violations (count)', 'Board Diversity %'],
                initiatives: [
                  {
                    id: 'gov-init-1',
                    name: 'ESG Committee Formation',
                    description: 'Establish board-level ESG committee with clear mandates',
                    owner: 'Executive Team',
                    timeline: '2 months',
                    budget: '$50K - $100K',
                    status: 'not-started'
                  }
                ]
              }
            ]
          })
        }

        setStrategicPillars(aiGeneratedPillars)
      }
      setIsGeneratingBlueprint(false)
      setCurrentStep(3) // Move to blueprint review step
    }, 3000)
  }

  const handleInitiationComplete = (scope: StrategyScope) => {
    setStrategyScope(scope)
    setCurrentStep(2)
  }

  const handleBlueprintGenerated = (generatedBlueprint: StrategyBlueprint) => {
    setBlueprint(generatedBlueprint)
    setCurrentStep(3)
  }

  const handleStrategySaved = (updatedBlueprint: StrategyBlueprint) => {
    setFinalStrategy(updatedBlueprint)
    // Here you would typically save to database/API
    console.log('Strategy saved:', updatedBlueprint)
  }

  const handleBackToStep = (step: number) => {
    setCurrentStep(step)
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Strategy Initiation & Scoping"
      case 2: return "AI Blueprint Generation"
      case 3: return "Strategy Canvas & Refinement"
      case 4: return "Implementation Planning"
      case 5: return "Strategy Finalization"
      default: return "ESG Strategy Builder"
    }
  }

  const steps: StrategyBuilderStep[] = [
    {
      id: 'initiation',
      title: 'Strategy Initiation',
      description: 'Define scope, link materiality assessment, and complete AI questionnaire',
      icon: Target,
      status: currentStep > 1 ? 'completed' : currentStep === 1 ? 'in-progress' : 'not-started'
    },
    {
      id: 'generation',
      title: 'AI Blueprint Generation',
      description: 'Generate comprehensive strategy blueprint using AI analysis',
      icon: Brain,
      status: currentStep > 2 ? 'completed' : currentStep === 2 ? 'in-progress' : 'not-started'
    },
    {
      id: 'canvas',
      title: 'Strategy Canvas',
      description: 'Refine and optimize strategy with interactive editing and AI guidance',
      icon: Lightbulb,
      status: currentStep > 3 ? 'completed' : currentStep === 3 ? 'in-progress' : 'not-started'
    }
  ]

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <StrategyInitiationWizard
            onComplete={handleInitiationComplete}
            initialData={strategyScope || {}}
          />
        )
      
      case 2:
        if (!strategyScope) {
          setCurrentStep(1)
          return null
        }
        return (
          <AIBlueprintGenerator
            scope={strategyScope}
            onBlueprintGenerated={handleBlueprintGenerated}
            onBack={() => setCurrentStep(1)}
          />
        )
      
      case 3:
        if (!blueprint) {
          setCurrentStep(2)
          return null
        }
        return (
          <StrategyCanvas
            blueprint={blueprint}
            onSave={handleStrategySaved}
            onBack={() => setCurrentStep(2)}
          />
        )
      
      default:
        return null
    }
  }

  const getStepIcon = (step: StrategyBuilderStep) => {
    const IconComponent = step.icon
    const baseClasses = "h-5 w-5"
    
    switch (step.status) {
      case 'completed':
        return <CheckCircle className={`${baseClasses} text-green-600`} />
      case 'in-progress':
        return <IconComponent className={`${baseClasses} text-blue-600`} />
      default:
        return <IconComponent className={`${baseClasses} text-gray-400`} />
    }
  }

  const getStepStatus = (step: StrategyBuilderStep) => {
    switch (step.status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800">Completed</Badge>
      case 'in-progress':
        return <Badge variant="default">In Progress</Badge>
      default:
        return <Badge variant="secondary">Not Started</Badge>
    }
  }

  // Show full-screen canvas view when in step 3
  if (currentStep === 3) {
    return renderStepContent()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => window.history.back()}
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to AI Engine
              </Button>
              
              <div>
                <h1 className="text-xl font-semibold text-gray-900">AI-Driven ESG Strategy Builder</h1>
                <p className="text-sm text-gray-500">
                  Create comprehensive ESG strategies with AI-powered insights
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {finalStrategy && (
                <>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </>
              )}
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <Card 
                key={step.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  step.status === 'in-progress' ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => {
                  if (step.status === 'completed' || index < currentStep) {
                    handleBackToStep(index + 1)
                  }
                }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getStepIcon(step)}
                      <div>
                        <CardTitle className="text-base">{step.title}</CardTitle>
                        <div className="text-xs text-gray-500 mt-1">Step {index + 1}</div>
                      </div>
                    </div>
                    {getStepStatus(step)}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-sm">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Current Step Content */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6">
            {renderStepContent()}
          </div>
        </div>

        {/* Strategy Summary (if completed) */}
        {finalStrategy && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Strategy Completed
                </CardTitle>
                <CardDescription>
                  Your ESG strategy has been successfully created and saved.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {finalStrategy.strategicPillars.length}
                    </div>
                    <div className="text-sm text-gray-500">Strategic Pillars</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {finalStrategy.strategicPillars.reduce((acc, pillar) => 
                        acc + pillar.objectives.length, 0
                      )}
                    </div>
                    <div className="text-sm text-gray-500">Strategic Objectives</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {finalStrategy.strategicPillars.reduce((acc, pillar) => 
                        acc + pillar.objectives.reduce((objAcc, obj) => 
                          objAcc + obj.initiatives.length, 0
                        ), 0
                      )}
                    </div>
                    <div className="text-sm text-gray-500">Initiatives</div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h4 className="font-medium">Next Steps:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-start gap-3">
                      <Users className="h-4 w-4 text-blue-600 mt-0.5" />
                      <div>
                        <div className="font-medium">Set up collaboration workspace</div>
                        <div className="text-gray-500">Assign initiatives to team members and track progress</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Clock className="h-4 w-4 text-blue-600 mt-0.5" />
                      <div>
                        <div className="font-medium">Begin implementation tracking</div>
                        <div className="text-gray-500">Set up KPI monitoring and milestone tracking</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <Button>
                    <Users className="h-4 w-4 mr-2" />
                    Launch Collaboration
                  </Button>
                  <Button variant="outline">
                    <Save className="h-4 w-4 mr-2" />
                    Save as Template
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
} 