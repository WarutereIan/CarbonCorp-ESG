"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, FileText, LayoutDashboard, Table } from "lucide-react"

export function ReportingExportDialog() {
  const [formats, setFormats] = useState({
    pdf: true,
    ppt: false,
    excel: false,
    web: true,
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Export Report</DialogTitle>
          <DialogDescription>Choose export formats and options for your report</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="formats" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="formats">Formats</TabsTrigger>
            <TabsTrigger value="options">Options</TabsTrigger>
            <TabsTrigger value="delivery">Delivery</TabsTrigger>
          </TabsList>
          <TabsContent value="formats" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="pdf"
                  checked={formats.pdf}
                  onCheckedChange={(checked) => setFormats({ ...formats, pdf: !!checked })}
                />
                <Label htmlFor="pdf" className="flex items-center gap-2 text-sm font-medium">
                  <FileText className="h-4 w-4" />
                  PDF Document
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="ppt"
                  checked={formats.ppt}
                  onCheckedChange={(checked) => setFormats({ ...formats, ppt: !!checked })}
                />
                <Label htmlFor="ppt" className="flex items-center gap-2 text-sm font-medium">
                  <LayoutDashboard className="h-4 w-4" />
                  PowerPoint Presentation
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="excel"
                  checked={formats.excel}
                  onCheckedChange={(checked) => setFormats({ ...formats, excel: !!checked })}
                />
                <Label htmlFor="excel" className="flex items-center gap-2 text-sm font-medium">
                  <Table className="h-4 w-4" />
                  Excel Spreadsheet (data only)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="web"
                  checked={formats.web}
                  onCheckedChange={(checked) => setFormats({ ...formats, web: !!checked })}
                />
                <Label htmlFor="web" className="flex items-center gap-2 text-sm font-medium">
                  <FileText className="h-4 w-4" />
                  Web Version
                </Label>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="options" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="cover" defaultChecked />
                <Label htmlFor="cover" className="text-sm font-medium">
                  Include cover page
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="toc" defaultChecked />
                <Label htmlFor="toc" className="text-sm font-medium">
                  Include table of contents
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="page-numbers" defaultChecked />
                <Label htmlFor="page-numbers" className="text-sm font-medium">
                  Include page numbers
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="appendix" defaultChecked />
                <Label htmlFor="appendix" className="text-sm font-medium">
                  Include appendices
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="branding" defaultChecked />
                <Label htmlFor="branding" className="text-sm font-medium">
                  Apply company branding
                </Label>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="delivery" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="download" defaultChecked />
                <Label htmlFor="download" className="text-sm font-medium">
                  Download immediately
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="email" />
                <Label htmlFor="email" className="text-sm font-medium">
                  Send via email
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="repository" defaultChecked />
                <Label htmlFor="repository" className="text-sm font-medium">
                  Save to document repository
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="share" />
                <Label htmlFor="share" className="text-sm font-medium">
                  Generate shareable link
                </Label>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Export Report</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
