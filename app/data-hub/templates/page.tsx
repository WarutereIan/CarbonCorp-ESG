"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, FileText, Zap, Droplets, Recycle, Shield, BarChart3, Calendar } from "lucide-react"

const templates = [
  {
    id: "energy-consumption",
    name: "Energy Consumption",
    description: "Track electricity, gas, and renewable energy usage across facilities",
    category: "Environmental",
    icon: Zap,
    framework: ["GRI", "SASB", "TCFD"],
    fields: ["Facility ID", "Energy Type", "Consumption (kWh)", "Cost", "Renewable %"],
    lastUpdated: "2024-01-10",
    downloads: 145
  },
  {
    id: "water-usage",
    name: "Water Usage & Quality",
    description: "Monitor water withdrawal, consumption, and quality metrics",
    category: "Environmental", 
    icon: Droplets,
    framework: ["GRI", "CDP"],
    fields: ["Source Type", "Volume (m³)", "Quality Metrics", "Recycled Water %"],
    lastUpdated: "2024-01-08",
    downloads: 98
  },
  {
    id: "waste-management",
    name: "Waste Management",
    description: "Track waste generation, recycling, and disposal methods",
    category: "Environmental",
    icon: Recycle,
    framework: ["GRI", "SASB"],
    fields: ["Waste Type", "Amount (kg)", "Disposal Method", "Recycling Rate"],
    lastUpdated: "2024-01-12",
    downloads: 87
  },
  {
    id: "employee-demographics",
    name: "Employee Demographics",
    description: "Workforce diversity, inclusion, and demographic data",
    category: "Social",
    icon: Shield,
    framework: ["GRI", "SASB"],
    fields: ["Employee ID", "Department", "Gender", "Age Group", "Ethnicity"],
    lastUpdated: "2024-01-05",
    downloads: 234
  },
  {
    id: "training-development",
    name: "Training & Development",
    description: "Employee training hours, certifications, and skill development",
    category: "Social",
    icon: Shield,
    framework: ["GRI"],
    fields: ["Employee ID", "Training Type", "Hours", "Certification", "Completion Date"],
    lastUpdated: "2024-01-07",
    downloads: 156
  },
  {
    id: "board-composition",
    name: "Board Composition",
    description: "Board diversity, independence, and governance structure",
    category: "Governance",
    icon: Shield,
    framework: ["GRI", "SASB"],
    fields: ["Member Name", "Role", "Independence", "Gender", "Tenure"],
    lastUpdated: "2024-01-15",
    downloads: 67
  },
  {
    id: "financial-performance",
    name: "Financial Performance",
    description: "Revenue, costs, and financial sustainability metrics",
    category: "Financial",
    icon: BarChart3,
    framework: ["GRI", "SASB"],
    fields: ["Period", "Revenue", "Operating Costs", "ESG Investments", "Tax Paid"],
    lastUpdated: "2024-01-14",
    downloads: 189
  }
]

export default function ESGTemplatesPage() {
  const router = useRouter()

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Environmental": return "bg-green-100 text-green-700 border-green-200"
      case "Social": return "bg-purple-100 text-purple-700 border-purple-200"
      case "Governance": return "bg-indigo-100 text-indigo-700 border-indigo-200"
      case "Financial": return "bg-emerald-100 text-emerald-700 border-emerald-200"
      default: return "bg-gray-100 text-gray-700 border-gray-200"
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
            <h1 className="text-2xl font-bold tracking-tight">ESG Data Templates</h1>
            <p className="text-muted-foreground">
              Standardized Excel templates for consistent ESG data collection and reporting
            </p>
          </div>
        </div>
      </div>

      {/* Template Categories */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {["Environmental", "Social", "Governance", "Financial"].map((category) => {
          const count = templates.filter(t => t.category === category).length
          return (
            <Card key={category} className="text-center">
              <CardContent className="pt-6">
                <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(category)}`}>
                  <span>{category}</span>
                </div>
                <div className="text-2xl font-bold mt-2">{count}</div>
                <p className="text-sm text-gray-600">Templates</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => {
          const IconComponent = template.icon
          return (
            <Card key={template.id} className="hover:border-blue-300 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-base">{template.name}</span>
                  </div>
                  <Badge className={getCategoryColor(template.category)}>
                    {template.category}
                  </Badge>
                </CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-medium mb-2">Compliance Frameworks</h5>
                    <div className="flex flex-wrap gap-1">
                      {template.framework.map((fw) => (
                        <Badge key={fw} variant="outline" className="text-xs">
                          {fw}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium mb-2">Key Data Fields</h5>
                    <div className="text-sm text-gray-600">
                      {template.fields.slice(0, 3).join(", ")}
                      {template.fields.length > 3 && ` +${template.fields.length - 3} more`}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>Updated {new Date(template.lastUpdated).toLocaleDateString()}</span>
                    </div>
                    <span>{template.downloads} downloads</span>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" className="flex-1">
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline">
                      <FileText className="h-3 w-3 mr-1" />
                      Preview
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Usage Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Template Usage Guidelines</CardTitle>
          <CardDescription>
            Best practices for using ESG data templates effectively
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Data Collection Best Practices</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Follow the exact column headers provided in templates</li>
                <li>• Use consistent units of measurement as specified</li>
                <li>• Include all required fields marked with asterisks (*)</li>
                <li>• Validate data before importing to avoid quality issues</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Compliance & Standards</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Templates align with major ESG frameworks (GRI, SASB, etc.)</li>
                <li>• Data fields support common regulatory requirements</li>
                <li>• Regular updates ensure current compliance standards</li>
                <li>• Built-in validation rules prevent common errors</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 