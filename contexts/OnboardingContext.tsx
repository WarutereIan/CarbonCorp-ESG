"use client"

import React, { createContext, useContext, useReducer, useEffect, useCallback, useMemo } from 'react'

export interface CompanyData {
  legalName?: string
  tradingName?: string
  registrationNumber?: string
  taxId?: string
  foundedYear?: number
  website?: string
  industry?: string
  subIndustry?: string
  employeeCount?: number
  annualRevenue?: number
  currency?: string
  hqAddress?: string
  hqCountry?: string
  hqRegion?: string
  logo?: string
}

export interface BusinessUnit {
  id: string
  name: string
  description?: string
  headOfUnit?: string
  parentUnit?: string
}

export interface Facility {
  id: string
  name: string
  address: string
  country: string
  region?: string
  type: string
  status: string
  size?: number
  sizeUnit?: 'sqm' | 'sqft'
  employeeCount?: number
  activities?: string
  businessUnit?: string
}

export interface ESGFramework {
  id: string
  name: string
  description?: string
  isSelected: boolean
  isRegional?: boolean
}

export interface AIFeature {
  id: string
  name: string
  description: string
  isEnabled: boolean
  category: 'data' | 'analytics' | 'reporting' | 'risk' | 'assistant'
}

export interface Goal {
  id: string
  title: string
  description: string
  kpi: string
  target: string
  deadline?: string
  isAccepted: boolean
}

export interface TeamMember {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
  hasBeenInvited: boolean
}

export interface OnboardingState {
  currentStep: number
  completedSteps: number[]
  
  // Step 1: Organization
  companyData: CompanyData
  businessUnits: BusinessUnit[]
  facilities: Facility[]
  
  // Step 2: ESG Scope
  selectedFrameworks: ESGFramework[]
  reportingPeriod: {
    start?: string
    end?: string
    frequency?: 'annual' | 'biannual' | 'quarterly'
  }
  materialityAssessment: {
    wantsToPerform: boolean
    focusAreas: string[]
  }
  
  // Step 3: Data Integration
  connectedSources: string[]
  dataUploadPreferences: {
    ocrEnabled: boolean
    templatesConfigured: string[]
  }
  
  // Step 4: AI & Analytics
  aiFeatures: AIFeature[]
  benchmarkingOptIn: boolean
  dashboardPreference: string
  selectedKPIs: string[]
  
  // Step 5: Goals & Strategy
  initialGoals: Goal[]
  strategyBlueprint: {
    priorities: string[]
    existingInitiatives: string
  }
  
  // Step 6: Team Setup
  teamMembers: TeamMember[]
  
  // Overall progress
  isComplete: boolean
  lastSaved?: string
}

type OnboardingAction =
  | { type: 'SET_CURRENT_STEP'; payload: number }
  | { type: 'COMPLETE_STEP'; payload: number }
  | { type: 'UPDATE_COMPANY_DATA'; payload: Partial<CompanyData> }
  | { type: 'SET_BUSINESS_UNITS'; payload: BusinessUnit[] }
  | { type: 'SET_FACILITIES'; payload: Facility[] }
  | { type: 'UPDATE_FRAMEWORKS'; payload: ESGFramework[] }
  | { type: 'UPDATE_REPORTING_PERIOD'; payload: Partial<OnboardingState['reportingPeriod']> }
  | { type: 'UPDATE_MATERIALITY'; payload: Partial<OnboardingState['materialityAssessment']> }
  | { type: 'ADD_CONNECTED_SOURCE'; payload: string }
  | { type: 'UPDATE_DATA_PREFERENCES'; payload: Partial<OnboardingState['dataUploadPreferences']> }
  | { type: 'UPDATE_AI_FEATURES'; payload: AIFeature[] }
  | { type: 'SET_BENCHMARKING_OPT_IN'; payload: boolean }
  | { type: 'SET_DASHBOARD_PREFERENCE'; payload: string }
  | { type: 'SET_SELECTED_KPIS'; payload: string[] }
  | { type: 'UPDATE_GOALS'; payload: Goal[] }
  | { type: 'UPDATE_STRATEGY_BLUEPRINT'; payload: Partial<OnboardingState['strategyBlueprint']> }
  | { type: 'SET_TEAM_MEMBERS'; payload: TeamMember[] }
  | { type: 'MARK_COMPLETE' }
  | { type: 'LOAD_SAVED_STATE'; payload: OnboardingState }

const STORAGE_KEY = 'carboncorp-onboarding-state'
const STORAGE_VERSION = '1.0'

