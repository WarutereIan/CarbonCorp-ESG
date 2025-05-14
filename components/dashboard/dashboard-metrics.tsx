import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MetricCard } from "@/components/dashboard/metric-card"

export function DashboardMetrics() {
  return (
    <Card className="col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Key Metrics</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="emissions">
          <div className="px-4">
            <TabsList className="w-full">
              <TabsTrigger value="emissions" className="flex-1">
                Emissions
              </TabsTrigger>
              <TabsTrigger value="energy" className="flex-1">
                Energy
              </TabsTrigger>
              <TabsTrigger value="social" className="flex-1">
                Social
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="emissions" className="p-0 pt-2">
            <div className="space-y-4 p-4">
              <MetricCard
                title="Scope 1 Emissions"
                value="125.4"
                unit="tCO₂e"
                change={-8.2}
                data={[25, 28, 32, 34, 30, 28, 26, 24, 22, 20, 18, 16]}
              />
              <MetricCard
                title="Scope 2 Emissions"
                value="342.7"
                unit="tCO₂e"
                change={-4.5}
                data={[45, 48, 52, 54, 50, 48, 46, 44, 42, 40, 38, 36]}
              />
              <MetricCard
                title="Scope 3 Emissions"
                value="1,245.8"
                unit="tCO₂e"
                change={12.3}
                data={[120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 170, 175]}
                changeType="negative"
              />
            </div>
          </TabsContent>
          <TabsContent value="energy" className="p-0 pt-2">
            <div className="space-y-4 p-4">
              <MetricCard
                title="Electricity Usage"
                value="245,678"
                unit="kWh"
                change={-5.2}
                data={[25, 28, 32, 34, 30, 28, 26, 24, 22, 20, 18, 16]}
              />
              <MetricCard
                title="Renewable Energy"
                value="32.5"
                unit="%"
                change={8.7}
                data={[15, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38]}
              />
              <MetricCard
                title="Water Usage"
                value="12,450"
                unit="m³"
                change={-3.2}
                data={[14, 13, 15, 14, 13, 12, 13, 12, 11, 12, 11, 10]}
              />
            </div>
          </TabsContent>
          <TabsContent value="social" className="p-0 pt-2">
            <div className="space-y-4 p-4">
              <MetricCard
                title="Gender Diversity"
                value="42.8"
                unit="%"
                change={3.5}
                data={[32, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44]}
              />
              <MetricCard
                title="Training Hours"
                value="24.5"
                unit="hrs/emp"
                change={12.3}
                data={[15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]}
              />
              <MetricCard
                title="Community Investment"
                value="125,000"
                unit="USD"
                change={15.0}
                data={[80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135]}
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
