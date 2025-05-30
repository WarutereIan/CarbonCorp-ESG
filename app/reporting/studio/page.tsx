"use client"

import React, { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { 
  ArrowLeft, 
  Download, 
  Save, 
  Share2, 
  RefreshCw, 
  Edit3, 
  Eye, 
  CheckCircle, 
  AlertTriangle, 
  MessageSquare, 
  Users, 
  FileText, 
  Settings, 
  Palette, 
  Filter, 
  BarChart3,
  Brain,
  Bot,
  Wand2,
  Lock,
  Unlock,
  Clock,
  UserPlus,
  GitBranch,
  Upload,
  ChevronDown,
  ChevronRight,
  Link as LinkIcon,
  Search,
  PlusCircle,
  Trash2,
  MoreHorizontal
} from "lucide-react"
import Link from "next/link"

export default function ReportingStudioPage() {
  const [currentSection, setCurrentSection] = useState("executive-summary")
  const [selectedText, setSelectedText] = useState("")
  const [showCompliancePanel, setShowCompliancePanel] = useState(false)
  const [showDesignStudio, setShowDesignStudio] = useState(false)
  const [showParameterPanel, setShowParameterPanel] = useState(false)
  const [showCollaboration, setShowCollaboration] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [sectionStatuses, setSectionStatuses] = useState({
    "executive-summary": "reviewed",
    "company-overview": "pending",
    "governance": "draft",
    "environmental": "review-needed",
    "social": "draft"
  })
  const [complianceScore, setComplianceScore] = useState(78)
  const [aiFeatures, setAiFeatures] = useState({
    autoSuggestions: true,
    factChecking: true,
    complianceCheck: true,
    styleConsistency: true
  })

  const reportSections = [
    { id: "executive-summary", title: "Executive Summary", status: "reviewed" },
    { id: "company-overview", title: "Company Overview", status: "pending" },
    { id: "governance", title: "Governance", status: "draft" },
    { id: "environmental", title: "Environmental", status: "review-needed" },
    { id: "social", title: "Social", status: "draft" },
    { id: "performance-data", title: "Performance Data", status: "draft" },
    { id: "targets-commitments", title: "Targets & Commitments", status: "draft" },
    { id: "appendices", title: "Appendices", status: "draft" }
  ]

  const collaborators = [
    { id: 1, name: "Sarah Johnson", role: "ESG Manager", status: "active", avatar: "SJ" },
    { id: 2, name: "Mike Chen", role: "Legal Counsel", status: "reviewing", avatar: "MC" },
    { id: 3, name: "Alex Rivera", role: "Sustainability Lead", status: "editing", avatar: "AR" }
  ]

  const complianceRequirements = [
    { id: 1, framework: "CSRD", requirement: "ESRS E1-1 Transition plan for climate change mitigation", status: "met", evidence: "Section 3.2" },
    { id: 2, framework: "CSRD", requirement: "ESRS E1-6 Energy consumption and mix", status: "partial", evidence: "Missing renewable breakdown" },
    { id: 3, framework: "ISSB S1", requirement: "Governance processes and controls", status: "not-met", evidence: "Not addressed" },
    { id: 4, framework: "GRI", requirement: "GRI 305-1 Direct GHG emissions", status: "met", evidence: "Table 4.1" }
  ]

  const handleRegenerateSection = async () => {
    setIsRegenerating(true)
    // Simulate AI regeneration
    setTimeout(() => {
      setIsRegenerating(false)
      setSectionStatuses(prev => ({ ...prev, [currentSection]: "draft" }))
    }, 2000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "reviewed": return "bg-green-100 text-green-800"
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "draft": return "bg-gray-100 text-gray-800"
      case "review-needed": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex h-[calc(100vh-65px)] flex-col">
      {/* Enhanced Header with AI Integration */}
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
              <p className="text-sm text-muted-foreground">
                Last edited: May 14, 2024 • AI-powered • 
                <Badge variant="outline" className="ml-2">
                  Compliance: {complianceScore}%
                </Badge>
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {/* AI Assistant Toggle */}
            <Button variant="outline" size="sm">
              <Bot className="mr-2 h-4 w-4" />
              AI Assistant
            </Button>
            
            {/* Design Studio */}
            <Sheet open={showDesignStudio} onOpenChange={setShowDesignStudio}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Palette className="mr-2 h-4 w-4" />
                  Design
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[400px]">
                <SheetHeader>
                  <SheetTitle>Visual Design Studio</SheetTitle>
                  <SheetDescription>
                    Customize the visual appearance and branding of your report
                  </SheetDescription>
                </SheetHeader>
                <VisualDesignStudio />
              </SheetContent>
            </Sheet>

            {/* Parameter Panel */}
            <Sheet open={showParameterPanel} onOpenChange={setShowParameterPanel}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Parameters
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[400px]">
                <SheetHeader>
                  <SheetTitle>Parameter Selection</SheetTitle>
                  <SheetDescription>
                    Configure report content scope and filters
                  </SheetDescription>
                </SheetHeader>
                <ParameterSelectionMenu />
              </SheetContent>
            </Sheet>

            {/* Collaboration */}
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowCollaboration(!showCollaboration)}
            >
              <Users className="mr-2 h-4 w-4" />
              Collaborate
            </Button>

            {/* Save/Export Actions */}
            <Button variant="outline">
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Navigation Sidebar */}
        <div className="w-72 border-r bg-muted/20">
          <div className="p-4">
            <h3 className="font-semibold mb-3">Report Sections</h3>
            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="space-y-1">
                {reportSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setCurrentSection(section.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors flex items-center justify-between ${
                      currentSection === section.id ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted/50'
                    }`}
                  >
                    <span className="font-medium">{section.title}</span>
                    <Badge variant="outline" className={getStatusColor(section.status)}>
                      {section.status}
                    </Badge>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col">
          {/* Section Toolbar */}
          <div className="border-b p-4 bg-muted/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold capitalize">
                  {currentSection.replace('-', ' ')}
                </h2>
                <Badge variant="outline" className={getStatusColor(sectionStatuses[currentSection])}>
                  {sectionStatuses[currentSection]}
                </Badge>
              </div>
              
              {/* AI Interaction Toolbar */}
              <AIInteractionToolbar 
                onRegenerate={handleRegenerateSection}
                isRegenerating={isRegenerating}
                currentSection={currentSection}
              />
            </div>
          </div>

          {/* Content Editor */}
          <div className="flex-1 flex">
            {/* Main Content Area */}
            <div className="flex-1 p-6">
              <ReportContentEditor 
                section={currentSection}
                onTextSelect={setSelectedText}
              />
            </div>

            {/* Right Panels */}
            <div className="w-80 border-l bg-muted/5">
              <Tabs defaultValue="compliance" className="h-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="compliance">Compliance</TabsTrigger>
                  <TabsTrigger value="ai">AI Tools</TabsTrigger>
                  <TabsTrigger value="data">Data Links</TabsTrigger>
                </TabsList>
                
                <TabsContent value="compliance" className="p-4 space-y-4">
                  <ComplianceValidationPanel requirements={complianceRequirements} />
                </TabsContent>
                
                <TabsContent value="ai" className="p-4 space-y-4">
                  <AIToolsPanel 
                    features={aiFeatures}
                    onFeatureToggle={(feature, enabled) => 
                      setAiFeatures(prev => ({ ...prev, [feature]: enabled }))
                    }
                  />
                </TabsContent>
                
                <TabsContent value="data" className="p-4 space-y-4">
                  <DataLinkagePanel />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Collaboration Panel */}
        {showCollaboration && (
          <div className="w-80 border-l bg-background">
            <CollaborationPanel collaborators={collaborators} />
          </div>
        )}
      </div>
    </div>
  )
}

// AI Interaction Toolbar Component
function AIInteractionToolbar({ onRegenerate, isRegenerating, currentSection }) {
  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="outline" 
        size="sm"
        onClick={onRegenerate}
        disabled={isRegenerating}
      >
        {isRegenerating ? (
          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Wand2 className="mr-2 h-4 w-4" />
        )}
        {isRegenerating ? "Regenerating..." : "Regenerate Section"}
      </Button>
      
      <Button variant="outline" size="sm">
        <Edit3 className="mr-2 h-4 w-4" />
        Minor Edit
      </Button>
      
      <Button variant="outline" size="sm">
        <BarChart3 className="mr-2 h-4 w-4" />
        Suggest Alternative
      </Button>
      
      <Button variant="outline" size="sm">
        <CheckCircle className="mr-2 h-4 w-4" />
        Accept Section
      </Button>
    </div>
  )
}

// Report Content Editor Component
function ReportContentEditor({ section, onTextSelect }) {
  return (
    <div className="prose max-w-none">
      <div className="bg-white rounded-lg border p-6 min-h-[600px]">
        {/* Content would be dynamically loaded based on section */}
        <SampleReportContent section={section} />
      </div>
    </div>
  )
}

// Sample Report Content Component
function SampleReportContent({ section }) {
  const content = {
    "executive-summary": {
      title: "Executive Summary",
      content: `This report presents CarbonCorp's environmental, social, and governance (ESG) performance for Q2 2024. During this period, we achieved significant milestones in our sustainability journey, including a 15% reduction in Scope 1 and 2 emissions compared to the same period last year.

Key highlights include:
• Renewable energy adoption reached 45% of total consumption
• Employee engagement scores improved by 12%
• Zero workplace incidents recorded
• Launched our supplier sustainability program

We remain committed to our 2030 net-zero target and continue to invest in innovative solutions that drive both environmental and business value.`
    },
    "environmental": {
      title: "Environmental Performance",
      content: `Our environmental initiatives focus on three key areas: climate action, resource efficiency, and ecosystem protection.

Climate Action:
During Q2 2024, our total greenhouse gas emissions were 2,450 tCO2e, representing a 15% decrease from Q2 2023. This reduction was primarily driven by our renewable energy transition and energy efficiency improvements.

Resource Efficiency:
Water consumption decreased by 8% through improved recycling systems and leak detection programs. Waste generation was reduced by 12%, with 85% of waste diverted from landfills.`
    }
  }

  const sectionContent = content[section] || { title: "Section Title", content: "Content will be generated here..." }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{sectionContent.title}</h1>
      <div className="space-y-4 text-gray-700 leading-relaxed whitespace-pre-line">
        {sectionContent.content}
      </div>
    </div>
  )
}

// Compliance Validation Panel Component
function ComplianceValidationPanel({ requirements }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Compliance Check</h3>
        <Button variant="outline" size="sm">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-3">
        {requirements.map((req) => (
          <Card key={req.id} className="p-3">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                {req.status === "met" && <CheckCircle className="h-4 w-4 text-green-600" />}
                {req.status === "partial" && <AlertTriangle className="h-4 w-4 text-yellow-600" />}
                {req.status === "not-met" && <AlertTriangle className="h-4 w-4 text-red-600" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-xs">
                    {req.framework}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      req.status === "met" ? "bg-green-50 text-green-700" :
                      req.status === "partial" ? "bg-yellow-50 text-yellow-700" :
                      "bg-red-50 text-red-700"
                    }`}
                  >
                    {req.status}
                  </Badge>
                </div>
                <p className="text-sm font-medium mb-1">{req.requirement}</p>
                <p className="text-xs text-muted-foreground">{req.evidence}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <Button className="w-full" variant="outline">
        Run Full Compliance Check
      </Button>
    </div>
  )
}

// AI Tools Panel Component
function AIToolsPanel({ features, onFeatureToggle }) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">AI Features</h3>
      
      <div className="space-y-3">
        {Object.entries(features).map(([key, enabled]) => (
          <div key={key} className="flex items-center justify-between">
            <Label htmlFor={key} className="text-sm capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </Label>
            <Switch
              id={key}
              checked={enabled}
              onCheckedChange={(checked) => onFeatureToggle(key, checked)}
            />
          </div>
        ))}
      </div>
      
      <Separator />
      
      <div className="space-y-2">
        <h4 className="font-medium text-sm">Quick Insights</h4>
        <div className="space-y-2">
          <Card className="p-3">
            <p className="text-xs text-muted-foreground">
              Your Scope 3 emissions data appears incomplete. Consider adding Category 1 calculations.
            </p>
          </Card>
          <Card className="p-3">
            <p className="text-xs text-muted-foreground">
              Strong alignment with CSRD requirements detected in this section.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Data Linkage Panel Component
function DataLinkagePanel() {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Data Sources</h3>
      
      <div className="space-y-2">
        <Card className="p-3">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium">Energy Data Hub</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Connected • Last sync: 2 hours ago
          </p>
        </Card>
        
        <Card className="p-3">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium">HR Systems</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Connected • Last sync: 1 day ago
          </p>
        </Card>
        
        <Card className="p-3">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
            <span className="text-sm font-medium">Supplier Data</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Pending • Manual upload required
          </p>
        </Card>
      </div>
      
      <Button variant="outline" className="w-full" size="sm">
        <LinkIcon className="mr-2 h-4 w-4" />
        Link New Source
      </Button>
    </div>
  )
}