const initialState: OnboardingState = {
  currentStep: 1,
  completedSteps: [],
  
  // Step 1: Organization
  companyData: {},
  businessUnits: [],
  facilities: [],
  
  // Step 2: ESG Scope
  selectedFrameworks: [],
  reportingPeriod: {},
  materialityAssessment: {
    wantsToPerform: false,
    focusAreas: []
  },
  
  // Step 3: Data Integration
  connectedSources: [],
  dataUploadPreferences: {
    ocrEnabled: false,
    templatesConfigured: []
  },
  
  // Step 4: AI & Analytics
  aiFeatures: [],
  benchmarkingOptIn: false,
  dashboardPreference: '',
  selectedKPIs: [],
  
  // Step 5: Goals & Strategy
  initialGoals: [],
  strategyBlueprint: {
    priorities: [],
    existingInitiatives: ''
  },
  
  // Step 6: Team Setup
  teamMembers: [],
  
  // Overall progress
  isComplete: false,
  lastSaved: undefined
}

function onboardingReducer(state: OnboardingState, action: OnboardingAction): OnboardingState {
  const newState = (() => {
    switch (action.type) {
      case 'SET_CURRENT_STEP':
        return { ...state, currentStep: action.payload, lastSaved: new Date().toISOString() }
      
      case 'COMPLETE_STEP':
        const updatedSteps = state.completedSteps.includes(action.payload) 
          ? state.completedSteps 
          : [...state.completedSteps, action.payload]
        return { ...state, completedSteps: updatedSteps, lastSaved: new Date().toISOString() }
      
      case 'UPDATE_COMPANY_DATA':
        return { 
          ...state, 
          companyData: { ...state.companyData, ...action.payload },
          lastSaved: new Date().toISOString()
        }
      
      case 'SET_BUSINESS_UNITS':
        return { 
          ...state, 
          businessUnits: action.payload,
          lastSaved: new Date().toISOString()
        }
      
      case 'SET_FACILITIES':
        return { 
          ...state, 
          facilities: action.payload,
          lastSaved: new Date().toISOString()
        }
      
      case 'UPDATE_FRAMEWORKS':
        return { 
          ...state, 
          selectedFrameworks: action.payload,
          lastSaved: new Date().toISOString()
        }
      
      case 'UPDATE_REPORTING_PERIOD':
        return { 
          ...state, 
          reportingPeriod: { ...state.reportingPeriod, ...action.payload },
          lastSaved: new Date().toISOString()
        }
      
      case 'UPDATE_MATERIALITY':
        return { 
          ...state, 
          materialityAssessment: { ...state.materialityAssessment, ...action.payload },
          lastSaved: new Date().toISOString()
        }
      
      case 'ADD_CONNECTED_SOURCE':
        return { 
          ...state, 
          connectedSources: [...state.connectedSources, action.payload],
          lastSaved: new Date().toISOString()
        }
      
      case 'UPDATE_DATA_PREFERENCES':
        return { 
          ...state, 
          dataUploadPreferences: { ...state.dataUploadPreferences, ...action.payload },
          lastSaved: new Date().toISOString()
        }
      
      case 'UPDATE_AI_FEATURES':
        return { 
          ...state, 
          aiFeatures: action.payload,
          lastSaved: new Date().toISOString()
        }
      
      case 'SET_BENCHMARKING_OPT_IN':
        return { 
          ...state, 
          benchmarkingOptIn: action.payload,
          lastSaved: new Date().toISOString()
        }
      
      case 'SET_DASHBOARD_PREFERENCE':
        return { 
          ...state, 
          dashboardPreference: action.payload,
          lastSaved: new Date().toISOString()
        }
      
      case 'SET_SELECTED_KPIS':
        return { 
          ...state, 
          selectedKPIs: action.payload,
          lastSaved: new Date().toISOString()
        }
      
      case 'UPDATE_GOALS':
        return { 
          ...state, 
          initialGoals: action.payload,
          lastSaved: new Date().toISOString()
        }
      
      case 'UPDATE_STRATEGY_BLUEPRINT':
        return { 
          ...state, 
          strategyBlueprint: { ...state.strategyBlueprint, ...action.payload },
          lastSaved: new Date().toISOString()
        }
      
      case 'SET_TEAM_MEMBERS':
        return { 
          ...state, 
          teamMembers: action.payload,
          lastSaved: new Date().toISOString()
        }
      
      case 'MARK_COMPLETE':
        return { 
          ...state, 
          isComplete: true, 
          completedSteps: [1, 2, 3, 4, 5, 6],
          lastSaved: new Date().toISOString()
        }
      
      case 'LOAD_SAVED_STATE':
        return action.payload
      
      default:
        return state
    }
  })()

  return newState
}

