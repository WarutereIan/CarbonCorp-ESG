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
  Shield
} from "lucide-react"

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

export default function StrategyBuilderPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [materialityData, setMaterialityData] = useState<MaterialityData | null>(null)
  const [isGeneratingBlueprint, setIsGeneratingBlueprint] = useState(false)
  const [strategyScope, setStrategyScope] = useState({
    name: "",
    description: "",
    timeHorizon: "3-years",
    scope: "corporate-wide"
  })
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
            <h1 className="text-2xl font-bold tracking-tight">AI-Driven ESG Strategy Builder</h1>
            <p className="text-muted-foreground">
              Step {currentStep} of 5 - {getStepTitle()}
            </p>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span>{currentStep}/5 steps</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${(currentStep / 5) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Initiation</span>
          <span>AI Generation</span>
          <span>Refinement</span>
          <span>Planning</span>
          <span>Finalization</span>
        </div>
      </div>

      {/* Materiality Data Integration Banner */}
      {materialityData && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-green-800">Materiality Assessment Integrated</h4>
                <p className="text-sm text-green-700">
                  Loaded {materialityData.materialTopics.length} material topics from your assessment completed on{' '}
                  {new Date(materialityData.assessmentMetadata.completedAt).toLocaleDateString()}
                </p>
                <div className="flex space-x-2 mt-2">
                  {materialityData.materialTopics.filter(t => t.priority === 'high').length > 0 && (
                    <Badge variant="default" className="bg-green-100 text-green-700 text-xs">
                      {materialityData.materialTopics.filter(t => t.priority === 'high').length} High Priority Topics
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-xs">
                    {materialityData.industryContext.industry}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {materialityData.industryContext.regions.length} Regions
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 1: Strategy Initiation & Scoping */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Strategy Initiation & Scoping</span>
            </CardTitle>
            <CardDescription>
              Define your ESG strategy scope, timeframe, and key parameters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="strategy-name">Strategy Name *</Label>
                  <Input
                    id="strategy-name"
                    placeholder="e.g., Sustainable Future 2030"
                    value={strategyScope.name}
                    onChange={(e) => setStrategyScope({...strategyScope, name: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="time-horizon">Time Horizon *</Label>
                  <Select 
                    value={strategyScope.timeHorizon} 
                    onValueChange={(value) => setStrategyScope({...strategyScope, timeHorizon: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2-years">2 Years (2024-2026)</SelectItem>
                      <SelectItem value="3-years">3 Years (2024-2027)</SelectItem>
                      <SelectItem value="5-years">5 Years (2024-2029)</SelectItem>
                      <SelectItem value="10-years">10 Years (2024-2034)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="scope">Strategy Scope *</Label>
                  <Select 
                    value={strategyScope.scope} 
                    onValueChange={(value) => setStrategyScope({...strategyScope, scope: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="corporate-wide">Corporate-wide</SelectItem>
                      <SelectItem value="business-unit">Specific Business Unit</SelectItem>
                      <SelectItem value="thematic">Thematic (e.g., Net Zero)</SelectItem>
                      <SelectItem value="regional">Regional Focus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Strategy Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the overall vision and purpose of this ESG strategy..."
                  value={strategyScope.description}
                  onChange={(e) => setStrategyScope({...strategyScope, description: e.target.value})}
                  className="h-32"
                />
              </div>
            </div>

            {materialityData && (
              <div className="space-y-4">
                <Separator />
                <h4 className="font-medium">Material Topics Integration</h4>
                <p className="text-sm text-muted-foreground">
                  Your strategy will focus on the following material topics identified in your assessment:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-green-700 mb-2">High Priority ({materialityData.materialTopics.filter(t => t.priority === 'high').length})</h5>
                    <div className="space-y-1">
                      {materialityData.materialTopics.filter(t => t.priority === 'high').map((topic) => (
                        <div key={topic.id} className="text-xs p-2 bg-green-50 rounded border">
                          {topic.name}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-blue-700 mb-2">Monitor ({materialityData.materialTopics.filter(t => t.priority === 'monitor').length})</h5>
                    <div className="space-y-1">
                      {materialityData.materialTopics.filter(t => t.priority === 'monitor').slice(0, 3).map((topic) => (
                        <div key={topic.id} className="text-xs p-2 bg-blue-50 rounded border">
                          {topic.name}
                        </div>
                      ))}
                      {materialityData.materialTopics.filter(t => t.priority === 'monitor').length > 3 && (
                        <div className="text-xs text-gray-500">
                          +{materialityData.materialTopics.filter(t => t.priority === 'monitor').length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-yellow-700 mb-2">Consider ({materialityData.materialTopics.filter(t => t.priority === 'consider').length})</h5>
                    <div className="space-y-1">
                      {materialityData.materialTopics.filter(t => t.priority === 'consider').slice(0, 3).map((topic) => (
                        <div key={topic.id} className="text-xs p-2 bg-yellow-50 rounded border">
                          {topic.name}
                        </div>
                      ))}
                      {materialityData.materialTopics.filter(t => t.priority === 'consider').length > 3 && (
                        <div className="text-xs text-gray-500">
                          +{materialityData.materialTopics.filter(t => t.priority === 'consider').length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Materiality
              </Button>
              <Button 
                onClick={handleNext} 
                disabled={!strategyScope.name || !strategyScope.timeHorizon}
              >
                Proceed to AI Generation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: AI Blueprint Generation */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5" />
              <span>AI-Powered Strategy Blueprint</span>
            </CardTitle>
            <CardDescription>
              Generate a comprehensive ESG strategy blueprint using AI analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">AI Analysis Overview</h4>
              <p className="text-sm text-blue-700 mb-3">
                Our AI will analyze your materiality assessment, industry benchmarks, and best practices to generate:
              </p>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Strategic pillars aligned with your material topics</li>
                <li>• SMART objectives for each pillar</li>
                <li>• Recommended initiatives and action plans</li>
                <li>• KPIs for tracking progress</li>
                <li>• Resource estimates and timelines</li>
              </ul>
            </div>

            {isGeneratingBlueprint && (
              <div className="p-4 bg-gray-50 border rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <Brain className="h-5 w-5 text-blue-600 animate-pulse" />
                  <span className="font-medium">Generating Strategy Blueprint...</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                </div>
                <div className="text-xs text-gray-600 space-y-1">
                  <div>✓ Analyzing material topics and priorities</div>
                  <div>✓ Benchmarking against industry best practices</div>
                  <div className="animate-pulse">⏳ Generating strategic pillars and objectives</div>
                  <div className="text-gray-400">⏳ Creating implementation roadmap</div>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button 
                onClick={generateAIBlueprint} 
                disabled={isGeneratingBlueprint}
              >
                {isGeneratingBlueprint ? (
                  <>
                    <Brain className="mr-2 h-4 w-4 animate-pulse" />
                    Generating Blueprint...
                  </>
                ) : (
                  <>
                    Generate AI Strategy Blueprint
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Strategy Canvas & Refinement */}
      {currentStep === 3 && strategicPillars.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Edit className="h-5 w-5" />
              <span>Strategy Canvas & Refinement</span>
            </CardTitle>
            <CardDescription>
              Review and refine your AI-generated strategy blueprint
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-800">Blueprint Generated Successfully</span>
              </div>
              <p className="text-sm text-green-700">
                AI has created {strategicPillars.length} strategic pillars with {strategicPillars.reduce((acc, p) => acc + p.objectives.length, 0)} objectives 
                and {strategicPillars.reduce((acc, p) => acc + p.objectives.reduce((objAcc, o) => objAcc + o.initiatives.length, 0), 0)} initiatives.
              </p>
            </div>

            <div className="space-y-6">
              {strategicPillars.map((pillar, pillarIndex) => (
                <Card key={pillar.id} className="border-l-4 border-l-blue-500">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span>{pillar.name}</span>
                      <Badge variant="outline">
                        {pillar.relatedTopics.length} Material Topics
                      </Badge>
                    </CardTitle>
                    <CardDescription>{pillar.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {pillar.objectives.map((objective, objIndex) => (
                        <div key={objective.id} className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium">{objective.name}</h4>
                            <Badge variant="outline" className="text-xs">
                              {objective.timeframe}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{objective.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h5 className="text-xs font-medium text-gray-700 mb-2">Key Performance Indicators</h5>
                              <div className="space-y-1">
                                {objective.kpis.map((kpi, kpiIndex) => (
                                  <div key={kpiIndex} className="text-xs p-2 bg-blue-50 rounded">
                                    {kpi}
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h5 className="text-xs font-medium text-gray-700 mb-2">Strategic Initiatives</h5>
                              <div className="space-y-1">
                                {objective.initiatives.map((initiative, initIndex) => (
                                  <div key={initiative.id} className="text-xs p-2 bg-yellow-50 rounded border-l-2 border-l-yellow-400">
                                    <div className="font-medium">{initiative.name}</div>
                                    <div className="text-gray-600">{initiative.timeline} • {initiative.budget}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button onClick={handleNext}>
                Proceed to Implementation Planning
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Steps 4 and 5 placeholders */}
      {(currentStep === 4 || currentStep === 5) && (
        <Card>
          <CardHeader>
            <CardTitle>{getStepTitle()}</CardTitle>
            <CardDescription>
              {currentStep === 4 ? "Convert initiatives to actionable projects and assign resources" : "Finalize strategy and prepare for deployment"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-8 text-center border-2 border-dashed border-gray-300 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                {currentStep === 4 ? <Users className="h-6 w-6 text-blue-600" /> : <Save className="h-6 w-6 text-blue-600" />}
              </div>
              <h3 className="font-medium mb-2">Coming Next</h3>
              <p className="text-sm text-gray-600 mb-4">
                {currentStep === 4 ? 
                  "Implementation planning tools for project breakdown, resource allocation, and timeline management." :
                  "Strategy finalization with export options, approval workflows, and integration with other platform modules."
                }
              </p>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              {currentStep === 4 && (
                <Button onClick={handleNext}>
                  Proceed to Finalization
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
              {currentStep === 5 && (
                <div className="space-x-2">
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export Strategy
                  </Button>
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Save & Deploy
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 