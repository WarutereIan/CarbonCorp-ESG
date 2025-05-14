import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function DashboardRiskMap() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <CardTitle className="text-base">ESG Risk Heatmap</CardTitle>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="h-8 w-[150px]">
                <SelectValue placeholder="Risk Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risks</SelectItem>
                <SelectItem value="climate">Climate</SelectItem>
                <SelectItem value="social">Social</SelectItem>
                <SelectItem value="governance">Governance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="map">
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="map" className="flex-1">
              Map View
            </TabsTrigger>
            <TabsTrigger value="table" className="flex-1">
              Table View
            </TabsTrigger>
          </TabsList>
          <TabsContent value="map" className="h-[400px] w-full">
            <div className="relative h-full w-full overflow-hidden rounded-md bg-muted/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="mb-4 flex justify-center">
                    <svg width="300" height="300" viewBox="0 0 800 800" className="text-muted-foreground/30">
                      <path
                        d="M385.8,142.9c-3.3,1.5-7.2,4.9-8.7,7.6c-1.5,2.7-2.7,6.5-2.7,8.5c0,2,0.9,5.8,2,8.5c1.1,2.7,3.8,6.5,6,8.5c2.2,2,6.2,4.4,8.9,5.3c2.7,0.9,7.1,1.6,9.8,1.6c2.7,0,7.1-0.7,9.8-1.6c2.7-0.9,6.7-3.3,8.9-5.3c2.2-2,4.9-5.8,6-8.5c1.1-2.7,2-6.5,2-8.5c0-2-0.9-5.8-2-8.5c-1.1-2.7-3.8-6.5-6-8.5c-2.2-2-6.2-4.4-8.9-5.3c-2.7-0.9-7.1-1.6-9.8-1.6c-2.7,0-7.1,0.7-9.8,1.6C392,138.5,389.1,141.3,385.8,142.9z"
                        fill="currentColor"
                      />
                      <path
                        d="M171.6,204.7c-2.7,1.3-6.2,4.2-7.8,6.5c-1.6,2.4-3.1,6.2-3.3,8.5c-0.2,2.4,0.4,6.2,1.3,8.5c0.9,2.4,3.3,5.8,5.3,7.6c2,1.8,5.6,3.8,8,4.4c2.4,0.7,6.2,0.7,8.5,0c2.4-0.7,6-2.7,8-4.4c2-1.8,4.4-5.1,5.3-7.6c0.9-2.4,1.5-6.2,1.3-8.5c-0.2-2.4-1.6-6.2-3.3-8.5c-1.6-2.4-5.1-5.3-7.8-6.5c-2.7-1.3-6.5-2-8.5-1.6C176.7,203.1,174.3,203.5,171.6,204.7z"
                        fill="currentColor"
                      />
                      <path
                        d="M601.8,204.7c-2.7,1.3-6.2,4.2-7.8,6.5c-1.6,2.4-3.1,6.2-3.3,8.5c-0.2,2.4,0.4,6.2,1.3,8.5c0.9,2.4,3.3,5.8,5.3,7.6c2,1.8,5.6,3.8,8,4.4c2.4,0.7,6.2,0.7,8.5,0c2.4-0.7,6-2.7,8-4.4c2-1.8,4.4-5.1,5.3-7.6c0.9-2.4,1.5-6.2,1.3-8.5c-0.2-2.4-1.6-6.2-3.3-8.5c-1.6-2.4-5.1-5.3-7.8-6.5c-2.7-1.3-6.5-2-8.5-1.6C606.9,203.1,604.5,203.5,601.8,204.7z"
                        fill="currentColor"
                      />
                      <path
                        d="M385.8,265.8c-3.3,1.5-7.2,4.9-8.7,7.6c-1.5,2.7-2.7,6.5-2.7,8.5c0,2,0.9,5.8,2,8.5c1.1,2.7,3.8,6.5,6,8.5c2.2,2,6.2,4.4,8.9,5.3c2.7,0.9,7.1,1.6,9.8,1.6c2.7,0,7.1-0.7,9.8-1.6c2.7-0.9,6.7-3.3,8.9-5.3c2.2-2,4.9-5.8,6-8.5c1.1-2.7,2-6.5,2-8.5c0-2-0.9-5.8-2-8.5c-1.1-2.7-3.8-6.5-6-8.5c-2.2-2-6.2-4.4-8.9-5.3c-2.7-0.9-7.1-1.6-9.8-1.6c-2.7,0-7.1,0.7-9.8,1.6C392,261.5,389.1,264.2,385.8,265.8z"
                        fill="currentColor"
                      />
                      <path
                        d="M171.6,326.9c-2.7,1.3-6.2,4.2-7.8,6.5c-1.6,2.4-3.1,6.2-3.3,8.5c-0.2,2.4,0.4,6.2,1.3,8.5c0.9,2.4,3.3,5.8,5.3,7.6c2,1.8,5.6,3.8,8,4.4c2.4,0.7,6.2,0.7,8.5,0c2.4-0.7,6-2.7,8-4.4c2-1.8,4.4-5.1,5.3-7.6c0.9-2.4,1.5-6.2,1.3-8.5c-0.2-2.4-1.6-6.2-3.3-8.5c-1.6-2.4-5.1-5.3-7.8-6.5c-2.7-1.3-6.5-2-8.5-1.6C176.7,325.3,174.3,325.6,171.6,326.9z"
                        fill="currentColor"
                      />
                      <path
                        d="M601.8,326.9c-2.7,1.3-6.2,4.2-7.8,6.5c-1.6,2.4-3.1,6.2-3.3,8.5c-0.2,2.4,0.4,6.2,1.3,8.5c0.9,2.4,3.3,5.8,5.3,7.6c2,1.8,5.6,3.8,8,4.4c2.4,0.7,6.2,0.7,8.5,0c2.4-0.7,6-2.7,8-4.4c2-1.8,4.4-5.1,5.3-7.6c0.9-2.4,1.5-6.2,1.3-8.5c-0.2-2.4-1.6-6.2-3.3-8.5c-1.6-2.4-5.1-5.3-7.8-6.5c-2.7-1.3-6.5-2-8.5-1.6C606.9,325.3,604.5,325.6,601.8,326.9z"
                        fill="currentColor"
                      />
                      <path
                        d="M385.8,388.7c-3.3,1.5-7.2,4.9-8.7,7.6c-1.5,2.7-2.7,6.5-2.7,8.5c0,2,0.9,5.8,2,8.5c1.1,2.7,3.8,6.5,6,8.5c2.2,2,6.2,4.4,8.9,5.3c2.7,0.9,7.1,1.6,9.8,1.6c2.7,0,7.1-0.7,9.8-1.6c2.7-0.9,6.7-3.3,8.9-5.3c2.2-2,4.9-5.8,6-8.5c1.1-2.7,2-6.5,2-8.5c0-2-0.9-5.8-2-8.5c-1.1-2.7-3.8-6.5-6-8.5c-2.2-2-6.2-4.4-8.9-5.3c-2.7-0.9-7.1-1.6-9.8-1.6c-2.7,0-7.1,0.7-9.8,1.6C392,384.4,389.1,387.1,385.8,388.7z"
                        fill="currentColor"
                      />
                      <path
                        d="M171.6,449.1c-2.7,1.3-6.2,4.2-7.8,6.5c-1.6,2.4-3.1,6.2-3.3,8.5c-0.2,2.4,0.4,6.2,1.3,8.5c0.9,2.4,3.3,5.8,5.3,7.6c2,1.8,5.6,3.8,8,4.4c2.4,0.7,6.2,0.7,8.5,0c2.4-0.7,6-2.7,8-4.4c2-1.8,4.4-5.1,5.3-7.6c0.9-2.4,1.5-6.2,1.3-8.5c-0.2-2.4-1.6-6.2-3.3-8.5c-1.6-2.4-5.1-5.3-7.8-6.5c-2.7-1.3-6.5-2-8.5-1.6C176.7,447.5,174.3,447.8,171.6,449.1z"
                        fill="currentColor"
                      />
                      <path
                        d="M601.8,449.1c-2.7,1.3-6.2,4.2-7.8,6.5c-1.6,2.4-3.1,6.2-3.3,8.5c-0.2,2.4,0.4,6.2,1.3,8.5c0.9,2.4,3.3,5.8,5.3,7.6c2,1.8,5.6,3.8,8,4.4c2.4,0.7,6.2,0.7,8.5,0c2.4-0.7,6-2.7,8-4.4c2-1.8,4.4-5.1,5.3-7.6c0.9-2.4,1.5-6.2,1.3-8.5c-0.2-2.4-1.6-6.2-3.3-8.5c-1.6-2.4-5.1-5.3-7.8-6.5c-2.7-1.3-6.5-2-8.5-1.6C606.9,447.5,604.5,447.8,601.8,449.1z"
                        fill="currentColor"
                      />
                      <path
                        d="M385.8,511.6c-3.3,1.5-7.2,4.9-8.7,7.6c-1.5,2.7-2.7,6.5-2.7,8.5c0,2,0.9,5.8,2,8.5c1.1,2.7,3.8,6.5,6,8.5c2.2,2,6.2,4.4,8.9,5.3c2.7,0.9,7.1,1.6,9.8,1.6c2.7,0,7.1-0.7,9.8-1.6c2.7-0.9,6.7-3.3,8.9-5.3c2.2-2,4.9-5.8,6-8.5c1.1-2.7,2-6.5,2-8.5c0-2-0.9-5.8-2-8.5c-1.1-2.7-3.8-6.5-6-8.5c-2.2-2-6.2-4.4-8.9-5.3c-2.7-0.9-7.1-1.6-9.8-1.6c-2.7,0-7.1,0.7-9.8,1.6C392,507.3,389.1,510,385.8,511.6z"
                        fill="currentColor"
                      />
                      <path
                        d="M171.6,571.3c-2.7,1.3-6.2,4.2-7.8,6.5c-1.6,2.4-3.1,6.2-3.3,8.5c-0.2,2.4,0.4,6.2,1.3,8.5c0.9,2.4,3.3,5.8,5.3,7.6c2,1.8,5.6,3.8,8,4.4c2.4,0.7,6.2,0.7,8.5,0c2.4-0.7,6-2.7,8-4.4c2-1.8,4.4-5.1,5.3-7.6c0.9-2.4,1.5-6.2,1.3-8.5c-0.2-2.4-1.6-6.2-3.3-8.5c-1.6-2.4-5.1-5.3-7.8-6.5c-2.7-1.3-6.5-2-8.5-1.6C176.7,569.6,174.3,570,171.6,571.3z"
                        fill="currentColor"
                      />
                      <path
                        d="M601.8,571.3c-2.7,1.3-6.2,4.2-7.8,6.5c-1.6,2.4-3.1,6.2-3.3,8.5c-0.2,2.4,0.4,6.2,1.3,8.5c0.9,2.4,3.3,5.8,5.3,7.6c2,1.8,5.6,3.8,8,4.4c2.4,0.7,6.2,0.7,8.5,0c2.4-0.7,6-2.7,8-4.4c2-1.8,4.4-5.1,5.3-7.6c0.9-2.4,1.5-6.2,1.3-8.5c-0.2-2.4-1.6-6.2-3.3-8.5c-1.6-2.4-5.1-5.3-7.8-6.5c-2.7-1.3-6.5-2-8.5-1.6C606.9,569.6,604.5,570,601.8,571.3z"
                        fill="currentColor"
                      />
                      <path
                        d="M385.8,634.5c-3.3,1.5-7.2,4.9-8.7,7.6c-1.5,2.7-2.7,6.5-2.7,8.5c0,2,0.9,5.8,2,8.5c1.1,2.7,3.8,6.5,6,8.5c2.2,2,6.2,4.4,8.9,5.3c2.7,0.9,7.1,1.6,9.8,1.6c2.7,0,7.1-0.7,9.8-1.6c2.7-0.9,6.7-3.3,8.9-5.3c2.2-2,4.9-5.8,6-8.5c1.1-2.7,2-6.5,2-8.5c0-2-0.9-5.8-2-8.5c-1.1-2.7-3.8-6.5-6-8.5c-2.2-2-6.2-4.4-8.9-5.3c-2.7-0.9-7.1-1.6-9.8-1.6c-2.7,0-7.1,0.7-9.8,1.6C392,630.2,389.1,632.9,385.8,634.5z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div className="flex justify-center space-x-2">
                    <div className="h-4 w-4 rounded-full bg-red-500"></div>
                    <span className="text-sm">High Risk</span>
                    <div className="h-4 w-4 rounded-full bg-amber-500"></div>
                    <span className="text-sm">Medium Risk</span>
                    <div className="h-4 w-4 rounded-full bg-green-500"></div>
                    <span className="text-sm">Low Risk</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Interactive map showing ESG risk levels across your operations in Africa
                  </p>
                </div>
              </div>

              {/* High risk markers */}
              <div className="absolute left-[30%] top-[25%] h-6 w-6 animate-pulse rounded-full bg-red-500 opacity-75"></div>
              <div className="absolute left-[60%] top-[45%] h-6 w-6 animate-pulse rounded-full bg-red-500 opacity-75"></div>

              {/* Medium risk markers */}
              <div className="absolute left-[45%] top-[35%] h-6 w-6 animate-pulse rounded-full bg-amber-500 opacity-75"></div>
              <div className="absolute left-[25%] top-[55%] h-6 w-6 animate-pulse rounded-full bg-amber-500 opacity-75"></div>

              {/* Low risk markers */}
              <div className="absolute left-[50%] top-[65%] h-6 w-6 animate-pulse rounded-full bg-green-500 opacity-75"></div>
              <div className="absolute left-[75%] top-[30%] h-6 w-6 animate-pulse rounded-full bg-green-500 opacity-75"></div>
            </div>
          </TabsContent>
          <TabsContent value="table">
            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-2 text-left text-sm font-medium">Location</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Risk Type</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Risk Level</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-2 text-sm">Lagos, Nigeria</td>
                    <td className="px-4 py-2 text-sm">Climate</td>
                    <td className="px-4 py-2 text-sm">
                      <div className="flex items-center">
                        <div className="mr-2 h-3 w-3 rounded-full bg-red-500"></div>
                        High
                      </div>
                    </td>
                    <td className="px-4 py-2 text-sm">Flooding risk to manufacturing facility</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 text-sm">Nairobi, Kenya</td>
                    <td className="px-4 py-2 text-sm">Social</td>
                    <td className="px-4 py-2 text-sm">
                      <div className="flex items-center">
                        <div className="mr-2 h-3 w-3 rounded-full bg-amber-500"></div>
                        Medium
                      </div>
                    </td>
                    <td className="px-4 py-2 text-sm">Community relations need improvement</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 text-sm">Accra, Ghana</td>
                    <td className="px-4 py-2 text-sm">Governance</td>
                    <td className="px-4 py-2 text-sm">
                      <div className="flex items-center">
                        <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
                        Low
                      </div>
                    </td>
                    <td className="px-4 py-2 text-sm">Strong compliance with local regulations</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 text-sm">Johannesburg, SA</td>
                    <td className="px-4 py-2 text-sm">Climate</td>
                    <td className="px-4 py-2 text-sm">
                      <div className="flex items-center">
                        <div className="mr-2 h-3 w-3 rounded-full bg-red-500"></div>
                        High
                      </div>
                    </td>
                    <td className="px-4 py-2 text-sm">Water scarcity affecting operations</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm">Kigali, Rwanda</td>
                    <td className="px-4 py-2 text-sm">Social</td>
                    <td className="px-4 py-2 text-sm">
                      <div className="flex items-center">
                        <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
                        Low
                      </div>
                    </td>
                    <td className="px-4 py-2 text-sm">Strong diversity and inclusion practices</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
