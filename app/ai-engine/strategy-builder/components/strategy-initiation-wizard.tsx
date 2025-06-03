import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Target, 
  Brain, 
  Users, 
  TrendingUp, 
  Shield,
  Building,
  Globe,
  Calendar,
  ChevronRight,
  Lightbulb,
  AlertTriangle,
  CheckCircle
} from "lucide-react"

interface MaterialityAssessment {
  id: string
  name: string
  completedAt: string
  materialTopics: Array<{
    id: string
    name: string
    category: string
    priority: 'high' | 'medium' | 'low'
    stakeholderImportance: number
    businessImpact: number
  }>
  industryContext: {
    industry: string
    subIndustry: string
    regions: string[]
    companySize: string
  }
}

interface StrategyScope {
  name: string
  description: string
  timeHorizon: string
  scope: string
  linkedMaterialityAssessment?: string
  strategicThemes: string[]
  businessPriorities: string[]
  stakeholderPressures: string[]
  existingCommitments: string[]
  resourceCapacity: string
  regulatoryDrivers: string[]
}

interface StrategyInitiationWizardProps {
  onComplete: (scope: StrategyScope) => void
  onBack?: () => void
  initialData?: Partial<StrategyScope>
}

interface AIQuestionnaire {
  businessObjectives: string
  regulatoryDrivers: string
  budgetCapacity: string
  timelineConstraints: string
  stakeholderPriorities: string
  currentInitiatives: string
  keyChallengees: string
  successMetrics: string
}

