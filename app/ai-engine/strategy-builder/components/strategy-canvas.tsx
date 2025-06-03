import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { 
  Target, 
  Brain, 
  Plus,
  Edit3,
  Trash2,
  Save,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  DollarSign,
  Clock,
  Users,
  BarChart3,
  Shield,
  TrendingUp,
  MessageSquare,
  Zap,
  ChevronRight,
  ChevronDown,
  Copy
} from "lucide-react"

// Import types from strategy-types.ts instead of defining locally
import type { 
  StrategicPillar, 
  StrategicObjective, 
  StrategicInitiative, 
  StrategyBlueprint,
  AICoPilotInsight
} from "../types/strategy-types"

interface StrategyCanvasProps {
  blueprint: StrategyBlueprint
  onSave: (updatedBlueprint: StrategyBlueprint) => void
  onBack: () => void
}

export function StrategyCanvas({ blueprint, onSave, onBack }: StrategyCanvasProps) {
  const [currentBlueprint, setCurrentBlueprint] = useState<StrategyBlueprint>(blueprint)
  const [selectedPillar, setSelectedPillar] = useState<StrategicPillar | null>(null)
  const [selectedObjective, setSelectedObjective] = useState<StrategicObjective | null>(null)
  const [selectedInitiative, setSelectedInitiative] = useState<StrategicInitiative | null>(null)
  const [viewMode, setViewMode] = useState<'canvas' | 'outline' | 'timeline'>('canvas')
  const [coPilotInsights, setCoPilotInsights] = useState<AICoPilotInsight[]>([])
  const [showCoPilot, setShowCoPilot] = useState(true)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    generateInitialInsights()
  }, [])

  const generateInitialInsights = () => {
    setIsAnalyzing(true)
    
    setTimeout(() => {
      const insights: AICoPilotInsight[] = [
        {
          id: 'insight-1',
          type: 'feasibility',
          severity: 'medium',
          title: 'Budget Allocation Optimization',
          description: 'The combined budget for Environmental Stewardship initiatives ($2.5M-6.5M) represents 65% of your total strategy budget. Consider prioritizing high-impact, lower-cost initiatives first.',
          relatedElements: ['environmental-stewardship'],
          recommendations: [
            'Phase renewable energy investments over 18 months',
            'Start with energy efficiency measures (higher ROI)',
            'Explore utility rebates and government incentives'
          ],
          timestamp: new Date()
        },
        {
          id: 'insight-2',
          type: 'alignment',
          severity: 'high',
          title: 'Regulatory Compliance Gap',
          description: 'Your current strategy addresses 78% of CSRD requirements. Key gaps include Scope 3 emissions and biodiversity impact assessment.',
          relatedElements: ['environmental-stewardship', 'governance-excellence'],
          recommendations: [
            'Add Scope 3 emissions mapping initiative',
            'Include biodiversity assessment in environmental pillar',
            'Develop supplier engagement program for emissions data'
          ],
          timestamp: new Date()
        },
        {
          id: 'insight-3',
          type: 'suggestion',
          severity: 'info',
          title: 'Strategic Synergy Opportunity',
          description: 'Employee engagement initiatives in the People & Community pillar could support the Governance pillar\'s stakeholder engagement objectives.',
          relatedElements: ['people-community', 'governance-excellence'],
          recommendations: [
            'Create cross-pillar initiative for employee ESG ambassadors',
            'Link D&I metrics to stakeholder engagement KPIs',
            'Develop internal ESG communication strategy'
          ],
          timestamp: new Date()
        },
        {
          id: 'insight-4',
          type: 'risk',
          severity: 'medium',
          title: 'Timeline Feasibility Concern',
          description: 'Multiple critical initiatives are scheduled to start simultaneously in Q1. This could strain resources and reduce success probability.',
          relatedElements: ['environmental-stewardship', 'governance-excellence'],
          recommendations: [
            'Stagger initiative launches across Q1 and Q2',
            'Identify shared resources and dependencies',
            'Consider hiring external project management support'
          ],
          timestamp: new Date()
        }
      ]
      
      setCoPilotInsights(insights)
      setIsAnalyzing(false)
    }, 2000)
  }

  const handlePillarUpdate = (pillarId: string, updates: Partial<StrategicPillar>) => {
    setCurrentBlueprint(prev => ({
      ...prev,
      strategicPillars: prev.strategicPillars.map(pillar =>
        pillar.id === pillarId ? { ...pillar, ...updates } : pillar
      )
    }))
    
    // Trigger AI analysis
    analyzeChanges('pillar', pillarId, updates)
  }

  const handleObjectiveUpdate = (pillarId: string, objectiveId: string, updates: Partial<StrategicObjective>) => {
    setCurrentBlueprint(prev => ({
      ...prev,
      strategicPillars: prev.strategicPillars.map(pillar =>
        pillar.id === pillarId
          ? {
              ...pillar,
              objectives: pillar.objectives.map(obj =>
                obj.id === objectiveId ? { ...obj, ...updates } : obj
              )
            }
          : pillar
      )
    }))
    
    analyzeChanges('objective', objectiveId, updates)
  }

  const handleInitiativeUpdate = (pillarId: string, objectiveId: string, initiativeId: string, updates: Partial<StrategicInitiative>) => {
    setCurrentBlueprint(prev => ({
      ...prev,
      strategicPillars: prev.strategicPillars.map(pillar =>
        pillar.id === pillarId
          ? {
              ...pillar,
              objectives: pillar.objectives.map(obj =>
                obj.id === objectiveId
                  ? {
                      ...obj,
                      initiatives: obj.initiatives.map(init =>
                        init.id === initiativeId ? { ...init, ...updates } : init
                      )
                    }
                  : obj
              )
            }
          : pillar
      )
    }))
    
    analyzeChanges('initiative', initiativeId, updates)
  }

  const analyzeChanges = (elementType: string, elementId: string, changes: any) => {
    // Simulate AI analysis of changes
    setIsAnalyzing(true)
    
    setTimeout(() => {
      // Generate contextual insights based on changes
      const newInsight: AICoPilotInsight = {
        id: `insight-${Date.now()}`,
        type: 'suggestion',
        severity: 'info',
        title: `Analysis: ${elementType} Update`,
        description: `Recent changes to ${elementType} may impact related elements. Review alignment and dependencies.`,
        relatedElements: [elementId],
        recommendations: ['Review cross-pillar impacts', 'Validate resource allocation', 'Check timeline alignment'],
        timestamp: new Date()
      }
      
      setCoPilotInsights(prev => [newInsight, ...prev.slice(0, 9)]) // Keep last 10 insights
      setIsAnalyzing(false)
    }, 1000)
  }

  const addNewPillar = () => {
    const newPillar: StrategicPillar = {
      id: `pillar-${Date.now()}`,
      name: 'New Strategic Pillar',
      description: 'Describe the focus and purpose of this strategic pillar',
      relatedThemes: [],
      objectives: [],
      estimatedImpact: 'medium',
      feasibilityScore: 7.0,
    }
    
    setCurrentBlueprint(prev => ({
      ...prev,
      strategicPillars: [...prev.strategicPillars, newPillar]
    }))
    
    setSelectedPillar(newPillar)
  }

  const addNewObjective = (pillarId: string) => {
    const newObjective: StrategicObjective = {
      id: `obj-${Date.now()}`,
      name: 'New Strategic Objective',
      description: 'Define what this objective aims to achieve',
      timeframe: '12 months',
      targetMetrics: [],
      initiatives: [],
      regulatoryAlignment: [],
      stakeholderBenefit: []
    }
    
    handlePillarUpdate(pillarId, {
      objectives: [...(currentBlueprint.strategicPillars.find(p => p.id === pillarId)?.objectives || []), newObjective]
    })
    
    setSelectedObjective(newObjective)
  }

  const addNewInitiative = (pillarId: string, objectiveId: string) => {
    const newInitiative: StrategicInitiative = {
      id: `init-${Date.now()}`,
      name: 'New Initiative',
      description: 'Describe the specific actions and deliverables',
      owner: 'To be assigned',
      timeline: '6 months',
      budgetRange: '$50K - $200K',
      status: 'not-started',
      priority: 'medium',
      dependencies: [],
      riskFactors: [],
      expectedOutcomes: []
    }
    
    const pillar = currentBlueprint.strategicPillars.find(p => p.id === pillarId)
    const objective = pillar?.objectives.find(o => o.id === objectiveId)
    
    if (objective) {
      handleObjectiveUpdate(pillarId, objectiveId, {
        initiatives: [...objective.initiatives, newInitiative]
      })
    }
    
    setSelectedInitiative(newInitiative)
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'feasibility': return <BarChart3 className="h-4 w-4" />
      case 'alignment': return <Shield className="h-4 w-4" />
      case 'gap': return <AlertTriangle className="h-4 w-4" />
      case 'suggestion': return <Lightbulb className="h-4 w-4" />
      case 'risk': return <AlertTriangle className="h-4 w-4" />
      case 'opportunity': return <TrendingUp className="h-4 w-4" />
      default: return <MessageSquare className="h-4 w-4" />
    }
  }

  const getInsightColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200'
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500'
      case 'high': return 'bg-orange-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const renderCanvasView = () => (
    <div className="h-[600px] bg-gray-50 rounded-lg overflow-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentBlueprint.strategicPillars.map((pillar) => (
          <div
            key={pillar.id}
            className={`bg-white border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-lg ${
              selectedPillar?.id === pillar.id ? 'border-blue-500 shadow-lg' : 'border-gray-300'
            }`}
            onClick={() => setSelectedPillar(pillar)}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm">{pillar.name}</h3>
              <Badge variant={pillar.estimatedImpact === 'high' ? 'default' : 'secondary'}>
                {pillar.estimatedImpact}
              </Badge>
            </div>
            
            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
              {pillar.description}
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span>Feasibility Score</span>
                <span className="font-medium">{pillar.feasibilityScore}/10</span>
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <span>Objectives</span>
                <span className="font-medium">{pillar.objectives.length}</span>
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <span>Initiatives</span>
                <span className="font-medium">
                  {pillar.objectives.reduce((acc, obj) => acc + obj.initiatives.length, 0)}
                </span>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-200 flex gap-2">
              <Button size="sm" variant="outline" onClick={(e) => {
                e.stopPropagation()
                addNewObjective(pillar.id)
              }}>
                <Plus className="h-3 w-3 mr-1" />
                Objective
              </Button>
              <Button size="sm" variant="ghost" onClick={(e) => {
                e.stopPropagation()
                setSelectedPillar(pillar)
              }}>
                <Edit3 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
        
        {/* Add New Pillar Button */}
        <div
          className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all min-h-[200px]"
          onClick={addNewPillar}
        >
          <Plus className="h-8 w-8 text-gray-400 mb-2" />
          <span className="text-sm text-gray-600">Add Strategic Pillar</span>
        </div>
      </div>
    </div>
  )

  const renderOutlineView = () => (
    <div className="space-y-4">
      {currentBlueprint.strategicPillars.map((pillar) => (
        <Card key={pillar.id}>
          <CardHeader 
            className="cursor-pointer"
            onClick={() => setSelectedPillar(selectedPillar?.id === pillar.id ? null : pillar)}
          >
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{pillar.name}</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant={pillar.estimatedImpact === 'high' ? 'default' : 'secondary'}>
                  {pillar.estimatedImpact} impact
                </Badge>
                <ChevronDown className={`h-4 w-4 transition-transform ${
                  selectedPillar?.id === pillar.id ? 'rotate-180' : ''
                }`} />
              </div>
            </div>
            <CardDescription>{pillar.description}</CardDescription>
          </CardHeader>
          
          {selectedPillar?.id === pillar.id && (
            <CardContent className="space-y-4">
              {pillar.objectives.map((objective) => (
                <div key={objective.id} className="border rounded-lg p-4">
                  <div 
                    className="flex items-center justify-between cursor-pointer mb-2"
                    onClick={() => setSelectedObjective(selectedObjective?.id === objective.id ? null : objective)}
                  >
                    <h4 className="font-medium">{objective.name}</h4>
                    <ChevronRight className={`h-4 w-4 transition-transform ${
                      selectedObjective?.id === objective.id ? 'rotate-90' : ''
                    }`} />
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{objective.description}</p>
                  
                  {selectedObjective?.id === objective.id && (
                    <div className="space-y-3 ml-4">
                      {objective.initiatives.map((initiative) => (
                        <div 
                          key={initiative.id} 
                          className="border-l-4 pl-4 py-2 cursor-pointer hover:bg-gray-50"
                          style={{ borderLeftColor: getPriorityColor(initiative.priority) }}
                          onClick={() => setSelectedInitiative(initiative)}
                        >
                          <div className="flex items-center justify-between">
                            <h5 className="font-medium text-sm">{initiative.name}</h5>
                            <Badge variant="outline" className="text-xs">
                              {initiative.timeline}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{initiative.description}</p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="secondary" className="text-xs">
                              {initiative.budgetRange}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {initiative.status.replace('-', ' ')}
                            </Badge>
                          </div>
                        </div>
                      ))}
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addNewInitiative(pillar.id, objective.id)}
                        className="ml-4"
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add Initiative
                      </Button>
                    </div>
                  )}
                </div>
              ))}
              
              <Button
                variant="outline"
                onClick={() => addNewObjective(pillar.id)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Objective
              </Button>
            </CardContent>
          )}
        </Card>
      ))}
      
      <Button variant="outline" onClick={addNewPillar} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Strategic Pillar
      </Button>
    </div>
  )

  const renderTimelineView = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Implementation Timeline</h3>
        <p className="text-sm text-muted-foreground">
          Visual roadmap of all strategic initiatives organized by timeline
        </p>
      </div>
      
      {/* Timeline implementation would go here - showing placeholder */}
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <Clock className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h4 className="font-medium text-gray-600 mb-2">Timeline View</h4>
        <p className="text-sm text-gray-500">
          Interactive timeline visualization coming soon. 
          Use Outline view to review initiative timelines.
        </p>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen">
      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Strategy Canvas</h1>
              <p className="text-sm text-muted-foreground">
                Refine and optimize your ESG strategy with AI guidance
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Tabs value={viewMode} onValueChange={(value: any) => setViewMode(value)}>
                <TabsList>
                  <TabsTrigger value="canvas">Canvas</TabsTrigger>
                  <TabsTrigger value="outline">Outline</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <Button variant="outline" onClick={() => setShowCoPilot(!showCoPilot)}>
                <Brain className="h-4 w-4 mr-2" />
                AI Co-Pilot
              </Button>
              
              <Button onClick={() => onSave(currentBlueprint)}>
                <Save className="h-4 w-4 mr-2" />
                Save Strategy
              </Button>
            </div>
          </div>
        </div>

        {/* Canvas Content */}
        <div className="flex-1 p-6 overflow-auto">
          {viewMode === 'canvas' && renderCanvasView()}
          {viewMode === 'outline' && renderOutlineView()}
          {viewMode === 'timeline' && renderTimelineView()}
        </div>
      </div>

      {/* AI Co-Pilot Sidebar */}
      {showCoPilot && (
        <div className="w-80 border-l bg-white flex flex-col">
          <div className="p-4 border-b">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-600" />
              <h2 className="font-semibold">AI Strategy Co-Pilot</h2>
              {isAnalyzing && (
                <div className="animate-pulse bg-blue-600 rounded-full w-2 h-2"></div>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Real-time analysis and recommendations
            </p>
          </div>

          <div className="flex-1 overflow-auto p-4 space-y-4">
            {coPilotInsights.map((insight) => (
              <Card key={insight.id} className={`border ${getInsightColor(insight.severity)}`}>
                <CardHeader className="pb-2">
                  <div className="flex items-start gap-2">
                    {getInsightIcon(insight.type)}
                    <div className="flex-1">
                      <CardTitle className="text-sm">{insight.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {insight.type}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {insight.severity}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-xs text-muted-foreground mb-3">
                    {insight.description}
                  </p>
                  
                  {insight.recommendations.length > 0 && (
                    <div>
                      <h5 className="text-xs font-medium mb-2">Recommendations:</h5>
                      <ul className="text-xs space-y-1">
                        {insight.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Zap className="h-3 w-3 mt-0.5 text-blue-600 flex-shrink-0" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            {coPilotInsights.length === 0 && !isAnalyzing && (
              <div className="text-center py-8">
                <Brain className="h-8 w-8 mx-auto text-gray-400 mb-3" />
                <p className="text-sm text-gray-500">
                  AI Co-Pilot will provide insights as you work on your strategy
                </p>
              </div>
            )}
          </div>

          <div className="p-4 border-t">
            <Button 
              variant="outline" 
              className="w-full text-xs"
              onClick={generateInitialInsights}
              disabled={isAnalyzing}
            >
              <Brain className="h-3 w-3 mr-2" />
              {isAnalyzing ? 'Analyzing...' : 'Refresh Insights'}
            </Button>
          </div>
        </div>
      )}

      {/* Element Editor Sheets */}
      {selectedPillar && (
        <Sheet open={!!selectedPillar} onOpenChange={() => setSelectedPillar(null)}>
          <SheetContent className="w-[500px]">
            <SheetHeader>
              <SheetTitle>Edit Strategic Pillar</SheetTitle>
              <SheetDescription>
                Modify the pillar details and structure
              </SheetDescription>
            </SheetHeader>
            
            <div className="space-y-4 mt-6">
              <div>
                <Label htmlFor="pillar-name">Pillar Name</Label>
                <Input
                  id="pillar-name"
                  value={selectedPillar.name}
                  onChange={(e) => 
                    handlePillarUpdate(selectedPillar.id, { name: e.target.value })
                  }
                />
              </div>
              
              <div>
                <Label htmlFor="pillar-description">Description</Label>
                <Textarea
                  id="pillar-description"
                  value={selectedPillar.description}
                  onChange={(e) =>
                    handlePillarUpdate(selectedPillar.id, { description: e.target.value })
                  }
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="estimated-impact">Estimated Impact</Label>
                <Select
                  value={selectedPillar.estimatedImpact}
                  onValueChange={(value: any) =>
                    handlePillarUpdate(selectedPillar.id, { estimatedImpact: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High Impact</SelectItem>
                    <SelectItem value="medium">Medium Impact</SelectItem>
                    <SelectItem value="low">Low Impact</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="feasibility-score">Feasibility Score (1-10)</Label>
                <Input
                  id="feasibility-score"
                  type="number"
                  min="1"
                  max="10"
                  step="0.1"
                  value={selectedPillar.feasibilityScore}
                  onChange={(e) =>
                    handlePillarUpdate(selectedPillar.id, { 
                      feasibilityScore: parseFloat(e.target.value) || 1 
                    })
                  }
                />
              </div>
              
              <Separator />
              
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label>Objectives ({selectedPillar.objectives.length})</Label>
                  <Button 
                    size="sm" 
                    onClick={() => addNewObjective(selectedPillar.id)}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                </div>
                
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {selectedPillar.objectives.map((objective) => (
                    <div 
                      key={objective.id}
                      className="border rounded p-3 cursor-pointer hover:bg-gray-50"
                      onClick={() => setSelectedObjective(objective)}
                    >
                      <h4 className="font-medium text-sm">{objective.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {objective.initiatives.length} initiatives • {objective.timeframe}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  )
} 