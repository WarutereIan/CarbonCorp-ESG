import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Loader2,
  Brain,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Target,
  DollarSign,
  Shield,
  Users,
  BarChart3,
  FileText,
  Lightbulb,
  Clock,
  Building
} from "lucide-react"

// Import types from strategy-types.ts instead of defining locally
import type { 
  StrategyScope, 
  StrategyBlueprint, 
  StrategicPillar, 
  StrategicObjective, 
  StrategicInitiative 
} from "../types/strategy-types"

interface AIBlueprintGeneratorProps {
  scope: StrategyScope
  onBlueprintGenerated: (blueprint: StrategyBlueprint) => void
  onBack: () => void
}

export function AIBlueprintGenerator({ scope, onBlueprintGenerated, onBack }: AIBlueprintGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [currentPhase, setCurrentPhase] = useState('')
  const [blueprint, setBlueprint] = useState<StrategyBlueprint | null>(null)
  const [generationLog, setGenerationLog] = useState<string[]>([])

  const generationPhases = [
    { name: 'Analyzing industry context and materiality', progress: 15 },
    { name: 'Generating strategic framework', progress: 30 },
    { name: 'Defining objectives and initiatives', progress: 50 },
    { name: 'Mapping regulatory requirements', progress: 65 },
    { name: 'Estimating resources and timelines', progress: 80 },
    { name: 'Conducting risk and opportunity analysis', progress: 90 },
    { name: 'Finalizing benchmark insights', progress: 100 }
  ]

  useEffect(() => {
    if (isGenerating) {
      generateBlueprint()
    }
  }, [isGenerating])

  const generateBlueprint = async () => {
    setGenerationLog([])
    
    for (let i = 0; i < generationPhases.length; i++) {
      const phase = generationPhases[i]
      setCurrentPhase(phase.name)
      setGenerationProgress(phase.progress)
      
      // Add log entry
      setGenerationLog(prev => [...prev, `✓ ${phase.name}`])
      
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000))
    }

    // Generate the actual blueprint based on the scope
    const generatedBlueprint = await generateAIBlueprint(scope)
    setBlueprint(generatedBlueprint)
    setIsGenerating(false)
    
    // Auto-proceed after brief delay
    setTimeout(() => {
      onBlueprintGenerated(generatedBlueprint)
    }, 2000)
  }

  const generateAIBlueprint = async (scope: StrategyScope): Promise<StrategyBlueprint> => {
    // Simulate AI blueprint generation based on scope and themes
    const themes = scope.strategicThemes
    const timeHorizon = scope.timeHorizon
    
    // Generate strategic pillars based on themes
    const strategicPillars: StrategicPillar[] = []
    
    // Environmental pillar if relevant themes exist
    const envThemes = themes.filter(t => 
      t.toLowerCase().includes('climate') || 
      t.toLowerCase().includes('environment') || 
      t.toLowerCase().includes('carbon') ||
      t.toLowerCase().includes('water') ||
      t.toLowerCase().includes('waste')
    )
    
    if (envThemes.length > 0) {
      strategicPillars.push({
        id: 'environmental-stewardship',
        name: 'Environmental Stewardship',
        description: 'Drive environmental sustainability through comprehensive resource management, emissions reduction, and circular economy practices.',
        relatedThemes: envThemes,
        estimatedImpact: 'high',
        feasibilityScore: 8.2,
        objectives: [
          {
            id: 'env-obj-1',
            name: 'Carbon Neutrality Pathway',
            description: 'Establish and execute a science-based pathway to achieve carbon neutrality across operations',
            timeframe: timeHorizon === '1-year' ? '12 months' : timeHorizon === '3-years' ? '36 months' : '60 months',
            targetMetrics: ['Scope 1 & 2 Emissions (tCO2e)', 'Renewable Energy %', 'Energy Intensity (kWh/unit)'],
            regulatoryAlignment: ['CSRD ESRS E1', 'ISSB S2', 'TCFD'],
            stakeholderBenefit: ['Investor confidence', 'Customer preference', 'Regulatory compliance'],
            initiatives: [
              {
                id: 'env-init-1',
                name: 'Energy Efficiency Program',
                description: 'Comprehensive energy audit and efficiency improvements across all facilities',
                owner: 'Operations Team',
                timeline: '6-12 months',
                budgetRange: '$500K - $1.5M',
                status: 'not-started',
                priority: 'high',
                dependencies: ['Facility assessment completion'],
                riskFactors: ['Capital availability', 'Operational disruption'],
                expectedOutcomes: ['15-25% energy reduction', 'Cost savings of $200K annually']
              },
              {
                id: 'env-init-2',
                name: 'Renewable Energy Transition',
                description: 'Install solar panels and procure renewable energy certificates',
                owner: 'Facilities Team',
                timeline: '12-18 months',
                budgetRange: '$2M - $5M',
                status: 'not-started',
                priority: 'critical',
                dependencies: ['Board approval', 'Site assessments'],
                riskFactors: ['Grid integration', 'Permitting delays'],
                expectedOutcomes: ['50% renewable energy by 2026', '40% Scope 2 emissions reduction']
              }
            ]
          }
        ]
      })
    }

    // Social pillar for people-related themes
    const socialThemes = themes.filter(t => 
      t.toLowerCase().includes('diversity') || 
      t.toLowerCase().includes('inclusion') || 
      t.toLowerCase().includes('employee') ||
      t.toLowerCase().includes('social') ||
      t.toLowerCase().includes('community') ||
      t.toLowerCase().includes('human')
    )
    
    if (socialThemes.length > 0) {
      strategicPillars.push({
        id: 'people-community',
        name: 'People & Community Excellence',
        description: 'Foster inclusive workplaces, ensure employee wellbeing, and strengthen community relationships through purposeful engagement.',
        relatedThemes: socialThemes,
        estimatedImpact: 'medium',
        feasibilityScore: 7.8,
        objectives: [
          {
            id: 'social-obj-1',
            name: 'Diversity & Inclusion Leadership',
            description: 'Build and maintain a diverse, inclusive workplace culture with measurable impact',
            timeframe: timeHorizon === '1-year' ? '12 months' : '24 months',
            targetMetrics: ['Gender Diversity %', 'Leadership Diversity %', 'Employee Engagement Score', 'Pay Equity Ratio'],
            regulatoryAlignment: ['CSRD ESRS S1', 'GRI 405'],
            stakeholderBenefit: ['Employee satisfaction', 'Talent attraction', 'Innovation capacity'],
            initiatives: [
              {
                id: 'social-init-1',
                name: 'Comprehensive D&I Program',
                description: 'Multi-faceted diversity and inclusion program with training, mentorship, and accountability',
                owner: 'Chief People Officer',
                timeline: '6 months implementation, ongoing',
                budgetRange: '$200K - $500K',
                status: 'not-started',
                priority: 'high',
                dependencies: ['Leadership commitment', 'Training curriculum development'],
                riskFactors: ['Change resistance', 'Measurement complexity'],
                expectedOutcomes: ['30% leadership diversity by 2025', '+15% employee engagement']
              }
            ]
          }
        ]
      })
    }

    // Governance pillar for governance-related themes
    const govThemes = themes.filter(t => 
      t.toLowerCase().includes('governance') || 
      t.toLowerCase().includes('ethics') || 
      t.toLowerCase().includes('compliance') ||
      t.toLowerCase().includes('transparency') ||
      t.toLowerCase().includes('risk')
    )
    
    if (govThemes.length > 0) {
      strategicPillars.push({
        id: 'governance-excellence',
        name: 'Governance & Ethics Excellence',
        description: 'Maintain highest standards of corporate governance, business ethics, and stakeholder transparency.',
        relatedThemes: govThemes,
        estimatedImpact: 'high',
        feasibilityScore: 9.1,
        objectives: [
          {
            id: 'gov-obj-1',
            name: 'ESG Governance Framework',
            description: 'Establish robust ESG governance structure with clear accountability and oversight',
            timeframe: '6-12 months',
            targetMetrics: ['Board ESG Expertise %', 'ESG Risk Integration Score', 'Stakeholder Engagement Index'],
            regulatoryAlignment: ['CSRD ESRS G1', 'Corporate Governance Code'],
            stakeholderBenefit: ['Investor confidence', 'Risk mitigation', 'Regulatory compliance'],
            initiatives: [
              {
                id: 'gov-init-1',
                name: 'ESG Committee Establishment',
                description: 'Form dedicated board-level ESG committee with defined charter and responsibilities',
                owner: 'Board Secretary',
                timeline: '3 months',
                budgetRange: '$50K - $150K',
                status: 'not-started',
                priority: 'critical',
                dependencies: ['Board resolution', 'Charter approval'],
                riskFactors: ['Director availability', 'Expertise gaps'],
                expectedOutcomes: ['Quarterly ESG oversight', 'Strategic ESG integration']
              }
            ]
          }
        ]
      })
    }

    // Generate KPI Framework
    const kpiFramework = [
      {
        category: 'Environmental',
        kpis: [
          {
            name: 'Total GHG Emissions (Scope 1 + 2)',
            description: 'Total greenhouse gas emissions from direct and indirect energy consumption',
            target: '50% reduction by 2030 (vs 2023 baseline)',
            baseline: 'TBD - Baseline measurement required',
            frequency: 'Monthly reporting, Annual verification'
          },
          {
            name: 'Renewable Energy Share',
            description: 'Percentage of total energy consumption from renewable sources',
            target: '80% by 2027',
            baseline: 'Current: ~15% (estimated)',
            frequency: 'Quarterly'
          }
        ]
      },
      {
        category: 'Social',
        kpis: [
          {
            name: 'Leadership Diversity Index',
            description: 'Composite measure of gender and ethnic diversity in leadership positions',
            target: '40% diverse leadership by 2026',
            baseline: 'Current: ~22%',
            frequency: 'Quarterly'
          },
          {
            name: 'Employee Engagement Score',
            description: 'Annual employee engagement survey results',
            target: '>85% engagement by 2025',
            baseline: 'Current: 72% (2023 survey)',
            frequency: 'Annual survey, Quarterly pulse checks'
          }
        ]
      },
      {
        category: 'Governance',
        kpis: [
          {
            name: 'ESG Risk Integration Score',
            description: 'Assessment of ESG risk integration into business decision-making processes',
            target: '95% integration score by 2025',
            baseline: 'Current: 60% (estimated)',
            frequency: 'Semi-annual assessment'
          }
        ]
      }
    ]

    // Generate regulatory alignment analysis
    const regulatoryAlignment = [
      {
        framework: 'CSRD (Corporate Sustainability Reporting Directive)',
        coverageScore: 78,
        gaps: [
          'Scope 3 emissions measurement and reduction targets',
          'Biodiversity impact assessment',
          'Value chain due diligence documentation'
        ],
        recommendations: [
          'Initiate comprehensive Scope 3 mapping exercise',
          'Partner with suppliers for emissions data collection',
          'Develop biodiversity assessment methodology'
        ]
      },
      {
        framework: 'ISSB S1/S2 Standards',
        coverageScore: 85,
        gaps: [
          'Climate-related financial risk quantification',
          'Scenario analysis integration'
        ],
        recommendations: [
          'Engage financial risk modeling consultancy',
          'Integrate climate scenarios into strategic planning'
        ]
      }
    ]

    return {
      executiveSummary: `This comprehensive ESG strategy positions ${scope.name || 'the organization'} to achieve measurable impact across environmental stewardship, social responsibility, and governance excellence over the ${timeHorizon} timeframe. The strategy integrates ${strategicPillars.length} strategic pillars, addressing key material topics identified through stakeholder engagement. With an estimated total investment of $3M-8M and dedicated cross-functional implementation, this strategy will drive both sustainable value creation and regulatory compliance, while positioning the organization as an industry leader in ESG performance.`,
      
      strategicPillars,
      kpiFramework,
      regulatoryAlignment,
      
      resourceEstimate: {
        totalBudgetRange: timeHorizon === '1-year' ? '$1M - $3M' : timeHorizon === '3-years' ? '$3M - $8M' : '$8M - $15M',
        fteRequirement: 'ESG Manager (1.0 FTE), Data Analyst (0.5 FTE), Program Coordinator (0.5 FTE)',
        timelineOverview: `${timeHorizon} implementation with quarterly milestones and annual strategy review`,
        riskAssessment: [
          'Budget constraints may limit initiative scope',
          'Data collection challenges for comprehensive reporting',
          'Stakeholder change management requirements',
          'Regulatory landscape evolution requiring strategy adaptation'
        ]
      },
      
      riskOpportunityAnalysis: {
        risks: [
          {
            category: 'Operational',
            description: 'Insufficient data collection infrastructure may delay progress tracking',
            impact: 'medium',
            probability: 'medium',
            mitigation: 'Invest in ESG data management platform and staff training'
          },
          {
            category: 'Financial',
            description: 'Economic downturn could reduce budget allocation for ESG initiatives',
            impact: 'high',
            probability: 'low',
            mitigation: 'Prioritize initiatives with positive ROI and regulatory requirements'
          },
          {
            category: 'Regulatory',
            description: 'Evolving ESG regulations may require strategy modifications',
            impact: 'medium',
            probability: 'high',
            mitigation: 'Build flexible framework and maintain regulatory monitoring'
          }
        ],
        opportunities: [
          {
            category: 'Brand & Reputation',
            description: 'ESG leadership position enhances brand value and customer loyalty',
            value: 'Estimated 5-10% premium in customer willingness to pay',
            timeline: '18-24 months'
          },
          {
            category: 'Talent Acquisition',
            description: 'Strong ESG performance attracts top talent and improves retention',
            value: '15% reduction in recruitment costs, 20% improvement in retention',
            timeline: '12-18 months'
          },
          {
            category: 'Cost Savings',
            description: 'Energy efficiency and waste reduction initiatives generate operational savings',
            value: '$500K - $1.2M annual savings potential',
            timeline: '6-12 months'
          }
        ]
      },
      
      benchmarkInsights: {
        industryComparison: 'Based on industry analysis, this strategy positions the organization in the top quartile for ESG ambition while maintaining realistic implementation timelines.',
        bestPractices: [
          'Integrated ESG governance at board level',
          'Science-based targets for emissions reduction',
          'Stakeholder-informed materiality assessment',
          'Comprehensive supply chain engagement'
        ],
        peerAnalysis: 'Peer companies in similar sectors are investing 2-4% of revenue in ESG initiatives, with leaders showing 15-25% higher valuation multiples.'
      },
      
      implementationRoadmap: [
        {
          phase: 'Foundation (Months 1-6)',
          duration: '6 months',
          keyMilestones: [
            'ESG governance structure established',
            'Baseline data collection completed',
            'Initial team training delivered',
            'Stakeholder engagement plan activated'
          ],
          criticalPath: ['Board ESG committee formation', 'Data collection systems implementation']
        },
        {
          phase: 'Implementation (Months 7-18)',
          duration: '12 months',
          keyMilestones: [
            'Key initiatives launched',
            'First progress report published',
            'Supplier engagement program active',
            'Employee training programs delivered'
          ],
          criticalPath: ['Capital projects approval and execution', 'System integrations completion']
        },
        {
          phase: 'Optimization (Months 19+)',
          duration: 'Ongoing',
          keyMilestones: [
            'Performance targets achieved',
            'External reporting compliance',
            'Continuous improvement processes',
            'Strategy refresh and evolution'
          ],
          criticalPath: ['Target achievement validation', 'Strategy adaptation based on results']
        }
      ]
    }
  }

  const handleStartGeneration = () => {
    setIsGenerating(true)
  }

  const handleAcceptBlueprint = () => {
    if (blueprint) {
      onBlueprintGenerated(blueprint)
    }
  }

  if (!isGenerating && !blueprint) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <Brain className="h-16 w-16 mx-auto text-blue-600 mb-6" />
          <h2 className="text-3xl font-bold mb-4">Generate AI Strategy Blueprint</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our AI will analyze your inputs and generate a comprehensive ESG strategy blueprint 
            tailored to your organization's context, priorities, and constraints.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Strategy Overview</CardTitle>
            <CardDescription>Review your inputs before generating the blueprint</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">Strategy Name</h4>
                <p className="font-medium">{scope.name}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">Time Horizon</h4>
                <p className="font-medium">{scope.timeHorizon}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">Scope</h4>
                <p className="font-medium">{scope.scope}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">Strategic Themes</h4>
                <div className="flex flex-wrap gap-1 mt-1">
                  {scope.strategicThemes.slice(0, 3).map((theme, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {theme}
                    </Badge>
                  ))}
                  {scope.strategicThemes.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{scope.strategicThemes.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">Description</h4>
              <p className="text-sm">{scope.description}</p>
            </div>
          </CardContent>
        </Card>

        <Alert>
          <Lightbulb className="h-4 w-4" />
          <AlertDescription>
            The AI will generate strategic pillars, objectives, initiatives, KPIs, regulatory alignment, 
            resource estimates, and implementation roadmap based on your inputs. This process typically takes 1-2 minutes.
          </AlertDescription>
        </Alert>

        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            Back to Questionnaire
          </Button>
          <Button onClick={handleStartGeneration} size="lg">
            <Brain className="mr-2 h-4 w-4" />
            Generate Strategy Blueprint
          </Button>
        </div>
      </div>
    )
  }

  if (isGenerating) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="relative">
            <Brain className="h-16 w-16 mx-auto text-blue-600 mb-6" />
            <Loader2 className="h-6 w-6 absolute top-5 left-1/2 transform -translate-x-1/2 animate-spin text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Generating Your Strategy Blueprint</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Our AI is analyzing your context and creating a comprehensive strategy...
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Generation Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Progress</span>
                <span>{generationProgress}%</span>
              </div>
              <Progress value={generationProgress} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Current Phase:</h4>
              <p className="text-sm text-muted-foreground">{currentPhase}</p>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="font-medium text-sm">Generation Log:</h4>
              <div className="bg-muted/50 rounded-lg p-3 max-h-32 overflow-y-auto">
                {generationLog.map((entry, index) => (
                  <div key={index} className="text-xs font-mono text-muted-foreground">
                    {entry}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Alert>
          <Clock className="h-4 w-4" />
          <AlertDescription>
            This process analyzes industry benchmarks, regulatory requirements, and best practices 
            to create a tailored strategy blueprint for your organization.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  // Blueprint generated - show summary
  if (blueprint) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <CheckCircle className="h-16 w-16 mx-auto text-green-600 mb-6" />
          <h2 className="text-3xl font-bold mb-4">Strategy Blueprint Generated!</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Your comprehensive ESG strategy blueprint is ready for review and customization.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Executive Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">{blueprint.executiveSummary}</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Strategic Pillars
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {blueprint.strategicPillars.map((pillar) => (
                  <div key={pillar.id} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{pillar.name}</h4>
                      <Badge variant={pillar.estimatedImpact === 'high' ? 'default' : 'secondary'}>
                        {pillar.estimatedImpact} impact
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{pillar.description}</p>
                    <div className="mt-2">
                      <span className="text-xs text-muted-foreground">Objectives: {pillar.objectives.length}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Resource Estimate
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-medium text-sm">Budget Range</h4>
                <p className="text-sm text-muted-foreground">{blueprint.resourceEstimate.totalBudgetRange}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm">FTE Requirement</h4>
                <p className="text-sm text-muted-foreground">{blueprint.resourceEstimate.fteRequirement}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm">Timeline</h4>
                <p className="text-sm text-muted-foreground">{blueprint.resourceEstimate.timelineOverview}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Regulatory Alignment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {blueprint.regulatoryAlignment.map((reg, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">{reg.framework}</h4>
                      <Badge variant={reg.coverageScore >= 80 ? 'default' : 'secondary'}>
                        {reg.coverageScore}% coverage
                      </Badge>
                    </div>
                    {reg.gaps.length > 0 && (
                      <p className="text-xs text-muted-foreground">
                        {reg.gaps.length} gap(s) identified
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Key Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {blueprint.riskOpportunityAnalysis.opportunities.slice(0, 3).map((opp, index) => (
                  <div key={index} className="border-l-2 border-green-500 pl-3">
                    <h4 className="font-medium text-sm">{opp.category}</h4>
                    <p className="text-xs text-muted-foreground">{opp.description}</p>
                    <p className="text-xs font-medium text-green-600">{opp.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            Regenerate Blueprint
          </Button>
          <Button onClick={handleAcceptBlueprint} size="lg">
            <CheckCircle className="mr-2 h-4 w-4" />
            Proceed to Strategy Canvas
          </Button>
        </div>
      </div>
    )
  }

  return null
} 