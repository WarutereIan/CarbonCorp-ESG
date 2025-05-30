"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useOnboarding } from "@/contexts/OnboardingContext"
import { 
  ArrowLeft,
  ArrowRight,
  Database,
  Download,
  Upload,
  FileText,
  Zap,
  CheckCircle,
  Clock,
  AlertCircle,
  Link,
  Users,
  Shield,
  Eye,
  Calendar,
  HelpCircle,
  Settings
} from "lucide-react"

interface DataConnector {
  id: string
  name: string
  category: string
  description: string
  logo?: string
  isConnected: boolean
  status: 'not-connected' | 'pending' | 'connected' | 'error'
  dataTypes: string[]
}

const DATA_CONNECTORS: DataConnector[] = [
  // Financial/ERP Systems
  {
    id: 'quickbooks',
    name: 'QuickBooks',
    category: 'Financial/ERP',
    description: 'Financial data for Scope 1, 2, some Scope 3 calculations',
    isConnected: false,
    status: 'not-connected',
    dataTypes: ['Financial Data', 'Energy Costs', 'Travel Expenses']
  },
  {
    id: 'sage',
    name: 'Sage',
    category: 'Financial/ERP',
    description: 'Complete financial and operational data integration',
    isConnected: false,
    status: 'not-connected',
    dataTypes: ['Financial Data', 'Procurement', 'Operational Costs']
  },
  {
    id: 'sap',
    name: 'SAP',
    category: 'Financial/ERP',
    description: 'Enterprise resource planning and financial data',
    isConnected: false,
    status: 'not-connected',
    dataTypes: ['Financial Data', 'Procurement', 'Manufacturing Data']
  },
  {
    id: 'netsuite',
    name: 'Oracle NetSuite',
    category: 'Financial/ERP',
    description: 'Cloud-based ERP and financial management',
    isConnected: false,
    status: 'not-connected',
    dataTypes: ['Financial Data', 'CRM Data', 'E-commerce Data']
  },
  {
    id: 'xero',
    name: 'Xero',
    category: 'Financial/ERP',
    description: 'Small business accounting and financial data',
    isConnected: false,
    status: 'not-connected',
    dataTypes: ['Financial Data', 'Banking', 'Invoicing']
  },

  // HRIS/Payroll Systems
  {
    id: 'workday',
    name: 'Workday',
    category: 'HRIS/Payroll',
    description: 'Human resources and workforce analytics',
    isConnected: false,
    status: 'not-connected',
    dataTypes: ['Employee Data', 'Diversity Metrics', 'Training Records']
  },
  {
    id: 'successfactors',
    name: 'SAP SuccessFactors',
    category: 'HRIS/Payroll',
    description: 'Human capital management and employee data',
    isConnected: false,
    status: 'not-connected',
    dataTypes: ['Employee Data', 'Performance', 'Learning & Development']
  },
  {
    id: 'bamboohr',
    name: 'BambooHR',
    category: 'HRIS/Payroll',
    description: 'HR management and employee information system',
    isConnected: false,
    status: 'not-connected',
    dataTypes: ['Employee Data', 'Benefits', 'Time Tracking']
  },

  // Utility/Energy Management
  {
    id: 'utility-api',
    name: 'Utility Providers',
    category: 'Utility/Energy',
    description: 'Direct connection to utility provider APIs',
    isConnected: false,
    status: 'not-connected',
    dataTypes: ['Energy Consumption', 'Water Usage', 'Waste Management']
  },

  // IoT Platforms & BMS
  {
    id: 'mindsphere',
    name: 'Siemens MindSphere',
    category: 'IoT/BMS',
    description: 'Industrial IoT platform for operational data',
    isConnected: false,
    status: 'not-connected',
    dataTypes: ['Energy Data', 'Equipment Performance', 'Environmental Monitoring']
  },
  {
    id: 'ecostruxure',
    name: 'Schneider EcoStruxure',
    category: 'IoT/BMS',
    description: 'Building and energy management system',
    isConnected: false,
    status: 'not-connected',
    dataTypes: ['Energy Management', 'Building Performance', 'Sustainability Metrics']
  }
]

