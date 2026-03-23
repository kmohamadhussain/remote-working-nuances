"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, Tag, MessageSquare, RefreshCw, Download, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { feedbackTags, saveResult, getHistory, type GameResult, type Persona } from "@/lib/game-data"

interface FeedbackScreenProps {
  name: string
  persona: Persona
  score: number
  onRestart: () => void
}

export function FeedbackScreen({ name, persona, score, onRestart }: FeedbackScreenProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [comment, setComment] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminClicks, setAdminClicks] = useState(0)

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const handleSubmit = () => {
    const result: GameResult = {
      name,
      persona,
      score,
      feedback: {
        rating,
        tags: selectedTags,
        comment,
      },
      date: new Date().toISOString(),
    }
    saveResult(result)
    setSubmitted(true)
  }

  const handleAdminClick = () => {
    const newClicks = adminClicks + 1
    setAdminClicks(newClicks)
    if (newClicks >= 5) {
      setIsAdmin(true)
    }
  }

  const exportToPDF = async () => {
    const { jsPDF } = await import("jspdf")
    const autoTable = (await import("jspdf-autotable")).default

    const history = getHistory()
    const doc = new jsPDF()

    // Header
    doc.setFontSize(20)
    doc.setTextColor(99, 102, 241) // Indigo
    doc.text("Remote Nuance Challenge 2026", 14, 22)

    doc.setFontSize(12)
    doc.setTextColor(107, 114, 128)
    doc.text("Daily Challenge Log Export", 14, 30)
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 38)

    // Table
    autoTable(doc, {
      startY: 45,
      head: [["Name", "Persona", "Score", "Rating", "Tags", "Date"]],
      body: history.map((r) => [
        r.name,
        r.persona,
        `${r.score}%`,
        r.feedback.rating ? `${r.feedback.rating}/5` : "N/A",
        r.feedback.tags.join(", ") || "None",
        new Date(r.date).toLocaleDateString(),
      ]),
      headStyles: {
        fillColor: [99, 102, 241],
        textColor: 255,
      },
      alternateRowStyles: {
        fillColor: [243, 244, 246],
      },
      styles: {
        fontSize: 9,
      },
    })

    doc.save("remote-nuance-challenge-log.pdf")
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  if (submitted) {
    return (
      <motion.div
        className="w-full max-w-2xl mx-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="rounded-lg border border-border bg-card overflow-hidden shadow-2xl p-8 text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 15 }}
            className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center"
          >
            <Star className="w-10 h-10 text-emerald-400 fill-emerald-400" />
          </motion.div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Retro Complete!</h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={onRestart}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Run Another Sprint
            </Button>

            {isAdmin && (
              <Button
                onClick={exportToPDF}
                variant="outline"
                className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Daily Log (PDF)
              </Button>
            )}
          </div>

          {/* Hidden admin trigger */}
          <div
            className="text-xs text-muted-foreground/50 cursor-default select-none"
            onClick={handleAdminClick}
          >
            Thanks for playing!
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="rounded-lg border border-border bg-card overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 bg-secondary/50 border-b border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MessageSquare className="w-4 h-4 text-indigo-400" />
            <span>Quick Feedback</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Star Rating */}
          <motion.div variants={itemVariants} className="space-y-3">
            <p className="text-sm text-muted-foreground font-medium">How was your experience?</p>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  className="p-1 transition-all"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Star
                    className={`w-10 h-10 transition-colors ${star <= (hoveredRating || rating)
                        ? "text-amber-400 fill-amber-400"
                        : "text-muted-foreground"
                      }`}
                  />
                </motion.button>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground">
              {rating === 0
                ? "Click to rate"
                : rating <= 2
                  ? "We'll work on improving!"
                  : rating <= 4
                    ? "Glad you enjoyed it!"
                    : "Awesome, thank you!"}
            </p>
          </motion.div>

          {/* Quick Tags */}
          <motion.div variants={itemVariants} className="space-y-3">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-indigo-400" />
              <p className="text-sm text-muted-foreground font-medium">What did you like?</p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {feedbackTags.map((tag) => (
                <motion.button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`
                    px-4 py-2 rounded-full text-sm border transition-all
                    ${selectedTags.includes(tag)
                      ? "bg-indigo-600 border-indigo-500 text-white"
                      : "bg-secondary border-border text-muted-foreground hover:border-indigo-500/50"
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tag}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Comment */}
          <motion.div variants={itemVariants} className="space-y-3">
            <p className="text-sm text-muted-foreground font-medium">Any additional thoughts? (optional)</p>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts..."
              className="bg-input border-border focus:border-indigo-500 min-h-[100px] resize-none"
            />
          </motion.div>

          {/* Submit */}
          <motion.div variants={itemVariants}>
            <Button
              onClick={handleSubmit}
              disabled={rating === 0}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50"
            >
              <Shield className="w-4 h-4 mr-2" />
              Submit Retro
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
