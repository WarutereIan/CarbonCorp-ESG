"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuth } from "@/contexts/AuthContext"
import { useOnboarding, CompanyData, BusinessUnit, Facility } from "@/contexts/OnboardingContext"
import { 
  Building, 
  Upload, 
  MapPin, 
  Plus, 
  Edit2, 
  Trash2, 
  Users, 
  ArrowLeft,
  ArrowRight,
  Globe,
  Factory,
  DollarSign
} from "lucide-react"

// Enhanced industry categories with sub-industries
const industryCategories = {
  "Manufacturing": [
    "Automotive", "Aerospace", "Chemicals", "Electronics", "Food & Beverage", 
    "Pharmaceuticals", "Textiles", "Steel & Metals", "Machinery", "Consumer Goods"
  ],
  "Energy & Utilities": [
    "Oil & Gas", "Renewable Energy", "Electric Utilities", "Water Utilities", 
    "Nuclear", "Coal", "Natural Gas", "Solar", "Wind", "Hydroelectric"
  ],
  "Agriculture & Food": [
    "Crop Production", "Livestock", "Forestry", "Fishing", "Food Processing", 
    "Beverages", "Organic Farming", "Agricultural Technology"
  ],
  "Financial Services": [
    "Banking", "Insurance", "Investment Management", "Real Estate", 
    "Fintech", "Credit Unions", "Pension Funds", "Private Equity"
  ],
  "Technology": [
    "Software", "Hardware", "Telecommunications", "Internet Services", 
    "Semiconductors", "AI/ML", "Cybersecurity", "Cloud Services"
  ],
  "Other": ["Healthcare", "Retail", "Transportation", "Construction", "Mining", "Education"]
}

const facilityTypes = [
  "Headquarters", "Manufacturing Plant", "Office Building", "Warehouse", 
  "Distribution Center", "Retail Outlet", "Data Center", "R&D Lab", 
  "Service Center", "Processing Facility", "Other"
]

const operationalStatuses = [
  "Active", "Planned", "Under Construction", 
  "Temporarily Closed", "Decommissioned"
]

const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦" },
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh" },
  { code: "ZAR", name: "South African Rand", symbol: "R" },
  { code: "GHS", name: "Ghanaian Cedi", symbol: "₵" },
  { code: "UGX", name: "Ugandan Shilling", symbol: "USh" },
  { code: "TZS", name: "Tanzanian Shilling", symbol: "TSh" }
]

const companySchema = z.object({
  legalName: z.string().min(2, "Legal name is required"),
  tradingName: z.string().optional(),
  registrationNumber: z.string().optional(),
  taxId: z.string().optional(),
  foundedYear: z.number().min(1800).max(new Date().getFullYear()).optional(),
  website: z.string().url().optional().or(z.literal("")),
  industry: z.string().min(1, "Industry is required"),
  subIndustry: z.string().optional(),
  employeeCount: z.number().min(1, "Employee count is required"),
  annualRevenue: z.number().optional(),
  currency: z.string().optional(),
  hqAddress: z.string().min(5, "Headquarters address is required"),
  hqCountry: z.string().min(1, "Country is required"),
  hqRegion: z.string().optional()
})

const businessUnitSchema = z.object({
  name: z.string().min(1, "Business unit name is required"),
  description: z.string().optional(),
  headOfUnit: z.string().optional(),
  parentUnit: z.string().optional()
})

const facilitySchema = z.object({
  name: z.string().min(1, "Facility name is required"),
  address: z.string().min(5, "Address is required"),
  country: z.string().min(1, "Country is required"),
  region: z.string().optional(),
  type: z.string().min(1, "Facility type is required"),
  status: z.string().min(1, "Operational status is required"),
  size: z.number().optional(),
  sizeUnit: z.enum(["sqm", "sqft"]).optional(),
  employeeCount: z.number().optional(),
  activities: z.string().optional(),
  businessUnit: z.string().optional()
})

type CompanyFormData = z.infer<typeof companySchema>
type BusinessUnitFormData = z.infer<typeof businessUnitSchema>
type FacilityFormData = z.infer<typeof facilitySchema>

