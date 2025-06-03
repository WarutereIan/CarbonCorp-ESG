"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Target, 
  Plus,
  Settings,
  BarChart3,
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Lightbulb,
  FileText
} from "lucide-react"

import { GoalDefinitionWizard } from "./components/goal-definition-wizard"
import { KPIConfiguration } from "./components/kpi-configuration"
import type { ESGGoal, KPIMetric } from "./types/goal-types"

interface GoalsPageState {
  currentView: 'dashboard' | 'create-goal' | 'configure-kpis'
  selectedGoal?: ESGGoal
  goals: ESGGoal[]
  kpisByGoal: Record<string, KPIMetric[]>
}

export default function GoalsPage() {
  const [state, setState] = useState<GoalsPageState>({
    currentView: 'dashboard',
    goals: [],
    kpisByGoal: {}
  })

  // Mock materiality topics (would come from materiality assessment module)
  const mockMaterialityTopics = [
    { id: 'mt-1', name: 'Climate Change', category: 'Environmental', priority: 'high' as const },
    { id: 'mt-2', name: 'Energy Management', category: 'Environmental', priority: 'high' as const },
    { id: 'mt-3', name: 'Water Stewardship', category: 'Environmental', priority: 'medium' as const },
    { id: 'mt-4', name: 'Diversity & Inclusion', category: 'Social', priority: 'high' as const },
    { id: 'mt-5', name: 'Employee Safety', category: 'Social', priority: 'high' as const },
    { id: 'mt-6', name: 'Data Privacy', category: 'Governance', priority: 'medium' as const }
  ]

  // Mock strategic themes (would come from strategy builder)
  const mockStrategicThemes = [
    { id: 'st-1', name: 'Environmental Stewardship', description: 'Achieving carbon neutrality and environmental excellence' },
    { id: 'st-2', name: 'People & Community Excellence', description: 'Building diverse, inclusive, and safe workplaces' },
    { id: 'st-3', name: 'Governance & Ethics Excellence', description: 'Maintaining highest standards of governance and ethics' }
  ]

  useEffect(() => {
    // Load existing goals and KPIs
    loadGoalsAndKPIs()
  }, [])

  const loadGoalsAndKPIs = async () => {
    // Mock data - would come from API
    const mockGoals: ESGGoal[] = [
      {
        id: 'goal-1',
        name: 'Reduce Scope 1 & 2 Emissions by 50% by 2030',
        description: 'Achieve significant reduction in operational emissions through energy efficiency and renewable energy adoption',
        category: 'environmental',
        strategicTheme: 'st-1',
        materialityTopics: ['mt-1', 'mt-2'],
        specific: 'Reduce absolute Scope 1 and 2 greenhouse gas emissions',
        measurable: '50% reduction from 2023 baseline (15,000 tCO2e to 7,500 tCO2e)',
        achievable: 'Based on industry benchmarks and available technologies',
        relevant: 'Aligns with Paris Agreement and stakeholder expectations',
        timeBound: 'Target achievement by December 31, 2030',
        goalType: 'percentage-reduction',
        status: 'active',
        priority: 'critical',
        startDate: '2024-01-01',
        targetDate: '2030-12-31',
        reviewFrequency: 'quarterly',
        owner: 'Chief Sustainability Officer',
        stakeholders: ['Operations Team', 'Facilities Management', 'Executive Committee'],
        linkedKPIs: ['kpi-1', 'kpi-2'],
        linkedInitiatives: [],
        regulatoryFrameworks: ['CSRD', 'ISSB'],
        tags: ['climate', 'emissions', 'scope-1-2', 'net-zero'],
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z'
      },
      {
        id: 'goal-2',
        name: 'Achieve 40% Women in Leadership by 2028',
        description: 'Build diverse leadership teams that reflect our values and drive innovation',
        category: 'social',
        strategicTheme: 'st-2',
        materialityTopics: ['mt-4'],
        specific: 'Increase representation of women in leadership positions',
        measurable: '40% of leadership roles filled by women (from current 25%)',
        achievable: 'Through structured development programs and inclusive hiring',
        relevant: 'Critical for innovation, performance, and stakeholder expectations',
        timeBound: 'Target achievement by December 31, 2028',
        goalType: 'absolute',
        status: 'active',
        priority: 'high',
        startDate: '2024-01-01',
        targetDate: '2028-12-31',
        reviewFrequency: 'quarterly',
        owner: 'Chief People Officer',
        stakeholders: ['HR Team', 'Leadership Development', 'Business Units'],
        linkedKPIs: ['kpi-3'],
        linkedInitiatives: [],
        regulatoryFrameworks: [],
        tags: ['diversity', 'inclusion', 'leadership', 'gender-equality'],
        createdAt: '2024-01-15T11:00:00Z',
        updatedAt: '2024-01-15T11:00:00Z'
      }
    ]

    const mockKPIs: Record<string, KPIMetric[]> = {
      'goal-1': [
        {
          id: 'kpi-1',
          name: 'Total Scope 1 & 2 Emissions',
          description: 'Combined direct and indirect emissions from operations',
          unit: 'tCO2e',
          dataHubMetricId: 'dhm-emissions-combined',
          calculationLogic: 'Sum of Scope 1 and Scope 2 emissions',
          formula: 'Scope1 + Scope2',
          baseline: {
            value: 15000,
            period: '2023',
            establishedDate: '2024-01-01',
            source: 'GHG Inventory Report 2023',
            confidence: 'high'
          },
          targets: [
            { id: 't1', type: 'interim', value: 11250, targetDate: '2026-12-31', description: '25% reduction by 2026' },
            { id: 't2', type: 'final', value: 7500, targetDate: '2030-12-31', description: '50% reduction by 2030' }
          ],
          reportingFrequency: 'monthly',
          dataSource: 'Energy Management System',
          responsibleParty: 'Sustainability Team',
          collectionMethod: 'automated',
          performanceRanges: {
            excellent: { max: 7500 },
            good: { min: 7500, max: 10000 },
            warning: { min: 10000, max: 12500 },
            critical: { min: 12500 }
          },
          validationRules: [
            {
              id: 'vr-1',
              type: 'range',
              description: 'Emissions should not exceed historical maximum',
              configuration: { max: 20000 },
              severity: 'error'
            }
          ],
          createdAt: '2024-01-15T10:30:00Z',
          updatedAt: '2024-01-15T10:30:00Z',
          isActive: true
        },
        {
          id: 'kpi-2',
          name: 'Emissions Intensity',
          description: 'Emissions per unit of revenue',
          unit: 'tCO2e/M$',
          calculationLogic: 'Total emissions divided by revenue in millions',
          formula: '(Scope1 + Scope2) / (Revenue / 1000000)',
          baseline: {
            value: 75,
            period: '2023',
            establishedDate: '2024-01-01',
            source: 'Financial and Sustainability Reports',
            confidence: 'medium'
          },
          targets: [
            { id: 't3', type: 'final', value: 37.5, targetDate: '2030-12-31', description: '50% intensity reduction' }
          ],
          reportingFrequency: 'quarterly',
          dataSource: 'ERP and Energy Systems',
          responsibleParty: 'Finance & Sustainability Teams',
          collectionMethod: 'hybrid',
          performanceRanges: {
            excellent: { max: 40 },
            good: { min: 40, max: 55 },
            warning: { min: 55, max: 70 },
            critical: { min: 70 }
          },
          validationRules: [],
          createdAt: '2024-01-15T10:45:00Z',
          updatedAt: '2024-01-15T10:45:00Z',
          isActive: true
        }
      ],
      'goal-2': [
        {
          id: 'kpi-3',
          name: 'Women in Leadership Roles',
          description: 'Percentage of leadership positions held by women',
          unit: '%',
          dataHubMetricId: 'dhm-diversity-leadership',
          calculationLogic: 'Number of women in leadership / Total leadership positions * 100',
          baseline: {
            value: 25,
            period: '2023',
            establishedDate: '2024-01-01',
            source: 'HR Analytics Dashboard',
            confidence: 'high'
          },
          targets: [
            { id: 't4', type: 'interim', value: 32, targetDate: '2026-12-31', description: '32% by 2026' },
            { id: 't5', type: 'final', value: 40, targetDate: '2028-12-31', description: '40% by 2028' }
          ],
          reportingFrequency: 'quarterly',
          dataSource: 'HR Information System',
          responsibleParty: 'People Analytics Team',
          collectionMethod: 'automated',
          performanceRanges: {
            excellent: { min: 40 },
            good: { min: 35, max: 40 },
            warning: { min: 30, max: 35 },
            critical: { max: 30 }
          },
          validationRules: [],
          createdAt: '2024-01-15T11:15:00Z',
          updatedAt: '2024-01-15T11:15:00Z',
          isActive: true
        }
      ]
    }

    setState(prev => ({
      ...prev,
      goals: mockGoals,
      kpisByGoal: mockKPIs
    }))
  }

  const handleGoalCreated = (goal: ESGGoal) => {
    setState(prev => ({
      ...prev,
      goals: [...prev.goals, goal],
      selectedGoal: goal,
      currentView: 'configure-kpis'
    }))
  }

  const handleKPIUpdated = (goalId: string, kpis: KPIMetric[]) => {
    setState(prev => ({
      ...prev,
      kpisByGoal: {
        ...prev.kpisByGoal,
        [goalId]: kpis
      }
    }))
  }

  const handleGoalSelect = (goal: ESGGoal) => {
    setState(prev => ({
      ...prev,
      selectedGoal: goal,
      currentView: 'configure-kpis'
    }))
  }

  const getGoalStatusColor = (goal: ESGGoal) => {
    switch (goal.status) {
      case 'active': return 'bg-green-50 border-green-200'
      case 'draft': return 'bg-gray-50 border-gray-200'
      case 'paused': return 'bg-yellow-50 border-yellow-200'
      case 'completed': return 'bg-blue-50 border-blue-200'
      case 'cancelled': return 'bg-red-50 border-red-200'
      default: return 'bg-gray-50 border-gray-200'
    }
  }

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case 'critical': return 'destructive'
      case 'high': return 'default'
      case 'medium': return 'secondary'
      case 'low': return 'outline'
      default: return 'secondary'
    }
  }

  const renderGoalCard = (goal: ESGGoal) => {
    const kpis = state.kpisByGoal[goal.id] || []
    const activeKPIs = kpis.filter(k => k.isActive).length
    
    return (
      <Card key={goal.id} className={`${getGoalStatusColor(goal)} transition-all hover:shadow-md cursor-pointer`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg line-clamp-2">{goal.name}</CardTitle>
              <CardDescription className="mt-1 line-clamp-2">{goal.description}</CardDescription>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge variant={getPriorityBadgeVariant(goal.priority)} className="text-xs">
                {goal.priority}
              </Badge>
              <Badge variant={goal.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                {goal.status}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Category:</span>
              <p className="font-medium capitalize">{goal.category}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Owner:</span>
              <p className="font-medium">{goal.owner}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Target Date:</span>
              <p className="font-medium">{goal.targetDate}</p>
            </div>
            <div>
              <span className="text-muted-foreground">KPIs:</span>
              <p className="font-medium">{activeKPIs} active</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex gap-1">
              {goal.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {goal.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{goal.tags.length - 3}
                </Badge>
              )}
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleGoalSelect(goal)}
            >
              <Settings className="h-4 w-4 mr-1" />
              Configure
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">ESG Goals & KPI Tracking</h1>
          <p className="text-muted-foreground">
            Monitor progress towards your sustainability objectives with comprehensive goal and KPI management
          </p>
        </div>
        <Button onClick={() => setState(prev => ({ ...prev, currentView: 'create-goal' }))}>
          <Plus className="h-4 w-4 mr-2" />
          Create Goal
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{state.goals.length}</p>
                <p className="text-sm text-muted-foreground">Total Goals</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{state.goals.filter(g => g.status === 'active').length}</p>
                <p className="text-sm text-muted-foreground">Active Goals</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {Object.values(state.kpisByGoal).flat().filter(k => k.isActive).length}
                </p>
                <p className="text-sm text-muted-foreground">Active KPIs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{state.goals.filter(g => g.priority === 'critical').length}</p>
                <p className="text-sm text-muted-foreground">Critical Goals</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Goals ({state.goals.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({state.goals.filter(g => g.status === 'active').length})</TabsTrigger>
          <TabsTrigger value="environmental">Environmental ({state.goals.filter(g => g.category === 'environmental').length})</TabsTrigger>
          <TabsTrigger value="social">Social ({state.goals.filter(g => g.category === 'social').length})</TabsTrigger>
          <TabsTrigger value="governance">Governance ({state.goals.filter(g => g.category === 'governance').length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {state.goals.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Target className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No Goals Created Yet</h3>
                <p className="text-muted-foreground text-center mb-6 max-w-md">
                  Start building your ESG program by creating your first goal. Use our guided wizard to ensure alignment with your materiality assessment and strategic themes.
                </p>
                <Button onClick={() => setState(prev => ({ ...prev, currentView: 'create-goal' }))}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Goal
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {state.goals.map(renderGoalCard)}
            </div>
          )}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {state.goals.filter(g => g.status === 'active').map(renderGoalCard)}
          </div>
        </TabsContent>

        <TabsContent value="environmental" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {state.goals.filter(g => g.category === 'environmental').map(renderGoalCard)}
          </div>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {state.goals.filter(g => g.category === 'social').map(renderGoalCard)}
          </div>
        </TabsContent>

        <TabsContent value="governance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {state.goals.filter(g => g.category === 'governance').map(renderGoalCard)}
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>Common tasks to get you started</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 justify-start">
              <div className="text-left">
                <div className="font-medium">Import from Strategy</div>
                <div className="text-sm text-muted-foreground">Create goals from strategic initiatives</div>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 justify-start">
              <div className="text-left">
                <div className="font-medium">Browse Templates</div>
                <div className="text-sm text-muted-foreground">Use industry-proven goal templates</div>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 justify-start">
              <div className="text-left">
                <div className="font-medium">View Progress Reports</div>
                <div className="text-sm text-muted-foreground">Generate tracking reports</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  if (state.currentView === 'create-goal') {
    return (
      <GoalDefinitionWizard
        onGoalCreated={handleGoalCreated}
        onCancel={() => setState(prev => ({ ...prev, currentView: 'dashboard' }))}
        materalityTopics={mockMaterialityTopics}
        strategicThemes={mockStrategicThemes}
      />
    )
  }

  if (state.currentView === 'configure-kpis' && state.selectedGoal) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => setState(prev => ({ ...prev, currentView: 'dashboard', selectedGoal: undefined }))}
          >
            ← Back to Goals
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{state.selectedGoal.name}</h1>
            <p className="text-muted-foreground">Configure KPIs and track progress</p>
          </div>
        </div>

        <KPIConfiguration
          goalId={state.selectedGoal.id}
          goal={state.selectedGoal}
          existingKPIs={state.kpisByGoal[state.selectedGoal.id] || []}
          onKPIUpdated={(kpis) => handleKPIUpdated(state.selectedGoal!.id, kpis)}
        />
      </div>
    )
  }

  return renderDashboard()
} 