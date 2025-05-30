"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft, 
  ArrowRight, 
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Zap,
  Thermometer,
  Factory,
  Gavel,
  Users,
  Globe,
  BarChart3,
  PieChart,
  Target,
  Download,
  RefreshCw,
  Calendar,
  DollarSign,
  Shield,
  Brain,
  Lightbulb
} from "lucide-react"

// Scenario types and their parameters
const scenarioTypes = [
  {
    id: "climate-physical",
    name: "Climate Change - Physical Risks",
    icon: Thermometer,
    description: "Model impacts of changing weather patterns, extreme events, and temperature rise",
    parameters: [
      { id: "temp-rise", name: "Temperature Rise", type: "select", options: ["1.5°C", "2°C", "3°C", "4°C+"], default: "2°C" },
      { id: "sea-level", name: "Sea Level Rise (cm)", type: "slider", min: 0, max: 100, default: 30 },
      { id: "extreme-events", name: "Extreme Weather Frequency", type: "select", options: ["Current", "50% Increase", "100% Increase", "200% Increase"], default: "50% Increase" },
      { id: "precipitation", name: "Precipitation Change", type: "select", options: ["-30%", "-10%", "No Change", "+10%", "+30%"], default: "No Change" }
    ]
  },
  {
    id: "climate-transition",
    name: "Climate Change - Transition Risks",
    icon: Zap,
    description: "Assess risks from policy changes, technology shifts, and market transitions to low-carbon economy",
    parameters: [
      { id: "carbon-price", name: "Carbon Price (USD/tCO2)", type: "slider", min: 0, max: 200, default: 50 },
      { id: "renewable-adoption", name: "Renewable Energy Adoption", type: "select", options: ["Gradual", "Accelerated", "Rapid", "Disruptive"], default: "Accelerated" },
      { id: "stranded-assets", name: "Stranded Asset Risk", type: "select", options: ["Low", "Medium", "High", "Very High"], default: "Medium" },
      { id: "green-finance", name: "Green Finance Requirements", type: "select", options: ["Voluntary", "Encouraged", "Mandatory", "Strictly Enforced"], default: "Encouraged" }
    ]
  },
  {
    id: "regulatory",
    name: "Regulatory Changes",
    icon: Gavel,
    description: "Model impacts of new ESG regulations, disclosure requirements, and compliance costs",
    parameters: [
      { id: "disclosure-scope", name: "ESG Disclosure Scope", type: "select", options: ["Current", "CSRD-like", "Comprehensive", "Full Value Chain"], default: "CSRD-like" },
      { id: "carbon-tax", name: "Carbon Tax (USD/tCO2)", type: "slider", min: 0, max: 150, default: 25 },
      { id: "supply-chain-reqs", name: "Supply Chain Requirements", type: "select", options: ["None", "Tier 1 Only", "Tier 1-2", "Full Traceability"], default: "Tier 1 Only" },
      { id: "penalties", name: "Non-compliance Penalties", type: "select", options: ["Minimal", "Moderate", "Severe", "Extremely Severe"], default: "Moderate" }
    ]
  },
  {
    id: "market-disruption",
    name: "Market Disruption",
    icon: TrendingDown,
    description: "Analyze impacts of market shifts, consumer behavior changes, and competitive pressures",
    parameters: [
      { id: "consumer-preference", name: "Sustainable Product Preference", type: "slider", min: 0, max: 100, default: 60 },
      { id: "investor-pressure", name: "ESG Investor Pressure", type: "select", options: ["Low", "Moderate", "High", "Extreme"], default: "High" },
      { id: "competitor-advantage", name: "Competitor ESG Advantage", type: "select", options: ["None", "Slight", "Significant", "Dominant"], default: "Slight" },
      { id: "market-access", name: "ESG-linked Market Access", type: "select", options: ["No Impact", "Minor Barriers", "Major Barriers", "Market Exclusion"], default: "Minor Barriers" }
    ]
  },
  {
    id: "social-unrest",
    name: "Social & Political Risks",
    icon: Users,
    description: "Assess risks from social movements, political instability, and stakeholder activism",
    parameters: [
      { id: "activism-level", name: "Environmental/Social Activism", type: "select", options: ["Low", "Moderate", "High", "Very High"], default: "Moderate" },
      { id: "political-stability", name: "Political Stability", type: "select", options: ["Stable", "Some Uncertainty", "Unstable", "Very Unstable"], default: "Some Uncertainty" },
      { id: "labor-relations", name: "Labor Relations Risk", type: "select", options: ["Good", "Fair", "Poor", "Critical"], default: "Fair" },
      { id: "community-opposition", name: "Community Opposition", type: "select", options: ["None", "Minor", "Moderate", "Strong"], default: "Minor" }
    ]
  },
  {
    id: "supply-chain",
    name: "Supply Chain Disruption",
    icon: Factory,
    description: "Model supply chain risks from ESG issues, resource scarcity, and disruptions",
    parameters: [
      { id: "resource-scarcity", name: "Critical Resource Scarcity", type: "select", options: ["None", "Water", "Raw Materials", "Multiple Resources"], default: "None" },
      { id: "supplier-esg-risk", name: "Supplier ESG Risk", type: "select", options: ["Low", "Medium", "High", "Critical"], default: "Medium" },
      { id: "geographic-risk", name: "Geographic Concentration Risk", type: "select", options: ["Diversified", "Moderate", "High", "Very High"], default: "Moderate" },
      { id: "alternative-suppliers", name: "Alternative Supplier Availability", type: "select", options: ["Many", "Some", "Few", "None"], default: "Some" }
    ]
  }
]

