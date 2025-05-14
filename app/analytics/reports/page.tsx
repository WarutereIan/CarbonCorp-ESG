import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Download, FileText, LayoutDashboard, Plus, Save, Share2, Trash2 } from "lucide-react"
import { ReportBuilder } from "@/components/analytics/report-builder"
import { ReportScheduler } from "@/components/analytics/report-scheduler"
import Link from "next/link"

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Custom Reports</h1>
          <p className="text-muted-foreground">Create, schedule, and share custom ESG reports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Clock className="mr-2 h-4 w-4" />
            Schedule
          </Button>
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button asChild>
            <Link href="/analytics/reports/new">
              <Plus className="mr-2 h-4 w-4" />
              New Report
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="builder">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="builder">Report Builder</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="builder" className="mt-4">
          <ReportBuilder />
        </TabsContent>
        <TabsContent value="templates" className="mt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Report Templates</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1 p-2">
                  <div className="flex items-center justify-between rounded-md bg-muted/50 p-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Quarterly ESG Summary</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="text-sm">Carbon Footprint Report</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="text-sm">Sustainability Metrics</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="text-sm">Regulatory Compliance</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="text-sm">Social Impact Summary</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="text-sm">Governance Overview</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="border-t p-2">
                  <Button variant="ghost" className="w-full justify-start text-sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Template
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1 md:col-span-2">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Quarterly ESG Summary</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Save className="mr-2 h-4 w-4" />
                      Save As
                    </Button>
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Use Template
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <h3 className="text-sm font-medium">Template Description</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      A comprehensive quarterly summary of key ESG metrics, including environmental performance, social
                      initiatives, and governance highlights. Designed for executive review and stakeholder
                      communication.
                    </p>
                  </div>

                  <div className="rounded-md border">
                    <div className="bg-muted/50 px-4 py-2 text-sm font-medium">Included Sections</div>
                    <div className="divide-y">
                      <div className="flex items-center justify-between p-3">
                        <div className="flex items-center gap-3">
                          <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Executive Summary</span>
                        </div>
                        <div className="text-xs text-muted-foreground">Auto-generated</div>
                      </div>
                      <div className="flex items-center justify-between p-3">
                        <div className="flex items-center gap-3">
                          <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Environmental Performance</span>
                        </div>
                        <div className="text-xs text-muted-foreground">5 metrics</div>
                      </div>
                      <div className="flex items-center justify-between p-3">
                        <div className="flex items-center gap-3">
                          <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Social Initiatives</span>
                        </div>
                        <div className="text-xs text-muted-foreground">3 metrics</div>
                      </div>
                      <div className="flex items-center justify-between p-3">
                        <div className="flex items-center gap-3">
                          <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Governance Highlights</span>
                        </div>
                        <div className="text-xs text-muted-foreground">4 metrics</div>
                      </div>
                      <div className="flex items-center justify-between p-3">
                        <div className="flex items-center gap-3">
                          <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Regulatory Compliance Status</span>
                        </div>
                        <div className="text-xs text-muted-foreground">Compliance summary</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex h-[200px] items-center justify-center rounded-md border-2 border-dashed p-6">
                    <div className="text-center">
                      <p className="text-sm font-medium">Template Preview</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Preview how the report will look when generated
                      </p>
                      <Button className="mt-4" size="sm">
                        Preview Template
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="scheduled" className="mt-4">
          <ReportScheduler />
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left text-sm font-medium">Report Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Created</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Created By</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Format</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-4 py-3 text-sm">Q2 2024 ESG Performance</td>
                    <td className="px-4 py-3 text-sm">May 15, 2024</td>
                    <td className="px-4 py-3 text-sm">John Doe</td>
                    <td className="px-4 py-3 text-sm">PDF, Excel</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm">Carbon Footprint Analysis</td>
                    <td className="px-4 py-3 text-sm">May 10, 2024</td>
                    <td className="px-4 py-3 text-sm">Alice Brown</td>
                    <td className="px-4 py-3 text-sm">PDF</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm">Sustainability Metrics</td>
                    <td className="px-4 py-3 text-sm">May 5, 2024</td>
                    <td className="px-4 py-3 text-sm">Tom Miller</td>
                    <td className="px-4 py-3 text-sm">PDF, PowerPoint</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm">Q1 2024 ESG Performance</td>
                    <td className="px-4 py-3 text-sm">Apr 15, 2024</td>
                    <td className="px-4 py-3 text-sm">John Doe</td>
                    <td className="px-4 py-3 text-sm">PDF, Excel</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
