import { createClient } from "@supabase/supabase-js"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export function createClerkSupabaseClient(sessionToken?: string) {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: {
      fetch: async (url, options = {}) => {
        const headers = new Headers(options?.headers)
        if (sessionToken) {
          headers.set("Authorization", `Bearer ${sessionToken}`)
        }
        return fetch(url, { ...options, headers })
      },
    },
  })
}
