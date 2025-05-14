"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Bold, ChevronDown, Italic, Link, List, ListOrdered, Redo, Strikethrough, Underline, Undo } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { ReportingStudioSection } from "@/components/reporting/reporting-studio-section"

export function ReportingStudioEditor() {
  const [activeTab, setActiveTab] = useState("content")

  return (
    <div className="flex h-full flex-col">
      <div className="border-b bg-muted/40 px-4 py-2">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Undo className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Redo className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" className="mx-1 h-6" />
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Bold className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Italic className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Underline className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Strikethrough className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" className="mx-1 h-6" />
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Link className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <List className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" className="mx-1 h-6" />
          <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
            Paragraph
            <ChevronDown className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
            Default
            <ChevronDown className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <div className="border-b bg-muted/40">
          <TabsList className="h-10 w-full justify-start rounded-none bg-transparent p-0">
            <TabsTrigger
              value="content"
              className="rounded-none border-b-2 border-transparent px-4 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Content
            </TabsTrigger>
            <TabsTrigger
              value="design"
              className="rounded-none border-b-2 border-transparent px-4 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Design
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="rounded-none border-b-2 border-transparent px-4 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Settings
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="content" className="h-[calc(100%-40px)] p-0 data-[state=inactive]:hidden">
          <ScrollArea className="h-full">
            <div className="mx-auto max-w-4xl p-6">
              <div className="space-y-8">
                <ReportingStudioSection
                  title="Cover Page"
                  content={
                    <div className="flex flex-col items-center justify-center space-y-4 py-12 text-center">
                      <div className="h-16 w-16 rounded-md bg-primary/10"></div>
                      <h1 className="text-3xl font-bold">Q2 2024 Sustainability Report</h1>
                      <p className="text-muted-foreground">April 1 - June 30, 2024</p>
                      <p className="text-sm text-muted-foreground">CarbonCorp ESG Platform</p>
                    </div>
                  }
                />

                <ReportingStudioSection
                  title="Executive Summary"
                  content={
                    <div className="space-y-4">
                      <p>
                        This quarter, our sustainability initiatives have shown significant progress across key metrics.
                        Overall carbon emissions decreased by 8.2% compared to the previous quarter, driven primarily by
                        energy efficiency improvements and increased renewable energy usage. Water consumption has been
                        reduced by 5.3%, and waste diversion rates improved to 78%.
                      </p>
                      <Card className="bg-primary/5 p-4">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                            <span className="text-sm font-medium text-primary">✓</span>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Key Achievement</h4>
                            <p className="text-sm text-muted-foreground">
                              Renewable energy usage increased to 32.5%, exceeding our quarterly target of 30%.
                            </p>
                          </div>
                        </div>
                      </Card>
                    </div>
                  }
                />

                <ReportingStudioSection
                  title="Environmental Performance"
                  content={
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Carbon Emissions</h3>
                      <p>
                        Our total carbon emissions for Q2 2024 were 1,713.9 tCO₂e, representing an 8.2% decrease from
                        the previous quarter. This reduction was achieved through a combination of energy efficiency
                        measures, increased renewable energy usage, and optimized logistics.
                      </p>
                      <div className="aspect-[2/1] rounded-md border bg-muted/50 p-4">
                        <div className="flex h-full items-center justify-center">
                          <p className="text-sm text-muted-foreground">[Carbon Emissions Chart]</p>
                        </div>
                      </div>
                      <h3 className="text-lg font-medium">Energy Consumption</h3>
                      <p>
                        Total energy consumption decreased by 5.2% to 245,678 kWh. The proportion of renewable energy
                        increased to 32.5%, exceeding our quarterly target of 30%. Energy efficiency initiatives
                        implemented in our Lagos and Nairobi facilities contributed significantly to this reduction.
                      </p>
                      <div className="aspect-[2/1] rounded-md border bg-muted/50 p-4">
                        <div className="flex h-full items-center justify-center">
                          <p className="text-sm text-muted-foreground">[Energy Consumption Chart]</p>
                        </div>
                      </div>
                    </div>
                  }
                />

                <ReportingStudioSection
                  title="Social Initiatives"
                  content={
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Workforce Diversity</h3>
                      <p>
                        Gender diversity ratio improved by 3.5% this quarter, with women now representing 42% of our
                        workforce. This exceeds the industry benchmark of 38%. Our diversity and inclusion initiatives
                        continue to yield positive results across all levels of the organization.
                      </p>
                      <div className="aspect-[2/1] rounded-md border bg-muted/50 p-4">
                        <div className="flex h-full items-center justify-center">
                          <p className="text-sm text-muted-foreground">[Workforce Diversity Chart]</p>
                        </div>
                      </div>
                      <h3 className="text-lg font-medium">Community Engagement</h3>
                      <p>
                        Our employees contributed 1,250 volunteer hours to community projects this quarter, a 15%
                        increase from Q1. Key initiatives included environmental clean-up events, educational workshops,
                        and support for local sustainable agriculture projects.
                      </p>
                    </div>
                  }
                />

                <ReportingStudioSection
                  title="Governance Overview"
                  content={
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">ESG Oversight</h3>
                      <p>
                        The Board's ESG Committee met three times this quarter to review sustainability performance and
                        strategic initiatives. Key decisions included approving an enhanced supplier code of conduct and
                        setting more ambitious emissions reduction targets for 2025.
                      </p>
                      <h3 className="text-lg font-medium">Risk Management</h3>
                      <p>
                        Climate-related risks have been fully integrated into our enterprise risk management framework.
                        This quarter, we completed climate scenario analyses for all major facilities and updated our
                        business continuity plans accordingly.
                      </p>
                    </div>
                  }
                />

                <ReportingStudioSection
                  title="Recommendations"
                  content={
                    <div className="space-y-4">
                      <p>
                        Based on our Q2 2024 performance and ongoing analysis, we recommend the following actions to
                        further improve our sustainability performance:
                      </p>
                      <ol className="ml-6 list-decimal space-y-2">
                        <li>
                          <span className="font-medium">Expand renewable energy capacity:</span> Invest in additional
                          solar installations at our Nairobi facility to increase renewable energy usage to 40% by Q4
                          2024.
                        </li>
                        <li>
                          <span className="font-medium">Enhance supplier engagement:</span> Implement a supplier
                          sustainability rating system to better track and influence Scope 3 emissions.
                        </li>
                        <li>
                          <span className="font-medium">Optimize water management:</span> Deploy water recycling systems
                          at our Lagos facility to reduce freshwater consumption by an additional 10%.
                        </li>
                        <li>
                          <span className="font-medium">Strengthen diversity initiatives:</span> Expand mentorship
                          programs to support career advancement for underrepresented groups.
                        </li>
                      </ol>
                    </div>
                  }
                />
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="design" className="h-[calc(100%-40px)] p-0 data-[state=inactive]:hidden">
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-medium">Design Options</h3>
              <p className="text-muted-foreground">Customize the visual appearance of your report</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="h-[calc(100%-40px)] p-0 data-[state=inactive]:hidden">
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-medium">Report Settings</h3>
              <p className="text-muted-foreground">Configure metadata, permissions, and export options</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
