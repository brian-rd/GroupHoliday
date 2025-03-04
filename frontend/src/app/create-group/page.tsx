"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreateGroupStep } from "@/components/create-group-step"
import { toast, Toaster } from "sonner"
import { useSession, useUser } from '@clerk/nextjs'
import { createClerkSupabaseClient } from "@/lib/clerkSupabaseClient"
import { set } from "date-fns"

const steps = [
  { id: "name", title: "What would you like to name your group?" },
  { id: "currency", title: "What is your group's currency?" },
  { id: "link", title: "Share your group" },
]

export default function CreateGroupPage() {
  const { user } = useUser()
  const { session } = useSession()
  const router = useRouter()
  const [supabaseClient, setSupabaseClient] = useState<any>(null)
  const [groupId, setGroupId] = useState<string | null>(null)

  useEffect(() => {
    const initializeSupabase = async () => {
      const sessionToken = await session?.getToken({ template: "supabase" })
      if (sessionToken) {
        setSupabaseClient(createClerkSupabaseClient(sessionToken))
      }
    }
    initializeSupabase()
  }, [session])

  const createGroup = async () => {
    console.log(user)
    const { data, error } = await supabaseClient.from('groups').insert({
      name: groupData.name,
      currency: groupData.currency,
      created_by: user?.id,
    }).select('id').single()

    if (!error) {
      const { error: memberError } = await supabaseClient.from('groups_members').insert({
      group_id: data.id,
      user_id: user?.id,
      role: 'admin',
      })

      if (memberError) {
      toast.error("Error", {
        description: "Failed to add user to group members",
      })
      return
      }
    }

    if (error) {
      toast.error("Error", {
      description: "Failed to create group",
      })
      return
    }

    const groupId = data.id
    setGroupId(groupId)
    console.log("Group ID:", groupId)
    return groupId
  }

  const [currentStep, setCurrentStep] = useState(0)
  const [groupData, setGroupData] = useState({
    name: "",
    currency: "",
    link: "",
  })

  const handleNext = async () => {
    if (currentStep === 0 && !validateGroupName()) return
    if (currentStep < steps.length - 1) {
      console.log("Current Group Data:", groupData)
      setCurrentStep(currentStep + 1)
    }
    if (currentStep === 1) {
      const groupId = await createGroup()
      if (groupId) {
        setGroupData({ ...groupData, link: `https://group-holiday.vercel.app/group/${groupId}` })
        // router.push(`/group/${groupId}`)
      }
      toast.success("Group created successfully", {
        description: "Your group has been created successfully"})
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setGroupData({ ...groupData, [field]: value })
  }

  const validateGroupName = () => {
    if (groupData.name.trim() === "") {
      toast.error("Error", {
              description: "Group name is required",
            })
      return false
    }
    if (groupData.name.length > 64) {
      toast.error("Error", {
        description: "Group name must be less than 64 characters",
      })
      return false
    }
    return true
  }

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  }

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleNext()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [currentStep, groupData])

  return (
    <div className="w-full max-w-4xl min-h-screen mx-auto px-4 flex-grow flex items-center justify-center">
      <Toaster />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="justify-center items-center w-full max-w-xl"
        >
          <CreateGroupStep
            key={steps[currentStep].id}
            title={steps[currentStep].title}
            onNext={handleNext}
            onBack={handleBack}
            isFirstStep={currentStep === 0}
            isLastStep={currentStep === steps.length - 1}
            groupId={groupId}
          >
            {currentStep === 0 && (
              <Input
                placeholder="Enter group name"
                value={groupData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            )}
            {currentStep === 1 && (
              <Select value={groupData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                </SelectContent>
              </Select>
            )}
            {currentStep === 2 && (
              <div className="space-y-4 w-full">
                <p>Share this link with your group:</p>
                <Input value={groupData.link || "Generating link..."} readOnly />
                <Button className="w-full" onClick={() => navigator.clipboard.writeText(groupData.link)}>
                  Copy Link
                </Button>
              </div>
            )}
          </CreateGroupStep>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

