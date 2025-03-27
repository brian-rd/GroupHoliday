  import {
  ArrowRight,
  Calendar,
  Globe,
  Plus,
  Search,
  Star,
  LuggageIcon as Suitcase,
  Users,
  MapPin,
  Sparkles,
  Palmtree,
  Mountain,
  Building,
  Compass,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { UserButton } from "@clerk/nextjs";
import { currentUser } from '@clerk/nextjs/server'
import Link from "next/link"

const groupsData = [
  {
    id: "group-1",
    name: "Summer Adventure 2025",
    image: "/bali.webp",
    members: 4,
    destination: "Multiple destinations",
    date: "Jun 10 - Jul 20, 2025",
    status: "planning",
    progress: 65,
    isNew: false,
  },
  {
    id: "group-2",
    name: "Winter Ski Trip",
    image: "/bali.webp",
    members: 6,
    destination: "Aspen, Colorado",
    date: "Dec 15 - Dec 22, 2024",
    status: "planning",
    progress: 30,
    isNew: true,
  },
  {
    id: "group-3",
    name: "City Break Weekend",
    image: "/bali.webp",
    members: 3,
    destination: "Barcelona, Spain",
    date: "Sep 5 - Sep 8, 2024",
    status: "confirmed",
    progress: 90,
    isNew: false,
  },
]

const travelInspiration = [
  {
    id: "inspiration-1",
    title: "Beach Getaways",
    description: "Relax on pristine beaches with crystal clear waters",
    image: "/bali.webp",
    icon: <Palmtree className="h-5 w-5" />,
  },
  {
    id: "inspiration-2",
    title: "Mountain Retreats",
    description: "Discover breathtaking views and hiking trails",
    image: "/bali.webp",
    icon: <Mountain className="h-5 w-5" />,
  },
  {
    id: "inspiration-3",
    title: "City Explorations",
    description: "Immerse yourself in culture, food, and architecture",
    image: "/bali.webp",
    icon: <Building className="h-5 w-5" />,
  },
]

const recentActivity = [
  {
    id: "activity-1",
    user: {
      name: "Jamie Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "added a new destination",
    target: "Tokyo, Japan",
    group: "Winter Ski Trip",
    time: "2 hours ago",
  },
  {
    id: "activity-2",
    user: {
      name: "Taylor Wong",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "confirmed availability for",
    target: "Summer Adventure 2025",
    group: "Summer Adventure 2025",
    time: "Yesterday",
  },
  {
    id: "activity-3",
    user: {
      name: "Morgan Lee",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "created a new group",
    target: "Winter Ski Trip",
    group: "Winter Ski Trip",
    time: "2 days ago",
  },
]

export default async function Dashboard() {
  const user = await currentUser()
  
  return (
    <div className="min-h-screen bg-background">
      <main className="container py-6 px-24 md:py-10">
        <section className="mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                Welcome back, {user?.firstName}
              </h1>
              <p className="text-muted-foreground">Ready to plan your next adventure?</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="h-9">
                <Search className="h-4 w-4 mr-2" />
                Explore Destinations
              </Button>
              <Link href="/create-group">
                <Button className="h-9 flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  <span>New group</span>
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-none">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Trips Planned</p>
                  <h3 className="text-3xl font-bold">3</h3>
                  <p className="text-sm text-muted-foreground mt-1">total adventures</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
                  <Suitcase className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-none">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Countries Visited</p>
                  <h3 className="text-3xl font-bold">3</h3>
                  <p className="text-sm text-muted-foreground mt-1">and counting</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center">
                  <Globe className="h-6 w-6 text-green-600 dark:text-green-300" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-none">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Travel Groups</p>
                  <h3 className="text-3xl font-bold">3</h3>
                  <p className="text-sm text-muted-foreground mt-1">active groups</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-800 flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-600 dark:text-purple-300" />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>My Groups</CardTitle>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1">
                    View All
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {groupsData.map((group) => (
                  <div
                    key={group.id}
                    className="group relative overflow-hidden rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md"
                  >
                    <div className="relative h-36 w-full overflow-hidden">
                      <img
                        src={group.image || "/placeholder.svg"}
                        alt={group.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                      {group.isNew && <Badge className="absolute top-2 right-2 bg-primary">New</Badge>}

                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <h3 className="text-white font-medium truncate">{group.name}</h3>
                        <div className="flex items-center gap-1 text-white/80 text-xs">
                          <Users className="h-3 w-3" />
                          <span>{group.members} members</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="truncate">{group.destination}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-xs">{group.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge variant={group.status === "confirmed" ? "default" : "outline"}>
                          {group.status === "confirmed" ? "Confirmed" : "Planning"}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{group.progress}% complete</span>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex items-center justify-center h-36 rounded-lg border border-dashed p-4 hover:border-primary/50 transition-colors">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Plus className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-medium">Create New Group</h3>
                    <p className="text-xs text-muted-foreground">Start planning your next adventure</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Travel Inspiration</CardTitle>
                    <CardDescription>Discover your next adventure</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1">
                    Explore More
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {travelInspiration.map((item) => (
                    <div key={item.id} className="group relative overflow-hidden rounded-lg cursor-pointer">
                      <div className="relative h-48 w-full overflow-hidden rounded-lg">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                        <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm p-1.5 rounded-full">
                          {item.icon}
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <h3 className="text-white font-medium">{item.title}</h3>
                          <p className="text-white/80 text-xs line-clamp-2">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Compass className="h-4 w-4 mr-2" />
                  Find More Destinations
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-20 w-20 mb-4">
                    <AvatarImage src={user?.imageUrl}/>
                    <AvatarFallback>{user?.firstName?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold">{user?.firstName} {user?.lastName}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{user?.emailAddresses?.[0]?.emailAddress}</p>
                  <div className="flex gap-2 mb-4">
                    <Button variant="outline" size="sm">
                      Edit Profile
                    </Button>
                  </div>

                  <div className="w-full border-t pt-4 mt-2">
                    <p className="text-sm text-muted-foreground">
                      Member since {user?.createdAt && new Date(user.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates from your groups</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                        <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">{activity.user.name}</span> {activity.action}{" "}
                          {activity.target && <span className="font-medium">{activity.target}</span>}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <Badge variant="outline" className="text-xs font-normal">
                            {activity.group}
                          </Badge>
                          <span className="text-xs text-muted-foreground">• {activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full text-muted-foreground">
                  View All Activity
                </Button>
              </CardFooter>
            </Card>

            {/* Featured Destination */}
            <Card className="overflow-hidden">
              <div className="relative h-40">
                <img
                  src="/barcelona.jpg"
                  alt="Featured Destination"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-primary/80 backdrop-blur-sm">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                </div>
                <div className="absolute bottom-3 left-3">
                  <h3 className="text-white font-bold text-lg">Santorini, Greece</h3>
                  <p className="text-white/80 text-xs">Perfect for summer getaways</p>
                </div>
              </div>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Discover the stunning white-washed buildings, blue domes, and breathtaking sunsets of Santorini.
                </p>
                <Button variant="outline" className="w-full">
                  <Star className="h-4 w-4 mr-2 text-amber-500" />
                  Save to Wishlist
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

