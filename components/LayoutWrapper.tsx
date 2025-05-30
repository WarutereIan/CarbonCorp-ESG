"use client"

import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AIAssistantChat } from "@/components/ai-assistant-chat"
import { useEffect } from 'react'

interface LayoutWrapperProps {
  children: React.ReactNode
}

export const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  const { user, loading } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  
  // Routes that don't need authentication
  const publicRoutes = ['/auth/login', '/auth/register', '/auth/forgot-password', '/auth/reset-password']
  const isPublicRoute = publicRoutes.includes(pathname)
  
  useEffect(() => {
    if (!loading && !user && !isPublicRoute) {
      router.push('/auth/login')
    }
  }, [user, loading, isPublicRoute, router])
  
  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    )
  }
  
  // For public routes, always render without sidebar
  if (isPublicRoute) {
    return <>{children}</>
  }
  
  // If user is not authenticated on protected route, return loading while redirect happens
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    )
  }
  
  // Authenticated user on protected routes - render with sidebar
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar />
        <SidebarInset className="bg-background">{children}</SidebarInset>
      </div>
      <AIAssistantChat />
    </SidebarProvider>
  )
} 