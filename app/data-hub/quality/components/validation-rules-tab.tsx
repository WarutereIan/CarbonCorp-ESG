"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { 
  Plus, 
  Settings, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Brain,
  Eye,
  Edit,
  Trash2,
  Play,
  Pause
} from "lucide-react"
import { ValidationRule, ValidationRuleType, DataCategory, AnomalySeverity } from "@/types/data-quality"
import { getSeverityColor } from "@/lib/data-quality-utils"
import { useState } from "react"

interface ValidationRulesTabProps {
  validationRules: ValidationRule[]
  onCreateRule: (rule: Omit<ValidationRule, 'id' | 'createdAt' | 'createdBy' | 'violationCount'>) => void
  onUpdateRule: (id: string, updates: Partial<ValidationRule>) => void
  onDeleteRule: (id: string) => void
  onToggleRule: (id: string, enabled: boolean) => void
}

export function ValidationRulesTab({ 
  validationRules, 
  onCreateRule, 
  onUpdateRule, 
  onDeleteRule, 
  onToggleRule 
}: ValidationRulesTabProps) {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [selectedRule, setSelectedRule] = useState<ValidationRule | null>(null)
  const [newRule, setNewRule] = useState<Partial<ValidationRule>>({
    type: "range",
    category: "environmental",
    severity: "medium",
    enabled: true,
    parameters: {}
  })

  const handleCreateRule = () => {
    if (newRule.name && newRule.description && newRule.dataSource && newRule.field) {
      onCreateRule(newRule as Omit<ValidationRule, 'id' | 'createdAt' | 'createdBy' | 'violationCount'>)
      setNewRule({
        type: "range",
        category: "environmental", 
        severity: "medium",
        enabled: true,
        parameters: {}
      })
      setShowCreateForm(false)
    }
  }

  const getRuleTypeIcon = (type: ValidationRuleType) => {
    switch (type) {
      case "range": return "📊"
      case "format": return "📝"
      case "completeness": return "✅"
      case "consistency": return "🔗"
      case "threshold": return "⚠️"
      default: return "📋"
    }
  }

  const getRuleStatusColor = (rule: ValidationRule) => {
    if (!rule.enabled) return "bg-gray-100 text-gray-600"
    if (rule.violationCount > 0) return "bg-red-100 text-red-600"
    return "bg-green-100 text-green-600"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Data Validation Rules</h3>
          <p className="text-gray-600">Define and manage automated data quality checks</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Brain className="h-4 w-4 mr-2" />
            AI Suggestions
          </Button>
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Rule
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{validationRules.length}</div>
            <div className="text-sm text-gray-600">Total Rules</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {validationRules.filter(r => r.enabled).length}
            </div>
            <div className="text-sm text-gray-600">Active Rules</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">
              {validationRules.filter(r => r.violationCount > 0).length}
            </div>
            <div className="text-sm text-gray-600">Rules with Violations</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">
              {validationRules.reduce((sum, r) => sum + r.violationCount, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Violations</div>
          </CardContent>
        </Card>
      </div>

      {/* Create Rule Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Validation Rule</CardTitle>
            <CardDescription>Define parameters for automated data quality checking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rule-name">Rule Name</Label>
                <Input
                  id="rule-name"
                  placeholder="e.g., Energy Consumption Range Check"
                  value={newRule.name || ""}
                  onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rule-type">Rule Type</Label>
                <Select
                  value={newRule.type}
                  onValueChange={(value) => setNewRule({ ...newRule, type: value as ValidationRuleType })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="range">Range Check</SelectItem>
                    <SelectItem value="format">Format Validation</SelectItem>
                    <SelectItem value="completeness">Completeness Check</SelectItem>
                    <SelectItem value="consistency">Consistency Check</SelectItem>
                    <SelectItem value="threshold">Threshold Alert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rule-category">Category</Label>
                <Select
                  value={newRule.category}
                  onValueChange={(value) => setNewRule({ ...newRule, category: value as DataCategory })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="environmental">Environmental</SelectItem>
                    <SelectItem value="social">Social</SelectItem>
                    <SelectItem value="governance">Governance</SelectItem>
                    <SelectItem value="financial">Financial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rule-severity">Severity</Label>
                <Select
                  value={newRule.severity}
                  onValueChange={(value) => setNewRule({ ...newRule, severity: value as AnomalySeverity })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rule-data-source">Data Source</Label>
                <Input
                  id="rule-data-source"
                  placeholder="e.g., Energy Management System"
                  value={newRule.dataSource || ""}
                  onChange={(e) => setNewRule({ ...newRule, dataSource: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rule-field">Data Field</Label>
              <Input
                id="rule-field"
                placeholder="e.g., monthly_energy_consumption"
                value={newRule.field || ""}
                onChange={(e) => setNewRule({ ...newRule, field: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rule-description">Description</Label>
              <Textarea
                id="rule-description"
                placeholder="Describe what this rule validates and when it should trigger"
                value={newRule.description || ""}
                onChange={(e) => setNewRule({ ...newRule, description: e.target.value })}
              />
            </div>

            {/* Rule-specific parameters */}
            {newRule.type === "range" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Minimum Value</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    onChange={(e) => setNewRule({ 
                      ...newRule, 
                      parameters: { ...newRule.parameters, min: parseFloat(e.target.value) }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Maximum Value</Label>
                  <Input
                    type="number"
                    placeholder="1000"
                    onChange={(e) => setNewRule({ 
                      ...newRule, 
                      parameters: { ...newRule.parameters, max: parseFloat(e.target.value) }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Unit</Label>
                  <Input
                    placeholder="e.g., kWh, tonnes"
                    onChange={(e) => setNewRule({ 
                      ...newRule, 
                      parameters: { ...newRule.parameters, unit: e.target.value }
                    })}
                  />
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={newRule.enabled}
                  onCheckedChange={(checked) => setNewRule({ ...newRule, enabled: checked })}
                />
                <Label>Enable rule immediately</Label>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateRule}>
                  Create Rule
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Rules List */}
      <div className="space-y-4">
        {validationRules.map((rule) => (
          <Card key={rule.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lg">{getRuleTypeIcon(rule.type)}</span>
                    <div>
                      <h4 className="font-semibold">{rule.name}</h4>
                      <p className="text-sm text-gray-600">{rule.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-3">
                    <Badge variant="outline" className="capitalize">
                      {rule.type}
                    </Badge>
                    <Badge variant="outline" className="capitalize">
                      {rule.category}
                    </Badge>
                    <Badge className={getSeverityColor(rule.severity)}>
                      {rule.severity}
                    </Badge>
                    <Badge className={getRuleStatusColor(rule)}>
                      {rule.enabled ? (rule.violationCount > 0 ? "Violations" : "Active") : "Disabled"}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Data Source:</span> {rule.dataSource}
                    </div>
                    <div>
                      <span className="font-medium">Field:</span> {rule.field}
                    </div>
                    <div>
                      <span className="font-medium">Violations:</span> {rule.violationCount}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onToggleRule(rule.id, !rule.enabled)}
                  >
                    {rule.enabled ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedRule(rule)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {/* Edit functionality */}}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDeleteRule(rule.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {validationRules.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Validation Rules</h3>
            <p className="text-gray-600 mb-4">Create your first validation rule to start monitoring data quality automatically.</p>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Rule
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 