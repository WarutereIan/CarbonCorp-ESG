"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Upload, FileText, Download, Plus, Database, Link as LinkIcon, Building2, Users, Zap, Settings, CheckCircle, AlertCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Data source configurations
const dataSourceCategories = [
  {
    id: "financial-erp",
    name: "Financial/ERP Systems",
    icon: Database,
    description: "Connect to accounting and financial systems",
    sources: [
      {
        id: "quickbooks",
        name: "QuickBooks",
        logo: "/logos/quickbooks.svg",
        description: "Financial data for Scope 1, 2, some Scope 3 calculations",
        authType: "oauth",
        fields: ["Financial Transactions", "Account Balances", "Cost Centers"],
        popular: true
      },
      {
        id: "sage",
        name: "Sage",
        logo: "/logos/sage.svg", 
        description: "Comprehensive business management data",
        authType: "oauth",
        fields: ["Financial Data", "Cost Centers", "Asset Information"],
        popular: true
      },
      {
        id: "sap",
        name: "SAP",
        logo: "/logos/sap.svg",
        description: "Enterprise resource planning data",
        authType: "api_key",
        fields: ["Financial Transactions", "Supply Chain", "Operations"],
        popular: false
      },
      {
        id: "oracle-netsuite",
        name: "Oracle NetSuite",
        logo: "/logos/netsuite.svg",
        description: "Cloud business management suite",
        authType: "oauth",
        fields: ["Financial Data", "CRM Data", "Operations"],
        popular: false
      },
      {
        id: "xero",
        name: "Xero",
        logo: "/logos/xero.svg",
        description: "Cloud accounting software",
        authType: "oauth",
        fields: ["Financial Transactions", "Invoicing", "Expenses"],
        popular: true
      }
    ]
  },
  {
    id: "hr-payroll",
    name: "HR/Payroll Systems",
    icon: Users,
    description: "Connect to human resources management systems",
    sources: [
      {
        id: "workday",
        name: "Workday",
        logo: "/logos/workday.svg",
        description: "Comprehensive HR and workforce analytics",
        authType: "oauth",
        fields: ["Employee Demographics", "Training Records", "Performance Data"],
        popular: true
      },
      {
        id: "sap-successfactors",
        name: "SAP SuccessFactors",
        logo: "/logos/sap-sf.svg",
        description: "Cloud HR management system",
        authType: "oauth",
        fields: ["Employee Data", "Learning Records", "Performance"],
        popular: true
      },
      {
        id: "bamboohr",
        name: "BambooHR",
        logo: "/logos/bamboohr.svg",
        description: "HR software for growing companies",
        authType: "api_key",
        fields: ["Employee Information", "Time Tracking", "Benefits"],
        popular: false
      },
      {
        id: "adp",
        name: "ADP",
        logo: "/logos/adp.svg",
        description: "Payroll and HR management",
        authType: "oauth",
        fields: ["Payroll Data", "Employee Demographics", "Benefits"],
        popular: false
      }
    ]
  },
  {
    id: "iot-energy",
    name: "IoT/Energy Management",
    icon: Zap,
    description: "Connect to IoT platforms and energy management systems",
    sources: [
      {
        id: "siemens-mindsphere",
        name: "Siemens MindSphere",
        logo: "/logos/siemens.svg",
        description: "Industrial IoT operating system",
        authType: "api_key",
        fields: ["Energy Consumption", "Equipment Data", "Environmental Sensors"],
        popular: true
      },
      {
        id: "schneider-ecostruxure",
        name: "Schneider EcoStruxure",
        logo: "/logos/schneider.svg",
        description: "Energy management and automation",
        authType: "api_key",
        fields: ["Energy Usage", "Power Quality", "Environmental Data"],
        popular: true
      },
      {
        id: "honeywell-forge",
        name: "Honeywell Forge",
        logo: "/logos/honeywell.svg",
        description: "Industrial IoT software platform",
        authType: "oauth",
        fields: ["Building Analytics", "Energy Data", "Environmental Monitoring"],
        popular: false
      },
      {
        id: "mqtt-connector",
        name: "Generic MQTT",
        logo: "/logos/mqtt.svg",
        description: "Connect to any MQTT broker",
        authType: "credentials",
        fields: ["Custom IoT Data", "Sensor Readings", "Equipment Status"],
        popular: false
      }
    ]
  },
  {
    id: "utilities",
    name: "Utility Providers",
    icon: Building2,
    description: "Connect to utility company portals and data feeds",
    sources: [
      {
        id: "utility-api",
        name: "Utility API",
        logo: "/logos/utility-api.svg",
        description: "Automated utility bill data access",
        authType: "oauth",
        fields: ["Electricity Usage", "Gas Consumption", "Water Usage"],
        popular: true
      },
      {
        id: "genability",
        name: "Genability",
        logo: "/logos/genability.svg",
        description: "Utility rate and usage data",
        authType: "api_key",
        fields: ["Electricity Rates", "Usage Data", "Bill Analysis"],
        popular: false
      },
      {
        id: "manual-utility",
        name: "Manual Utility Setup",
        logo: "/logos/manual.svg",
        description: "Configure manual data entry for utility bills",
        authType: "none",
        fields: ["Custom Utility Data", "Manual Entry", "File Upload"],
        popular: true
      }
    ]
  }
]

