import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Users } from "lucide-react"

interface Member {
  id: string
  name: string
  preferences: {
    availableDates: Array<{ start: string; end: string }>
  }
}

interface AvailabilityCalendarProps {
  members: Member[]
  commonAvailability: Array<{ start: string; end: string }>
  selectedMemberId: string | null
}

export function AvailabilityCalendar({ members, commonAvailability, selectedMemberId }: AvailabilityCalendarProps) {
  const [month, setMonth] = useState<Date>(new Date(2025, 5, 1)) // June 2025

  // Function to determine if a date is within a range
  const isDateInRange = (date: Date, ranges: Array<{ start: string; end: string }>) => {
    return ranges.some((range) => {
      const start = new Date(range.start)
      const end = new Date(range.end)
      return date >= start && date <= end
    })
  }

  // Function to determine how many members are available on a given date
  const getMemberCountForDate = (date: Date) => {
    return members.filter((member) => isDateInRange(date, member.preferences.availableDates)).length
  }

  // Get the dates for the selected member or common availability
  const getHighlightedDates = () => {
    if (selectedMemberId) {
      const selectedMember = members.find((m) => m.id === selectedMemberId)
      return selectedMember ? selectedMember.preferences.availableDates : []
    }
    return commonAvailability
  }

  const highlightedDates = getHighlightedDates()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            {selectedMemberId
              ? `${members.find((m) => m.id === selectedMemberId)?.name}'s Availability`
              : "Group Availability"}
          </CardTitle>
          <CardDescription>
            {selectedMemberId ? "Individual availability dates" : "Dates when everyone is available"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
            <div className="flex-1">
              <Calendar
                mode="multiple"
                month={month}
                onMonthChange={setMonth}
                selected={highlightedDates.flatMap((range) => {
                  const dates = []
                  const start = new Date(range.start)
                  const end = new Date(range.end)
                  for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
                    dates.push(new Date(date))
                  }
                  return dates
                })}
                className="rounded-md border mx-auto max-w-full"
                modifiers={{
                  highlight: (date) => {
                    // Only highlight dates that are in the common availability or selected member's availability
                    return isDateInRange(date, highlightedDates)
                  },
                }}
                modifiersClassNames={{
                  highlight:
                    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                }}
                components={{
                  Day: (props) => {
                    const date = props.date
                    const isHighlighted = isDateInRange(date, highlightedDates)

                    // Only show member count for group view
                    const memberCount = !selectedMemberId ? getMemberCountForDate(date) : null

                    return (
                      <div
                        className={`relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center p-0 font-normal aria-selected:opacity-100 ${
                          isHighlighted ? "font-medium" : ""
                        }`}
                        {...props}
                      >
                        {props.date.getDate()}
                        {memberCount !== null && memberCount > 0 && !isHighlighted && (
                          <div className="absolute bottom-1 right-1 h-1.5 w-1.5 rounded-full bg-primary/50" />
                        )}
                      </div>
                    )
                  },
                }}
              />
            </div>

            <div className="md:w-64 space-y-4 mt-4 md:mt-0">
              <div>
                <h3 className="text-sm font-medium mb-2">Best Dates for Everyone</h3>
                <div className="space-y-2">
                  {commonAvailability.length > 0 ? (
                    commonAvailability.map((range, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <Badge variant="outline" className="bg-primary/10 text-primary">
                          <Users className="h-3 w-3 mr-1" />
                          {members.length} members
                        </Badge>
                        <span>
                          {new Date(range.start).toLocaleDateString()} - {new Date(range.end).toLocaleDateString()}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No common dates found</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Legend</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-4 w-4 rounded-sm bg-primary" />
                    <span>
                      {selectedMemberId
                        ? `${members.find((m) => m.id === selectedMemberId)?.name} is available`
                        : "Everyone is available"}
                    </span>
                  </div>
                  {!selectedMemberId && (
                    <div className="flex items-center gap-2 text-sm">
                      <div className="relative h-4 w-4 rounded-sm border">
                        <div className="absolute bottom-0.5 right-0.5 h-1.5 w-1.5 rounded-full bg-primary/50" />
                      </div>
                      <span>Some members are available</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-4 w-4 rounded-sm border" />
                    <span>No availability</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

