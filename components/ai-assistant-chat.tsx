"use client"

import React, { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { 
  MessageCircle, 
  Send, 
  Paperclip, 
  ThumbsUp, 
  ThumbsDown, 
  Download, 
  Save, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  FileText,
  BarChart3,
  Search,
  Lightbulb,
  Copy,
  X
} from "lucide-react"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  command?: string
  attachments?: File[]
  feedback?: "positive" | "negative"
  feedbackComment?: string
  saved?: boolean
}

interface ContextItem {
  type: "data" | "regulation" | "insight" | "link"
  title: string
  description: string
  url?: string
  value?: string
}

const COMMAND_SUGGESTIONS = [
  {
    command: "/analyze",
    description: "Analyze metrics and trends",
    example: "/analyze energy_consumption last_quarter facility_a",
    icon: BarChart3
  },
  {
    command: "/compare",
    description: "Compare metrics side by side",
    example: "/compare scope1_emissions vs scope2_emissions 2023 vs 2022",
    icon: BarChart3
  },
  {
    command: "/explain",
    description: "Explain ESG terms and concepts",
    example: "/explain materiality_assessment",
    icon: Lightbulb
  },
  {
    command: "/recommend",
    description: "Get improvement recommendations",
    example: "/recommend energy_efficiency manufacturing_facilities",
    icon: Sparkles
  },
  {
    command: "/find",
    description: "Search documents and reports",
    example: "/find sustainability_policy 2023",
    icon: Search
  },
  {
    command: "/summarize",
    description: "Summarize reports or documents",
    example: "/summarize quarterly_esg_report q3_2023",
    icon: FileText
  },
  {
    command: "/draft",
    description: "Draft communications",
    example: "/draft email_to_stakeholders quarterly_results",
    icon: FileText
  }
]

const MOCK_CONTEXT: ContextItem[] = [
  {
    type: "data",
    title: "Energy Consumption",
    description: "Current page: Data Hub - Energy metrics",
    value: "2,450 MWh (Q3 2023)"
  },
  {
    type: "regulation",
    title: "CSRD ESRS E1",
    description: "Climate change requirements applicable",
    url: "/compliance/regulations/csrd-esrs-e1"
  },
  {
    type: "insight",
    title: "Recent Analysis",
    description: "Energy efficiency trends - 15% improvement YoY",
    url: "/analytics/insights/energy-efficiency-2023"
  },
  {
    type: "link",
    title: "Related Goals",
    description: "Net Zero 2030 - 45% progress",
    url: "/analytics/goals/net-zero-2030"
  }
]

