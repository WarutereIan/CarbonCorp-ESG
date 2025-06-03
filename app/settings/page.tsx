"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SettingsNavigation from "./components/settings-navigation"
import DashboardOverview from "./components/dashboard-overview"

// Mock user data - replace with actual auth context
const mockUser = {
  role: 'Administrator', // This should come from auth context
  name: 'John Doe'
}

export default function SettingsOverviewPage() {
  const [activeTab, setActiveTab] = useState('navigation')

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your ESG platform configuration and administration
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="navigation">Settings Menu</TabsTrigger>
          <TabsTrigger value="overview">System Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="navigation" className="space-y-6">
          <SettingsNavigation userRole={mockUser.role} />
        </TabsContent>

        <TabsContent value="overview" className="space-y-6">
          <DashboardOverview />
        </TabsContent>
      </Tabs>
    </div>
  )
} 