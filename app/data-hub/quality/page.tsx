"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Shield, AlertTriangle, TrendingUp } from "lucide-react"

export default function DataQualityPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => router.push("/data-hub")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Data Hub
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Data Quality Management</h1>
            <p className="text-muted-foreground">
              Monitor and maintain ESG data quality through validation rules and anomaly detection
            </p>
          </div>
        </div>
      </div>

      {/* Coming Soon Notice */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Data Quality Management - Phase 2.2</span>
          </CardTitle>
          <CardDescription>
            Comprehensive data quality management tools are in development
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-center py-8">
              <Shield className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium mb-2">Advanced Data Quality Features Coming Soon</h3>
              <p className="text-gray-600 mb-4">
                Phase 2.2 will implement comprehensive data quality management including:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 border rounded-lg">
                <h4 className="font-medium mb-3 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
                  Data Validation Rules Engine
                </h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Define custom validation rules for ESG metrics</li>
                  <li>• Range checks and format validation</li>
                  <li>• Cross-field validation and consistency checks</li>
                  <li>• AI-assisted rule suggestions</li>
                </ul>
              </div>

              <div className="p-6 border rounded-lg">
                <h4 className="font-medium mb-3 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
                  Automated Anomaly Detection
                </h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• AI-powered data profiling and outlier detection</li>
                  <li>• Configurable sensitivity levels</li>
                  <li>• Historical trend analysis</li>
                  <li>• Statistical anomaly identification</li>
                </ul>
              </div>

              <div className="p-6 border rounded-lg">
                <h4 className="font-medium mb-3">Data Quality Dashboard</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Overall data quality scoring</li>
                  <li>• Quality trends over time</li>
                  <li>• Issues breakdown by source/category</li>
                  <li>• Top quality issues requiring attention</li>
                </ul>
              </div>

              <div className="p-6 border rounded-lg">
                <h4 className="font-medium mb-3">Anomaly Resolution Workflow</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Dedicated interface for reviewing anomalies</li>
                  <li>• Accept, correct, or flag for investigation</li>
                  <li>• Bulk actions for similar anomalies</li>
                  <li>• Complete audit trail of resolutions</li>
                </ul>
              </div>
            </div>

            <div className="text-center pt-4">
              <p className="text-sm text-gray-500">
                This comprehensive data quality management system will be implemented as part of Phase 2, Task 2.2 
                according to the development roadmap detailed in the Dev Guide Section 4.2.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 