import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  ArrowRight, 
  Brain, 
  FileQuestion, 
  MessageSquareText, 
  TrendingUp,
  Target,
  Shield,
  Users,
  Calendar,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Zap,
  Activity
} from "lucide-react"
import Link from "next/link"
import { 
  mockMaterialityAssessments, 
  mockRiskScenarios, 
  mockGeneratedReports, 
  mockESGStrategies,
  mockAIInsights 
} from "@/data/mock-ai-engine"

export default function AIEnginePage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-700"
      case "in-progress": return "bg-blue-100 text-blue-700"
      case "running": return "bg-blue-100 text-blue-700"
      case "draft": return "bg-gray-100 text-gray-700"
      case "review": return "bg-yellow-100 text-yellow-700"
      case "published": return "bg-green-100 text-green-700"
      case "active": return "bg-green-100 text-green-700"
      case "approved": return "bg-green-100 text-green-700"
      default: return "bg-gray-100 text-gray-700"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-red-600"
      case "high": return "text-orange-600"
      case "medium": return "text-yellow-600"
      case "low": return "text-blue-600"
      default: return "text-gray-600"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-700"
      case "monitor": return "bg-yellow-100 text-yellow-700"
      case "consider": return "bg-blue-100 text-blue-700"
      default: return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Engine</h1>
          <p className="text-muted-foreground">AI-powered insights and analysis for your ESG data</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <MessageSquareText className="mr-2 h-4 w-4" />
            Ask AI Assistant
          </Button>
        </div>
      </div>

      <Tabs defaultValue="materiality" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="materiality">Materiality Assessment</TabsTrigger>
          <TabsTrigger value="risk">Risk Predictor</TabsTrigger>
          <TabsTrigger value="strategy">Strategy Builder</TabsTrigger>
        </TabsList>

        {/* Materiality Assessment Tab */}
        <TabsContent value="materiality" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Recent Materiality Assessments
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockMaterialityAssessments.map((assessment) => (
                    <div key={assessment.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium">{assessment.name}</h3>
                        <Badge className={getStatusColor(assessment.status)}>
                          {assessment.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Industry:</span>
                          <p className="font-medium">{assessment.industryContext.industry}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Regions:</span>
                          <p className="font-medium">{assessment.industryContext.regions.join(", ")}</p>
                        </div>
                      </div>

                      {assessment.status === "completed" && assessment.materialTopics.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium mb-2">Top Material Topics</h4>
                          <div className="flex flex-wrap gap-2">
                            {assessment.materialTopics.slice(0, 3).map((topic) => (
                              <Badge key={topic.id} className={getPriorityColor(topic.priority)}>
                                {topic.name}
                              </Badge>
                            ))}
                            {assessment.materialTopics.length > 3 && (
                              <Badge variant="outline">+{assessment.materialTopics.length - 3} more</Badge>
                            )}
                          </div>
                        </div>
                      )}

                      {assessment.status === "in-progress" && (
                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progress</span>
                            <span>{assessment.assessmentMetadata.completedSteps}/{assessment.assessmentMetadata.totalSteps} steps</span>
                          </div>
                          <Progress 
                            value={(assessment.assessmentMetadata.completedSteps / assessment.assessmentMetadata.totalSteps) * 100} 
                            className="h-2" 
                          />
                        </div>
                      )}

                      <div className="flex justify-between items-center mt-4 pt-3 border-t">
                        <span className="text-xs text-muted-foreground">
                          Last modified: {new Date(assessment.lastModified).toLocaleDateString()}
                        </span>
                        <Button size="sm" variant="outline">
                          {assessment.status === "completed" ? "View Results" : "Continue"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {mockMaterialityAssessments.filter(a => a.status === "completed").length}
                    </div>
                    <p className="text-sm text-muted-foreground">Completed Assessments</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {mockMaterialityAssessments[0]?.materialTopics.filter(t => t.priority === "high").length || 0}
                    </div>
                    <p className="text-sm text-muted-foreground">High Priority Topics</p>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {mockMaterialityAssessments.filter(a => a.status === "in-progress").length}
                    </div>
                    <p className="text-sm text-muted-foreground">In Progress</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">AI Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <Brain className="h-4 w-4 text-blue-600 mt-0.5" />
                      <p>Energy Management and GHG Emissions are consistently high priority across assessments</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Brain className="h-4 w-4 text-blue-600 mt-0.5" />
                      <p>Your industry shows 23% higher focus on water management compared to global average</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col gap-2">
                <Link href="/ai-engine/materiality">
                  <Button className="w-full">
                    Start New Assessment <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" className="w-full">
                  View All Assessments
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Risk Predictor Tab */}
        <TabsContent value="risk" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Risk Scenarios & Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockRiskScenarios.map((scenario) => (
                    <div key={scenario.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium">{scenario.name}</h3>
                        <Badge className={getStatusColor(scenario.status)}>
                          {scenario.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                        <div>
                          <span className="text-muted-foreground">Type:</span>
                          <p className="font-medium capitalize">{scenario.type.replace("-", " ")}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Time Horizon:</span>
                          <p className="font-medium capitalize">{scenario.config.timeHorizon}-term</p>
                        </div>
                      </div>

                      {scenario.results && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm font-medium">Overall Risk Score</span>
                            <span className={`text-lg font-bold ${scenario.results.overallRiskScore >= 7 ? 'text-red-600' : scenario.results.overallRiskScore >= 5 ? 'text-orange-600' : 'text-green-600'}`}>
                              {scenario.results.overallRiskScore}/10
                            </span>
                          </div>

                          <div className="grid grid-cols-3 gap-3 text-sm">
                            <div className="text-center">
                              <div className="text-red-600 font-semibold">{scenario.results.financialImpact.revenueRisk}%</div>
                              <div className="text-muted-foreground">Revenue Risk</div>
                            </div>
                            <div className="text-center">
                              <div className="text-orange-600 font-semibold">+{scenario.results.financialImpact.costIncrease}%</div>
                              <div className="text-muted-foreground">Cost Increase</div>
                            </div>
                            <div className="text-center">
                              <div className="text-blue-600 font-semibold">{scenario.results.financialImpact.assetRisk}%</div>
                              <div className="text-muted-foreground">Asset Risk</div>
                            </div>
                          </div>

                          <div className="pt-2">
                            <h4 className="text-sm font-medium mb-2">Top Risk Categories</h4>
                            <div className="space-y-1">
                              {scenario.results.riskCategories.slice(0, 2).map((risk, idx) => (
                                <div key={idx} className="flex items-center justify-between text-sm">
                                  <span>{risk.category}</span>
                                  <span className={getSeverityColor(risk.severity)}>
                                    {risk.severity} ({(risk.probability * 100).toFixed(0)}%)
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {scenario.status === "running" && (
                        <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                          <Activity className="h-4 w-4 text-blue-600 animate-pulse" />
                          <span className="text-sm text-blue-700">Analysis in progress...</span>
                        </div>
                      )}

                      <div className="flex justify-between items-center mt-4 pt-3 border-t">
                        <span className="text-xs text-muted-foreground">
                          {scenario.lastRun ? `Last run: ${new Date(scenario.lastRun).toLocaleDateString()}` : `Created: ${new Date(scenario.createdAt).toLocaleDateString()}`}
                        </span>
                        <Button size="sm" variant="outline">
                          {scenario.results ? "View Details" : "Configure & Run"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Risk Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {mockRiskScenarios.filter(s => s.results && s.results.overallRiskScore >= 7).length}
                    </div>
                    <p className="text-sm text-muted-foreground">High Risk Scenarios</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {mockRiskScenarios.filter(s => s.status === "completed").length}
                    </div>
                    <p className="text-sm text-muted-foreground">Completed Analyses</p>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {mockRiskScenarios.filter(s => s.status === "running").length}
                    </div>
                    <p className="text-sm text-muted-foreground">Currently Running</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Scenario Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Climate Risks</span>
                      <span className="font-medium">2</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Supply Chain</span>
                      <span className="font-medium">1</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Regulatory</span>
                      <span className="font-medium">1</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col gap-2">
                <Link href="/ai-engine/risk-predictor">
                  <Button className="w-full">
                    Create New Scenario <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" className="w-full">
                  Compare Scenarios
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Strategy Builder Tab */}
        <TabsContent value="strategy" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    ESG Strategies
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockESGStrategies.map((strategy) => (
                    <div key={strategy.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium">{strategy.name}</h3>
                        <Badge className={getStatusColor(strategy.status)}>
                          {strategy.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                        <div>
                          <span className="text-muted-foreground">Time Horizon:</span>
                          <p className="font-medium">{strategy.timeHorizon}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Scope:</span>
                          <p className="font-medium capitalize">{strategy.scope.replace("-", " ")}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm font-medium">Overall Progress</span>
                          <span className="text-lg font-bold text-blue-600">
                            {strategy.implementation.overallProgress}%
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="text-center">
                            <div className="font-semibold">{strategy.pillars.length}</div>
                            <div className="text-muted-foreground">Strategic Pillars</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold">{strategy.implementation.totalInitiatives}</div>
                            <div className="text-muted-foreground">Total Initiatives</div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Strategic Pillars</h4>
                          {strategy.pillars.map((pillar) => (
                            <div key={pillar.id} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                              <span>{pillar.name}</span>
                              <div className="flex items-center gap-2">
                                <Progress value={pillar.progress} className="w-16 h-2" />
                                <span className="text-xs font-medium w-8">{pillar.progress}%</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {strategy.linkedMaterialityAssessment && (
                          <div className="flex items-center gap-2 text-sm text-blue-600">
                            <Target className="h-4 w-4" />
                            <span>Linked to Materiality Assessment</span>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between items-center mt-4 pt-3 border-t">
                        <span className="text-xs text-muted-foreground">
                          Last modified: {new Date(strategy.lastModified).toLocaleDateString()}
                        </span>
                        <Button size="sm" variant="outline">
                          {strategy.status === "draft" ? "Continue Building" : "View Strategy"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Strategy Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {mockESGStrategies.filter(s => s.status === "active").length}
                    </div>
                    <p className="text-sm text-muted-foreground">Active Strategies</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {mockESGStrategies.reduce((acc, s) => acc + s.implementation.totalInitiatives, 0)}
                    </div>
                    <p className="text-sm text-muted-foreground">Total Initiatives</p>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {Math.round(mockESGStrategies.reduce((acc, s) => acc + s.implementation.overallProgress, 0) / mockESGStrategies.length)}%
                    </div>
                    <p className="text-sm text-muted-foreground">Avg. Progress</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">AI Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <Brain className="h-4 w-4 text-blue-600 mt-0.5" />
                      <p>Consider linking risk scenarios to strategy pillars for enhanced resilience planning</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Brain className="h-4 w-4 text-blue-600 mt-0.5" />
                      <p>Renewable energy transition showing strong progress - consider accelerating timeline</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col gap-2">
                <Link href="/ai-engine/strategy-builder">
                  <Button className="w-full">
                    Create New Strategy <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" className="w-full">
                  View All Strategies
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* AI Insights Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Brain className="h-4 w-4" />
            AI Insights Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-xl font-bold text-blue-600">{mockAIInsights.totalInsights}</div>
              <p className="text-sm text-muted-foreground">Total Insights</p>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-red-600">{mockAIInsights.bySeverity.critical}</div>
              <p className="text-sm text-muted-foreground">Critical Issues</p>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-orange-600">{mockAIInsights.actionableItems}</div>
              <p className="text-sm text-muted-foreground">Action Required</p>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-green-600">{mockAIInsights.byType.recommendation}</div>
              <p className="text-sm text-muted-foreground">Recommendations</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Recent Insights</h4>
            {mockAIInsights.recentInsights.slice(0, 3).map((insight) => (
              <div key={insight.id} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                <span>{insight.title}</span>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={getSeverityColor(insight.severity)}>
                    {insight.severity}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(insight.timestamp).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
