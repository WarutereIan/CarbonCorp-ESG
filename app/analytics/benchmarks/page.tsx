import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, FileText, Globe, Info, Plus, RefreshCw, TrendingUp } from "lucide-react"
import { BenchmarkComparison } from "@/components/analytics/benchmark-comparison"
import { BenchmarkRanking } from "@/components/analytics/benchmark-ranking"

export default function BenchmarksPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Benchmarking</h1>
          <p className="text-muted-foreground">Compare your ESG performance against industry peers and standards</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Data
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Benchmark
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Benchmark Configuration</CardTitle>
            <Button variant="outline" size="sm">
              <Info className="mr-2 h-4 w-4" />
              About Benchmarks
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Industry</label>
              <Select defaultValue="manufacturing">
                <SelectTrigger>
                  <SelectValue placeholder="Select Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="energy">Energy</SelectItem>
                  <SelectItem value="consumer">Consumer Goods</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Region</label>
              <Select defaultValue="africa">
                <SelectTrigger>
                  <SelectValue placeholder="Select Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="africa">Africa</SelectItem>
                  <SelectItem value="global">Global</SelectItem>
                  <SelectItem value="west-africa">West Africa</SelectItem>
                  <SelectItem value="east-africa">East Africa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Company Size</label>
              <Select defaultValue="medium">
                <SelectTrigger>
                  <SelectValue placeholder="Select Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small (&lt; 100 employees)</SelectItem>
                  <SelectItem value="medium">Medium (100-1000 employees)</SelectItem>
                  <SelectItem value="large">Large (&gt; 1000 employees)</SelectItem>
                  <SelectItem value="all">All Sizes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Benchmark Type</label>
              <Select defaultValue="industry">
                <SelectTrigger>
                  <SelectValue placeholder="Select Benchmark" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="industry">Industry Average</SelectItem>
                  <SelectItem value="leaders">Industry Leaders (Top 10%)</SelectItem>
                  <SelectItem value="standards">Regulatory Standards</SelectItem>
                  <SelectItem value="custom">Custom Peer Group</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="comparison">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="comparison">Performance Comparison</TabsTrigger>
          <TabsTrigger value="ranking">Industry Ranking</TabsTrigger>
          <TabsTrigger value="trends">Benchmark Trends</TabsTrigger>
        </TabsList>
        <TabsContent value="comparison" className="mt-4">
          <BenchmarkComparison />
        </TabsContent>
        <TabsContent value="ranking" className="mt-4">
          <BenchmarkRanking />
        </TabsContent>
        <TabsContent value="trends" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Benchmark Trends Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Metric</label>
                    <Select defaultValue="carbon">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Metric" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="carbon">Carbon Intensity</SelectItem>
                        <SelectItem value="energy">Energy Efficiency</SelectItem>
                        <SelectItem value="water">Water Usage</SelectItem>
                        <SelectItem value="waste">Waste Management</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Time Period</label>
                    <Select defaultValue="3y">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1y">Last 1 Year</SelectItem>
                        <SelectItem value="3y">Last 3 Years</SelectItem>
                        <SelectItem value="5y">Last 5 Years</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Comparison</label>
                    <Select defaultValue="industry-and-leaders">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Comparison" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="industry">Industry Average Only</SelectItem>
                        <SelectItem value="leaders">Industry Leaders Only</SelectItem>
                        <SelectItem value="industry-and-leaders">Industry Average & Leaders</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex h-[350px] items-center justify-center rounded-md border-2 border-dashed p-6">
                  <div className="text-center">
                    <p className="text-sm font-medium">Benchmark Trend Visualization</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Showing Carbon Intensity trends over the last 3 years compared to industry average and leaders
                    </p>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <h3 className="text-sm font-medium">Trend Insights</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 h-2 w-2 rounded-full bg-primary"></div>
                      <p className="text-xs">
                        <span className="font-medium">Closing the Gap:</span> Your carbon intensity has improved by 18%
                        over 3 years, narrowing the gap with industry leaders from 35% to 22%.
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 h-2 w-2 rounded-full bg-primary"></div>
                      <p className="text-xs">
                        <span className="font-medium">Outperforming Average:</span> You've consistently performed better
                        than the industry average since Q3 2022.
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 h-2 w-2 rounded-full bg-primary"></div>
                      <p className="text-xs">
                        <span className="font-medium">Improvement Rate:</span> Your annual improvement rate (6%) exceeds
                        the industry average improvement rate (3.5%).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Recommended Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-md border p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium">Energy Efficiency Opportunity</h4>
                  <p className="text-xs text-muted-foreground">
                    Your energy efficiency is 15% below industry leaders. Implementing LED lighting and HVAC upgrades
                    could close this gap.
                  </p>
                </div>
                <Button size="sm">View Details</Button>
              </div>
            </div>
            <div className="rounded-md border p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium">Scope 3 Emissions Gap</h4>
                  <p className="text-xs text-muted-foreground">
                    Your Scope 3 emissions disclosure is less comprehensive than 75% of industry peers. Consider
                    expanding supplier engagement.
                  </p>
                </div>
                <Button size="sm">View Details</Button>
              </div>
            </div>
            <div className="rounded-md border p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium">Reporting Best Practices</h4>
                  <p className="text-xs text-muted-foreground">
                    Industry leaders are adopting TCFD-aligned climate risk disclosures. Consider enhancing your
                    reporting framework.
                  </p>
                </div>
                <Button size="sm">View Details</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
