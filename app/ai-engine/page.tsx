import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Brain, FileQuestion, Lightbulb, MessageSquareText, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Wand2 } from "lucide-react"

export default function AIEnginePage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Engine</h1>
          <p className="text-muted-foreground">AI-powered insights and analysis for your ESG data</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <MessageSquareText className="mr-2 h-4 w-4" />
            Ask AI Assistant
          </Button>
        </div>
      </div>

      <Tabs defaultValue="materiality">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="materiality">Materiality Assessment</TabsTrigger>
          <TabsTrigger value="risk">Risk Predictor</TabsTrigger>
          <TabsTrigger value="reporting">Gen AI Reporting</TabsTrigger>
        </TabsList>

        <TabsContent value="materiality" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Materiality Assessment Wizard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-md border">
                  <div className="flex items-center justify-between bg-muted/50 px-4 py-2">
                    <h3 className="text-sm font-medium">Step 1: Industry Baseline</h3>
                    <div className="flex h-5 items-center rounded-full bg-green-100 px-2 text-xs font-medium text-green-700">
                      Complete
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center">
                      <div className="flex-1">
                        <p className="text-sm">
                          Selected Industry: <span className="font-medium">Manufacturing</span>
                        </p>
                        <p className="text-xs text-muted-foreground">Based on SASB and GRI benchmarks</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-sm font-medium">AI Suggestion: Top 5 Material Topics</h4>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li className="flex items-center gap-2">
                          <Lightbulb className="h-4 w-4 text-primary" />
                          Energy Management
                        </li>
                        <li className="flex items-center gap-2">
                          <Lightbulb className="h-4 w-4 text-primary" />
                          GHG Emissions
                        </li>
                        <li className="flex items-center gap-2">
                          <Lightbulb className="h-4 w-4 text-primary" />
                          Waste Management
                        </li>
                        <li className="flex items-center gap-2">
                          <Lightbulb className="h-4 w-4 text-primary" />
                          Water & Wastewater Management
                        </li>
                        <li className="flex items-center gap-2">
                          <Lightbulb className="h-4 w-4 text-primary" />
                          Labor Practices
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border">
                  <div className="flex items-center justify-between bg-muted/50 px-4 py-2">
                    <h3 className="text-sm font-medium">Step 2: Stakeholder Input</h3>
                    <div className="flex h-5 items-center rounded-full bg-amber-100 px-2 text-xs font-medium text-amber-700">
                      In Progress
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center">
                      <div className="flex-1">
                        <p className="text-sm">Upload stakeholder survey data or use AI-generated synthetic data</p>
                        <p className="text-xs text-muted-foreground">For SMEs lacking stakeholder surveys</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Upload Data
                        </Button>
                        <Button size="sm">Use AI Data</Button>
                      </div>
                    </div>
                    <div className="mt-4 h-[200px] rounded-md border-2 border-dashed p-4">
                      <div className="flex h-full flex-col items-center justify-center">
                        <Brain className="h-10 w-10 text-muted-foreground" />
                        <p className="mt-2 text-sm font-medium">Interactive Materiality Matrix</p>
                        <p className="text-xs text-muted-foreground">Drag topics between "High" and "Low" priority</p>
                        <Button className="mt-4" size="sm">
                          Start Mapping
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border">
                  <div className="flex items-center justify-between bg-muted/50 px-4 py-2">
                    <h3 className="text-sm font-medium">Step 3: AI Recommendations</h3>
                    <div className="flex h-5 items-center rounded-full bg-muted px-2 text-xs font-medium">Pending</div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground">Complete Step 2 to receive AI recommendations</p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Risk Predictor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-md border p-4">
                  <h3 className="text-sm font-medium">Scenario Modeling</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Model how different scenarios would impact your ESG performance
                  </p>

                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-sm">Climate Scenarios</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">2°C Temperature Rise</span>
                            <Button variant="outline" size="sm">
                              Run Model
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">1.5°C Temperature Rise</span>
                            <Button variant="outline" size="sm">
                              Run Model
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">3°C Temperature Rise</span>
                            <Button variant="outline" size="sm">
                              Run Model
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-sm">Regulatory Scenarios</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Carbon Tax Introduction</span>
                            <Button variant="outline" size="sm">
                              Run Model
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Mandatory CSRD Compliance</span>
                            <Button variant="outline" size="sm">
                              Run Model
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Water Usage Restrictions</span>
                            <Button variant="outline" size="sm">
                              Run Model
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <h3 className="text-sm font-medium">Recent Predictions</h3>
                  <div className="mt-4 space-y-4">
                    <div className="rounded-md border p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          <TrendingUp className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">2°C Temperature Rise Impact</h4>
                          <p className="text-xs text-muted-foreground">Generated on May 10, 2024</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm">Key findings:</p>
                        <ul className="mt-2 space-y-1 text-sm">
                          <li className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                            15% increase in cooling costs for Lagos facility
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                            30% higher water stress for Nairobi operations
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                            Supply chain disruptions affecting 25% of suppliers
                          </li>
                        </ul>
                        <Button variant="link" className="mt-2 h-auto p-0 text-xs">
                          View full report <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          <TrendingUp className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Carbon Tax Introduction Impact</h4>
                          <p className="text-xs text-muted-foreground">Generated on May 5, 2024</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm">Key findings:</p>
                        <ul className="mt-2 space-y-1 text-sm">
                          <li className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                            Estimated $125,000 annual cost increase
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                            8% reduction in profit margins
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                            Renewable energy investments would offset 40% of tax
                          </li>
                        </ul>
                        <Button variant="link" className="mt-2 h-auto p-0 text-xs">
                          View full report <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reporting" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Gen AI Reporting</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-md border p-4">
                  <h3 className="text-sm font-medium">Generate Reports with AI</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Use natural language prompts to generate ESG reports
                  </p>

                  <div className="mt-4">
                    <div className="rounded-md border p-4">
                      <div className="flex items-center gap-3">
                        <FileQuestion className="h-5 w-5 text-primary" />
                        <span className="text-sm font-medium">What would you like to generate?</span>
                      </div>
                      <div className="mt-4">
                        <textarea
                          className="min-h-[100px] w-full rounded-md border p-3 text-sm"
                          placeholder="E.g., Generate a CSRD report highlighting our renewable energy investments"
                        ></textarea>
                        <div className="mt-2">
                          <p className="text-xs text-muted-foreground">Example prompts:</p>
                          <div className="mt-1 flex flex-wrap gap-2">
                            <Button variant="outline" size="sm" className="text-xs">
                              Generate ISSB Climate report
                            </Button>
                            <Button variant="outline" size="sm" className="text-xs">
                              Draft biodiversity section
                            </Button>
                            <Button variant="outline" size="sm" className="text-xs">
                              Create executive summary
                            </Button>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Button asChild>
                            <Link href="/analytics/reports/new?tab=ai">
                              <Wand2 className="mr-2 h-4 w-4" />
                              Generate Report
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <h3 className="text-sm font-medium">Recent Generations</h3>
                  <div className="mt-4 space-y-4">
                    <div className="rounded-md border p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          <FileQuestion className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">ISSB Climate Report Draft</h4>
                          <p className="text-xs text-muted-foreground">Generated on May 12, 2024</p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-between">
                        <Button variant="outline" size="sm">
                          View Draft
                        </Button>
                        <Button size="sm">Edit in Reporting Studio</Button>
                      </div>
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          <FileQuestion className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Executive Summary for Investors</h4>
                          <p className="text-xs text-muted-foreground">Generated on May 8, 2024</p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-between">
                        <Button variant="outline" size="sm">
                          View Draft
                        </Button>
                        <Button size="sm">Edit in Reporting Studio</Button>
                      </div>
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          <FileQuestion className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Biodiversity Impact Section</h4>
                          <p className="text-xs text-muted-foreground">Generated on May 5, 2024</p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-between">
                        <Button variant="outline" size="sm">
                          View Draft
                        </Button>
                        <Button size="sm">Edit in Reporting Studio</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
