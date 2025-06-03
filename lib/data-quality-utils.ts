import { AnomalyStatus, AnomalySeverity } from "@/types/data-quality"

export const getQualityScoreColor = (score: number): string => {
  if (score >= 90) return "text-green-600"
  if (score >= 75) return "text-yellow-600"
  return "text-red-600"
}

export const getAnomalyStatusColor = (status: AnomalyStatus): string => {
  switch (status) {
    case "pending": return "bg-yellow-100 text-yellow-800"
    case "investigating": return "bg-blue-100 text-blue-800"
    case "resolved": return "bg-green-100 text-green-800"
    case "accepted": return "bg-gray-100 text-gray-800"
    case "excluded": return "bg-purple-100 text-purple-800"
    default: return "bg-gray-100 text-gray-800"
  }
}

export const getSeverityColor = (severity: AnomalySeverity): string => {
  switch (severity) {
    case "critical": return "bg-red-100 text-red-800"
    case "high": return "bg-orange-100 text-orange-800"
    case "medium": return "bg-yellow-100 text-yellow-800"
    case "low": return "bg-gray-100 text-gray-800"
    default: return "bg-gray-100 text-gray-800"
  }
}

export const getCompletenessStatusColor = (status: string): string => {
  switch (status) {
    case "current": return "bg-green-100 text-green-800"
    case "overdue": return "bg-red-100 text-red-800"
    case "missing": return "bg-gray-100 text-gray-800"
    default: return "bg-gray-100 text-gray-800"
  }
}

export const formatConfidence = (confidence: number): string => {
  return `${(confidence * 100).toFixed(0)}%`
}

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString()
}

export const formatNumber = (num: number): string => {
  return num.toLocaleString()
} 