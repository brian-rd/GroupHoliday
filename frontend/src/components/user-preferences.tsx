"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { addDays } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"

interface Preferences {
  tags: string[]
  dateRange: { from: Date | null; to: Date | null }
  budget: { min: number; max: number }
}

interface UserPreferencesProps {
  preferences: Preferences
  onPreferencesChange: (field: string, value: any) => void
  suggestedTags: { name: string; icon: LucideIcon }[]
}

export function UserPreferences({ preferences, onPreferencesChange, suggestedTags }: UserPreferencesProps) {
  const [newTag, setNewTag] = useState("")

  const addTag = (tag: string) => {
    if (tag && !preferences.tags.includes(tag)) {
      const updatedTags = [...preferences.tags, tag]
      onPreferencesChange("tags", updatedTags)
      setNewTag("")
    }
  }

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  });

  useEffect(() => {
    if (date) {
      onPreferencesChange("dateRange", {
        from: date?.from || null,
        to: date?.to || null
      })
    }
  }, [date])

  const updateBudget = (field: "min" | "max", value: string) => {
    const updatedBudget = { ...preferences.budget, [field]: Number.parseInt(value) || 0 }
    onPreferencesChange("budget", updatedBudget)
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Label htmlFor="tags">Tags</Label>
        <div className="flex flex-wrap gap-2 mb-4">
          {preferences.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex gap-2 mb-4">
          <Input
            id="tags"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add a tag"
            className="flex-1"
          />
          <Button onClick={() => addTag(newTag)}>Add</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestedTags.map((tag) => (
            <Badge
              key={tag.name}
              variant="outline"
              className="cursor-pointer hover:bg-secondary"
              onClick={() => addTag(tag.name)}
            >
              <tag.icon className="w-4 h-4 mr-1" />
              {tag.name}
            </Badge>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <Label>Available Dates</Label>
        <DatePickerWithRange date={date} setDate={setDate} />
      </div>
      <div className="space-y-4">
        <Label>Budget Range</Label>
        <div className="flex gap-4">
          <Input
            type="number"
            value={preferences.budget.min}
            onChange={(e) => updateBudget("min", e.target.value)}
            placeholder="Min"
            className="flex-1"
          />
          <Input
            type="number"
            value={preferences.budget.max}
            onChange={(e) => updateBudget("max", e.target.value)}
            placeholder="Max"
            className="flex-1"
          />
        </div>
      </div>
    </div>
  )
}