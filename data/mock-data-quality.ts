import { ValidationRule, Anomaly, DataQualityMetrics, CompletenessCheck } from "@/types/data-quality"

export const mockQualityMetrics: DataQualityMetrics = {
  overallScore: 87,
  completenessScore: 92,
  accuracyScore: 85,
  timelinessScore: 89,
  consistencyScore: 83,
  totalDataPoints: 45678,
  qualityTrend: 3.2,
  anomaliesDetected: 23,
  anomaliesResolved: 18,
  dataSourcesMonitored: 12
}

export const mockValidationRules: ValidationRule[] = [
  {
    id: "rule_001",
    name: "Energy Consumption Range Check",
    description: "Validate energy consumption values are within reasonable ranges",
    type: "range",
    category: "environmental",
    dataSource: "Energy Management System",
    field: "monthly_energy_consumption",
    parameters: { min: 0, max: 10000, unit: "MWh" },
    enabled: true,
    severity: "high",
    createdBy: "admin",
    createdAt: "2024-01-15",
    lastTriggered: "2024-01-20",
    violationCount: 3
  },
  {
    id: "rule_002", 
    name: "Employee Count Consistency",
    description: "Ensure employee counts are consistent across HR and payroll systems",
    type: "consistency",
    category: "social",
    dataSource: "HR System",
    field: "employee_count",
    parameters: { tolerance: 5, compareWith: "payroll_system" },
    enabled: true,
    severity: "medium",
    createdBy: "admin",
    createdAt: "2024-01-10",
    violationCount: 1
  },
  {
    id: "rule_003",
    name: "Emissions Factor Validation",
    description: "Validate emission factors are within standard ranges",
    type: "range",
    category: "environmental",
    dataSource: "Emissions Calculator",
    field: "co2_emission_factor",
    parameters: { min: 0.1, max: 2.5, unit: "tCO2e/MWh" },
    enabled: true,
    severity: "critical",
    createdBy: "esg_manager",
    createdAt: "2024-01-08",
    lastTriggered: "2024-01-22",
    violationCount: 7
  }
]

export const mockAnomalies: Anomaly[] = [
  {
    id: "anom_001",
    ruleId: "rule_001",
    ruleName: "Energy Consumption Range Check",
    type: "validation",
    severity: "high",
    status: "pending",
    title: "Energy consumption exceeds normal range",
    description: "Facility A reported 12,500 MWh energy consumption, which is 25% above the maximum threshold",
    metric: "Energy Consumption",
    value: 12500,
    expectedRange: "0 - 10,000 MWh",
    dataSource: "Energy Management System",
    facility: "Facility A - Lagos",
    timestamp: "2024-01-22T14:30:00Z",
    confidence: 0.95,
    context: {
      historicalAverage: 8500,
      lastPeriodValue: 8200,
      standardDeviation: 850
    }
  },
  {
    id: "anom_002",
    type: "statistical",
    severity: "medium",
    status: "investigating",
    title: "Unusual water usage pattern detected",
    description: "Water consumption at Facility B shows a sudden 40% increase compared to previous month",
    metric: "Water Usage",
    value: 28000,
    dataSource: "Utility System",
    facility: "Facility B - Accra", 
    timestamp: "2024-01-21T09:15:00Z",
    assignedTo: "data_analyst_jane",
    confidence: 0.87,
    context: {
      historicalAverage: 20000,
      lastPeriodValue: 19800,
      standardDeviation: 2100,
      trendDirection: "up"
    }
  },
  {
    id: "anom_003",
    ruleId: "rule_003",
    ruleName: "Emissions Factor Validation",
    type: "validation",
    severity: "critical",
    status: "resolved",
    title: "Invalid emission factor detected",
    description: "CO2 emission factor value of 3.2 tCO2e/MWh exceeds maximum allowed threshold",
    metric: "CO2 Emission Factor",
    value: 3.2,
    expectedRange: "0.1 - 2.5 tCO2e/MWh",
    dataSource: "Emissions Calculator",
    timestamp: "2024-01-20T16:45:00Z",
    resolvedBy: "esg_manager",
    resolvedAt: "2024-01-21T10:30:00Z",
    resolutionNote: "Updated with correct regional emission factor from local grid operator",
    confidence: 0.99,
    context: {
      historicalAverage: 1.8,
      lastPeriodValue: 1.7
    }
  }
]

export const mockCompletenessChecks: CompletenessCheck[] = [
  {
    id: "comp_001",
    name: "Monthly Energy Data - All Facilities",
    dataCategory: "environmental",
    expectedFrequency: "monthly",
    lastReceived: "2024-01-15",
    nextDue: "2024-02-15",
    status: "current",
    completeness: 95,
    sources: ["Facility A", "Facility B", "Facility C"],
    remindersSent: 0
  },
  {
    id: "comp_002", 
    name: "Employee Diversity Metrics",
    dataCategory: "social",
    expectedFrequency: "quarterly",
    lastReceived: "2023-12-31",
    nextDue: "2024-01-31",
    status: "overdue",
    completeness: 60,
    sources: ["HR System", "Payroll System"],
    remindersSent: 2
  },
  {
    id: "comp_003",
    name: "Board Meeting Minutes",
    dataCategory: "governance", 
    expectedFrequency: "monthly",
    lastReceived: "2024-01-10",
    nextDue: "2024-02-10",
    status: "current",
    completeness: 100,
    sources: ["Corporate Secretary"],
    remindersSent: 0
  }
] 