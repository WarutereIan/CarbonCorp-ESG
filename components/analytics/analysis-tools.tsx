import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Calendar, Download } from "lucide-react"

export function AnalysisTools() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="trend">
        <TabsList className="w-full">
          <TabsTrigger value="trend" className="flex-1">
            Trend Analysis
          </TabsTrigger>
          <TabsTrigger value="correlation" className="flex-1">
            Correlation Finder
          </TabsTrigger>
          <TabsTrigger value="outliers" className="flex-1">
            Outlier Detection
          </TabsTrigger>
          <TabsTrigger value="forecast" className="flex-1">
            Forecasting
          </TabsTrigger>
        </TabsList>
        <TabsContent value="trend" className="mt-4 space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Metric</label>
              <Select defaultValue="scope1">
                <SelectTrigger>
                  <SelectValue placeholder="Select Metric" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scope1">Scope 1 Emissions</SelectItem>
                  <SelectItem value="scope2">Scope 2 Emissions</SelectItem>
                  <SelectItem value="energy">Energy Consumption</SelectItem>
                  <SelectItem value="water">Water Usage</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Time Period</label>
              <Select defaultValue="1y">
                <SelectTrigger>
                  <SelectValue placeholder="Select Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3m">Last 3 Months</SelectItem>
                  <SelectItem value="6m">Last 6 Months</SelectItem>
                  <SelectItem value="1y">Last 12 Months</SelectItem>
                  <SelectItem value="2y">Last 2 Years</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Analysis Type</label>
              <Select defaultValue="mom">
                <SelectTrigger>
                  <SelectValue placeholder="Select Analysis" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mom">Month-over-Month</SelectItem>
                  <SelectItem value="yoy">Year-over-Year</SelectItem>
                  <SelectItem value="cagr">CAGR</SelectItem>
                  <SelectItem value="moving">Moving Average</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex h-[250px] items-center justify-center rounded-md border-2 border-dashed p-6">
            <div className="text-center">
              <p className="text-sm font-medium">Trend Analysis Visualization</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Showing Scope 1 Emissions trend over the last 12 months with Month-over-Month analysis
              </p>
              <Button className="mt-4" size="sm">
                Run Analysis
              </Button>
            </div>
          </div>

          <div className="rounded-md border p-4">
            <h3 className="text-sm font-medium">Analysis Insights</h3>
            <div className="mt-2 space-y-2">
              <div className="flex items-start gap-2">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-primary"></div>
                <p className="text-xs">
                  <span className="font-medium">Downward Trend Detected:</span> Scope 1 emissions have decreased by 8.2%
                  over the last 12 months.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-primary"></div>
                <p className="text-xs">
                  <span className="font-medium">Seasonal Pattern:</span> Emissions peak during Q3 each year, likely due
                  to increased cooling needs.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-primary"></div>
                <p className="text-xs">
                  <span className="font-medium">Significant Reduction:</span> Lagos facility shows the most significant
                  reduction (12.5%) following energy efficiency measures.
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-between">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-3.5 w-3.5" />
                Export Analysis
              </Button>
              <Button size="sm">
                View Detailed Report <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="correlation" className="mt-4 space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Primary Metric</label>
              <Select defaultValue="scope1">
                <SelectTrigger>
                  <SelectValue placeholder="Select Primary Metric" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scope1">Scope 1 Emissions</SelectItem>
                  <SelectItem value="scope2">Scope 2 Emissions</SelectItem>
                  <SelectItem value="energy">Energy Consumption</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Secondary Metrics</label>
              <Select defaultValue="multiple">
                <SelectTrigger>
                  <SelectValue placeholder="Select Secondary Metrics" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="multiple">Production Volume, Temperature</SelectItem>
                  <SelectItem value="custom">Select Custom Metrics...</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Time Period</label>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 justify-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  Select Range
                </Button>
                <Button className="flex-1">Find Correlations</Button>
              </div>
            </div>
          </div>

          <div className="flex h-[250px] items-center justify-center rounded-md border-2 border-dashed p-6">
            <div className="text-center">
              <p className="text-sm font-medium">Correlation Analysis</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Select metrics and run analysis to find correlations between variables
              </p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="outliers" className="mt-4 space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Dataset</label>
              <Select defaultValue="emissions">
                <SelectTrigger>
                  <SelectValue placeholder="Select Dataset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="emissions">Emissions Data</SelectItem>
                  <SelectItem value="energy">Energy Data</SelectItem>
                  <SelectItem value="water">Water Usage Data</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Detection Method</label>
              <Select defaultValue="zscore">
                <SelectTrigger>
                  <SelectValue placeholder="Select Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="zscore">Z-Score</SelectItem>
                  <SelectItem value="iqr">IQR Method</SelectItem>
                  <SelectItem value="dbscan">DBSCAN Clustering</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Sensitivity</label>
              <div className="flex gap-2">
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue placeholder="Select Sensitivity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (Few Outliers)</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High (Many Outliers)</SelectItem>
                  </SelectContent>
                </Select>
                <Button>Detect</Button>
              </div>
            </div>
          </div>

          <div className="flex h-[250px] items-center justify-center rounded-md border-2 border-dashed p-6">
            <div className="text-center">
              <p className="text-sm font-medium">Outlier Detection</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Configure and run outlier detection to identify anomalies in your data
              </p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="forecast" className="mt-4 space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Metric to Forecast</label>
              <Select defaultValue="scope1">
                <SelectTrigger>
                  <SelectValue placeholder="Select Metric" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scope1">Scope 1 Emissions</SelectItem>
                  <SelectItem value="scope2">Scope 2 Emissions</SelectItem>
                  <SelectItem value="energy">Energy Consumption</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Forecast Horizon</label>
              <Select defaultValue="6m">
                <SelectTrigger>
                  <SelectValue placeholder="Select Horizon" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3m">3 Months</SelectItem>
                  <SelectItem value="6m">6 Months</SelectItem>
                  <SelectItem value="12m">12 Months</SelectItem>
                  <SelectItem value="24m">24 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Model</label>
              <div className="flex gap-2">
                <Select defaultValue="arima">
                  <SelectTrigger>
                    <SelectValue placeholder="Select Model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="arima">ARIMA</SelectItem>
                    <SelectItem value="prophet">Prophet</SelectItem>
                    <SelectItem value="lstm">LSTM</SelectItem>
                  </SelectContent>
                </Select>
                <Button>Forecast</Button>
              </div>
            </div>
          </div>

          <div className="flex h-[250px] items-center justify-center rounded-md border-2 border-dashed p-6">
            <div className="text-center">
              <p className="text-sm font-medium">Forecasting</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Configure and run forecasting models to predict future values
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
