import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Brain, FileText, Lightbulb, PenLine, Wand2 } from "lucide-react"
import { AIReportGenerator } from "@/components/analytics/ai-report-generator"
import { ReportBuilder } from "@/components/analytics/report-builder"
import Link from "next/link"

export default function NewReportPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/analytics/reports">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Create New Report</h1>
            <p className="text-muted-foreground">Generate comprehensive ESG reports with AI assistance</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="ai">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ai" className="flex gap-2">
            <Brain className="h-4 w-4" />
            AI-Generated Report
          </TabsTrigger>
          <TabsTrigger value="manual" className="flex gap-2">
            <PenLine className="h-4 w-4" />
            Manual Report Builder
          </TabsTrigger>
        </TabsList>
        <TabsContent value="ai" className="mt-4">
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">AI-Powered Report Generation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 rounded-md bg-primary/10 p-3">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Let AI do the heavy lifting</p>
                    <p className="text-xs text-muted-foreground">
                      Our AI will analyze your organization's data and generate a comprehensive report with
                      visualizations, insights, and recommendations. You can customize the output and make edits before
                      finalizing.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="flex flex-col items-center gap-2 rounded-md border p-4 text-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Brain className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-sm font-medium">Data Analysis</h3>
                    <p className="text-xs text-muted-foreground">
                      AI analyzes your organization's ESG data to identify trends, patterns, and insights
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2 rounded-md border p-4 text-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-sm font-medium">Content Generation</h3>
                    <p className="text-xs text-muted-foreground">
                      Creates professional report content with executive summaries, findings, and recommendations
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2 rounded-md border p-4 text-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Wand2 className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-sm font-medium">Visual Design</h3>
                    <p className="text-xs text-muted-foreground">
                      Generates charts, graphs, and visual elements to effectively communicate your ESG performance
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <AIReportGenerator />
        </TabsContent>
        <TabsContent value="manual" className="mt-4">
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Manual Report Builder</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 rounded-md bg-muted p-3">
                  <PenLine className="h-5 w-5 text-muted-foreground" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Build your report from scratch</p>
                    <p className="text-xs text-muted-foreground">
                      Use the manual report builder to select specific components, data sources, and visualizations for
                      your report. This gives you complete control over the content and structure.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <ReportBuilder />
        </TabsContent>
      </Tabs>
    </div>
  )
}
