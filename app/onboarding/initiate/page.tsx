"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/AuthContext"
import { useOnboarding } from "@/contexts/OnboardingContext"
import { 
  Building, 
  ShieldCheck, 
  Database, 
  Brain, 
  Target, 
  Users, 
  CheckCircle, 
  Clock,
  BookOpen,
  PlayCircle,
  ExternalLink,
  RefreshCw
} from "lucide-react"

const onboardingStages = [
  {
    id: 1,
    title: "Organizational Structure",
    description: "Define your company profile, business units, and facilities",
    icon: Building,
    route: "/onboarding/organization",
    estimatedTime: "10-15 min"
  },
  {
    id: 2,
    title: "ESG Scope & Compliance",
    description: "Select regulatory frameworks and define materiality focus",
    icon: ShieldCheck,
    route: "/onboarding/esg-scope",
    estimatedTime: "8-12 min"
  },
  {
    id: 3,
    title: "Data Integration",
    description: "Connect data sources and configure upload templates",
    icon: Database,
    route: "/onboarding/data-integration",
    estimatedTime: "15-20 min"
  },
  {
    id: 4,
    title: "AI & Analytics",
    description: "Configure AI features and customize your dashboard",
    icon: Brain,
    route: "/onboarding/ai-analytics-config",
    estimatedTime: "5-8 min"
  },
  {
    id: 5,
    title: "Goal Setting",
    description: "Set initial ESG goals and strategy foundation",
    icon: Target,
    route: "/onboarding/goals-strategy",
    estimatedTime: "5-10 min"
  },
  {
    id: 6,
    title: "Team Setup",
    description: "Invite team members and assign roles",
    icon: Users,
    route: "/onboarding/team-setup",
    estimatedTime: "5-10 min"
  }
]

