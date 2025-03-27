import { CardDescription } from "@/components/ui/card"
import { useState } from "react"
import { MapPinIcon, CalendarIcon, DollarSign, Tag } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"


interface Location {
  id: string
  name: string
  image: string
  description: string
  matchingTags: string[]
  estimatedCost: { min: number; max: number; currency: string }
  bestDates: { start: string; end: string }
}

interface Member {
  id: string
  name: string
  preferences: {
    budget: { min: number; max: number; currency: string }
  }
}

interface RecommendedLocationsProps {
  locations: Location[]
  members: Member[]
}

export function RecommendedLocations({ locations, members }: RecommendedLocationsProps) {
  const [selectedLocationId, setSelectedLocationId] = useState<string>(locations[0]?.id)

  const selectedLocation = locations.find((loc) => loc.id === selectedLocationId)

  // Calculate average budget across all members
  const avgBudget = {
    min: Math.round(members.reduce((sum, m) => sum + m.preferences.budget.min, 0) / members.length),
    max: Math.round(members.reduce((sum, m) => sum + m.preferences.budget.max, 0) / members.length),
    currency: members[0].preferences.budget.currency,
  }

  // Check if location is within budget
  const isWithinBudget = (location: Location) => {
    return location.estimatedCost.min <= avgBudget.max && location.estimatedCost.max >= avgBudget.min
  }

  return (
    <div className="space-y-6">
      <Tabs value={selectedLocationId} onValueChange={setSelectedLocationId}>
        <TabsList className="flex h-auto p-0 bg-transparent space-x-2 mb-6 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {locations.map((location) => (
            <TabsTrigger
              key={location.id}
              value={location.id}
              className={`flex-shrink-0 h-20 sm:h-24 w-32 sm:w-40 p-0 rounded-lg overflow-hidden border ${
                selectedLocationId === location.id ? "ring-2 ring-primary" : ""
              }`}
            >
              <div className="relative h-full w-full">
                <img
                  src={location.image || "/placeholder.svg"}
                  alt={location.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute bottom-0 left-0 right-0 p-2">
                  <p className="text-white text-sm font-medium truncate">{location.name}</p>
                </div>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        {selectedLocation && (
          <TabsContent value={selectedLocation.id} className="mt-0">
            <Card>
              <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                <img
                  src={selectedLocation.image || "/placeholder.svg"}
                  alt={selectedLocation.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MapPinIcon className="h-5 w-5" />
                    {selectedLocation.name}
                  </CardTitle>
                  <Badge variant={isWithinBudget(selectedLocation) ? "default" : "destructive"} className="ml-2">
                    {isWithinBudget(selectedLocation) ? "Within Budget" : "Over Budget"}
                  </Badge>
                </div>
                <CardDescription>AI recommended based on group preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-sm text-muted-foreground">{selectedLocation.description}</p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium flex items-center gap-1">
                      <Tag className="h-4 w-4" />
                      Matching Preferences
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {selectedLocation.matchingTags.map((tag) => (
                        <Badge key={tag} variant="outline" className="capitalize">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium flex items-center gap-1">
                      <CalendarIcon className="h-4 w-4" />
                      Best Dates
                    </h3>
                    <p className="text-sm">
                      {new Date(selectedLocation.bestDates.start).toLocaleDateString()} -{" "}
                      {new Date(selectedLocation.bestDates.end).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                    <h3 className="text-sm font-medium flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      Estimated Cost
                    </h3>
                    <div className="space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">Location:</span> {selectedLocation.estimatedCost.currency}{" "}
                        {selectedLocation.estimatedCost.min.toLocaleString()} -{" "}
                        {selectedLocation.estimatedCost.max.toLocaleString()}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Group Budget:</span> {avgBudget.currency}{" "}
                        {avgBudget.min.toLocaleString()} - {avgBudget.max.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Budget Compatibility</h3>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block text-primary">
                          Group Budget vs. Location Cost
                        </span>
                      </div>
                    </div>
                    <div className="relative h-10 mb-6">
                      {/* Budget scale line */}
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-muted" />

                      {/* Group budget bar */}
                      <div
                        className="absolute h-4 rounded-full bg-primary/30 border border-primary/50"
                        style={{
                          left: `${Math.max(0, Math.min(100, (avgBudget.min / 2000) * 100))}%`,
                          width: `${Math.max(5, Math.min(100, ((avgBudget.max - avgBudget.min) / 2000) * 100))}%`,
                          top: "0",
                        }}
                      />

                      {/* Location cost bar */}
                      <div
                        className="absolute h-4 rounded-full bg-primary border border-primary"
                        style={{
                          left: `${Math.max(0, Math.min(100, (selectedLocation.estimatedCost.min / 2000) * 100))}%`,
                          width: `${Math.max(5, Math.min(100, ((selectedLocation.estimatedCost.max - selectedLocation.estimatedCost.min) / 2000) * 100))}%`,
                          bottom: "0",
                        }}
                      />
                    </div>

                    <div className="flex justify-between text-xs">
                      <span>$0</span>
                      <span>$500</span>
                      <span>$1000</span>
                      <span>$1500</span>
                      <span>$2000+</span>
                    </div>

                    <div className="flex items-center justify-center gap-4 mt-4">
                      <div className="flex items-center gap-1">
                        <div className="h-3 w-3 bg-primary/30 border border-primary/50 rounded-sm" />
                        <span className="text-xs">Group Budget</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="h-3 w-3 bg-primary border border-primary rounded-sm" />
                        <span className="text-xs">Location Cost</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}