interface OnboardingContextType {
  state: OnboardingState
  dispatch: React.Dispatch<OnboardingAction>
  
  // Helper functions
  goToStep: (step: number) => void
  completeStep: (step: number) => void
  updateCompanyData: (data: Partial<CompanyData>) => void
  saveProgress: () => void
  getProgressPercentage: () => number
  isStepCompleted: (step: number) => boolean
  hasInProgressOnboarding: () => boolean
  hasStartedOnboarding: () => boolean
  isOnboardingComplete: () => boolean
  clearOnboardingData: () => void
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(onboardingReducer, initialState)
  const [isInitialized, setIsInitialized] = React.useState(false)

  // Load saved state on mount
  useEffect(() => {
    if (!isInitialized) {
      const savedState = localStorage.getItem(STORAGE_KEY)
      if (savedState) {
        try {
          const parsed = JSON.parse(savedState)
          if (parsed.version === STORAGE_VERSION && parsed.data) {
            dispatch({ type: 'LOAD_SAVED_STATE', payload: parsed.data })
          }
        } catch (error) {
          console.error('Error loading onboarding state:', error)
        }
      }
      setIsInitialized(true)
    }
  }, [isInitialized])

  // Auto-save with debounce
  useEffect(() => {
    if (isInitialized) {
      const timeoutId = setTimeout(() => {
        const dataToSave = {
          version: STORAGE_VERSION,
          data: state,
          savedAt: new Date().toISOString()
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
      }, 1000) // 1 second debounce

      return () => clearTimeout(timeoutId)
    }
  }, [state, isInitialized])

  const goToStep = useCallback((step: number) => {
    dispatch({ type: 'SET_CURRENT_STEP', payload: step })
  }, [])

  const completeStep = useCallback((step: number) => {
    dispatch({ type: 'COMPLETE_STEP', payload: step })
  }, [])

  const updateCompanyData = useCallback((data: Partial<CompanyData>) => {
    dispatch({ type: 'UPDATE_COMPANY_DATA', payload: data })
  }, [])

  const saveProgress = useCallback(() => {
    // Manual save trigger if needed
    const dataToSave = {
      version: STORAGE_VERSION,
      data: state,
      savedAt: new Date().toISOString()
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
  }, [state])

  const getProgressPercentage = useCallback(() => {
    const totalSteps = 6
    const completedSteps = state.completedSteps.length
    return Math.round((completedSteps / totalSteps) * 100)
  }, [state.completedSteps.length])

  const isStepCompleted = useCallback((step: number) => {
    return state.completedSteps.includes(step)
  }, [state.completedSteps])

  const hasInProgressOnboarding = useCallback(() => {
    // Don't show onboarding prompt if completed
    if (state.isComplete) {
      return false
    }
    
    // Check if there's any meaningful data saved (indicating onboarding was started)
    return state.completedSteps.length > 0 || 
           Object.keys(state.companyData).length > 0 ||
           state.businessUnits.length > 0 ||
           state.facilities.length > 0
  }, [state.isComplete, state.completedSteps.length, state.companyData, state.businessUnits.length, state.facilities.length])

  const hasStartedOnboarding = useCallback(() => {
    // Check if onboarding has been started (regardless of completion)
    return state.completedSteps.length > 0 || 
           Object.keys(state.companyData).length > 0 ||
           state.businessUnits.length > 0 ||
           state.facilities.length > 0
  }, [state.completedSteps.length, state.companyData, state.businessUnits.length, state.facilities.length])

  const isOnboardingComplete = useCallback(() => {
    return state.isComplete
  }, [state.isComplete])

  const clearOnboardingData = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    dispatch({ type: 'LOAD_SAVED_STATE', payload: initialState })
  }, [])

  const contextValue = useMemo(() => ({
    state,
    dispatch,
    goToStep,
    completeStep,
    updateCompanyData,
    saveProgress,
    getProgressPercentage,
    isStepCompleted,
    hasInProgressOnboarding,
    hasStartedOnboarding,
    isOnboardingComplete,
    clearOnboardingData
  }), [
    state,
    goToStep,
    completeStep,
    updateCompanyData,
    saveProgress,
    getProgressPercentage,
    isStepCompleted,
    hasInProgressOnboarding,
    hasStartedOnboarding,
    isOnboardingComplete,
    clearOnboardingData
  ])

  if (!isInitialized) {
    return null // or a loading component
  }

  return (
    <OnboardingContext.Provider value={contextValue}>
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider')
  }
  return context
} 