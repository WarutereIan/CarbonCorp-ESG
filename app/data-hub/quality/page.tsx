"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Settings, RefreshCw, BarChart3, AlertTriangle, Shield, Database, Brain } from "lucide-react"
import { useDataQuality } from "@/hooks/use-data-quality"
import { DashboardTab } from "./components/dashboard-tab"
import { AnomaliesTab } from "./components/anomalies-tab"
import { ValidationRulesTab } from "./components/validation-rules-tab"
import { DataCompletenessTab } from "./components/data-completeness-tab"
import { AIInsightsTab } from "./components/ai-insights-tab"
import { AnomalyDetailModal } from "./components/anomaly-detail-modal"

export default function DataQualityPage() {
  const {
    qualityMetrics,
    filteredAnomalies,
    selectedAnomaly,
    setSelectedAnomaly,
    filters,
    updateFilter,
    handleResolveAnomaly,
    handleAcceptAnomaly,
    handleFlagAnomaly,
    
    // Validation Rules
    validationRules,
    handleCreateValidationRule,
    handleUpdateValidationRule,
    handleDeleteValidationRule,
    handleToggleValidationRule,
    
    // Data Completeness
    completenessChecks,
    handleCreateCompletenessCheck,
    handleUpdateCompletenessCheck,
    handleSendReminder,
    
    // AI Insights
    aiInsights,
    handleRefreshInsights,
    handleProvideFeedback,
    handleTakeAction
  } = useDataQuality()

  const topIssues = filteredAnomalies
    .filter(anomaly => anomaly.severity === "critical" || anomaly.severity === "high")
    .slice(0, 5)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/data-hub">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Data Hub
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">Data Quality Management</h1>
                <p className="text-gray-600">Monitor and improve ESG data quality with automated checks and AI insights</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh All
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="anomalies" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Anomalies
            </TabsTrigger>
            <TabsTrigger value="validation-rules" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Validation Rules
            </TabsTrigger>
            <TabsTrigger value="data-completeness" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Data Completeness
            </TabsTrigger>
            <TabsTrigger value="ai-insights" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              AI Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <DashboardTab
              qualityMetrics={qualityMetrics}
              topIssues={topIssues}
              onViewAnomaly={setSelectedAnomaly}
            />
          </TabsContent>

          <TabsContent value="anomalies">
            <AnomaliesTab
              anomalies={filteredAnomalies}
              filters={filters}
              onFilterUpdate={updateFilter}
              onViewAnomaly={setSelectedAnomaly}
              onResolveAnomaly={(anomalyId) => handleResolveAnomaly(anomalyId, "Marked as resolved")}
              onFlagAnomaly={(anomalyId) => handleFlagAnomaly(anomalyId, "Data Team")}
            />
          </TabsContent>

          <TabsContent value="validation-rules">
            <ValidationRulesTab
              validationRules={validationRules}
              onCreateRule={handleCreateValidationRule}
              onUpdateRule={handleUpdateValidationRule}
              onDeleteRule={handleDeleteValidationRule}
              onToggleRule={handleToggleValidationRule}
            />
          </TabsContent>

          <TabsContent value="data-completeness">
            <DataCompletenessTab
              completenessChecks={completenessChecks}
              onCreateCheck={handleCreateCompletenessCheck}
              onUpdateCheck={handleUpdateCompletenessCheck}
              onSendReminder={handleSendReminder}
            />
          </TabsContent>

          <TabsContent value="ai-insights">
            <AIInsightsTab
              insights={aiInsights}
              onRefreshInsights={handleRefreshInsights}
              onProvideFeedback={handleProvideFeedback}
              onTakeAction={handleTakeAction}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Anomaly Detail Modal */}
      {selectedAnomaly && (
        <AnomalyDetailModal
          anomaly={selectedAnomaly}
          onClose={() => setSelectedAnomaly(null)}
          onResolve={handleResolveAnomaly}
          onAccept={handleAcceptAnomaly}
        />
      )}
    </div>
  )
}