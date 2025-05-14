import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Download, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function BenchmarkRanking() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Industry Ranking</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Metric</label>
              <Select defaultValue="overall">
                <SelectTrigger>
                  <SelectValue placeholder="Select Metric" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="overall">Overall ESG Score</SelectItem>
                  <SelectItem value="carbon">Carbon Intensity</SelectItem>
                  <SelectItem value="renewable">Renewable Energy %</SelectItem>
                  <SelectItem value="water">Water Intensity</SelectItem>
                  <SelectItem value="diversity">Gender Diversity</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Peer Group</label>
              <Select defaultValue="industry">
                <SelectTrigger>
                  <SelectValue placeholder="Select Peer Group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="industry">All Industry Peers</SelectItem>
                  <SelectItem value="size">Similar Size Companies</SelectItem>
                  <SelectItem value="region">Regional Peers</SelectItem>
                  <SelectItem value="custom">Custom Peer Group</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Search Companies</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by company name..." className="pl-8" />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left text-sm font-medium">Rank</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Company</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Overall ESG Score</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Environmental</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Social</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Governance</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr className="bg-muted/20">
                    <td className="px-4 py-3 text-sm font-medium">1</td>
                    <td className="px-4 py-3 text-sm">EcoLeader Industries</td>
                    <td className="px-4 py-3 text-sm">92/100</td>
                    <td className="px-4 py-3 text-sm">94/100</td>
                    <td className="px-4 py-3 text-sm">90/100</td>
                    <td className="px-4 py-3 text-sm">92/100</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="px-4 py-3 text-sm font-medium">2</td>
                    <td className="px-4 py-3 text-sm">SustainCorp Global</td>
                    <td className="px-4 py-3 text-sm">88/100</td>
                    <td className="px-4 py-3 text-sm">90/100</td>
                    <td className="px-4 py-3 text-sm">85/100</td>
                    <td className="px-4 py-3 text-sm">89/100</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="px-4 py-3 text-sm font-medium">3</td>
                    <td className="px-4 py-3 text-sm">GreenTech Solutions</td>
                    <td className="px-4 py-3 text-sm">85/100</td>
                    <td className="px-4 py-3 text-sm">88/100</td>
                    <td className="px-4 py-3 text-sm">82/100</td>
                    <td className="px-4 py-3 text-sm">85/100</td>
                  </tr>
                  <tr className="bg-primary/5 border-primary">
                    <td className="px-4 py-3 text-sm font-medium">8</td>
                    <td className="px-4 py-3 text-sm font-medium">CarbonCorp ESG</td>
                    <td className="px-4 py-3 text-sm font-medium">72/100</td>
                    <td className="px-4 py-3 text-sm">72/100</td>
                    <td className="px-4 py-3 text-sm">75/100</td>
                    <td className="px-4 py-3 text-sm">68/100</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium">9</td>
                    <td className="px-4 py-3 text-sm">AfriManufacture Ltd</td>
                    <td className="px-4 py-3 text-sm">68/100</td>
                    <td className="px-4 py-3 text-sm">65/100</td>
                    <td className="px-4 py-3 text-sm">70/100</td>
                    <td className="px-4 py-3 text-sm">69/100</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium">10</td>
                    <td className="px-4 py-3 text-sm">Global Industries Inc</td>
                    <td className="px-4 py-3 text-sm">65/100</td>
                    <td className="px-4 py-3 text-sm">62/100</td>
                    <td className="px-4 py-3 text-sm">68/100</td>
                    <td className="px-4 py-3 text-sm">65/100</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium">11</td>
                    <td className="px-4 py-3 text-sm">Standard Manufacturing</td>
                    <td className="px-4 py-3 text-sm">62/100</td>
                    <td className="px-4 py-3 text-sm">60/100</td>
                    <td className="px-4 py-3 text-sm">65/100</td>
                    <td className="px-4 py-3 text-sm">61/100</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium">12</td>
                    <td className="px-4 py-3 text-sm">Regional Products Co</td>
                    <td className="px-4 py-3 text-sm">58/100</td>
                    <td className="px-4 py-3 text-sm">55/100</td>
                    <td className="px-4 py-3 text-sm">60/100</td>
                    <td className="px-4 py-3 text-sm">59/100</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 flex justify-between">
            <div className="text-xs text-muted-foreground">Showing 8 of 25 companies</div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Performance Gap Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-[300px] items-center justify-center rounded-md border-2 border-dashed p-6">
            <div className="text-center">
              <p className="text-sm font-medium">Gap Analysis Visualization</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Showing performance gaps between your company and industry leaders
              </p>
            </div>
          </div>
          <div className="mt-4 rounded-md border p-4">
            <h3 className="text-sm font-medium">Key Insights</h3>
            <div className="mt-2 space-y-2">
              <div className="flex items-start gap-2">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-primary"></div>
                <p className="text-xs">
                  <span className="font-medium">Top Performers:</span> Leading companies excel in renewable energy
                  adoption (45%+ vs. your 32.5%) and comprehensive Scope 3 emissions reporting.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-primary"></div>
                <p className="text-xs">
                  <span className="font-medium">Your Strengths:</span> Your company outperforms the industry average in
                  gender diversity and training hours per employee.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-primary"></div>
                <p className="text-xs">
                  <span className="font-medium">Improvement Areas:</span> The largest gaps are in governance metrics,
                  particularly board independence (10% below leaders) and ethics policy coverage.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
