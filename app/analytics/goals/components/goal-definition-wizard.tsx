"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Target, 
  Brain, 
  Plus,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Lightbulb,
  Users,
  Calendar,
  TrendingUp,
  AlertTriangle,
  Info,
  Star,
  Link,
  Zap
} from "lucide-react"

import type { ESGGoal, GoalTemplate } from "../types/goal-types"

interface GoalDefinitionWizardProps {
  onGoalCreated: (goal: ESGGoal) => void
  onCancel: () => void
  initialData?: Partial<ESGGoal>
  materalityTopics?: Array<{
    id: string
    name: string
    category: string
    priority: 'high' | 'medium' | 'low'
  }>
  strategicThemes?: Array<{
    id: string
    name: string
    description: string
  }>
}

interface AIRecommendation {
  id: string
  type: 'goal-suggestion' | 'kpi-suggestion' | 'target-suggestion' | 'timeline-suggestion'
  confidence: number
  title: string
  description: string
  rationale: string
  data: any
  category?: string
}

export function GoalDefinitionWizard({ 
  onGoalCreated, 
  onCancel, 
  initialData = {}, 
  materalityTopics = [],
  strategicThemes = []
}: GoalDefinitionWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [goalData, setGoalData] = useState<Partial<ESGGoal>>({
    category: 'environmental',
    goalType: 'absolute',
    status: 'draft',
    priority: 'medium',
    reviewFrequency: 'quarterly',
    materialityTopics: [],
    linkedKPIs: [],
    linkedInitiatives: [],
    regulatoryFrameworks: [],
    stakeholders: [],
    tags: [],
    ...initialData
  })
  
  const [aiRecommendations, setAIRecommendations] = useState<AIRecommendation[]>([])
  const [isGeneratingRecommendations, setIsGeneratingRecommendations] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<GoalTemplate | null>(null)
  const [availableTemplates, setAvailableTemplates] = useState<GoalTemplate[]>([])
  const [smartCritique, setSMARTCritique] = useState<any>(null)

  useEffect(() => {
    loadGoalTemplates()
  }, [goalData.category])

  useEffect(() => {
    if (currentStep === 3 && goalData.name && goalData.description) {
      generateAIRecommendations()
    }
  }, [currentStep, goalData.name, goalData.description])

  const loadGoalTemplates = async () => {
    // Mock goal templates based on category
    const templates: GoalTemplate[] = []
    
    if (goalData.category === 'environmental') {
      templates.push(
        {
          id: 'env-1',
          name: 'GHG Emissions Reduction',
          description: 'Comprehensive greenhouse gas emissions reduction goal',
          category: 'environmental',
          template: {
            goalStructure: {
              name: 'Reduce Scope 1 & 2 Emissions by 50% by 2030',
              description: 'Achieve significant reduction in operational emissions through energy efficiency and renewable energy adoption',
              specific: 'Reduce absolute Scope 1 and 2 greenhouse gas emissions',
              measurable: '50% reduction from 2023 baseline (X tCO2e to Y tCO2e)',
              achievable: 'Based on industry benchmarks and available technologies',
              relevant: 'Aligns with Paris Agreement and stakeholder expectations',
              timeBound: 'Target achievement by December 31, 2030',
              goalType: 'percentage-reduction'
            },
            suggestedKPIs: [
              { name: 'Total Scope 1 Emissions', unit: 'tCO2e' },
              { name: 'Total Scope 2 Emissions', unit: 'tCO2e' },
              { name: 'Emissions Intensity', unit: 'tCO2e/revenue' }
            ],
            implementationGuidance: [
              'Establish baseline emissions inventory',
              'Implement energy management system',
              'Invest in renewable energy sources',
              'Monitor progress monthly'
            ],
            bestPractices: [
              'Science-based target setting',
              'Third-party verification',
              'Stakeholder engagement',
              'Regular reporting'
            ]
          },
          benchmarkData: {
            industryAverage: 30,
            bestInClass: 50,
            peerComparison: []
          },
          usageCount: 245,
          rating: 4.7,
          tags: ['climate', 'emissions', 'scope-1-2'],
          createdBy: 'CarbonCorp',
          isPublic: true
        },
        {
          id: 'env-2',
          name: 'Water Use Efficiency',
          description: 'Improve water use efficiency and reduce consumption',
          category: 'environmental',
          template: {
            goalStructure: {
              name: 'Improve Water Use Efficiency by 25% by 2027',
              description: 'Enhance water stewardship through efficiency measures and conservation programs',
              goalType: 'percentage-reduction'
            },
            suggestedKPIs: [
              { name: 'Water Intensity', unit: 'm3/production unit' },
              { name: 'Total Water Withdrawal', unit: 'm3' }
            ],
            implementationGuidance: [],
            bestPractices: []
          },
          usageCount: 156,
          rating: 4.4,
          tags: ['water', 'efficiency'],
          createdBy: 'CarbonCorp',
          isPublic: true
        }
      )
    } else if (goalData.category === 'social') {
      templates.push(
        {
          id: 'soc-1',
          name: 'Diversity & Inclusion Excellence',
          description: 'Achieve leadership in workplace diversity and inclusion',
          category: 'social',
          template: {
            goalStructure: {
              name: 'Achieve 40% Women in Leadership by 2028',
              description: 'Build diverse leadership teams that reflect our values and drive innovation',
              goalType: 'absolute'
            },
            suggestedKPIs: [
              { name: 'Women in Leadership Roles', unit: '%' },
              { name: 'Employee Engagement Score', unit: 'index' }
            ],
            implementationGuidance: [],
            bestPractices: []
          },
          usageCount: 198,
          rating: 4.6,
          tags: ['diversity', 'inclusion', 'leadership'],
          createdBy: 'CarbonCorp',
          isPublic: true
        }
      )
    }
    
    setAvailableTemplates(templates)
  }

  const generateAIRecommendations = async () => {
    setIsGeneratingRecommendations(true)
    
    // Simulate AI analysis
    setTimeout(() => {
      const recommendations: AIRecommendation[] = [
        {
          id: 'rec-1',
          type: 'goal-suggestion',
          confidence: 0.85,
          title: 'SMART Criteria Enhancement',
          description: 'Your goal could be more specific in its measurement approach',
          rationale: 'Based on analysis of your goal description, adding specific baseline and target values would improve clarity and trackability.',
          data: {
            suggestions: [
              'Define specific baseline year and value',
              'Set interim milestones (e.g., 25% by 2026, 50% by 2030)',
              'Specify scope boundaries clearly'
            ]
          }
        },
        {
          id: 'rec-2',
          type: 'target-suggestion',
          confidence: 0.78,
          title: 'Industry Benchmark Alignment',
          description: 'Your target aligns well with industry best practices',
          rationale: `Based on analysis of similar organizations in your sector, your target is ${goalData.goalType === 'percentage-reduction' ? 'appropriately ambitious' : 'within reasonable bounds'}.`,
          data: {
            industryAverage: '30% reduction by 2030',
            bestInClass: '50% reduction by 2030',
            recommendation: 'Consider setting intermediate targets to maintain momentum'
          }
        },
        {
          id: 'rec-3',
          type: 'kpi-suggestion',
          confidence: 0.92,
          title: 'Recommended KPIs',
          description: 'Based on your goal, these KPIs would provide comprehensive tracking',
          rationale: 'These metrics align with leading practices and regulatory requirements.',
          data: {
            primary: ['Total Scope 1 & 2 Emissions (tCO2e)', 'Emissions Intensity (tCO2e/revenue)'],
            secondary: ['Renewable Energy Percentage (%)', 'Energy Intensity (MWh/revenue)'],
            leading: ['Energy Efficiency Projects Completed (#)', 'Renewable Energy Capacity (MW)']
          }
        }
      ]
      
      setAIRecommendations(recommendations)
      setIsGeneratingRecommendations(false)
      
      // Generate SMART critique
      setSMARTCritique({
        overallScore: 7.2,
        criteria: {
          specific: { score: 7, feedback: 'Goal is well-defined but could specify baseline value' },
          measurable: { score: 8, feedback: 'Clear quantitative target provided' },
          achievable: { score: 7, feedback: 'Target appears realistic based on industry benchmarks' },
          relevant: { score: 9, feedback: 'Strongly aligned with material topics and stakeholder expectations' },
          timeBound: { score: 6, feedback: 'Target date specified but interim milestones would help' }
        }
      })
    }, 2000)
  }

  const handleTemplateSelection = (template: GoalTemplate) => {
    setSelectedTemplate(template)
    setGoalData(prev => ({
      ...prev,
      ...template.template.goalStructure,
      tags: [...(prev.tags || []), ...template.tags]
    }))
  }

  const updateGoalData = (field: keyof ESGGoal, value: any) => {
    setGoalData(prev => ({ ...prev, [field]: value }))
  }

  const addToArray = (field: keyof ESGGoal, value: string) => {
    const currentArray = goalData[field] as string[] || []
    if (!currentArray.includes(value)) {
      updateGoalData(field, [...currentArray, value])
    }
  }

  const removeFromArray = (field: keyof ESGGoal, value: string) => {
    const currentArray = goalData[field] as string[] || []
    updateGoalData(field, currentArray.filter(item => item !== value))
  }

  const canProceedToStep = (step: number) => {
    switch (step) {
      case 2:
        return goalData.name && goalData.category && goalData.description
      case 3:
        return goalData.specific && goalData.measurable && goalData.achievable && goalData.relevant && goalData.timeBound
      case 4:
        return goalData.startDate && goalData.targetDate && goalData.owner
      default:
        return true
    }
  }

  const handleNext = () => {
    if (canProceedToStep(currentStep + 1)) {
      setCurrentStep(prev => Math.min(prev + 1, 5))
    }
  }

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = () => {
    const newGoal: ESGGoal = {
      id: `goal-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...goalData
    } as ESGGoal
    
    onGoalCreated(newGoal)
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Target className="h-16 w-16 mx-auto text-blue-600 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Create New ESG Goal</h2>
        <p className="text-muted-foreground">
          Let's start by choosing a category and exploring templates
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Goal Category</CardTitle>
          <CardDescription>Select the primary ESG category for your goal</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { value: 'environmental', label: 'Environmental', icon: '🌱', desc: 'Climate, energy, water, waste' },
              { value: 'social', label: 'Social', icon: '👥', desc: 'Diversity, safety, community' },
              { value: 'governance', label: 'Governance', icon: '⚖️', desc: 'Ethics, compliance, transparency' }
            ].map((category) => (
              <div
                key={category.value}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  goalData.category === category.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => updateGoalData('category', category.value)}
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <h3 className="font-medium">{category.label}</h3>
                <p className="text-sm text-muted-foreground">{category.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {availableTemplates.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Goal Templates</CardTitle>
            <CardDescription>Choose from proven goal templates or start from scratch</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {availableTemplates.map((template) => (
                <div
                  key={template.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedTemplate?.id === template.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleTemplateSelection(template)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium">{template.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm">{template.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{template.usageCount} uses</span>
                      </div>
                      <div className="flex gap-1 mt-2">
                        {template.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {selectedTemplate?.id === template.id && (
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                </div>
              ))}
              
              <div
                className={`border-2 border-dashed rounded-lg p-4 cursor-pointer transition-all ${
                  !selectedTemplate ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                onClick={() => setSelectedTemplate(null)}
              >
                <div className="text-center">
                  <Plus className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <h4 className="font-medium">Start from Scratch</h4>
                  <p className="text-sm text-muted-foreground">Create a custom goal without a template</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Goal Foundation</h2>
        <p className="text-muted-foreground">
          Define the basic structure and scope of your ESG goal
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="goalName">Goal Name *</Label>
            <Input
              id="goalName"
              value={goalData.name || ''}
              onChange={(e) => updateGoalData('name', e.target.value)}
              placeholder="e.g., Reduce Scope 1 & 2 Emissions by 50% by 2030"
            />
          </div>

          <div>
            <Label htmlFor="goalDescription">Description *</Label>
            <Textarea
              id="goalDescription"
              value={goalData.description || ''}
              onChange={(e) => updateGoalData('description', e.target.value)}
              placeholder="Provide a detailed description of what this goal aims to achieve..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="goalType">Goal Type</Label>
              <Select value={goalData.goalType} onValueChange={(value) => updateGoalData('goalType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select goal type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="absolute">Absolute Target</SelectItem>
                  <SelectItem value="intensity">Intensity Target</SelectItem>
                  <SelectItem value="percentage-reduction">Percentage Reduction</SelectItem>
                  <SelectItem value="binary">Binary (Yes/No)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select value={goalData.priority} onValueChange={(value) => updateGoalData('priority', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {materalityTopics.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Link to Materiality Topics</CardTitle>
            <CardDescription>Connect this goal to relevant material ESG topics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {materalityTopics.map((topic) => (
                <div key={topic.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={topic.id}
                    checked={goalData.materialityTopics?.includes(topic.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        addToArray('materialityTopics', topic.id)
                      } else {
                        removeFromArray('materialityTopics', topic.id)
                      }
                    }}
                  />
                  <Label htmlFor={topic.id} className="flex items-center gap-2">
                    {topic.name}
                    <Badge variant={topic.priority === 'high' ? 'default' : 'secondary'} className="text-xs">
                      {topic.priority}
                    </Badge>
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {strategicThemes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Strategic Alignment</CardTitle>
            <CardDescription>Link to strategic themes from your ESG strategy</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={goalData.strategicTheme} onValueChange={(value) => updateGoalData('strategicTheme', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select strategic theme" />
              </SelectTrigger>
              <SelectContent>
                {strategicThemes.map((theme) => (
                  <SelectItem key={theme.id} value={theme.id}>
                    {theme.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      )}
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">SMART Criteria</h2>
        <p className="text-muted-foreground">
          Define your goal using the SMART framework for maximum effectiveness
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">SMART Criteria</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="specific">Specific *</Label>
                <Textarea
                  id="specific"
                  value={goalData.specific || ''}
                  onChange={(e) => updateGoalData('specific', e.target.value)}
                  placeholder="What exactly will be accomplished?"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="measurable">Measurable *</Label>
                <Textarea
                  id="measurable"
                  value={goalData.measurable || ''}
                  onChange={(e) => updateGoalData('measurable', e.target.value)}
                  placeholder="How will progress be measured?"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="achievable">Achievable *</Label>
                <Textarea
                  id="achievable"
                  value={goalData.achievable || ''}
                  onChange={(e) => updateGoalData('achievable', e.target.value)}
                  placeholder="Is this goal realistic and attainable?"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="relevant">Relevant *</Label>
                <Textarea
                  id="relevant"
                  value={goalData.relevant || ''}
                  onChange={(e) => updateGoalData('relevant', e.target.value)}
                  placeholder="Why is this goal important?"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="timeBound">Time-bound *</Label>
                <Textarea
                  id="timeBound"
                  value={goalData.timeBound || ''}
                  onChange={(e) => updateGoalData('timeBound', e.target.value)}
                  placeholder="When will this goal be achieved?"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {isGeneratingRecommendations ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 animate-pulse" />
                  AI Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Analyzing your goal against SMART criteria...</p>
                </div>
              </CardContent>
            </Card>
          ) : smartCritique && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  SMART Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Overall Score:</span>
                    <Badge variant={smartCritique.overallScore >= 8 ? 'default' : 'secondary'}>
                      {smartCritique.overallScore}/10
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    {Object.entries(smartCritique.criteria).map(([key, value]: [string, any]) => (
                      <div key={key} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium capitalize">{key}</span>
                          <span className="text-sm">{value.score}/10</span>
                        </div>
                        <Progress value={value.score * 10} className="h-2" />
                        <p className="text-xs text-muted-foreground">{value.feedback}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {aiRecommendations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  AI Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aiRecommendations.map((rec) => (
                    <Alert key={rec.id}>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{rec.title}</span>
                            <Badge variant="outline" className="text-xs">
                              {Math.round(rec.confidence * 100)}% confidence
                            </Badge>
                          </div>
                          <p className="text-sm">{rec.description}</p>
                          {rec.data.suggestions && (
                            <ul className="text-xs space-y-1 ml-4">
                              {rec.data.suggestions.map((suggestion: string, idx: number) => (
                                <li key={idx} className="list-disc">{suggestion}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Timeline & Ownership</h2>
        <p className="text-muted-foreground">
          Set timeline and assign responsibilities for your goal
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Timeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={goalData.startDate || ''}
                  onChange={(e) => updateGoalData('startDate', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="targetDate">Target Date *</Label>
                <Input
                  id="targetDate"
                  type="date"
                  value={goalData.targetDate || ''}
                  onChange={(e) => updateGoalData('targetDate', e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="reviewFrequency">Review Frequency</Label>
              <Select value={goalData.reviewFrequency} onValueChange={(value) => updateGoalData('reviewFrequency', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select review frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="semi-annual">Semi-Annual</SelectItem>
                  <SelectItem value="annual">Annual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ownership & Accountability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="owner">Goal Owner *</Label>
              <Input
                id="owner"
                value={goalData.owner || ''}
                onChange={(e) => updateGoalData('owner', e.target.value)}
                placeholder="Enter goal owner name or role"
              />
            </div>

            <div>
              <Label htmlFor="stakeholders">Stakeholders</Label>
              <Input
                id="stakeholders"
                placeholder="Add stakeholder (press Enter)"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const value = e.currentTarget.value.trim()
                    if (value) {
                      addToArray('stakeholders', value)
                      e.currentTarget.value = ''
                    }
                  }
                }}
              />
              <div className="flex flex-wrap gap-1 mt-2">
                {goalData.stakeholders?.map((stakeholder, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {stakeholder}
                    <button
                      onClick={() => removeFromArray('stakeholders', stakeholder)}
                      className="ml-1 text-xs hover:text-red-600"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                placeholder="Add tag (press Enter)"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const value = e.currentTarget.value.trim()
                    if (value) {
                      addToArray('tags', value)
                      e.currentTarget.value = ''
                    }
                  }
                }}
              />
              <div className="flex flex-wrap gap-1 mt-2">
                {goalData.tags?.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                    <button
                      onClick={() => removeFromArray('tags', tag)}
                      className="ml-1 text-xs hover:text-red-600"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Review & Create Goal</h2>
        <p className="text-muted-foreground">
          Review your goal details before creating
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{goalData.name}</CardTitle>
          <CardDescription>{goalData.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">Category</h4>
              <p className="capitalize">{goalData.category}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">Type</h4>
              <p>{goalData.goalType?.replace('-', ' ')}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">Priority</h4>
              <Badge variant={goalData.priority === 'critical' ? 'destructive' : 'secondary'}>
                {goalData.priority}
              </Badge>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">Timeline</h4>
              <p>{goalData.startDate} to {goalData.targetDate}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">Owner</h4>
              <p>{goalData.owner}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">Review Frequency</h4>
              <p className="capitalize">{goalData.reviewFrequency}</p>
            </div>
          </div>

          {goalData.materialityTopics && goalData.materialityTopics.length > 0 && (
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">Linked Materiality Topics</h4>
              <div className="flex flex-wrap gap-1">
                {goalData.materialityTopics.map((topicId) => {
                  const topic = materalityTopics.find(t => t.id === topicId)
                  return topic ? (
                    <Badge key={topicId} variant="secondary" className="text-xs">
                      {topic.name}
                    </Badge>
                  ) : null
                })}
              </div>
            </div>
          )}

          {goalData.tags && goalData.tags.length > 0 && (
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">Tags</h4>
              <div className="flex flex-wrap gap-1">
                {goalData.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Separator />

          <div>
            <h4 className="font-medium text-sm text-muted-foreground mb-2">SMART Criteria</h4>
            <div className="space-y-2 text-sm">
              <p><strong>Specific:</strong> {goalData.specific}</p>
              <p><strong>Measurable:</strong> {goalData.measurable}</p>
              <p><strong>Achievable:</strong> {goalData.achievable}</p>
              <p><strong>Relevant:</strong> {goalData.relevant}</p>
              <p><strong>Time-bound:</strong> {goalData.timeBound}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          Once created, you'll be able to define KPIs, set targets, and track progress for this goal.
        </AlertDescription>
      </Alert>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Goal Definition Wizard</h1>
          <div className="text-sm text-muted-foreground">
            Step {currentStep} of 5
          </div>
        </div>
        
        <Progress value={(currentStep / 5) * 100} className="mb-4" />
        
        <div className="flex items-center justify-between text-sm">
          {[
            { step: 1, label: "Category & Template" },
            { step: 2, label: "Foundation" },
            { step: 3, label: "SMART Criteria" },
            { step: 4, label: "Timeline & Ownership" },
            { step: 5, label: "Review & Create" }
          ].map((item) => (
            <div
              key={item.step}
              className={`flex items-center gap-2 ${
                currentStep >= item.step ? 'text-blue-600' : 'text-muted-foreground'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  currentStep >= item.step ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}
              >
                {currentStep > item.step ? <CheckCircle className="h-3 w-3" /> : item.step}
              </div>
              <span className="hidden md:inline">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="mb-8">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
        {currentStep === 5 && renderStep5()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <div>
          {currentStep > 1 && (
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          )}
          <Button variant="ghost" onClick={onCancel} className="ml-2">
            Cancel
          </Button>
        </div>

        <div>
          {currentStep < 5 ? (
            <Button 
              onClick={handleNext} 
              disabled={!canProceedToStep(currentStep + 1)}
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit}>
              <Target className="h-4 w-4 mr-2" />
              Create Goal
            </Button>
          )}
        </div>
      </div>
    </div>
  )
} 