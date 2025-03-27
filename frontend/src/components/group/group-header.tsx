import { formatDistanceToNow } from "date-fns"
import { Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface GroupHeaderProps {
  name: string
  createdAt: string
}

export function GroupHeader({ name, createdAt }: GroupHeaderProps) {
  const formattedDate = formatDistanceToNow(new Date(createdAt), { addSuffix: true })

  return (
    <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-none shadow-md">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary/10">
            <Users className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">{name}</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">Created {formattedDate}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

