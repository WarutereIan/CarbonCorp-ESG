// User Management Types
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  title?: string
  department?: string
  roles: UserRole[]
  status: 'active' | 'suspended' | 'invited' | 'inactive'
  lastActive?: string
  createdAt: string
  updatedAt: string
  profilePhoto?: string
  phone?: string
  preferences: UserPreferences
}

export interface UserRole {
  id: string
  name: string
  description: string
  permissions: Permission[]
  isCustom: boolean
}

export interface Permission {
  id: string
  module: string
  action: 'create' | 'read' | 'update' | 'delete' | 'approve' | 'admin'
  resource?: string
  granted: boolean
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  language: string
  timezone: string
  notifications: NotificationPreferences
  dashboardConfig?: any
}

export interface NotificationPreferences {
  email: boolean
  inApp: boolean
  pushNotifications: boolean
  reportReminders: boolean
  complianceDeadlines: boolean
  dataQualityAlerts: boolean
  goalPerformanceAlerts: boolean
}

// Company Settings Types
export interface CompanyProfile {
  id: string
  legalName: string
  tradingName?: string
  registrationNumber?: string
  taxId?: string
  website?: string
  foundedYear?: number
  industry: string
  subIndustry?: string
  employeeCount: string
  annualRevenue?: string
  headquarters: Address
  logo?: string
  description?: string
  organizationalStructure: OrganizationalUnit[]
  facilities: Facility[]
  brandKit: BrandKit
}

export interface Address {
  street: string
  city: string
  state?: string
  country: string
  postalCode: string
  coordinates?: {
    latitude: number
    longitude: number
  }
}

export interface OrganizationalUnit {
  id: string
  name: string
  description?: string
  parentId?: string
  head?: string
  type: 'division' | 'department' | 'team' | 'subsidiary'
  facilities?: string[]
}

export interface Facility {
  id: string
  name: string
  type: 'headquarters' | 'manufacturing' | 'office' | 'warehouse' | 'retail' | 'datacenter' | 'lab' | 'other'
  address: Address
  status: 'active' | 'planned' | 'construction' | 'closed' | 'decommissioned'
  size?: number
  sizeUnit?: 'sqm' | 'sqft'
  employees?: number
  primaryActivities: string[]
  businessUnitId?: string
}

export interface BrandKit {
  primaryColor: string
  secondaryColor: string
  accentColor: string
  logoUrl?: string
  fontFamily: string
  brandGuidelines?: string
}

// Integration Settings Types
export interface Integration {
  id: string
  name: string
  type: 'erp' | 'hris' | 'iot' | 'utility' | 'financial' | 'sustainability' | 'other'
  provider: string
  status: 'connected' | 'disconnected' | 'error' | 'configuring'
  lastSync?: string
  configuration: IntegrationConfig
  dataMapping: DataMapping[]
  syncFrequency: 'realtime' | 'hourly' | 'daily' | 'weekly' | 'monthly'
  errorLog?: IntegrationError[]
}

export interface IntegrationConfig {
  apiUrl?: string
  apiKey?: string
  username?: string
  clientId?: string
  authType: 'api-key' | 'oauth' | 'basic' | 'jwt'
  customFields?: Record<string, any>
  testConnection?: boolean
}

export interface DataMapping {
  sourceField: string
  targetField: string
  transformation?: string
  validationRules?: ValidationRule[]
}

export interface ValidationRule {
  type: 'required' | 'range' | 'format' | 'custom'
  parameters: any
  errorMessage: string
}

export interface IntegrationError {
  timestamp: string
  type: 'connection' | 'authentication' | 'data' | 'mapping'
  message: string
  details?: any
  resolved: boolean
}

// Data Management Types
export interface DataRetentionPolicy {
  id: string
  name: string
  description: string
  dataCategory: string
  retentionPeriod: number
  retentionUnit: 'days' | 'months' | 'years'
  archiveAfter?: number
  archiveUnit?: 'days' | 'months' | 'years'
  deleteAfter?: number
  deleteUnit?: 'days' | 'months' | 'years'
  legalHoldExempt: boolean
  autoApply: boolean
  createdAt: string
  updatedAt: string
}

export interface DataClassification {
  id: string
  name: string
  level: 'public' | 'internal' | 'confidential' | 'restricted'
  description: string
  accessRestrictions: string[]
  encryptionRequired: boolean
  retentionPolicy?: string
  dataCategories: string[]
}

export interface BackupConfiguration {
  enabled: boolean
  frequency: 'daily' | 'weekly' | 'monthly'
  retentionPeriod: number
  retentionUnit: 'days' | 'months' | 'years'
  storageLocation: 'local' | 'cloud' | 'hybrid'
  encryptionEnabled: boolean
  testRestoreFrequency: 'monthly' | 'quarterly' | 'annually'
  lastBackup?: string
  lastTestRestore?: string
}

// System Configuration Types
export interface SystemConfiguration {
  features: FeatureToggle[]
  appearance: AppearanceSettings
  notifications: SystemNotificationSettings
  performance: PerformanceSettings
  security: SecuritySettings
}

export interface FeatureToggle {
  id: string
  name: string
  description: string
  module: string
  enabled: boolean
  betaFeature: boolean
  requiresRestart: boolean
  dependencies?: string[]
}

export interface AppearanceSettings {
  defaultTheme: 'light' | 'dark' | 'system'
  allowThemeSelection: boolean
  defaultLanguage: string
  supportedLanguages: string[]
  customBranding: boolean
  companyLogo?: string
  favicon?: string
}

export interface SystemNotificationSettings {
  enableEmail: boolean
  enableInApp: boolean
  enablePush: boolean
  emailDeliveryHours: {
    start: string
    end: string
  }
  urgencyThresholds: {
    high: string[]
    medium: string[]
    low: string[]
  }
  globalQuietHours: {
    enabled: boolean
    start: string
    end: string
    timezone: string
  }
}

export interface PerformanceSettings {
  cacheEnabled: boolean
  sessionTimeout: number
  maxConcurrentUsers: number
  dataRefreshInterval: number
  logLevel: 'error' | 'warn' | 'info' | 'debug'
  metricsCollection: boolean
  healthCheckInterval: number
}

export interface SecuritySettings {
  mfaRequired: boolean
  passwordPolicy: PasswordPolicy
  sessionSecurity: SessionSecurity
  ipWhitelist?: string[]
  dataEncryption: EncryptionSettings
}

export interface PasswordPolicy {
  minLength: number
  requireUppercase: boolean
  requireLowercase: boolean
  requireNumbers: boolean
  requireSpecialChars: boolean
  maxAge: number
  preventReuse: number
}

export interface SessionSecurity {
  maxSessionDuration: number
  idleTimeout: number
  concurrentSessionLimit: number
  requireReauth: boolean
}

export interface EncryptionSettings {
  dataAtRest: boolean
  dataInTransit: boolean
  keyRotationFrequency: number
  algorithm: string
}

// Common Types
export interface APIResponse<T> {
  data: T
  success: boolean
  message?: string
  errors?: string[]
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface AuditLog {
  id: string
  userId: string
  action: string
  resource: string
  resourceId?: string
  changes?: Record<string, any>
  timestamp: string
  ipAddress: string
  userAgent: string
} 