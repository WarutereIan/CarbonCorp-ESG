import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowRight, Calendar, CheckCircle, Clock, MessageSquare, Plus, Users } from "lucide-react"

export default function CollaborationPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Collaboration Workspace</h1>
          <p className="text-muted-foreground">Coordinate with your team on ESG initiatives</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Users className="mr-2 h-4 w-4" />
            Manage Team
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>

      <Tabs defaultValue="projects">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <CardTitle className="text-base">Project Timeline</CardTitle>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="h-9 w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Projects</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="planned">Planned</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Calendar className="mr-2 h-4 w-4" />
                    View Calendar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-md border">
                  <div className="flex items-center justify-between bg-muted/50 px-4 py-2">
                    <h3 className="text-sm font-medium">Renewable Energy Transition</h3>
                    <div className="flex h-5 items-center rounded-full bg-green-100 px-2 text-xs font-medium text-green-700">
                      Active
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center">
                      <div className="flex-1">
                        <p className="text-sm">Goal: Transition Lagos facility to 50% renewable energy by Q4 2024</p>
                        <div className="mt-1 flex items-center gap-2">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Timeline: Apr 2024 - Dec 2024</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          <Avatar className="h-6 w-6 border-2 border-background">
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <Avatar className="h-6 w-6 border-2 border-background">
                            <AvatarFallback>AB</AvatarFallback>
                          </Avatar>
                          <Avatar className="h-6 w-6 border-2 border-background">
                            <AvatarFallback>TM</AvatarFallback>
                          </Avatar>
                        </div>
                        <span className="text-xs text-muted-foreground">3 team members</span>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Progress</span>
                        <span className="text-sm font-medium">35%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-2 w-[35%] rounded-full bg-primary"></div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">12 comments</span>
                      </div>
                      <Button size="sm">View Project</Button>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border">
                  <div className="flex items-center justify-between bg-muted/50 px-4 py-2">
                    <h3 className="text-sm font-medium">Supplier ESG Assessment</h3>
                    <div className="flex h-5 items-center rounded-full bg-green-100 px-2 text-xs font-medium text-green-700">
                      Active
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center">
                      <div className="flex-1">
                        <p className="text-sm">Goal: Assess ESG performance of top 20 suppliers</p>
                        <div className="mt-1 flex items-center gap-2">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Timeline: Mar 2024 - Jul 2024</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          <Avatar className="h-6 w-6 border-2 border-background">
                            <AvatarFallback>KL</AvatarFallback>
                          </Avatar>
                          <Avatar className="h-6 w-6 border-2 border-background">
                            <AvatarFallback>MN</AvatarFallback>
                          </Avatar>
                        </div>
                        <span className="text-xs text-muted-foreground">2 team members</span>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Progress</span>
                        <span className="text-sm font-medium">60%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-2 w-[60%] rounded-full bg-primary"></div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">8 comments</span>
                      </div>
                      <Button size="sm">View Project</Button>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border">
                  <div className="flex items-center justify-between bg-muted/50 px-4 py-2">
                    <h3 className="text-sm font-medium">Water Conservation Initiative</h3>
                    <div className="flex h-5 items-center rounded-full bg-blue-100 px-2 text-xs font-medium text-blue-700">
                      Planned
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center">
                      <div className="flex-1">
                        <p className="text-sm">Goal: Reduce water consumption by 25% across all facilities</p>
                        <div className="mt-1 flex items-center gap-2">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Timeline: Jul 2024 - Dec 2024</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          <Avatar className="h-6 w-6 border-2 border-background">
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                        </div>
                        <span className="text-xs text-muted-foreground">1 team member</span>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Progress</span>
                        <span className="text-sm font-medium">0%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-2 w-0 rounded-full bg-primary"></div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">2 comments</span>
                      </div>
                      <Button size="sm">View Project</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="mt-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">To Do</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border p-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">Complete Climate Scenario Analysis</h4>
                      <div className="flex h-5 items-center rounded-full bg-red-100 px-2 text-xs font-medium text-red-700">
                        High
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Run 2°C and 1.5°C scenarios for all facilities</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="text-[10px]">TM</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">Due: May 20</span>
                      </div>
                      <Button variant="ghost" size="sm" className="h-7 px-2">
                        Start
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-md border p-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">Collect Supplier ESG Data</h4>
                      <div className="flex h-5 items-center rounded-full bg-amber-100 px-2 text-xs font-medium text-amber-700">
                        Medium
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Send questionnaires to remaining 8 suppliers</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="text-[10px]">KL</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">Due: May 25</span>
                      </div>
                      <Button variant="ghost" size="sm" className="h-7 px-2">
                        Start
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-md border p-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">Update Board Diversity Data</h4>
                      <div className="flex h-5 items-center rounded-full bg-amber-100 px-2 text-xs font-medium text-amber-700">
                        Medium
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Collect updated statistics for CSRD report</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="text-[10px]">AB</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">Due: Jun 5</span>
                      </div>
                      <Button variant="ghost" size="sm" className="h-7 px-2">
                        Start
                      </Button>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Task
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">In Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border p-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">Solar Panel Installation Planning</h4>
                      <div className="flex h-5 items-center rounded-full bg-red-100 px-2 text-xs font-medium text-red-700">
                        High
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Finalize vendor selection for Lagos facility</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="text-[10px]">JD</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">Due: May 30</span>
                      </div>
                      <Button variant="ghost" size="sm" className="h-7 px-2">
                        Complete
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-md border p-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">Analyze Supplier ESG Data</h4>
                      <div className="flex h-5 items-center rounded-full bg-amber-100 px-2 text-xs font-medium text-amber-700">
                        Medium
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Review responses from 12 suppliers</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="text-[10px]">MN</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">Due: Jun 10</span>
                      </div>
                      <Button variant="ghost" size="sm" className="h-7 px-2">
                        Complete
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-md border p-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">Draft Water Conservation Plan</h4>
                      <div className="flex h-5 items-center rounded-full bg-green-100 px-2 text-xs font-medium text-green-700">
                        Low
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Outline initiatives for all facilities</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="text-[10px]">JD</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">Due: Jul 15</span>
                      </div>
                      <Button variant="ghost" size="sm" className="h-7 px-2">
                        Complete
                      </Button>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Task
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border p-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">Energy Audit - Lagos Facility</h4>
                      <div className="flex h-5 items-center rounded-full bg-red-100 px-2 text-xs font-medium text-red-700">
                        High
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Complete energy usage assessment</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="text-[10px]">TM</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">Completed: May 5</span>
                      </div>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                  </div>

                  <div className="rounded-md border p-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">Update GHG Inventory</h4>
                      <div className="flex h-5 items-center rounded-full bg-red-100 px-2 text-xs font-medium text-red-700">
                        High
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Finalize Scope 1 & 2 emissions data</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="text-[10px]">AB</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">Completed: Apr 28</span>
                      </div>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                  </div>

                  <div className="rounded-md border p-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">Supplier ESG Questionnaire</h4>
                      <div className="flex h-5 items-center rounded-full bg-amber-100 px-2 text-xs font-medium text-amber-700">
                        Medium
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Design assessment questionnaire</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="text-[10px]">KL</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">Completed: Apr 15</span>
                      </div>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                  </div>

                  <Button variant="link" className="w-full text-xs">
                    View all completed tasks <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="comments" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <CardTitle className="text-base">Recent Comments</CardTitle>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="h-9 w-[150px]">
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Comments</SelectItem>
                      <SelectItem value="unresolved">Unresolved</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">John Doe</span>
                        <span className="text-xs text-muted-foreground">2 hours ago</span>
                      </div>
                      <p className="mt-1 text-sm">
                        The water usage spike in March seems unusual. Could this be due to the new cooling system
                        installation?
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                          Reply
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                          Resolve
                        </Button>
                      </div>
                      <div className="mt-3 rounded-md bg-muted/50 p-3">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">TM</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium">Tom Miller</span>
                              <span className="text-xs text-muted-foreground">1 hour ago</span>
                            </div>
                            <p className="mt-1 text-xs">
                              Good catch. I'll check with the facilities team and update the data notes.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>AB</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Alice Brown</span>
                        <span className="text-xs text-muted-foreground">Yesterday</span>
                      </div>
                      <p className="mt-1 text-sm">
                        I've updated the board diversity statistics in the CSRD report draft. Can someone review before
                        we finalize?
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                          Reply
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                          Resolve
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>KL</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Kate Lee</span>
                        <span className="text-xs text-muted-foreground">2 days ago</span>
                      </div>
                      <p className="mt-1 text-sm">
                        We've received responses from 12 out of 20 suppliers for the ESG assessment. Should we send
                        reminders to the remaining 8?
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                          Reply
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                          Resolve
                        </Button>
                      </div>
                      <div className="mt-3 rounded-md bg-muted/50 p-3">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">MN</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium">Mike Nelson</span>
                              <span className="text-xs text-muted-foreground">2 days ago</span>
                            </div>
                            <p className="mt-1 text-xs">
                              Yes, please send reminders. We need at least 90% response rate for the report.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>TM</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Tom Miller</span>
                        <span className="text-xs text-muted-foreground">3 days ago</span>
                        <div className="flex h-5 items-center rounded-full bg-green-100 px-2 text-xs font-medium text-green-700">
                          Resolved
                        </div>
                      </div>
                      <p className="mt-1 text-sm">
                        Energy audit for the Lagos facility is complete. The report shows we can reduce consumption by
                        22% with the proposed efficiency measures.
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                          Reply
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                          Reopen
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Button variant="link" className="w-full text-xs">
                  View all comments <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
