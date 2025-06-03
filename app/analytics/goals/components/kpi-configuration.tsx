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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Target, 
  Plus,
  Edit,
  Trash2,
  Save,
  Calculator,
  Database,
  TrendingUp,
  AlertTriangle,
  Info,
  Link,
  BarChart3,
  Calendar,
  Users,
  CheckCircle2,
  X
} from "lucide-react"

import type { KPIMetric, ValidationRule, ESGGoal } from "../types/goal-types"

interface KPIConfigurationProps {
  goalId: string
  goal: ESGGoal
  existingKPIs?: KPIMetric[]
  onKPIUpdated: (kpis: KPIMetric[]) => void
  availableDataHubMetrics?: Array<{
    id: string
    name: string
    unit: string
    description: string
    category: string
    dataType: 'number' | 'percentage' | 'boolean' | 'text'
  }>
}

interface KPIFormData extends Partial<KPIMetric> {
  targetValues?: Array<{
    type: 'interim' | 'final'
    value: string
    targetDate: string
    description?: string
  }>
}

export function KPIConfiguration({ 
  goalId, 
  goal, 
  existingKPIs = [], 
  onKPIUpdated,
  availableDataHubMetrics = []
}: KPIConfigurationProps) {
  const [kpis, setKPIs] = useState<KPIMetric[]>(existingKPIs)
  const [editingKPI, setEditingKPI] = useState<KPIFormData | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    setKPIs(existingKPIs)
  }, [existingKPIs])

  // Mock data for available Data Hub metrics
  const mockDataHubMetrics = [
    {
      id: 'dhm-1',
      name: 'Total Energy Consumption',
      unit: 'MWh',
      description: 'Total electricity and fuel consumption across all facilities',
      category: 'Energy',
      dataType: 'number' as const
    },
    {
      id: 'dhm-2',
      name: 'Scope 1 Emissions',
      unit: 'tCO2e',
      description: 'Direct greenhouse gas emissions from owned sources',
      category: 'Emissions',
      dataType: 'number' as const
    },
    {
      id: 'dhm-3',
      name: 'Scope 2 Emissions',
      unit: 'tCO2e',
      description: 'Indirect emissions from purchased electricity',
      category: 'Emissions',
      dataType: 'number' as const
    },
    {
      id: 'dhm-4',
      name: 'Water Consumption',
      unit: 'm³',
      description: 'Total water withdrawal from all sources',
      category: 'Water',
      dataType: 'number' as const
    },
    {
      id: 'dhm-5',
      name: 'Employee Count',
      unit: 'count',
      description: 'Total number of active employees',
      category: 'Social',
      dataType: 'number' as const
    },
    {
      id: 'dhm-6',
      name: 'Revenue',
      unit: 'USD',
      description: 'Total annual revenue',
      category: 'Financial',
      dataType: 'number' as const
    }
  ]

  const dataHubMetrics = availableDataHubMetrics.length > 0 ? availableDataHubMetrics : mockDataHubMetrics

  const handleCreateKPI = () => {
    setEditingKPI({
      name: '',
      description: '',
      unit: '',
      calculationLogic: '',
      reportingFrequency: 'monthly',
      collectionMethod: 'automated',
      dataSource: '',
      responsibleParty: '',
      baseline: {
        value: 0,
        period: '',
        establishedDate: '',
        source: '',
        confidence: 'medium'
      },
      targets: [],
      targetValues: [],
      performanceRanges: {
        excellent: {},
        good: {},
        warning: {},
        critical: {}
      },
      validationRules: [],
      isActive: true
    })
    setIsDialogOpen(true)
  }

  const handleEditKPI = (kpi: KPIMetric) => {
    setEditingKPI({
      ...kpi,
      targetValues: kpi.targets.map(t => ({
        type: t.type,
        value: t.value.toString(),
        targetDate: t.targetDate,
        description: t.description
      }))
    })
    setIsDialogOpen(true)
  }

  const handleDeleteKPI = (kpiId: string) => {
    const updatedKPIs = kpis.filter(kpi => kpi.id !== kpiId)
    setKPIs(updatedKPIs)
    onKPIUpdated(updatedKPIs)
  }

  const handleSaveKPI = () => {
    if (!editingKPI || !editingKPI.name) return

    const kpiData: KPIMetric = {
      id: editingKPI.id || `kpi-${Date.now()}`,
      name: editingKPI.name,
      description: editingKPI.description || '',
      unit: editingKPI.unit || '',
      calculationLogic: editingKPI.calculationLogic || '',
      formula: editingKPI.formula,
      dataHubMetricId: editingKPI.dataHubMetricId,
      baseline: editingKPI.baseline || {
        value: 0,
        period: '',
        establishedDate: '',
        source: '',
        confidence: 'medium'
      },
      targets: (editingKPI.targetValues || []).map((tv, index) => ({
        id: `target-${index}`,
        type: tv.type,
        value: parseFloat(tv.value) || 0,
        targetDate: tv.targetDate,
        description: tv.description
      })),
      reportingFrequency: editingKPI.reportingFrequency || 'monthly',
      dataSource: editingKPI.dataSource || '',
      responsibleParty: editingKPI.responsibleParty || '',
      collectionMethod: editingKPI.collectionMethod || 'automated',
      performanceRanges: editingKPI.performanceRanges || {
        excellent: {},
        good: {},
        warning: {},
        critical: {}
      },
      validationRules: editingKPI.validationRules || [],
      createdAt: editingKPI.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: editingKPI.isActive !== undefined ? editingKPI.isActive : true
    }

    let updatedKPIs: KPIMetric[]
    if (editingKPI.id) {
      updatedKPIs = kpis.map(kpi => kpi.id === editingKPI.id ? kpiData : kpi)
    } else {
      updatedKPIs = [...kpis, kpiData]
    }

    setKPIs(updatedKPIs)
    onKPIUpdated(updatedKPIs)
    setIsDialogOpen(false)
    setEditingKPI(null)
  }

  const handleDataHubMetricSelect = (metricId: string) => {
    const metric = dataHubMetrics.find(m => m.id === metricId)
    if (metric && editingKPI) {
      setEditingKPI({
        ...editingKPI,
        dataHubMetricId: metricId,
        name: editingKPI.name || metric.name,
        unit: editingKPI.unit || metric.unit,
        description: editingKPI.description || metric.description,
        calculationLogic: editingKPI.calculationLogic || `Direct mapping from ${metric.name}`,
        dataSource: metric.category,
        collectionMethod: 'automated'
      })
    }
  }

  const addTarget = () => {
    if (!editingKPI) return
    const newTarget = {
      type: 'interim' as const,
      value: '',
      targetDate: '',
      description: ''
    }
    setEditingKPI({
      ...editingKPI,
      targetValues: [...(editingKPI.targetValues || []), newTarget]
    })
  }

  const removeTarget = (index: number) => {
    if (!editingKPI) return
    const updatedTargets = editingKPI.targetValues?.filter((_, i) => i !== index) || []
    setEditingKPI({
      ...editingKPI,
      targetValues: updatedTargets
    })
  }

  const updateTarget = (index: number, field: string, value: string) => {
    if (!editingKPI) return
    const updatedTargets = [...(editingKPI.targetValues || [])]
    updatedTargets[index] = { ...updatedTargets[index], [field]: value }
    setEditingKPI({
      ...editingKPI,
      targetValues: updatedTargets
    })
  }

  const addValidationRule = () => {
    if (!editingKPI) return
    const newRule: ValidationRule = {
      id: `rule-${Date.now()}`,
      type: 'range',
      description: '',
      configuration: {},
      severity: 'warning'
    }
    setEditingKPI({
      ...editingKPI,
      validationRules: [...(editingKPI.validationRules || []), newRule]
    })
  }

  const updateValidationRule = (index: number, field: keyof ValidationRule, value: any) => {
    if (!editingKPI) return
    const updatedRules = [...(editingKPI.validationRules || [])]
    updatedRules[index] = { ...updatedRules[index], [field]: value }
    setEditingKPI({
      ...editingKPI,
      validationRules: updatedRules
    })
  }

  const removeValidationRule = (index: number) => {
    if (!editingKPI) return
    const updatedRules = editingKPI.validationRules?.filter((_, i) => i !== index) || []
    setEditingKPI({
      ...editingKPI,
      validationRules: updatedRules
    })
  }

  const getKPIStatusColor = (kpi: KPIMetric) => {
    if (!kpi.isActive) return 'bg-gray-100 border-gray-300'
    if (kpi.baseline.confidence === 'high') return 'bg-green-50 border-green-200'
    if (kpi.baseline.confidence === 'low') return 'bg-yellow-50 border-yellow-200'
    return 'bg-blue-50 border-blue-200'
  }

  const renderKPICard = (kpi: KPIMetric) => (
    <Card key={kpi.id} className={`${getKPIStatusColor(kpi)} transition-all hover:shadow-md`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{kpi.name}</CardTitle>
            <CardDescription className="mt-1">{kpi.description}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={kpi.isActive ? 'default' : 'secondary'}>
              {kpi.isActive ? 'Active' : 'Inactive'}
            </Badge>
            <Button variant="ghost" size="sm" onClick={() => handleEditKPI(kpi)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleDeleteKPI(kpi.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Unit:</span>
            <p className="font-medium">{kpi.unit}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Frequency:</span>
            <p className="font-medium capitalize">{kpi.reportingFrequency}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Method:</span>
            <p className="font-medium capitalize">{kpi.collectionMethod}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Owner:</span>
            <p className="font-medium">{kpi.responsibleParty || 'Not assigned'}</p>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-sm mb-2">Baseline</h4>
            <div className="text-sm space-y-1">
              <p><span className="text-muted-foreground">Value:</span> {kpi.baseline.value} {kpi.unit}</p>
              <p><span className="text-muted-foreground">Period:</span> {kpi.baseline.period}</p>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Confidence:</span>
                <Badge variant={kpi.baseline.confidence === 'high' ? 'default' : 'secondary'} className="text-xs">
                  {kpi.baseline.confidence}
                </Badge>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-sm mb-2">Targets ({kpi.targets.length})</h4>
            <div className="space-y-1">
              {kpi.targets.slice(0, 2).map((target, index) => (
                <div key={target.id} className="text-sm flex items-center justify-between">
                  <span className="text-muted-foreground">{target.type}:</span>
                  <span className="font-medium">{target.value} {kpi.unit}</span>
                </div>
              ))}
              {kpi.targets.length > 2 && (
                <p className="text-xs text-muted-foreground">+{kpi.targets.length - 2} more</p>
              )}
            </div>
          </div>
        </div>

        {kpi.dataHubMetricId && (
          <div className="flex items-center gap-2 text-sm text-blue-600">
            <Database className="h-4 w-4" />
            <span>Linked to Data Hub metric</span>
          </div>
        )}

        {kpi.formula && (
          <div className="flex items-center gap-2 text-sm text-green-600">
            <Calculator className="h-4 w-4" />
            <span>Calculated metric</span>
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">KPI Configuration</h2>
          <p className="text-muted-foreground">
            Define and manage Key Performance Indicators for {goal.name}
          </p>
        </div>
        <Button onClick={handleCreateKPI}>
          <Plus className="h-4 w-4 mr-2" />
          Add KPI
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="active">Active KPIs ({kpis.filter(k => k.isActive).length})</TabsTrigger>
          <TabsTrigger value="inactive">Inactive ({kpis.filter(k => !k.isActive).length})</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {kpis.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Target className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No KPIs Defined Yet</h3>
                <p className="text-muted-foreground text-center mb-4 max-w-md">
                  Start by creating your first KPI to track progress towards your goal. You can link existing data sources or define new metrics.
                </p>
                <Button onClick={handleCreateKPI}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create First KPI
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {kpis.map(renderKPICard)}
            </div>
          )}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {kpis.filter(kpi => kpi.isActive).map(renderKPICard)}
          </div>
        </TabsContent>

        <TabsContent value="inactive" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {kpis.filter(kpi => !kpi.isActive).map(renderKPICard)}
          </div>
        </TabsContent>
      </Tabs>

      {/* KPI Creation/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingKPI?.id ? 'Edit KPI' : 'Create New KPI'}
            </DialogTitle>
            <DialogDescription>
              Configure the key performance indicator to track progress towards your goal
            </DialogDescription>
          </DialogHeader>

          {editingKPI && (
            <Tabs defaultValue="basic" className="space-y-4">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="data">Data Source</TabsTrigger>
                <TabsTrigger value="baseline">Baseline</TabsTrigger>
                <TabsTrigger value="targets">Targets</TabsTrigger>
                <TabsTrigger value="validation">Validation</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="kpiName">KPI Name *</Label>
                    <Input
                      id="kpiName"
                      value={editingKPI.name || ''}
                      onChange={(e) => setEditingKPI({ ...editingKPI, name: e.target.value })}
                      placeholder="e.g., Total Scope 1 & 2 Emissions"
                    />
                  </div>
                  <div>
                    <Label htmlFor="kpiUnit">Unit *</Label>
                    <Input
                      id="kpiUnit"
                      value={editingKPI.unit || ''}
                      onChange={(e) => setEditingKPI({ ...editingKPI, unit: e.target.value })}
                      placeholder="e.g., tCO2e, %, kWh"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="kpiDescription">Description</Label>
                  <Textarea
                    id="kpiDescription"
                    value={editingKPI.description || ''}
                    onChange={(e) => setEditingKPI({ ...editingKPI, description: e.target.value })}
                    placeholder="Describe what this KPI measures and why it's important"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="reportingFrequency">Reporting Frequency</Label>
                    <Select
                      value={editingKPI.reportingFrequency}
                      onValueChange={(value) => setEditingKPI({ ...editingKPI, reportingFrequency: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="annual">Annual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="collectionMethod">Collection Method</Label>
                    <Select
                      value={editingKPI.collectionMethod}
                      onValueChange={(value) => setEditingKPI({ ...editingKPI, collectionMethod: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="automated">Automated</SelectItem>
                        <SelectItem value="manual">Manual</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="responsibleParty">Responsible Party</Label>
                  <Input
                    id="responsibleParty"
                    value={editingKPI.responsibleParty || ''}
                    onChange={(e) => setEditingKPI({ ...editingKPI, responsibleParty: e.target.value })}
                    placeholder="Who is responsible for tracking this KPI?"
                  />
                </div>
              </TabsContent>

              <TabsContent value="data" className="space-y-4">
                <Alert>
                  <Database className="h-4 w-4" />
                  <AlertDescription>
                    Link this KPI to existing data sources or define custom calculation logic.
                  </AlertDescription>
                </Alert>

                <div>
                  <Label htmlFor="dataHubMetric">Link to Data Hub Metric</Label>
                  <Select
                    value={editingKPI.dataHubMetricId || ''}
                    onValueChange={handleDataHubMetricSelect}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Data Hub metric" />
                    </SelectTrigger>
                    <SelectContent>
                      {dataHubMetrics.map((metric) => (
                        <SelectItem key={metric.id} value={metric.id}>
                          <div className="flex items-center gap-2">
                            <span>{metric.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {metric.unit}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {editingKPI.dataHubMetricId && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Data will be automatically pulled from the Data Hub
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="calculationLogic">Calculation Logic *</Label>
                  <Textarea
                    id="calculationLogic"
                    value={editingKPI.calculationLogic || ''}
                    onChange={(e) => setEditingKPI({ ...editingKPI, calculationLogic: e.target.value })}
                    placeholder="Describe how this KPI is calculated"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="formula">Formula (optional)</Label>
                  <Input
                    id="formula"
                    value={editingKPI.formula || ''}
                    onChange={(e) => setEditingKPI({ ...editingKPI, formula: e.target.value })}
                    placeholder="e.g., Scope1 + Scope2, or (A / B) * 100"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    For calculated KPIs, specify the mathematical formula
                  </p>
                </div>

                <div>
                  <Label htmlFor="dataSource">Data Source</Label>
                  <Input
                    id="dataSource"
                    value={editingKPI.dataSource || ''}
                    onChange={(e) => setEditingKPI({ ...editingKPI, dataSource: e.target.value })}
                    placeholder="e.g., Energy management system, HR database"
                  />
                </div>
              </TabsContent>

              <TabsContent value="baseline" className="space-y-4">
                <Alert>
                  <TrendingUp className="h-4 w-4" />
                  <AlertDescription>
                    Establish a baseline to measure progress against. This should be a reliable reference point.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="baselineValue">Baseline Value *</Label>
                    <Input
                      id="baselineValue"
                      type="number"
                      value={editingKPI.baseline?.value || ''}
                      onChange={(e) => setEditingKPI({
                        ...editingKPI,
                        baseline: { ...editingKPI.baseline!, value: parseFloat(e.target.value) || 0 }
                      })}
                      placeholder="Enter baseline value"
                    />
                  </div>

                  <div>
                    <Label htmlFor="baselinePeriod">Baseline Period</Label>
                    <Input
                      id="baselinePeriod"
                      value={editingKPI.baseline?.period || ''}
                      onChange={(e) => setEditingKPI({
                        ...editingKPI,
                        baseline: { ...editingKPI.baseline!, period: e.target.value }
                      })}
                      placeholder="e.g., 2023, Q1 2023"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="baselineDate">Established Date</Label>
                    <Input
                      id="baselineDate"
                      type="date"
                      value={editingKPI.baseline?.establishedDate || ''}
                      onChange={(e) => setEditingKPI({
                        ...editingKPI,
                        baseline: { ...editingKPI.baseline!, establishedDate: e.target.value }
                      })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="baselineConfidence">Confidence Level</Label>
                    <Select
                      value={editingKPI.baseline?.confidence}
                      onValueChange={(value) => setEditingKPI({
                        ...editingKPI,
                        baseline: { ...editingKPI.baseline!, confidence: value as any }
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select confidence" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="baselineSource">Baseline Source</Label>
                  <Input
                    id="baselineSource"
                    value={editingKPI.baseline?.source || ''}
                    onChange={(e) => setEditingKPI({
                      ...editingKPI,
                      baseline: { ...editingKPI.baseline!, source: e.target.value }
                    })}
                    placeholder="Source of baseline data"
                  />
                </div>
              </TabsContent>

              <TabsContent value="targets" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Performance Targets</h3>
                    <p className="text-sm text-muted-foreground">
                      Set interim and final targets for this KPI
                    </p>
                  </div>
                  <Button variant="outline" onClick={addTarget}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Target
                  </Button>
                </div>

                <div className="space-y-4">
                  {editingKPI.targetValues?.map((target, index) => (
                    <Card key={index}>
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium">Target {index + 1}</h4>
                          <Button variant="ghost" size="sm" onClick={() => removeTarget(index)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label>Type</Label>
                            <Select
                              value={target.type}
                              onValueChange={(value) => updateTarget(index, 'type', value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="interim">Interim</SelectItem>
                                <SelectItem value="final">Final</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label>Target Value</Label>
                            <Input
                              type="number"
                              value={target.value}
                              onChange={(e) => updateTarget(index, 'value', e.target.value)}
                              placeholder="Target value"
                            />
                          </div>

                          <div>
                            <Label>Target Date</Label>
                            <Input
                              type="date"
                              value={target.targetDate}
                              onChange={(e) => updateTarget(index, 'targetDate', e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="mt-4">
                          <Label>Description (optional)</Label>
                          <Input
                            value={target.description || ''}
                            onChange={(e) => updateTarget(index, 'description', e.target.value)}
                            placeholder="Describe this target"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {!editingKPI.targetValues || editingKPI.targetValues.length === 0 && (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-8">
                        <Target className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">No targets defined yet</p>
                        <Button variant="outline" onClick={addTarget} className="mt-2">
                          Add First Target
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="validation" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Validation Rules</h3>
                    <p className="text-sm text-muted-foreground">
                      Define rules to validate data quality and flag anomalies
                    </p>
                  </div>
                  <Button variant="outline" onClick={addValidationRule}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Rule
                  </Button>
                </div>

                <div className="space-y-4">
                  {editingKPI.validationRules?.map((rule, index) => (
                    <Card key={index}>
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium">Validation Rule {index + 1}</h4>
                          <Button variant="ghost" size="sm" onClick={() => removeValidationRule(index)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label>Rule Type</Label>
                            <Select
                              value={rule.type}
                              onValueChange={(value) => updateValidationRule(index, 'type', value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="range">Range Check</SelectItem>
                                <SelectItem value="trend">Trend Analysis</SelectItem>
                                <SelectItem value="consistency">Consistency Check</SelectItem>
                                <SelectItem value="completeness">Completeness Check</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label>Severity</Label>
                            <Select
                              value={rule.severity}
                              onValueChange={(value) => updateValidationRule(index, 'severity', value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="error">Error</SelectItem>
                                <SelectItem value="warning">Warning</SelectItem>
                                <SelectItem value="info">Info</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label>Status</Label>
                            <Badge variant="default">Active</Badge>
                          </div>
                        </div>

                        <div className="mt-4">
                          <Label>Description</Label>
                          <Input
                            value={rule.description}
                            onChange={(e) => updateValidationRule(index, 'description', e.target.value)}
                            placeholder="Describe this validation rule"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {!editingKPI.validationRules || editingKPI.validationRules.length === 0 && (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-8">
                        <AlertTriangle className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">No validation rules defined</p>
                        <Button variant="outline" onClick={addValidationRule} className="mt-2">
                          Add First Rule
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          )}

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveKPI}>
              <Save className="h-4 w-4 mr-2" />
              Save KPI
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 