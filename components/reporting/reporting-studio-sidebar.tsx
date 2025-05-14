"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  BarChart3,
  Brain,
  FileText,
  Heading1,
  Heading2,
  ImageIcon,
  LayoutDashboard,
  LineChart,
  List,
  ListOrdered,
  PieChart,
  Plus,
  Search,
  Table,
  Text,
} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export function ReportingStudioSidebar() {
  const [activeTab, setActiveTab] = useState("structure")

  return (
    <div className="flex h-full w-64 flex-col border-r">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
        <TabsList className="grid h-12 w-full grid-cols-3 rounded-none border-b bg-transparent p-0">
          <TabsTrigger
            value="structure"
            className={cn(
              "rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-muted/50 data-[state=active]:shadow-none",
            )}
          >
            <LayoutDashboard className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger
            value="elements"
            className={cn(
              "rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-muted/50 data-[state=active]:shadow-none",
            )}
          >
            <FileText className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger
            value="ai"
            className={cn(
              "rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-muted/50 data-[state=active]:shadow-none",
            )}
          >
            <Brain className="h-4 w-4" />
          </TabsTrigger>
        </TabsList>

        <TabsContent value="structure" className="h-[calc(100%-48px)] p-0 data-[state=inactive]:hidden">
          <div className="flex h-full flex-col">
            <div className="border-b p-3">
              <div className="flex items-center gap-2">
                <Input placeholder="Search sections..." className="h-8" />
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between rounded-md bg-muted/50 p-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Cover Page</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="text-sm">Executive Summary</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="text-sm">Environmental Performance</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="text-sm">Social Initiatives</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="text-sm">Governance Overview</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="text-sm">Recommendations</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="text-sm">Appendix</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <Separator className="my-4" />

                <div>
                  <h3 className="mb-2 text-xs font-medium uppercase text-muted-foreground">Add Section</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="h-auto justify-start py-1.5 text-xs">
                      <Plus className="mr-1 h-3 w-3" />
                      New Section
                    </Button>
                    <Button variant="outline" size="sm" className="h-auto justify-start py-1.5 text-xs">
                      <Plus className="mr-1 h-3 w-3" />
                      From Template
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </TabsContent>

        <TabsContent value="elements" className="h-[calc(100%-48px)] p-0 data-[state=inactive]:hidden">
          <div className="flex h-full flex-col">
            <div className="border-b p-3">
              <div className="flex items-center gap-2">
                <Input placeholder="Search elements..." className="h-8" />
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-3">
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-2 text-xs font-medium uppercase text-muted-foreground">Text</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm" className="h-auto flex-col gap-1 py-3">
                        <Heading1 className="h-4 w-4" />
                        <span className="text-xs">Heading 1</span>
                      </Button>
                      <Button variant="outline" size="sm" className="h-auto flex-col gap-1 py-3">
                        <Heading2 className="h-4 w-4" />
                        <span className="text-xs">Heading 2</span>
                      </Button>
                      <Button variant="outline" size="sm" className="h-auto flex-col gap-1 py-3">
                        <Text className="h-4 w-4" />
                        <span className="text-xs">Paragraph</span>
                      </Button>
                      <Button variant="outline" size="sm" className="h-auto flex-col gap-1 py-3">
                        <List className="h-4 w-4" />
                        <span className="text-xs">Bullet List</span>
                      </Button>
                      <Button variant="outline" size="sm" className="h-auto flex-col gap-1 py-3">
                        <ListOrdered className="h-4 w-4" />
                        <span className="text-xs">Number List</span>
                      </Button>
                      <Button variant="outline" size="sm" className="h-auto flex-col gap-1 py-3">
                        <AlignLeft className="h-4 w-4" />
                        <span className="text-xs">Align Left</span>
                      </Button>
                      <Button variant="outline" size="sm" className="h-auto flex-col gap-1 py-3">
                        <AlignCenter className="h-4 w-4" />
                        <span className="text-xs">Align Center</span>
                      </Button>
                      <Button variant="outline" size="sm" className="h-auto flex-col gap-1 py-3">
                        <AlignRight className="h-4 w-4" />
                        <span className="text-xs">Align Right</span>
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-xs font-medium uppercase text-muted-foreground">Media</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm" className="h-auto flex-col gap-1 py-3">
                        <ImageIcon className="h-4 w-4" />
                        <span className="text-xs">Image</span>
                      </Button>
                      <Button variant="outline" size="sm" className="h-auto flex-col gap-1 py-3">
                        <Table className="h-4 w-4" />
                        <span className="text-xs">Table</span>
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-xs font-medium uppercase text-muted-foreground">Charts</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm" className="h-auto flex-col gap-1 py-3">
                        <BarChart3 className="h-4 w-4" />
                        <span className="text-xs">Bar Chart</span>
                      </Button>
                      <Button variant="outline" size="sm" className="h-auto flex-col gap-1 py-3">
                        <LineChart className="h-4 w-4" />
                        <span className="text-xs">Line Chart</span>
                      </Button>
                      <Button variant="outline" size="sm" className="h-auto flex-col gap-1 py-3">
                        <PieChart className="h-4 w-4" />
                        <span className="text-xs">Pie Chart</span>
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-xs font-medium uppercase text-muted-foreground">Components</h3>
                    <div className="grid grid-cols-1 gap-2">
                      <Button variant="outline" size="sm" className="h-auto justify-start py-2 text-xs">
                        <Plus className="mr-2 h-3 w-3" />
                        Key Performance Indicator
                      </Button>
                      <Button variant="outline" size="sm" className="h-auto justify-start py-2 text-xs">
                        <Plus className="mr-2 h-3 w-3" />
                        Callout Box
                      </Button>
                      <Button variant="outline" size="sm" className="h-auto justify-start py-2 text-xs">
                        <Plus className="mr-2 h-3 w-3" />
                        Quote Block
                      </Button>
                      <Button variant="outline" size="sm" className="h-auto justify-start py-2 text-xs">
                        <Plus className="mr-2 h-3 w-3" />
                        Data Comparison
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </TabsContent>

        <TabsContent value="ai" className="h-[calc(100%-48px)] p-0 data-[state=inactive]:hidden">
          <div className="flex h-full flex-col">
            <ScrollArea className="flex-1">
              <div className="p-3">
                <div className="rounded-md border p-3">
                  <h3 className="text-sm font-medium">AI Assistant</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Use AI to help you create and improve your report content
                  </p>

                  <div className="mt-3 space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                      <Brain className="mr-2 h-3.5 w-3.5" />
                      Improve writing
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                      <Brain className="mr-2 h-3.5 w-3.5" />
                      Generate section content
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                      <Brain className="mr-2 h-3.5 w-3.5" />
                      Create visualization
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                      <Brain className="mr-2 h-3.5 w-3.5" />
                      Suggest improvements
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                      <Brain className="mr-2 h-3.5 w-3.5" />
                      Summarize data
                    </Button>
                  </div>
                </div>

                <div className="mt-4 rounded-md border p-3">
                  <h3 className="text-sm font-medium">AI Prompts</h3>
                  <div className="mt-3 space-y-2">
                    <div className="rounded-md bg-muted/50 p-2">
                      <p className="text-xs">Generate an executive summary based on our Q2 2024 ESG data</p>
                    </div>
                    <div className="rounded-md bg-muted/50 p-2">
                      <p className="text-xs">Create a visualization showing carbon emissions by scope</p>
                    </div>
                    <div className="rounded-md bg-muted/50 p-2">
                      <p className="text-xs">Suggest recommendations based on our water usage data</p>
                    </div>
                    <div className="rounded-md bg-muted/50 p-2">
                      <p className="text-xs">Compare our performance to industry benchmarks</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                      <Plus className="mr-2 h-3.5 w-3.5" />
                      Custom Prompt
                    </Button>
                  </div>
                </div>

                <div className="mt-4 rounded-md border p-3">
                  <h3 className="text-sm font-medium">Data Analysis</h3>
                  <p className="mt-1 text-xs text-muted-foreground">Let AI analyze your data and suggest insights</p>
                  <div className="mt-3 space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                      <Brain className="mr-2 h-3.5 w-3.5" />
                      Find trends in emissions data
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                      <Brain className="mr-2 h-3.5 w-3.5" />
                      Identify outliers in energy usage
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                      <Brain className="mr-2 h-3.5 w-3.5" />
                      Forecast future performance
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
