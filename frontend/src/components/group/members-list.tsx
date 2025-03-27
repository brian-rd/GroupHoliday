import { useState } from "react"
import { ChevronRight, Crown, Eye, User, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Member {
  id: string
  name: string
  avatar: string
  role: string
  preferences: {
    availableDates: Array<{ start: string; end: string }>
    tags: string[]
    budget: { min: number; max: number; currency: string }
  }
}

interface MembersListProps {
  members: Member[]
  selectedMemberId: string | null
  onSelectMember: (id: string | null) => void
  onViewUserDetails: (id: string) => void
}

export function MembersList({ members, selectedMemberId, onSelectMember, onViewUserDetails }: MembersListProps) {
  const [expandedMemberId, setExpandedMemberId] = useState<string | null>(null)

  const toggleMember = (id: string) => {
    if (expandedMemberId === id) {
      setExpandedMemberId(null)
    } else {
      setExpandedMemberId(id)
    }
  }

  const handleSelectMember = (id: string) => {
    onSelectMember(selectedMemberId === id ? null : id)
  }

  return (
    <Card className="h-full">
      <CardHeader className="sm:pb-2">
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Group Members
        </CardTitle>
        <CardDescription>{members.length} members in this group</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[300px] lg:h-[calc(100vh-280px)]">
          <div className="space-y-1 p-3 sm:p-4">
            {members.map((member) => (
              <Collapsible
                key={member.id}
                open={expandedMemberId === member.id}
                onOpenChange={() => toggleMember(member.id)}
                className="w-full"
              >
                <div
                  className={`flex items-center justify-between rounded-md p-2 transition-colors ${
                    selectedMemberId === member.id ? "bg-primary/10" : "hover:bg-muted"
                  }`}
                >
                  <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    <Avatar className="h-7 w-7 sm:h-8 sm:w-8 border border-border">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <span className="font-medium truncate">{member.name}</span>
                        {member.role === "leader" && (
                          <Crown className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-500 flex-shrink-0" />
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground capitalize">{member.role}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                            onClick={(e) => {
                              e.stopPropagation()
                              onViewUserDetails(member.id)
                            }}
                          >
                            <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View details</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleSelectMember(member.id)
                            }}
                          >
                            <User
                              className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${
                                selectedMemberId === member.id ? "text-primary" : "text-muted-foreground"
                              }`}
                            />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{selectedMemberId === member.id ? "Deselect" : "Select"} member</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-7 w-7 sm:h-8 sm:w-8 p-0">
                        <ChevronRight
                          className={`h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform ${
                            expandedMemberId === member.id ? "rotate-90" : ""
                          }`}
                        />
                        <span className="sr-only">Toggle preferences</span>
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </div>
                <CollapsibleContent className="overflow-hidden">
                  <div className="space-y-3 px-3 sm:px-4 py-3 text-sm">
                    <div>
                      <h4 className="font-medium">Available Dates</h4>
                      <ul className="mt-1 space-y-1 text-muted-foreground">
                        {member.preferences.availableDates.map((date, i) => (
                          <li key={i} className="text-xs">
                            {new Date(date.start).toLocaleDateString()} - {new Date(date.end).toLocaleDateString()}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium">Preferences</h4>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {member.preferences.tags.slice(0, 5).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {member.preferences.tags.length > 5 && (
                          <Badge variant="outline" className="text-xs">
                            +{member.preferences.tags.length - 5} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">Budget</h4>
                      <p className="mt-1 text-muted-foreground text-xs">
                        {member.preferences.budget.currency} {member.preferences.budget.min.toLocaleString()} -{" "}
                        {member.preferences.budget.max.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