const timeHorizons = [
  { id: "short", name: "Short-term (1-3 years)", description: "Immediate operational impacts" },
  { id: "medium", name: "Medium-term (3-10 years)", description: "Strategic and structural changes" },
  { id: "long", name: "Long-term (10+ years)", description: "Fundamental transformation" }
]

const organizationalScopes = [
  { id: "whole-org", name: "Whole Organization", description: "All operations and subsidiaries" },
  { id: "business-unit", name: "Specific Business Unit", description: "Individual division or segment" },
  { id: "facilities", name: "Key Facilities", description: "Critical operational sites" },
  { id: "product-lines", name: "Product Lines", description: "Specific products or services" },
  { id: "supply-chain", name: "Supply Chain Tiers", description: "Supplier network levels" }
]

export default function RiskPredictorPage() {
  const router = useRouter()
  const [selectedScenario, setSelectedScenario] = useState<string>("")
  const [scenarioConfig, setScenarioConfig] = useState<Record<string, any>>({})
  const [timeHorizon, setTimeHorizon] = useState<string>("medium")
  const [scope, setScope] = useState<string>("whole-org")
  const [advancedSettings, setAdvancedSettings] = useState({
    confidenceInterval: 90,
    methodology: "monte-carlo",
    iterations: 10000,
    includeSecondOrder: true
  })
  const [isRunning, setIsRunning] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [savedScenarios, setSavedScenarios] = useState<any[]>([])

  const runScenarioAnalysis = () => {
    setIsRunning(true)
    
    // Simulate scenario analysis
    setTimeout(() => {
      const mockResults = {
        scenario: selectedScenario,
        timeHorizon,
        scope,
        confidence: advancedSettings.confidenceInterval,
        financialImpact: {
          revenueRisk: {
            low: -2.5,
            medium: -8.2,
            high: -15.7,
            probability: 0.68
          },
          costIncrease: {
            low: 1.2,
            medium: 4.8,
            high: 12.3,
            probability: 0.75
          },
          assetRisk: {
            low: -0.5,
            medium: -3.2,
            high: -8.9,
            probability: 0.45
          }
        },
        operationalImpact: {
          productionDisruption: 0.12,
          supplyChainDelay: 0.28,
          regulatoryCompliance: 0.65
        },
        riskHeatmap: [
          { category: "Financial", severity: "High", probability: "Medium", impact: 8.2 },
          { category: "Operational", severity: "Medium", probability: "High", impact: 6.5 },
          { category: "Reputational", severity: "Medium", probability: "Medium", impact: 5.8 },
          { category: "Regulatory", severity: "High", probability: "High", impact: 9.1 },
          { category: "Strategic", severity: "Low", probability: "Low", impact: 3.2 }
        ],
        opportunities: [
          { type: "Market Leadership", impact: "+12%", probability: 0.35 },
          { type: "Cost Efficiency", impact: "+8%", probability: 0.55 },
          { type: "New Markets", impact: "+25%", probability: 0.15 }
        ],
        recommendations: [
          {
            priority: "High",
            action: "Implement carbon pricing strategy",
            timeline: "6 months",
            investment: "$2.5M",
            effectiveness: 0.75
          },
          {
            priority: "Medium", 
            action: "Diversify supply chain",
            timeline: "12 months",
            investment: "$1.8M",
            effectiveness: 0.65
          },
          {
            priority: "High",
            action: "Enhance ESG disclosure capabilities",
            timeline: "9 months", 
            investment: "$800K",
            effectiveness: 0.80
          }
        ]
      }
      
      setResults(mockResults)
      setIsRunning(false)
    }, 3000)
  }

  const selectedScenarioType = scenarioTypes.find(s => s.id === selectedScenario)

  const saveScenario = () => {
    if (results) {
      const savedScenario = {
        id: Date.now().toString(),
        name: `${selectedScenarioType?.name} - ${new Date().toLocaleDateString()}`,
        config: scenarioConfig,
        results: results,
        timeHorizon,
        scope
      }
      setSavedScenarios([...savedScenarios, savedScenario])
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => router.push("/ai-engine")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to AI Engine
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">ESG Risk Predictor</h1>
            <p className="text-muted-foreground">
              Model and analyze potential ESG risks across different scenarios
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" disabled={!results} onClick={saveScenario}>
            Save Scenario
          </Button>
          <Button variant="outline" disabled={savedScenarios.length === 0}>
            Compare Scenarios ({savedScenarios.length})
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scenario Builder */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Scenario Configuration</CardTitle>
              <CardDescription>
                Configure the risk scenario parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Scenario Type Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Scenario Type</Label>
                <div className="space-y-2">
                  {scenarioTypes.map((scenario) => {
                    const IconComponent = scenario.icon
                    return (
                      <Card 
                        key={scenario.id}
                        className={`cursor-pointer transition-all p-3 ${
                          selectedScenario === scenario.id 
                            ? "border-blue-500 bg-blue-50" 
                            : "hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedScenario(scenario.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                            <IconComponent className="h-4 w-4 text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{scenario.name}</h4>
                            <p className="text-xs text-gray-600 mt-1">{scenario.description}</p>
                          </div>
                        </div>
                      </Card>
                    )
                  })}
                </div>
              </div>

              {/* Parameter Configuration */}
              {selectedScenarioType && (
                <div className="space-y-4">
                  <Separator />
                  <Label className="text-sm font-medium">Scenario Parameters</Label>
                  
                  {selectedScenarioType.parameters.map((param) => (
                    <div key={param.id} className="space-y-2">
                      <Label className="text-xs">{param.name}</Label>
                      {param.type === "select" ? (
                        <Select 
                          value={scenarioConfig[param.id] || param.default}
                          onValueChange={(value) => setScenarioConfig({
                            ...scenarioConfig,
                            [param.id]: value
                          })}
                        >
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {param.options?.map((option) => (
                              <SelectItem key={option} value={option} className="text-xs">
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : param.type === "slider" ? (
                        <div className="space-y-2">
                          <Slider
                            value={[scenarioConfig[param.id] || param.default]}
                            onValueChange={(value) => setScenarioConfig({
                              ...scenarioConfig,
                              [param.id]: value[0]
                            })}
                            min={param.min}
                            max={param.max}
                            step={1}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>{param.min}</span>
                            <span className="font-medium">
                              {scenarioConfig[param.id] || param.default}
                            </span>
                            <span>{param.max}</span>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              )}

              {/* Time Horizon & Scope */}
              <div className="space-y-4">
                <Separator />
                
                <div>
                  <Label className="text-sm font-medium">Time Horizon</Label>
                  <Select value={timeHorizon} onValueChange={setTimeHorizon}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timeHorizons.map((horizon) => (
                        <SelectItem key={horizon.id} value={horizon.id}>
                          <div>
                            <div className="font-medium">{horizon.name}</div>
                            <div className="text-xs text-gray-500">{horizon.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium">Organizational Scope</Label>
                  <Select value={scope} onValueChange={setScope}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {organizationalScopes.map((scopeOption) => (
                        <SelectItem key={scopeOption.id} value={scopeOption.id}>
                          <div>
                            <div className="font-medium">{scopeOption.name}</div>
                            <div className="text-xs text-gray-500">{scopeOption.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Advanced Settings */}
              <div className="space-y-4">
                <Separator />
                <Label className="text-sm font-medium">Advanced Settings</Label>
                
                <div>
                  <Label className="text-xs">Confidence Interval (%)</Label>
                  <Slider
                    value={[advancedSettings.confidenceInterval]}
                    onValueChange={(value) => setAdvancedSettings({
                      ...advancedSettings,
                      confidenceInterval: value[0]
                    })}
                    min={80}
                    max={99}
                    step={1}
                    className="w-full mt-2"
                  />
                  <div className="text-center text-xs text-gray-500 mt-1">
                    {advancedSettings.confidenceInterval}%
                  </div>
                </div>

                <div>
                  <Label className="text-xs">Methodology</Label>
                  <Select 
                    value={advancedSettings.methodology}
                    onValueChange={(value) => setAdvancedSettings({
                      ...advancedSettings,
                      methodology: value
                    })}
                  >
                    <SelectTrigger className="mt-2 h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monte-carlo">Monte Carlo Simulation</SelectItem>
                      <SelectItem value="value-at-risk">Value at Risk (VaR)</SelectItem>
                      <SelectItem value="scenario-analysis">Scenario Analysis</SelectItem>
                      <SelectItem value="stress-testing">Stress Testing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                className="w-full" 
                onClick={runScenarioAnalysis}
                disabled={!selectedScenario || isRunning}
              >
                {isRunning ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Running Analysis...
                  </>
                ) : (
                  <>
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Run Scenario Analysis
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results Dashboard */}
        <div className="lg:col-span-2 space-y-6">
          {isRunning && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Brain className="h-5 w-5 text-blue-600 animate-pulse" />
                  <div>
                    <h3 className="font-medium">AI Risk Analysis in Progress</h3>
                    <p className="text-sm text-gray-600">
                      Running {advancedSettings.methodology} with {advancedSettings.iterations.toLocaleString()} iterations
                    </p>
                  </div>
                </div>
                <Progress value={75} className="h-2" />
                <p className="text-xs text-gray-500 mt-2">
                  Analyzing scenario impacts across financial, operational, and strategic dimensions...
                </p>
              </CardContent>
            </Card>
          )}

          {results && (
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="financial">Financial Impact</TabsTrigger>
                <TabsTrigger value="operational">Operational Risk</TabsTrigger>
                <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-red-600" />
                        <span className="text-sm font-medium">Revenue at Risk</span>
                      </div>
                      <div className="text-2xl font-bold text-red-600 mt-2">
                        {results.financialImpact.revenueRisk.medium}%
                      </div>
                      <p className="text-xs text-gray-600">
                        Medium scenario ({results.confidence}% confidence)
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-yellow-600" />
                        <span className="text-sm font-medium">Cost Increase</span>
                      </div>
                      <div className="text-2xl font-bold text-yellow-600 mt-2">
                        +{results.financialImpact.costIncrease.medium}%
                      </div>
                      <p className="text-xs text-gray-600">
                        Operational cost impact
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">Overall Risk Score</span>
                      </div>
                      <div className="text-2xl font-bold text-blue-600 mt-2">7.2</div>
                      <p className="text-xs text-gray-600">
                        High risk level
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Risk Heatmap</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {results.riskHeatmap.map((risk: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${
                              risk.severity === "High" ? "bg-red-500" :
                              risk.severity === "Medium" ? "bg-yellow-500" :
                              "bg-green-500"
                            }`} />
                            <div>
                              <h4 className="font-medium text-sm">{risk.category}</h4>
                              <p className="text-xs text-gray-600">
                                {risk.severity} severity • {risk.probability} probability
                              </p>
                            </div>
                          </div>
                          <div className="text-lg font-bold">{risk.impact}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="financial" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Revenue Risk Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Low Scenario</span>
                          <span className="font-medium text-green-600">
                            {results.financialImpact.revenueRisk.low}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Medium Scenario</span>
                          <span className="font-medium text-yellow-600">
                            {results.financialImpact.revenueRisk.medium}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">High Scenario</span>
                          <span className="font-medium text-red-600">
                            {results.financialImpact.revenueRisk.high}%
                          </span>
                        </div>
                        <div className="pt-2 border-t">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Probability of Impact</span>
                            <span className="font-bold">
                              {(results.financialImpact.revenueRisk.probability * 100).toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Cost Impact Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Compliance Costs</span>
                          <span className="font-medium">+{results.financialImpact.costIncrease.low}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Operational Adjustments</span>
                          <span className="font-medium">+{results.financialImpact.costIncrease.medium}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Crisis Response</span>
                          <span className="font-medium">+{results.financialImpact.costIncrease.high}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="opportunities" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Identified Opportunities</CardTitle>
                    <CardDescription>
                      Potential positive outcomes from proactive ESG management
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {results.opportunities.map((opp: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-green-50">
                          <div className="flex items-center space-x-3">
                            <Lightbulb className="h-5 w-5 text-green-600" />
                            <div>
                              <h4 className="font-medium text-sm">{opp.type}</h4>
                              <p className="text-xs text-gray-600">
                                {(opp.probability * 100).toFixed(0)}% probability
                              </p>
                            </div>
                          </div>
                          <div className="text-lg font-bold text-green-600">{opp.impact}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="recommendations" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">AI-Generated Recommendations</CardTitle>
                    <CardDescription>
                      Strategic actions to mitigate risks and capture opportunities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {results.recommendations.map((rec: any, index: number) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <Badge variant={rec.priority === "High" ? "destructive" : "secondary"}>
                                {rec.priority} Priority
                              </Badge>
                              <h4 className="font-medium text-sm">{rec.action}</h4>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium">{rec.investment}</div>
                              <div className="text-xs text-gray-600">{rec.timeline}</div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600">Effectiveness</span>
                            <div className="flex items-center space-x-2">
                              <Progress value={rec.effectiveness * 100} className="w-20 h-2" />
                              <span className="text-xs font-medium">
                                {(rec.effectiveness * 100).toFixed(0)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}

          {!results && !isRunning && (
            <Card>
              <CardContent className="pt-12 pb-12 text-center">
                <AlertTriangle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="font-medium text-gray-600 mb-2">No Analysis Results</h3>
                <p className="text-sm text-gray-500">
                  Configure a scenario and run the analysis to see risk predictions and insights
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {results && (
        <div className="flex justify-end space-x-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Scenario Report
          </Button>
          <Button onClick={() => router.push("/ai-engine/strategy-builder")}>
            Link Risks to ESG Strategy
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
} 