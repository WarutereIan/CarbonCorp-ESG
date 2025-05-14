"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Brain,
  Calendar,
  Check,
  Download,
  FileText,
  ImageIcon,
  LayoutDashboard,
  LineChart,
  Loader2,
  MessageSquare,
  PenLine,
  Plus,
  Sparkles,
  Wand2,
} from "lucide-react"
import { useRouter } from "next/navigation"

export function AIReportGenerator() {
  const router = useRouter()
  const [generating, setGenerating] = useState(false)
  const [generationStep, setGenerationStep] = useState(0)
  const [showPreview, setShowPreview] = useState(false)

  const handleGenerate = () => {
    setGenerating(true)
    setGenerationStep(1)

    // Simulate AI generation process with timeouts
    setTimeout(() => setGenerationStep(2), 2000)
    setTimeout(() => setGenerationStep(3), 4000)
    setTimeout(() => {
      setGenerationStep(4)
      setGenerating(false)
      setShowPreview(true)
    }, 6000)
  }

  const handleEditInStudio = () => {
    router.push("/reporting/studio")
  }

  return (
    <div className="space-y-6">
      {!showPreview ? (
        <>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">AI-Powered Report Generator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center gap-3 rounded-md bg-primary/10 p-3">
                  <Brain className="h-5 w-5 text-primary" />
                  <p className="text-sm">
                    Our AI will generate a complete report based on your requirements and existing organizational data.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Report Type</label>
                    <Select defaultValue="sustainability">
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sustainability">Sustainability Report</SelectItem>
                        <SelectItem value="carbon">Carbon Footprint Report</SelectItem>
                        <SelectItem value="esg">ESG Performance Report</SelectItem>
                        <SelectItem value="compliance">Regulatory Compliance Report</SelectItem>
                        <SelectItem value="social">Social Impact Report</SelectItem>
                        <SelectItem value="custom">Custom Report</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Report Title</label>
                    <Input placeholder="Enter report title..." defaultValue="Q2 2024 Sustainability Report" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Time Period</label>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 justify-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        Apr 1 - Jun 30, 2024
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Report Description or Additional Instructions</label>
                    <Textarea
                      placeholder="Describe what you want in the report or provide specific instructions..."
                      className="min-h-[100px]"
                      defaultValue="Generate a comprehensive sustainability report highlighting our progress in reducing carbon emissions, water usage, and waste management. Include executive summary, key metrics, visual charts, and recommendations for improvement."
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">AI Generation Options</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="content">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="visuals">Visuals</TabsTrigger>
                  <TabsTrigger value="format">Format</TabsTrigger>
                </TabsList>
                <TabsContent value="content" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="content-depth" className="text-sm font-medium">
                        Content Depth
                      </Label>
                      <span className="text-xs text-muted-foreground">Comprehensive</span>
                    </div>
                    <Slider defaultValue={[75]} max={100} step={25} className="py-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Brief</span>
                      <span>Balanced</span>
                      <span>Comprehensive</span>
                      <span>Detailed</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Data Sources to Include</label>
                    <div className="rounded-md border p-3">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="emissions" defaultChecked />
                          <label htmlFor="emissions" className="text-sm">
                            Emissions Data
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="energy" defaultChecked />
                          <label htmlFor="energy" className="text-sm">
                            Energy Consumption
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="water" defaultChecked />
                          <label htmlFor="water" className="text-sm">
                            Water Usage
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="waste" defaultChecked />
                          <label htmlFor="waste" className="text-sm">
                            Waste Management
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="social" defaultChecked />
                          <label htmlFor="social" className="text-sm">
                            Social Metrics
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="governance" />
                          <label htmlFor="governance" className="text-sm">
                            Governance Data
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tone & Style</label>
                    <Select defaultValue="professional">
                      <SelectTrigger>
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="accessible">Accessible</SelectItem>
                        <SelectItem value="persuasive">Persuasive</SelectItem>
                        <SelectItem value="optimistic">Optimistic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="recommendations" defaultChecked />
                    <Label htmlFor="recommendations" className="text-sm">
                      Include AI-generated recommendations
                    </Label>
                  </div>
                </TabsContent>

                <TabsContent value="visuals" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Chart Types</label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2 rounded-md border p-3">
                        <Checkbox id="bar-charts" defaultChecked />
                        <label htmlFor="bar-charts" className="text-sm">
                          Bar Charts
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 rounded-md border p-3">
                        <Checkbox id="line-charts" defaultChecked />
                        <label htmlFor="line-charts" className="text-sm">
                          Line Charts
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 rounded-md border p-3">
                        <Checkbox id="pie-charts" defaultChecked />
                        <label htmlFor="pie-charts" className="text-sm">
                          Pie Charts
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 rounded-md border p-3">
                        <Checkbox id="area-charts" />
                        <label htmlFor="area-charts" className="text-sm">
                          Area Charts
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 rounded-md border p-3">
                        <Checkbox id="radar-charts" />
                        <label htmlFor="radar-charts" className="text-sm">
                          Radar Charts
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 rounded-md border p-3">
                        <Checkbox id="heatmaps" />
                        <label htmlFor="heatmaps" className="text-sm">
                          Heatmaps
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="visual-density" className="text-sm font-medium">
                        Visual Density
                      </Label>
                      <span className="text-xs text-muted-foreground">Balanced</span>
                    </div>
                    <Slider defaultValue={[50]} max={100} step={25} className="py-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Minimal</span>
                      <span>Balanced</span>
                      <span>Data-rich</span>
                      <span>Comprehensive</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Visual Theme</label>
                    <Select defaultValue="corporate">
                      <SelectTrigger>
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="corporate">Corporate</SelectItem>
                        <SelectItem value="modern">Modern</SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                        <SelectItem value="eco">Eco-friendly</SelectItem>
                        <SelectItem value="bold">Bold & Impactful</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="infographics" defaultChecked />
                    <Label htmlFor="infographics" className="text-sm">
                      Generate infographics for key metrics
                    </Label>
                  </div>
                </TabsContent>

                <TabsContent value="format" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Output Format</label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2 rounded-md border p-3">
                        <Checkbox id="pdf" defaultChecked />
                        <label htmlFor="pdf" className="text-sm">
                          PDF
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 rounded-md border p-3">
                        <Checkbox id="ppt" defaultChecked />
                        <label htmlFor="ppt" className="text-sm">
                          PowerPoint
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 rounded-md border p-3">
                        <Checkbox id="excel" />
                        <label htmlFor="excel" className="text-sm">
                          Excel
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 rounded-md border p-3">
                        <Checkbox id="web" defaultChecked />
                        <label htmlFor="web" className="text-sm">
                          Web Version
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Report Structure</label>
                    <Select defaultValue="standard">
                      <SelectTrigger>
                        <SelectValue placeholder="Select structure" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard (Executive Summary, Body, Conclusion)</SelectItem>
                        <SelectItem value="detailed">Detailed (Multiple Sections)</SelectItem>
                        <SelectItem value="executive">Executive Brief</SelectItem>
                        <SelectItem value="gri">GRI Standards Format</SelectItem>
                        <SelectItem value="tcfd">TCFD Format</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Branding</label>
                    <div className="rounded-md border p-3">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="logo" defaultChecked />
                          <label htmlFor="logo" className="text-sm">
                            Include Company Logo
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="colors" defaultChecked />
                          <label htmlFor="colors" className="text-sm">
                            Use Brand Colors
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="fonts" defaultChecked />
                          <label htmlFor="fonts" className="text-sm">
                            Use Brand Fonts
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="templates" defaultChecked />
                          <label htmlFor="templates" className="text-sm">
                            Use Corporate Templates
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleGenerate} disabled={generating}>
              {generating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Report...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate AI Report
                </>
              )}
            </Button>
          </div>

          {generating && (
            <Card>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Brain className="h-5 w-5 text-primary" />
                    <h3 className="text-sm font-medium">AI Report Generation in Progress</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full border">
                        {generationStep > 0 ? <Check className="h-3 w-3 text-primary" /> : <div className="h-3 w-3" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">Analyzing organizational data</p>
                        {generationStep === 1 && (
                          <p className="text-xs text-muted-foreground">
                            Processing emissions, energy, water, and waste data...
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full border">
                        {generationStep > 1 ? (
                          <Check className="h-3 w-3 text-primary" />
                        ) : generationStep === 1 ? (
                          <Loader2 className="h-3 w-3 animate-spin text-primary" />
                        ) : (
                          <div className="h-3 w-3" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">Generating report content</p>
                        {generationStep === 2 && (
                          <p className="text-xs text-muted-foreground">
                            Creating executive summary, key findings, and recommendations...
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full border">
                        {generationStep > 2 ? (
                          <Check className="h-3 w-3 text-primary" />
                        ) : generationStep === 2 ? (
                          <Loader2 className="h-3 w-3 animate-spin text-primary" />
                        ) : (
                          <div className="h-3 w-3" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">Creating visualizations and charts</p>
                        {generationStep === 3 && (
                          <p className="text-xs text-muted-foreground">
                            Designing charts, graphs, and infographics based on data...
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full border">
                        {generationStep > 3 ? (
                          <Check className="h-3 w-3 text-primary" />
                        ) : generationStep === 3 ? (
                          <Loader2 className="h-3 w-3 animate-spin text-primary" />
                        ) : (
                          <div className="h-3 w-3" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">Finalizing report formatting</p>
                        {generationStep === 4 && (
                          <p className="text-xs text-muted-foreground">
                            Applying branding, formatting, and preparing output files...
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        <AIReportPreview onEditInStudio={handleEditInStudio} />
      )}
    </div>
  )
}

interface AIReportPreviewProps {
  onEditInStudio: () => void
}

function AIReportPreview({ onEditInStudio }: AIReportPreviewProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <CardTitle className="text-base">AI Report Generated Successfully</CardTitle>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={onEditInStudio}>
                <PenLine className="mr-2 h-4 w-4" />
                Edit in Studio
              </Button>
              <Button size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download All Formats
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border p-4">
            <h3 className="text-sm font-medium">Q2 2024 Sustainability Report</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Generated on May 14, 2024 • Available in PDF, PowerPoint, Web
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <div className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">Emissions Data</div>
              <div className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                Energy Consumption
              </div>
              <div className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">Water Usage</div>
              <div className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                Waste Management
              </div>
              <div className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">Social Metrics</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Report Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="flex h-[500px] flex-col overflow-hidden">
                <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Q2 2024 Sustainability Report.pdf</span>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex-1 overflow-auto p-4">
                  <div className="mx-auto max-w-3xl space-y-6">
                    {/* Cover Page */}
                    <div className="rounded-md border p-8 text-center">
                      <h1 className="text-2xl font-bold">Q2 2024 Sustainability Report</h1>
                      <p className="mt-2 text-muted-foreground">April 1 - June 30, 2024</p>
                      <div className="mt-4 flex justify-center">
                        <div className="h-16 w-16 rounded-md bg-primary/10"></div>
                      </div>
                      <p className="mt-4 text-sm text-muted-foreground">CarbonCorp ESG Platform</p>
                    </div>

                    {/* Executive Summary */}
                    <div className="space-y-3 rounded-md border p-4">
                      <h2 className="text-lg font-semibold">Executive Summary</h2>
                      <p className="text-sm text-muted-foreground">
                        This quarter, our sustainability initiatives have shown significant progress across key metrics.
                        Overall carbon emissions decreased by 8.2% compared to the previous quarter, driven primarily by
                        energy efficiency improvements and increased renewable energy usage. Water consumption has been
                        reduced by 5.3%, and waste diversion rates improved to 78%.
                      </p>
                      <div className="rounded-md bg-muted/50 p-3">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-primary" />
                          <p className="text-sm font-medium">Key Achievement</p>
                        </div>
                        <p className="mt-1 text-sm">
                          Renewable energy usage increased to 32.5%, exceeding our quarterly target of 30%.
                        </p>
                      </div>
                    </div>

                    {/* Key Metrics Visualization */}
                    <div className="space-y-3 rounded-md border p-4">
                      <h2 className="text-lg font-semibold">Key Metrics</h2>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-md border p-3">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium">Carbon Emissions</h3>
                            <span className="text-xs font-medium text-green-600">-8.2%</span>
                          </div>
                          <div className="mt-2 h-24 rounded-md bg-muted/50"></div>
                          <p className="mt-2 text-xs text-muted-foreground">Total emissions: 1,713.9 tCO₂e</p>
                        </div>
                        <div className="rounded-md border p-3">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium">Energy Consumption</h3>
                            <span className="text-xs font-medium text-green-600">-5.2%</span>
                          </div>
                          <div className="mt-2 h-24 rounded-md bg-muted/50"></div>
                          <p className="mt-2 text-xs text-muted-foreground">Total consumption: 245,678 kWh</p>
                        </div>
                      </div>
                    </div>

                    {/* More sections would be shown here */}
                    <div className="flex items-center justify-center py-4">
                      <p className="text-sm text-muted-foreground">Showing preview of first 3 pages (18 total)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Report Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium">Report Contents</h3>
              <ul className="mt-2 space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  Executive Summary
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <LineChart className="h-4 w-4 text-muted-foreground" />
                  Key Performance Metrics
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  Environmental Performance
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  Social Initiatives
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  Governance Overview
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <LineChart className="h-4 w-4 text-muted-foreground" />
                  Trend Analysis
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  Recommendations
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium">Visualizations</h3>
              <div className="mt-2 grid grid-cols-3 gap-2">
                <div className="aspect-square rounded-md bg-muted/50"></div>
                <div className="aspect-square rounded-md bg-muted/50"></div>
                <div className="aspect-square rounded-md bg-muted/50"></div>
                <div className="aspect-square rounded-md bg-muted/50"></div>
                <div className="aspect-square rounded-md bg-muted/50"></div>
                <div className="aspect-square rounded-md bg-muted/50"></div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">12 charts and visualizations included</p>
            </div>

            <div>
              <h3 className="text-sm font-medium">Available Formats</h3>
              <div className="mt-2 space-y-2">
                <Button variant="outline" className="w-full justify-start text-sm">
                  <FileText className="mr-2 h-4 w-4" />
                  PDF (18 pages)
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  PowerPoint (24 slides)
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm">
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Web Version
                </Button>
              </div>
            </div>

            <div className="rounded-md bg-primary/10 p-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-medium">AI Assistant</h3>
              </div>
              <p className="mt-2 text-sm">Need to make changes or have questions about this report?</p>
              <Button variant="outline" className="mt-2 w-full justify-start text-sm">
                <Brain className="mr-2 h-4 w-4" />
                Chat with AI about this report
              </Button>
            </div>

            <div className="flex flex-col gap-2">
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Download All Formats
              </Button>
              <Button variant="outline" onClick={onEditInStudio}>
                <PenLine className="mr-2 h-4 w-4" />
                Edit in Studio
              </Button>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Schedule Distribution
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
