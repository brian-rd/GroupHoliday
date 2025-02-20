"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface CreateGroupStepProps {
  title: string
  children: ReactNode
  onNext: () => void
  onBack: () => void
  isFirstStep: boolean
  isLastStep: boolean
  groupId: string | null
}

export function CreateGroupStep({ title, children, onNext, onBack, isFirstStep, isLastStep, groupId }: CreateGroupStepProps) {
    const router = useRouter()

    return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-8 w-full"
    >
        <h2 className="text-3xl font-bold text-center">{title}</h2>
        <div className="space-y-6">{children}</div>
        <div className="flex justify-between">
        {!isFirstStep && (
            <Button onClick={onBack} variant="outline">
            Back
            </Button>
        )}
        <div className="flex-1" />
        <Button onClick={isLastStep ? () => router.push(`/group/${groupId}`) : onNext}>Next</Button>
        </div>
    </motion.div>
    )
}

