"use client"

import { AuthProvider } from "@/contexts/AuthContext"
import { OnboardingProvider } from "@/contexts/OnboardingContext"

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <OnboardingProvider>
        {children}
      </OnboardingProvider>
    </AuthProvider>
  )
} 