export default function DataImportPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedSource, setSelectedSource] = useState<any>(null)
  const [connectionStep, setConnectionStep] = useState(1)
  const [connectionData, setConnectionData] = useState<any>({})
  const [showConnectionDialog, setShowConnectionDialog] = useState(false)
  
  // File upload wizard state
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [uploadStep, setUploadStep] = useState(1)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [uploadData, setUploadData] = useState<any>({
    esgCategory: "",
    reportingPeriod: "",
    entityAssociation: "",
    customTags: [],
    columnMappings: {},
    validationResults: null
  })
  const [dragActive, setDragActive] = useState(false)

  const esgCategories = [
    { id: "environmental-energy", name: "Environmental - Energy", subCategories: ["Energy Consumption", "Renewable Energy", "Energy Efficiency"] },
    { id: "environmental-water", name: "Environmental - Water", subCategories: ["Water Withdrawal", "Water Consumption", "Water Quality"] },
    { id: "environmental-waste", name: "Environmental - Waste", subCategories: ["Waste Generation", "Waste Disposal", "Recycling"] },
    { id: "environmental-emissions", name: "Environmental - Emissions", subCategories: ["Scope 1 Emissions", "Scope 2 Emissions", "Scope 3 Emissions"] },
    { id: "social-employees", name: "Social - Employee Data", subCategories: ["Demographics", "Training", "Health & Safety"] },
    { id: "social-community", name: "Social - Community", subCategories: ["Community Investment", "Local Engagement", "Social Impact"] },
    { id: "governance-board", name: "Governance - Board", subCategories: ["Board Diversity", "Independence", "Committees"] },
    { id: "governance-ethics", name: "Governance - Ethics", subCategories: ["Training", "Violations", "Policies"] }
  ]

  const facilities = [
    "All Facilities",
    "Headquarters - Lagos",
    "Manufacturing Plant - Kano", 
    "Distribution Center - Port Harcourt",
    "Regional Office - Abuja",
    "Warehouse - Ibadan"
  ]

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setSelectedSource(null)
    setConnectionStep(1)
  }

  const handleSourceSelect = (source: any) => {
    setSelectedSource(source)
    setConnectionStep(2)
    setConnectionData({ sourceId: source.id, sourceName: source.name })
  }

  const handleConnectionSetup = () => {
    // This would normally send the connection data to the backend
    console.log("Setting up connection with:", connectionData)
    
    // Simulate successful connection
    setConnectionStep(4)
    
    // Auto-close dialog after success
    setTimeout(() => {
      setShowConnectionDialog(false)
      setConnectionStep(1)
      setSelectedSource(null)
      setSelectedCategory("")
      setConnectionData({})
    }, 2000)
  }

  // File upload handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }

  const handleFileUpload = (file: File) => {
    // Validate file type
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'text/csv'
    ]
    
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a valid Excel (.xlsx, .xls) or CSV file')
      return
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB')
      return
    }

    setUploadedFile(file)
    setUploadStep(2)
  }

  const handleUploadNext = () => {
    if (uploadStep === 2 && (!uploadData.esgCategory || !uploadData.reportingPeriod)) {
      alert('Please fill in all required fields')
      return
    }
    setUploadStep(uploadStep + 1)
  }

  const resetUploadWizard = () => {
    setUploadStep(1)
    setUploadedFile(null)
    setUploadData({
      esgCategory: "",
      reportingPeriod: "",
      entityAssociation: "",
      customTags: [],
      columnMappings: {},
      validationResults: null
    })
  }

  const renderAuthForm = () => {
    if (!selectedSource) return null

    switch (selectedSource.authType) {
      case "oauth":
        return (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800 mb-3">
                You'll be redirected to {selectedSource.name} to authorize access to your data.
              </p>
              <div className="space-y-2 text-xs text-blue-700">
                <p>• We only request read-only access to relevant ESG data</p>
                <p>• Your credentials are never stored on our servers</p>
                <p>• You can revoke access at any time</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <Label htmlFor="sync-frequency">Sync Frequency</Label>
                <Select onValueChange={(value) => setConnectionData({...connectionData, syncFrequency: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sync frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case "api_key":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="api-key">API Key</Label>
              <Input
                id="api-key"
                type="password"
                placeholder="Enter your API key"
                value={connectionData.apiKey || ""}
                onChange={(e) => setConnectionData({...connectionData, apiKey: e.target.value})}
              />
              <p className="text-xs text-gray-500 mt-1">
                You can find your API key in your {selectedSource.name} account settings
              </p>
            </div>
            {selectedSource.id === "mqtt-connector" && (
              <>
                <div>
                  <Label htmlFor="broker-url">MQTT Broker URL</Label>
                  <Input
                    id="broker-url"
                    placeholder="mqtt://broker.example.com:1883"
                    value={connectionData.brokerUrl || ""}
                    onChange={(e) => setConnectionData({...connectionData, brokerUrl: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="topic">Topic Pattern</Label>
                  <Input
                    id="topic"
                    placeholder="esg/+/data"
                    value={connectionData.topic || ""}
                    onChange={(e) => setConnectionData({...connectionData, topic: e.target.value})}
                  />
                </div>
              </>
            )}
            <div>
              <Label htmlFor="sync-frequency">Sync Frequency</Label>
              <Select onValueChange={(value) => setConnectionData({...connectionData, syncFrequency: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select sync frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realtime">Real-time</SelectItem>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case "credentials":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter username"
                value={connectionData.username || ""}
                onChange={(e) => setConnectionData({...connectionData, username: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={connectionData.password || ""}
                onChange={(e) => setConnectionData({...connectionData, password: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="endpoint">Endpoint URL</Label>
              <Input
                id="endpoint"
                placeholder="https://api.example.com"
                value={connectionData.endpoint || ""}
                onChange={(e) => setConnectionData({...connectionData, endpoint: e.target.value})}
              />
            </div>
          </div>
        )

      default:
        return (
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700">
              This data source will be configured for manual data entry and file uploads.
            </p>
          </div>
        )
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => router.push("/data-hub")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Data Hub
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Data Import Wizard</h1>
            <p className="text-muted-foreground">
              Import ESG data using Excel/CSV files or connect to external systems
            </p>
          </div>
        </div>
      </div>

      {/* Import Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="cursor-pointer hover:border-blue-300 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="h-5 w-5" />
              <span>Upload Data File</span>
            </CardTitle>
            <CardDescription>
              Upload Excel or CSV files with ESG data using our guided import wizard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Supported formats: Excel (.xlsx, .xls), CSV files with AI-assisted column mapping
                and comprehensive data validation.
              </p>
              <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
                <DialogTrigger asChild>
                  <Button className="w-full" onClick={() => setShowUploadDialog(true)}>
                    <Upload className="h-4 w-4 mr-2" />
                    Start File Upload
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Data Import Wizard</DialogTitle>
                    <DialogDescription>
                      Step {uploadStep} of 5: {
                        uploadStep === 1 ? "File Upload & Validation" :
                        uploadStep === 2 ? "Data Source Annotation" :
                        uploadStep === 3 ? "Column Mapping & Preview" :
                        uploadStep === 4 ? "Validation & Error Handling" :
                        "Import Confirmation"
                      }
                    </DialogDescription>
                  </DialogHeader>

                  {/* Step 1: File Upload & Initial Validation */}
                  {uploadStep === 1 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Upload Your ESG Data File</h3>
                        
                        {/* File Drop Zone */}
                        <div
                          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                            dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
                          }`}
                          onDragEnter={handleDrag}
                          onDragLeave={handleDrag}
                          onDragOver={handleDrag}
                          onDrop={handleDrop}
                        >
                          <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                          <div className="space-y-2">
                            <p className="text-lg">Drag and drop your file here, or</p>
                            <Input
                              type="file"
                              accept=".xlsx,.xls,.csv"
                              onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                              className="hidden"
                              id="file-upload"
                            />
                            <Label htmlFor="file-upload">
                              <Button variant="outline" className="cursor-pointer">
                                Browse Files
                              </Button>
                            </Label>
                          </div>
                          <p className="text-sm text-gray-500 mt-4">
                            Supported formats: Excel (.xlsx, .xls), CSV files | Max size: 10MB
                          </p>
                        </div>

                        {uploadedFile && (
                          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <CheckCircle className="h-5 w-5 text-green-600" />
                              <div>
                                <p className="font-medium text-green-800">File uploaded successfully</p>
                                <p className="text-sm text-green-600">
                                  {uploadedFile.name} ({(uploadedFile.size / 1024).toFixed(1)} KB)
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Download Templates Section */}
                      <div className="border-t pt-6">
                        <h4 className="font-medium mb-3">Or Download a Pre-configured Template</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <Button variant="outline" size="sm" className="justify-start">
                            <Download className="h-4 w-4 mr-2" />
                            Energy Template
                          </Button>
                          <Button variant="outline" size="sm" className="justify-start">
                            <Download className="h-4 w-4 mr-2" />
                            Water Template
                          </Button>
                          <Button variant="outline" size="sm" className="justify-start">
                            <Download className="h-4 w-4 mr-2" />
                            Employee Template
                          </Button>
                        </div>
                      </div>

                      <div className="flex justify-end pt-4 border-t">
                        <Button onClick={() => setShowUploadDialog(false)} variant="outline" className="mr-3">
                          Cancel
                        </Button>
                        <Button onClick={handleUploadNext} disabled={!uploadedFile}>
                          Next: Annotate Data
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Data Source Annotation & Type Selection */}
                  {uploadStep === 2 && (
                    <div className="space-y-6">
                      <div className="flex items-center space-x-3 pb-4 border-b">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <div>
                          <h3 className="text-lg font-medium">Annotate Your Data</h3>
                          <p className="text-sm text-gray-600">
                            File: {uploadedFile?.name}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="esg-category">ESG Data Category *</Label>
                            <Select value={uploadData.esgCategory} onValueChange={(value) => 
                              setUploadData({...uploadData, esgCategory: value})
                            }>
                              <SelectTrigger>
                                <SelectValue placeholder="Select ESG category" />
                              </SelectTrigger>
                              <SelectContent>
                                {esgCategories.map((category) => (
                                  <SelectItem key={category.id} value={category.id}>
                                    {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="reporting-period">Reporting Period *</Label>
                            <Select value={uploadData.reportingPeriod} onValueChange={(value) => 
                              setUploadData({...uploadData, reportingPeriod: value})
                            }>
                              <SelectTrigger>
                                <SelectValue placeholder="Select reporting period" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="2024-q4">Q4 2024</SelectItem>
                                <SelectItem value="2024-q3">Q3 2024</SelectItem>
                                <SelectItem value="2024-q2">Q2 2024</SelectItem>
                                <SelectItem value="2024-q1">Q1 2024</SelectItem>
                                <SelectItem value="2024-annual">Annual 2024</SelectItem>
                                <SelectItem value="2023-annual">Annual 2023</SelectItem>
                                <SelectItem value="custom">Custom Period</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="entity-association">Source/Entity Association</Label>
                            <Select value={uploadData.entityAssociation} onValueChange={(value) => 
                              setUploadData({...uploadData, entityAssociation: value})
                            }>
                              <SelectTrigger>
                                <SelectValue placeholder="Select facility/entity" />
                              </SelectTrigger>
                              <SelectContent>
                                {facilities.map((facility) => (
                                  <SelectItem key={facility} value={facility}>
                                    {facility}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="custom-tags">Custom Tags</Label>
                            <Input
                              placeholder="Add tags (comma separated)"
                              onChange={(e) => setUploadData({
                                ...uploadData, 
                                customTags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                              })}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              Tags help organize and filter your data
                            </p>
                          </div>

                          {uploadData.esgCategory && (
                            <div className="p-3 bg-blue-50 rounded-lg">
                              <h5 className="font-medium text-blue-800 mb-2">Expected Data Fields</h5>
                              <div className="flex flex-wrap gap-1">
                                {esgCategories
                                  .find(cat => cat.id === uploadData.esgCategory)
                                  ?.subCategories.map((subCat) => (
                                    <Badge key={subCat} variant="outline" className="text-xs">
                                      {subCat}
                                    </Badge>
                                  ))}
                              </div>
                            </div>
                          )}

                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="remember-structure" className="rounded" />
                            <Label htmlFor="remember-structure" className="text-sm">
                              Remember annotation for this file structure
                            </Label>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between pt-4 border-t">
                        <Button variant="outline" onClick={() => setUploadStep(1)}>
                          Back
                        </Button>
                        <Button onClick={handleUploadNext}>
                          Next: Map Columns
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: AI-Assisted Column Mapping & Data Preview */}
                  {uploadStep === 3 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Column Mapping & Data Preview</h3>
                        <p className="text-sm text-gray-600">
                          AI has automatically mapped your columns. Review and adjust as needed.
                        </p>
                      </div>

                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <CheckCircle className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-800">AI Analysis Complete</span>
                        </div>
                        <p className="text-sm text-blue-700">
                          Successfully mapped 8 of 10 columns. 2 columns need manual review.
                        </p>
                      </div>

                      {/* Column Mapping Table */}
                      <div className="border rounded-lg overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Source Column</TableHead>
                              <TableHead>Mapped to ESG Field</TableHead>
                              <TableHead>Data Type</TableHead>
                              <TableHead>Sample Data</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">Facility_Name</TableCell>
                              <TableCell>Facility</TableCell>
                              <TableCell>Text</TableCell>
                              <TableCell className="text-gray-600">Lagos HQ, Kano Plant...</TableCell>
                              <TableCell>
                                <Badge variant="default" className="bg-green-100 text-green-700">Mapped</Badge>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Energy_Consumption_kWh</TableCell>
                              <TableCell>Energy Consumption (kWh)</TableCell>
                              <TableCell>Numeric</TableCell>
                              <TableCell className="text-gray-600">12500, 8900, 15600...</TableCell>
                              <TableCell>
                                <Badge variant="default" className="bg-green-100 text-green-700">Mapped</Badge>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Month_Year</TableCell>
                              <TableCell>
                                <Select defaultValue="reporting-period">
                                  <SelectTrigger className="w-full">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="reporting-period">Reporting Period</SelectItem>
                                    <SelectItem value="custom-date">Custom Date</SelectItem>
                                    <SelectItem value="ignore">Ignore Column</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell>Date</TableCell>
                              <TableCell className="text-gray-600">Jan-2024, Feb-2024...</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="bg-yellow-100 text-yellow-700">Review</Badge>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>

                      {/* Data Preview */}
                      <div>
                        <h4 className="font-medium mb-3">Data Preview (First 5 rows)</h4>
                        <div className="border rounded-lg overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Facility</TableHead>
                                <TableHead>Energy (kWh)</TableHead>
                                <TableHead>Period</TableHead>
                                <TableHead>Status</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell>Lagos HQ</TableCell>
                                <TableCell>12,500</TableCell>
                                <TableCell>Jan 2024</TableCell>
                                <TableCell><Badge variant="default">Valid</Badge></TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Kano Plant</TableCell>
                                <TableCell>8,900</TableCell>
                                <TableCell>Jan 2024</TableCell>
                                <TableCell><Badge variant="default">Valid</Badge></TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Port Harcourt DC</TableCell>
                                <TableCell className="text-red-600">Invalid</TableCell>
                                <TableCell>Jan 2024</TableCell>
                                <TableCell><Badge variant="destructive">Error</Badge></TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      </div>

                      <div className="flex justify-between pt-4 border-t">
                        <Button variant="outline" onClick={() => setUploadStep(2)}>
                          Back
                        </Button>
                        <Button onClick={handleUploadNext}>
                          Next: Validate Data
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Validation & Error Handling */}
                  {uploadStep === 4 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Data Validation Results</h3>
                        <p className="text-sm text-gray-600">
                          Review validation results and resolve any issues before importing.
                        </p>
                      </div>

                      {/* Validation Summary */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardContent className="pt-6">
                            <div className="text-2xl font-bold text-green-600">847</div>
                            <p className="text-sm text-gray-600">Valid Records</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="pt-6">
                            <div className="text-2xl font-bold text-yellow-600">12</div>
                            <p className="text-sm text-gray-600">Warnings</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="pt-6">
                            <div className="text-2xl font-bold text-red-600">3</div>
                            <p className="text-sm text-gray-600">Errors</p>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Error Details */}
                      <div className="space-y-4">
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                          <h4 className="font-medium text-red-800 mb-2">Errors Found (3)</h4>
                          <div className="space-y-2 text-sm">
                            <p className="text-red-700">• Row 45: Energy consumption value exceeds expected range (500,000 kWh)</p>
                            <p className="text-red-700">• Row 67: Invalid date format in reporting period</p>
                            <p className="text-red-700">• Row 123: Missing required facility name</p>
                          </div>
                          <Button variant="outline" size="sm" className="mt-3">
                            <Download className="h-4 w-4 mr-2" />
                            Download Error Report
                          </Button>
                        </div>

                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <h4 className="font-medium text-yellow-800 mb-2">Warnings (12)</h4>
                          <div className="space-y-2 text-sm">
                            <p className="text-yellow-700">• 8 records have energy values below typical range</p>
                            <p className="text-yellow-700">• 4 records missing optional tags</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <Button variant="outline" className="flex-1">
                          Cancel and Fix File
                        </Button>
                        <Button className="flex-1" onClick={handleUploadNext}>
                          Proceed with Valid Data Only (847 records)
                        </Button>
                      </div>

                      <div className="flex justify-between pt-4 border-t">
                        <Button variant="outline" onClick={() => setUploadStep(3)}>
                          Back
                        </Button>
                        <Button onClick={handleUploadNext}>
                          Continue to Import
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 5: Confirmation & Import */}
                  {uploadStep === 5 && (
                    <div className="space-y-6">
                      <div className="text-center">
                        <h3 className="text-lg font-medium mb-2">Import Summary</h3>
                        <p className="text-sm text-gray-600">
                          Review your import configuration before proceeding
                        </p>
                      </div>

                      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-500">File</Label>
                            <p className="text-sm">{uploadedFile?.name}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-500">ESG Category</Label>
                            <p className="text-sm">{esgCategories.find(cat => cat.id === uploadData.esgCategory)?.name}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Reporting Period</Label>
                            <p className="text-sm">{uploadData.reportingPeriod}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Records to Import</Label>
                            <p className="text-sm font-medium text-green-600">847 valid records</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
                        <input type="checkbox" id="save-template" className="rounded" />
                        <Label htmlFor="save-template" className="text-sm">
                          Save import configuration as template for future uploads
                        </Label>
                      </div>

                      <div className="text-center space-y-4">
                        <Button 
                          size="lg" 
                          className="px-8"
                          onClick={() => {
                            // Simulate import process
                            setTimeout(() => {
                              setShowUploadDialog(false)
                              resetUploadWizard()
                              router.push("/data-hub")
                            }, 2000)
                          }}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Import Data
                        </Button>
                        <p className="text-xs text-gray-500">
                          Data will be imported and available in the Data Hub within a few minutes
                        </p>
                      </div>

                      <div className="flex justify-between pt-4 border-t">
                        <Button variant="outline" onClick={() => setUploadStep(4)}>
                          Back
                        </Button>
                        <Button variant="outline" onClick={() => {
                          setShowUploadDialog(false)
                          resetUploadWizard()
                        }}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:border-blue-300 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Connect Data Source</span>
            </CardTitle>
            <CardDescription>
              Connect to external APIs and systems for automated data collection
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Connect to ERP systems, HRIS, IoT platforms, and utility portals for 
                automated ESG data collection.
              </p>
              <Dialog open={showConnectionDialog} onOpenChange={setShowConnectionDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Configure Connection
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Connect Data Source</DialogTitle>
                    <DialogDescription>
                      Choose a data source and configure the connection to start automated data collection
                    </DialogDescription>
                  </DialogHeader>
                  
                  {connectionStep === 1 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Select Data Source Category</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {dataSourceCategories.map((category) => {
                            const IconComponent = category.icon
                            return (
                              <Card 
                                key={category.id} 
                                className={`cursor-pointer transition-all hover:border-blue-300 ${
                                  selectedCategory === category.id ? "border-blue-500 bg-blue-50" : ""
                                }`}
                                onClick={() => handleCategorySelect(category.id)}
                              >
                                <CardContent className="p-4">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                      <IconComponent className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                      <h4 className="font-medium">{category.name}</h4>
                                      <p className="text-sm text-gray-600">{category.description}</p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            )
                          })}
                        </div>
                      </div>

                      {selectedCategory && (
                        <div>
                          <h3 className="text-lg font-medium mb-4">Select Specific Data Source</h3>
                          <div className="grid grid-cols-1 gap-3">
                            {dataSourceCategories
                              .find(cat => cat.id === selectedCategory)?.sources
                              .map((source) => (
                                <Card 
                                  key={source.id}
                                  className="cursor-pointer transition-all hover:border-blue-300"
                                  onClick={() => handleSourceSelect(source)}
                                >
                                  <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                          <LinkIcon className="h-5 w-5 text-gray-600" />
                                        </div>
                                        <div className="flex-1">
                                          <div className="flex items-center space-x-2">
                                            <h4 className="font-medium">{source.name}</h4>
                                            {source.popular && (
                                              <Badge variant="secondary" className="text-xs">Popular</Badge>
                                            )}
                                          </div>
                                          <p className="text-sm text-gray-600">{source.description}</p>
                                          <div className="flex flex-wrap gap-1 mt-2">
                                            {source.fields.slice(0, 2).map((field) => (
                                              <Badge key={field} variant="outline" className="text-xs">
                                                {field}
                                              </Badge>
                                            ))}
                                            {source.fields.length > 2 && (
                                              <Badge variant="outline" className="text-xs">
                                                +{source.fields.length - 2} more
                                              </Badge>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                      <Button size="sm">Connect</Button>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {connectionStep === 2 && selectedSource && (
                    <div className="space-y-6">
                      <div className="flex items-center space-x-3 pb-4 border-b">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <LinkIcon className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium">{selectedSource.name}</h3>
                          <p className="text-sm text-gray-600">{selectedSource.description}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3">Data Fields to be Collected</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedSource.fields.map((field: string) => (
                            <Badge key={field} variant="outline">{field}</Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3">Connection Configuration</h4>
                        {renderAuthForm()}
                      </div>

                      <div className="flex space-x-3 pt-4 border-t">
                        <Button variant="outline" onClick={() => setConnectionStep(1)}>
                          Back
                        </Button>
                        <Button 
                          onClick={() => setConnectionStep(3)}
                          disabled={selectedSource.authType === "oauth" ? !connectionData.syncFrequency : false}
                        >
                          Continue
                        </Button>
                      </div>
                    </div>
                  )}

                  {connectionStep === 3 && selectedSource && (
                    <div className="space-y-6">
                      <div className="text-center">
                        <h3 className="text-lg font-medium mb-2">Review Connection Settings</h3>
                        <p className="text-sm text-gray-600">
                          Please review your connection configuration before proceeding
                        </p>
                      </div>

                      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Data Source</Label>
                            <p className="text-sm">{selectedSource.name}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Sync Frequency</Label>
                            <p className="text-sm capitalize">{connectionData.syncFrequency || "Not specified"}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Authentication</Label>
                            <p className="text-sm capitalize">{selectedSource.authType.replace("_", " ")}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Data Fields</Label>
                            <p className="text-sm">{selectedSource.fields.length} fields</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-3 pt-4 border-t">
                        <Button variant="outline" onClick={() => setConnectionStep(2)}>
                          Back
                        </Button>
                        <Button onClick={handleConnectionSetup}>
                          {selectedSource.authType === "oauth" ? "Authorize & Connect" : "Test & Connect"}
                        </Button>
                      </div>
                    </div>
                  )}

                  {connectionStep === 4 && (
                    <div className="text-center space-y-6 py-8">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-green-800">Connection Successful!</h3>
                        <p className="text-sm text-gray-600 mt-2">
                          {selectedSource.name} has been connected and will start syncing data according to your schedule.
                        </p>
                      </div>
                      <div className="text-xs text-gray-500">
                        This dialog will close automatically...
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Templates Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Download Data Templates</span>
          </CardTitle>
          <CardDescription>
            Pre-configured Excel templates for various ESG data categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Energy Consumption</h4>
              <p className="text-sm text-gray-600 mb-3">
                Template for facility energy usage data including electricity, gas, and renewables
              </p>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Water Usage</h4>
              <p className="text-sm text-gray-600 mb-3">
                Template for water withdrawal and consumption tracking by source
              </p>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Employee Data</h4>
              <p className="text-sm text-gray-600 mb-3">
                Template for workforce demographics and diversity metrics
              </p>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Coming Soon Notice */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <h3 className="text-lg font-medium mb-2">Enhanced Import Wizard Coming Soon</h3>
            <p className="text-gray-600 mb-4">
              The full data import wizard with AI-assisted mapping, validation, and annotation 
              will be available in the next phase of development.
            </p>
            <p className="text-sm text-gray-500">
              This is part of Phase 2, Task 2.3 implementation according to the development roadmap.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 