export function AIAssistantChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "assistant",
      content: "Hello! I'm your ESG AI assistant. I can help you analyze data, explain concepts, find documents, and provide recommendations. Try using commands like `/analyze energy_consumption` or ask me anything about your ESG data.",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isContextExpanded, setIsContextExpanded] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [showCommandSuggestions, setShowCommandSuggestions] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const detectCommand = (input: string) => {
    const trimmed = input.trim()
    if (trimmed.startsWith("/")) {
      const spaceIndex = trimmed.indexOf(" ")
      return spaceIndex > 0 ? trimmed.substring(0, spaceIndex) : trimmed
    }
    return null
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() && !selectedFile) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
      command: detectCommand(inputValue) || undefined,
      attachments: selectedFile ? [selectedFile] : undefined
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setSelectedFile(null)
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const response = generateAIResponse(userMessage)
      setMessages(prev => [...prev, response])
      setIsLoading(false)
    }, 1500)
  }

  const generateAIResponse = (userMessage: Message): Message => {
    let content = ""
    
    if (userMessage.command) {
      switch (userMessage.command) {
        case "/analyze":
          content = "Based on your energy consumption data, I've identified the following trends:\n\n• 15% improvement in energy efficiency over the last quarter\n• Peak consumption occurs during manufacturing shifts (8am-6pm)\n• Facility A shows 20% higher consumption than similar facilities\n\nRecommendations:\n• Investigate equipment efficiency at Facility A\n• Consider load balancing during peak hours\n• Implement smart energy management systems"
          break
        case "/compare":
          content = "Comparison Analysis:\n\nScope 1 Emissions vs Scope 2 Emissions (2023 vs 2022):\n\n**Scope 1 (Direct):**\n• 2023: 1,250 tCO2e (-8% vs 2022)\n• 2022: 1,360 tCO2e\n\n**Scope 2 (Indirect):**\n• 2023: 2,100 tCO2e (-12% vs 2022)\n• 2022: 2,386 tCO2e\n\nKey insights: Both categories show improvement, with Scope 2 showing larger reduction due to renewable energy procurement."
          break
        case "/explain":
          content = "**Materiality Assessment** is a fundamental process in ESG reporting that helps organizations identify and prioritize the most significant environmental, social, and governance topics.\n\n**Key aspects:**\n• Stakeholder importance vs Business impact analysis\n• Identifies topics that matter most to your business and stakeholders\n• Forms the foundation for ESG strategy and reporting\n• Required by most ESG frameworks (GRI, SASB, CSRD)\n\n**Process:** Stakeholder engagement → Topic identification → Impact assessment → Prioritization matrix → Strategy alignment"
          break
        case "/recommend":
          content = "Energy Efficiency Recommendations for Manufacturing Facilities:\n\n**Immediate actions (0-3 months):**\n• LED lighting retrofit (15-20% energy savings)\n• Equipment maintenance optimization\n• Employee awareness programs\n\n**Medium-term (3-12 months):**\n• Smart building management systems\n• Heat recovery systems\n• Motor efficiency upgrades\n\n**Long-term (1-3 years):**\n• Solar panel installation\n• Energy storage systems\n• Process optimization using IoT\n\n**Expected ROI:** 18-25% energy reduction within 18 months"
          break
        case "/find":
          content = "Found the following documents related to 'sustainability policy 2023':\n\n📄 **Sustainability Policy v2.3** (Updated: Oct 2023)\n   - Comprehensive ESG commitments and targets\n   - Location: /documents/policies/sustainability-policy-2023.pdf\n\n📊 **Sustainability Performance Report Q3 2023**\n   - Quarterly progress against targets\n   - Location: /reports/quarterly/sustainability-q3-2023.pdf\n\n📋 **Policy Implementation Guidelines**\n   - Step-by-step implementation procedures\n   - Location: /documents/guidelines/policy-implementation-2023.docx"
          break
        case "/summarize":
          content = "**Summary: Quarterly ESG Report Q3 2023**\n\n**Key Highlights:**\n• 18% reduction in Scope 1&2 emissions YTD\n• 92% renewable energy procurement achieved\n• Employee engagement score: 8.2/10 (+0.5 vs Q2)\n• Zero workplace injuries for 180+ days\n\n**Challenges:**\n• Scope 3 emissions tracking still developing\n• Water usage increased 5% due to production growth\n\n**Next Steps:**\n• Implement supplier engagement program\n• Water efficiency improvement initiatives\n• Continue renewable energy expansion"
          break
        case "/draft":
          content = "**Draft Email: Quarterly Results to Stakeholders**\n\nSubject: Strong ESG Progress in Q3 2023 - Key Achievements & Next Steps\n\nDear Stakeholders,\n\nI'm pleased to share our Q3 2023 ESG performance highlights:\n\n**Environmental Excellence:**\n• Achieved 18% reduction in operational emissions\n• Reached 92% renewable energy usage\n• Maintained zero waste to landfill status\n\n**Social Impact:**\n• 180+ days without workplace injuries\n• Enhanced employee engagement (8.2/10 rating)\n• Expanded community investment programs\n\n**Governance:**\n• Strengthened ESG oversight and reporting\n• Enhanced supply chain sustainability requirements\n\nWe remain committed to our 2030 targets and appreciate your continued support.\n\nBest regards,\n[Your name]"
          break
        default:
          content = `I understand you're using the command "${userMessage.command}". While I recognize this command, I need more specific parameters to provide a detailed response. Please refer to the command suggestions for proper syntax.`
      }
    } else {
      // General AI response
      content = "Thank you for your question. I'm analyzing the information available in your ESG platform to provide the most relevant insights. Based on your current data and context, I can help you with analytics, explanations, recommendations, and document searches. Feel free to use specific commands (starting with /) for more targeted assistance."
    }

    return {
      id: Date.now().toString(),
      type: "assistant",
      content,
      timestamp: new Date()
    }
  }

  const handleInputChange = (value: string) => {
    setInputValue(value)
    setShowCommandSuggestions(value.startsWith("/") && value.length > 1)
  }

  const handleCommandSelect = (command: string, example: string) => {
    setInputValue(example)
    setShowCommandSuggestions(false)
    inputRef.current?.focus()
  }

  const handleFeedback = (messageId: string, feedback: "positive" | "negative") => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, feedback } : msg
    ))
  }

  const handleSaveInsight = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, saved: true } : msg
    ))
    // Here you would implement actual saving to knowledge base
  }

  const handleExportConversation = () => {
    const conversationText = messages
      .map(msg => `[${msg.timestamp.toLocaleString()}] ${msg.type.toUpperCase()}: ${msg.content}`)
      .join('\n\n')
    
    const blob = new Blob([conversationText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ai-conversation-${new Date().toISOString().split('T')[0]}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const filteredCommandSuggestions = COMMAND_SUGGESTIONS.filter(cmd =>
    cmd.command.toLowerCase().includes(inputValue.toLowerCase().slice(1))
  )

  return (
    <>
      {/* Global floating button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              size="lg"
              className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-primary hover:bg-primary/90"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:w-[500px] p-0 flex flex-col h-full">
            <SheetHeader className="p-6 pb-4">
              <SheetTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                ESG AI Assistant
              </SheetTitle>
              <SheetDescription>
                Get instant help with your ESG data, analysis, and reporting
              </SheetDescription>
            </SheetHeader>
            
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Context Panel */}
              <Collapsible open={isContextExpanded} onOpenChange={setIsContextExpanded}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between p-4 h-auto">
                    <span className="font-medium">Current Context</span>
                    {isContextExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-4 pb-4 space-y-2">
                    {MOCK_CONTEXT.map((item, index) => (
                      <div key={index} className="flex items-start gap-2 p-2 rounded bg-muted/50">
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{item.title}</div>
                          <div className="text-xs text-muted-foreground">{item.description}</div>
                          {item.value && (
                            <div className="text-xs font-medium text-primary">{item.value}</div>
                          )}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {item.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
              
              <Separator />
              
              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[80%] rounded-lg p-3 ${
                        message.type === "user" 
                          ? "bg-primary text-primary-foreground ml-auto" 
                          : "bg-muted"
                      }`}>
                        {message.command && (
                          <Badge variant="outline" className="mb-2 text-xs">
                            {message.command}
                          </Badge>
                        )}
                        <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                        {message.attachments && (
                          <div className="mt-2 flex items-center gap-1 text-xs opacity-75">
                            <Paperclip className="h-3 w-3" />
                            {message.attachments[0].name}
                          </div>
                        )}
                        <div className="text-xs opacity-50 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                        
                        {/* AI Message Actions */}
                        {message.type === "assistant" && message.id !== "welcome" && (
                          <div className="flex items-center gap-1 mt-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              className={`h-6 w-6 p-0 ${message.feedback === "positive" ? "text-green-600" : ""}`}
                              onClick={() => handleFeedback(message.id, "positive")}
                            >
                              <ThumbsUp className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className={`h-6 w-6 p-0 ${message.feedback === "negative" ? "text-red-600" : ""}`}
                              onClick={() => handleFeedback(message.id, "negative")}
                            >
                              <ThumbsDown className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className={`h-6 w-6 p-0 ${message.saved ? "text-blue-600" : ""}`}
                              onClick={() => handleSaveInsight(message.id)}
                            >
                              <Save className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0"
                              onClick={() => navigator.clipboard.writeText(message.content)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex gap-3 justify-start">
                      <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                        <div className="flex items-center gap-2">
                          <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
                          <span className="text-sm text-muted-foreground">AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              
              {/* Command Suggestions */}
              {showCommandSuggestions && filteredCommandSuggestions.length > 0 && (
                <div className="border-t bg-muted/30 p-2 max-h-48 overflow-y-auto">
                  <div className="text-xs font-medium text-muted-foreground mb-2">Command Suggestions:</div>
                  <div className="space-y-1">
                    {filteredCommandSuggestions.map((cmd, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start h-auto p-2"
                        onClick={() => handleCommandSelect(cmd.command, cmd.example)}
                      >
                        <cmd.icon className="h-4 w-4 mr-2 flex-shrink-0" />
                        <div className="text-left min-w-0 flex-1">
                          <div className="font-medium text-sm">{cmd.command}</div>
                          <div className="text-xs text-muted-foreground truncate">{cmd.description}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Input Area */}
              <div className="border-t p-4 space-y-2">
                {selectedFile && (
                  <div className="flex items-center justify-between bg-muted rounded p-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <Paperclip className="h-4 w-4 flex-shrink-0" />
                      <span className="text-sm truncate">{selectedFile.name}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0 flex-shrink-0"
                      onClick={() => setSelectedFile(null)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Input
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => handleInputChange(e.target.value)}
                      placeholder="Ask me anything or use / for commands..."
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                      className="pr-8"
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute right-1 top-1 h-6 w-6 p-0"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Paperclip className="h-3 w-3" />
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      onChange={handleFileSelect}
                      accept=".pdf,.doc,.docx,.txt,.csv,.xlsx"
                    />
                  </div>
                  <Button onClick={handleSendMessage} disabled={!inputValue.trim() && !selectedFile}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex justify-between">
                  <Button variant="ghost" size="sm" onClick={handleExportConversation}>
                    <Download className="h-3 w-3 mr-1" />
                    Export
                  </Button>
                  <div className="text-xs text-muted-foreground">
                    Press Enter to send, Shift+Enter for new line
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
} 