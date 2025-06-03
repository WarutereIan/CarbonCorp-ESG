import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Wand2, 
  Settings, 
  ArrowRight, 
  Bot, 
  Cog,
  Clock,
  Star,
  Zap
} from "lucide-react"

interface WorkflowOption {
  id: 'default' | 'advanced'
  name: string
  description: string
  icon: React.ReactNode
  features: string[]
  complexity: 'Beginner' | 'Advanced'
  estimatedTime: string
  recommended?: boolean
}

interface WorkflowSelectorProps {
  onSelectWorkflow: (workflowId: 'default' | 'advanced') => void
}

export function WorkflowSelector({ onSelectWorkflow }: WorkflowSelectorProps) {
  const workflows: WorkflowOption[] = [
    {
      id: 'default',
      name: 'AI-Powered Report Generation',
      description: 'Generate comprehensive ESG reports using AI with minimal setup. Perfect for quick, high-quality reports.',
      icon: <Wand2 className="h-6 w-6" />,
      features: [
        'Natural language prompts',
        'Automatic content generation',
        'Real-time AI assistance',
        'Smart parameter detection',
        'Instant compliance checking'
      ],
      complexity: 'Beginner',
      estimatedTime: '15-30 minutes',
      recommended: true
    },
    {
      id: 'advanced',
      name: 'Advanced Report Builder',
      description: 'Full control over report creation with step-by-step configuration, custom parameters, and detailed design options.',
      icon: <Settings className="h-6 w-6" />,
      features: [
        'Step-by-step configuration',
        'Advanced parameter control',
        'Custom visual design studio',
        'Template-based generation',
        'Detailed compliance validation'
      ],
      complexity: 'Advanced',
      estimatedTime: '45-90 minutes'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Choose Your Reporting Workflow</h2>
        <p className="text-muted-foreground">
          Select the approach that best fits your needs and expertise level
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {workflows.map((workflow) => (
          <Card 
            key={workflow.id} 
            className={`relative cursor-pointer transition-all hover:shadow-lg ${
              workflow.recommended ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => onSelectWorkflow(workflow.id)}
          >
            {workflow.recommended && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-500 text-white px-3 py-1">
                  <Star className="h-3 w-3 mr-1" />
                  Recommended
                </Badge>
              </div>
            )}
            
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  {workflow.icon}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{workflow.name}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {workflow.complexity}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {workflow.estimatedTime}
                    </div>
                  </div>
                </div>
              </div>
              <CardDescription className="text-sm leading-relaxed">
                {workflow.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm mb-2">Key Features</h4>
                  <ul className="space-y-1">
                    {workflow.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="h-1.5 w-1.5 bg-blue-500 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button className="w-full" size="sm">
                  {workflow.id === 'default' && (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Start AI Generation
                    </>
                  )}
                  {workflow.id === 'advanced' && (
                    <>
                      <Cog className="h-4 w-4 mr-2" />
                      Configure Report
                    </>
                  )}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center text-sm text-muted-foreground">
        <p>Not sure which to choose? Start with AI-Powered Generation - you can always switch to advanced mode later.</p>
      </div>
    </div>
  )
} 