export default function OrganizationPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndustry, setSelectedIndustry] = useState("")
  const [showBusinessUnitForm, setShowBusinessUnitForm] = useState(false)
  const [showFacilityForm, setShowFacilityForm] = useState(false)
  const [editingBusinessUnit, setEditingBusinessUnit] = useState<string | null>(null)
  const [editingFacility, setEditingFacility] = useState<string | null>(null)
  
  const router = useRouter()
  const { user } = useAuth()
  const { 
    state, 
    dispatch, 
    updateCompanyData, 
    getProgressPercentage, 
    completeStep, 
    goToStep 
  } = useOnboarding()

  // Stable default values
  const defaultCompanyValues = useMemo(() => ({
    legalName: state.companyData.legalName || user?.user_metadata?.company_name || "",
    tradingName: state.companyData.tradingName || "",
    registrationNumber: state.companyData.registrationNumber || "",
    taxId: state.companyData.taxId || "",
    foundedYear: state.companyData.foundedYear || undefined,
    website: state.companyData.website || "",
    industry: state.companyData.industry || user?.user_metadata?.industry || "",
    subIndustry: state.companyData.subIndustry || "",
    employeeCount: state.companyData.employeeCount || undefined,
    annualRevenue: state.companyData.annualRevenue || undefined,
    currency: state.companyData.currency || "USD",
    hqAddress: state.companyData.hqAddress || "",
    hqCountry: state.companyData.hqCountry || user?.user_metadata?.country || "",
    hqRegion: state.companyData.hqRegion || ""
  }), [
    state.companyData.legalName, 
    state.companyData.tradingName,
    state.companyData.registrationNumber,
    state.companyData.taxId,
    state.companyData.foundedYear,
    state.companyData.website,
    state.companyData.industry,
    state.companyData.subIndustry,
    state.companyData.employeeCount,
    state.companyData.annualRevenue,
    state.companyData.currency,
    state.companyData.hqAddress,
    state.companyData.hqCountry,
    state.companyData.hqRegion,
    user?.user_metadata
  ])

  // Initialize forms
  const {
    register: registerCompany,
    handleSubmit: handleCompanySubmit,
    formState: { errors: companyErrors },
    control: companyControl,
    watch: watchCompany,
    setValue: setCompanyValue,
    reset: resetCompany,
    getValues: getCompanyValues
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: defaultCompanyValues
  })

  const {
    register: registerBusinessUnit,
    handleSubmit: handleBusinessUnitSubmit,
    formState: { errors: businessUnitErrors },
    reset: resetBusinessUnit,
    setValue: setBusinessUnitValue
  } = useForm<BusinessUnitFormData>({
    resolver: zodResolver(businessUnitSchema)
  })

  const {
    register: registerFacility,
    handleSubmit: handleFacilitySubmit,
    formState: { errors: facilityErrors },
    control: facilityControl,
    reset: resetFacility,
    setValue: setFacilityValue
  } = useForm<FacilityFormData>({
    resolver: zodResolver(facilitySchema)
  })

  const watchedIndustry = watchCompany("industry")
  
  // Initialize component once
  useEffect(() => {
    goToStep(1)
  }, [goToStep])

  // Manual save function (called on blur or specific events)
  const saveCurrentData = useCallback(() => {
    const currentData = getCompanyValues()
    
    // Filter out empty/null values
    const filteredData: Partial<CompanyFormData> = {}
    Object.entries(currentData).forEach(([key, value]) => {
      if (value !== "" && value !== undefined && value !== null) {
        filteredData[key as keyof CompanyFormData] = value as any
      }
    })
    
    if (Object.keys(filteredData).length > 0) {
      updateCompanyData(filteredData)
    }
  }, [getCompanyValues, updateCompanyData])

  // Auto-save on form blur events
  const handleFieldBlur = useCallback(() => {
    // Debounce the save to avoid too frequent calls
    const timeoutId = setTimeout(saveCurrentData, 300)
    return () => clearTimeout(timeoutId)
  }, [saveCurrentData])

  const handleNext = async () => {
    setIsLoading(true)
    
    // Save current form data before proceeding
    saveCurrentData()
    
    // Check if minimum required data is present
    const currentData = getCompanyValues()
    if (currentData.legalName && currentData.industry && currentData.hqCountry && currentData.employeeCount) {
      completeStep(1)
    }
    
    // Navigate to next step
    router.push("/onboarding/esg-scope")
  }

  const handleBack = () => {
    // Save current form data before leaving
    saveCurrentData()
    router.push("/onboarding/initiate")
  }

  const onCompanySubmit = (data: CompanyFormData) => {
    // Update company data in context
    updateCompanyData(data)
  }

  const addBusinessUnit = (data: BusinessUnitFormData) => {
    const newUnit: BusinessUnit = {
      ...data,
      id: Date.now().toString()
    }
    
    let updatedUnits: BusinessUnit[]
    
    if (editingBusinessUnit) {
      updatedUnits = state.businessUnits.map(unit => 
        unit.id === editingBusinessUnit ? { ...newUnit, id: editingBusinessUnit } : unit
      )
      setEditingBusinessUnit(null)
    } else {
      updatedUnits = [...state.businessUnits, newUnit]
    }
    
    dispatch({ type: 'SET_BUSINESS_UNITS', payload: updatedUnits })
    resetBusinessUnit()
    setShowBusinessUnitForm(false)
  }

  const addFacility = (data: FacilityFormData) => {
    const newFacility: Facility = {
      ...data,
      id: Date.now().toString()
    }
    
    let updatedFacilities: Facility[]
    
    if (editingFacility) {
      updatedFacilities = state.facilities.map(facility => 
        facility.id === editingFacility ? { ...newFacility, id: editingFacility } : facility
      )
      setEditingFacility(null)
    } else {
      updatedFacilities = [...state.facilities, newFacility]
    }
    
    dispatch({ type: 'SET_FACILITIES', payload: updatedFacilities })
    resetFacility()
    setShowFacilityForm(false)
  }

  const editBusinessUnit = (unit: BusinessUnit) => {
    setBusinessUnitValue("name", unit.name)
    setBusinessUnitValue("description", unit.description || "")
    setBusinessUnitValue("headOfUnit", unit.headOfUnit || "")
    setBusinessUnitValue("parentUnit", unit.parentUnit || "")
    setEditingBusinessUnit(unit.id)
    setShowBusinessUnitForm(true)
  }

  const editFacility = (facility: Facility) => {
    Object.keys(facility).forEach(key => {
      if (key !== "id") {
        setFacilityValue(key as keyof FacilityFormData, facility[key as keyof FacilityFormData])
      }
    })
    setEditingFacility(facility.id)
    setShowFacilityForm(true)
  }

  const deleteBusinessUnit = (id: string) => {
    const updatedUnits = state.businessUnits.filter(unit => unit.id !== id)
    dispatch({ type: 'SET_BUSINESS_UNITS', payload: updatedUnits })
  }

  const deleteFacility = (id: string) => {
    const updatedFacilities = state.facilities.filter(facility => facility.id !== id)
    dispatch({ type: 'SET_FACILITIES', payload: updatedFacilities })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button variant="outline" onClick={handleBack} className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
            <Badge variant="outline">Step 1 of 6</Badge>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Organizational Structure</h1>
          <p className="text-lg text-gray-600">
            Define your company profile, business units, and facilities to establish your ESG scope.
          </p>
          
          <Progress value={getProgressPercentage() || 16.67} className="w-full mt-4" />
        </div>

        <Tabs defaultValue="company" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="company">Company Details</TabsTrigger>
            <TabsTrigger value="structure">Business Structure</TabsTrigger>
            <TabsTrigger value="facilities">Facilities</TabsTrigger>
          </TabsList>

          {/* Company Details Tab */}
          <TabsContent value="company">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building className="h-5 w-5" />
                  <span>Company Information</span>
                </CardTitle>
                <CardDescription>
                  Expand your company profile with additional details for comprehensive ESG tracking.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCompanySubmit(onCompanySubmit)} className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Logo Upload */}
                    <div className="md:col-span-2">
                      <Label>Company Logo</Label>
                      <div className="mt-2 flex items-center space-x-4">
                        <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                          <Upload className="h-8 w-8 text-gray-400" />
                        </div>
                        <Button type="button" variant="outline">
                          Upload Logo
                        </Button>
                        <p className="text-sm text-gray-500">PNG, JPG up to 2MB</p>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="legalName">Legal Entity Name *</Label>
                      <Input
                        {...registerCompany("legalName")}
                        id="legalName"
                        placeholder="Enter legal company name"
                        onBlur={handleFieldBlur}
                      />
                      {companyErrors.legalName && (
                        <p className="text-sm text-red-600">{companyErrors.legalName.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="tradingName">Trading Name</Label>
                      <Input
                        {...registerCompany("tradingName")}
                        id="tradingName"
                        placeholder="If different from legal name"
                        onBlur={handleFieldBlur}
                      />
                    </div>

                    <div>
                      <Label htmlFor="registrationNumber">Registration Number</Label>
                      <Input
                        {...registerCompany("registrationNumber")}
                        id="registrationNumber"
                        placeholder="Company registration number"
                        onBlur={handleFieldBlur}
                      />
                    </div>

                    <div>
                      <Label htmlFor="taxId">Tax ID / VAT ID</Label>
                      <Input
                        {...registerCompany("taxId")}
                        id="taxId"
                        placeholder="Tax identification number"
                        onBlur={handleFieldBlur}
                      />
                    </div>

                    <div>
                      <Label htmlFor="foundedYear">Founded Year</Label>
                      <Input
                        {...registerCompany("foundedYear", { valueAsNumber: true })}
                        id="foundedYear"
                        type="number"
                        placeholder="e.g., 2010"
                        min="1800"
                        max={new Date().getFullYear()}
                        onBlur={handleFieldBlur}
                      />
                    </div>

                    <div>
                      <Label htmlFor="website">Official Website</Label>
                      <Input
                        {...registerCompany("website")}
                        id="website"
                        type="url"
                        placeholder="https://www.company.com"
                        onBlur={handleFieldBlur}
                      />
                      {companyErrors.website && (
                        <p className="text-sm text-red-600">{companyErrors.website.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Industry Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Industry Classification</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="industry">Primary Industry *</Label>
                        <Controller
                          name="industry"
                          control={companyControl}
                          render={({ field }) => (
                            <Select 
                              onValueChange={(value) => {
                                field.onChange(value)
                                setSelectedIndustry(value)
                                setTimeout(saveCurrentData, 300)
                              }}
                              value={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select primary industry" />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.keys(industryCategories).map((industry) => (
                                  <SelectItem key={industry} value={industry}>
                                    {industry}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {companyErrors.industry && (
                          <p className="text-sm text-red-600">{companyErrors.industry.message}</p>
                        )}
                      </div>

                      {(watchedIndustry && industryCategories[watchedIndustry as keyof typeof industryCategories]) && (
                        <div>
                          <Label htmlFor="subIndustry">Sub-Industry</Label>
                          <Controller
                            name="subIndustry"
                            control={companyControl}
                            render={({ field }) => (
                              <Select 
                                onValueChange={(value) => {
                                  field.onChange(value)
                                  setTimeout(saveCurrentData, 300)
                                }}
                                value={field.value}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select sub-industry" />
                                </SelectTrigger>
                                <SelectContent>
                                  {industryCategories[watchedIndustry as keyof typeof industryCategories]?.map((subIndustry) => (
                                    <SelectItem key={subIndustry} value={subIndustry}>
                                      {subIndustry}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Size & Revenue */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Company Size & Revenue</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <Label htmlFor="employeeCount">Number of Employees *</Label>
                        <Input
                          {...registerCompany("employeeCount", { valueAsNumber: true })}
                          id="employeeCount"
                          type="number"
                          placeholder="e.g., 250"
                          min="1"
                          onBlur={handleFieldBlur}
                        />
                        {companyErrors.employeeCount && (
                          <p className="text-sm text-red-600">{companyErrors.employeeCount.message}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="currency">Currency</Label>
                        <Controller
                          name="currency"
                          control={companyControl}
                          render={({ field }) => (
                            <Select 
                              onValueChange={(value) => {
                                field.onChange(value)
                                setTimeout(saveCurrentData, 300)
                              }}
                              value={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select currency" />
                              </SelectTrigger>
                              <SelectContent>
                                {currencies.map((currency) => (
                                  <SelectItem key={currency.code} value={currency.code}>
                                    {currency.symbol} {currency.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>

                      <div>
                        <Label htmlFor="annualRevenue">Annual Revenue (Optional)</Label>
                        <Input
                          {...registerCompany("annualRevenue", { valueAsNumber: true })}
                          id="annualRevenue"
                          type="number"
                          placeholder="For benchmarking"
                          min="0"
                          onBlur={handleFieldBlur}
                        />
                        <p className="text-xs text-gray-500 mt-1">Used for industry benchmarking</p>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Headquarters Location</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <Label htmlFor="hqAddress">Headquarters Address *</Label>
                        <Textarea
                          {...registerCompany("hqAddress")}
                          id="hqAddress"
                          placeholder="Enter full headquarters address"
                          rows={3}
                          onBlur={handleFieldBlur}
                        />
                        {companyErrors.hqAddress && (
                          <p className="text-sm text-red-600">{companyErrors.hqAddress.message}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="hqCountry">Country *</Label>
                        <Input
                          {...registerCompany("hqCountry")}
                          id="hqCountry"
                          placeholder="Country"
                          onBlur={handleFieldBlur}
                        />
                        {companyErrors.hqCountry && (
                          <p className="text-sm text-red-600">{companyErrors.hqCountry.message}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="hqRegion">Region/State</Label>
                        <Input
                          {...registerCompany("hqRegion")}
                          id="hqRegion"
                          placeholder="State/Province/Region"
                          onBlur={handleFieldBlur}
                        />
                      </div>
                    </div>
                  </div>

                  <Button type="submit" variant="outline">
                    Save Company Information
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Business Structure Tab */}
          <TabsContent value="structure">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Business Units & Departments</span>
                  </div>
                  <Button onClick={() => setShowBusinessUnitForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Business Unit
                  </Button>
                </CardTitle>
                <CardDescription>
                  Define your organizational structure including divisions, departments, and business units.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {state.businessUnits.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No business units defined</h3>
                    <p className="text-gray-500 mb-4">
                      Start by adding your main business units, divisions, or departments.
                    </p>
                    <Button onClick={() => setShowBusinessUnitForm(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add First Business Unit
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {state.businessUnits.map((unit) => (
                      <div key={unit.id} className="p-4 border rounded-lg bg-white">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium">{unit.name}</h4>
                            {unit.description && (
                              <p className="text-sm text-gray-600 mt-1">{unit.description}</p>
                            )}
                            {unit.headOfUnit && (
                              <p className="text-sm text-gray-500 mt-1">Head: {unit.headOfUnit}</p>
                            )}
                            {unit.parentUnit && (
                              <Badge variant="outline" className="mt-2">
                                Reports to: {unit.parentUnit}
                              </Badge>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => editBusinessUnit(unit)}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteBusinessUnit(unit.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Business Unit Form */}
                {showBusinessUnitForm && (
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>
                        {editingBusinessUnit ? "Edit Business Unit" : "Add Business Unit"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleBusinessUnitSubmit(addBusinessUnit)} className="space-y-4">
                        <div>
                          <Label htmlFor="unitName">Business Unit Name *</Label>
                          <Input
                            {...registerBusinessUnit("name")}
                            id="unitName"
                            placeholder="e.g., Operations, HR, Finance"
                          />
                          {businessUnitErrors.name && (
                            <p className="text-sm text-red-600">{businessUnitErrors.name.message}</p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="unitDescription">Description</Label>
                          <Textarea
                            {...registerBusinessUnit("description")}
                            id="unitDescription"
                            placeholder="Brief description of the unit's role and responsibilities"
                            rows={3}
                          />
                        </div>

                        <div>
                          <Label htmlFor="headOfUnit">Head of Unit</Label>
                          <Input
                            {...registerBusinessUnit("headOfUnit")}
                            id="headOfUnit"
                            placeholder="Name of the unit head (optional)"
                          />
                        </div>

                        <div>
                          <Label htmlFor="parentUnit">Parent Unit</Label>
                          <Input
                            {...registerBusinessUnit("parentUnit")}
                            id="parentUnit"
                            placeholder="Parent business unit (if applicable)"
                          />
                        </div>

                        <div className="flex space-x-2">
                          <Button type="submit">
                            {editingBusinessUnit ? "Update" : "Add"} Business Unit
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setShowBusinessUnitForm(false)
                              setEditingBusinessUnit(null)
                              resetBusinessUnit()
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Facilities Tab */}
          <TabsContent value="facilities">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Factory className="h-5 w-5" />
                    <span>Facilities & Locations</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Bulk Upload
                    </Button>
                    <Button onClick={() => setShowFacilityForm(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Facility
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription>
                  Define all operational locations including offices, plants, warehouses, and other facilities.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {state.facilities.length === 0 ? (
                  <div className="text-center py-8">
                    <Factory className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No facilities defined</h3>
                    <p className="text-gray-500 mb-4">
                      Add your operational locations to establish your ESG scope and track facility-level data.
                    </p>
                    <div className="flex justify-center space-x-2">
                      <Button onClick={() => setShowFacilityForm(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add First Facility
                      </Button>
                      <Button variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload CSV Template
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Facility</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Size</TableHead>
                          <TableHead>Employees</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {state.facilities.map((facility) => (
                          <TableRow key={facility.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{facility.name}</p>
                                {facility.businessUnit && (
                                  <Badge variant="secondary" className="text-xs mt-1">
                                    {facility.businessUnit}
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>{facility.type}</TableCell>
                            <TableCell>
                              <div className="text-sm">
                                <p>{facility.country}</p>
                                {facility.region && <p className="text-gray-500">{facility.region}</p>}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant={facility.status === "Active" ? "default" : "secondary"}
                              >
                                {facility.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {facility.size ? `${facility.size} ${facility.sizeUnit}` : "-"}
                            </TableCell>
                            <TableCell>{facility.employeeCount || "-"}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => editFacility(facility)}
                                >
                                  <Edit2 className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => deleteFacility(facility.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}

                {/* Facility Form */}
                {showFacilityForm && (
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>
                        {editingFacility ? "Edit Facility" : "Add Facility"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleFacilitySubmit(addFacility)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="facilityName">Facility Name *</Label>
                            <Input
                              {...registerFacility("name")}
                              id="facilityName"
                              placeholder="e.g., Main Manufacturing Plant"
                            />
                            {facilityErrors.name && (
                              <p className="text-sm text-red-600">{facilityErrors.name.message}</p>
                            )}
                          </div>

                          <div>
                            <Label htmlFor="facilityType">Facility Type *</Label>
                            <Controller
                              name="type"
                              control={facilityControl}
                              render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select facility type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {facilityTypes.map((type) => (
                                      <SelectItem key={type} value={type}>
                                        {type}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}
                            />
                            {facilityErrors.type && (
                              <p className="text-sm text-red-600">{facilityErrors.type.message}</p>
                            )}
                          </div>

                          <div className="md:col-span-2">
                            <Label htmlFor="facilityAddress">Address *</Label>
                            <Textarea
                              {...registerFacility("address")}
                              id="facilityAddress"
                              placeholder="Full facility address"
                              rows={2}
                            />
                            {facilityErrors.address && (
                              <p className="text-sm text-red-600">{facilityErrors.address.message}</p>
                            )}
                          </div>

                          <div>
                            <Label htmlFor="facilityCountry">Country *</Label>
                            <Input
                              {...registerFacility("country")}
                              id="facilityCountry"
                              placeholder="Country"
                            />
                            {facilityErrors.country && (
                              <p className="text-sm text-red-600">{facilityErrors.country.message}</p>
                            )}
                          </div>

                          <div>
                            <Label htmlFor="facilityRegion">Region/State</Label>
                            <Input
                              {...registerFacility("region")}
                              id="facilityRegion"
                              placeholder="State/Province/Region"
                            />
                          </div>

                          <div>
                            <Label htmlFor="facilityStatus">Operational Status *</Label>
                            <Controller
                              name="status"
                              control={facilityControl}
                              render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {operationalStatuses.map((status) => (
                                      <SelectItem key={status} value={status}>
                                        {status}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}
                            />
                            {facilityErrors.status && (
                              <p className="text-sm text-red-600">{facilityErrors.status.message}</p>
                            )}
                          </div>

                          <div>
                            <Label htmlFor="facilitySize">Size</Label>
                            <div className="flex space-x-2">
                              <Input
                                {...registerFacility("size", { valueAsNumber: true })}
                                id="facilitySize"
                                type="number"
                                placeholder="Size"
                                className="flex-1"
                              />
                              <Controller
                                name="sizeUnit"
                                control={facilityControl}
                                render={({ field }) => (
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-24">
                                      <SelectValue placeholder="Unit" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="sqm">sqm</SelectItem>
                                      <SelectItem value="sqft">sqft</SelectItem>
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="facilityEmployees">Employees at Site</Label>
                            <Input
                              {...registerFacility("employeeCount", { valueAsNumber: true })}
                              id="facilityEmployees"
                              type="number"
                              placeholder="Number of employees"
                            />
                          </div>

                          <div>
                            <Label htmlFor="businessUnit">Business Unit</Label>
                            <Controller
                              name="businessUnit"
                              control={facilityControl}
                              render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Link to business unit" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {state.businessUnits.map((unit) => (
                                      <SelectItem key={unit.id} value={unit.name}>
                                        {unit.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}
                            />
                          </div>

                          <div className="md:col-span-2">
                            <Label htmlFor="activities">Primary Activities</Label>
                            <Textarea
                              {...registerFacility("activities")}
                              id="activities"
                              placeholder="Describe the main operations and activities at this facility"
                              rows={2}
                            />
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button type="submit">
                            {editingFacility ? "Update" : "Add"} Facility
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setShowFacilityForm(false)
                              setEditingFacility(null)
                              resetFacility()
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Welcome
          </Button>
          <Button onClick={handleNext} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save & Next: ESG Scope"}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
} 