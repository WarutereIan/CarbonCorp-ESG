import { ReactNode } from "react"

export default function AnalyticsLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="h-full">
      {children}
    </div>
  )
} 