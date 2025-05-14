import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  Calendar,
  Check,
  ChevronRight,
  Download,
  FileText,
  LineChart,
  PieChart,
  Plus,
  Save,
  Table,
} from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

export function ReportBuilder() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
      <div className="lg:col-span-1">
        <Card className="h-full">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Report Components</CardTitle>
              <Button variant="ghost" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Custom
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="sections" className="h-full">
              <div className="border-b px-3">
                <TabsList className="w-full">
                  <TabsTrigger value="sections" className="flex-1">
                    Sections
                  </TabsTrigger>
                  <TabsTrigger value="charts" className="flex-1">
                    Charts
                  </TabsTrigger>
                  <TabsTrigger value="tables" className="flex-1">
                    Tables
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="sections" className="h-[calc(100%-40px)] overflow-auto p-0">
                <div className="p-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="text-sm">Executive Summary</span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="text-sm">Environmental Performance</span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="text-sm">Social Initiatives</span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="text-sm">Governance Overview</span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="text-sm">Regulatory Compliance</span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="text-sm">Risk Assessment</span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="text-sm">Future Targets</span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="charts" className="h-[calc(100%-40px)] overflow-auto p-0">
                <div className="p-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-primary" />
                        <span className="text-sm">Emissions by Scope</span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50">
                      <div className="flex items-center gap-2">
                        <LineChart className="h-4 w-4 text-primary" />
                        <span className="text-sm">Energy Consumption Trend</span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50">
                      <div className="flex items-center gap-2">
                        <PieChart className="h-4 w-4 text-primary" />
                        <span className="text-sm">Gender Diversity</span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-primary" />
                        <span className="text-sm">Water Usage by Facility</span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50">
                      <div className="flex items-center gap-2">
                        <LineChart className="h-4 w-4 text-primary" />
                        <span className="text-sm">Training Hours Trend</span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50">
                      <div className="flex items-center gap-2">
                        <PieChart className="h-4 w-4 text-primary" />
                        <span className="text-sm">Waste Management</span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="tables" className="h-[calc(100%-40px)] overflow-auto p-0">
                <div className="p-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50">
                      <div className="flex items-center gap-2">
                        <Table className="h-4 w-4 text-primary" />
                        <span className="text-sm">Emissions Data</span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50">
                      <div className="flex items-center gap-2">
                        <Table className="h-4 w-4 text-primary" />
                        <span className="text-sm">Energy Consumption</span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50">
                      <div className="flex items-center gap-2">
                        <Table className="h-4 w-4 text-primary" />
                        <span className="text-sm">Workforce Metrics</span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50">
                      <div className="flex items-center gap-2">
                        <Table className="h-4 w-4 text-primary" />
                        <span className="text-sm">Compliance Status</span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50">
                      <div className="flex items-center gap-2">
                        <Table className="h-4 w-4 text-primary" />
                        <span className="text-sm">Water Usage Data</span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-3">
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Report Configuration</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Save className="mr-2 h-4 w-4" />
                  Save Draft
                </Button>
                <Button size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Report Name</label>
                  <Input placeholder="Enter report name..." defaultValue="Q2 2024 ESG Performance Report" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time Period</label>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 justify-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      Apr 1 - Jun 30
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Output Format</label>
                  <Select defaultValue="pdf">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="ppt">PowerPoint</SelectItem>
                      <SelectItem value="multiple">Multiple Formats</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border">
                <div className="bg-muted/50 px-4 py-2 text-sm font-medium">Selected Components</div>
                <div className="divide-y">
                  <div className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-3">
                      <Checkbox id="section1" defaultChecked />
                      <label htmlFor="section1" className="text-sm">
                        Executive Summary
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500">
                        Remove
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-3">
                      <Checkbox id="section2" defaultChecked />
                      <label htmlFor="section2" className="text-sm">
                        Environmental Performance
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500">
                        Remove
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-3">
                      <Checkbox id="chart1" defaultChecked />
                      <label htmlFor="chart1" className="text-sm">
                        Emissions by Scope (Chart)
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500">
                        Remove
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-3">
                      <Checkbox id="table1" defaultChecked />
                      <label htmlFor="table1" className="text-sm">
                        Emissions Data (Table)
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500">
                        Remove
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-3">
                      <Checkbox id="section3" defaultChecked />
                      <label htmlFor="section3" className="text-sm">
                        Social Initiatives
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500">
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="border-t p-3">
                  <Button variant="outline" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Component
                  </Button>
                </div>
              </div>

              <div className="flex h-[300px] items-center justify-center rounded-md border-2 border-dashed p-6">
                <div className="text-center">
                  <p className="text-sm font-medium">Report Preview</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Preview how your report will look with the selected components
                  </p>
                  <Button className="mt-4" size="sm">
                    Preview Report
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Distribution Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Recipients</label>
                  <div className="rounded-md border p-3">
                    <div className="flex items-center gap-2">
                      <Checkbox id="recipient1" defaultChecked />
                      <label htmlFor="recipient1" className="text-sm">
                        Executive Team
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="recipient2" defaultChecked />
                      <label htmlFor="recipient2" className="text-sm">
                        Sustainability Team
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="recipient3" />
                      <label htmlFor="recipient3" className="text-sm">
                        Board of Directors
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="recipient4" />
                      <label htmlFor="recipient4" className="text-sm">
                        External Stakeholders
                      </label>
                    </div>
                    <div className="mt-2">
                      <Button variant="outline" size="sm">
                        <Plus className="mr-2 h-3.5 w-3.5" />
                        Add Custom Recipients
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Delivery Options</label>
                  <div className="rounded-md border p-3">
                    <div className="flex items-center gap-2">
                      <Checkbox id="delivery1" defaultChecked />
                      <label htmlFor="delivery1" className="text-sm">
                        Email Report
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="delivery2" defaultChecked />
                      <label htmlFor="delivery2" className="text-sm">
                        Save to Document Repository
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="delivery3" />
                      <label htmlFor="delivery3" className="text-sm">
                        Generate Presentation
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="delivery4" />
                      <label htmlFor="delivery4" className="text-sm">
                        Schedule Recurring Delivery
                      </label>
                    </div>
                    <div className="mt-2">
                      <Button variant="outline" size="sm">
                        <Calendar className="mr-2 h-3.5 w-3.5" />
                        Set Schedule
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="flex gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>
                    <Check className="mr-2 h-4 w-4" />
                    Save and Generate
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
