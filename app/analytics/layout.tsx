import { ReactNode } from "react"

export default function AnalyticsLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-6 space-y-6 overflow-auto">
        {children}
      </div>
    </div>
  )
} 