// Collaboration Panel Component
function CollaborationPanel({ collaborators }) {
  return (
    <div className="p-4 space-y-4">
      <h3 className="font-semibold">Collaboration</h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Active Collaborators</span>
          <Button variant="outline" size="sm">
            <UserPlus className="h-4 w-4" />
          </Button>
        </div>
        
        {collaborators.map((collab) => (
          <div key={collab.id} className="flex items-center gap-3">
            <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center text-xs font-medium">
              {collab.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{collab.name}</p>
              <p className="text-xs text-muted-foreground">{collab.role}</p>
            </div>
            <Badge variant="outline" className="text-xs">
              {collab.status}
            </Badge>
          </div>
        ))}
      </div>
      
      <Separator />
      
      <div className="space-y-2">
        <h4 className="font-medium text-sm">Comments & Reviews</h4>
        <div className="space-y-2">
          <Card className="p-3">
            <div className="flex items-start gap-2">
              <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center text-xs">
                MC
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium">Mike Chen</p>
                <p className="text-xs text-muted-foreground">
                  Legal review complete for governance section
                </p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Visual Design Studio Component
function VisualDesignStudio() {
  const [selectedTheme, setSelectedTheme] = useState("corporate-blue")
  const [brandKit, setBrandKit] = useState("default")
  
  return (
    <ScrollArea className="h-[calc(100vh-120px)] pr-4">
      <div className="space-y-6">
        {/* Brand Kits */}
        <div className="space-y-3">
          <h4 className="font-medium">Brand Kits</h4>
          <Select value={brandKit} onValueChange={setBrandKit}>
            <SelectTrigger>
              <SelectValue placeholder="Select brand kit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Company Default</SelectItem>
              <SelectItem value="annual">Annual Report Theme</SelectItem>
              <SelectItem value="investor">Investor Presentation</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Themes */}
        <div className="space-y-3">
          <h4 className="font-medium">Themes</h4>
          <div className="grid grid-cols-2 gap-2">
            {["corporate-blue", "eco-modern", "minimalist", "professional"].map((theme) => (
              <button
                key={theme}
                onClick={() => setSelectedTheme(theme)}
                className={`p-3 border rounded-lg text-left ${
                  selectedTheme === theme ? 'border-primary bg-primary/5' : 'border-gray-200'
                }`}
              >
                <div className="text-sm font-medium capitalize">
                  {theme.replace('-', ' ')}
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Cover Page Designer */}
        <div className="space-y-3">
          <h4 className="font-medium">Cover Page</h4>
          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="space-y-3">
              <div className="h-20 bg-white rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                <span className="text-sm text-gray-500">Logo Upload Area</span>
              </div>
              <Input placeholder="Report Title" />
              <Input placeholder="Subtitle" />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Background Style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solid">Solid Color</SelectItem>
                  <SelectItem value="gradient">Gradient</SelectItem>
                  <SelectItem value="pattern">Pattern</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Typography */}
        <div className="space-y-3">
          <h4 className="font-medium">Typography</h4>
          <div className="space-y-2">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Heading Font" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inter">Inter</SelectItem>
                <SelectItem value="roboto">Roboto</SelectItem>
                <SelectItem value="poppins">Poppins</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Body Font" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inter">Inter</SelectItem>
                <SelectItem value="roboto">Roboto</SelectItem>
                <SelectItem value="system">System Default</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Color Palette */}
        <div className="space-y-3">
          <h4 className="font-medium">Color Palette</h4>
          <div className="grid grid-cols-4 gap-2">
            {["#1e40af", "#059669", "#dc2626", "#7c3aed"].map((color) => (
              <div 
                key={color}
                className="h-12 rounded-lg border"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
        
        <Separator />
        
        <div className="flex gap-2">
          <Button className="flex-1">Apply Design</Button>
          <Button variant="outline">Save as Template</Button>
        </div>
      </div>
    </ScrollArea>
  )
}

// Parameter Selection Menu Component
function ParameterSelectionMenu() {
  return (
    <ScrollArea className="h-[calc(100vh-120px)] pr-4">
      <div className="space-y-6">
        {/* Content Filters */}
        <div className="space-y-3">
          <h4 className="font-medium">Content Filters</h4>
          
          <div className="space-y-4">
            <div>
              <Label className="text-sm">ESG Topics</Label>
              <div className="grid grid-cols-1 gap-2 mt-2">
                {["Climate Change", "Water Management", "Waste Management", "Employee Wellbeing", "Diversity & Inclusion", "Board Diversity"].map((topic) => (
                  <div key={topic} className="flex items-center space-x-2">
                    <Checkbox id={topic} />
                    <Label htmlFor={topic} className="text-sm">{topic}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Label className="text-sm">Regions/Facilities</Label>
              <Select>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="emea">EMEA Region</SelectItem>
                  <SelectItem value="americas">Americas</SelectItem>
                  <SelectItem value="apac">APAC</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-sm">Time Period</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Input type="date" placeholder="Start Date" />
                <Input type="date" placeholder="End Date" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Compliance Frameworks */}
        <div className="space-y-3">
          <h4 className="font-medium">Compliance Frameworks</h4>
          <div className="space-y-2">
            {["CSRD (ESRS)", "ISSB S1/S2", "GRI Standards", "SASB", "TCFD"].map((framework) => (
              <div key={framework} className="flex items-center space-x-2">
                <Checkbox id={framework} />
                <Label htmlFor={framework} className="text-sm">{framework}</Label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Audience & Tone */}
        <div className="space-y-3">
          <h4 className="font-medium">Audience & Tone</h4>
          <div className="space-y-2">
            <div>
              <Label className="text-sm">Target Audience</Label>
              <RadioGroup defaultValue="investor" className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="investor" id="investor" />
                  <Label htmlFor="investor" className="text-sm">Investors</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="regulator" id="regulator" />
                  <Label htmlFor="regulator" className="text-sm">Regulators</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="public" id="public" />
                  <Label htmlFor="public" className="text-sm">General Public</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label className="text-sm">Report Style</Label>
              <Select>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="concise">Concise</SelectItem>
                  <SelectItem value="detailed">Detailed</SelectItem>
                  <SelectItem value="story">Story-driven</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <Button className="w-full">Apply Parameters</Button>
      </div>
    </ScrollArea>
  )
}
