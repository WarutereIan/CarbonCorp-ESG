import { MaterialityAssessmentData, RiskScenario, GeneratedReport, ESGStrategy, AIInsightSummary } from "@/types/ai-engine"

export const mockMaterialityAssessments: MaterialityAssessmentData[] = [
  {
    id: "ma-001",
    name: "2024 Materiality Assessment",
    status: "completed",
    completedAt: "2024-01-15T10:30:00Z",
    lastModified: "2024-01-15T10:30:00Z",
    industryContext: {
      industry: "Manufacturing",
      subIndustry: "Textile & Apparel",
      regions: ["West Africa", "East Africa"],
      companySize: "250m-1b"
    },
    materialTopics: [
      {
        id: "energy-mgmt",
        name: "Energy Management",
        category: "environmental",
        stakeholderImportance: 4.2,
        businessImpact: 8.5,
        priority: "high"
      },
      {
        id: "ghg-emissions",
        name: "GHG Emissions",
        category: "environmental",
        stakeholderImportance: 4.5,
        businessImpact: 8.8,
        priority: "high"
      },
      {
        id: "water-mgmt",
        name: "Water & Wastewater Management",
        category: "environmental",
        stakeholderImportance: 3.8,
        businessImpact: 7.2,
        priority: "high"
      },
      {
        id: "labor-practices",
        name: "Labor Practices",
        category: "social",
        stakeholderImportance: 4.8,
        businessImpact: 6.5,
        priority: "monitor"
      },
      {
        id: "supply-chain",
        name: "Supply Chain Management",
        category: "governance",
        stakeholderImportance: 3.5,
        businessImpact: 8.2,
        priority: "consider"
      }
    ],
    assessmentMetadata: {
      completedSteps: 4,
      totalSteps: 4,
      stakeholderInput: "ai-synthetic",
      customStakeholders: 2
    }
  },
  {
    id: "ma-002",
    name: "Q3 2024 Review Assessment",
    status: "in-progress",
    lastModified: "2024-12-18T14:22:00Z",
    industryContext: {
      industry: "Manufacturing",
      subIndustry: "Textile & Apparel",
      regions: ["West Africa"],
      companySize: "250m-1b"
    },
    materialTopics: [],
    assessmentMetadata: {
      completedSteps: 2,
      totalSteps: 4,
      stakeholderInput: "survey",
      customStakeholders: 1
    }
  }
]

export const mockRiskScenarios: RiskScenario[] = [
  {
    id: "rs-001",
    name: "Climate Transition Risk - 2°C Scenario",
    type: "climate-transition",
    status: "completed",
    createdAt: "2024-01-20T09:15:00Z",
    lastRun: "2024-01-20T09:45:00Z",
    config: {
      timeHorizon: "medium",
      scope: "whole-org",
      parameters: {
        carbonPrice: 75,
        renewableAdoption: "Accelerated",
        stranded_assets: "Medium"
      }
    },
    results: {
      overallRiskScore: 7.2,
      financialImpact: {
        revenueRisk: -8.2,
        costIncrease: 4.8,
        assetRisk: -3.2
      },
      riskCategories: [
        { category: "Financial", severity: "high", probability: 0.68, impact: 8.2 },
        { category: "Operational", severity: "medium", probability: 0.75, impact: 6.5 },
        { category: "Regulatory", severity: "high", probability: 0.85, impact: 9.1 },
        { category: "Reputational", severity: "medium", probability: 0.45, impact: 5.8 }
      ]
    }
  },
  {
    id: "rs-002",
    name: "Supply Chain Disruption Analysis",
    type: "supply-chain",
    status: "completed",
    createdAt: "2024-02-05T11:30:00Z",
    lastRun: "2024-02-05T12:00:00Z",
    config: {
      timeHorizon: "short",
      scope: "supply-chain",
      parameters: {
        resource_scarcity: "Water",
        supplier_esg_risk: "High",
        geographic_risk: "High"
      }
    },
    results: {
      overallRiskScore: 6.8,
      financialImpact: {
        revenueRisk: -12.5,
        costIncrease: 8.3,
        assetRisk: -1.2
      },
      riskCategories: [
        { category: "Supply Chain", severity: "high", probability: 0.72, impact: 8.8 },
        { category: "Operational", severity: "high", probability: 0.65, impact: 7.9 },
        { category: "Financial", severity: "medium", probability: 0.58, impact: 6.2 }
      ]
    }
  },
  {
    id: "rs-003",
    name: "Regulatory Compliance - CSRD Impact",
    type: "regulatory",
    status: "running",
    createdAt: "2024-12-18T08:00:00Z",
    config: {
      timeHorizon: "medium",
      scope: "whole-org",
      parameters: {
        disclosure_scope: "CSRD-like",
        carbon_tax: 45,
        penalties: "Moderate"
      }
    }
  }
]

