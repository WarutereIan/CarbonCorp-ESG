import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, Edit, FileText, Pause, Play, Plus, Trash2, Users } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ReportScheduler() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Scheduled Reports</h3>
          <p className="text-xs text-muted-foreground">
            Configure and manage automated report generation and distribution
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Schedule New Report
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ScheduledReportCard
          title="Quarterly ESG Summary"
          schedule="Every 3 months"
          nextRun="Jun 30, 2024"
          recipients="Executive Team, Sustainability Team"
          status="active"
        />
        <ScheduledReportCard
          title="Monthly Carbon Emissions"
          schedule="Monthly"
          nextRun="May 31, 2024"
          recipients="Sustainability Team"
          status="active"
        />
        <ScheduledReportCard
          title="Weekly Water Usage"
          schedule="Weekly"
          nextRun="May 20, 2024"
          recipients="Facility Managers"
          status="paused"
        />
        <ScheduledReportCard
          title="Annual Sustainability Report"
          schedule="Yearly"
          nextRun="Dec 31, 2024"
          recipients="All Stakeholders"
          status="active"
        />
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Schedule Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Report Template</label>
                <Select defaultValue="quarterly">
                  <SelectTrigger>
                    <SelectValue placeholder="Select Template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quarterly">Quarterly ESG Summary</SelectItem>
                    <SelectItem value="monthly">Monthly Carbon Emissions</SelectItem>
                    <SelectItem value="weekly">Weekly Water Usage</SelectItem>
                    <SelectItem value="annual">Annual Sustainability Report</SelectItem>
                    <SelectItem value="custom">Custom Template...</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Frequency</label>
                <Select defaultValue="quarterly">
                  <SelectTrigger>
                    <SelectValue placeholder="Select Frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                    <SelectItem value="custom">Custom Schedule...</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Recipients</label>
                <Select defaultValue="executive">
                  <SelectTrigger>
                    <SelectValue placeholder="Select Recipients" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="executive">Executive Team</SelectItem>
                    <SelectItem value="sustainability">Sustainability Team</SelectItem>
                    <SelectItem value="facility">Facility Managers</SelectItem>
                    <SelectItem value="board">Board of Directors</SelectItem>
                    <SelectItem value="all">All Stakeholders</SelectItem>
                    <SelectItem value="custom">Custom Recipients...</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end">
              <Button>Save Schedule</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Schedule History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left text-sm font-medium">Report</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Generated</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Recipients</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-4 py-3 text-sm">Quarterly ESG Summary</td>
                    <td className="px-4 py-3 text-sm">Mar 31, 2024</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center">
                        <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                        <span>Completed</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">Executive Team, Sustainability Team</td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm">Monthly Carbon Emissions</td>
                    <td className="px-4 py-3 text-sm">Apr 30, 2024</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center">
                        <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                        <span>Completed</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">Sustainability Team</td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm">Weekly Water Usage</td>
                    <td className="px-4 py-3 text-sm">May 13, 2024</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center">
                        <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                        <span>Completed</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">Facility Managers</td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ScheduledReportCard({
  title,
  schedule,
  nextRun,
  recipients,
  status,
}: {
  title: string
  schedule: string
  nextRun: string
  recipients: string
  status: "active" | "paused"
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-medium">{title}</h3>
              <p className="text-xs text-muted-foreground">{schedule}</p>
            </div>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Edit className="h-4 w-4" />
            </Button>
            {status === "active" ? (
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Pause className="h-4 w-4" />
              </Button>
            ) : (
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Play className="h-4 w-4" />
              </Button>
            )}
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs">
              Next run: <span className="font-medium">{nextRun}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs">
              Status: <span className="font-medium capitalize">{status}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs">
              Recipients: <span className="font-medium">{recipients}</span>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
