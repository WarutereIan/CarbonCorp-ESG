"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { useOnboarding } from "@/contexts/OnboardingContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Settings,
  ArrowRight,
  RefreshCw
} from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const { 
    hasInProgressOnboarding, 
    hasStartedOnboarding,
    isOnboardingComplete,
    getProgressPercentage, 
    state,
    isStepCompleted
  } = useOnboarding()

  const [showOnboardingPrompt, setShowOnboardingPrompt] = useState(false)

  useEffect(() => {
    if (!loading && user) {
      // Only show onboarding prompt if onboarding is not complete and there's progress to continue
      const shouldShowPrompt = !isOnboardingComplete() && hasInProgressOnboarding()
      setShowOnboardingPrompt(shouldShowPrompt)
    }
  }, [loading, user, isOnboardingComplete, hasInProgressOnboarding])

  const handleContinueOnboarding = () => {
    // Route to appropriate step based on current progress
    if (!hasStartedOnboarding()) {
      router.push("/onboarding/initiate")
    } else {
      // Find the first incomplete step
      let nextStepIndex = 1
      for (let i = 1; i <= 6; i++) {
        if (!isStepCompleted(i)) {
          nextStepIndex = i
          break
        }
      }
      
      const stepRoutes = [
        "/onboarding/initiate",        // 0 - initial
        "/onboarding/organization",    // 1
        "/onboarding/esg-scope",      // 2
        "/onboarding/data-integration", // 3
        "/onboarding/ai-analytics-config", // 4
        "/onboarding/goals-strategy",  // 5
        "/onboarding/team-setup"      // 6
      ]
      
      router.push(stepRoutes[nextStepIndex] || "/onboarding/organization")
    }
  }

  const handleDismissOnboarding = () => {
    setShowOnboardingPrompt(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    router.push("/auth/login")
    return null
  }

  const progressPercentage = getProgressPercentage()
  const hasStarted = hasStartedOnboarding()
  const isComplete = isOnboardingComplete()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              ESG Dashboard
            </h1>
            <p className="text-gray-600">
              Welcome back, {user.user_metadata?.full_name || user.email}
            </p>
          </div>

          {/* Onboarding Prompt */}
          {showOnboardingPrompt && (
            <Alert className="mb-8 border-blue-200 bg-blue-50">
              <RefreshCw className="h-4 w-4" />
              <AlertTitle className="text-blue-800">
                {hasStarted ? "Continue Your ESG Platform Setup" : "Complete Your ESG Platform Setup"}
              </AlertTitle>
              <AlertDescription className="text-blue-700 mt-2">
                <div className="space-y-3">
                  <p>
                    {hasStarted 
                      ? `You have incomplete onboarding setup (${Math.round(progressPercentage)}% complete). Continue configuring your platform to unlock all ESG tracking and reporting features.`
                      : "Get started with your ESG platform setup to unlock all tracking and reporting features."
                    }
                  </p>
                  
                  {hasStarted && (
                    <Progress value={progressPercentage} className="w-full max-w-md" />
                  )}
                  
                  <div className="flex space-x-2">
                    <Button 
                      onClick={handleContinueOnboarding}
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {hasStarted ? "Continue Setup" : "Start Setup"}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleDismissOnboarding}
                    >
                      Dismiss
                    </Button>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Dashboard Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* KPI Cards */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Emissions</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0 tCO2e</div>
                <p className="text-xs text-muted-foreground">
                  Complete setup to start tracking
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Energy Usage</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0 MWh</div>
                <p className="text-xs text-muted-foreground">
                  Connect data sources to populate
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Compliance Status</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Setup Required</div>
                <p className="text-xs text-muted-foreground">
                  Configure frameworks first
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Data Quality</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Not Available</div>
                <p className="text-xs text-muted-foreground">
                  Integrate data sources first
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
                <CardDescription>
                  Complete these steps to unlock your ESG platform capabilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {!isStepCompleted(1) && (
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Complete Organization Setup</p>
                        <p className="text-sm text-gray-600">Define company structure and facilities</p>
                      </div>
                      <Button size="sm" onClick={handleContinueOnboarding}>
                        Start
                      </Button>
                    </div>
                  )}
                  
                  {isStepCompleted(1) && !isStepCompleted(2) && (
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Configure ESG Frameworks</p>
                        <p className="text-sm text-gray-600">Select compliance requirements</p>
                      </div>
                      <Button size="sm" onClick={handleContinueOnboarding}>
                        Continue
                      </Button>
                    </div>
                  )}

                  {isStepCompleted(1) && isStepCompleted(2) && !isStepCompleted(3) && (
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Connect Data Sources</p>
                        <p className="text-sm text-gray-600">Integrate your business systems</p>
                      </div>
                      <Button size="sm" onClick={handleContinueOnboarding}>
                        Continue
                      </Button>
                    </div>
                  )}

                  {progressPercentage === 100 && (
                    <div className="flex items-center justify-center p-6 border-2 border-dashed border-green-200 rounded-lg bg-green-50">
                      <div className="text-center">
                        <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <p className="font-medium text-green-800">Setup Complete!</p>
                        <p className="text-sm text-green-600">Your ESG platform is ready to use</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest updates and notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center py-8 text-gray-500">
                    <Settings className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p>No activity yet</p>
                    <p className="text-sm">Complete setup to see your ESG data and insights</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
