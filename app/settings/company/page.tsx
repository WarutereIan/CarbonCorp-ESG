"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CompanyProfile, Facility, OrganizationalUnit, BrandKit } from "../types/settings-types"
import {
  Building2,
  Upload,
  Plus,
  Edit,
  Trash2,
  MapPin,
  Palette,
  Save,
  Factory,
  Users,
  Globe,
  Phone,
  Mail,
  Calendar
} from "lucide-react"

export default function CompanySettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isFacilityDialogOpen, setIsFacilityDialogOpen] = useState(false)
  const [isOrgUnitDialogOpen, setIsOrgUnitDialogOpen] = useState(false)
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null)
  const [selectedOrgUnit, setSelectedOrgUnit] = useState<OrganizationalUnit | null>(null)
  const [isNewFacility, setIsNewFacility] = useState(false)
  const [isNewOrgUnit, setIsNewOrgUnit] = useState(false)

  // Mock company profile data
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile>({
    id: "1",
    legalName: "CarbonCorp Solutions Ltd.",
    tradingName: "CarbonCorp",
    registrationNumber: "RC123456789",
    taxId: "TAX987654321",
    website: "https://carboncorp.com",
    foundedYear: 2015,
    industry: "Environmental Services",
    subIndustry: "ESG Technology Solutions",
    employeeCount: "201-500",
    annualRevenue: "$10M-$50M",
    headquarters: {
      street: "123 Sustainability Avenue",
      city: "Lagos",
      state: "Lagos State",
      country: "Nigeria",
      postalCode: "100001",
      coordinates: {
        latitude: 6.5244,
        longitude: 3.3792
      }
    },
    logo: "/logo-placeholder.png",
    description: "Leading provider of ESG technology solutions helping organizations achieve their sustainability goals through data-driven insights and AI-powered analytics.",
    organizationalStructure: [
      {
        id: "1",
        name: "Operations",
        description: "Core business operations and delivery",
        type: "division",
        head: "Sarah Wilson",
        facilities: ["1", "2"]
      },
      {
        id: "2",
        name: "Sustainability",
        description: "ESG strategy and sustainability initiatives",
        type: "department",
        parentId: "1",
        head: "John Doe"
      },
      {
        id: "3",
        name: "Technology",
        description: "Product development and engineering",
        type: "division",
        head: "Mike Chen",
        facilities: ["3"]
      }
    ],
    facilities: [
      {
        id: "1",
        name: "Lagos Headquarters",
        type: "headquarters",
        address: {
          street: "123 Sustainability Avenue",
          city: "Lagos",
          state: "Lagos State",
          country: "Nigeria",
          postalCode: "100001"
        },
        status: "active",
        size: 5000,
        sizeUnit: "sqm",
        employees: 150,
        primaryActivities: ["Administration", "Customer Support", "Sales"],
        businessUnitId: "1"
      },
      {
        id: "2",
        name: "Abuja Office",
        type: "office",
        address: {
          street: "456 Federal Capital Territory",
          city: "Abuja",
          state: "FCT",
          country: "Nigeria",
          postalCode: "900001"
        },
        status: "active",
        size: 2000,
        sizeUnit: "sqm",
        employees: 50,
        primaryActivities: ["Government Relations", "Policy Research"],
        businessUnitId: "1"
      },
      {
        id: "3",
        name: "Data Center",
        type: "datacenter",
        address: {
          street: "789 Tech Hub Drive",
          city: "Port Harcourt",
          state: "Rivers State",
          country: "Nigeria",
          postalCode: "500001"
        },
        status: "active",
        size: 1500,
        sizeUnit: "sqm",
        employees: 25,
        primaryActivities: ["Data Processing", "Cloud Services"],
        businessUnitId: "3"
      }
    ],
    brandKit: {
      primaryColor: "#16a34a",
      secondaryColor: "#059669",
      accentColor: "#0891b2",
      logoUrl: "/logo-placeholder.png",
      fontFamily: "Inter",
      brandGuidelines: "Use green tones to represent sustainability and growth. Maintain clean, modern typography."
    }
  })

  const industryOptions = [
    "Agriculture", "Automotive", "Banking & Finance", "Construction", 
    "Education", "Energy", "Environmental Services", "Healthcare", 
    "Manufacturing", "Mining", "Real Estate", "Retail", "Technology", 
    "Transportation", "Utilities"
  ]

  const employeeCountOptions = [
    "1-10", "11-50", "51-200", "201-500", "501-1000", "1001-5000", "5000+"
  ]

  const revenueOptions = [
    "Under $1M", "$1M-$5M", "$5M-$10M", "$10M-$50M", "$50M-$100M", 
    "$100M-$500M", "$500M-$1B", "Over $1B"
  ]

  const facilityTypes = [
    "headquarters", "manufacturing", "office", "warehouse", "retail", 
    "datacenter", "lab", "other"
  ]

  const facilityStatuses = [
    "active", "planned", "construction", "closed", "decommissioned"
  ]

  const orgUnitTypes = [
    "division", "department", "team", "subsidiary"
  ]

  const handleSaveProfile = () => {
    console.log("Saving company profile:", companyProfile)
    // API call to save company profile
  }

  const handleAddFacility = () => {
    setSelectedFacility({
      id: "",
      name: "",
      type: "office",
      address: {
        street: "",
        city: "",
        state: "",
        country: "Nigeria",
        postalCode: ""
      },
      status: "active",
      primaryActivities: []
    })
    setIsNewFacility(true)
    setIsFacilityDialogOpen(true)
  }

  const handleEditFacility = (facility: Facility) => {
    setSelectedFacility(facility)
    setIsNewFacility(false)
    setIsFacilityDialogOpen(true)
  }

  const handleSaveFacility = () => {
    if (selectedFacility) {
      if (isNewFacility) {
        const newFacility = { ...selectedFacility, id: Date.now().toString() }
        setCompanyProfile({
          ...companyProfile,
          facilities: [...companyProfile.facilities, newFacility]
        })
      } else {
        setCompanyProfile({
          ...companyProfile,
          facilities: companyProfile.facilities.map(f => 
            f.id === selectedFacility.id ? selectedFacility : f
          )
        })
      }
    }
    setIsFacilityDialogOpen(false)
    setSelectedFacility(null)
  }

  const handleDeleteFacility = (facilityId: string) => {
    setCompanyProfile({
      ...companyProfile,
      facilities: companyProfile.facilities.filter(f => f.id !== facilityId)
    })
  }

  const handleAddOrgUnit = () => {
    setSelectedOrgUnit({
      id: "",
      name: "",
      description: "",
      type: "department"
    })
    setIsNewOrgUnit(true)
    setIsOrgUnitDialogOpen(true)
  }

  const handleEditOrgUnit = (unit: OrganizationalUnit) => {
    setSelectedOrgUnit(unit)
    setIsNewOrgUnit(false)
    setIsOrgUnitDialogOpen(true)
  }

  const handleSaveOrgUnit = () => {
    if (selectedOrgUnit) {
      if (isNewOrgUnit) {
        const newUnit = { ...selectedOrgUnit, id: Date.now().toString() }
        setCompanyProfile({
          ...companyProfile,
          organizationalStructure: [...companyProfile.organizationalStructure, newUnit]
        })
      } else {
        setCompanyProfile({
          ...companyProfile,
          organizationalStructure: companyProfile.organizationalStructure.map(u => 
            u.id === selectedOrgUnit.id ? selectedOrgUnit : u
          )
        })
      }
    }
    setIsOrgUnitDialogOpen(false)
    setSelectedOrgUnit(null)
  }

  const handleDeleteOrgUnit = (unitId: string) => {
    setCompanyProfile({
      ...companyProfile,
      organizationalStructure: companyProfile.organizationalStructure.filter(u => u.id !== unitId)
    })
  }

  const getFacilityStatusColor = (status: string) => {
    switch (status) {
      case "active": return "default"
      case "planned": return "secondary"
      case "construction": return "outline"
      case "closed": return "destructive"
      case "decommissioned": return "destructive"
      default: return "outline"
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Company Settings</h1>
          <p className="text-muted-foreground">
            Manage your organization profile, branding, and structure
          </p>
        </div>
        <Button onClick={handleSaveProfile}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Company Profile</TabsTrigger>
          <TabsTrigger value="locations">Locations & Facilities</TabsTrigger>
          <TabsTrigger value="structure">Organization Structure</TabsTrigger>
          <TabsTrigger value="branding">Branding & Design</TabsTrigger>
        </TabsList>

        {/* Company Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="legalName">Legal Name</Label>
                  <Input
                    id="legalName"
                    value={companyProfile.legalName}
                    onChange={(e) => setCompanyProfile({
                      ...companyProfile,
                      legalName: e.target.value
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="tradingName">Trading Name</Label>
                  <Input
                    id="tradingName"
                    value={companyProfile.tradingName || ""}
                    onChange={(e) => setCompanyProfile({
                      ...companyProfile,
                      tradingName: e.target.value
                    })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="registrationNumber">Registration Number</Label>
                  <Input
                    id="registrationNumber"
                    value={companyProfile.registrationNumber || ""}
                    onChange={(e) => setCompanyProfile({
                      ...companyProfile,
                      registrationNumber: e.target.value
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="taxId">Tax ID</Label>
                  <Input
                    id="taxId"
                    value={companyProfile.taxId || ""}
                    onChange={(e) => setCompanyProfile({
                      ...companyProfile,
                      taxId: e.target.value
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="foundedYear">Founded Year</Label>
                  <Input
                    id="foundedYear"
                    type="number"
                    value={companyProfile.foundedYear || ""}
                    onChange={(e) => setCompanyProfile({
                      ...companyProfile,
                      foundedYear: parseInt(e.target.value)
                    })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={companyProfile.website || ""}
                  onChange={(e) => setCompanyProfile({
                    ...companyProfile,
                    website: e.target.value
                  })}
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={companyProfile.description || ""}
                  onChange={(e) => setCompanyProfile({
                    ...companyProfile,
                    description: e.target.value
                  })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Select 
                    value={companyProfile.industry} 
                    onValueChange={(value) => setCompanyProfile({
                      ...companyProfile,
                      industry: value
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {industryOptions.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="employeeCount">Employee Count</Label>
                  <Select 
                    value={companyProfile.employeeCount} 
                    onValueChange={(value) => setCompanyProfile({
                      ...companyProfile,
                      employeeCount: value
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {employeeCountOptions.map((count) => (
                        <SelectItem key={count} value={count}>
                          {count}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="annualRevenue">Annual Revenue</Label>
                  <Select 
                    value={companyProfile.annualRevenue || ""} 
                    onValueChange={(value) => setCompanyProfile({
                      ...companyProfile,
                      annualRevenue: value
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {revenueOptions.map((revenue) => (
                        <SelectItem key={revenue} value={revenue}>
                          {revenue}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Headquarters Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="street">Street Address</Label>
                <Input
                  id="street"
                  value={companyProfile.headquarters.street}
                  onChange={(e) => setCompanyProfile({
                    ...companyProfile,
                    headquarters: {
                      ...companyProfile.headquarters,
                      street: e.target.value
                    }
                  })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={companyProfile.headquarters.city}
                    onChange={(e) => setCompanyProfile({
                      ...companyProfile,
                      headquarters: {
                        ...companyProfile.headquarters,
                        city: e.target.value
                      }
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="state">State/Province</Label>
                  <Input
                    id="state"
                    value={companyProfile.headquarters.state || ""}
                    onChange={(e) => setCompanyProfile({
                      ...companyProfile,
                      headquarters: {
                        ...companyProfile.headquarters,
                        state: e.target.value
                      }
                    })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={companyProfile.headquarters.country}
                    onChange={(e) => setCompanyProfile({
                      ...companyProfile,
                      headquarters: {
                        ...companyProfile.headquarters,
                        country: e.target.value
                      }
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    value={companyProfile.headquarters.postalCode}
                    onChange={(e) => setCompanyProfile({
                      ...companyProfile,
                      headquarters: {
                        ...companyProfile.headquarters,
                        postalCode: e.target.value
                      }
                    })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Locations & Facilities Tab */}
        <TabsContent value="locations" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Facilities ({companyProfile.facilities.length})</CardTitle>
                <Button onClick={handleAddFacility}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Facility
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Employees</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {companyProfile.facilities.map((facility) => (
                    <TableRow key={facility.id}>
                      <TableCell className="font-medium">{facility.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {facility.type.replace('-', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          {facility.address.city}, {facility.address.country}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getFacilityStatusColor(facility.status) as any} className="capitalize">
                          {facility.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {facility.size ? `${facility.size} ${facility.sizeUnit}` : "—"}
                      </TableCell>
                      <TableCell>{facility.employees || "—"}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center gap-2 justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditFacility(facility)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteFacility(facility.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Organization Structure Tab */}
        <TabsContent value="structure" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Organizational Units ({companyProfile.organizationalStructure.length})</CardTitle>
                <Button onClick={handleAddOrgUnit}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Unit
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Head</TableHead>
                    <TableHead>Parent Unit</TableHead>
                    <TableHead>Facilities</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {companyProfile.organizationalStructure.map((unit) => (
                    <TableRow key={unit.id}>
                      <TableCell className="font-medium">{unit.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {unit.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{unit.head || "—"}</TableCell>
                      <TableCell>
                        {unit.parentId 
                          ? companyProfile.organizationalStructure.find(u => u.id === unit.parentId)?.name || "—"
                          : "—"
                        }
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {unit.facilities?.length || 0} facilities
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center gap-2 justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditOrgUnit(unit)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteOrgUnit(unit.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Branding & Design Tab */}
        <TabsContent value="branding" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Brand Kit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="logo">Company Logo</Label>
                <div className="flex items-center gap-4 mt-2">
                  <div className="w-16 h-16 border rounded-lg flex items-center justify-center bg-muted">
                    {companyProfile.logo ? (
                      <img 
                        src={companyProfile.logo} 
                        alt="Company Logo" 
                        className="w-full h-full object-contain rounded-lg"
                      />
                    ) : (
                      <Building2 className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Logo
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <div 
                      className="w-8 h-8 rounded border"
                      style={{ backgroundColor: companyProfile.brandKit.primaryColor }}
                    />
                    <Input
                      id="primaryColor"
                      value={companyProfile.brandKit.primaryColor}
                      onChange={(e) => setCompanyProfile({
                        ...companyProfile,
                        brandKit: {
                          ...companyProfile.brandKit,
                          primaryColor: e.target.value
                        }
                      })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <div 
                      className="w-8 h-8 rounded border"
                      style={{ backgroundColor: companyProfile.brandKit.secondaryColor }}
                    />
                    <Input
                      id="secondaryColor"
                      value={companyProfile.brandKit.secondaryColor}
                      onChange={(e) => setCompanyProfile({
                        ...companyProfile,
                        brandKit: {
                          ...companyProfile.brandKit,
                          secondaryColor: e.target.value
                        }
                      })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="accentColor">Accent Color</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <div 
                      className="w-8 h-8 rounded border"
                      style={{ backgroundColor: companyProfile.brandKit.accentColor }}
                    />
                    <Input
                      id="accentColor"
                      value={companyProfile.brandKit.accentColor}
                      onChange={(e) => setCompanyProfile({
                        ...companyProfile,
                        brandKit: {
                          ...companyProfile.brandKit,
                          accentColor: e.target.value
                        }
                      })}
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="fontFamily">Font Family</Label>
                <Select 
                  value={companyProfile.brandKit.fontFamily} 
                  onValueChange={(value) => setCompanyProfile({
                    ...companyProfile,
                    brandKit: {
                      ...companyProfile.brandKit,
                      fontFamily: value
                    }
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Inter">Inter</SelectItem>
                    <SelectItem value="Arial">Arial</SelectItem>
                    <SelectItem value="Helvetica">Helvetica</SelectItem>
                    <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                    <SelectItem value="Georgia">Georgia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="brandGuidelines">Brand Guidelines</Label>
                <Textarea
                  id="brandGuidelines"
                  value={companyProfile.brandKit.brandGuidelines || ""}
                  onChange={(e) => setCompanyProfile({
                    ...companyProfile,
                    brandKit: {
                      ...companyProfile.brandKit,
                      brandGuidelines: e.target.value
                    }
                  })}
                  rows={4}
                  placeholder="Describe your brand guidelines, tone, and usage recommendations..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Facility Dialog */}
      <Dialog open={isFacilityDialogOpen} onOpenChange={setIsFacilityDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isNewFacility ? "Add New Facility" : "Edit Facility"}
            </DialogTitle>
            <DialogDescription>
              {isNewFacility 
                ? "Add a new facility to your organization."
                : "Update facility information and details."
              }
            </DialogDescription>
          </DialogHeader>
          
          {selectedFacility && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="facilityName">Facility Name</Label>
                  <Input
                    id="facilityName"
                    value={selectedFacility.name}
                    onChange={(e) => setSelectedFacility({
                      ...selectedFacility,
                      name: e.target.value
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="facilityType">Type</Label>
                  <Select 
                    value={selectedFacility.type} 
                    onValueChange={(value) => setSelectedFacility({
                      ...selectedFacility,
                      type: value as any
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {facilityTypes.map((type) => (
                        <SelectItem key={type} value={type} className="capitalize">
                          {type.replace('-', ' ')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="facilityAddress">Street Address</Label>
                <Input
                  id="facilityAddress"
                  value={selectedFacility.address.street}
                  onChange={(e) => setSelectedFacility({
                    ...selectedFacility,
                    address: {
                      ...selectedFacility.address,
                      street: e.target.value
                    }
                  })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="facilityCity">City</Label>
                  <Input
                    id="facilityCity"
                    value={selectedFacility.address.city}
                    onChange={(e) => setSelectedFacility({
                      ...selectedFacility,
                      address: {
                        ...selectedFacility.address,
                        city: e.target.value
                      }
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="facilityState">State/Province</Label>
                  <Input
                    id="facilityState"
                    value={selectedFacility.address.state || ""}
                    onChange={(e) => setSelectedFacility({
                      ...selectedFacility,
                      address: {
                        ...selectedFacility.address,
                        state: e.target.value
                      }
                    })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="facilityCountry">Country</Label>
                  <Input
                    id="facilityCountry"
                    value={selectedFacility.address.country}
                    onChange={(e) => setSelectedFacility({
                      ...selectedFacility,
                      address: {
                        ...selectedFacility.address,
                        country: e.target.value
                      }
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="facilityPostalCode">Postal Code</Label>
                  <Input
                    id="facilityPostalCode"
                    value={selectedFacility.address.postalCode}
                    onChange={(e) => setSelectedFacility({
                      ...selectedFacility,
                      address: {
                        ...selectedFacility.address,
                        postalCode: e.target.value
                      }
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="facilityStatus">Status</Label>
                  <Select 
                    value={selectedFacility.status} 
                    onValueChange={(value) => setSelectedFacility({
                      ...selectedFacility,
                      status: value as any
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {facilityStatuses.map((status) => (
                        <SelectItem key={status} value={status} className="capitalize">
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="facilitySize">Size</Label>
                  <Input
                    id="facilitySize"
                    type="number"
                    value={selectedFacility.size || ""}
                    onChange={(e) => setSelectedFacility({
                      ...selectedFacility,
                      size: parseInt(e.target.value)
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="facilitySizeUnit">Size Unit</Label>
                  <Select 
                    value={selectedFacility.sizeUnit || "sqm"} 
                    onValueChange={(value) => setSelectedFacility({
                      ...selectedFacility,
                      sizeUnit: value as any
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sqm">sqm</SelectItem>
                      <SelectItem value="sqft">sqft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="facilityEmployees">Employees</Label>
                  <Input
                    id="facilityEmployees"
                    type="number"
                    value={selectedFacility.employees || ""}
                    onChange={(e) => setSelectedFacility({
                      ...selectedFacility,
                      employees: parseInt(e.target.value)
                    })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="primaryActivities">Primary Activities (comma-separated)</Label>
                <Input
                  id="primaryActivities"
                  value={selectedFacility.primaryActivities.join(", ")}
                  onChange={(e) => setSelectedFacility({
                    ...selectedFacility,
                    primaryActivities: e.target.value.split(",").map(s => s.trim()).filter(Boolean)
                  })}
                  placeholder="e.g., Administration, Manufacturing, Research"
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFacilityDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveFacility}>
              {isNewFacility ? "Add Facility" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Organizational Unit Dialog */}
      <Dialog open={isOrgUnitDialogOpen} onOpenChange={setIsOrgUnitDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {isNewOrgUnit ? "Add Organizational Unit" : "Edit Organizational Unit"}
            </DialogTitle>
            <DialogDescription>
              {isNewOrgUnit 
                ? "Add a new organizational unit to your company structure."
                : "Update organizational unit information."
              }
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrgUnit && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="unitName">Unit Name</Label>
                <Input
                  id="unitName"
                  value={selectedOrgUnit.name}
                  onChange={(e) => setSelectedOrgUnit({
                    ...selectedOrgUnit,
                    name: e.target.value
                  })}
                />
              </div>

              <div>
                <Label htmlFor="unitType">Type</Label>
                <Select 
                  value={selectedOrgUnit.type} 
                  onValueChange={(value) => setSelectedOrgUnit({
                    ...selectedOrgUnit,
                    type: value as any
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {orgUnitTypes.map((type) => (
                      <SelectItem key={type} value={type} className="capitalize">
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="unitDescription">Description</Label>
                <Textarea
                  id="unitDescription"
                  value={selectedOrgUnit.description || ""}
                  onChange={(e) => setSelectedOrgUnit({
                    ...selectedOrgUnit,
                    description: e.target.value
                  })}
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="unitHead">Unit Head</Label>
                <Input
                  id="unitHead"
                  value={selectedOrgUnit.head || ""}
                  onChange={(e) => setSelectedOrgUnit({
                    ...selectedOrgUnit,
                    head: e.target.value
                  })}
                />
              </div>

              <div>
                <Label htmlFor="parentUnit">Parent Unit</Label>
                <Select 
                  value={selectedOrgUnit.parentId || ""} 
                  onValueChange={(value) => setSelectedOrgUnit({
                    ...selectedOrgUnit,
                    parentId: value || undefined
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select parent unit (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">No parent unit</SelectItem>
                    {companyProfile.organizationalStructure
                      .filter(u => u.id !== selectedOrgUnit.id)
                      .map((unit) => (
                        <SelectItem key={unit.id} value={unit.id}>
                          {unit.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOrgUnitDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveOrgUnit}>
              {isNewOrgUnit ? "Add Unit" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 