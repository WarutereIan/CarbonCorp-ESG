import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  BarChart3,
  BookmarkIcon,
  Clock,
  Download,
  LineChart,
  PieChart,
  Plus,
  Save,
  Search,
  Share2,
  SlidersHorizontal,
  Star,
  Wand2,
} from "lucide-react"
import { MetricBrowser } from "@/components/analytics/metric-browser"
import { VisualizationBuilder } from "@/components/analytics/visualization-builder"
import { AnalysisTools } from "@/components/analytics/analysis-tools"

export default function DataExplorerPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Data Explorer</h1>
          <p className="text-muted-foreground">Explore and analyze your ESG data in depth</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Save View
          </Button>
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Share Analysis
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Left Sidebar - Metric Browser */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Metrics</CardTitle>
                <Button variant="ghost" size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Custom
                </Button>
              </div>
              <div className="relative mt-2">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search metrics..." className="pl-8" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="categories" className="h-full">
                <div className="border-b px-3">
                  <TabsList className="w-full">
                    <TabsTrigger value="categories" className="flex-1">
                      Categories
                    </TabsTrigger>
                    <TabsTrigger value="favorites" className="flex-1">
                      <Star className="mr-1 h-3.5 w-3.5" />
                      Favorites
                    </TabsTrigger>
                    <TabsTrigger value="recent" className="flex-1">
                      <Clock className="mr-1 h-3.5 w-3.5" />
                      Recent
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="categories" className="h-[calc(100%-40px)] overflow-auto p-0">
                  <MetricBrowser />
                </TabsContent>
                <TabsContent value="favorites" className="h-[calc(100%-40px)] overflow-auto p-0">
                  <div className="p-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50">
                        <div className="flex items-center gap-2">
                          <BookmarkIcon className="h-4 w-4 text-primary" />
                          <span className="text-sm">Scope 1 Emissions</span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Plus className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50">
                        <div className="flex items-center gap-2">
                          <BookmarkIcon className="h-4 w-4 text-primary" />
                          <span className="text-sm">Renewable Energy %</span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Plus className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50">
                        <div className="flex items-center gap-2">
                          <BookmarkIcon className="h-4 w-4 text-primary" />
                          <span className="text-sm">Water Intensity</span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Plus className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50">
                        <div className="flex items-center gap-2">
                          <BookmarkIcon className="h-4 w-4 text-primary" />
                          <span className="text-sm">Gender Diversity Ratio</span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Plus className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="recent" className="h-[calc(100%-40px)] overflow-auto p-0">
                  <div className="p-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Energy Consumption</span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Plus className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Scope 2 Emissions</span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Plus className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Training Hours</span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Plus className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Main Content - Visualization and Analysis */}
        <div className="lg:col-span-3">
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Visualization Builder</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Configure
                  </Button>
                  <Button variant="outline" size="sm">
                    <Wand2 className="mr-2 h-4 w-4" />
                    Auto Visualize
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <VisualizationBuilder />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Advanced Analysis</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <LineChart className="mr-2 h-4 w-4" />
                    Trend Analysis
                  </Button>
                  <Button variant="outline" size="sm">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Correlation
                  </Button>
                  <Button variant="outline" size="sm">
                    <PieChart className="mr-2 h-4 w-4" />
                    Outliers
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <AnalysisTools />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
