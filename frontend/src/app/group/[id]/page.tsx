"use client"

import { useState, useEffect } from "react"
import { useSession, useUser } from '@clerk/nextjs'
import { createClerkSupabaseClient } from "@/lib/clerkSupabaseClient"
import { useRouter, useParams } from 'next/navigation'
import { UserPreferences } from "@/components/user-preferences"
import { motion, AnimatePresence } from "framer-motion"
import { toast, Toaster } from "sonner"
import { Button } from "@/components/ui/button"

import {
    TreePalm as Beach,
    Mountain,
    Building2 as City,
    Utensils,
    Camera,
} from "lucide-react"

const suggestedTags = [
    { name: "Beach", icon: Beach },
    { name: "Mountains", icon: Mountain },
    { name: "City", icon: City },
    { name: "Food", icon: Utensils },
    { name: "Photography", icon: Camera },
]

const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 },
}

const pageTransition = {
    duration: 0.5,
}

const handleSubmitPreferences = async (
    preferences: any,
    user: any,
    groupId: string,
    supabaseClient: any,
    validatePreferences: () => boolean,
    toast: any
) => {
    if (!validatePreferences()) return;

    const { dateRange, tags, budget } = preferences;
    const datesAvailable = [];
    let currentDate = dateRange.from ? new Date(dateRange.from) : new Date();

    while (dateRange.to && currentDate <= dateRange.to) {
        datesAvailable.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    const { error } = await supabaseClient
        .from('preferences')
        .insert({
            user_id: user?.id,
            group_id: groupId,
            dates_available: datesAvailable,
            tags: tags,
            budget_min: budget.min,
            budget_max: budget.max,
        });

    if (error) {
        toast.error("Error", {
            description: "Failed to save preferences",
        });
    } else {
        toast.success("Success", {
            description: "Preferences saved successfully",
        });
    }
};


export default function CreateGroupPage() {
    const { user } = useUser()
    const { session } = useSession()
    const [supabaseClient, setSupabaseClient] = useState<any>(null)

    const [preferences, setPreferences] = useState({
        tags: [],
        dateRange: { from: null as Date | null, to: null as Date | null },
        budget: { min: 0, max: 0 },
    })

    const validatePreferences = () => {
        const { dateRange, budget } = preferences
        if (!dateRange.from || !dateRange.to) {
        toast.error("Error", {
            description: "Available dates must be set",
        })
        return false
        }
        if (dateRange.from < new Date() || dateRange.to < new Date()) {
        toast.error("Error", {
            description: "Available dates must be in the future",
        })
        return false
        }
        
        if (budget.max < budget.min) {
        toast.error("Error", {
            description: "Maximum budget must be greater than or equal to minimum budget",
        })
        return false
        }
        return true
    }

    useEffect(() => {
            const initializeSupabase = async () => {
                    const sessionToken = await session?.getToken({ template: "supabase" })
                    if (sessionToken) {
                            setSupabaseClient(createClerkSupabaseClient(sessionToken))
                    }
            }
            initializeSupabase()
    }, [session])

    const router = useRouter()
    const { id } = useParams() as { id: string }

    useEffect(() => {
            const checkMembership = async () => {
                    if (supabaseClient && user) {
                            const { data, error } = await supabaseClient
                                    .from('groups_members')
                                    .select('id')
                                    .eq('group_id', id)
                                    .eq('user_id', user.id)
                                    .single()

                            if (error || !data) {
                                    router.push('/not-found')
                            }
                    }
            }
            checkMembership()
    }, [supabaseClient, user, id, router])

    const handleInputChange = (field: string, value: any) => {
        setPreferences((prevData: any) => ({
            ...prevData,
            [field]: value,
        }))
    }

    return (
        <div className="w-full max-w-4xl mx-auto px-4">
            <Toaster />
            <AnimatePresence mode="wait">
                <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                    className="w-full"
                >
                    <UserPreferences
                        preferences={preferences}
                        onPreferencesChange={(field, value) => handleInputChange(field, value)}
                        suggestedTags={suggestedTags}
                    />
                    <div className="flex-1 py-6 flex justify-end">
                        <Button onClick={() => handleSubmitPreferences(preferences, user, id, supabaseClient, validatePreferences, toast)}>
                            Submit
                        </Button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}