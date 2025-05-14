import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  Download,
  FileText,
  LineChart,
  PieChart,
  Plus,
  RefreshCw,
  Search,
  Share2,
  Clock,
} from "lucide-react"
import { AnalyticsKpiCard } from "@/components/analytics/analytics-kpi-card"
import { AnalyticsChart } from "@/components/analytics/analytics-chart"

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Analyze and visualize your ESG performance data</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <a href="/analytics/explorer">
              <Search className="mr-2 h-4 w-4" />
              Data Explorer
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/analytics/benchmarks">
              <BarChart3 className="mr-2 h-4 w-4" />
              Benchmarks
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/analytics/reports">
              <FileText className="mr-2 h-4 w-4" />
              Reports
            </a>
          </Button>
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Data
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Widget
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex flex-1 flex-wrap items-center gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium">Time Period</span>
            <Select defaultValue="q2-2024">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="q1-2024">Q1 2024</SelectItem>
                <SelectItem value="q2-2024">Q2 2024</SelectItem>
                <SelectItem value="q3-2024">Q3 2024</SelectItem>
                <SelectItem value="q4-2024">Q4 2024</SelectItem>
                <SelectItem value="2023">2023 (Full Year)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium">Location</span>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="lagos">Lagos, Nigeria</SelectItem>
                <SelectItem value="nairobi">Nairobi, Kenya</SelectItem>
                <SelectItem value="accra">Accra, Ghana</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium">Comparison</span>
            <Select defaultValue="previous">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select comparison" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="previous">Previous Period</SelectItem>
                <SelectItem value="target">Target Values</SelectItem>
                <SelectItem value="benchmark">Industry Benchmark</SelectItem>
                <SelectItem value="none">No Comparison</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Clock className="mr-2 h-4 w-4" />
            Schedule Report
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <AnalyticsKpiCard
          title="Total Carbon Emissions"
          value="1,245.8"
          unit="tCO₂e"
          change={-8.2}
          target="1,150.0"
          progress={78}
        />
        <AnalyticsKpiCard title="Renewable Energy" value="32.5" unit="%" change={8.7} target="40.0" progress={81} />
        <AnalyticsKpiCard title="Water Usage" value="12,450" unit="m³" change={-3.2} target="11,000" progress={65} />
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="environmental">Environmental</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="governance">Governance</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <AnalyticsChart title="Carbon Emissions by Scope" type="bar" icon={BarChart3} />
            <AnalyticsChart title="Energy Consumption Trend" type="line" icon={LineChart} />
            <AnalyticsChart title="Water Usage by Facility" type="pie" icon={PieChart} />
            <AnalyticsChart title="ESG Score Comparison" type="radar" icon={BarChart3} />
          </div>
        </TabsContent>
        <TabsContent value="environmental" className="mt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <AnalyticsChart title="Carbon Emissions by Scope" type="bar" icon={BarChart3} />
            <AnalyticsChart title="Energy Consumption Trend" type="line" icon={LineChart} />
            <AnalyticsChart title="Water Usage by Facility" type="pie" icon={PieChart} />
            <AnalyticsChart title="Waste Management" type="bar" icon={BarChart3} />
          </div>
        </TabsContent>
        <TabsContent value="social" className="mt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <AnalyticsChart title="Gender Diversity" type="pie" icon={PieChart} />
            <AnalyticsChart title="Training Hours" type="line" icon={LineChart} />
            <AnalyticsChart title="Community Investment" type="bar" icon={BarChart3} />
            <AnalyticsChart title="Employee Satisfaction" type="line" icon={LineChart} />
          </div>
        </TabsContent>
        <TabsContent value="governance" className="mt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <AnalyticsChart title="Board Composition" type="pie" icon={PieChart} />
            <AnalyticsChart title="Policy Compliance" type="bar" icon={BarChart3} />
            <AnalyticsChart title="Risk Assessment" type="radar" icon={BarChart3} />
            <AnalyticsChart title="Audit Findings" type="line" icon={LineChart} />
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Recent Analytics Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-md border p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium">Q2 2024 ESG Performance Report</h4>
                <p className="text-xs text-muted-foreground">Generated on May 15, 2024</p>
              </div>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
            <div className="flex items-center gap-3 rounded-md border p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium">Carbon Emissions Analysis</h4>
                <p className="text-xs text-muted-foreground">Generated on May 10, 2024</p>
              </div>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
            <div className="flex items-center gap-3 rounded-md border p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium">Sustainability Benchmark Comparison</h4>
                <p className="text-xs text-muted-foreground">Generated on May 5, 2024</p>
              </div>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
