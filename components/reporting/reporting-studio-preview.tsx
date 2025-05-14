import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { Download, FileText, Printer } from "lucide-react"

export function ReportingStudioPreview() {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b bg-muted/40 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              PDF
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
          </div>
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="mx-auto max-w-4xl p-6">
          <div className="rounded-md border bg-white p-8 shadow-sm">
            {/* Cover Page */}
            <div className="mb-12 flex flex-col items-center justify-center space-y-4 py-12 text-center">
              <div className="h-16 w-16 rounded-md bg-primary/10"></div>
              <h1 className="text-3xl font-bold">Q2 2024 Sustainability Report</h1>
              <p className="text-muted-foreground">April 1 - June 30, 2024</p>
              <p className="text-sm text-muted-foreground">CarbonCorp ESG Platform</p>
            </div>

            {/* Table of Contents */}
            <div className="mb-12">
              <h2 className="mb-4 text-xl font-bold">Table of Contents</h2>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Executive Summary</span>
                  <span className="text-sm">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Environmental Performance</span>
                  <span className="text-sm">4</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Social Initiatives</span>
                  <span className="text-sm">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Governance Overview</span>
                  <span className="text-sm">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Recommendations</span>
                  <span className="text-sm">15</span>
                </div>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="mb-12">
              <h2 className="mb-4 text-xl font-bold">Executive Summary</h2>
              <p className="mb-4">
                This quarter, our sustainability initiatives have shown significant progress across key metrics. Overall
                carbon emissions decreased by 8.2% compared to the previous quarter, driven primarily by energy
                efficiency improvements and increased renewable energy usage. Water consumption has been reduced by
                5.3%, and waste diversion rates improved to 78%.
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

            {/* Environmental Performance */}
            <div className="mb-12">
              <h2 className="mb-4 text-xl font-bold">Environmental Performance</h2>
              <h3 className="mb-2 text-lg font-medium">Carbon Emissions</h3>
              <p className="mb-4">
                Our total carbon emissions for Q2 2024 were 1,713.9 tCO₂e, representing an 8.2% decrease from the
                previous quarter. This reduction was achieved through a combination of energy efficiency measures,
                increased renewable energy usage, and optimized logistics.
              </p>
              <div className="mb-6 aspect-[2/1] rounded-md border bg-muted/50 p-4">
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm text-muted-foreground">[Carbon Emissions Chart]</p>
                </div>
              </div>
              <h3 className="mb-2 text-lg font-medium">Energy Consumption</h3>
              <p className="mb-4">
                Total energy consumption decreased by 5.2% to 245,678 kWh. The proportion of renewable energy increased
                to 32.5%, exceeding our quarterly target of 30%. Energy efficiency initiatives implemented in our Lagos
                and Nairobi facilities contributed significantly to this reduction.
              </p>
              <div className="aspect-[2/1] rounded-md border bg-muted/50 p-4">
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm text-muted-foreground">[Energy Consumption Chart]</p>
                </div>
              </div>
            </div>

            {/* More sections would continue here */}
            <div className="text-center text-sm text-muted-foreground">
              Page 1 of 18 • Preview showing abbreviated content
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
