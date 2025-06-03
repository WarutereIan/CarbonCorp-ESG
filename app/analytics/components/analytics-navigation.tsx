"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter, usePathname } from "next/navigation"
import { AnalyticsSection } from "../types/analytics-types"
import {
  BarChart3,
  Target,
  Search,
  TrendingUp,
  FileText,
  Layout
} from "lucide-react"

export function AnalyticsNavigation() {
  const router = useRouter()
  const pathname = usePathname()

  const analyticsSections: AnalyticsSection[] = [
    {
      id: "dashboard",
      title: "Analytics Dashboard",
      description: "Monitor ESG performance with customizable KPI widgets and AI-powered insights",
      emoji: "📊",
      route: "/analytics",
      features: ["KPI Cards", "Interactive Charts", "AI Insights", "Performance Alerts"],
      status: "available"
    },
    {
      id: "goals",
      title: "Goals & KPI Tracking",
      description: "Define, track, and analyze ESG goals with SMART criteria and predictive analytics",
      emoji: "🎯",
      route: "/analytics/goals",
      features: ["Goal Creation", "KPI Management", "Progress Tracking", "Forecasting"],
      status: "available"
    },
    {
      id: "explorer",
      title: "Data Explorer",
      description: "Perform ad-hoc analysis with powerful query tools and visualization options",
      emoji: "🔍",
      route: "/analytics/explorer",
      features: ["Interactive Query Builder", "Dynamic Charts", "Trend Analysis", "Correlation Finder"],
      status: "available"
    },
    {
      id: "benchmarks",
      title: "Benchmarking",
      description: "Compare performance against industry peers and best-in-class standards",
      emoji: "📈",
      route: "/analytics/benchmarks",
      features: ["Peer Comparison", "Industry Standards", "Gap Analysis", "Performance Ranking"],
      status: "available"
    },
    {
      id: "reports",
      title: "Custom Reports",
      description: "Create analytical reports with automated scheduling and distribution",
      emoji: "📋",
      route: "/analytics/reports",
      features: ["Report Builder", "Scheduled Delivery", "Template Library", "Export Options"],
      status: "available"
    },
    {
      id: "forecasting",
      title: "Predictive Analytics",
      description: "Forecast trends and model scenarios with advanced AI algorithms",
      emoji: "🔮",
      route: "/analytics/forecasting",
      features: ["Trend Forecasting", "Scenario Modeling", "Risk Prediction", "Impact Analysis"],
      status: "coming-soon"
    }
  ]

  const isCurrentSection = (route: string) => {
    if (route === "/analytics") {
      return pathname === "/analytics"
    }
    return pathname.startsWith(route)
  }

  const getStatusBadge = (status?: AnalyticsSection['status']) => {
    switch (status) {
      case 'beta':
        return <Badge variant="secondary" className="ml-2 text-xs">Beta</Badge>
      case 'coming-soon':
        return <Badge variant="outline" className="ml-2 text-xs">Coming Soon</Badge>
      default:
        return null
    }
  }

  const handleNavigation = (section: AnalyticsSection) => {
    if (section.status === 'coming-soon') {
      // Show coming soon message or do nothing
      return
    }
    router.push(section.route)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {analyticsSections.map((section) => (
        <Card 
          key={section.id} 
          className={`cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${
            isCurrentSection(section.route)
              ? 'border-primary bg-primary/5' 
              : 'border-border hover:border-primary/50'
          } ${section.status === 'coming-soon' ? 'opacity-60' : ''}`}
          onClick={() => handleNavigation(section)}
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="text-3xl mb-2" role="img" aria-label={section.title}>
                {section.emoji}
              </div>
              <div className="flex items-center">
                {isCurrentSection(section.route) && (
                  <Badge variant="default" className="mr-2">Current</Badge>
                )}
                {getStatusBadge(section.status)}
              </div>
            </div>
            
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              {section.title}
            </h3>
            
            <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
              {section.description}
            </p>
            
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1">
                {section.features.map((feature, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="text-xs"
                  >
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
            
            {section.status !== 'coming-soon' && (
              <Button 
                variant={isCurrentSection(section.route) ? "default" : "outline"}
                size="sm" 
                className="w-full mt-4"
              >
                {isCurrentSection(section.route) ? "Currently Viewing" : "Open"}
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 