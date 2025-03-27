"use client"

import { useState } from "react"
import { CalendarIcon, MapPinIcon, TagIcon } from "lucide-react"
import { GroupHeader } from "@/components/group/group-header"
import { MembersList } from "@/components/group/members-list"
import { AvailabilityCalendar } from "@/components/group/availability-calendar"
import { PopularTags } from "@/components/group/popular-tags"
import { RecommendedLocations } from "@/components/group/recommended"
import { UserPreferencesDialog } from "@/components/group/user-preferences"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

export function GroupDashboard() {
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null)
  const [userDialogOpen, setUserDialogOpen] = useState(false)
  const [selectedUserForDialog, setSelectedUserForDialog] = useState<string | null>(null)

  // Mock data - in a real app, this would come from your API
  const groupData = {
    id: "group-1",
    name: "Summer Adventure 2025",
    createdAt: "2025-01-15T12:00:00Z",
    members: [
      {
        id: "user-1",
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "leader",
        preferences: {
          availableDates: [
            { start: "2025-06-01", end: "2025-06-15" },
            { start: "2025-07-10", end: "2025-07-25" },
          ],
          tags: [
            "beach",
            "hiking",
            "culture",
            "food",
            "photography",
            "snorkeling",
            "history",
            "local cuisine",
            "mountains",
          ],
          budget: { min: 800, max: 1200, currency: "USD" },
        },
      },
      {
        id: "user-2",
        name: "Jamie Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "member",
        preferences: {
          availableDates: [
            { start: "2025-06-05", end: "2025-06-20" },
            { start: "2025-07-15", end: "2025-07-30" },
          ],
          tags: [
            "beach",
            "relaxation",
            "luxury",
            "nightlife",
            "shopping",
            "spa",
            "fine dining",
            "resorts",
            "cocktails",
          ],
          budget: { min: 1000, max: 1500, currency: "USD" },
        },
      },
      {
        id: "user-3",
        name: "Taylor Wong",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "member",
        preferences: {
          availableDates: [
            { start: "2025-06-10", end: "2025-06-25" },
            { start: "2025-07-05", end: "2025-07-20" },
          ],
          tags: [
            "hiking",
            "nature",
            "adventure",
            "budget-friendly",
            "camping",
            "wildlife",
            "trekking",
            "national parks",
            "outdoor activities",
          ],
          budget: { min: 600, max: 1000, currency: "USD" },
        },
      },
      {
        id: "user-4",
        name: "Morgan Lee",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "member",
        preferences: {
          availableDates: [
            { start: "2025-06-01", end: "2025-06-10" },
            { start: "2025-07-15", end: "2025-07-25" },
          ],
          tags: [
            "culture",
            "food",
            "city",
            "museums",
            "art galleries",
            "architecture",
            "history",
            "local cuisine",
            "cafes",
          ],
          budget: { min: 900, max: 1300, currency: "USD" },
        },
      },
    ],
    recommendedLocations: [
      {
        id: "loc-1",
        name: "Bali, Indonesia",
        image: "/bali.webp",
        description:
          "A beautiful island known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs. Perfect for those seeking a mix of relaxation, culture and adventure.",
        matchingTags: ["beach", "culture", "nature", "food", "photography", "hiking", "local cuisine"],
        estimatedCost: { min: 900, max: 1200, currency: "USD" },
        bestDates: { start: "2025-06-10", end: "2025-06-20" },
      },
      {
        id: "loc-2",
        name: "Barcelona, Spain",
        image: "/barcelona.jpg",
        description:
          "A vibrant city with stunning architecture, world-class cuisine, beautiful beaches, and a buzzing nightlife. Ideal for groups with diverse interests.",
        matchingTags: ["beach", "culture", "food", "city", "nightlife", "architecture", "history", "fine dining"],
        estimatedCost: { min: 1000, max: 1400, currency: "USD" },
        bestDates: { start: "2025-07-15", end: "2025-07-25" },
      },
      {
        id: "loc-3",
        name: "Costa Rica",
        image: "/costa-rica.jpg",
        description:
          "A paradise for nature lovers with rainforests, beaches, volcanoes and abundant wildlife. Perfect for adventure seekers and those who appreciate natural beauty.",
        matchingTags: ["beach", "hiking", "nature", "adventure", "wildlife", "outdoor activities", "national parks"],
        estimatedCost: { min: 800, max: 1100, currency: "USD" },
        bestDates: { start: "2025-06-10", end: "2025-06-20" },
      },
    ],
    popularTags: [
      { name: "beach", count: 3 },
      { name: "culture", count: 3 },
      { name: "food", count: 3 },
      { name: "hiking", count: 2 },
      { name: "nature", count: 2 },
      { name: "adventure", count: 2 },
      { name: "history", count: 2 },
      { name: "local cuisine", count: 2 },
      { name: "nightlife", count: 1 },
      { name: "luxury", count: 1 },
      { name: "city", count: 1 },
      { name: "museums", count: 1 },
      { name: "budget-friendly", count: 1 },
      { name: "relaxation", count: 1 },
      { name: "photography", count: 1 },
      { name: "snorkeling", count: 1 },
      { name: "mountains", count: 1 },
      { name: "shopping", count: 1 },
      { name: "spa", count: 1 },
      { name: "fine dining", count: 1 },
      { name: "resorts", count: 1 },
      { name: "cocktails", count: 1 },
      { name: "camping", count: 1 },
      { name: "wildlife", count: 1 },
      { name: "trekking", count: 1 },
      { name: "national parks", count: 1 },
      { name: "outdoor activities", count: 1 },
      { name: "art galleries", count: 1 },
      { name: "architecture", count: 1 },
      { name: "cafes", count: 1 },
    ],
    commonAvailability: [
      { start: "2025-06-10", end: "2025-06-15" },
      { start: "2025-07-15", end: "2025-07-20" },
    ],
  }

  const handleOpenUserDialog = (userId: string) => {
    setSelectedUserForDialog(userId)
    setUserDialogOpen(true)
  }

  const selectedUser = selectedUserForDialog ? groupData.members.find((m) => m.id === selectedUserForDialog) : null

  return (
    <div className="container mx-auto py-4 sm:py-6 px-4 md:px-6">
      <GroupHeader name={groupData.name} createdAt={groupData.createdAt} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-8">
        <div className="lg:col-span-1">
          <MembersList
            members={groupData.members}
            selectedMemberId={selectedMemberId}
            onSelectMember={setSelectedMemberId}
            onViewUserDetails={handleOpenUserDialog}
          />
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="availability" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4 sm:mb-6 w-full">
              <TabsTrigger value="availability" className="flex items-center justify-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Availability</span>
              </TabsTrigger>
              <TabsTrigger value="tags" className="flex items-center justify-center gap-2">
                <TagIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Popular Tags</span>
              </TabsTrigger>
              <TabsTrigger value="locations" className="flex items-center justify-center gap-2">
                <MapPinIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Recommendations</span>
              </TabsTrigger>
            </TabsList>

            <ScrollArea className="h-[calc(100vh-280px)] sm:h-[calc(100vh-300px)]">
              <TabsContent value="availability" className="mt-0">
                <AvailabilityCalendar
                  members={groupData.members}
                  commonAvailability={groupData.commonAvailability}
                  selectedMemberId={selectedMemberId}
                />
              </TabsContent>

              <TabsContent value="tags" className="mt-0">
                <PopularTags
                  tags={groupData.popularTags}
                  members={groupData.members}
                  selectedMemberId={selectedMemberId}
                />
              </TabsContent>

              <TabsContent value="locations" className="mt-0">
                <RecommendedLocations locations={groupData.recommendedLocations} members={groupData.members} />
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </div>
      </div>

      {selectedUser && (
        <UserPreferencesDialog user={selectedUser} open={userDialogOpen} onOpenChange={setUserDialogOpen} />
      )}
    </div>
  )
}

