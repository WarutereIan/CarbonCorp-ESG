'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRouter, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface ComplianceSection {
  id: string
  title: string
  description: string
  href: string
  emoji: string
  badge?: string
  urgent?: boolean
}

const complianceSections: ComplianceSection[] = [
  {
    id: 'overview',
    title: 'Compliance Overview',
    description: 'Dashboard, status tracking, and gap analysis',
    href: '/compliance',
    emoji: '📊',
  },
  {
    id: 'regulations',
    title: 'Regulatory Library',
    description: 'Kenya regulations, requirements, and updates',
    href: '/compliance/regulations',
    emoji: '📚',
  },
  {
    id: 'calendar',
    title: 'Compliance Calendar',
    description: 'Deadlines, reviews, renewals, and reminders',
    href: '/compliance/calendar',
    emoji: '📅',
    badge: '5 Due Soon'
  },
  {
    id: 'audits',
    title: 'Audit Management',
    description: 'Plan, conduct, and track compliance audits',
    href: '/compliance/audits',
    emoji: '🔍',
  },
  {
    id: 'policies',
    title: 'Policy Management',
    description: 'Create, review, and manage compliance policies',
    href: '/compliance/policies',
    emoji: '📋',
    badge: '2 Pending Review'
  },
  {
    id: 'reporting',
    title: 'Compliance Reporting',
    description: 'Generate compliance reports and analytics',
    href: '/compliance/reporting',
    emoji: '📈',
  },
  {
    id: 'training',
    title: 'Training & Awareness',
    description: 'Compliance training programs and tracking',
    href: '/compliance/training',
    emoji: '🎓',
  },
  {
    id: 'incidents',
    title: 'Incident Tracking',
    description: 'Log, investigate, and resolve compliance incidents',
    href: '/compliance/incidents',
    emoji: '⚠️',
    urgent: true
  },
]

export default function ComplianceNavigation() {
  const router = useRouter()
  const pathname = usePathname()

  const handleSectionClick = (href: string) => {
    router.push(href)
  }

  const isActive = (href: string) => {
    if (href === '/compliance') {
      return pathname === '/compliance'
    }
    return pathname.startsWith(href)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Compliance Center
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Manage regulatory compliance across Environmental, Social, and Governance requirements
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {complianceSections.map((section) => (
          <Card
            key={section.id}
            className={cn(
              "cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02]",
              isActive(section.href) 
                ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950/20" 
                : "hover:bg-gray-50 dark:hover:bg-gray-800/50",
              section.urgent && "border-red-200 dark:border-red-800"
            )}
            onClick={() => handleSectionClick(section.href)}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{section.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                      {section.title}
                    </h3>
                    {section.badge && (
                      <Badge 
                        variant={section.urgent ? "destructive" : "secondary"} 
                        className="ml-2 text-xs"
                      >
                        {section.badge}
                      </Badge>
                    )}
                    {section.urgent && !section.badge && (
                      <Badge variant="destructive" className="ml-2 text-xs">
                        Urgent
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 overflow-hidden">
                    <span className="block truncate">{section.description}</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Quick Stats Cards */}
        <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="text-green-600 dark:text-green-400">✅</div>
              <div>
                <h4 className="font-medium text-green-900 dark:text-green-100">
                  Compliance Score
                </h4>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">87%</p>
                <p className="text-sm text-green-700 dark:text-green-300">
                  142 of 163 requirements met
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="text-yellow-600 dark:text-yellow-400">⏰</div>
              <div>
                <h4 className="font-medium text-yellow-900 dark:text-yellow-100">
                  Due Soon
                </h4>
                <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">5</p>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Requirements in next 30 days
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="text-red-600 dark:text-red-400">🚨</div>
              <div>
                <h4 className="font-medium text-red-900 dark:text-red-100">
                  Overdue
                </h4>
                <p className="text-2xl font-bold text-red-900 dark:text-red-100">2</p>
                <p className="text-sm text-red-700 dark:text-red-300">
                  Critical requirements past due
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-start space-x-3">
          <div className="text-blue-600 dark:text-blue-400">🇰🇪</div>
          <div>
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
              Kenya Compliance Focus
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              This compliance center is configured for Kenyan regulatory requirements including NEMA, WARMA, EPRA, NSE, CMA, and other local authorities.
              Stay up-to-date with the latest regulatory changes and ensure full compliance.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 