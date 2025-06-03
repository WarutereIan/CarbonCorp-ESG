import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { 
  Wand2, 
  Settings, 
  ArrowRight, 
  Clock,
  Star,
  Zap,
  Cog,
  Sparkles,
  CheckCircle
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
  buttonText: string
  buttonIcon: React.ReactNode
}

interface WorkflowSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  triggerType?: 'create-report' | 'ai-generation'
}

export function WorkflowSelectionModal({ isOpen, onClose, triggerType = 'create-report' }: WorkflowSelectionModalProps) {
  const router = useRouter()

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
      recommended: true,
      buttonText: 'Start AI Generation',
      buttonIcon: <Sparkles className="h-4 w-4" />
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
      estimatedTime: '45-90 minutes',
      recommended: false,
      buttonText: 'Configure Report',
      buttonIcon: <Cog className="h-4 w-4" />
    }
  ]

  const handleWorkflowSelection = (workflowId: 'default' | 'advanced') => {
    onClose()
    
    // Navigate to new report page with workflow parameter
    const params = new URLSearchParams()
    params.set('workflow', workflowId)
    if (triggerType) {
      params.set('trigger', triggerType)
    }
    
    router.push(`/reporting/new?${params.toString()}`)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Choose Your Reporting Workflow</DialogTitle>
          <p className="text-muted-foreground">
            Select the approach that best fits your needs and expertise level
          </p>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {workflows.map((workflow) => (
            <Card 
              key={workflow.id} 
              className={`relative cursor-pointer transition-all hover:shadow-lg ${
                workflow.recommended ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => handleWorkflowSelection(workflow.id)}
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
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full" size="sm">
                    {workflow.buttonIcon}
                    <span className="ml-2">{workflow.buttonText}</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center text-sm text-muted-foreground mt-6">
          <p>Not sure which to choose? Start with AI-Powered Generation - you can always switch to advanced mode later.</p>
        </div>
      </DialogContent>
    </Dialog>
  )
} 