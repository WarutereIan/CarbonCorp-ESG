import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Database, FileUp, Link, Plus, RefreshCw, AlertCircle } from "lucide-react"

export default function DataHubPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Data Hub</h1>
          <p className="text-muted-foreground">Collect, validate, and manage your ESG data</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Data
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Data Source
          </Button>
        </div>
      </div>

      <Tabs defaultValue="sources">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sources">Data Sources</TabsTrigger>
          <TabsTrigger value="pipeline">Data Pipeline</TabsTrigger>
          <TabsTrigger value="quality">Data Quality</TabsTrigger>
        </TabsList>
        <TabsContent value="sources" className="mt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">API Connectors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 rounded-md border p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                      <Database className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">QuickBooks</h4>
                      <p className="text-xs text-muted-foreground">Financial data</p>
                    </div>
                    <div className="flex h-5 items-center rounded-full bg-green-100 px-2 text-xs font-medium text-green-700">
                      Connected
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-md border p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                      <Database className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">Sage</h4>
                      <p className="text-xs text-muted-foreground">HR data</p>
                    </div>
                    <div className="flex h-5 items-center rounded-full bg-green-100 px-2 text-xs font-medium text-green-700">
                      Connected
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-md border p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                      <Database className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">IoT Platform</h4>
                      <p className="text-xs text-muted-foreground">Energy usage data</p>
                    </div>
                    <div className="flex h-5 items-center rounded-full bg-amber-100 px-2 text-xs font-medium text-amber-700">
                      Needs Auth
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Link className="mr-2 h-4 w-4" />
                    Connect New API
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Manual Uploads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 rounded-md border p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                      <FileUp className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">Emissions Data</h4>
                      <p className="text-xs text-muted-foreground">Last updated: 2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-md border p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                      <FileUp className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">Water Usage</h4>
                      <p className="text-xs text-muted-foreground">Last updated: 1 week ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-md border p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                      <FileUp className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">Waste Management</h4>
                      <p className="text-xs text-muted-foreground">Last updated: 2 weeks ago</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <FileUp className="mr-2 h-4 w-4" />
                    Upload New Data
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-sm">QuickBooks data synced</p>
                    <p className="text-xs text-muted-foreground">Today, 10:23 AM</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm">Emissions data uploaded</p>
                    <p className="text-xs text-muted-foreground">Yesterday, 2:45 PM</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm">Data anomaly detected</p>
                    <p className="text-xs text-muted-foreground">Yesterday, 11:30 AM</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm">Sage HR data synced</p>
                    <p className="text-xs text-muted-foreground">3 days ago, 9:15 AM</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm">Water usage data updated</p>
                    <p className="text-xs text-muted-foreground">1 week ago, 4:30 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="pipeline" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Data Pipeline Builder</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-[400px] items-center justify-center rounded-md border-2 border-dashed p-6">
                <div className="text-center">
                  <h3 className="text-lg font-medium">Visual Data Pipeline Builder</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Drag and drop nodes to create your data pipeline</p>
                  <div className="mt-4 flex justify-center gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-md bg-primary/10">
                        <Database className="h-8 w-8 text-primary" />
                      </div>
                      <span className="mt-2 text-xs">Data Sources</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-md bg-primary/10">
                        <RefreshCw className="h-8 w-8 text-primary" />
                      </div>
                      <span className="mt-2 text-xs">Transformations</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-md bg-primary/10">
                        <FileUp className="h-8 w-8 text-primary" />
                      </div>
                      <span className="mt-2 text-xs">Destinations</span>
                    </div>
                  </div>
                  <Button className="mt-6">
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Pipeline
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="quality" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Data Quality Scorecard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Overall Data Quality</span>
                    <span className="text-sm font-medium">78%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 w-[78%] rounded-full bg-primary"></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Completeness</span>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 w-[85%] rounded-full bg-green-500"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Accuracy</span>
                      <span className="text-sm font-medium">72%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 w-[72%] rounded-full bg-amber-500"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Freshness</span>
                      <span className="text-sm font-medium">68%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 w-[68%] rounded-full bg-amber-500"></div>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border">
                  <div className="bg-muted/50 px-4 py-2 text-sm font-medium">Flagged Anomalies</div>
                  <div className="divide-y">
                    <div className="flex items-center gap-4 p-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-500">
                        <AlertCircle className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">Unusual spike in water usage</h4>
                        <p className="text-xs text-muted-foreground">Lagos facility, May 15, 2024</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Resolve
                      </Button>
                    </div>
                    <div className="flex items-center gap-4 p-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-500">
                        <AlertCircle className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">Missing electricity data</h4>
                        <p className="text-xs text-muted-foreground">Nairobi facility, April 28-30, 2024</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Resolve
                      </Button>
                    </div>
                    <div className="flex items-center gap-4 p-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-500">
                        <AlertCircle className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">Inconsistent emissions reporting</h4>
                        <p className="text-xs text-muted-foreground">Accra facility, Q1 2024</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Resolve
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
