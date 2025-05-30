"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useOnboarding } from "@/contexts/OnboardingContext"
import { 
  CheckCircle,
  PartyPopper,
  ArrowRight,
  Users,
  Target,
  BarChart3,
  FileText,
  Settings,
  Star,
  Rocket,
  Building,
  Lightbulb,
  Clock,
  Calendar
} from "lucide-react"

export default function OnboardingCompletePage() {
  const router = useRouter()
  const { state, markAsComplete, clearOnboardingData } = useOnboarding()

  // Mark onboarding as complete when this page loads
  useEffect(() => {
    if (!state.isComplete) {
      markAsComplete()
    }
  }, [state.isComplete, markAsComplete])

  const nextSteps = [
    {
      icon: <BarChart3 className="h-5 w-5" />,
      title: "Explore Your Dashboard",
      description: "View your personalized ESG dashboard with key metrics and insights",
      action: "Go to Dashboard",
      route: "/",
      priority: "high"
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: "Create Your First Report",
      description: "Use the Reporting Studio to generate your initial ESG report",
      action: "Start Reporting",
      route: "/reporting",
      priority: "medium"
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "Track Your Goals",
      description: "Monitor progress on your ESG goals and KPIs in the Analytics Hub",
      action: "View Goals",
      route: "/analytics/goals",
      priority: "medium"
    },
    {
      icon: <Building className="h-5 w-5" />,
      title: "Connect Data Sources",
      description: "Set up additional data connections in the Data Hub",
      action: "Manage Data",
      route: "/data-hub",
      priority: "low"
    }
  ]

  const handleNavigateTo = (route: string) => {
    // Don't clear data, just navigate since onboarding is complete
    router.push(route)
  }

  const handleStartOver = () => {
    // Only clear data when explicitly starting over
    clearOnboardingData()
    router.push("/onboarding/initiate")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Celebration Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <PartyPopper className="h-10 w-10 text-green-600" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎉 Congratulations!
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Your ESG platform is now ready for action
          </p>
          <p className="text-lg text-gray-500">
            {state.companyData.legalName} is all set to begin your sustainability journey
          </p>
        </div>

        {/* Setup Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>Setup Complete</span>
            </CardTitle>
            <CardDescription>
              Here's what you've accomplished during onboarding
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {state.selectedFrameworks.filter(f => f.isSelected).length}
                </div>
                <p className="text-sm text-gray-600">ESG Frameworks</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {state.initialGoals.filter(g => g.isAccepted).length}
                </div>
                <p className="text-sm text-gray-600">Goals Set</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  {state.teamMembers.length}
                </div>
                <p className="text-sm text-gray-600">Team Members</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">
                  {state.aiFeatures.filter(f => f.isEnabled).length}
                </div>
                <p className="text-sm text-gray-600">AI Features</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Rocket className="h-5 w-5" />
              <span>What's Next?</span>
            </CardTitle>
            <CardDescription>
              Here are some recommended next steps to get the most out of your ESG platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {nextSteps.map((step, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:border-blue-300 transition-colors">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      step.priority === 'high' ? 'bg-green-100 text-green-600' :
                      step.priority === 'medium' ? 'bg-blue-100 text-blue-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {step.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{step.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                      <Badge variant={step.priority === 'high' ? 'default' : 'outline'} className="text-xs">
                        {step.priority === 'high' ? 'Recommended First' : 
                         step.priority === 'medium' ? 'Important' : 'Optional'}
                      </Badge>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => handleNavigateTo(step.route)}
                    variant={step.priority === 'high' ? 'default' : 'outline'}
                  >
                    {step.action}
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Getting Started Tips */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5" />
              <span>Getting Started Tips</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Alert>
                <Clock className="h-4 w-4" />
                <AlertDescription>
                  <strong>First Week:</strong> Focus on connecting your data sources and familiarizing yourself with the dashboard. 
                  Review your initial goals and start tracking basic metrics.
                </AlertDescription>
              </Alert>
              
              <Alert>
                <Users className="h-4 w-4" />
                <AlertDescription>
                  <strong>Team Collaboration:</strong> Send invitations to your team members and assign their first tasks. 
                  Use the Collaboration Workspace to coordinate ESG initiatives.
                </AlertDescription>
              </Alert>
              
              <Alert>
                <Calendar className="h-4 w-4" />
                <AlertDescription>
                  <strong>First Month:</strong> Set up regular data collection schedules, create your first comprehensive report, 
                  and conduct a materiality assessment using the AI Engine.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        {/* Support Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
            <CardDescription>
              Resources to help you succeed with your ESG journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <FileText className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <h4 className="font-semibold mb-1">Knowledge Base</h4>
                <p className="text-sm text-gray-600 mb-3">Comprehensive guides and tutorials</p>
                <Button variant="outline" size="sm">
                  Browse Articles
                </Button>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <Users className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <h4 className="font-semibold mb-1">Support Team</h4>
                <p className="text-sm text-gray-600 mb-3">Get help from our experts</p>
                <Button variant="outline" size="sm">
                  Contact Support
                </Button>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <Star className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                <h4 className="font-semibold mb-1">Training Sessions</h4>
                <p className="text-sm text-gray-600 mb-3">Live training and webinars</p>
                <Button variant="outline" size="sm">
                  View Schedule
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button 
            size="lg" 
            onClick={() => handleNavigateTo("/")}
            className="bg-green-600 hover:bg-green-700"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Go to Dashboard
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => handleNavigateTo("/settings")}
          >
            <Settings className="h-4 w-4 mr-2" />
            Adjust Settings
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            onClick={handleStartOver}
          >
            Start Over
          </Button>
        </div>

        <div className="text-center mt-8 text-gray-500">
          <p className="text-sm">
            Welcome to CarbonCorp ESG Platform! We're excited to support your sustainability journey.
          </p>
        </div>
      </div>
    </div>
  )
} 