import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Calendar, CheckCircle, Download, FileText, Search, Shield, XCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CompliancePage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Compliance Center</h1>
          <p className="text-muted-foreground">Track regulatory requirements and compliance status</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            View Calendar
          </Button>
          <Button>
            <Shield className="mr-2 h-4 w-4" />
            Run Gap Analysis
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <CardTitle className="text-base">Compliance Matrix</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search requirements..."
                  className="h-9 rounded-md border border-input bg-background pl-8 pr-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="h-9 w-[150px]">
                  <SelectValue placeholder="Standard" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Standards</SelectItem>
                  <SelectItem value="issb">ISSB</SelectItem>
                  <SelectItem value="csrd">CSRD</SelectItem>
                  <SelectItem value="nigeria-sec">Nigeria SEC</SelectItem>
                  <SelectItem value="kenya-nema">Kenya NEMA</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="h-9 w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="met">Met</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left text-sm font-medium">Requirement</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Standard</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Due Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Evidence</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-4 py-3 text-sm">Disclose Scope 1 & 2 emissions</td>
                    <td className="px-4 py-3 text-sm">ISSB Climate</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        <span className="text-sm">Met</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">Complete</td>
                    <td className="px-4 py-3 text-sm">
                      <Button variant="link" className="h-auto p-0 text-sm">
                        GHG Inventory Report
                      </Button>
                    </td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm">Disclose Scope 3 emissions</td>
                    <td className="px-4 py-3 text-sm">ISSB Climate</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="mr-2 h-4 w-4 rounded-full border-2 border-amber-500"></div>
                        <span className="text-sm">Pending</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">Jun 30, 2024</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="text-muted-foreground">Partial data</span>
                    </td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm">
                        Assign
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm">Board diversity disclosure</td>
                    <td className="px-4 py-3 text-sm">CSRD</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="mr-2 h-4 w-4 rounded-full border-2 border-amber-500"></div>
                        <span className="text-sm">Pending</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">Jul 15, 2024</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="text-muted-foreground">In progress</span>
                    </td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm">
                        Assign
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm">Water management plan</td>
                    <td className="px-4 py-3 text-sm">Nigeria SEC</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        <span className="text-sm">Met</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">Complete</td>
                    <td className="px-4 py-3 text-sm">
                      <Button variant="link" className="h-auto p-0 text-sm">
                        Water Management Report
                      </Button>
                    </td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm">Climate scenario analysis</td>
                    <td className="px-4 py-3 text-sm">ISSB Climate</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <XCircle className="mr-2 h-4 w-4 text-red-500" />
                        <span className="text-sm">Overdue</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">May 1, 2024</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="text-muted-foreground">Not started</span>
                    </td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm">
                        Assign
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm">Biodiversity impact assessment</td>
                    <td className="px-4 py-3 text-sm">Kenya NEMA</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="mr-2 h-4 w-4 rounded-full border-2 border-amber-500"></div>
                        <span className="text-sm">Pending</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">Aug 15, 2024</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="text-muted-foreground">In progress</span>
                    </td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm">
                        Assign
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Gap Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="priority">
              <TabsList className="mb-4 w-full">
                <TabsTrigger value="priority" className="flex-1">
                  Priority Gaps
                </TabsTrigger>
                <TabsTrigger value="standard" className="flex-1">
                  By Standard
                </TabsTrigger>
              </TabsList>
              <TabsContent value="priority">
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-500">
                        <span className="text-sm font-bold">1</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">Complete Climate Scenario Analysis</h4>
                        <p className="text-xs text-muted-foreground">ISSB Climate requirement - Overdue</p>
                      </div>
                      <Button size="sm">Assign Task</Button>
                    </div>
                    <div className="mt-2 text-xs">
                      <p>AI Suggestion: Use the Risk Predictor in AI Engine to generate scenarios</p>
                    </div>
                  </div>

                  <div className="rounded-md border p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-500">
                        <span className="text-sm font-bold">2</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">Complete Scope 3 Emissions Inventory</h4>
                        <p className="text-xs text-muted-foreground">ISSB Climate requirement - Due Jun 30</p>
                      </div>
                      <Button size="sm">Assign Task</Button>
                    </div>
                    <div className="mt-2 text-xs">
                      <p>AI Suggestion: Conduct supplier audit for Scope 3 data</p>
                    </div>
                  </div>

                  <div className="rounded-md border p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-500">
                        <span className="text-sm font-bold">3</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">Add Board Diversity Statistics</h4>
                        <p className="text-xs text-muted-foreground">CSRD requirement - Due Jul 15</p>
                      </div>
                      <Button size="sm">Assign Task</Button>
                    </div>
                    <div className="mt-2 text-xs">
                      <p>AI Suggestion: Use HR data from Sage integration</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="standard">
                <div className="space-y-4">
                  <div className="rounded-md border">
                    <div className="bg-muted/50 px-4 py-2 text-sm font-medium">ISSB Climate</div>
                    <div className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Compliance Rate</span>
                          <span className="text-sm font-medium">68%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 w-[68%] rounded-full bg-amber-500"></div>
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-start gap-2">
                          <XCircle className="mt-0.5 h-4 w-4 text-red-500" />
                          <span className="text-sm">Climate scenario analysis (Overdue)</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="mt-0.5 h-4 w-4 rounded-full border-2 border-amber-500"></div>
                          <span className="text-sm">Scope 3 emissions disclosure (Pending)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-md border">
                    <div className="bg-muted/50 px-4 py-2 text-sm font-medium">CSRD</div>
                    <div className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Compliance Rate</span>
                          <span className="text-sm font-medium">45%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 w-[45%] rounded-full bg-red-500"></div>
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-start gap-2">
                          <div className="mt-0.5 h-4 w-4 rounded-full border-2 border-amber-500"></div>
                          <span className="text-sm">Board diversity disclosure (Pending)</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="mt-0.5 h-4 w-4 rounded-full border-2 border-amber-500"></div>
                          <span className="text-sm">Supply chain due diligence (Pending)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Regulatory Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">ISSB Standards Update</h4>
                    <p className="text-xs text-muted-foreground">Published May 5, 2024</p>
                  </div>
                </div>
                <p className="mt-2 text-sm">
                  New guidance on biodiversity-related disclosures has been released. Companies are now expected to
                  report on their impacts on biodiversity.
                </p>
                <div className="mt-2 flex justify-between">
                  <Button variant="link" className="h-auto p-0 text-xs">
                    View details <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-3 w-3" />
                    Download
                  </Button>
                </div>
              </div>

              <div className="rounded-md border p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Nigeria SEC ESG Guidelines</h4>
                    <p className="text-xs text-muted-foreground">Published April 15, 2024</p>
                  </div>
                </div>
                <p className="mt-2 text-sm">
                  The Securities and Exchange Commission of Nigeria has updated its ESG reporting guidelines with new
                  requirements for climate risk disclosure.
                </p>
                <div className="mt-2 flex justify-between">
                  <Button variant="link" className="h-auto p-0 text-xs">
                    View details <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-3 w-3" />
                    Download
                  </Button>
                </div>
              </div>

              <div className="rounded-md border p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">CSRD Implementation Timeline</h4>
                    <p className="text-xs text-muted-foreground">Published March 20, 2024</p>
                  </div>
                </div>
                <p className="mt-2 text-sm">
                  The European Commission has published an updated implementation timeline for the Corporate
                  Sustainability Reporting Directive (CSRD).
                </p>
                <div className="mt-2 flex justify-between">
                  <Button variant="link" className="h-auto p-0 text-xs">
                    View details <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-3 w-3" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
