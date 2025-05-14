import { Button } from "@/components/ui/button"
import { ChevronRight, FolderOpen, Star } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function MetricBrowser() {
  return (
    <div className="p-2">
      <Accordion type="multiple" defaultValue={["environmental"]}>
        <AccordionItem value="environmental">
          <AccordionTrigger className="py-2 text-sm">
            <div className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4 text-primary" />
              Environmental
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Accordion type="multiple" defaultValue={["emissions"]}>
              <AccordionItem value="emissions" className="border-0">
                <AccordionTrigger className="py-1.5 text-sm">
                  <div className="flex items-center gap-2 pl-4">
                    <FolderOpen className="h-3.5 w-3.5 text-muted-foreground" />
                    Emissions
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-1 pl-8">
                    <div className="flex items-center justify-between rounded-md p-1.5 hover:bg-muted/50">
                      <span className="text-xs">Scope 1 Emissions</span>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Star className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ChevronRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-md p-1.5 hover:bg-muted/50">
                      <span className="text-xs">Scope 2 Emissions</span>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Star className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ChevronRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-md p-1.5 hover:bg-muted/50">
                      <span className="text-xs">Scope 3 Emissions</span>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Star className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ChevronRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-md p-1.5 hover:bg-muted/50">
                      <span className="text-xs">Carbon Intensity</span>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Star className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ChevronRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="energy" className="border-0">
                <AccordionTrigger className="py-1.5 text-sm">
                  <div className="flex items-center gap-2 pl-4">
                    <FolderOpen className="h-3.5 w-3.5 text-muted-foreground" />
                    Energy
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-1 pl-8">
                    <div className="flex items-center justify-between rounded-md p-1.5 hover:bg-muted/50">
                      <span className="text-xs">Total Energy Consumption</span>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Star className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ChevronRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-md p-1.5 hover:bg-muted/50">
                      <span className="text-xs">Renewable Energy %</span>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Star className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ChevronRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-md p-1.5 hover:bg-muted/50">
                      <span className="text-xs">Energy Intensity</span>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Star className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ChevronRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="water" className="border-0">
                <AccordionTrigger className="py-1.5 text-sm">
                  <div className="flex items-center gap-2 pl-4">
                    <FolderOpen className="h-3.5 w-3.5 text-muted-foreground" />
                    Water
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-1 pl-8">
                    <div className="flex items-center justify-between rounded-md p-1.5 hover:bg-muted/50">
                      <span className="text-xs">Water Withdrawal</span>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Star className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ChevronRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-md p-1.5 hover:bg-muted/50">
                      <span className="text-xs">Water Discharge</span>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Star className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ChevronRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-md p-1.5 hover:bg-muted/50">
                      <span className="text-xs">Water Intensity</span>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Star className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ChevronRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="social">
          <AccordionTrigger className="py-2 text-sm">
            <div className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4 text-primary" />
              Social
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Accordion type="multiple">
              <AccordionItem value="workforce" className="border-0">
                <AccordionTrigger className="py-1.5 text-sm">
                  <div className="flex items-center gap-2 pl-4">
                    <FolderOpen className="h-3.5 w-3.5 text-muted-foreground" />
                    Workforce
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-1 pl-8">
                    <div className="flex items-center justify-between rounded-md p-1.5 hover:bg-muted/50">
                      <span className="text-xs">Gender Diversity</span>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Star className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ChevronRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-md p-1.5 hover:bg-muted/50">
                      <span className="text-xs">Training Hours</span>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Star className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ChevronRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-md p-1.5 hover:bg-muted/50">
                      <span className="text-xs">Employee Turnover</span>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Star className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ChevronRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="community" className="border-0">
                <AccordionTrigger className="py-1.5 text-sm">
                  <div className="flex items-center gap-2 pl-4">
                    <FolderOpen className="h-3.5 w-3.5 text-muted-foreground" />
                    Community
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-1 pl-8">
                    <div className="flex items-center justify-between rounded-md p-1.5 hover:bg-muted/50">
                      <span className="text-xs">Community Investment</span>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Star className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ChevronRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-md p-1.5 hover:bg-muted/50">
                      <span className="text-xs">Volunteer Hours</span>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Star className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ChevronRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="governance">
          <AccordionTrigger className="py-2 text-sm">
            <div className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4 text-primary" />
              Governance
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Accordion type="multiple">
              <AccordionItem value="board" className="border-0">
                <AccordionTrigger className="py-1.5 text-sm">
                  <div className="flex items-center gap-2 pl-4">
                    <FolderOpen className="h-3.5 w-3.5 text-muted-foreground" />
                    Board
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-1 pl-8">
                    <div className="flex items-center justify-between rounded-md p-1.5 hover:bg-muted/50">
                      <span className="text-xs">Board Diversity</span>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Star className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ChevronRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-md p-1.5 hover:bg-muted/50">
                      <span className="text-xs">Board Independence</span>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Star className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ChevronRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="ethics" className="border-0">
                <AccordionTrigger className="py-1.5 text-sm">
                  <div className="flex items-center gap-2 pl-4">
                    <FolderOpen className="h-3.5 w-3.5 text-muted-foreground" />
                    Ethics
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-1 pl-8">
                    <div className="flex items-center justify-between rounded-md p-1.5 hover:bg-muted/50">
                      <span className="text-xs">Code of Conduct Violations</span>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Star className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ChevronRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-md p-1.5 hover:bg-muted/50">
                      <span className="text-xs">Whistleblower Reports</span>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Star className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ChevronRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
