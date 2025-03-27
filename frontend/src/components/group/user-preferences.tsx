"use client"

import { CalendarIcon, DollarSign, TagIcon, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

interface User {
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

interface UserPreferencesDialogProps {
  user: User
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UserPreferencesDialog({ user, open, onOpenChange }: UserPreferencesDialogProps) {
  const [month, setMonth] = useState<Date>(new Date(2025, 5, 1)) // June 2025

  // Function to determine if a date is within a range
  const isDateInRange = (date: Date, ranges: Array<{ start: string; end: string }>) => {
    return ranges.some((range) => {
      const start = new Date(range.start)
      const end = new Date(range.end)
      return date >= start && date <= end
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2 space-y-3">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 border-2 border-primary/20">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-lg">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <DialogTitle className="text-xl">{user.name}</DialogTitle>
              <DialogDescription className="capitalize">{user.role}</DialogDescription>
            </div>
            <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </DialogHeader>

        <Tabs defaultValue="availability" className="w-full">
          <div className="px-6">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="availability" className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                <span>Availability</span>
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center gap-2">
                <TagIcon className="h-4 w-4" />
                <span>Preferences</span>
              </TabsTrigger>
              <TabsTrigger value="budget" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span>Budget</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="max-h-[70vh]">
            <div className="p-6 pt-4">
              <TabsContent value="availability" className="mt-0 space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Available Date Ranges</h3>
                  <div className="space-y-2">
                    {user.preferences.availableDates.map((date, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm p-2 bg-muted/50 rounded-md">
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {new Date(date.start).toLocaleDateString(undefined, {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}{" "}
                          -{" "}
                          {new Date(date.end).toLocaleDateString(undefined, {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Calendar View</h3>
                  <div className="border rounded-md p-3 bg-card">
                    <Calendar
                      mode="multiple"
                      month={month}
                      onMonthChange={setMonth}
                      selected={user.preferences.availableDates.flatMap((range) => {
                        const dates = []
                        const start = new Date(range.start)
                        const end = new Date(range.end)
                        for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
                          dates.push(new Date(date))
                        }
                        return dates
                      })}
                      className="mx-auto"
                      modifiers={{
                        highlight: (date) => isDateInRange(date, user.preferences.availableDates),
                      }}
                      modifiersClassNames={{
                        highlight:
                          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                      }}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="preferences" className="mt-0 space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-3">Travel Preferences</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.preferences.tags.map((tag) => (
                      <Badge key={tag} className="capitalize py-1.5 px-3">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="space-y-2 col-span-2 sm:col-span-1">
                    <h4 className="text-sm font-medium">Accommodation Preferences</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      {user.preferences.tags.some((t) => ["luxury", "resorts", "spa"].includes(t)) ? (
                        <p>Prefers luxury accommodations and resorts</p>
                      ) : user.preferences.tags.some((t) => ["budget-friendly", "camping"].includes(t)) ? (
                        <p>Prefers budget-friendly options and camping</p>
                      ) : (
                        <p>No specific accommodation preferences</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 col-span-2 sm:col-span-1">
                    <h4 className="text-sm font-medium">Activity Level</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      {user.preferences.tags.some((t) =>
                        ["hiking", "adventure", "trekking", "outdoor activities"].includes(t),
                      ) ? (
                        <p>Prefers active and adventurous activities</p>
                      ) : user.preferences.tags.some((t) => ["relaxation", "spa"].includes(t)) ? (
                        <p>Prefers relaxation and low-intensity activities</p>
                      ) : (
                        <p>Balanced activity level</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2 sm:col-span-1">
                    <h4 className="text-sm font-medium">Environment</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      {user.preferences.tags.some((t) => ["beach", "snorkeling"].includes(t)) && (
                        <p>Enjoys beach destinations</p>
                      )}
                      {user.preferences.tags.some((t) => ["mountains", "hiking", "nature"].includes(t)) && (
                        <p>Enjoys mountain and nature settings</p>
                      )}
                      {user.preferences.tags.some((t) => ["city", "museums", "architecture"].includes(t)) && (
                        <p>Enjoys urban environments</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 col-span-2 sm:col-span-1">
                    <h4 className="text-sm font-medium">Interests</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      {user.preferences.tags.some((t) => ["food", "local cuisine", "fine dining"].includes(t)) && (
                        <p>Food enthusiast</p>
                      )}
                      {user.preferences.tags.some((t) =>
                        ["culture", "history", "museums", "art galleries"].includes(t),
                      ) && <p>Cultural explorer</p>}
                      {user.preferences.tags.some((t) => ["photography", "wildlife"].includes(t)) && (
                        <p>Photography and wildlife enthusiast</p>
                      )}
                      {user.preferences.tags.some((t) => ["nightlife", "cocktails"].includes(t)) && (
                        <p>Enjoys nightlife and entertainment</p>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="budget" className="mt-0 space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-3">Budget Range</h3>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-semibold">
                        {user.preferences.budget.currency} {user.preferences.budget.min.toLocaleString()} -{" "}
                        {user.preferences.budget.max.toLocaleString()}
                      </span>
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>

                    <div className="relative h-4 w-full bg-muted rounded-full overflow-hidden mt-4">
                      <div
                        className="absolute h-full bg-primary/30"
                        style={{
                          left: "0%",
                          width: "100%",
                        }}
                      />
                      <div
                        className="absolute h-full bg-primary"
                        style={{
                          left: `${(user.preferences.budget.min / 2000) * 100}%`,
                          width: `${((user.preferences.budget.max - user.preferences.budget.min) / 2000) * 100}%`,
                        }}
                      />
                    </div>

                    <div className="flex justify-between text-xs mt-1 text-muted-foreground">
                      <span>$0</span>
                      <span>$500</span>
                      <span>$1000</span>
                      <span>$1500</span>
                      <span>$2000</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Budget Breakdown</h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="p-3 bg-muted/30 rounded-md">
                        <p className="font-medium">Accommodation</p>
                        <p className="text-muted-foreground">
                          ~{user.preferences.budget.currency}{" "}
                          {Math.round(user.preferences.budget.max * 0.4).toLocaleString()}
                          <span className="text-xs"> (40%)</span>
                        </p>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-md">
                        <p className="font-medium">Transportation</p>
                        <p className="text-muted-foreground">
                          ~{user.preferences.budget.currency}{" "}
                          {Math.round(user.preferences.budget.max * 0.25).toLocaleString()}
                          <span className="text-xs"> (25%)</span>
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="p-3 bg-muted/30 rounded-md">
                        <p className="font-medium">Food & Dining</p>
                        <p className="text-muted-foreground">
                          ~{user.preferences.budget.currency}{" "}
                          {Math.round(user.preferences.budget.max * 0.2).toLocaleString()}
                          <span className="text-xs"> (20%)</span>
                        </p>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-md">
                        <p className="font-medium">Activities</p>
                        <p className="text-muted-foreground">
                          ~{user.preferences.budget.currency}{" "}
                          {Math.round(user.preferences.budget.max * 0.15).toLocaleString()}
                          <span className="text-xs"> (15%)</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Notes</h3>
                  <p className="text-sm text-muted-foreground">
                    {user.preferences.tags.includes("luxury")
                      ? "Prefers to spend more on premium experiences and accommodations."
                      : user.preferences.tags.includes("budget-friendly")
                        ? "Prefers budget-friendly options to maximize value."
                        : "Has a balanced approach to spending on travel."}
                  </p>
                </div>
              </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