const UPLOAD_TEMPLATES = [
  {
    id: 'energy',
    name: 'Energy Consumption',
    description: 'Monthly energy usage data by facility and source',
    category: 'Environmental'
  },
  {
    id: 'water',
    name: 'Water Usage',
    description: 'Water withdrawal and consumption by source',
    category: 'Environmental'
  },
  {
    id: 'waste',
    name: 'Waste Generation',
    description: 'Waste data by type and disposal method',
    category: 'Environmental'
  },
  {
    id: 'emissions',
    name: 'Emissions Factors',
    description: 'Custom emission factors for calculations',
    category: 'Environmental'
  },
  {
    id: 'hr',
    name: 'HR Data',
    description: 'Employee demographics and diversity metrics',
    category: 'Social'
  },
  {
    id: 'safety',
    name: 'Health & Safety',
    description: 'Incident reports and safety metrics',
    category: 'Social'
  },
  {
    id: 'suppliers',
    name: 'Supplier Data',
    description: 'Supplier ESG assessments and ratings',
    category: 'Social'
  }
]

export default function DataIntegrationPage() {
  const router = useRouter()
  const { state, dispatch, goToStep, completeStep } = useOnboarding()
  
  const [connectors, setConnectors] = useState<DataConnector[]>(DATA_CONNECTORS)
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([])
  const [ocrEnabled, setOcrEnabled] = useState(false)
  const [showConnectionModal, setShowConnectionModal] = useState<string | null>(null)

  const handleConnectorToggle = (connectorId: string) => {
    setConnectors(prev => prev.map(connector => 
      connector.id === connectorId 
        ? { ...connector, isConnected: !connector.isConnected, status: connector.isConnected ? 'not-connected' : 'pending' }
        : connector
    ))
    
    // Update context
    if (connectors.find(c => c.id === connectorId)?.isConnected) {
      // Removing connection
      const updatedSources = state.connectedSources.filter(source => source !== connectorId)
      dispatch({ type: 'ADD_CONNECTED_SOURCE', payload: updatedSources.join(',') })
    } else {
      // Adding connection
      dispatch({ type: 'ADD_CONNECTED_SOURCE', payload: connectorId })
    }
  }

  const handleTemplateToggle = (templateId: string) => {
    setSelectedTemplates(prev => 
      prev.includes(templateId) 
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    )
  }

  const handleNext = () => {
    // Update context with data preferences
    dispatch({ 
      type: 'UPDATE_DATA_PREFERENCES', 
      payload: { 
        ocrEnabled, 
        templatesConfigured: selectedTemplates 
      } 
    })
    
    completeStep(3)
    router.push("/onboarding/ai-analytics-config")
  }

  const handleBack = () => {
    router.push("/onboarding/esg-scope")
  }

  const connectedCount = connectors.filter(c => c.isConnected).length
  const totalConnectors = connectors.length

  const getConnectorsByCategory = (category: string) => {
    return connectors.filter(connector => connector.category === category)
  }

  const categories = [
    { key: 'Financial/ERP', label: 'Financial/ERP Systems', icon: Database },
    { key: 'HRIS/Payroll', label: 'HRIS/Payroll Systems', icon: Users },
    { key: 'Utility/Energy', label: 'Utility/Energy Management', icon: Zap },
    { key: 'IoT/BMS', label: 'IoT Platforms & BMS', icon: Settings }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span>Step 3 of 6</span>
            <span>•</span>
            <span>Data Integration & Source Configuration</span>
          </div>
          <Progress value={50} className="mb-4" />
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Connect Your Data Sources
          </h1>
          <p className="text-lg text-gray-600">
            Integrate automated data sources and configure manual upload templates for comprehensive ESG data collection.
          </p>
        </div>

        {/* Data Strategy Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Data Collection Strategy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-blue-600" />
                  Automated Data Collection
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  Connect directly to your existing systems for real-time, accurate data flow.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Reduces manual effort and errors</li>
                  <li>• Enables real-time monitoring</li>
                  <li>• Ensures data consistency</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Upload className="h-4 w-4 text-green-600" />
                  Manual Data Upload
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  Use structured templates for data not available through integrations.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Standardized templates</li>
                  <li>• Validation and quality checks</li>
                  <li>• OCR for scanned documents</li>
                </ul>
              </div>
            </div>
            
            <Alert>
              <HelpCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Data Quality Focus:</strong> All data sources emphasize completeness, accuracy, and auditability to ensure reliable ESG reporting.
                <Button variant="link" className="p-0 h-auto text-sm ml-2">
                  View Data Collection Best Practices Guide →
                </Button>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Tabs defaultValue="automated" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="automated">Automated Connectors</TabsTrigger>
            <TabsTrigger value="manual">Manual Upload</TabsTrigger>
          </TabsList>

          {/* Automated Data Sources */}
          <TabsContent value="automated" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Link className="h-5 w-5" />
                    Automated Data Source Connectors
                  </span>
                  <Badge variant="outline">
                    {connectedCount} of {totalConnectors} connected
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Connect to your existing systems for automated data collection. Each connector provides specific ESG-relevant data.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {categories.map(category => (
                  <div key={category.key}>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <category.icon className="h-4 w-4" />
                      {category.label}
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {getConnectorsByCategory(category.key).map(connector => (
                        <Card key={connector.id} className="relative">
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <CardTitle className="text-base">{connector.name}</CardTitle>
                                <CardDescription className="text-sm mt-1">
                                  {connector.description}
                                </CardDescription>
                              </div>
                              <div className="flex items-center gap-2 ml-4">
                                {connector.status === 'connected' && (
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                )}
                                {connector.status === 'pending' && (
                                  <Clock className="h-4 w-4 text-yellow-600" />
                                )}
                                {connector.status === 'error' && (
                                  <AlertCircle className="h-4 w-4 text-red-600" />
                                )}
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="mb-3">
                              <div className="text-sm font-medium mb-1">Data Types:</div>
                              <div className="flex flex-wrap gap-1">
                                {connector.dataTypes.map((type, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {type}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant={connector.isConnected ? "destructive" : "default"}
                                onClick={() => handleConnectorToggle(connector.id)}
                                className="flex-1"
                              >
                                {connector.isConnected ? 'Disconnect' : 'Connect'}
                              </Button>
                              {connector.isConnected && (
                                <Button size="sm" variant="outline">
                                  Test
                                </Button>
                              )}
                            </div>
                            {connector.isConnected && (
                              <div className="mt-3 p-2 bg-green-50 rounded text-sm">
                                <div className="font-medium text-green-800">Sync Settings:</div>
                                <div className="text-green-700">
                                  Historical: 12 months • Frequency: Daily
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Manual Upload Configuration */}
          <TabsContent value="manual" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Manual Data Upload Configuration
                </CardTitle>
                <CardDescription>
                  Configure templates and upload methods for data not available through automated connectors.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Upload Templates */}
                <div>
                  <h4 className="font-semibold mb-3">Excel/CSV Templates</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Download pre-formatted templates for easy data import. Templates include validation rules and guidance.
                  </p>
                  <div className="grid md:grid-cols-2 gap-3">
                    {UPLOAD_TEMPLATES.map(template => (
                      <Card key={template.id} className="relative">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h5 className="font-medium">{template.name}</h5>
                              <p className="text-sm text-gray-600">{template.description}</p>
                            </div>
                            <Checkbox 
                              checked={selectedTemplates.includes(template.id)}
                              onCheckedChange={() => handleTemplateToggle(template.id)}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              {template.category}
                            </Badge>
                            <Button size="sm" variant="ghost" className="h-6 text-xs">
                              <Download className="h-3 w-3 mr-1" />
                              Download
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* OCR Configuration */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">OCR for Scanned Documents</h4>
                      <p className="text-sm text-gray-600">
                        Automatically extract data from uploaded PDFs and images (e.g., utility bills)
                      </p>
                    </div>
                    <Switch checked={ocrEnabled} onCheckedChange={setOcrEnabled} />
                  </div>
                  {ocrEnabled && (
                    <Alert>
                      <Eye className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Supported formats:</strong> PDF, JPEG, PNG. For best results, ensure documents are clear and text is readable.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                {/* Secure Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <h4 className="font-medium mb-1">Secure File Upload Area</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Drag and drop files here or click to browse
                  </p>
                  <Button variant="outline" size="sm">
                    Select Files
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">
                    Supports: Excel (.xlsx), CSV, PDF. Max size: 25MB per file.
                  </p>
                </div>

                {/* SFTP Configuration */}
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Recurring Data Drops</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Set up secure SFTP locations for regular bulk data uploads
                  </p>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Configure SFTP
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Data Mapping Guidance */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Data Mapping Guidance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="mb-4">
              <HelpCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Next Step:</strong> After connecting sources, you'll map data fields to ESG metrics in the Data Hub. 
                We offer AI-assisted mapping suggestions to streamline this process.
              </AlertDescription>
            </Alert>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" className="flex-1">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Data Mapping Workshop
              </Button>
              <Button variant="ghost" className="flex-1">
                <FileText className="h-4 w-4 mr-2" />
                View Mapping Guide
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to ESG Scope
          </Button>
          <Button onClick={handleNext}>
            Next: AI & Analytics
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
} 