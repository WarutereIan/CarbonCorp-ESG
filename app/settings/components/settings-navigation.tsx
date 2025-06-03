'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRouter, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface SettingsSection {
  id: string
  title: string
  description: string
  href: string
  emoji: string
  badge?: string
  adminOnly?: boolean
}

const settingsSections: SettingsSection[] = [
  {
    id: 'overview',
    title: 'Overview',
    description: 'System health, activity logs, and quick actions',
    href: '/settings',
    emoji: '📊',
  },
  {
    id: 'users',
    title: 'User Management',
    description: 'Manage team members, roles, and permissions',
    href: '/settings/users',
    emoji: '👥',
    adminOnly: true,
  },
  {
    id: 'company',
    title: 'Company Profile',
    description: 'Organization details, facilities, and branding',
    href: '/settings/company',
    emoji: '🏢',
  },
  {
    id: 'integrations',
    title: 'Integrations',
    description: 'Connect external systems and data sources',
    href: '/settings/integrations',
    emoji: '🔗',
  },
  {
    id: 'data',
    title: 'Data Management',
    description: 'Retention policies, classification, and backups',
    href: '/settings/data',
    emoji: '🗄️',
    adminOnly: true,
  },
  {
    id: 'system',
    title: 'System Configuration',
    description: 'Features, appearance, and performance settings',
    href: '/settings/system',
    emoji: '⚙️',
    adminOnly: true,
  },
  {
    id: 'security',
    title: 'Security & Access',
    description: 'Authentication, encryption, and access controls',
    href: '/settings/security',
    emoji: '🔒',
    adminOnly: true,
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Configure alerts, reminders, and delivery preferences',
    href: '/settings/notifications',
    emoji: '🔔',
  },
  {
    id: 'api',
    title: 'API & Webhooks',
    description: 'API keys, webhook endpoints, and developer tools',
    href: '/settings/api',
    emoji: '🔌',
    adminOnly: true,
  },
  {
    id: 'compliance',
    title: 'Compliance Settings',
    description: 'Regulatory frameworks, audit trails, and policies',
    href: '/settings/compliance',
    emoji: '📋',
  },
  {
    id: 'billing',
    title: 'Billing & Plans',
    description: 'Subscription details, usage, and payment methods',
    href: '/settings/billing',
    emoji: '💳',
    adminOnly: true,
  },
  {
    id: 'support',
    title: 'Help & Support',
    description: 'Documentation, contact support, and system status',
    href: '/settings/support',
    emoji: '❓',
  },
]

interface SettingsNavigationProps {
  userRole?: string
}

export default function SettingsNavigation({ userRole = 'user' }: SettingsNavigationProps) {
  const router = useRouter()
  const pathname = usePathname()
  
  const isAdmin = userRole === 'admin' || userRole === 'Administrator'
  
  const filteredSections = settingsSections.filter(section => 
    !section.adminOnly || isAdmin
  )

  const handleSectionClick = (href: string) => {
    router.push(href)
  }

  const isActive = (href: string) => {
    if (href === '/settings') {
      return pathname === '/settings'
    }
    return pathname.startsWith(href)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Settings & Configuration
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Manage your organization, users, integrations, and system preferences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSections.map((section) => (
          <Card
            key={section.id}
            className={cn(
              "cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02]",
              isActive(section.href) 
                ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950/20" 
                : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
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
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {section.badge}
                      </Badge>
                    )}
                    {section.adminOnly && (
                      <Badge variant="outline" className="ml-2 text-xs">
                        Admin
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

      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-start space-x-3">
          <div className="text-blue-600 dark:text-blue-400">💡</div>
          <div>
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
              Quick Tips
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Start with User Management to set up your team, then configure Company Profile and Integrations for data collection.
              Admin settings help optimize system performance and security.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 