export function StrategyInitiationWizard({ onComplete, onBack, initialData = {} }: StrategyInitiationWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [strategyScope, setStrategyScope] = useState<StrategyScope>({
    name: initialData.name || "",
    description: initialData.description || "",
    timeHorizon: initialData.timeHorizon || "3-years",
    scope: initialData.scope || "corporate-wide",
    linkedMaterialityAssessment: initialData.linkedMaterialityAssessment || "",
    strategicThemes: initialData.strategicThemes || [],
    businessPriorities: initialData.businessPriorities || [],
    stakeholderPressures: initialData.stakeholderPressures || [],
    existingCommitments: initialData.existingCommitments || [],
    resourceCapacity: initialData.resourceCapacity || "",
    regulatoryDrivers: initialData.regulatoryDrivers || []
  })

  const [aiQuestionnaire, setAiQuestionnaire] = useState<AIQuestionnaire>({
    businessObjectives: "",
    regulatoryDrivers: "",
    budgetCapacity: "",
    timelineConstraints: "",
    stakeholderPriorities: "",
    currentInitiatives: "",
    keyChallengees: "",
    successMetrics: ""
  })

  const [availableMaterialityAssessments, setAvailableMaterialityAssessments] = useState<MaterialityAssessment[]>([])
  const [selectedMaterialityData, setSelectedMaterialityData] = useState<MaterialityAssessment | null>(null)
  const [isLoadingMateriality, setIsLoadingMateriality] = useState(false)

  // Initialize mock materiality assessments
  useEffect(() => {
    initializeMockMaterialityData()
  }, [])

  const initializeMockMaterialityData = () => {
    const mockAssessments: MaterialityAssessment[] = [
      {
        id: 'mat-assessment-2024-1',
        name: 'Q1 2024 Materiality Assessment',
        completedAt: '2024-03-15',
        materialTopics: [
          {
            id: 'topic-climate',
            name: 'Climate Change Mitigation',
            category: 'Environmental',
            priority: 'high',
            stakeholderImportance: 9.2,
            businessImpact: 8.8
          },
          {
            id: 'topic-diversity',
            name: 'Diversity & Inclusion',
            category: 'Social',
            priority: 'high',
            stakeholderImportance: 8.5,
            businessImpact: 8.2
          },
          {
            id: 'topic-governance',
            name: 'Corporate Governance',
            category: 'Governance',
            priority: 'high',
            stakeholderImportance: 8.7,
            businessImpact: 9.1
          },
          {
            id: 'topic-water',
            name: 'Water Stewardship',
            category: 'Environmental',
            priority: 'medium',
            stakeholderImportance: 7.8,
            businessImpact: 7.2
          }
        ],
        industryContext: {
          industry: 'Manufacturing',
          subIndustry: 'Consumer Electronics',
          regions: ['North America', 'EMEA', 'APAC'],
          companySize: 'Large (1000+ employees)'
        }
      }
    ]
    setAvailableMaterialityAssessments(mockAssessments)
  }

  const handleMaterialitySelection = (assessmentId: string) => {
    setIsLoadingMateriality(true)
    const selected = availableMaterialityAssessments.find(a => a.id === assessmentId)
    
    setTimeout(() => {
      if (selected) {
        setSelectedMaterialityData(selected)
        setStrategyScope(prev => ({
          ...prev,
          linkedMaterialityAssessment: assessmentId,
          strategicThemes: selected.materialTopics
            .filter(t => t.priority === 'high')
            .map(t => t.name)
        }))
      }
      setIsLoadingMateriality(false)
    }, 1000)
  }

  const handleScopeUpdate = (field: keyof StrategyScope, value: any) => {
    setStrategyScope(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleQuestionnaireUpdate = (field: keyof AIQuestionnaire, value: string) => {
    setAiQuestionnaire(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const addArrayItem = (field: keyof StrategyScope, value: string) => {
    if (value.trim()) {
      setStrategyScope(prev => ({
        ...prev,
        [field]: [...(prev[field] as string[]), value.trim()]
      }))
    }
  }

  const removeArrayItem = (field: keyof StrategyScope, index: number) => {
    setStrategyScope(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index)
    }))
  }

  const canProceedStep = (step: number) => {
    switch (step) {
      case 1:
        return strategyScope.name && strategyScope.description && strategyScope.timeHorizon && strategyScope.scope
      case 2:
        return strategyScope.linkedMaterialityAssessment || strategyScope.strategicThemes.length > 0
      case 3:
        return Object.values(aiQuestionnaire).some(value => value.trim().length > 0)
      default:
        return true
    }
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete the wizard
      onComplete({
        ...strategyScope,
        // Include AI questionnaire responses in strategy metadata
        businessPriorities: [
          ...strategyScope.businessPriorities,
          ...(aiQuestionnaire.businessObjectives ? [aiQuestionnaire.businessObjectives] : [])
        ],
        regulatoryDrivers: [
          ...strategyScope.regulatoryDrivers,
          ...(aiQuestionnaire.regulatoryDrivers ? [aiQuestionnaire.regulatoryDrivers] : [])
        ]
      })
    }
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Target className="h-12 w-12 mx-auto text-blue-600 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Define Strategy Scope</h2>
        <p className="text-muted-foreground">
          Let's start by defining the basic parameters and scope of your ESG strategy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="strategy-name">Strategy Name *</Label>
            <Input
              id="strategy-name"
              placeholder="e.g., Net Zero Transition Strategy 2024-2027"
              value={strategyScope.name}
              onChange={(e) => handleScopeUpdate('name', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="time-horizon">Time Horizon *</Label>
            <Select value={strategyScope.timeHorizon} onValueChange={(value) => handleScopeUpdate('timeHorizon', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select time horizon" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-year">Short-term (1 year)</SelectItem>
                <SelectItem value="3-years">Medium-term (3 years)</SelectItem>
                <SelectItem value="5-years">Long-term (5 years)</SelectItem>
                <SelectItem value="10-years">Extended (10+ years)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="scope">Strategy Scope *</Label>
            <Select value={strategyScope.scope} onValueChange={(value) => handleScopeUpdate('scope', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select scope" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="corporate-wide">Corporate-wide</SelectItem>
                <SelectItem value="business-unit">Specific Business Unit</SelectItem>
                <SelectItem value="thematic">Thematic (e.g., Net Zero)</SelectItem>
                <SelectItem value="regional">Regional Focus</SelectItem>
                <SelectItem value="product-line">Product Line Specific</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="description">Strategy Description *</Label>
          <Textarea
            id="description"
            placeholder="Describe the purpose, vision, and key focus areas of this ESG strategy..."
            rows={8}
            value={strategyScope.description}
            onChange={(e) => handleScopeUpdate('description', e.target.value)}
          />
        </div>
      </div>

      {strategyScope.scope !== 'corporate-wide' && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            You've selected a focused scope. Make sure to clearly define the boundaries and stakeholders 
            relevant to this specific strategy in the description above.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Brain className="h-12 w-12 mx-auto text-green-600 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Link Materiality Assessment</h2>
        <p className="text-muted-foreground">
          Connect your strategy to materiality assessment results or define strategic themes manually.
        </p>
      </div>

      {/* Materiality Assessment Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Use Existing Materiality Assessment
          </CardTitle>
          <CardDescription>
            Link to a completed materiality assessment to automatically prioritize ESG topics
          </CardDescription>
        </CardHeader>
        <CardContent>
          {availableMaterialityAssessments.length > 0 ? (
            <div className="space-y-4">
              <Label>Available Materiality Assessments</Label>
              <Select 
                value={strategyScope.linkedMaterialityAssessment} 
                onValueChange={handleMaterialitySelection}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an assessment" />
                </SelectTrigger>
                <SelectContent>
                  {availableMaterialityAssessments.map(assessment => (
                    <SelectItem key={assessment.id} value={assessment.id}>
                      {assessment.name} (Completed: {new Date(assessment.completedAt).toLocaleDateString()})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedMaterialityData && (
                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Assessment Overview</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Industry:</span>
                      <p>{selectedMaterialityData.industryContext.industry}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Regions:</span>
                      <p>{selectedMaterialityData.industryContext.regions.join(', ')}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="text-muted-foreground">High Priority Topics:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedMaterialityData.materialTopics
                        .filter(t => t.priority === 'high')
                        .map(topic => (
                          <Badge key={topic.id} variant="default">
                            {topic.name}
                          </Badge>
                        ))
                      }
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                No completed materiality assessments found. You can{" "}
                <Button variant="link" className="p-0 h-auto" onClick={() => window.open('/ai-engine/materiality', '_blank')}>
                  conduct a materiality assessment
                </Button>{" "}
                or manually define strategic themes below.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Separator className="my-6" />

      {/* Manual Strategic Themes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Strategic Themes
          </CardTitle>
          <CardDescription>
            {strategyScope.linkedMaterialityAssessment 
              ? "Themes from your materiality assessment (you can add more)" 
              : "Define the key ESG themes this strategy will address"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {strategyScope.strategicThemes.map((theme, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1">
                  {theme}
                  <button
                    className="ml-2 text-xs"
                    onClick={() => removeArrayItem('strategicThemes', index)}
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input
                placeholder="Add strategic theme (e.g., Climate Action, Circular Economy)"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addArrayItem('strategicThemes', e.currentTarget.value)
                    e.currentTarget.value = ''
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={(e) => {
                  const input = e.currentTarget.previousElementSibling as HTMLInputElement
                  addArrayItem('strategicThemes', input.value)
                  input.value = ''
                }}
              >
                Add
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Users className="h-12 w-12 mx-auto text-purple-600 mb-4" />
        <h2 className="text-2xl font-bold mb-2">AI Strategy Questionnaire</h2>
        <p className="text-muted-foreground">
          Help our AI understand your context to generate a more relevant strategy blueprint.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Business Context</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="business-objectives">Top 3 Business Objectives (Next 3 Years)</Label>
              <Textarea
                id="business-objectives"
                placeholder="e.g., Expand into new markets, improve operational efficiency, enhance brand reputation..."
                rows={3}
                value={aiQuestionnaire.businessObjectives}
                onChange={(e) => handleQuestionnaireUpdate('businessObjectives', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="budget-capacity">Budget/Resource Capacity</Label>
              <Textarea
                id="budget-capacity"
                placeholder="e.g., $1-5M annually, dedicated ESG team of 3 FTEs, external consultant budget..."
                rows={3}
                value={aiQuestionnaire.budgetCapacity}
                onChange={(e) => handleQuestionnaireUpdate('budgetCapacity', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">External Drivers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="regulatory-drivers">Key Regulatory Drivers</Label>
              <Textarea
                id="regulatory-drivers"
                placeholder="e.g., CSRD compliance required by 2025, upcoming carbon tax, SEC climate disclosures..."
                rows={3}
                value={aiQuestionnaire.regulatoryDrivers}
                onChange={(e) => handleQuestionnaireUpdate('regulatoryDrivers', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="stakeholder-priorities">Primary Stakeholder Pressures</Label>
              <Textarea
                id="stakeholder-priorities"
                placeholder="e.g., Investor focus on Net Zero, customer demand for sustainable products, employee expectations..."
                rows={3}
                value={aiQuestionnaire.stakeholderPriorities}
                onChange={(e) => handleQuestionnaireUpdate('stakeholderPriorities', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Current State</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="current-initiatives">Existing ESG Initiatives</Label>
              <Textarea
                id="current-initiatives"
                placeholder="e.g., Solar panel installation project, diversity hiring program, supplier code of conduct..."
                rows={3}
                value={aiQuestionnaire.currentInitiatives}
                onChange={(e) => handleQuestionnaireUpdate('currentInitiatives', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="key-challenges">Key Challenges/Barriers</Label>
              <Textarea
                id="key-challenges"
                placeholder="e.g., Limited data collection capabilities, lack of ESG expertise, budget constraints..."
                rows={3}
                value={aiQuestionnaire.keyChallengees}
                onChange={(e) => handleQuestionnaireUpdate('keyChallengees', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Success Definition</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="success-metrics">How Will You Measure Success?</Label>
              <Textarea
                id="success-metrics"
                placeholder="e.g., 50% emissions reduction, top-quartile ESG ratings, zero waste to landfill, 95% employee satisfaction..."
                rows={3}
                value={aiQuestionnaire.successMetrics}
                onChange={(e) => handleQuestionnaireUpdate('successMetrics', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="timeline-constraints">Timeline Constraints</Label>
              <Textarea
                id="timeline-constraints"
                placeholder="e.g., Board presentation in Q2, compliance deadline by 2025, annual reporting cycle..."
                rows={3}
                value={aiQuestionnaire.timelineConstraints}
                onChange={(e) => handleQuestionnaireUpdate('timelineConstraints', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Alert>
        <Brain className="h-4 w-4" />
        <AlertDescription>
          The more context you provide, the more tailored and relevant your AI-generated strategy blueprint will be. 
          You can skip questions that don't apply to your organization.
        </AlertDescription>
      </Alert>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-8 mb-8">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center border-2 font-medium
              ${currentStep >= step 
                ? 'bg-blue-600 border-blue-600 text-white' 
                : 'border-gray-300 text-gray-500'
              }
            `}>
              {step}
            </div>
            {step < 3 && (
              <ChevronRight className={`
                ml-2 h-4 w-4 
                ${currentStep > step ? 'text-blue-600' : 'text-gray-300'}
              `} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card>
        <CardContent className="p-6">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={currentStep === 1 ? onBack : () => setCurrentStep(currentStep - 1)}>
          Back
        </Button>
        <Button 
          onClick={handleNext}
          disabled={!canProceedStep(currentStep) || isLoadingMateriality}
        >
          {currentStep === 3 ? 'Generate AI Blueprint' : 'Next'}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
} 