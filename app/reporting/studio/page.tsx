import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReportingStudioEditor } from "@/components/reporting/reporting-studio-editor"
import { ReportingStudioPreview } from "@/components/reporting/reporting-studio-preview"
import { ReportingStudioSidebar } from "@/components/reporting/reporting-studio-sidebar"
import { ArrowLeft, Download, Save, Share2 } from "lucide-react"
import Link from "next/link"

export default function ReportingStudioPage() {
  return (
    <div className="flex h-[calc(100vh-65px)] flex-col">
      {/* Header */}
      <div className="border-b bg-background p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" asChild>
              <Link href="/reporting">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-xl font-bold">Q2 2024 Sustainability Report</h1>
              <p className="text-sm text-muted-foreground">Last edited: May 14, 2024 • AI-generated</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline">
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <ReportingStudioSidebar />
        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="edit" className="h-full">
            <div className="border-b bg-muted/40">
              <div className="flex items-center justify-between px-4">
                <TabsList className="h-12">
                  <TabsTrigger value="edit" className="px-4">
                    Edit
                  </TabsTrigger>
                  <TabsTrigger value="preview" className="px-4">
                    Preview
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
            <TabsContent value="edit" className="h-[calc(100%-48px)] p-0 data-[state=inactive]:hidden">
              <ReportingStudioEditor />
            </TabsContent>
            <TabsContent value="preview" className="h-[calc(100%-48px)] p-0 data-[state=inactive]:hidden">
              <ReportingStudioPreview />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
