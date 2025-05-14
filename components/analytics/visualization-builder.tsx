import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, LineChart, PieChart } from "lucide-react"

export function VisualizationBuilder() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <label className="text-sm font-medium">X-Axis</label>
          <Select defaultValue="time">
            <SelectTrigger>
              <SelectValue placeholder="Select X-Axis" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="time">Time (Monthly)</SelectItem>
              <SelectItem value="location">Location</SelectItem>
              <SelectItem value="department">Department</SelectItem>
              <SelectItem value="source">Emission Source</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Y-Axis</label>
          <Select defaultValue="scope1">
            <SelectTrigger>
              <SelectValue placeholder="Select Y-Axis" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="scope1">Scope 1 Emissions</SelectItem>
              <SelectItem value="scope2">Scope 2 Emissions</SelectItem>
              <SelectItem value="scope3">Scope 3 Emissions</SelectItem>
              <SelectItem value="energy">Energy Consumption</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Group By</label>
          <Select defaultValue="none">
            <SelectTrigger>
              <SelectValue placeholder="Select Grouping" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="location">Location</SelectItem>
              <SelectItem value="department">Department</SelectItem>
              <SelectItem value="source">Emission Source</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <label className="text-sm font-medium">Filter</label>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Select Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Data</SelectItem>
              <SelectItem value="lagos">Lagos Facility Only</SelectItem>
              <SelectItem value="nairobi">Nairobi Facility Only</SelectItem>
              <SelectItem value="accra">Accra Facility Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Sort By</label>
          <Select defaultValue="value-desc">
            <SelectTrigger>
              <SelectValue placeholder="Select Sorting" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="value-desc">Value (Highest First)</SelectItem>
              <SelectItem value="value-asc">Value (Lowest First)</SelectItem>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Chart Type</label>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 justify-center">
              <BarChart3 className="mr-2 h-4 w-4" />
              Bar
            </Button>
            <Button variant="outline" className="flex-1 justify-center">
              <LineChart className="mr-2 h-4 w-4" />
              Line
            </Button>
            <Button variant="outline" className="flex-1 justify-center">
              <PieChart className="mr-2 h-4 w-4" />
              Pie
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <Tabs defaultValue="preview">
          <div className="border-b px-3">
            <TabsList className="w-full">
              <TabsTrigger value="preview" className="flex-1">
                Preview
              </TabsTrigger>
              <TabsTrigger value="data" className="flex-1">
                Data Table
              </TabsTrigger>
              <TabsTrigger value="query" className="flex-1">
                Query
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="preview" className="p-4">
            <div className="flex h-[300px] items-center justify-center rounded-md border-2 border-dashed p-6">
              <div className="text-center">
                <p className="text-sm font-medium">Visualization Preview</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Showing Scope 1 Emissions by Month, grouped by Location
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="data" className="p-4">
            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-4 py-2 text-left text-sm font-medium">Month</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">Location</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">Scope 1 Emissions (tCO₂e)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="px-4 py-2 text-sm">Jan 2024</td>
                      <td className="px-4 py-2 text-sm">Lagos</td>
                      <td className="px-4 py-2 text-sm">42.3</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm">Jan 2024</td>
                      <td className="px-4 py-2 text-sm">Nairobi</td>
                      <td className="px-4 py-2 text-sm">28.7</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm">Jan 2024</td>
                      <td className="px-4 py-2 text-sm">Accra</td>
                      <td className="px-4 py-2 text-sm">35.1</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm">Feb 2024</td>
                      <td className="px-4 py-2 text-sm">Lagos</td>
                      <td className="px-4 py-2 text-sm">40.8</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm">Feb 2024</td>
                      <td className="px-4 py-2 text-sm">Nairobi</td>
                      <td className="px-4 py-2 text-sm">27.2</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm">Feb 2024</td>
                      <td className="px-4 py-2 text-sm">Accra</td>
                      <td className="px-4 py-2 text-sm">33.9</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="query" className="p-4">
            <div className="rounded-md bg-muted p-4">
              <pre className="text-xs">
                {`SELECT
  date_trunc('month', timestamp) as month,
  location,
  SUM(emissions_value) as scope1_emissions
FROM
  emissions_data
WHERE
  scope = 'Scope 1'
  AND timestamp >= '2024-01-01'
  AND timestamp <= '2024-12-31'
GROUP BY
  month,
  location
ORDER BY
  month ASC,
  scope1_emissions DESC`}
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
