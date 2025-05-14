import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, Info } from "lucide-react"

export function BenchmarkComparison() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="col-span-1 md:col-span-4">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Performance Comparison</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="environmental">
              <TabsList className="w-full">
                <TabsTrigger value="environmental" className="flex-1">
                  Environmental
                </TabsTrigger>
                <TabsTrigger value="social" className="flex-1">
                  Social
                </TabsTrigger>
                <TabsTrigger value="governance" className="flex-1">
                  Governance
                </TabsTrigger>
                <TabsTrigger value="overall" className="flex-1">
                  Overall ESG
                </TabsTrigger>
              </TabsList>
              <TabsContent value="environmental" className="mt-4">
                <div className="flex h-[350px] items-center justify-center rounded-md border-2 border-dashed p-6">
                  <div className="text-center">
                    <p className="text-sm font-medium">Environmental Performance Comparison</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Comparing your environmental metrics against industry benchmarks
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                  <BenchmarkMetricCard
                    title="Carbon Intensity"
                    value="42.3"
                    unit="tCO₂e/M$"
                    industryAvg="58.7"
                    industryLeaders="35.2"
                    performance="Above Average"
                    percentile={72}
                  />
                  <BenchmarkMetricCard
                    title="Renewable Energy"
                    value="32.5"
                    unit="%"
                    industryAvg="28.3"
                    industryLeaders="45.8"
                    performance="Above Average"
                    percentile={65}
                  />
                  <BenchmarkMetricCard
                    title="Water Intensity"
                    value="3.8"
                    unit="m³/M$"
                    industryAvg="4.2"
                    industryLeaders="2.9"
                    performance="Above Average"
                    percentile={60}
                  />
                </div>
              </TabsContent>
              <TabsContent value="social" className="mt-4">
                <div className="flex h-[350px] items-center justify-center rounded-md border-2 border-dashed p-6">
                  <div className="text-center">
                    <p className="text-sm font-medium">Social Performance Comparison</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Comparing your social metrics against industry benchmarks
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                  <BenchmarkMetricCard
                    title="Gender Diversity"
                    value="42.8"
                    unit="%"
                    industryAvg="38.5"
                    industryLeaders="48.2"
                    performance="Above Average"
                    percentile={68}
                  />
                  <BenchmarkMetricCard
                    title="Training Hours"
                    value="24.5"
                    unit="hrs/emp"
                    industryAvg="18.7"
                    industryLeaders="32.1"
                    performance="Above Average"
                    percentile={75}
                  />
                  <BenchmarkMetricCard
                    title="Safety Incident Rate"
                    value="1.2"
                    unit="per 100"
                    industryAvg="1.8"
                    industryLeaders="0.8"
                    performance="Above Average"
                    percentile={70}
                  />
                </div>
              </TabsContent>
              <TabsContent value="governance" className="mt-4">
                <div className="flex h-[350px] items-center justify-center rounded-md border-2 border-dashed p-6">
                  <div className="text-center">
                    <p className="text-sm font-medium">Governance Performance Comparison</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Comparing your governance metrics against industry benchmarks
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                  <BenchmarkMetricCard
                    title="Board Independence"
                    value="65.0"
                    unit="%"
                    industryAvg="58.3"
                    industryLeaders="75.2"
                    performance="Above Average"
                    percentile={62}
                  />
                  <BenchmarkMetricCard
                    title="Board Diversity"
                    value="38.5"
                    unit="%"
                    industryAvg="32.7"
                    industryLeaders="45.8"
                    performance="Above Average"
                    percentile={65}
                  />
                  <BenchmarkMetricCard
                    title="Ethics Policy Coverage"
                    value="92.0"
                    unit="%"
                    industryAvg="85.4"
                    industryLeaders="98.2"
                    performance="Above Average"
                    percentile={68}
                  />
                </div>
              </TabsContent>
              <TabsContent value="overall" className="mt-4">
                <div className="flex h-[350px] items-center justify-center rounded-md border-2 border-dashed p-6">
                  <div className="text-center">
                    <p className="text-sm font-medium">Overall ESG Performance Comparison</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Comparing your overall ESG score against industry benchmarks
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                  <BenchmarkMetricCard
                    title="Environmental Score"
                    value="72"
                    unit="/100"
                    industryAvg="65"
                    industryLeaders="85"
                    performance="Above Average"
                    percentile={68}
                  />
                  <BenchmarkMetricCard
                    title="Social Score"
                    value="75"
                    unit="/100"
                    industryAvg="68"
                    industryLeaders="88"
                    performance="Above Average"
                    percentile={70}
                  />
                  <BenchmarkMetricCard
                    title="Governance Score"
                    value="68"
                    unit="/100"
                    industryAvg="62"
                    industryLeaders="82"
                    performance="Above Average"
                    percentile={65}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function BenchmarkMetricCard({
  title,
  value,
  unit,
  industryAvg,
  industryLeaders,
  performance,
  percentile,
}: {
  title: string
  value: string
  unit: string
  industryAvg: string
  industryLeaders: string
  performance: string
  percentile: number
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">{title}</h3>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Info className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-2xl font-bold">{value}</span>
          <span className="text-sm text-muted-foreground">{unit}</span>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span>Industry Average</span>
            <span>
              {industryAvg} {unit}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span>Industry Leaders</span>
            <span>
              {industryLeaders} {unit}
            </span>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-muted">
            <div className="h-2 rounded-full bg-primary" style={{ width: `${percentile}%` }}></div>
          </div>
          <div className="flex justify-between text-xs">
            <span>{percentile}th Percentile</span>
            <span className="font-medium text-primary">{performance}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