export const mockGeneratedReports: GeneratedReport[] = [
  {
    id: "gr-001",
    title: "ISSB S1/S2 Climate Disclosure Report",
    type: "full-report",
    framework: "ISSB",
    status: "review",
    generatedAt: "2024-12-15T14:30:00Z",
    wordCount: 8750,
    aiConfidence: 92,
    prompt: "Generate a comprehensive ISSB S1 and S2 climate disclosure report focusing on our textile manufacturing operations in West Africa",
    sections: [
      { title: "Governance", wordCount: 1200, status: "approved" },
      { title: "Strategy", wordCount: 2400, status: "reviewed" },
      { title: "Risk Management", wordCount: 1800, status: "generated" },
      { title: "Metrics and Targets", wordCount: 3350, status: "generated" }
    ],
    lastModified: "2024-12-16T09:15:00Z"
  },
  {
    id: "gr-002",
    title: "Executive Summary - Q3 ESG Performance",
    type: "executive-summary",
    status: "published",
    generatedAt: "2024-11-28T16:45:00Z",
    wordCount: 1250,
    aiConfidence: 88,
    prompt: "Create an executive summary of our Q3 ESG performance highlighting key achievements and areas for improvement",
    sections: [
      { title: "Performance Highlights", wordCount: 450, status: "approved" },
      { title: "Key Challenges", wordCount: 380, status: "approved" },
      { title: "Strategic Outlook", wordCount: 420, status: "approved" }
    ],
    lastModified: "2024-11-28T16:45:00Z"
  },
  {
    id: "gr-003",
    title: "Water Stewardship Section Draft",
    type: "section",
    status: "draft",
    generatedAt: "2024-12-18T11:20:00Z",
    wordCount: 2100,
    aiConfidence: 85,
    prompt: "Draft a detailed section on our water stewardship practices for inclusion in our annual sustainability report",
    sections: [
      { title: "Water Management Strategy", wordCount: 850, status: "generated" },
      { title: "Performance Data", wordCount: 650, status: "generated" },
      { title: "Future Commitments", wordCount: 600, status: "generated" }
    ],
    lastModified: "2024-12-18T11:20:00Z"
  }
]

export const mockESGStrategies: ESGStrategy[] = [
  {
    id: "es-001",
    name: "Net Zero Transition Strategy 2024-2030",
    status: "active",
    timeHorizon: "2024-2030",
    scope: "whole-org",
    createdAt: "2024-02-01T10:00:00Z",
    lastModified: "2024-12-10T14:30:00Z",
    pillars: [
      {
        id: "decarbonization",
        name: "Decarbonization",
        objectives: 4,
        initiatives: 12,
        kpis: 8,
        progress: 68
      },
      {
        id: "renewable-energy",
        name: "Renewable Energy Transition",
        objectives: 2,
        initiatives: 6,
        kpis: 4,
        progress: 82
      },
      {
        id: "circular-economy",
        name: "Circular Economy",
        objectives: 3,
        initiatives: 8,
        kpis: 6,
        progress: 45
      }
    ],
    linkedMaterialityAssessment: "ma-001",
    linkedRiskScenarios: ["rs-001", "rs-002"],
    implementation: {
      totalInitiatives: 26,
      completedInitiatives: 8,
      overallProgress: 62
    }
  },
  {
    id: "es-002",
    name: "Human Capital Development Strategy",
    status: "draft",
    timeHorizon: "2024-2027",
    scope: "whole-org",
    createdAt: "2024-11-15T09:30:00Z",
    lastModified: "2024-12-05T11:45:00Z",
    pillars: [
      {
        id: "dei-enhancement",
        name: "Diversity, Equity & Inclusion",
        objectives: 3,
        initiatives: 7,
        kpis: 5,
        progress: 25
      },
      {
        id: "workforce-development",
        name: "Workforce Development",
        objectives: 2,
        initiatives: 5,
        kpis: 4,
        progress: 15
      }
    ],
    linkedMaterialityAssessment: "ma-001",
    linkedRiskScenarios: [],
    implementation: {
      totalInitiatives: 12,
      completedInitiatives: 2,
      overallProgress: 20
    }
  }
]

export const mockAIInsights: AIInsightSummary = {
  totalInsights: 47,
  byType: {
    "anomaly": 12,
    "trend": 18,
    "recommendation": 11,
    "opportunity": 4,
    "risk": 2
  },
  bySeverity: {
    "critical": 2,
    "high": 8,
    "medium": 22,
    "low": 15
  },
  actionableItems: 15,
  recentInsights: [
    {
      id: "ai-001",
      type: "anomaly",
      title: "Unusual spike in energy consumption at Lagos facility",
      severity: "high",
      timestamp: "2024-12-18T08:30:00Z"
    },
    {
      id: "ai-002", 
      type: "opportunity",
      title: "Water efficiency improvement potential identified",
      severity: "medium",
      timestamp: "2024-12-17T15:45:00Z"
    },
    {
      id: "ai-003",
      type: "trend",
      title: "Positive trend in employee engagement scores",
      severity: "low",
      timestamp: "2024-12-17T12:20:00Z"
    },
    {
      id: "ai-004",
      type: "recommendation",
      title: "Supplier ESG assessment program enhancement suggested",
      severity: "medium",
      timestamp: "2024-12-16T16:10:00Z"
    }
  ]
} 