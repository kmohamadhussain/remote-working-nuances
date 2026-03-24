import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { name, score, feedback } = body

    if (!name || score == null) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { error } = await supabase.from("game_results").insert({
      name,
      score,
      feedback_rating: feedback?.rating ?? null,
      feedback_tags: (feedback?.tags ?? []).join(", "),
      feedback_comment: feedback?.comment ?? "",
    })

    if (error) {
      console.error("Supabase insert error:", error.message, error.details)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("API error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
