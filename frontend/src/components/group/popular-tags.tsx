import { useState } from "react"
import { TagIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Tag {
  name: string
  count: number
}

interface Member {
  id: string
  name: string
  preferences: {
    tags: string[]
  }
}

interface PopularTagsProps {
  tags: Tag[]
  members: Member[]
  selectedMemberId: string | null
}

export function PopularTags({ tags, members, selectedMemberId }: PopularTagsProps) {
  const [view, setView] = useState<"cloud" | "chart">("cloud")

  // Get tags for the selected member or all tags
  const displayTags = selectedMemberId
    ? members.find((m) => m.id === selectedMemberId)?.preferences.tags.map((tag) => ({ name: tag, count: 1 })) || []
    : tags

  // Calculate the maximum count for scaling
  const maxCount = Math.max(...displayTags.map((tag) => tag.count), 1)

  // Sort tags by count (descending)
  const sortedTags = [...displayTags].sort((a, b) => b.count - a.count)

  return (
    <Card>
      <CardHeader className="sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <TagIcon className="h-5 w-5" />
            {selectedMemberId
              ? `${members.find((m) => m.id === selectedMemberId)?.name}'s Preferences`
              : "Popular Tags"}
          </CardTitle>
          <CardDescription>
            {selectedMemberId ? "Individual preferences" : "Most popular preferences among all members"}
          </CardDescription>
        </div>
        <Tabs value={view} onValueChange={(v) => setView(v as "cloud" | "chart")} className="mt-3 sm:mt-0">
          <TabsList className="h-8 w-full sm:w-auto">
            <TabsTrigger value="cloud" className="flex-1 sm:flex-initial text-xs px-3">
              Tag Cloud
            </TabsTrigger>
            <TabsTrigger value="chart" className="flex-1 sm:flex-initial text-xs px-3">
              Chart
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <TabsContent value="cloud" className="mt-0">
          <div className="flex flex-wrap gap-2 py-4 justify-center sm:justify-start">
            {sortedTags.length > 0 ? (
              sortedTags.map((tag) => {
                // Calculate size based on count (1-5 scale)
                const size = Math.max(1, Math.ceil((tag.count / maxCount) * 5))
                const sizeClasses = ["text-xs", "text-sm", "text-base", "text-lg", "text-xl"]

                return (
                  <Badge key={tag.name} variant="secondary" className={`${sizeClasses[size - 1]} py-1 px-2 capitalize`}>
                    {tag.name}
                    {!selectedMemberId && <span className="ml-1 text-xs text-muted-foreground">({tag.count})</span>}
                  </Badge>
                )
              })
            ) : (
              <p className="text-sm text-muted-foreground py-4 text-center w-full">No tags available</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="chart" className="mt-0">
          <div className="space-y-3 py-4">
            {sortedTags.length > 0 ? (
              sortedTags.slice(0, 10).map((tag) => (
                <div key={tag.name} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="capitalize">{tag.name}</span>
                    <span className="text-muted-foreground">
                      {tag.count} {tag.count === 1 ? "member" : "members"}
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-300"
                      style={{ width: `${Math.max(5, (tag.count / maxCount) * 100)}%` }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground py-4 text-center">No tags available</p>
            )}
          </div>
        </TabsContent>
      </CardContent>
    </Card>
  )
}

