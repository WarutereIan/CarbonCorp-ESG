import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowRight,
  Brain,
  Calendar,
  Clock,
  Download,
  FileText,
  Pencil,
  Plus,
  Search,
  Share2,
  Trash2,
  Wand2,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function ReportingPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reporting</h1>
          <p className="text-muted-foreground">Create, manage, and share ESG reports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule
          </Button>
          <Button asChild>
            <Link href="/analytics/reports/new">
              <Plus className="mr-2 h-4 w-4" />
              New Report
            </Link>
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            <Card className="bg-muted/50">
              <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Wand2 className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-sm font-medium">AI-Generated Report</h3>
                <p className="text-xs text-muted-foreground">Create a complete report with AI assistance</p>
                <Button size="sm" className="mt-2" asChild>
                  <Link href="/analytics/reports/new?tab=ai">Generate</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-muted/50">
              <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Pencil className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-sm font-medium">Reporting Studio</h3>
                <p className="text-xs text-muted-foreground">Edit and design reports with advanced tools</p>
                <Button size="sm" className="mt-2" asChild>
                  <Link href="/reporting/studio">Open Studio</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-muted/50">
              <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-sm font-medium">Templates</h3>
                <p className="text-xs text-muted-foreground">Use pre-designed templates for quick reporting</p>
                <Button size="sm" className="mt-2">
                  Browse Templates
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-muted/50">
              <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-sm font-medium">AI Assistant</h3>
                <p className="text-xs text-muted-foreground">Get help with specific reporting tasks</p>
                <Button size="sm" className="mt-2">
                  Ask AI
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="recent">
        <TabsList>
          <TabsTrigger value="recent">Recent Reports</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
        </TabsList>
        <TabsContent value="recent" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Recent Reports</CardTitle>
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <Input placeholder="Search reports..." className="h-8" />
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="px-4 py-3 text-left text-sm font-medium">Report Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Created</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="px-4 py-3 text-sm">Q2 2024 Sustainability Report</td>
                        <td className="px-4 py-3 text-sm">May 14, 2024</td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center gap-1">
                            <Brain className="h-3.5 w-3.5 text-primary" />
                            <span>AI-Generated</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center">
                            <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                            <span>Published</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href="/reporting/studio">Edit</Link>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm">Carbon Footprint Analysis</td>
                        <td className="px-4 py-3 text-sm">May 10, 2024</td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center gap-1">
                            <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>Manual</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center">
                            <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                            <span>Published</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm">ISSB Climate Report Draft</td>
                        <td className="px-4 py-3 text-sm">May 8, 2024</td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center gap-1">
                            <Brain className="h-3.5 w-3.5 text-primary" />
                            <span>AI-Generated</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center">
                            <div className="mr-2 h-2 w-2 rounded-full bg-amber-500"></div>
                            <span>Draft</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm">Q1 2024 ESG Performance</td>
                        <td className="px-4 py-3 text-sm">Apr 15, 2024</td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center gap-1">
                            <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>Manual</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center">
                            <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                            <span>Published</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Share2 className="h-4 w-4" />
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
        </TabsContent>
        <TabsContent value="drafts" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Draft Reports</CardTitle>
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <Input placeholder="Search drafts..." className="h-8" />
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="px-4 py-3 text-left text-sm font-medium">Report Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Last Modified</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Completion</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="px-4 py-3 text-sm">ISSB Climate Report Draft</td>
                        <td className="px-4 py-3 text-sm">May 8, 2024</td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center gap-1">
                            <Brain className="h-3.5 w-3.5 text-primary" />
                            <span>AI-Generated</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-24 rounded-full bg-muted">
                              <div className="h-2 w-[75%] rounded-full bg-primary"></div>
                            </div>
                            <span className="text-xs">75%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              Continue
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm">Biodiversity Impact Assessment</td>
                        <td className="px-4 py-3 text-sm">May 5, 2024</td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center gap-1">
                            <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>Manual</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-24 rounded-full bg-muted">
                              <div className="h-2 w-[40%] rounded-full bg-primary"></div>
                            </div>
                            <span className="text-xs">40%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              Continue
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
        </TabsContent>
        <TabsContent value="templates" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Report Templates</CardTitle>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  New Template
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium">Quarterly ESG Summary</h3>
                          <p className="text-xs text-muted-foreground">Comprehensive quarterly ESG report</p>
                        </div>
                      </div>
                      <div className="rounded-md border p-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">5 sections</span>
                          <span className="text-xs text-muted-foreground">12 pages</span>
                        </div>
                      </div>
                      <Button size="sm">Use Template</Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium">CSRD Compliance Report</h3>
                          <p className="text-xs text-muted-foreground">EU CSRD regulatory reporting</p>
                        </div>
                      </div>
                      <div className="rounded-md border p-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">8 sections</span>
                          <span className="text-xs text-muted-foreground">20 pages</span>
                        </div>
                      </div>
                      <Button size="sm">Use Template</Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium">Carbon Footprint Report</h3>
                          <p className="text-xs text-muted-foreground">Detailed emissions analysis</p>
                        </div>
                      </div>
                      <div className="rounded-md border p-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">4 sections</span>
                          <span className="text-xs text-muted-foreground">8 pages</span>
                        </div>
                      </div>
                      <Button size="sm">Use Template</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="scheduled" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Scheduled Reports</CardTitle>
                <Button size="sm">
                  <Clock className="mr-2 h-4 w-4" />
                  Schedule Report
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="px-4 py-3 text-left text-sm font-medium">Report Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Frequency</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Next Run</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Recipients</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="px-4 py-3 text-sm">Quarterly ESG Summary</td>
                        <td className="px-4 py-3 text-sm">Quarterly</td>
                        <td className="px-4 py-3 text-sm">Jun 30, 2024</td>
                        <td className="px-4 py-3 text-sm">Executive Team, Sustainability Team</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm">Monthly Carbon Emissions</td>
                        <td className="px-4 py-3 text-sm">Monthly</td>
                        <td className="px-4 py-3 text-sm">May 31, 2024</td>
                        <td className="px-4 py-3 text-sm">Sustainability Team</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              Edit
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
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Reporting Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                      <Brain className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">AI Recommendation</h3>
                      <p className="text-xs text-muted-foreground">Based on your reporting patterns</p>
                    </div>
                  </div>
                  <p className="text-sm">
                    Consider adding water usage metrics to your quarterly reports to align with CSRD requirements.
                  </p>
                  <Button variant="outline" size="sm" className="mt-auto">
                    Apply Recommendation
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Upcoming Deadline</h3>
                      <p className="text-xs text-muted-foreground">Mark your calendar</p>
                    </div>
                  </div>
                  <p className="text-sm">
                    Q2 2024 ESG report needs to be submitted to the executive team by June 15, 2024.
                  </p>
                  <Button variant="outline" size="sm" className="mt-auto">
                    Start Preparation
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                      <ArrowRight className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Reporting Guide</h3>
                      <p className="text-xs text-muted-foreground">Learn best practices</p>
                    </div>
                  </div>
                  <p className="text-sm">
                    Explore our guide on creating effective ESG reports that meet stakeholder expectations.
                  </p>
                  <Button variant="outline" size="sm" className="mt-auto">
                    View Guide
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