export default function OnboardingInitiatePage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { user } = useAuth()
  const { 
    state, 
    hasInProgressOnboarding, 
    getProgressPercentage, 
    clearOnboardingData,
    isStepCompleted
  } = useOnboarding()

  // Check if user has saved progress
  const hasProgress = hasInProgressOnboarding()
  const progressPercentage = getProgressPercentage()
  const currentStep = state.currentStep
  const lastSaved = state.lastSaved

  const handleStartConfiguration = () => {
    setIsLoading(true)
    router.push("/onboarding/organization")
  }

  const handleResumeConfiguration = () => {
    setIsLoading(true)
    // Navigate to the current step or the next incomplete step
    const nextStep = currentStep > 1 ? currentStep : 1
    const stepRoutes = [
      "/onboarding/organization",
      "/onboarding/esg-scope", 
      "/onboarding/data-integration",
      "/onboarding/ai-analytics-config",
      "/onboarding/goals-strategy",
      "/onboarding/team-setup"
    ]
    router.push(stepRoutes[nextStep - 1] || "/onboarding/organization")
  }

  const handleStartOver = () => {
    if (confirm("Are you sure you want to start over? All saved progress will be lost.")) {
      clearOnboardingData()
      setIsLoading(true)
      router.push("/onboarding/organization")
    }
  }

  const handleWatchTutorial = () => {
    // TODO: Implement video tutorial modal or external link
    console.log("Opening tutorial video...")
  }

  const handleSupportResources = () => {
    // TODO: Implement link to knowledge base
    console.log("Opening support resources...")
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">CC</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to CarbonCorp ESG!
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Let's get {user?.user_metadata?.company_name || "your company"}'s ESG platform configured.
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Full setup: 45-90 minutes</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>Save progress anytime</span>
            </div>
          </div>
        </div>

        {/* Saved Progress Alert */}
        {hasProgress && (
          <Card className="mb-8 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-blue-800">
                <RefreshCw className="h-5 w-5" />
                <span>Resume Your Setup</span>
              </CardTitle>
              <CardDescription className="text-blue-700">
                You have saved progress from your previous session. You can continue where you left off.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-blue-800 mb-2">
                    <span>Overall Progress</span>
                    <span>{Math.round(progressPercentage)}% Complete</span>
                  </div>
                  <Progress value={progressPercentage} className="w-full" />
                </div>
                
                {lastSaved && (
                  <p className="text-sm text-blue-600">
                    Last saved: {new Date(lastSaved).toLocaleString()}
                  </p>
                )}

                <div className="flex space-x-2">
                  <Button onClick={handleResumeConfiguration} disabled={isLoading}>
                    {isLoading ? "Loading..." : "Continue Setup"}
                  </Button>
                  <Button variant="outline" onClick={handleStartOver}>
                    Start Over
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Progress Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>Setup Progress</span>
              <Badge variant="outline">
                {hasProgress ? `${Math.round(progressPercentage)}%` : "0%"} Complete
              </Badge>
            </CardTitle>
            <CardDescription>
              Complete each stage to get your ESG platform ready for use
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={progressPercentage || 0} className="w-full mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {onboardingStages.map((stage) => {
                const IconComponent = stage.icon
                const isCompleted = isStepCompleted(stage.id)
                const isCurrent = currentStep === stage.id
                
                return (
                  <div 
                    key={stage.id} 
                    className={`flex items-start space-x-3 p-3 border rounded-lg ${
                      isCompleted ? 'bg-green-50 border-green-200' : 
                      isCurrent ? 'bg-blue-50 border-blue-200' : 'bg-white'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isCompleted ? 'bg-green-100' : 
                        isCurrent ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <IconComponent className={`h-4 w-4 ${
                            isCurrent ? 'text-blue-600' : 'text-gray-600'
                          }`} />
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${
                        isCompleted ? 'text-green-900' : 
                        isCurrent ? 'text-blue-900' : 'text-gray-900'
                      }`}>
                        {stage.title}
                      </p>
                      <p className="text-xs text-gray-500 mb-1">{stage.description}</p>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="text-xs">
                          {stage.estimatedTime}
                        </Badge>
                        {isCompleted && (
                          <Badge variant="outline" className="text-xs text-green-600">
                            Complete
                          </Badge>
                        )}
                        {isCurrent && (
                          <Badge variant="outline" className="text-xs text-blue-600">
                            Current
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Main Action Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              {hasProgress ? "Continue Your Setup" : "Ready to Begin?"}
            </CardTitle>
            <CardDescription>
              {hasProgress 
                ? "Pick up where you left off and complete your ESG platform configuration."
                : "We'll guide you through each step to configure your ESG platform for success. You can pause and resume the setup process at any time."
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {hasProgress ? (
              <div className="flex space-x-2">
                <Button 
                  onClick={handleResumeConfiguration}
                  disabled={isLoading}
                  size="lg"
                  className="flex-1"
                >
                  {isLoading ? "Loading..." : "Continue Setup"}
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleStartOver}
                  size="lg"
                >
                  Start Over
                </Button>
              </div>
            ) : (
              <Button 
                onClick={handleStartConfiguration}
                disabled={isLoading}
                size="lg"
                className="w-full md:w-auto"
              >
                {isLoading ? "Starting..." : "Start Configuration"}
              </Button>
            )}
            
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={handleWatchTutorial}
                className="flex items-center space-x-2"
              >
                <PlayCircle className="h-4 w-4" />
                <span>Watch Onboarding Tutorial</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={handleSupportResources}
                className="flex items-center space-x-2"
              >
                <BookOpen className="h-4 w-4" />
                <span>Onboarding Guide & Support</span>
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What You'll Accomplish</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Complete company profile and organizational structure</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Select relevant ESG frameworks and compliance requirements</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Connect data sources for automated ESG tracking</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Configure AI features and analytics preferences</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Set initial ESG goals and invite your team</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <p className="text-gray-600">
                  Our team is here to support you throughout the setup process.
                </p>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Access Knowledge Base
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Contact Support Team
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Enterprise customers: You may have a dedicated Success Manager to assist with setup.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 